const Property = require('../models/Property');
const cloudinary = require('../config/cloudinary');

// Get all properties with filters
exports.getAllProperties = async (req, res) => {
  try {
    const { 
      city, maxPrice, minPrice, type, page = 1, limit = 10,
      furnished, ac, wifi, parking, foodAvailable, genderPreference, petAllowed, nearbyCollege
    } = req.query;
    
    let filter = {};
    
    if (city) filter.city = new RegExp(city, 'i');
    if (type) filter.type = type;
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (furnished === 'true') filter.furnished = true;
    if (ac === 'true') filter.ac = true;
    if (wifi === 'true') filter.wifi = true;
    if (parking === 'true') filter.parking = true;
    if (foodAvailable === 'true') filter.foodAvailable = true;
    if (genderPreference && genderPreference !== 'Any') filter.genderPreference = genderPreference;
    if (petAllowed === 'true') filter.petAllowed = true;
    if (nearbyCollege) filter.nearbyCollege = { $in: [new RegExp(nearbyCollege, 'i')] };
    
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

// Add review to property
exports.addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, rating, comment } = req.body;
    
    const property = await Property.findById(id);
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    
    const review = {
      user: user || 'Anonymous',
      rating: Number(rating),
      comment,
      date: new Date()
    };
    
    if (!property.reviews) property.reviews = [];
    property.reviews.push(review);
    
    const updatedProperty = await property.save();
    res.status(201).json({ success: true, message: 'Review added successfully', data: updatedProperty });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding review', error: error.message });
  }
};

// Create new property
exports.createProperty = async (req, res) => {
  try {
    const { 
      title, description, price, city, area, type, images, ownerName, phone, location,
      furnished, ac, wifi, parking, foodAvailable, genderPreference, petAllowed, nearbyCollege
    } = req.body;
    
    // Validation
    if (!title || !description || !price || !city || !area || !type || !ownerName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }
    
    let uploadedImages = [];
    if (images && images.length > 0) {
      for (const image of images) {
        if (image.startsWith('data:image')) {
          if (process.env.CLOUDINARY_API_SECRET) {
            try {
              const uploadResult = await cloudinary.uploader.upload(image, {
                folder: 'renthub_properties'
              });
              uploadedImages.push(uploadResult.secure_url);
            } catch (err) {
              console.error('Cloudinary upload error:', err);
              throw new Error('Image upload to Cloudinary failed. Check your API credentials.');
            }
          } else {
            uploadedImages.push(image);
          }
        } else {
          uploadedImages.push(image);
        }
      }
    }
    
    const newProperty = new Property({
      title,
      description,
      price,
      city,
      area,
      type,
      images: uploadedImages,
      ownerName,
      phone,
      location: location || {},
      furnished: furnished || false,
      ac: ac || false,
      wifi: wifi || false,
      parking: parking || false,
      foodAvailable: foodAvailable || false,
      genderPreference: genderPreference || 'Any',
      petAllowed: petAllowed || false,
      nearbyCollege: nearbyCollege || []
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
    const { 
      title, description, price, city, area, type, images, ownerName, phone, location,
      furnished, ac, wifi, parking, foodAvailable, genderPreference, petAllowed, nearbyCollege
    } = req.body;
    
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
    if (ownerName) property.ownerName = ownerName;
    if (phone) property.phone = phone;
    if (location) property.location = location;
    if (furnished !== undefined) property.furnished = furnished;
    if (ac !== undefined) property.ac = ac;
    if (wifi !== undefined) property.wifi = wifi;
    if (parking !== undefined) property.parking = parking;
    if (foodAvailable !== undefined) property.foodAvailable = foodAvailable;
    if (genderPreference) property.genderPreference = genderPreference;
    if (petAllowed !== undefined) property.petAllowed = petAllowed;
    if (nearbyCollege !== undefined) property.nearbyCollege = nearbyCollege;

    if (images) {
      let uploadedImages = [];
      for (const image of images) {
        if (image.startsWith('data:image')) {
          if (process.env.CLOUDINARY_API_SECRET) {
            try {
              const uploadResult = await cloudinary.uploader.upload(image, {
                folder: 'renthub_properties'
              });
              uploadedImages.push(uploadResult.secure_url);
            } catch (err) {
              console.error('Cloudinary upload error:', err);
              throw new Error('Image upload to Cloudinary failed. Check your API credentials.');
            }
          } else {
            uploadedImages.push(image);
          }
        } else {
          uploadedImages.push(image);
        }
      }
      property.images = uploadedImages;
    }
    
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
