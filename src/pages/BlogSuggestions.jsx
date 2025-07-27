import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, ChevronDown, ChevronUp, ChevronLeft, 
  ChevronRight, Check, X, Edit2
} from 'lucide-react';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { 
  getBlogSuggestions, 
  updateBlogSuggestion,
  convertSuggestionToBlog 
} from '../utils/blogUtils';
import { SUGGESTION_STATUS } from '../utils/supabase';

const BlogSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: null,
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const { suggestions: data, total, totalPages } = await getBlogSuggestions({
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      });
      setSuggestions(data);
      setPagination(prev => ({ ...prev, total, totalPages }));
    } catch (error) {
      console.error('Error loading suggestions:', error);
      toast.error('Failed to load suggestions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, [pagination.page, pagination.limit, filters]);

  const handleStatusChange = async (suggestion, status) => {
    try {
      await updateBlogSuggestion(suggestion.id, { status });
      toast.success('Status updated successfully');
      loadSuggestions();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleConvertToBlog = async (suggestion) => {
    try {
      const blog = await convertSuggestionToBlog(suggestion);
      toast.success('Suggestion converted to blog post');
      loadSuggestions();
      // Navigate to edit page
      window.location.href = `/blogs/${blog.slug}/edit`;
    } catch (error) {
      console.error('Error converting to blog:', error);
      toast.error('Failed to convert suggestion to blog');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case SUGGESTION_STATUS.PENDING:
        return 'bg-yellow-500/10 text-yellow-500';
      case SUGGESTION_STATUS.APPROVED:
        return 'bg-green-500/10 text-green-500';
      case SUGGESTION_STATUS.REJECTED:
        return 'bg-red-500/10 text-red-500';
      case SUGGESTION_STATUS.USED:
        return 'bg-blue-500/10 text-blue-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Suggestions</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Search suggestions..."
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
        <div className="bg-white/5 rounded-lg p-6 mb-8">
          <div className="max-w-xs">
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
              options={Object.values(SUGGESTION_STATUS).map(status => ({
                value: status,
                label: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
              }))}
              isClearable
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Filter by status"
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {suggestions.map((suggestion) => (
                <tr 
                  key={suggestion.id}
                  className="group hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-secondary">
                      {suggestion.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-light/90">
                      {suggestion.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusColor(suggestion.status)
                    }`}>
                      {suggestion.status.charAt(0).toUpperCase() + 
                       suggestion.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-light/90">
                      {format(new Date(suggestion.created_at), 'PP')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-3">
                      {suggestion.status === SUGGESTION_STATUS.PENDING && (
                        <>
                          <button
                            onClick={() => handleStatusChange(
                              suggestion, 
                              SUGGESTION_STATUS.APPROVED
                            )}
                            className="text-light/70 hover:text-green-500 transition-colors"
                            title="Approve"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => handleStatusChange(
                              suggestion, 
                              SUGGESTION_STATUS.REJECTED
                            )}
                            className="text-light/70 hover:text-red-500 transition-colors"
                            title="Reject"
                          >
                            <X size={18} />
                          </button>
                        </>
                      )}
                      {suggestion.status === SUGGESTION_STATUS.APPROVED && (
                        <button
                          onClick={() => handleConvertToBlog(suggestion)}
                          className="text-light/70 hover:text-secondary transition-colors"
                          title="Convert to Blog"
                        >
                          <Edit2 size={18} />
                        </button>
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
    </div>
  );
};

export default BlogSuggestions;