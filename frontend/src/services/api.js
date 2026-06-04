import axios from 'axios';

// Get API base URL from environment variable (if set during build), or auto-detect
const getAPIBaseURL = () => {
  // Priority 1: Environment variable (works in both CRA and Vite)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  if (typeof window !== 'undefined') {
    // Priority 2: Check if we're in development mode
    // In CRA, process.env.NODE_ENV is replaced at build time
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:8000/api';
    }
    // Priority 3: For all production deployments, use Render backend
    return 'https://rant-home.onrender.com/api';
  }
  // Fallback
  return 'https://rant-home.onrender.com/api';
};

const API_BASE_URL = getAPIBaseURL();

// Retry configuration for handling Render cold starts
const retryConfig = {
  maxRetries: 2,
  retryDelay: 1000, // Start with 1 second
  retryableStatuses: [408, 502, 503, 504], // Only retry server errors, NOT 500 or 4xx
  timeout: 60000 // 60 second timeout for Render cold start (takes 30-60s)
};




const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: retryConfig.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Retry interceptor for handling failed requests
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config;
    
    // Don't retry if no config or already retried
    if (!config || !config.url) {
      return Promise.reject(error);
    }
    
    // Initialize retry count
    if (!config.retryCount) {
      config.retryCount = 0;
    }
    
    const shouldRetry = 
      config.retryCount < retryConfig.maxRetries &&
      (retryConfig.retryableStatuses.includes(error.response?.status) ||
       error.code === 'ECONNABORTED' ||
       error.code === 'ECONNREFUSED' ||
       error.message === 'Network Error');
    
    if (shouldRetry) {
      config.retryCount++;
      const delay = retryConfig.retryDelay * Math.pow(2, config.retryCount - 1);
      console.warn(`🔄 Retrying request (${config.retryCount}/${retryConfig.maxRetries}) after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return apiClient(config);
    }
    
    // If all retries failed, provide better error message
    if (error.response?.status === 503 || error.code === 'ECONNREFUSED') {
      error.message = 'Backend server is temporarily unavailable. Please try again in a few moments.';
    }
    
    // Preserve the original server response message so UI can show it
    if (error.response?.data?.message && !error.message.includes('temporarily unavailable')) {
      error.serverMessage = error.response.data.message;
    }
    
    return Promise.reject(error);
  }
);

export const api = {
  // Properties
  getAllProperties: (params) => apiClient.get('/properties', { params }),
  getPropertyById: (id) => apiClient.get(`/properties/${id}`),
  createProperty: (data) => apiClient.post('/properties', data),
  updateProperty: (id, data) => apiClient.put(`/properties/${id}`, data),
  deleteProperty: (id) => apiClient.delete(`/properties/${id}`),
  
  // Search
  searchProperties: (filters) => apiClient.get('/properties', { params: filters }),

  // Reviews
  addPropertyReview: (id, reviewData) => apiClient.post(`/properties/${id}/reviews`, reviewData),

  // Auth
  register: (userData) => apiClient.post('/auth/register', userData),
  login: (credentials) => apiClient.post('/auth/login', credentials),
  verifyEmail: (data) => apiClient.post('/auth/verify-email', data),
  resendVerificationCode: (data) => apiClient.post('/auth/resend-verification-code', data)
};

export default apiClient;