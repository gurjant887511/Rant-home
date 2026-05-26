const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../middleware/adminAuth');
const adminController = require('../controllers/adminController');

// Admin login (no auth required)
router.post('/login', adminController.adminLogin);

// All protected admin routes require authentication
router.use(adminAuthMiddleware);

// Dashboard
router.get('/dashboard/stats', adminController.getDashboardStats);

// Users management
router.get('/users', adminController.getAllUsers);
router.get('/users/search', adminController.searchUsers);
router.get('/users/:userId', adminController.getUserDetails);
router.delete('/users/:userId', adminController.deleteUser);

// Properties management
router.get('/properties', adminController.getAllProperties);
router.get('/properties/search', adminController.searchProperties);
router.get('/properties/:propertyId', adminController.getPropertyDetails);
router.delete('/properties/:propertyId', adminController.deleteProperty);

module.exports = router;
