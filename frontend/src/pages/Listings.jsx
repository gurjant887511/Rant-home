import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import FilterPanel from '../components/FilterPanel';
import SEO from '../components/SEO';
import './Listings.css';

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (appliedFilters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getAllProperties(appliedFilters);
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

  const handleFilter = (filters) => {
    fetchProperties(filters);
  };

  return (
    <div className="listings">
      <SEO 
        title="Browse All Properties"
        description="Search for the best student rooms, PGs, and hostels. Filter by city, budget, and amenities to find your perfect rental home."
        url="https://renthub.in/listings"
      />
      <div className="listings-header">
        <h1>Student Rooms, PGs, and Hostels for Rent</h1>
        <p>Browse verified rental properties, student accommodations, and budget-friendly PG near university campuses.</p>
      </div>

      <div className="listings-container">
        <aside className="listings-sidebar">
          <FilterPanel onFilter={handleFilter} />
        </aside>

        <main className="listings-main">
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
            <div className="no-results">No properties found matching your filters.</div>
          )}
          
          <div className="seo-listings-footer" style={{ marginTop: '2rem', padding: '1rem', borderTop: '1px solid #eee', fontSize: '0.85rem', color: '#6b7280' }}>
            <h2>Find Your Next Home with RentHub</h2>
            <p>From <strong>student room rent in India</strong> to finding a <strong>PG near university</strong>, RentHub offers the best listings. Filter by your needs to find <strong>hostel rooms for students</strong>, <strong>monthly room rent</strong> options, or a cozy <strong>room near university</strong>. We provide trusted options for those looking for <strong>ladkiyo ke liye safe PG</strong> or <strong>ladko ke liye PG</strong>.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Listings;