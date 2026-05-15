import React, { useState } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    furnished: false,
    ac: false,
    wifi: false,
    parking: false,
    foodAvailable: false,
    genderPreference: '',
    petAllowed: false,
    nearbyCollege: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = { 
      ...filters, 
      [name]: type === 'checkbox' ? checked : value 
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleReset = () => {
    const resetFilters = { 
      type: '', 
      minPrice: '', 
      maxPrice: '',
      furnished: false,
      ac: false,
      wifi: false,
      parking: false,
      foodAvailable: false,
      genderPreference: '',
      petAllowed: false,
      nearbyCollege: ''
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="filter-panel">
      <h3 className="filter-title">Filters</h3>

      <div className="filter-group">
        <label className="filter-label">Room Type</label>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="1BHK">1 BHK</option>
          <option value="2BHK">2 BHK</option>
          <option value="3BHK">3 BHK</option>
          <option value="4BHK">4 BHK</option>
          <option value="5BHK">5 BHK</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Price Range</label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Min price"
          className="filter-input"
        />
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Max price"
          className="filter-input"
          style={{ marginTop: '8px' }}
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">Furnished</label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="furnished"
            checked={filters.furnished}
            onChange={handleChange}
          />
          <span>Furnished</span>
        </label>
      </div>

      <div className="filter-group">
        <label className="filter-label">AC / Non-AC</label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="ac"
            checked={filters.ac}
            onChange={handleChange}
          />
          <span>AC Available</span>
        </label>
      </div>

      <div className="filter-group">
        <label className="filter-label">WiFi</label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="wifi"
            checked={filters.wifi}
            onChange={handleChange}
          />
          <span>WiFi Available</span>
        </label>
      </div>

      <div className="filter-group">
        <label className="filter-label">Parking</label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="parking"
            checked={filters.parking}
            onChange={handleChange}
          />
          <span>Parking Available</span>
        </label>
      </div>

      <div className="filter-group">
        <label className="filter-label">Food Available</label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="foodAvailable"
            checked={filters.foodAvailable}
            onChange={handleChange}
          />
          <span>Food Available</span>
        </label>
      </div>

      <div className="filter-group">
        <label className="filter-label">Gender Preference</label>
        <select
          name="genderPreference"
          value={filters.genderPreference}
          onChange={handleChange}
          className="filter-select"
        >
          <option value="">Any</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Pets Allowed</label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="petAllowed"
            checked={filters.petAllowed}
            onChange={handleChange}
          />
          <span>Pets Allowed</span>
        </label>
      </div>

      <div className="filter-group">
        <label className="filter-label">Nearby College</label>
        <input
          type="text"
          name="nearbyCollege"
          value={filters.nearbyCollege}
          onChange={handleChange}
          placeholder="e.g., IIT, NIT"
          className="filter-input"
        />
      </div>

      <button onClick={handleReset} className="reset-filter-btn">
        Clear Filters
      </button>
    </div>
  );
};

export default FilterPanel;