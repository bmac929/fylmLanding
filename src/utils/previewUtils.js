import { nanoid } from 'nanoid';
import CryptoJS from 'crypto-js';

// Store preview sessions in localStorage
const PREVIEW_SESSIONS_KEY = 'blog_preview_sessions';
const SESSION_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
const BLOG_PASSWORDS_KEY = 'blog_preview_passwords';

// Create a preview session
export const createPreviewSession = (blogId) => {
  const sessions = getPreviewSessions();
  const password = nanoid(8); // Generate random 8-character password
  const session = {
    blogId,
    password,
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION
  };
  
  sessions[blogId] = session;
  localStorage.setItem(PREVIEW_SESSIONS_KEY, JSON.stringify(sessions));
  
  return session;
};

// Validate a preview session
export const validatePreviewSession = (blogId, password) => {
  const sessions = getPreviewSessions();
  const session = sessions[blogId];
  
  if (!session) return false;
  if (session.password !== password) return false;
  if (Date.now() > session.expiresAt) {
    // Session expired, clean it up
    deletePreviewSession(blogId);
    return false;
  }
  
  return true;
};

// Get all preview sessions
export const getPreviewSessions = () => {
  try {
    const sessions = localStorage.getItem(PREVIEW_SESSIONS_KEY);
    return sessions ? JSON.parse(sessions) : {};
  } catch (error) {
    console.error('Error loading preview sessions:', error);
    return {};
  }
};

// Delete a preview session
export const deletePreviewSession = (blogId) => {
  const sessions = getPreviewSessions();
  delete sessions[blogId];
  localStorage.setItem(PREVIEW_SESSIONS_KEY, JSON.stringify(sessions));
};

// Clean up expired sessions
export const cleanupExpiredSessions = () => {
  const sessions = getPreviewSessions();
  const now = Date.now();
  let hasExpired = false;
  
  Object.keys(sessions).forEach(blogId => {
    if (now > sessions[blogId].expiresAt) {
      delete sessions[blogId];
      hasExpired = true;
    }
  });
  
  if (hasExpired) {
    localStorage.setItem(PREVIEW_SESSIONS_KEY, JSON.stringify(sessions));
  }
};

// Set a blog preview password
export const setBlogPreviewPassword = (blogId, password) => {
  try {
    const passwords = getBlogPreviewPasswords();
    // Hash the password for security
    const hashedPassword = CryptoJS.SHA256(password).toString();
    
    passwords[blogId] = {
      hashedPassword,
      createdAt: Date.now()
    };
    
    localStorage.setItem(BLOG_PASSWORDS_KEY, JSON.stringify(passwords));
    return true;
  } catch (error) {
    console.error('Error setting blog preview password:', error);
    return false;
  }
};

// Verify a blog preview password
export const verifyBlogPreviewPassword = (blogId, password) => {
  try {
    const passwords = getBlogPreviewPasswords();
    const blogPassword = passwords[blogId];
    
    if (!blogPassword) return false;
    
    // Hash the input password and compare
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return hashedPassword === blogPassword.hashedPassword;
  } catch (error) {
    console.error('Error verifying blog preview password:', error);
    return false;
  }
};

// Get all blog preview passwords
export const getBlogPreviewPasswords = () => {
  try {
    const passwords = localStorage.getItem(BLOG_PASSWORDS_KEY);
    return passwords ? JSON.parse(passwords) : {};
  } catch (error) {
    console.error('Error loading blog preview passwords:', error);
    return {};
  }
};

// Check if a blog has a preview password
export const hasBlogPreviewPassword = (blogId) => {
  const passwords = getBlogPreviewPasswords();
  return !!passwords[blogId];
};