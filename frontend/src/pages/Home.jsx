import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import SEO from '../components/SEO';
import './Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getAllProperties(filters);
      setProperties(response.data.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError(
        error.message === 'Network Error' || 
        error.code === 'ECONNREFUSED' ||
        error.message.includes('temporarily unavailable')
          ? 'Backend server is temporarily unavailable. Please try again in a few moments.'
          : 'Failed to load properties. Please try again.'
      );
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters) => {
    fetchProperties(filters);
  };

  return (
    <div className="home">
      <SEO 
        title="Student Room For Rent, PGs & Hostels Near You" 
        description="Find the best and cheapest student rooms, PGs, hostels, and flats for rent in India. Verified listings for boys and girls."
        url="https://renthub.online/"
      />
      <div className="home-hero">
        <div className="hero-content">
          <h1>Find Your Perfect Room on RentHub</h1>
          <p>Discover affordable student rooms, safe PGs, and verified hostels in Delhi, Jaipur, Chandigarh, Punjab, Ganganagar & Kota. Your trusted student living platform.</p>
        </div>
      </div>

      <div className="home-container">
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="loading">⏳ Loading properties...</div>
        ) : error ? (
          <div className="error-message" style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #fca5a5',
            color: '#991b1b',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          }}>
            <p><strong>⚠️ {error}</strong></p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>If this persists, please refresh the page or try again later.</p>
          </div>
        ) : properties.length > 0 ? (
          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard key={property._id} data={property} />
            ))}
          </div>
        ) : (
          <div className="no-results">No properties found. Try different search criteria.</div>
        )}
        
        {/* SEO Content Block */}
        <section className="seo-content" style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '8px', color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.6' }}>
          <h2>Best Platform for Student Room Rent in India</h2>
          <p>Welcome to <strong>RentHub</strong> (also known as Rant Home), India's leading platform to find the best <strong>student room for rent</strong>, <strong>PG for students</strong>, and <strong>student accommodation</strong>. Whether you are looking for a <strong>single room for rent</strong>, a shared <strong>student hostel near college</strong>, or a <strong>budget-friendly PG</strong>, we have got you covered.</p>
          
          <h3>Find PGs & Rooms in Top Cities</h3>
          <p>We provide verified rental listings across major educational hubs. Looking for a <strong>student room in Delhi</strong>, a <strong>PG in Delhi for students</strong>, or an <strong>affordable PG in Kota</strong>? Need a <strong>room for rent in Jaipur</strong> or <strong>Chandigarh</strong>? We also feature top-rated <strong>PG near college in Punjab</strong> and <strong>room for students in Ganganagar</strong>. Easily find <strong>boys PG near me</strong> or safe <strong>girls PG near me</strong> with just a few clicks.</p>
          
          <h3>Why Choose RentHub?</h3>
          <p>RentHub is the best <strong>student room booking platform</strong> and <strong>room dhundne wali website</strong>. Students prefer us for finding <strong>cheap rooms for students</strong>, <strong>AC/non AC student rooms</strong>, and fully <strong>furnished student rooms</strong>. Stop worrying about finding a <strong>rentle home near me</strong> – just search on RentHub for <strong>sasta room rent</strong>, <strong>PG booking online</strong>, or a reliable <strong>roommate finder</strong>.</p>
        </section>
      </div>
    </div>
  );
};

export default Home;