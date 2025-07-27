import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Edit2, ArrowLeft, EyeOff } from 'lucide-react';
import { getBlogBySlug, updateBlog } from '../utils/blogUtils';
import { BLOG_STATUS } from '../utils/supabase';
import toast from 'react-hot-toast';

const BlogView = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [unpublishing, setUnpublishing] = useState(false);

  useEffect(() => {
    // Check if admin status is stored in localStorage
    const storedAdminStatus = localStorage.getItem('isAdmin');
    if (storedAdminStatus === 'true') {
      setIsAdmin(true);
    }

    const loadBlog = async () => {
      try {
        const data = await getBlogBySlug(slug);
        setBlog(data);
      } catch (error) {
        console.error('Error loading blog:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  const handleUnpublish = async () => {
    if (!blog) return;
    
    try {
      setUnpublishing(true);
      const updatedBlog = await updateBlog(blog.id, {
        status: BLOG_STATUS.DRAFT,
        published_at: null,
        scheduled_for: null
      });
      
      setBlog(updatedBlog);
      toast.success('Blog unpublished successfully');
    } catch (error) {
      console.error('Error unpublishing blog:', error);
      toast.error('Failed to unpublish blog');
    } finally {
      setUnpublishing(false);
    }
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

  if (!blog) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
            <p className="text-light/90 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blogs" className="btn-primary">
              Back to Blogs
            </Link>
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
            {isAdmin && (
              <>
                <Link
                  to={`/blogs/${blog.slug}/edit`}
                  className="px-4 py-2 rounded-lg bg-secondary text-primary 
                           hover:bg-secondary/90 transition-colors flex items-center gap-2"
                >
                  <Edit2 size={20} />
                  Edit
                </Link>
                
                {blog.status === BLOG_STATUS.PUBLISHED && (
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
                )}
              </>
            )}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl shadow-xl overflow-hidden backdrop-blur-sm">
          {blog.banner_image && (
            <img
              src={blog.banner_image}
              alt={blog.title}
              className="w-full h-64 object-cover"
            />
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

            <div className="flex items-center gap-4 text-light/70 text-sm mb-8">
              <time dateTime={blog.published_at || blog.created_at}>
                {format(new Date(blog.published_at || blog.created_at), 'MMMM d, yyyy')}
              </time>
              <div className="flex flex-wrap gap-2">
                {blog.tags?.map((tag) => (
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
              {renderContent(blog.content)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;