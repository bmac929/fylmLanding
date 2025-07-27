// Festival storage utilities
const STORAGE_KEY = 'festivals';
const ARCHIVED_KEY = 'archivedFestivals';
const PENDING_KEY = 'pendingFestivals';

// Status constants
export const FESTIVAL_STATUS = {
  AWAITING_REVIEW: 'AWAITING_REVIEW',
  NEEDS_FIXES: 'NEEDS_FIXES',
  READY_FOR_APPROVAL: 'READY_FOR_APPROVAL'
};

export const loadFestivals = () => {
  try {
    const festivals = localStorage.getItem(STORAGE_KEY);
    return festivals ? JSON.parse(festivals) : [];
  } catch (error) {
    console.error('Error loading festivals:', error);
    return [];
  }
};

export const loadArchivedFestivals = () => {
  try {
    const archived = localStorage.getItem(ARCHIVED_KEY);
    return archived ? JSON.parse(archived) : [];
  } catch (error) {
    console.error('Error loading archived festivals:', error);
    return [];
  }
};

export const loadPendingFestivals = () => {
  try {
    const pending = localStorage.getItem(PENDING_KEY);
    return pending ? JSON.parse(pending) : [];
  } catch (error) {
    console.error('Error loading pending festivals:', error);
    return [];
  }
};

export const saveFestivals = (festivals) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(festivals));
  } catch (error) {
    console.error('Error saving festivals:', error);
  }
};

export const saveArchivedFestivals = (festivals) => {
  try {
    localStorage.setItem(ARCHIVED_KEY, JSON.stringify(festivals));
  } catch (error) {
    console.error('Error saving archived festivals:', error);
  }
};

export const savePendingFestivals = (festivals) => {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(festivals));
  } catch (error) {
    console.error('Error saving pending festivals:', error);
  }
};

export const archiveFestival = (festival) => {
  const festivals = loadFestivals();
  const archived = loadArchivedFestivals();
  
  // Remove from active festivals
  const updatedFestivals = festivals.filter(f => f.id !== festival.id);
  
  // Add to archived with timestamp
  const archivedFestival = {
    ...festival,
    archivedAt: new Date().toISOString()
  };
  
  const updatedArchived = [archivedFestival, ...archived];
  
  saveFestivals(updatedFestivals);
  saveArchivedFestivals(updatedArchived);
  
  return {
    festivals: updatedFestivals,
    archived: updatedArchived
  };
};

export const restoreFestival = (festivalId) => {
  const festivals = loadFestivals();
  const archived = loadArchivedFestivals();
  
  const festivalToRestore = archived.find(f => f.id === festivalId);
  if (!festivalToRestore) return null;
  
  const { archivedAt, ...restoredFestival } = festivalToRestore;
  
  const updatedFestivals = [...festivals, restoredFestival];
  const updatedArchived = archived.filter(f => f.id !== festivalId);
  
  saveFestivals(updatedFestivals);
  saveArchivedFestivals(updatedArchived);
  
  return {
    festivals: updatedFestivals,
    archived: updatedArchived
  };
};

export const updateFestival = (festivalId, updates) => {
  const festivals = loadFestivals();
  const updatedFestivals = festivals.map(festival => 
    festival.id === festivalId ? { ...festival, ...updates } : festival
  );
  saveFestivals(updatedFestivals);
  return updatedFestivals;
};

export const addFestival = (festival) => {
  const festivals = loadFestivals();
  const newFestival = {
    ...festival,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  const updatedFestivals = [...festivals, newFestival];
  saveFestivals(updatedFestivals);
  return updatedFestivals;
};

export const addPendingFestival = (festival, submitter = null) => {
  const pending = loadPendingFestivals();
  const newFestival = {
    ...festival,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: FESTIVAL_STATUS.AWAITING_REVIEW,
    submitter,
    adminNotes: '',
    validationIssues: validateFestival(festival)
  };
  const updatedPending = [...pending, newFestival];
  savePendingFestivals(updatedPending);
  return updatedPending;
};

export const updatePendingFestival = (festivalId, updates) => {
  const pending = loadPendingFestivals();
  const updatedPending = pending.map(festival => {
    if (festival.id === festivalId) {
      const updatedFestival = { ...festival, ...updates };
      // Re-validate if festival data was updated
      if (updates.name || updates.location || updates.type || updates.genres || 
          updates.submissionDeadline || updates.festivalDates || updates.submissionFee || 
          updates.prize || updates.benefits || updates.website) {
        updatedFestival.validationIssues = validateFestival(updatedFestival);
      }
      return updatedFestival;
    }
    return festival;
  });
  savePendingFestivals(updatedPending);
  return updatedPending;
};

export const deletePendingFestival = (festivalId) => {
  const pending = loadPendingFestivals();
  const updatedPending = pending.filter(f => f.id !== festivalId);
  savePendingFestivals(updatedPending);
  return updatedPending;
};

export const approvePendingFestival = (festivalId) => {
  const pending = loadPendingFestivals();
  const festivals = loadFestivals();
  
  const festivalToApprove = pending.find(f => f.id === festivalId);
  if (!festivalToApprove) return null;
  
  // Remove submitter, status, adminNotes, and validationIssues before adding to active
  const { submitter, status, adminNotes, validationIssues, ...approvedFestival } = festivalToApprove;
  
  const updatedFestivals = [...festivals, approvedFestival];
  const updatedPending = pending.filter(f => f.id !== festivalId);
  
  saveFestivals(updatedFestivals);
  savePendingFestivals(updatedPending);
  
  return {
    festivals: updatedFestivals,
    pending: updatedPending
  };
};

export const bulkApprovePendingFestivals = (festivalIds) => {
  const pending = loadPendingFestivals();
  const festivals = loadFestivals();
  
  const festivalsToApprove = pending.filter(f => 
    festivalIds.includes(f.id) && 
    f.status === FESTIVAL_STATUS.READY_FOR_APPROVAL &&
    f.validationIssues.length === 0
  );
  
  const approvedFestivals = festivalsToApprove.map(({ submitter, status, adminNotes, validationIssues, ...festival }) => festival);
  
  const updatedFestivals = [...festivals, ...approvedFestivals];
  const updatedPending = pending.filter(f => !festivalIds.includes(f.id));
  
  saveFestivals(updatedFestivals);
  savePendingFestivals(updatedPending);
  
  return {
    festivals: updatedFestivals,
    pending: updatedPending,
    approved: approvedFestivals.length,
    skipped: festivalIds.length - approvedFestivals.length
  };
};

const validateFestival = (festival) => {
  const issues = [];
  
  // Required fields
  if (!festival.name) issues.push('Festival name is required');
  if (!festival.location) issues.push('Location is required');
  if (!festival.type) issues.push('Type is required');
  if (!festival.genres?.length) issues.push('At least one genre is required');
  if (!festival.submissionDeadline) issues.push('Submission deadline is required');
  if (!festival.festivalDates) issues.push('Festival dates are required');
  if (festival.submissionFee === undefined || festival.submissionFee === null) {
    issues.push('Submission fee is required');
  }
  if (!festival.website) issues.push('Website is required');
  
  // Date validation
  const now = new Date();
  const submissionDeadline = new Date(festival.submissionDeadline);
  const festivalDates = new Date(festival.festivalDates);
  
  if (submissionDeadline < now) {
    issues.push('Submission deadline cannot be in the past');
  }
  if (festivalDates < submissionDeadline) {
    issues.push('Festival dates must be after submission deadline');
  }
  
  // URL validation
  if (festival.website && !isValidUrl(festival.website)) {
    issues.push('Invalid website URL');
  }
  
  return issues;
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};