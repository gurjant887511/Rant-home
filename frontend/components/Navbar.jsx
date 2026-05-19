import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/listings', label: 'Listings' },
    { path: '/add-property', label: 'Add Property' },
    { path: '/login', label: 'Login' },
    { path: '/signup', label: 'Sign Up' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>🏠 RentHub</h1>
        </div>

        <ul className="nav-menu">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const isAddProperty = link.path === '/add-property';
            const isLogin = link.path === '/login';
            const isSignUp = link.path === '/signup';

            let linkClass = 'nav-link';
            if (isActive) linkClass += ' active';
            if (isAddProperty) linkClass += ' add-property-link';
            if (isLogin) linkClass += ' login-link';
            if (isSignUp) linkClass += ' signup-link';

            return (
              <li className="nav-item" key={link.path}>
                <Link to={link.path} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
