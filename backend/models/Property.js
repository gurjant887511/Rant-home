const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true,
    index: true
  },
  area: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK'],
    required: true
  },
  images: [{
    type: String
  }],
  ownerName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  whatsAppPhone: {
    type: String,
    required: false
  },
  location: {
    lat: {
      type: Number,
      required: false
    },
    lng: {
      type: Number,
      required: false
    }
  },
  furnished: {
    type: Boolean,
    default: false
  },
  ac: {
    type: Boolean,
    default: false
  },
  wifi: {
    type: Boolean,
    default: false
  },
  parking: {
    type: Boolean,
    default: false
  },
  foodAvailable: {
    type: Boolean,
    default: false
  },
  genderPreference: {
    type: String,
    enum: ['Male', 'Female', 'Any'],
    default: 'Any'
  },
  petAllowed: {
    type: Boolean,
    default: false
  },
  nearbyCollege: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
