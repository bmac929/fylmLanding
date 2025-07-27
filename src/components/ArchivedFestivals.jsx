import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

const ArchivedFestivals = ({ festivals, onRestore }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Reset pagination when toggling visibility
  useEffect(() => {
    if (expanded) {
      setCurrentPage(1);
    }
  }, [expanded]);

  if (festivals.length === 0) return null;

  const sortedFestivals = [...festivals].sort((a, b) => 
    new Date(b.archivedAt) - new Date(a.archivedAt)
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFestivals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedFestivals.length / itemsPerPage);

  return (
    <div className="mt-12">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-4 bg-dark rounded-lg 
                 hover:bg-dark/80 transition-colors"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold">Archived Festivals</h3>
          <span className="text-light/50">({festivals.length})</span>
        </div>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {expanded && (
        <div className="mt-4 bg-dark/50 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black/20">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Festival</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Genres</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Dates</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Archived</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {currentItems.map((festival) => (
                  <tr 
                    key={festival.id}
                    className="hover:bg-black/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <a 
                        href={festival.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-secondary/80 font-semibold transition-colors"
                      >
                        {festival.name}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-light/70">
                      {festival.genres.join(', ')}
                    </td>
                    <td className="px-6 py-4 text-light/70">
                      {new Date(festival.festivalDates).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-light/70">
                      {new Date(festival.archivedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onRestore(festival.id)}
                        className="text-secondary hover:text-secondary/80 transition-colors 
                                 inline-flex items-center gap-2"
                        title="Restore festival"
                      >
                        <RotateCcw size={18} />
                        <span>Restore</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-black/20 flex items-center justify-between">
              <span className="text-sm text-light/70">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedFestivals.length)} of {sortedFestivals.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20 
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-white/10 text-white hover:bg-white/20 
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArchivedFestivals;