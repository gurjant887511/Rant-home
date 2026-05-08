<<<<<<< HEAD
const authMiddleware = (req, res, next) => {
  try {
    // Check if authorization header exists
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        success: false, 
        message: 'No authorization header' 
      });
    }

    // For now, basic token validation
    // In production, verify JWT token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    // Store user info in request for use in routes
    req.user = { token };
    next();
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Auth middleware error', 
      error: error.message 
    });
  }
};

module.exports = authMiddleware;
=======
const authMiddleware = (req, res, next) => {
  try {
    // Check if authorization header exists
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ 
        success: false, 
        message: 'No authorization header' 
      });
    }

    // For now, basic token validation
    // In production, verify JWT token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    // Store user info in request for use in routes
    req.user = { token };
    next();
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Auth middleware error', 
      error: error.message 
    });
  }
};

module.exports = authMiddleware;
>>>>>>> 387879c9b953b3be03e99b06b9b3d62f91c8b64c
