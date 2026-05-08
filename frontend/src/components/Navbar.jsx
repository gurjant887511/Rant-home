import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const initial = saved || 'light';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>🏠 RentHub</h1>
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/listings" className="nav-link">Listings</a>
          </li>
          <li className="nav-item">
            <a href="/add-property" className="nav-link add-property-link">Add Property</a>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link login-link">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
