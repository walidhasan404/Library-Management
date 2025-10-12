// API Configuration for Library Management Frontend
// Updated to work with new structured backend

// Base API URL - Update this to your new Vercel deployment URL
const API_BASE_URL = 'https://library-management-server-p1n8x5zon-md-olide-hasans-projects.vercel.app';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  JWT: `${API_BASE_URL}/api/users/auth/jwt`,
  
  // Books
  BOOKS: `${API_BASE_URL}/api/books`,
  BOOK_BY_ID: (id) => `${API_BASE_URL}/api/books/${id}`,
  BOOKS_BY_CATEGORY: (category) => `${API_BASE_URL}/api/books/category/${category}`,
  SEARCH_BOOKS: `${API_BASE_URL}/api/books/search`,
  
  // Borrowed Books
  BORROWED_BOOKS: `${API_BASE_URL}/api/borrowed`,
  BORROW_BOOK: `${API_BASE_URL}/api/borrowed`,
  RETURN_BOOK: (id) => `${API_BASE_URL}/api/borrowed/${id}/return`,
  ALL_BORROWED_BOOKS: `${API_BASE_URL}/api/borrowed/all`,
  
  // Added Books (User Suggestions)
  ADDED_BOOKS: `${API_BASE_URL}/api/added`,
  ADD_BOOK: `${API_BASE_URL}/api/added`,
  ADDED_BOOK_BY_ID: (id) => `${API_BASE_URL}/api/added/${id}`,
  ALL_ADDED_BOOKS: `${API_BASE_URL}/api/added/all`,
  
  // Users
  USERS: `${API_BASE_URL}/api/users`,
  USER_BY_ID: (id) => `${API_BASE_URL}/api/users/${id}`,
  CHECK_ADMIN: (email) => `${API_BASE_URL}/api/users/admin/${email}`,
  
  // Health Check
  HEALTH: `${API_BASE_URL}/api/health`,
  ROOT: API_BASE_URL
};

// API Helper Functions
export const apiHelpers = {
  // Get authorization headers
  getAuthHeaders: () => {
    const token = localStorage.getItem('access-token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  },

  // Handle API responses
  handleResponse: async (response) => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  // Make authenticated requests
  authenticatedRequest: async (url, options = {}) => {
    const defaultOptions = {
      headers: apiHelpers.getAuthHeaders(),
      ...options
    };
    
    const response = await fetch(url, defaultOptions);
    return apiHelpers.handleResponse(response);
  },

  // Make authenticated POST requests
  authenticatedPost: async (url, data) => {
    return apiHelpers.authenticatedRequest(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Make authenticated PUT requests
  authenticatedPut: async (url, data) => {
    return apiHelpers.authenticatedRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Make authenticated PATCH requests
  authenticatedPatch: async (url, data) => {
    return apiHelpers.authenticatedRequest(url, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  // Make authenticated DELETE requests
  authenticatedDelete: async (url) => {
    return apiHelpers.authenticatedRequest(url, {
      method: 'DELETE'
    });
  }
};

// Data transformation helpers
export const dataTransformers = {
  // Transform book data from backend to frontend format
  transformBook: (book) => ({
    _id: book._id,
    name: book.name,
    author: book.author_name, // Backend uses author_name, frontend expects author
    author_name: book.author_name,
    category: book.category,
    image: book.image,
    rating: book.rating,
    description: book.description,
    quantity: book.quantity || 1,
    available: book.available !== false, // Default to true if not specified
    isbn: book.isbn,
    publishedYear: book.publishedYear,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt
  }),

  // Transform borrowed book data
  transformBorrowedBook: (borrowedBook) => ({
    _id: borrowedBook._id,
    book: borrowedBook.book,
    user: borrowedBook.user,
    email: borrowedBook.email,
    bookName: borrowedBook.bookName,
    authorName: borrowedBook.authorName,
    category: borrowedBook.category,
    image: borrowedBook.image,
    borrowDate: borrowedBook.borrowDate,
    returnDate: borrowedBook.returnDate,
    status: borrowedBook.status,
    createdAt: borrowedBook.createdAt,
    updatedAt: borrowedBook.updatedAt
  }),

  // Transform added book data
  transformAddedBook: (addedBook) => ({
    _id: addedBook._id,
    user: addedBook.user,
    email: addedBook.email,
    name: addedBook.name,
    author_name: addedBook.author_name,
    category: addedBook.category,
    image: addedBook.image,
    rating: addedBook.rating,
    description: addedBook.description,
    isbn: addedBook.isbn,
    publishedYear: addedBook.publishedYear,
    status: addedBook.status,
    createdAt: addedBook.createdAt,
    updatedAt: addedBook.updatedAt
  })
};

export default API_ENDPOINTS;
