<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import './Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await api.getAllProperties(filters);
      setProperties(response.data.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters) => {
    fetchProperties(filters);
  };

  return (
    <div className="home">
      <div className="home-hero">
        <div className="hero-content">
          <h2>Find Your Perfect Home</h2>
          <p>Discover amazing rental properties in your area</p>
        </div>
      </div>

      <div className="home-container">
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="loading">Loading properties...</div>
        ) : properties.length > 0 ? (
          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard key={property._id} data={property} />
            ))}
          </div>
        ) : (
          <div className="no-results">No properties found. Try different search criteria.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
=======
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import './Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await api.getAllProperties(filters);
      setProperties(response.data.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters) => {
    fetchProperties(filters);
  };

  return (
    <div className="home">
      <div className="home-hero">
        <div className="hero-content">
          <h2>Find Your Perfect Home</h2>
          <p>Discover amazing rental properties in your area</p>
        </div>
      </div>

      <div className="home-container">
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="loading">Loading properties...</div>
        ) : properties.length > 0 ? (
          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard key={property._id} data={property} />
            ))}
          </div>
        ) : (
          <div className="no-results">No properties found. Try different search criteria.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
>>>>>>> 387879c9b953b3be03e99b06b9b3d62f91c8b64c
