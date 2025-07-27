import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Edit2, ArrowLeft, Copy, Save, Eye, Lock,
  AlertTriangle, CheckCircle, EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getBlogBySlug, updateBlog } from '../utils/blogUtils';
import { 
  createPreviewSession, 
  validatePreviewSession,
  deletePreviewSession,
  verifyBlogPreviewPassword,
  hasBlogPreviewPassword
} from '../utils/previewUtils';
import BlogEditor from '../components/BlogEditor';

const BlogPreview = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [editedBlog, setEditedBlog] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle unsaved changes when navigating away
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  useEffect(() => {
    // Check if admin status is stored in localStorage
    const storedAdminStatus = localStorage.getItem('isAdmin');
    if (storedAdminStatus === 'true') {
      setIsAdmin(true);
    }

    const loadBlog = async () => {
      if (!slug) {
        setError('No blog slug provided');
        setLoading(false);
        return;
      }

      try {
        const data = await getBlogBySlug(slug);
        if (!data) {
          setError('Blog not found');
          return;
        }
        setBlog(data);
        setEditedBlog(data);

        // If user is admin, auto-authenticate
        if (storedAdminStatus === 'true') {
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }

        // Check if blog has password protection
        const hasPassword = hasBlogPreviewPassword(data.id);
        
        // If no password protection, check for existing session
        if (!hasPassword) {
          const storedPassword = localStorage.getItem(`preview_${data.id}`);
          if (storedPassword) {
            const isValid = validatePreviewSession(data.id, storedPassword);
            setIsAuthenticated(isValid);
          }
        }
      } catch (error) {
        console.error('Error loading blog:', error);
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  const handleAuthenticate = () => {
    if (!blog) return;

    // Check if blog has password protection
    const hasPassword = hasBlogPreviewPassword(blog.id);
    
    if (hasPassword) {
      // Verify against stored password
      const isValid = verifyBlogPreviewPassword(blog.id, password);
      if (isValid) {
        setIsAuthenticated(true);
        setAccessDenied(false);
        setPassword('');
      } else {
        setAccessDenied(true);
      }
    } else {
      // Use session-based authentication
      const session = createPreviewSession(blog.id);
      if (password === session.password) {
        setIsAuthenticated(true);
        localStorage.setItem(`preview_${blog.id}`, session.password);
        setPassword('');
      } else {
        setAccessDenied(true);
      }
    }
  };

  const handleLogout = () => {
    if (!blog) return;
    deletePreviewSession(blog.id);
    localStorage.removeItem(`preview_${blog.id}`);
    setIsAuthenticated(false);
    setEditMode(false);
    
    // If there are unsaved changes, prompt the user
    if (hasChanges) {
      const confirmLogout = window.confirm('You have unsaved changes. Are you sure you want to log out?');
      if (!confirmLogout) return;
    }
    
    navigate('/blogs');
  };

  const handleSave = async () => {
    if (!editedBlog) return;

    try {
      setSaving(true);
      await updateBlog(editedBlog.id, editedBlog);
      setBlog(editedBlog);
      setHasChanges(false);
      toast.success('Changes saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
      if (error.message === 'Not authenticated') {
        toast.error('Your session has expired. Please log in again.');
        handleLogout();
      } else {
        toast.error('Failed to save changes');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = () => {
    if (!blog) return;

    const previewUrl = `${window.location.origin}/blogs/${blog.slug}/preview`;
    navigator.clipboard.writeText(previewUrl);
    toast.success('Preview link copied to clipboard');
  };

  const handleContentChange = (content) => {
    setEditedBlog(prev => ({ ...prev, content }));
    setHasChanges(true);
  };

  const handleTitleChange = (e) => {
    setEditedBlog(prev => ({ ...prev, title: e.target.value }));
    setHasChanges(true);
  };

  const toggleEditMode = () => {
    if (editMode && hasChanges) {
      const confirmSwitch = window.confirm('You have unsaved changes. Are you sure you want to exit edit mode?');
      if (!confirmSwitch) return;
    }
    setEditMode(!editMode);
  };

  const renderContent = (content) => {
    if (!content || !content.content) return null;

    return content.content.map((node, index) => {
      switch (node.type) {
        case 'paragraph':
          return (
            <p key={index} className="mb-4 text-light/90">
              {node.content?.map((child, i) => renderInlineContent(child, i))}
            </p>
          );

        case 'heading':
          const Tag = `h${node.attrs?.level || 2}`;
          const headingClasses = {
            h1: 'text-3xl font-bold mb-6',
            h2: 'text-2xl font-bold mb-5',
            h3: 'text-xl font-bold mb-4',
            h4: 'text-lg font-bold mb-3',
            h5: 'text-base font-bold mb-2',
            h6: 'text-sm font-bold mb-2'
          };
          return (
            <Tag key={index} className={headingClasses[Tag]}>
              {node.content?.map((child, i) => renderInlineContent(child, i))}
            </Tag>
          );

        case 'bulletList':
          return (
            <ul key={index} className="list-disc list-inside mb-4 text-light/90">
              {node.content?.map((child, i) => (
                <li key={i} className="mb-2">
                  {child.content?.map((grandChild, j) => renderContent([grandChild])[0])}
                </li>
              ))}
            </ul>
          );

        case 'orderedList':
          return (
            <ol key={index} className="list-decimal list-inside mb-4 text-light/90">
              {node.content?.map((child, i) => (
                <li key={i} className="mb-2">
                  {child.content?.map((grandChild, j) => renderContent([grandChild])[0])}
                </li>
              ))}
            </ol>
          );

        case 'listItem':
          return (
            <li key={index} className="mb-2">
              {node.content?.map((child, i) => renderContent([child])[0])}
            </li>
          );

        case 'image':
          return (
            <figure key={index} className="mb-6">
              <img
                src={node.attrs?.src}
                alt={node.attrs?.alt || ''}
                className="w-full rounded-lg shadow-lg"
              />
              {node.attrs?.title && (
                <figcaption className="mt-2 text-center text-sm text-light/70">
                  {node.attrs.title}
                </figcaption>
              )}
            </figure>
          );

        case 'blockquote':
          return (
            <blockquote key={index} className="border-l-4 border-secondary/50 pl-4 my-4 italic text-light/80">
              {node.content?.map((child, i) => renderContent([child])[0])}
            </blockquote>
          );

        case 'youtube':
          return (
            <div key={index} className="relative pb-[56.25%] h-0 mb-6">
              <iframe
                src={node.attrs?.src}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          );

        default:
          return null;
      }
    });
  };

  const renderInlineContent = (node, index) => {
    if (!node) return null;

    switch (node.type) {
      case 'text':
        let content = node.text;
        if (node.marks) {
          node.marks.forEach(mark => {
            switch (mark.type) {
              case 'bold':
                content = <strong key={index}>{content}</strong>;
                break;
              case 'italic':
                content = <em key={index}>{content}</em>;
                break;
              case 'underline':
                content = <u key={index}>{content}</u>;
                break;
              case 'strike':
                content = <del key={index}>{content}</del>;
                break;
              case 'link':
                content = (
                  <a
                    key={index}
                    href={mark.attrs?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-secondary/80 underline"
                  >
                    {content}
                  </a>
                );
                break;
            }
          });
        }
        return content;

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded w-1/3 mb-8"></div>
            <div className="h-64 bg-white/10 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              {error || 'Blog Not Found'}
            </h1>
            <p className="text-light/90 mb-8">
              The blog post you're looking for doesn't exist or couldn't be loaded.
            </p>
            <Link to="/blogs" className="btn-primary">
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
        <div className="container max-w-md mx-auto px-4">
          <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm">
            <div className="text-center mb-8">
              <Lock className="mx-auto mb-4 text-secondary" size={48} />
              <h2 className="text-2xl font-bold mb-2">Preview Access Required</h2>
              <p className="text-light/90">
                Please enter the preview password to access this blog post.
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAuthenticate()}
                  className={`w-full px-4 py-2 rounded-lg bg-white/10 border ${
                    accessDenied ? 'border-red-500' : 'border-white/20'
                  } text-white focus:outline-none focus:border-secondary pr-10`}
                  placeholder="Enter preview password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-light/50 hover:text-light transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {accessDenied && (
                <div className="text-red-500 text-sm">
                  Access denied. Please check your password and try again.
                </div>
              )}
              
              <button
                onClick={handleAuthenticate}
                className="w-full btn-primary"
              >
                Access Preview
              </button>
              <Link
                to="/blogs"
                className="block text-center text-light/70 hover:text-light text-sm"
              >
                Back to Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/blogs"
            className="text-light/70 hover:text-light transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Blogs
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={handleCopyLink}
              className="text-light/70 hover:text-secondary transition-colors"
              title="Copy preview link"
            >
              <Copy size={20} />
            </button>
            <button
              onClick={toggleEditMode}
              className={`px-4 py-2 rounded-lg ${
                editMode 
                  ? 'bg-blue-500 hover:bg-blue-500/90' 
                  : 'bg-white/10 hover:bg-white/20'
              } transition-colors flex items-center gap-2`}
            >
              {editMode ? (
                <>
                  <Eye size={20} />
                  Preview Mode
                </>
              ) : (
                <>
                  <Edit2 size={20} />
                  Edit Mode
                </>
              )}
            </button>
            {editMode && hasChanges && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-secondary text-primary 
                         hover:bg-secondary/90 transition-colors flex items-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 
                       hover:bg-red-500/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className={`mb-8 p-4 rounded-lg flex items-center gap-3 ${
          blog.status === 'draft' 
            ? 'bg-yellow-500/10 border border-yellow-500/20' 
            : 'bg-blue-500/10 border border-blue-500/20'
        }`}>
          {blog.status === 'draft' ? (
            <>
              <AlertTriangle className="text-yellow-500" size={24} />
              <div>
                <h4 className=" font-medium text-yellow-500">Draft</h4>
                <p className="text-sm text-yellow-500/90">
                  This blog post is still in draft mode and not visible to the public.
                </p>
              </div>
            </>
          ) : (
            <>
              <CheckCircle className="text-blue-500" size={24} />
              <div>
                <h4 className="font-medium text-blue-500">Pending Review</h4>
                <p className="text-sm text-blue-500/90">
                  This blog post is awaiting review before publication.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="bg-white/5 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm">
          {editedBlog.banner_image && (
            <img
              src={editedBlog.banner_image}
              alt={editedBlog.title}
              className="w-full h-64 object-cover"
            />
          )}

          <div className="p-8">
            {editMode ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-light mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editedBlog.title}
                    onChange={handleTitleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                             text-white focus:outline-none focus:border-secondary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-light mb-2">
                    Content
                  </label>
                  <BlogEditor
                    initialContent={editedBlog.content}
                    onChange={handleContentChange}
                    onSave={handleSave}
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold mb-4">{editedBlog.title}</h1>

                <div className="flex items-center gap-4 text-light/70 text-sm mb-8">
                  <time dateTime={editedBlog.created_at}>
                    {format(new Date(editedBlog.created_at), 'MMMM d, yyyy')}
                  </time>
                  <div className="flex flex-wrap gap-2">
                    {editedBlog.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full bg-white/10 text-light/90 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  {renderContent(editedBlog.content)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;