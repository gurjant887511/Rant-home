import apiClient from './api';

export const adminApi = {
  // Admin authentication
  login: (email, password) => apiClient.post('/admin/login', { email, password }),

  // Dashboard
  getDashboardStats: () => apiClient.get('/admin/dashboard/stats'),

  // Users management
  getAllUsers: () => apiClient.get('/admin/users'),
  getUserDetails: (userId) => apiClient.get(`/admin/users/${userId}`),
  searchUsers: (query) => apiClient.get('/admin/users/search', { params: { query } }),
  deleteUser: (userId) => apiClient.delete(`/admin/users/${userId}`),

  // Properties management
  getAllProperties: () => apiClient.get('/admin/properties'),
  getPropertyDetails: (propertyId) => apiClient.get(`/admin/properties/${propertyId}`),
  searchProperties: (query) => apiClient.get('/admin/properties/search', { params: { query } }),
  deleteProperty: (propertyId) => apiClient.delete(`/admin/properties/${propertyId}`),
};

export default adminApi;
