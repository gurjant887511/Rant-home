import React, { useState } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleReset = () => {
    const resetFilters = { type: '', minPrice: '', maxPrice: '' };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="filter-panel">
      <h3 className="filter-title">Filters</h3>

      <div className="filter-group">
        <label className="filter-label">Property Type</label>
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
        <label className="filter-label">Min Price</label>
        <input
          type="number"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleChange}
          placeholder="Min price"
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">Max Price</label>
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Max price"
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
