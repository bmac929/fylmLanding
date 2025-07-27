// Submission Progress Storage Utility
const STORAGE_KEY = 'fylmtv_submission_progress';
const SUBMISSION_STEP_KEY = 'fylmtv_submission_step';

// Define the submission data structure
const DEFAULT_SUBMISSION_DATA = {
  // Step 1: Basic Info
  title: '',
  year: '',
  duration: '120',
  description: '',
  rating: '',
  genre: '',
  warning: 'None',
  
  // Step 2: Authorizer Info
  submitter: '',
  
  // Step 3: Links
  vlink: '',
  vpassword: '',
  tlink: '',
  tpassword: '',
  slink: '',
  spassword: '',
  art: '',
  
  // Step 4: Production Details
  cast: [],
  
  // Step 5: Payment Options
  payment: '',
  
  // Metadata
  lastSaved: null,
  isComplete: false
};

// Save submission progress
export const saveSubmissionProgress = (data, step = 1) => {
  try {
    const progressData = {
      ...data,
      lastSaved: new Date().toISOString(),
      currentStep: step
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
    localStorage.setItem(SUBMISSION_STEP_KEY, step.toString());
    
    console.log('Submission progress saved:', progressData);
    return true;
  } catch (error) {
    console.error('Error saving submission progress:', error);
    return false;
  }
};

// Load submission progress
export const loadSubmissionProgress = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const currentStep = localStorage.getItem(SUBMISSION_STEP_KEY);
    
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return {
        data: { ...DEFAULT_SUBMISSION_DATA, ...parsedData },
        currentStep: parseInt(currentStep) || 1,
        hasProgress: true
      };
    }
    
    return {
      data: { ...DEFAULT_SUBMISSION_DATA },
      currentStep: 1,
      hasProgress: false
    };
  } catch (error) {
    console.error('Error loading submission progress:', error);
    return {
      data: { ...DEFAULT_SUBMISSION_DATA },
      currentStep: 1,
      hasProgress: false
    };
  }
};

// Clear submission progress
export const clearSubmissionProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SUBMISSION_STEP_KEY);
    console.log('Submission progress cleared');
    return true;
  } catch (error) {
    console.error('Error clearing submission progress:', error);
    return false;
  }
};

// Check if there's saved progress
export const hasSubmissionProgress = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return !!savedData;
  } catch (error) {
    console.error('Error checking submission progress:', error);
    return false;
  }
};

// Get the current step
export const getCurrentStep = () => {
  try {
    const step = localStorage.getItem(SUBMISSION_STEP_KEY);
    return step ? parseInt(step) : 1;
  } catch (error) {
    console.error('Error getting current step:', error);
    return 1;
  }
};

// Update specific fields in submission data
export const updateSubmissionField = (field, value) => {
  try {
    const currentData = loadSubmissionProgress();
    const updatedData = {
      ...currentData.data,
      [field]: value
    };
    
    saveSubmissionProgress(updatedData, currentData.currentStep);
    return true;
  } catch (error) {
    console.error('Error updating submission field:', error);
    return false;
  }
};

// Save progress for a specific step
export const saveStepProgress = (stepData, stepNumber) => {
  try {
    const currentData = loadSubmissionProgress();
    const updatedData = {
      ...currentData.data,
      ...stepData
    };
    
    saveSubmissionProgress(updatedData, stepNumber);
    return true;
  } catch (error) {
    console.error('Error saving step progress:', error);
    return false;
  }
};

// Auto-save functionality
export const setupAutoSave = (data, step, delay = 30000) => {
  return setTimeout(() => {
    saveSubmissionProgress(data, step);
  }, delay);
};

// Get submission summary for display
export const getSubmissionSummary = () => {
  try {
    const { data, currentStep } = loadSubmissionProgress();
    
    return {
      title: data.title || 'Untitled',
      currentStep,
      lastSaved: data.lastSaved ? new Date(data.lastSaved).toLocaleString() : 'Never',
      progress: Math.round((currentStep / 5) * 100),
      hasData: !!(data.title || data.description || data.vlink)
    };
  } catch (error) {
    console.error('Error getting submission summary:', error);
    return {
      title: 'Untitled',
      currentStep: 1,
      lastSaved: 'Never',
      progress: 0,
      hasData: false
    };
  }
}; 