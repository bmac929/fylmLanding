// Constants for storage keys
export const STORAGE_KEYS = {
  FILM_IDEAS: 'film_ideas',
  FILM_IDEA_HISTORY: 'film_idea_history',
  BLOCKED_DOMAINS: 'blocked_domains'
};

// Film idea status enum
export const FILM_IDEA_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

// Generate a unique reference number
export const generateReferenceNumber = () => {
  const prefix = 'FILM-';
  const number = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  const existingIdeas = loadFilmIdeas();
  
  // Ensure uniqueness
  if (existingIdeas.some(idea => idea.reference_number === prefix + number)) {
    return generateReferenceNumber();
  }
  
  return prefix + number;
};

// Check submission limit (email-only)
export const checkSubmissionLimit = (email) => {
  const ideas = loadFilmIdeas();
  const last24Hours = Date.now() - (24 * 60 * 60 * 1000);
  
  const emailCount = ideas.filter(idea => 
    idea.submitter_email === email && 
    new Date(idea.created_at).getTime() > last24Hours
  ).length;
  
  return emailCount >= 2;
};

// Load film ideas from storage
export const loadFilmIdeas = () => {
  try {
    const ideas = localStorage.getItem(STORAGE_KEYS.FILM_IDEAS);
    return ideas ? JSON.parse(ideas) : [];
  } catch (error) {
    console.error('Error loading film ideas:', error);
    return [];
  }
};

// Save film ideas to storage
export const saveFilmIdeas = (ideas) => {
  try {
    localStorage.setItem(STORAGE_KEYS.FILM_IDEAS, JSON.stringify(ideas));
  } catch (error) {
    console.error('Error saving film ideas:', error);
  }
};

// Submit a new film idea
export const submitFilmIdea = async (formData) => {
  try {
    const ideas = loadFilmIdeas();
    
    // Check submission limit
    if (checkSubmissionLimit(formData.submitter_email)) {
      throw new Error('You have reached the maximum number of submissions for today');
    }
    
    // Generate a unique ID if crypto.randomUUID is not available
    const id = crypto.randomUUID ? 
      crypto.randomUUID() : 
      `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    const newIdea = {
      id,
      reference_number: generateReferenceNumber(),
      ...formData,
      status: FILM_IDEA_STATUS.PENDING,
      admin_notes: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    ideas.push(newIdea);
    saveFilmIdeas(ideas);
    
    return newIdea;
  } catch (error) {
    console.error('Error submitting film idea:', error);
    throw error;
  }
};

// Get submission count
export const getSubmissionCount = async (email) => {
  try {
    const ideas = loadFilmIdeas();
    const last24Hours = Date.now() - (24 * 60 * 60 * 1000);
    
    return ideas.filter(idea => 
      idea.submitter_email === email && 
      new Date(idea.created_at).getTime() > last24Hours
    ).length;
  } catch (error) {
    console.error('Error getting submission count:', error);
    throw error;
  }
};

// Check if email domain is blocked
export const checkBlockedDomain = async (email) => {
  try {
    const domain = email.split('@')[1];
    const blockedDomains = loadBlockedDomains();
    
    return blockedDomains.some(blocked => 
      blocked.is_wildcard 
        ? domain.includes(blocked.domain)
        : domain === blocked.domain
    );
  } catch (error) {
    console.error('Error checking blocked domain:', error);
    throw error;
  }
};

// Load blocked domains
export const loadBlockedDomains = () => {
  try {
    const domains = localStorage.getItem(STORAGE_KEYS.BLOCKED_DOMAINS);
    if (!domains) {
      // Initialize with default blocked domains
      const defaultDomains = [
        { domain: 'tempmail.com', is_wildcard: true },
        { domain: '10minutemail.com', is_wildcard: false },
        { domain: 'guerrillamail.com', is_wildcard: false },
        { domain: 'throwawaymail.com', is_wildcard: true },
        { domain: 'mailinator.com', is_wildcard: true },
        { domain: 'yopmail.com', is_wildcard: true },
        { domain: 'tempinbox.com', is_wildcard: true },
        { domain: 'disposablemail.com', is_wildcard: true },
        { domain: 'trashmail.com', is_wildcard: true },
        { domain: 'sharklasers.com', is_wildcard: false }
      ];
      localStorage.setItem(STORAGE_KEYS.BLOCKED_DOMAINS, JSON.stringify(defaultDomains));
      return defaultDomains;
    }
    return JSON.parse(domains);
  } catch (error) {
    console.error('Error loading blocked domains:', error);
    return [];
  }
};

// Get film ideas with pagination and filters
export const getFilmIdeas = async ({ 
  page = 1, 
  limit = 10,
  status = null,
  search = '',
  orderBy = 'created_at',
  orderDirection = 'desc'
}) => {
  try {
    let ideas = loadFilmIdeas();
    
    // Apply filters
    if (status) {
      ideas = ideas.filter(idea => idea.status === status);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      ideas = ideas.filter(idea => 
        idea.idea_name?.toLowerCase().includes(searchLower) ||
        idea.description?.toLowerCase().includes(searchLower) ||
        idea.submitter_name?.toLowerCase().includes(searchLower) ||
        idea.submitter_email?.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort ideas
    ideas.sort((a, b) => {
      if (orderBy === 'created_at') {
        const dateA = new Date(a[orderBy]).getTime();
        const dateB = new Date(b[orderBy]).getTime();
        return orderDirection === 'desc' ? dateB - dateA : dateA - dateB;
      } else {
        const aValue = a[orderBy] || '';
        const bValue = b[orderBy] || '';
        return orderDirection === 'desc' 
          ? bValue.localeCompare(aValue) 
          : aValue.localeCompare(bValue);
      }
    });
    
    // Paginate
    const total = ideas.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      ideas: ideas.slice(start, end),
      total,
      totalPages
    };
  } catch (error) {
    console.error('Error getting film ideas:', error);
    throw error;
  }
};

// Update a film idea
export const updateFilmIdea = async (id, updates) => {
  try {
    const ideas = loadFilmIdeas();
    const index = ideas.findIndex(idea => idea.id === id);
    
    if (index === -1) {
      throw new Error('Film idea not found');
    }
    
    // Track status change
    if (updates.status && updates.status !== ideas[index].status) {
      const history = loadStatusHistory();
      history.push({
        id: crypto.randomUUID ? crypto.randomUUID() : `history-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        film_idea_id: id,
        old_status: ideas[index].status,
        new_status: updates.status,
        changed_at: new Date().toISOString()
      });
      saveStatusHistory(history);
    }
    
    ideas[index] = {
      ...ideas[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    saveFilmIdeas(ideas);
    return ideas[index];
  } catch (error) {
    console.error('Error updating film idea:', error);
    throw error;
  }
};

// Load status history
export const loadStatusHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.FILM_IDEA_HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error loading status history:', error);
    return [];
  }
};

// Save status history
export const saveStatusHistory = (history) => {
  try {
    localStorage.setItem(STORAGE_KEYS.FILM_IDEA_HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving status history:', error);
  }
};