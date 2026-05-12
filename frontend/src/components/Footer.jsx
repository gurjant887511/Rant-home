import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="stylish-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>RentHub</h2>
            <p>Your trusted partner in finding the perfect rental home. We make the house-hunting process simple, fast, affordable, and transparent for everyone.</p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/listings">Listings</Link></li>
              <li><Link to="/add-property">Add Property</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p><span>📍</span> 123 RentHub Street, New Delhi, India</p>
            <p><span>📞</span> +91 9876543210</p>
            <p><span>✉️</span> support@renthub.com</p>
          </div>

          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">Instagram</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} RentHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;