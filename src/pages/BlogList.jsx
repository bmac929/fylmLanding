import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, ChevronDown, ChevronUp, ChevronLeft, 
  ChevronRight, Edit2, Trash2, Eye, Clock, Lock
} from 'lucide-react';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { getBlogs, deleteBlog } from '../utils/blogUtils';
import { BLOG_STATUS } from '../utils/supabase';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [filters, setFilters] = useState({
    status: null,
    tags: [],
    search: '',
    orderBy: 'created_at',
    orderDirection: 'desc'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    // Check if admin status is stored in localStorage
    const storedAdminStatus = localStorage.getItem('isAdmin');
    if (storedAdminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminPassword('');
      localStorage.setItem('isAdmin', 'true');
      toast.success('Admin access granted');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    toast.success('Logged out successfully');
  };

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const { blogs: data, total, totalPages } = await getBlogs({
        page: pagination.page,
        limit: pagination.limit,
        // Only show published blogs for non-admin users
        status: isAdmin ? filters.status : BLOG_STATUS.PUBLISHED,
        tags: filters.tags,
        search: filters.search,
        orderBy: filters.orderBy,
        orderDirection: filters.orderDirection
      });
      setBlogs(data);
      setPagination(prev => ({ ...prev, total, totalPages }));
    } catch (error) {
      console.error('Error loading blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, [pagination.page, pagination.limit, filters, isAdmin]);

  const handleDelete = async (blog) => {
    try {
      await deleteBlog(blog.id);
      toast.success('Blog deleted successfully');
      loadBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
    setShowDeleteConfirm(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case BLOG_STATUS.DRAFT:
        return 'bg-yellow-500/10 text-yellow-500';
      case BLOG_STATUS.PENDING:
        return 'bg-blue-500/10 text-blue-500';
      case BLOG_STATUS.PUBLISHED:
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <div className="flex items-center gap-4">
            {isAdmin ? (
              <>
                <Link
                  to="/blogs/new"
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus size={20} />
                  New Blog Post
                </Link>
                <button
                  onClick={handleAdminLogout}
                  className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 font-semibold 
                           hover:bg-red-500/20 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAdminModal(true)}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white 
                         hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <Lock size={18} />
                Admin Login
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search blogs..."
                className="w-full md:w-64 px-4 py-2 pl-10 rounded-lg bg-white/10 border border-white/20 
                         text-white placeholder-white/50 focus:outline-none focus:border-secondary"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white 
                       hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <Filter size={18} />
              <span className="hidden md:inline">Filters</span>
              {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white/5 rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {isAdmin && (
              <div>
                <label className="block text-sm font-medium text-light mb-2">Status</label>
                <Select
                  value={filters.status ? { 
                    value: filters.status, 
                    label: filters.status.charAt(0).toUpperCase() + filters.status.slice(1) 
                  } : null}
                  onChange={(option) => setFilters(prev => ({ 
                    ...prev, 
                    status: option?.value || null 
                  }))}
                  options={[
                    { value: BLOG_STATUS.DRAFT, label: 'Draft' },
                    { value: BLOG_STATUS.PENDING, label: 'Pending' },
                    { value: BLOG_STATUS.PUBLISHED, label: 'Published' }
                  ]}
                  isClearable
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Filter by status"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-light mb-2">Tags</label>
              <Select
                isMulti
                value={filters.tags.map(tag => ({ value: tag, label: tag }))}
                onChange={(options) => setFilters(prev => ({ 
                  ...prev, 
                  tags: options.map(opt => opt.value)
                }))}
                options={[
                  // TODO: Load tags dynamically
                  { value: 'technology', label: 'Technology' },
                  { value: 'filmmaking', label: 'Filmmaking' },
                  { value: 'indie', label: 'Indie' }
                ]}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Filter by tags"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-light mb-2">Sort By</label>
              <Select
                value={{
                  value: `${filters.orderBy}-${filters.orderDirection}`,
                  label: `${filters.orderBy === 'created_at' ? 'Date' : 'Title'} (${
                    filters.orderDirection === 'desc' ? 'Newest' : 'Oldest'
                  })`
                }}
                onChange={(option) => {
                  const [orderBy, orderDirection] = option.value.split('-');
                  setFilters(prev => ({ ...prev, orderBy, orderDirection }));
                }}
                options={[
                  { value: 'created_at-desc', label: 'Date (Newest)' },
                  { value: 'created_at-asc', label: 'Date (Oldest)' },
                  { value: 'title-asc', label: 'Title (A-Z)' },
                  { value: 'title-desc', label: 'Title (Z-A)' }
                ]}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </div>
        )}

        <div className="bg-white/5 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Tags</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {blogs.map((blog) => (
                  <tr 
                    key={blog.id}
                    className="group hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <Link
                          to={`/blogs/${blog.slug}`}
                          className="text-secondary hover:text-secondary/80 font-semibold transition-colors"
                        >
                          {blog.title}
                        </Link>
                        {blog.scheduled_for && (
                          <div className="flex items-center gap-1 text-sm text-light/70 mt-1">
                            <Clock size={14} />
                            Scheduled for: {format(new Date(blog.scheduled_for), 'PPp')}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getStatusColor(blog.status)
                      }`}>
                        {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {blog.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-full text-xs bg-white/10 text-light/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-light/90">
                        {format(new Date(blog.created_at), 'PP')}
                      </div>
                      {blog.published_at && (
                        <div className="text-sm text-light/70">
                          Published: {format(new Date(blog.published_at), 'PP')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-3">
                        {isAdmin ? (
                          <>
                            <Link
                              to={`/blogs/${blog.slug}/preview`}
                              className="text-light/70 hover:text-secondary transition-colors"
                              title="Preview"
                            >
                              <Eye size={18} />
                            </Link>
                            <Link
                              to={`/blogs/${blog.slug}/edit`}
                              className="text-light/70 hover:text-secondary transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </Link>
                            <button
                              onClick={() => setShowDeleteConfirm(blog)}
                              className="text-light/70 hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        ) : (
                          <Link
                            to={`/blogs/${blog.slug}`}
                            className="text-light/70 hover:text-secondary transition-colors"
                            title="View"
                          >
                            <Eye size={18} />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-white/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white 
                         focus:outline-none focus:border-secondary"
                value={pagination.limit}
                onChange={(e) => setPagination(prev => ({ 
                  ...prev, 
                  limit: Number(e.target.value),
                  page: 1
                }))}
              >
                <option value="10" className="bg-primary">10 per page</option>
                <option value="25" className="bg-primary">25 per page</option>
                <option value="50" className="bg-primary">50 per page</option>
                <option value="100" className="bg-primary">100 per page</option>
              </select>
              <span className="text-light/70">
                Showing {(pagination.page - 1) * pagination.limit + 1}-
                {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className="p-2 rounded-lg bg-white/10 border border-white/20 text-white 
                         hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-light/90">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.totalPages}
                className="p-2 rounded-lg bg-white/10 border border-white/20 text-white 
                         hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-primary p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">Delete Blog Post?</h3>
              <p className="text-light/90 mb-6">
                Are you sure you want to delete "{showDeleteConfirm.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white 
                           hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white 
                           hover:bg-red-500/90 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Login Modal */}
        {showAdminModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-primary p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">Admin Login</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-light mb-2">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                             text-white focus:outline-none focus:border-secondary"
                    placeholder="Enter admin password"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAdminLogin();
                      }
                    }}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowAdminModal(false)}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white 
                             hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdminLogin}
                    className="px-4 py-2 rounded-lg bg-secondary text-primary font-semibold 
                             hover:bg-secondary/90 transition-colors"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;