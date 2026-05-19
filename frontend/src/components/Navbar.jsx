import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/Rent hub logo.png';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const location = useLocation();

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
          <img src={logo} alt="RentHub Logo" className="navbar-logo-img" />
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

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
