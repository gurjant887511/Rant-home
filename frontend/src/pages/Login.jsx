import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiArrowRight, FiHome } from 'react-icons/fi';
import './Login.css';
import heroImage from '../images/hero.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Safe API URL check
    const apiUrl = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) 
      || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) 
      || 'http://localhost:8000/api';

    try {
      setLoading(true);
      setMessage('');
      setMessageType('');
      
      console.log('Sending login request to API:', apiUrl);

      if (formData.email && formData.password) {
        const response = await axios.post(`${apiUrl}/auth/login`, {
          email: formData.email,
          password: formData.password
        });

        if (response.data.success) {
          localStorage.setItem('token', response.data.data.token);
          setMessageType('success');
          setMessage('Login successful! Redirecting...');
          
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      setMessageType('error');
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage(`Connection Error: ${error.message}. Is backend running?`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Image/Branding */}
        <div className="login-visual" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="login-visual-overlay">
            <Link to="/" className="login-logo">
              <FiHome className="logo-icon" /> Rant Home
            </Link>
            <div className="login-visual-content">
              <h2>Find Your Dream Home Today</h2>
              <p>Join our community and explore thousands of properties available for rent and sale.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="login-form-section">
          <div className="login-form-wrapper">
            <div className="mobile-logo-container">
              <Link to="/" className="mobile-logo">
                <FiHome className="logo-icon" /> Rant Home
              </Link>
            </div>
            
            <div className="login-header">
              <h1>Welcome Back</h1>
              <p>Please enter your details to sign in.</p>
            </div>

            {message && (
              <div className={`modern-message ${messageType}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="modern-login-form">
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="label-row">
                  <label htmlFor="password">Password</label>
                  <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                </div>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="modern-login-btn">
                {loading ? 'Signing in...' : (
                  <>
                    Sign In <FiArrowRight className="btn-icon" />
                  </>
                )}
              </button>
            </form>

            <div className="modern-login-footer">
              <p>Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;