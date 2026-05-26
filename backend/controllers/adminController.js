const User = require('../models/User');
const Property = require('../models/Property');
const jwt = require('jsonwebtoken');

// Admin login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if this is the admin account
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@renthub.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid admin credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: 'admin', 
        email: adminEmail, 
        role: 'admin' 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Admin login successful',
      token,
      admin: {
        email: adminEmail,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Admin login failed',
      error: error.message 
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password -emailVerificationCode')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch users',
      error: error.message 
    });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({})
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch properties',
      error: error.message 
    });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isEmailVerified: true });
    const totalProperties = await Property.countDocuments();
    
    // Properties by city
    const propertiesByCity = await Property.aggregate([
      {
        $group: {
          _id: '$city',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Properties by type
    const propertiesByType = await Property.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    // Average property price by city
    const avgPriceByCity = await Property.aggregate([
      {
        $group: {
          _id: '$city',
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      { $sort: { avgPrice: -1 } }
    ]);

    // Recent users (last 10)
    const recentUsers = await User.find({})
      .select('-password -emailVerificationCode')
      .sort({ createdAt: -1 })
      .limit(10);

    // Recent properties (last 10)
    const recentProperties = await Property.find({})
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        verifiedUsers,
        unverifiedUsers: totalUsers - verifiedUsers,
        totalProperties,
        propertiesByCity,
        propertiesByType,
        avgPriceByCity,
        recentUsers,
        recentProperties
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch dashboard statistics',
      error: error.message 
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete user',
      error: error.message 
    });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findByIdAndDelete(propertyId);
    
    if (!property) {
      return res.status(404).json({ 
        success: false, 
        message: 'Property not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully',
      data: property
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete property',
      error: error.message 
    });
  }
};

// Search users
exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query is required' 
      });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    })
      .select('-password -emailVerificationCode')
      .limit(20);

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to search users',
      error: error.message 
    });
  }
};

// Search properties
exports.searchProperties = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query is required' 
      });
    }

    const properties = await Property.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { city: { $regex: query, $options: 'i' } },
        { area: { $regex: query, $options: 'i' } }
      ]
    })
      .limit(20);

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    console.error('Search properties error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to search properties',
      error: error.message 
    });
  }
};

// Get user details
exports.getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password -emailVerificationCode');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch user details',
      error: error.message 
    });
  }
};

// Get property details
exports.getPropertyDetails = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);
    
    if (!property) {
      return res.status(404).json({ 
        success: false, 
        message: 'Property not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Get property details error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch property details',
      error: error.message 
    });
  }
};
