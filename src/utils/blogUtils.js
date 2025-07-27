// Constants for storage keys
export const STORAGE_KEYS = {
  BLOGS: 'blogs',
  BLOG_SUGGESTIONS: 'blog_suggestions'
};

export const BLOG_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  PUBLISHED: 'published'
};

export const SUGGESTION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  USED: 'used'
};

// Create a slug from title
export const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + 
    '-' + Math.random().toString(36).substring(2, 8);
};

// Load blogs from storage
export const loadBlogs = () => {
  try {
    const blogs = localStorage.getItem(STORAGE_KEYS.BLOGS);
    return blogs ? JSON.parse(blogs) : [];
  } catch (error) {
    console.error('Error loading blogs:', error);
    return [];
  }
};

// Save blogs to storage
export const saveBlogs = (blogs) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
  } catch (error) {
    console.error('Error saving blogs:', error);
  }
};

// Get blog by slug
export const getBlogBySlug = async (slug) => {
  try {
    const blogs = loadBlogs();
    return blogs.find(blog => blog.slug === slug) || null;
  } catch (error) {
    console.error('Error getting blog:', error);
    throw error;
  }
};

// Get blogs with pagination and filters
export const getBlogs = async ({ 
  page = 1, 
  limit = 10, 
  status = null,
  tags = [], 
  search = '',
  orderBy = 'created_at',
  orderDirection = 'desc'
}) => {
  try {
    let blogs = loadBlogs();
    
    // Apply filters
    if (status) {
      blogs = blogs.filter(blog => blog.status === status);
    }

    if (tags.length > 0) {
      blogs = blogs.filter(blog => 
        tags.every(tag => blog.tags?.includes(tag))
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      blogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort blogs
    blogs.sort((a, b) => {
      if (orderBy === 'created_at' || orderBy === 'updated_at' || orderBy === 'published_at') {
        const dateA = new Date(a[orderBy] || 0).getTime();
        const dateB = new Date(b[orderBy] || 0).getTime();
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
    const total = blogs.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      blogs: blogs.slice(start, end),
      total,
      totalPages
    };
  } catch (error) {
    console.error('Error getting blogs:', error);
    throw error;
  }
};

// Create a new blog
export const createBlog = async (blog) => {
  try {
    const blogs = loadBlogs();
    
    const newBlog = {
      id: crypto.randomUUID ? crypto.randomUUID() : `blog-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      slug: createSlug(blog.title),
      ...blog,
      status: BLOG_STATUS.DRAFT,
      author_id: 'admin', // Simulated author ID
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    blogs.push(newBlog);
    saveBlogs(blogs);
    
    return newBlog;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

// Update a blog
export const updateBlog = async (id, updates) => {
  try {
    const blogs = loadBlogs();
    const index = blogs.findIndex(blog => blog.id === id);
    
    if (index === -1) {
      throw new Error('Blog not found');
    }
    
    blogs[index] = {
      ...blogs[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    saveBlogs(blogs);
    return blogs[index];
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
};

// Delete a blog
export const deleteBlog = async (id) => {
  try {
    const blogs = loadBlogs();
    const filteredBlogs = blogs.filter(blog => blog.id !== id);
    saveBlogs(filteredBlogs);
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};

// Publish a blog
export const publishBlog = async (id, scheduledFor = null) => {
  try {
    return updateBlog(id, {
      status: BLOG_STATUS.PUBLISHED,
      published_at: new Date().toISOString(),
      scheduled_for: scheduledFor
    });
  } catch (error) {
    console.error('Error publishing blog:', error);
    throw error;
  }
};

// Blog suggestions
export const loadBlogSuggestions = () => {
  try {
    const suggestions = localStorage.getItem(STORAGE_KEYS.BLOG_SUGGESTIONS);
    return suggestions ? JSON.parse(suggestions) : [];
  } catch (error) {
    console.error('Error loading blog suggestions:', error);
    return [];
  }
};

export const saveBlogSuggestions = (suggestions) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BLOG_SUGGESTIONS, JSON.stringify(suggestions));
  } catch (error) {
    console.error('Error saving blog suggestions:', error);
  }
};

export const getBlogSuggestions = async ({ 
  page = 1, 
  limit = 10,
  status = null,
  search = ''
}) => {
  try {
    let suggestions = loadBlogSuggestions();
    
    if (status) {
      suggestions = suggestions.filter(suggestion => suggestion.status === status);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      suggestions = suggestions.filter(suggestion => 
        suggestion.title.toLowerCase().includes(searchLower) ||
        suggestion.description.toLowerCase().includes(searchLower)
      );
    }
    
    const total = suggestions.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return {
      suggestions: suggestions.slice(start, end),
      total,
      totalPages
    };
  } catch (error) {
    console.error('Error getting blog suggestions:', error);
    throw error;
  }
};

export const updateBlogSuggestion = async (id, updates) => {
  try {
    const suggestions = loadBlogSuggestions();
    const index = suggestions.findIndex(suggestion => suggestion.id === id);
    
    if (index === -1) {
      throw new Error('Blog suggestion not found');
    }
    
    suggestions[index] = {
      ...suggestions[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    saveBlogSuggestions(suggestions);
    return suggestions[index];
  } catch (error) {
    console.error('Error updating blog suggestion:', error);
    throw error;
  }
};

export const convertSuggestionToBlog = async (suggestion) => {
  try {
    // Create the blog post
    const blog = await createBlog({
      title: suggestion.title,
      content: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: suggestion.description || '' }]
          }
        ]
      }
    });

    // Update suggestion status
    await updateBlogSuggestion(suggestion.id, { status: SUGGESTION_STATUS.USED });

    return blog;
  } catch (error) {
    console.error('Error converting suggestion to blog:', error);
    throw error;
  }
};