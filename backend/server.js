const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');
const propertyRoutes = require('./routes/propertyRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// CORS Configuration
const defaultOrigins = [
  'http://localhost:3000', 
  'http://localhost:8001', 
  'http://localhost:8000', 
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
];

// Add production domains
const productionOrigins = [
  'https://rant-home.onrender.com',
  'https://renthub.online',
  'https://www.renthub.online'
];

// Parse ALLOWED_ORIGINS from environment
const envOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

// Combine all origins
const allOrigins = [...defaultOrigins, ...productionOrigins, ...envOrigins];

// Custom origin function to allow wildcard Render URLs
const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if origin is in the list
    if (allOrigins.includes(origin)) {
      return callback(null, true);
    } 
    // Allow any Render deployment URLs (preview URLs)
    if (origin.includes('.onrender.com') || origin.includes('onrender.app')) {
      return callback(null, true);
    }
    // Allow any Vercel deployment
    if (origin.includes('.vercel.app')) {
      return callback(null, true);
    }
    // Allow netlify
    if (origin.includes('.netlify.app')) {
      return callback(null, true);
    }
    // Allow any localhost variations
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    // Reject others
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/admin', adminRoutes);

// Dynamic Sitemap Endpoint for SEO
const Property = require('./models/Property');
app.get('/api/sitemap.xml', async (req, res) => {
  try {
    const properties = await Property.find({}).select('_id updatedAt');
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Static frontend routes
    const staticRoutes = ['', '/listings', '/about', '/login', '/signup', '/add-property'];
    staticRoutes.forEach(route => {
      xml += `  <url>\n    <loc>https://renthub.online${route}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
    });

    // Dynamic property pages
    properties.forEach(prop => {
      xml += `  <url>\n    <loc>https://renthub.online/property/${prop._id}</loc>\n    <lastmod>${prop.updatedAt ? prop.updatedAt.toISOString() : new Date().toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });

    xml += '</urlset>';
    
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is running' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50));
  console.log(`✅ SERVER RUNNING ON PORT: ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}/api`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log('='.repeat(50) + '\n');
});
