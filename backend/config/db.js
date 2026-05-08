<<<<<<< HEAD
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rental-app';
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of hanging
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
    console.warn('Server will continue running without database connection.');
    // Don't exit the process - allow the server to start anyway
    return null;
  }
};

module.exports = connectDB;
=======
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rental-app';
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of hanging
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`MongoDB connection failed: ${error.message}`);
    console.warn('Server will continue running without database connection.');
    // Don't exit the process - allow the server to start anyway
    return null;
  }
};

module.exports = connectDB;
>>>>>>> 387879c9b953b3be03e99b06b9b3d62f91c8b64c
