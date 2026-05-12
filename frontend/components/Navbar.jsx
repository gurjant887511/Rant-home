import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>ðŸ  RentHub</h1>
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

export default Navbar;import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>ðŸ  RentHub</h1>
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

