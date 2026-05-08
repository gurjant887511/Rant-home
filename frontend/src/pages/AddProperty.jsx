import React, { useState } from 'react';
import { api } from '../services/api';
import './AddProperty.css';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    area: '',
    type: '1BHK',
    images: [],
    ownerName: '',
    phone: '',
    location: {
      lat: '',
      lng: ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload images and get URLs
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: imageUrls
    }));
  };

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setFormData(prev => ({
          ...prev,
          location: {
            lat: latitude.toString(),
            lng: longitude.toString()
          }
        }));
        setMessage('Location captured successfully!');
      }, (error) => {
        setMessage('Failed to get location: ' + error.message);
      });
    } else {
      setMessage('Geolocation is not supported by your browser');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setMessage('');
      
      const payload = {
        ...formData,
        price: Number(formData.price)
      };

      const response = await api.createProperty(payload);
      
      if (response.data.success) {
        setMessage('Property added successfully!');
        setFormData({
          title: '',
          description: '',
          price: '',
          city: '',
          area: '',
          type: '1BHK',
          images: [],
          ownerName: '',
          phone: '',
          location: {
            lat: '',
            lng: ''
          }
        });
      }
    } catch (error) {
      setMessage('Error adding property: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property">
      <div className="add-property-container">
        <h1>Add New Property</h1>
        <p>List your rental property on RentHub</p>

        {message && (
          <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-section">
            <h2>Property Details</h2>

            <div className="form-group">
              <label>Property Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Modern 2BHK Apartment"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property"
                rows="5"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price (Monthly Rent) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 15000"
                  required
                />
              </div>

              <div className="form-group">
                <label>Property Type *</label>
                <select name="type" value={formData.type} onChange={handleChange} required>
                  <option value="1BHK">1 BHK</option>
                  <option value="2BHK">2 BHK</option>
                  <option value="3BHK">3 BHK</option>
                  <option value="4BHK">4 BHK</option>
                  <option value="5BHK">5 BHK</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., ganganagar"
                  required
                />
              </div>

              <div className="form-group">
                <label>Area *</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g., Sector 5"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Media</h2>

            <div className="form-group">
              <label>Property Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              {formData.images.length > 0 && (
                <p className="image-count">{formData.images.length} image(s) selected</p>
              )}
            </div>
          </div>

          <div className="form-section">
            <h2>Location</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Latitude</label>
                <input
                  type="number"
                  name="location.lat"
                  value={formData.location.lat}
                  onChange={handleChange}
                  placeholder="e.g., 29.5"
                  step="0.00001"
                />
              </div>

              <div className="form-group">
                <label>Longitude</label>
                <input
                  type="number"
                  name="location.lng"
                  value={formData.location.lng}
                  onChange={handleChange}
                  placeholder="e.g., 73.1"
                  step="0.00001"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={getGeolocation}
              className="geo-btn"
            >
              📍 Get My Current Location
            </button>
          </div>

          <div className="form-section">
            <h2>Owner Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Owner Name *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g., +91-9876543210"
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Adding Property...' : 'Add Property'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
