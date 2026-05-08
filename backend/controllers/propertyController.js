<<<<<<< HEAD
const Property = require('../models/Property');

// Get all properties with filters
exports.getAllProperties = async (req, res) => {
  try {
    const { city, maxPrice, minPrice, type, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    
    if (city) filter.city = new RegExp(city, 'i');
    if (type) filter.type = type;
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    
    const skip = (page - 1) * limit;
    
    const properties = await Property.find(filter)
      .limit(Number(limit))
      .skip(skip)
      .sort({ createdAt: -1 });
    
    const total = await Property.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: properties,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching properties',
      error: error.message
    });
  }
};

// Get single property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const property = await Property.findById(id);
    
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
    res.status(500).json({
      success: false,
      message: 'Error fetching property',
      error: error.message
    });
  }
};

// Create new property
exports.createProperty = async (req, res) => {
  try {
    const { title, description, price, city, area, type, images, ownerName, phone, location } = req.body;
    
    // Validation
    if (!title || !description || !price || !city || !area || !type || !ownerName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }
    
    const newProperty = new Property({
      title,
      description,
      price,
      city,
      area,
      type,
      images: images || [],
      ownerName,
      phone,
      location: location || {}
    });
    
    const savedProperty = await newProperty.save();
    
    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: savedProperty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating property',
      error: error.message
    });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, city, area, type, images, ownerName, phone, location } = req.body;
    
    const property = await Property.findById(id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    // Update fields
    if (title) property.title = title;
    if (description) property.description = description;
    if (price) property.price = price;
    if (city) property.city = city;
    if (area) property.area = area;
    if (type) property.type = type;
    if (images) property.images = images;
    if (ownerName) property.ownerName = ownerName;
    if (phone) property.phone = phone;
    if (location) property.location = location;
    
    const updatedProperty = await property.save();
    
    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: updatedProperty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating property',
      error: error.message
    });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    
    const property = await Property.findByIdAndDelete(id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting property',
      error: error.message
    });
  }
};
=======
const Property = require('../models/Property');

// Get all properties with filters
exports.getAllProperties = async (req, res) => {
  try {
    const { city, maxPrice, minPrice, type, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    
    if (city) filter.city = new RegExp(city, 'i');
    if (type) filter.type = type;
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    
    const skip = (page - 1) * limit;
    
    const properties = await Property.find(filter)
      .limit(Number(limit))
      .skip(skip)
      .sort({ createdAt: -1 });
    
    const total = await Property.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: properties,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching properties',
      error: error.message
    });
  }
};

// Get single property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const property = await Property.findById(id);
    
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
    res.status(500).json({
      success: false,
      message: 'Error fetching property',
      error: error.message
    });
  }
};

// Create new property
exports.createProperty = async (req, res) => {
  try {
    const { title, description, price, city, area, type, images, ownerName, phone, location } = req.body;
    
    // Validation
    if (!title || !description || !price || !city || !area || !type || !ownerName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }
    
    const newProperty = new Property({
      title,
      description,
      price,
      city,
      area,
      type,
      images: images || [],
      ownerName,
      phone,
      location: location || {}
    });
    
    const savedProperty = await newProperty.save();
    
    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: savedProperty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating property',
      error: error.message
    });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, city, area, type, images, ownerName, phone, location } = req.body;
    
    const property = await Property.findById(id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    // Update fields
    if (title) property.title = title;
    if (description) property.description = description;
    if (price) property.price = price;
    if (city) property.city = city;
    if (area) property.area = area;
    if (type) property.type = type;
    if (images) property.images = images;
    if (ownerName) property.ownerName = ownerName;
    if (phone) property.phone = phone;
    if (location) property.location = location;
    
    const updatedProperty = await property.save();
    
    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: updatedProperty
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating property',
      error: error.message
    });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    
    const property = await Property.findByIdAndDelete(id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting property',
      error: error.message
    });
  }
};
>>>>>>> 387879c9b953b3be03e99b06b9b3d62f91c8b64c
