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
  
  // For production domains
  if (hostname.includes('renthub.in')) {
    return 'https://rant-home.onrender.com/api';
  }
  
  // For Render preview/deployment URLs
  if (hostname.includes('render.com') || hostname.includes('onrender.com')) {
    return 'https://rant-home.onrender.com/api';
  }
  
  // For Vercel or other deployments, construct from current domain's backend
  // Assumes backend is deployed to same base domain
  return `${protocol}//rant-home.onrender.com/api`;
};

const API_BASE_URL = getAPIBaseURL();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
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