import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import FilterPanel from '../components/FilterPanel';
import './Listings.css';

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (appliedFilters = {}) => {
    try {
      setLoading(true);
      const response = await api.getAllProperties(appliedFilters);
      setProperties(response.data.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    fetchProperties(newFilters);
  };

  return (
    <div className="listings">
      <div className="listings-header">
        <h1>All Listings</h1>
        <p>Browse all available rental properties</p>
      </div>

      <div className="listings-container">
        <aside className="listings-sidebar">
          <FilterPanel onFilter={handleFilter} />
        </aside>

        <main className="listings-main">
          {loading ? (
            <div className="loading">Loading properties...</div>
          ) : properties.length > 0 ? (
            <div className="properties-grid">
              {properties.map((property) => (
                <PropertyCard key={property._id} data={property} />
              ))}
            </div>
          ) : (
            <div className="no-results">No properties found matching your filters.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Listings;