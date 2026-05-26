import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../services/adminApi';
import AdminNavbar from '../components/AdminNavbar';
import './AdminProperties.css';

const AdminProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    fetchProperties();
  }, [navigate]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await adminApi.getAllProperties();
      
      if (response.data.success) {
        setProperties(response.data.data);
      } else {
        setError('Failed to load properties');
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err.response?.data?.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      const response = await adminApi.searchProperties(query);
      
      if (response.data.success) {
        setSearchResults(response.data.data);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDeleteProperty = async (propertyId, propertyTitle) => {
    if (window.confirm(`Are you sure you want to delete "${propertyTitle}"?`)) {
      try {
        const response = await adminApi.deleteProperty(propertyId);
        
        if (response.data.success) {
          setProperties(properties.filter(p => p._id !== propertyId));
          setSearchResults(searchResults.filter(p => p._id !== propertyId));
          alert('Property deleted successfully');
        }
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete property');
      }
    }
  };

  const displayProperties = searchQuery.trim() !== '' ? searchResults : properties;

  if (loading) {
    return (
      <div className="admin-container">
        <AdminNavbar />
        <div className="admin-content">
          <div className="loading">⏳ Loading properties...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <AdminNavbar />
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>🏠 Properties Management</h1>
          <p>Manage all listed properties</p>
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}

        {/* Search Bar */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search properties by title, city, or area..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          {isSearching && <span className="search-status">🔍 Searching...</span>}
        </div>

        {/* Properties Grid */}
        <div className="properties-section">
          <div className="section-header">
            <h2>Total Properties: {displayProperties.length}</h2>
            <button onClick={fetchProperties} className="refresh-btn">🔄 Refresh</button>
          </div>

          {displayProperties.length > 0 ? (
            <div className="properties-grid">
              {displayProperties.map((property) => (
                <div key={property._id} className="property-card">
                  <div className="property-image">
                    {property.images && property.images.length > 0 ? (
                      <img src={property.images[0]} alt={property.title} />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                    <span className="property-type">{property.type}</span>
                  </div>

                  <div className="property-content">
                    <h3 className="property-title">{property.title}</h3>
                    
                    <div className="property-info">
                      <p className="property-location">📍 {property.city} • {property.area}</p>
                      <p className="property-price">₹{property.price.toLocaleString()}/month</p>
                    </div>

                    <div className="property-details">
                      <span className="detail-item">👤 {property.ownerName}</span>
                      <span className="detail-item">📞 {property.phone}</span>
                    </div>

                    <div className="property-description">
                      {property.description.substring(0, 80)}...
                    </div>

                    <div className="property-actions">
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteProperty(property._id, property.title)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              {searchQuery ? 'No properties found matching your search.' : 'No properties found.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProperties;
