import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ city, maxPrice });
  };

  const handleReset = () => {
    setCity('');
    setMaxPrice('');
    onSearch({ city: '', maxPrice: '' });
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Enter city name (e.g., ganganagar)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="search-input-group">
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="search-button-group">
          <button type="submit" className="search-btn">Search</button>
          <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ city, maxPrice });
  };

  const handleReset = () => {
    setCity('');
    setMaxPrice('');
    onSearch({ city: '', maxPrice: '' });
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Enter city name (e.g., ganganagar)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="search-input-group">
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="search-button-group">
          <button type="submit" className="search-btn">Search</button>
          <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

