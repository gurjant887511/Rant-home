const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dhpwlrdif', 
  api_key: process.env.CLOUDINARY_API_KEY || '668324319918668', 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

module.exports = cloudinary;