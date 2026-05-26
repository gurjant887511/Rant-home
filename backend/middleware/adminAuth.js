const jwt = require('jsonwebtoken');

// Admin authentication middleware
const adminAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No authorization header provided'
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

      if (decoded.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Admin role required.'
        });
      }

      req.admin = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        error: error.message
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Admin auth middleware error',
      error: error.message
    });
  }
};

module.exports = adminAuthMiddleware;
