import axios from 'axios';

// Dynamically determine API URL based on current domain
const getAPIBaseURL = () => {
  // Check if we're in production by looking at the current hostname
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  // If on localhost or 127.0.0.1, use local backend
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
    return 'http://localhost:8000/api';
  }
  
  // For all production deployments, use Render backend
  return 'https://rant-home.onrender.com/api';
};

const API_BASE_URL = getAPIBaseURL();

// Retry configuration for handling Render cold starts
const retryConfig = {
  maxRetries: 3,
  retryDelay: 1000, // Start with 1 second
  retryableStatuses: [408, 500, 502, 503, 504],
  timeout: 15000 // 15 second timeout for Render cold start
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
  addPropertyReview: (id, reviewData) => apiClient.post(`/properties/${id}/reviews`, reviewData)
};

export default apiClient;