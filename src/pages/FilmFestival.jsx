import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Film, Search, Filter, Upload, Edit2, Trash2, 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X,
  AlertCircle, CheckCircle, Lock, Plus
} from 'lucide-react';
import { CSVLink } from 'react-csv';
import toast from 'react-hot-toast';
import FestivalEditModal from '../components/FestivalEditModal';
import ArchivedFestivals from '../components/ArchivedFestivals';
import PendingFestivals from '../components/PendingFestivals';
import {
  loadFestivals,
  loadArchivedFestivals,
  loadPendingFestivals,
  saveFestivals,
  saveArchivedFestivals,
  savePendingFestivals,
  archiveFestival,
  restoreFestival,
  updateFestival,
  addFestival,
  addPendingFestival,
  updatePendingFestival,
  deletePendingFestival,
  approvePendingFestival,
  bulkApprovePendingFestivals,
  FESTIVAL_STATUS
} from '../utils/festivalStorage';

// Initial festivals data
const INITIAL_FESTIVALS = [
  {
    id: '1',
    name: 'Independent Spirit Film Festival',
    location: 'Los Angeles, CA, USA',
    type: 'In-Person',
    genres: ['Drama', 'Documentary', 'Independent'],
    submissionDeadline: '2024-12-31',
    festivalDates: '2025-03-15',
    submissionFee: 50,
    prize: 'Best Feature: $10,000',
    benefits: 'Direct distribution opportunities',
    website: 'https://example.com/spirit-festival'
  },
  {
    id: '2',
    name: 'Digital Dreams Film Fest',
    location: 'Virtual',
    type: 'Virtual',
    genres: ['Animation', 'Sci-Fi', 'Fantasy'],
    submissionDeadline: '2024-11-30',
    festivalDates: '2025-02-01',
    submissionFee: 35,
    prize: 'Best Animation: $5,000',
    benefits: 'Online screening platform access',
    website: 'https://example.com/digital-dreams'
  }
];

const FilmFestival = () => {
  // State management
  const [festivals, setFestivals] = useState(() => {
    const saved = localStorage.getItem('festivals');
    return saved ? JSON.parse(saved) : INITIAL_FESTIVALS;
  });
  const [filteredFestivals, setFilteredFestivals] = useState(festivals);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    genres: [],
    submissionFee: '',
    sortBy: 'deadline'
  });
  const [editingFestival, setEditingFestival] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [archivedFestivals, setArchivedFestivals] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [pendingFestivals, setPendingFestivals] = useState([]);

  // Save festivals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('festivals', JSON.stringify(festivals));
  }, [festivals]);

  // Update useEffect to load all festival types
  useEffect(() => {
    const loadedFestivals = loadFestivals();
    const loadedArchived = loadArchivedFestivals();
    const loadedPending = loadPendingFestivals();
    setFestivals(loadedFestivals);
    setArchivedFestivals(loadedArchived);
    setPendingFestivals(loadedPending);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...festivals];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(festival => 
        festival.name.toLowerCase().includes(searchTerm) ||
        festival.location.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.location) {
      result = result.filter(festival => 
        festival.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type) {
      result = result.filter(festival => festival.type === filters.type);
    }

    if (filters.genres.length > 0) {
      result = result.filter(festival => 
        filters.genres.some(genre => festival.genres.includes(genre))
      );
    }

    if (filters.submissionFee) {
      if (filters.submissionFee === 'free') {
        result = result.filter(festival => festival.submissionFee === 0);
      } else if (filters.submissionFee === 'paid') {
        result = result.filter(festival => festival.submissionFee > 0);
      }
    }

    // Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'deadline':
          return new Date(a.submissionDeadline) - new Date(b.submissionDeadline);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(a.festivalDates) - new Date(b.festivalDates);
        default:
          return 0;
      }
    });

    setFilteredFestivals(result);
    setCurrentPage(1);
  }, [festivals, filters]);

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminPassword('');
      toast.success('Admin access granted');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    toast.success('Logged out successfully');
  };

  const handleEdit = (festival) => {
    setEditingFestival(festival);
    setShowEditModal(true);
  };

  const handleSave = (updatedFestival) => {
    if (editingFestival) {
      const updated = updateFestival(editingFestival.id, updatedFestival);
      setFestivals(updated);
      toast.success('Festival updated successfully');
    } else {
      const updated = addFestival(updatedFestival);
      setFestivals(updated);
      toast.success('Festival added successfully');
    }
    setShowEditModal(false);
    setEditingFestival(null);
  };

  const handleDelete = (festival) => {
    setShowDeleteConfirm(festival);
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      const { festivals: updatedFestivals, archived: updatedArchived } = archiveFestival(showDeleteConfirm);
      setFestivals(updatedFestivals);
      setArchivedFestivals(updatedArchived);
      setShowDeleteConfirm(null);
      toast.success('Festival archived successfully');
    }
  };

  const handleRestore = (festivalId) => {
    const result = restoreFestival(festivalId);
    if (result) {
      setFestivals(result.festivals);
      setArchivedFestivals(result.archived);
      toast.success('Festival restored successfully');
    }
  };

  const handleEditPending = (festival) => {
    setEditingFestival(festival);
    setShowEditModal(true);
  };

  const handleDeletePending = (festival) => {
    const updated = deletePendingFestival(festival.id);
    setPendingFestivals(updated);
    toast.success('Festival deleted from pending');
  };

  const handleApprovePending = (festivalId) => {
    const result = approvePendingFestival(festivalId);
    if (result) {
      setFestivals(result.festivals);
      setPendingFestivals(result.pending);
      toast.success('Festival approved successfully');
    }
  };

  const handleBulkApprovePending = (festivalIds) => {
    const result = bulkApprovePendingFestivals(festivalIds);
    if (result) {
      setFestivals(result.festivals);
      setPendingFestivals(result.pending);
      toast.success(`${result.approved} festivals approved successfully`);
      if (result.skipped > 0) {
        toast.warning(`${result.skipped} festivals skipped due to validation issues`);
      }
    }
  };

  const handleUpdatePendingStatus = (festivalId, status) => {
    const updated = updatePendingFestival(festivalId, { status });
    setPendingFestivals(updated);
    toast.success('Festival status updated');
  };

  const handleUpdatePendingNotes = (festivalId, notes) => {
    const updated = updatePendingFestival(festivalId, { adminNotes: notes });
    setPendingFestivals(updated);
    toast.success('Notes updated');
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFestivals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFestivals.length / itemsPerPage);

  const renderAdminButtons = () => (
    <div className="flex items-center gap-4 w-full md:w-auto">
      {isAdmin ? (
        <>
          <button
            onClick={() => {
              setEditingFestival(null);
              setShowEditModal(true);
            }}
            className="px-4 py-2 rounded-lg bg-secondary text-primary font-semibold 
                     hover:bg-secondary/90 transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add Festival
          </button>
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
  );

  const renderAdminActions = (festival) => (
    isAdmin && (
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleEdit(festival)}
            className="text-light/70 hover:text-secondary transition-colors"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => handleDelete(festival)}
            className="text-light/70 hover:text-red-500 transition-colors"
            title="Archive"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    )
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-tertiary/20 blur-3xl -z-10" />
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Film Festivals Directory</h1>
            <p className="text-light/90 text-lg max-w-2xl mx-auto mb-8">
              Discover film festivals, submit your work, and connect with industry professionals. 
              Partner with Fylm TV to expand your reach and opportunities.
            </p>
            <Link
              to="/festival-registration"
              className="inline-flex items-center px-6 py-3 bg-secondary text-primary font-semibold rounded-lg 
                       hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105"
            >
              <Film className="mr-2" size={20} />
              Register Your Festival
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <input
                  type="text"
                  placeholder="Search festivals..."
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

            {renderAdminButtons()}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white/5 rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-light mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Filter by location..."
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                           text-white placeholder-white/50 focus:outline-none focus:border-secondary"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">Type</label>
                <select
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                           text-white focus:outline-none focus:border-secondary"
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                >
                  <option value="" className="bg-primary">All Types</option>
                  <option value="In-Person" className="bg-primary">In-Person</option>
                  <option value="Virtual" className="bg-primary">Virtual</option>
                  <option value="Hybrid" className="bg-primary">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">Submission Fee</label>
                <select
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                           text-white focus:outline-none focus:border-secondary"
                  value={filters.submissionFee}
                  onChange={(e) => setFilters(prev => ({ ...prev, submissionFee: e.target.value }))}
                >
                  <option value="" className="bg-primary">All Fees</option>
                  <option value="free" className="bg-primary">Free</option>
                  <option value="paid" className="bg-primary">Paid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">Sort By</label>
                <select
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                           text-white focus:outline-none focus:border-secondary"
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                >
                  <option value="deadline" className="bg-primary">Submission Deadline</option>
                  <option value="name" className="bg-primary">Festival Name</option>
                  <option value="date" className="bg-primary">Festival Date</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Active Festivals Table */}
        <div className="bg-white/5 rounded-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Festival</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Deadline</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Fee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Prize & Benefits</th>
                  {isAdmin && (
                    <th className="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {currentItems.map((festival) => (
                  <tr 
                    key={festival.id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <a 
                          href={festival.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:text-secondary/80 font-semibold transition-colors"
                        >
                          {festival.name}
                        </a>
                        <div className="text-sm text-light/70 mt-1">
                          {festival.genres.join(', ')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-light/90">{festival.location}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${festival.type === 'Virtual' ? 'bg-blue-500/10 text-blue-500' :
                          festival.type === 'Hybrid' ? 'bg-purple-500/10 text-purple-500' :
                          'bg-green-500/10 text-green-500'}`}>
                        {festival.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-light/90">
                        {new Date(festival.submissionDeadline).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-light/70">
                        Festival: {new Date(festival.festivalDates).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {festival.submissionFee === 0 ? (
                        <span className="text-green-500">Free</span>
                      ) : (
                        <span className="text-light/90">${festival.submissionFee}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="text-secondary font-medium">
                          {festival.prize}
                        </div>
                        <div className="text-sm text-light/70">
                          {festival.benefits}
                        </div>
                      </div>
                    </td>
                    {renderAdminActions(festival)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Festivals Section - Only visible in admin mode */}
        {isAdmin && (
          <PendingFestivals
            festivals={pendingFestivals}
            onEdit={handleEditPending}
            onDelete={handleDeletePending}
            onApprove={handleApprovePending}
            onBulkApprove={handleBulkApprovePending}
            onUpdateStatus={handleUpdatePendingStatus}
            onUpdateNotes={handleUpdatePendingNotes}
          />
        )}

        {/* Archived Festivals Section - Only visible in admin mode */}
        {isAdmin && (
          <div className="mb-12">
            <ArchivedFestivals
              festivals={archivedFestivals}
              onRestore={handleRestore}
            />
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select
              className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white 
                       focus:outline-none focus:border-secondary"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="10" className="bg-primary">10 per page</option>
              <option value="25" className="bg-primary">25 per page</option>
              <option value="50" className="bg-primary">50 per page</option>
              <option value="100" className="bg-primary">100 per page</option>
            </select>
            <span className="text-light/70">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredFestivals.length)} of {filteredFestivals.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/10 border border-white/20 text-white 
                       hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-light/90">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/10 border border-white/20 text-white 
                       hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Admin Login Modal */}
        {showAdminModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-primary p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Admin Login</h3>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="text-light/50 hover:text-light transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
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
                  />
                </div>
                <button
                  onClick={handleAdminLogin}
                  className="w-full px-4 py-2 rounded-lg bg-secondary text-primary font-semibold 
                           hover:bg-secondary/90 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <FestivalEditModal
            festival={editingFestival}
            onSave={handleSave}
            onClose={() => {
              setShowEditModal(false);
              setEditingFestival(null);
            }}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-primary p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
              <div className="text-center">
                <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
                <h3 className="text-xl font-semibold mb-2">Archive Festival?</h3>
                <p className="text-light/90 mb-6">
                  Are you sure you want to archive "{showDeleteConfirm.name}"? 
                  This will move it to the archived section.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg 
                           hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg 
                           hover:bg-red-500/90 transition-colors"
                  >
                    Archive Festival
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

export default FilmFestival;