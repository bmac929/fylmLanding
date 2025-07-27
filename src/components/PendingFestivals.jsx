import React, { useState } from 'react';
import { 
  CheckCircle, AlertTriangle, Clock, ChevronDown, ChevronUp,
  Edit2, Trash2, Check, X, MessageCircle
} from 'lucide-react';
import { FESTIVAL_STATUS } from '../utils/festivalStorage';

const StatusIcon = ({ status }) => {
  switch (status) {
    case FESTIVAL_STATUS.AWAITING_REVIEW:
      return <Clock size={16} className="text-blue-500" />;
    case FESTIVAL_STATUS.NEEDS_FIXES:
      return <AlertTriangle size={16} className="text-yellow-500" />;
    case FESTIVAL_STATUS.READY_FOR_APPROVAL:
      return <CheckCircle size={16} className="text-green-500" />;
    default:
      return null;
  }
};

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case FESTIVAL_STATUS.AWAITING_REVIEW:
        return 'bg-blue-500/10 text-blue-500';
      case FESTIVAL_STATUS.NEEDS_FIXES:
        return 'bg-yellow-500/10 text-yellow-500';
      case FESTIVAL_STATUS.READY_FOR_APPROVAL:
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case FESTIVAL_STATUS.AWAITING_REVIEW:
        return 'Awaiting Review';
      case FESTIVAL_STATUS.NEEDS_FIXES:
        return 'Needs Fixes';
      case FESTIVAL_STATUS.READY_FOR_APPROVAL:
        return 'Ready for Approval';
      default:
        return 'Unknown Status';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      <StatusIcon status={status} />
      {getStatusText()}
    </span>
  );
};

const PendingFestivals = ({ 
  festivals, 
  onEdit, 
  onDelete, 
  onApprove, 
  onBulkApprove,
  onUpdateStatus,
  onUpdateNotes
}) => {
  const [expanded, setExpanded] = useState(true);
  const [selectedFestivals, setSelectedFestivals] = useState([]);
  const [showNotes, setShowNotes] = useState({});
  const [editingNotes, setEditingNotes] = useState({});

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const approvalReady = festivals
        .filter(f => f.status === FESTIVAL_STATUS.READY_FOR_APPROVAL)
        .map(f => f.id);
      setSelectedFestivals(approvalReady);
    } else {
      setSelectedFestivals([]);
    }
  };

  const handleSelect = (festivalId) => {
    setSelectedFestivals(prev => {
      if (prev.includes(festivalId)) {
        return prev.filter(id => id !== festivalId);
      }
      return [...prev, festivalId];
    });
  };

  const toggleNotes = (festivalId) => {
    setShowNotes(prev => ({
      ...prev,
      [festivalId]: !prev[festivalId]
    }));
  };

  const handleNotesChange = (festivalId, notes) => {
    setEditingNotes(prev => ({
      ...prev,
      [festivalId]: notes
    }));
  };

  const saveNotes = (festivalId) => {
    onUpdateNotes(festivalId, editingNotes[festivalId]);
    setEditingNotes(prev => {
      const newState = { ...prev };
      delete newState[festivalId];
      return newState;
    });
  };

  if (festivals.length === 0) return null;

  return (
    <div className="mb-8">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-4 bg-yellow-500/10 rounded-lg 
                 hover:bg-yellow-500/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold text-yellow-500">
            Pending Festivals ({festivals.length})
          </h3>
        </div>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {expanded && (
        <div className="mt-4 bg-white/5 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/10">
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedFestivals.length === festivals.filter(f => 
                        f.status === FESTIVAL_STATUS.READY_FOR_APPROVAL
                      ).length}
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Festival</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Genres</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Deadline</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Validation</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {festivals.map((festival) => (
                  <React.Fragment key={festival.id}>
                    <tr className="group hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        {festival.status === FESTIVAL_STATUS.READY_FOR_APPROVAL && (
                          <input
                            type="checkbox"
                            checked={selectedFestivals.includes(festival.id)}
                            onChange={() => handleSelect(festival.id)}
                          />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={festival.status} />
                      </td>
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
                          {festival.submitter && (
                            <div className="text-sm text-light/70 mt-1">
                              Submitted by: {festival.submitter.name}
                            </div>
                          )}
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
                        <div className="text-sm text-light/90">
                          {festival.genres?.join(', ') || 'N/A'}
                        </div>
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
                        {festival.validationIssues.length > 0 ? (
                          <div className="text-red-500 text-sm">
                            {festival.validationIssues.length} issue(s)
                          </div>
                        ) : (
                          <CheckCircle className="text-green-500" size={16} />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-3">
                          <button
                            onClick={() => toggleNotes(festival.id)}
                            className="text-light/70 hover:text-secondary transition-colors"
                            title="Notes"
                          >
                            <MessageCircle size={18} />
                          </button>
                          <button
                            onClick={() => onEdit(festival)}
                            className="text-light/70 hover:text-secondary transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          {festival.status === FESTIVAL_STATUS.READY_FOR_APPROVAL && (
                            <button
                              onClick={() => onApprove(festival.id)}
                              className="text-light/70 hover:text-green-500 transition-colors"
                              title="Approve"
                            >
                              <Check size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => onDelete(festival)}
                            className="text-light/70 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {showNotes[festival.id] && (
                      <tr className="bg-white/5">
                        <td colSpan={9} className="px-6 py-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-light">Admin Notes</h4>
                              <div className="space-x-2">
                                <select
                                  value={festival.status}
                                  onChange={(e) => onUpdateStatus(festival.id, e.target.value)}
                                  className="px-2 py-1 rounded bg-white/10 border border-white/20 text-sm
                                           text-white focus:outline-none focus:border-secondary"
                                >
                                  {Object.values(FESTIVAL_STATUS).map(status => (
                                    <option key={status} value={status} className="bg-primary">
                                      {status.replace(/_/g, ' ').toLowerCase()}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            {editingNotes[festival.id] !== undefined ? (
                              <div className="space-y-2">
                                <textarea
                                  value={editingNotes[festival.id]}
                                  onChange={(e) => handleNotesChange(festival.id, e.target.value)}
                                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                                           text-white focus:outline-none focus:border-secondary h-24"
                                  placeholder="Add notes about this festival..."
                                />
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => setEditingNotes(prev => {
                                      const newState = { ...prev };
                                      delete newState[festival.id];
                                      return newState;
                                    })}
                                    className="px-3 py-1 rounded text-sm text-red-500 hover:bg-red-500/10"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => saveNotes(festival.id)}
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
                                  [festival.id]: festival.adminNotes || ''
                                }))}
                              >
                                {festival.adminNotes || 'Click to add notes...'}
                              </div>
                            )}

                            {festival.submitter && (
                              <div className="mt-4 p-4 bg-white/10 rounded-lg">
                                <h5 className="text-sm font-medium text-light mb-2">Contact Details:</h5>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="text-light/70">Name:</span>
                                    <p className="text-light">{festival.submitter.name}</p>
                                  </div>
                                  <div>
                                    <span className="text-light/70">Email:</span>
                                    <p className="text-light">{festival.submitter.email}</p>
                                  </div>
                                  <div>
                                    <span className="text-light/70">Phone:</span>
                                    <p className="text-light">{festival.submitter.phone}</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {festival.validationIssues.length > 0 && (
                              <div className="mt-4">
                                <h5 className="text-sm font-medium text-red-500 mb-2">Validation Issues:</h5>
                                <ul className="list-disc list-inside space-y-1">
                                  {festival.validationIssues.map((issue, index) => (
                                    <li key={index} className="text-sm text-red-500/90">
                                      {issue}
                                    </li>
                                  ))}
                                </ul>
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

          {selectedFestivals.length > 0 && (
            <div className="px-6 py-4 bg-white/10 flex items-center justify-between">
              <span className="text-sm text-light/90">
                {selectedFestivals.length} festival(s) selected
              </span>
              <button
                onClick={() => onBulkApprove(selectedFestivals)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-500/90 
                         transition-colors flex items-center gap-2"
              >
                <Check size={18} />
                Approve Selected
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PendingFestivals;