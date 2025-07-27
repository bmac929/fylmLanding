import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, Eye, ArrowLeft, Clock, Calendar,
  CheckCircle, AlertTriangle, Plus, X, Trash2,
  Lock, Edit2, EyeOff
} from 'lucide-react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast';
import { getBlogBySlug, updateBlog, createBlog, publishBlog } from '../utils/blogUtils';
import { BLOG_STATUS } from '../utils/supabase';
import BlogEditor from '../components/BlogEditor';
import PasswordModal from '../components/PasswordModal';
import { setBlogPreviewPassword, hasBlogPreviewPassword } from '../utils/previewUtils';

const BlogEdit = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [unpublishing, setUnpublishing] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [errors, setErrors] = useState({});
  const [blog, setBlog] = useState({
    title: '',
    content: null,
    banner_image: '',
    tags: [],
    status: BLOG_STATUS.DRAFT,
    scheduled_for: null
  });
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [availableTags, setAvailableTags] = useState([
    { value: 'technology', label: 'Technology' },
    { value: 'filmmaking', label: 'Filmmaking' },
    { value: 'indie', label: 'Indie' }
  ]);
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      if (slug) {
        try {
          const data = await getBlogBySlug(slug);
          setBlog(data);
          setHasPassword(hasBlogPreviewPassword(data.id));
        } catch (error) {
          console.error('Error loading blog:', error);
          toast.error('Failed to load blog');
          navigate('/blogs');
        }
      }
      setLoading(false);
    };

    loadBlog();
  }, [slug, navigate]);

  // Load available tags from localStorage
  useEffect(() => {
    const storedTags = localStorage.getItem('availableTags');
    if (storedTags) {
      setAvailableTags(JSON.parse(storedTags));
    }
  }, []);

  // Save available tags to localStorage when they change
  useEffect(() => {
    localStorage.setItem('availableTags', JSON.stringify(availableTags));
  }, [availableTags]);

  const validateBlog = () => {
    const newErrors = {};

    if (!blog.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!blog.content || !blog.content.content || blog.content.content.length === 0) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (status = blog.status) => {
    if (!validateBlog()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      let savedBlog;

      if (slug) {
        savedBlog = await updateBlog(blog.id, {
          ...blog,
          status
        });
      } else {
        savedBlog = await createBlog(blog);
      }

      setBlog(savedBlog);
      setLastSaved(new Date());
      toast.success('Blog saved successfully');
      
      if (!slug) {
        navigate(`/blogs/${savedBlog.slug}/edit`);
      }
      
      return savedBlog;
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!validateBlog()) {
      toast.error('Please fill in all required fields before publishing');
      return;
    }

    try {
      setPublishing(true);
      const publishedBlog = await publishBlog(blog.id, blog.scheduled_for);
      setBlog(publishedBlog);
      setLastSaved(new Date());
      toast.success(
        blog.scheduled_for 
          ? 'Blog scheduled for publication' 
          : 'Blog published successfully'
      );
    } catch (error) {
      console.error('Error publishing blog:', error);
      toast.error('Failed to publish blog');
    } finally {
      setPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    try {
      setUnpublishing(true);
      const updatedBlog = await updateBlog(blog.id, {
        status: BLOG_STATUS.DRAFT,
        published_at: null,
        scheduled_for: null
      });
      
      setBlog(updatedBlog);
      setLastSaved(new Date());
      toast.success('Blog unpublished successfully');
    } catch (error) {
      console.error('Error unpublishing blog:', error);
      toast.error('Failed to unpublish blog');
    } finally {
      setUnpublishing(false);
    }
  };

  const handlePreview = () => {
    if (!validateBlog()) {
      toast.error('Please fill in all required fields before previewing');
      return;
    }
    
    // If blog doesn't have a password yet, show password modal
    if (!hasPassword) {
      setShowPasswordModal(true);
      return;
    }
    
    // Save before preview
    handleSave().then(() => {
      navigate(`/blogs/${blog.slug}/preview`);
    });
  };

  const handleSetPassword = (password) => {
    if (blog.id) {
      const success = setBlogPreviewPassword(blog.id, password);
      if (success) {
        setHasPassword(true);
        setShowPasswordModal(false);
        toast.success('Preview password set successfully');
        
        // Navigate to preview
        navigate(`/blogs/${blog.slug}/preview`);
      } else {
        toast.error('Failed to set preview password');
      }
    }
  };

  const handleEditPassword = (password) => {
    if (blog.id) {
      const success = setBlogPreviewPassword(blog.id, password);
      if (success) {
        setShowEditPasswordModal(false);
        toast.success('Preview password updated successfully');
      } else {
        toast.error('Failed to update preview password');
      }
    }
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    
    // Check for duplicates
    if (blog.tags?.includes(newTag.trim())) {
      toast.error('This tag already exists');
      return;
    }
    
    // Add to blog tags
    setBlog(prev => ({
      ...prev,
      tags: [...(prev.tags || []), newTag.trim()]
    }));
    
    // Add to available tags if not already there
    if (!availableTags.some(tag => tag.value === newTag.trim())) {
      setAvailableTags(prev => [
        ...prev,
        { value: newTag.trim(), label: newTag.trim() }
      ]);
    }
    
    setNewTag('');
    setShowTagInput(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleDeleteTag = (tagValue) => {
    // Remove from available tags
    setAvailableTags(prev => prev.filter(tag => tag.value !== tagValue));
    
    // Remove from current blog tags if present
    if (blog.tags?.includes(tagValue)) {
      setBlog(prev => ({
        ...prev,
        tags: prev.tags.filter(tag => tag !== tagValue)
      }));
    }
    
    toast.success(`Tag "${tagValue}" permanently deleted`);
  };

  // Custom components for react-select
  const Option = ({ children, ...props }) => {
    return (
      <div
        {...props.innerProps}
        className={`flex items-center justify-between px-3 py-2 ${
          props.isFocused ? 'bg-secondary/10' : 'bg-transparent'
        } ${props.isSelected ? 'bg-secondary/30' : ''} hover:bg-secondary/10 cursor-pointer`}
      >
        <div>{children}</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTag(props.data.value);
          }}
          className="text-red-500 hover:text-red-700 transition-colors"
          title="Permanently delete tag"
        >
          <Trash2 size={14} />
        </button>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-24">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate('/blogs')}
          className="text-light/70 hover:text-light transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Blogs
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={handlePreview}
            className="px-4 py-2 rounded-lg bg-white/10 text-white 
                     hover:bg-white/20 transition-colors flex items-center gap-2"
          >
            <Eye size={20} />
            Preview
          </button>

          {hasPassword && (
            <button
              onClick={() => setShowEditPasswordModal(true)}
              className="px-4 py-2 rounded-lg bg-white/10 text-white 
                       hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <Edit2 size={20} />
              Edit Password
            </button>
          )}

          {blog.status === BLOG_STATUS.PUBLISHED ? (
            <button
              onClick={handleUnpublish}
              disabled={unpublishing}
              className="px-4 py-2 rounded-lg bg-red-500/80 text-white 
                       hover:bg-red-500 transition-colors flex items-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <EyeOff size={20} />
              {unpublishing ? 'Unpublishing...' : 'Unpublish'}
            </button>
          ) : (
            <>
              <div className="relative">
                <button
                  onClick={() => setShowSchedule(!showSchedule)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white 
                           hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                  <Clock size={20} />
                  Schedule
                </button>

                {showSchedule && (
                  <div className="absolute right-0 mt-2 p-4 bg-primary border border-white/10 
                               rounded-lg shadow-xl z-10 min-w-[300px]">
                    <h4 className="text-sm font-medium text-light mb-4">Schedule Publication</h4>
                    <DatePicker
                      selected={blog.scheduled_for ? new Date(blog.scheduled_for) : null}
                      onChange={(date) => setBlog(prev => ({ ...prev, scheduled_for: date }))}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      minDate={new Date()}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                               text-white focus:outline-none focus:border-secondary"
                    />
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => {
                          handlePublish();
                          setShowSchedule(false);
                        }}
                        className="px-4 py-2 rounded-lg bg-secondary text-primary 
                                 hover:bg-secondary/90 transition-colors flex items-center gap-2"
                      >
                        <Calendar size={20} />
                        Schedule
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handlePublish}
                disabled={publishing}
                className="px-4 py-2 rounded-lg bg-green-500 text-white 
                         hover:bg-green-500/90 transition-colors flex items-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle size={20} />
                {publishing ? 'Publishing...' : 'Publish Now'}
              </button>
            </>
          )}

          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-secondary text-primary 
                     hover:bg-secondary/90 transition-colors flex items-center gap-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {blog.status === BLOG_STATUS.PUBLISHED && (
        <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
          <CheckCircle className="text-green-500" size={24} />
          <div>
            <h4 className="font-medium text-green-500">Published</h4>
            <p className="text-sm text-green-500/90">
              This blog post is live and visible to the public.
            </p>
          </div>
        </div>
      )}

      {blog.validationIssues?.length > 0 && (
        <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center gap-3">
          <AlertTriangle className="text-yellow-500" size={24} />
          <div>
            <h4 className="font-medium text-yellow-500">Validation Issues</h4>
            <ul className="list-disc list-inside text-sm text-yellow-500/90">
              {blog.validationIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {hasPassword && (
        <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-3">
          <Lock className="text-blue-500" size={24} />
          <div>
            <h4 className="font-medium text-blue-500">Password Protected</h4>
            <p className="text-sm text-blue-500/90">
              This blog preview is password protected. Only people with the password can view it.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-light mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={blog.title}
            onChange={(e) => {
              setBlog(prev => ({ ...prev, title: e.target.value }));
              if (errors.title) {
                setErrors(prev => ({ ...prev, title: '' }));
              }
            }}
            className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
              errors.title ? 'border-red-500' : 'border-white/20'
            } text-white focus:outline-none focus:border-secondary`}
            placeholder="Enter blog title..."
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-light mb-2">
            Banner Image URL
          </label>
          <input
            type="url"
            value={blog.banner_image || ''}
            onChange={(e) => setBlog(prev => ({ ...prev, banner_image: e.target.value }))}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                     text-white focus:outline-none focus:border-secondary"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-light mb-2">
            Tags
          </label>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Select
                isMulti
                value={blog.tags?.map(tag => ({ value: tag, label: tag }))}
                onChange={(options) => setBlog(prev => ({ 
                  ...prev, 
                  tags: options.map(opt => opt.value)
                }))}
                options={availableTags}
                className="react-select-container flex-grow"
                classNamePrefix="react-select"
                placeholder="Add tags..."
                components={{ Option }}
              />
              
              {!showTagInput ? (
                <button
                  onClick={() => setShowTagInput(true)}
                  className="px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 
                           transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  <Plus size={16} />
                  Add Tag
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 
                             text-white focus:outline-none focus:border-secondary w-32"
                    placeholder="New tag..."
                    autoFocus
                  />
                  <button
                    onClick={handleAddTag}
                    className="p-2 text-secondary hover:text-secondary/80 transition-colors"
                    title="Add"
                  >
                    <CheckCircle size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setShowTagInput(false);
                      setNewTag('');
                    }}
                    className="p-2 text-red-500 hover:text-red-400 transition-colors"
                    title="Cancel"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-light mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          <div className={`${errors.content ? 'border border-red-500 rounded-lg' : ''}`}>
            <BlogEditor
              initialContent={blog.content}
              onChange={(content) => {
                setBlog(prev => ({ ...prev, content }));
                if (errors.content) {
                  setErrors(prev => ({ ...prev, content: '' }));
                }
              }}
              onSave={() => handleSave()}
            />
          </div>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        {lastSaved && (
          <div className="flex items-center gap-2 text-light/70 text-sm">
            <CheckCircle size={16} className="text-green-500" />
            <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {/* Password Modal */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handleSetPassword}
        title="Set Preview Password"
        description="Set a password to protect this blog preview. Anyone with the link will need this password to view the preview."
        submitText="Set Password & Preview"
      />

      {/* Edit Password Modal */}
      <PasswordModal
        isOpen={showEditPasswordModal}
        onClose={() => setShowEditPasswordModal(false)}
        onSubmit={handleEditPassword}
        title="Edit Preview Password"
        description="Update the password for this blog preview. This will not affect users who already have access."
        submitText="Update Password"
      />
    </div>
  );
};

export default BlogEdit;