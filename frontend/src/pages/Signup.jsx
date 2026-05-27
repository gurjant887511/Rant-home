import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import EmailVerification from '../components/EmailVerification';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
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
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const response = await api.register({
        name: formData.name,
        email: formData.email,
        password: formData.password

      });


      
      if (response.data.success) {
        setRegisteredEmail(formData.email);
        setShowVerification(true);
      }
    } catch (error) {
      console.error('Signup Error:', error);
      // Try to get the server's error message from multiple places
      const serverMessage = error.response?.data?.message || error.serverMessage;
      if (serverMessage) {
        setMessage(serverMessage);
      } else if (error.message === 'Network Error' || error.code === 'ECONNREFUSED' || error.code === 'ECONNABORTED') {
        setMessage('Connection Error: Unable to reach the server. The backend might be starting up (takes 30-60s). Please wait a moment and try again.');
      } else {
        setMessage(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerified = (userData) => {
    setMessage('Email verified! Redirecting to home...');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleBackToSignup = () => {
    setShowVerification(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setMessage('');
  };

  if (showVerification) {
    return <EmailVerification email={registeredEmail} onVerified={handleVerified} onBackToSignup={handleBackToSignup} />;
  }

  return (
    <div className="signup">
      <div className="signup-container">
        <div className="signup-box">
          <h1>Create an Account</h1>
          <p>Join RentHub to find your perfect home</p>

          {message && (
            <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="signup-btn">
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/login">Log in here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
