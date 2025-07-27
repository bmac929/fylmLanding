import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, ChevronDown, ChevronUp, ChevronLeft, 
  ChevronRight, Edit2, MessageCircle, CheckCircle, X
} from 'lucide-react';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { getFilmIdeas, updateFilmIdea } from '../utils/filmIdeaUtils';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' }
];

const AdminFilmIdeas = () => {
  const [ideas, setIdeas] = useState([]);
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
  const [editingNotes, setEditingNotes] = useState({});
  const [showNotes, setShowNotes] = useState({});

  const loadIdeas = async () => {
    try {
      setLoading(true);
      const { ideas: data, total, totalPages } = await getFilmIdeas({
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      });
      setIdeas(data);
      setPagination(prev => ({ ...prev, total, totalPages }));
    } catch (error) {
      console.error('Error loading ideas:', error);
      toast.error('Failed to load film ideas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIdeas();
  }, [pagination.page, pagination.limit, filters]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateFilmIdea(id, { status });
      toast.success('Status updated successfully');
      loadIdeas();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleUpdateNotes = async (id, notes) => {
    try {
      await updateFilmIdea(id, { admin_notes: notes });
      setEditingNotes(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
      toast.success('Notes updated successfully');
      loadIdeas();
    } catch (error) {
      console.error('Error updating notes:', error);
      toast.error('Failed to update notes');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'reviewed':
        return 'bg-blue-500/10 text-blue-500';
      case 'approved':
        return 'bg-green-500/10 text-green-500';
      case 'rejected':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
        <div className="container max-w-7xl mx-auto px-4">
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

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Film Ideas</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search ideas..."
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
                options={STATUS_OPTIONS}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Reference</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Idea</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Submitter</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {ideas.map((idea) => (
                  <React.Fragment key={idea.id}>
                    <tr className="group hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-secondary">
                          {idea.reference_number}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-secondary">
                            {idea.idea_name}
                          </div>
                          <div className="text-sm text-light/70 mt-1">
                            {idea.genres.join(', ')}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-light/90">{idea.submitter_name}</div>
                          <div className="text-sm text-light/70">{idea.submitter_email}</div>
                          {idea.submitter_career && (
                            <div className="text-sm text-light/50 mt-1">
                              {idea.submitter_career}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          getStatusColor(idea.status)
                        }`}>
                          {idea.status.charAt(0).toUpperCase() + idea.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-light/90">
                          {format(new Date(idea.created_at), 'PP')}
                        </div>
                        <div className="text-sm text-light/70">
                          {format(new Date(idea.created_at), 'p')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-3">
                          <button
                            onClick={() => setShowNotes(prev => ({
                              ...prev,
                              [idea.id]: !prev[idea.id]
                            }))}
                            className="text-light/70 hover:text-secondary transition-colors"
                            title="Notes"
                          >
                            <MessageCircle size={18} />
                          </button>
                          {idea.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(idea.id, 'reviewed')}
                                className="text-light/70 hover:text-blue-500 transition-colors"
                                title="Mark as Reviewed"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(idea.id, 'approved')}
                                className="text-light/70 hover:text-green-500 transition-colors"
                                title="Approve"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(idea.id, 'rejected')}
                                className="text-light/70 hover:text-red-500 transition-colors"
                                title="Reject"
                              >
                                <X size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                    {showNotes[idea.id] && (
                      <tr className="bg-white/5">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-light">Admin Notes</h4>
                              <div className="space-x-2">
                                <select
                                  value={idea.status}
                                  onChange={(e) => handleUpdateStatus(idea.id, e.target.value)}
                                  className="px-2 py-1 rounded bg-white/10 border border-white/20 text-sm
                                           text-white focus:outline-none focus:border-secondary"
                                >
                                  {STATUS_OPTIONS.map(option => (
                                    <option key={option.value} value={option.value} className="bg-primary">
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {editingNotes[idea.id] !== undefined ? (
                              <div className="space-y-2">
                                <textarea
                                  value={editingNotes[idea.id]}
                                  onChange={(e) => setEditingNotes(prev => ({
                                    ...prev,
                                    [idea.id]: e.target.value
                                  }))}
                                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                                           text-white focus:outline-none focus:border-secondary h-24"
                                  placeholder="Add notes about this idea..."
                                />
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => setEditingNotes(prev => {
                                      const newState = { ...prev };
                                      delete newState[idea.id];
                                      return newState;
                                    })}
                                    className="px-3 py-1 rounded text-sm text-red-500 hover:bg-red-500/10"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleUpdateNotes(idea.id, editingNotes[idea.id])}
                                    className="px-3 py-1 rounded text-sm bg-secondary text-primary hover:bg-secondary/90"
                                  >
                                    Save Notes
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div 
                                className="p-4 rounded-lg bg-white/10 min-h-[60px] cursor-pointer hover:bg-white/20"
                                onClick={() => setEditingNotes(prev => ({
                                  ...prev,
                                  [idea.id]: idea.admin_notes || ''
                                }))}
                              >
                                {idea.admin_notes || 'Click to add notes...'}
                              </div>
                            )}

                            <div className="mt-4 p-4 bg-white/10 rounded-lg">
                              <h5 className="text-sm font-medium text-light mb-4">Film Idea Description:</h5>
                              <p className="text-light/90 whitespace-pre-wrap">
                                {idea.description}
                              </p>
                            </div>

                            {idea.film_idea_status_history?.length > 0 && (
                              <div className="mt-4">
                                <h5 className="text-sm font-medium text-light mb-2">Status History:</h5>
                                <div className="space-y-2">
                                  {idea.film_idea_status_history
                                    .sort((a, b) => new Date(b.changed_at) - new Date(a.changed_at))
                                    .map((history) => (
                                      <div 
                                        key={history.id}
                                        className="text-sm text-light/70 flex items-center gap-2"
                                      >
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                          getStatusColor(history.new_status)
                                        }`}>
                                          {history.new_status}
                                        </span>
                                        <span>•</span>
                                        <span>{format(new Date(history.changed_at), 'PP p')}</span>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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
                         hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor- not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFilmIdeas;