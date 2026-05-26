import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { FiMail, FiLock, FiArrowRight, FiHome } from 'react-icons/fi';
import EmailVerification from '../components/EmailVerification';
import './Login.css';
import heroImage from '../images/hero.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error' or 'warning'
  const [showVerification, setShowVerification] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [lockoutRemaining, setLockoutRemaining] = useState(0); // Remaining lockout time in seconds
  const [lockoutLevel, setLockoutLevel] = useState(0); // Track which level of lockout
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);
  const navigate = useNavigate();

  // Calculate lockout duration based on level
  const getLockoutDuration = (level) => {
    switch(level) {
      case 1: return 30; // 30 seconds
      case 2: return 120; // 2 minutes
      case 3: return 300; // 5 minutes
      case 4: return 900; // 15 minutes
      default: return 30;
    }
  };

  // Get lockout duration text
  const getLockoutText = (level) => {
    switch(level) {
      case 1: return '30 seconds';
      case 2: return '2 minutes';
      case 3: return '5 minutes';
      case 4: return '15 minutes';
      default: return '30 seconds';
    }
  };

  // Countdown timer for lockout
  useEffect(() => {
    if (lockoutRemaining <= 0) return;

    const timer = setInterval(() => {
      setLockoutRemaining(prev => {
        if (prev <= 1) {
          setMessage('');
          setMessageType('');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutRemaining]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage('');
      setMessageType('');
      
      if (formData.email && formData.password) {
        const response = await api.login({
          email: formData.email,
          password: formData.password
        });

        if (response.data.success) {
          localStorage.setItem('token', response.data.data.token);
          setMessageType('success');
          setMessage('Login successful! Redirecting...');
          setAttemptsRemaining(3); // Reset attempts on success
          setLockoutRemaining(0);
          setLockoutLevel(0);
          
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      setMessageType('error');
      
      // Handle account lockout (429 status)
      if (error.response?.status === 429) {
        const remainingTime = error.response?.data?.remainingTime || 30;
        const level = error.response?.data?.lockoutLevel || 1;
        setLockoutLevel(level);
        setLockoutRemaining(remainingTime);
        const lockoutText = getLockoutText(level);
        setMessage(`Account locked for security. Try again in ${remainingTime}s (${lockoutText} lockout).`);
        setMessageType('warning');
      }
      // Handle unverified email case
      else if (error.response?.status === 403 && error.response?.data?.data?.requiresEmailVerification) {
        setUnverifiedEmail(formData.email);
        setShowVerification(true);
        setMessage('');
      } 
      // Handle invalid credentials with attempts remaining
      else if (error.response?.status === 401 && error.response?.data?.attemptsRemaining) {
        setAttemptsRemaining(error.response.data.attemptsRemaining);
        setMessage(error.response.data.message);
      }
      else if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage(`Connection Error: ${error.message}. Is backend running?`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerified = (userData) => {
    setMessage('Email verified! Redirecting to home...');
    localStorage.setItem('token', userData.token);
    setLockoutRemaining(0);
    setLockoutLevel(0);
    setAttemptsRemaining(3);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleBackToLogin = () => {
    setShowVerification(false);
    setUnverifiedEmail('');
    setFormData({
      email: '',
      password: ''
    });
    setMessage('');
    setAttemptsRemaining(3);
    setLockoutRemaining(0);
    setLockoutLevel(0);
  };

  if (showVerification) {
    return <EmailVerification email={unverifiedEmail} onVerified={handleVerified} onBackToSignup={handleBackToLogin} />;
  }

  if (showVerification) {
    return <EmailVerification email={unverifiedEmail} onVerified={handleVerified} onBackToSignup={handleBackToLogin} />;
  }

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
                {messageType === 'warning' && lockoutRemaining > 0 
                  ? `Account locked (${getLockoutText(lockoutLevel)}). Try again in ${lockoutRemaining}s.` 
                  : message}
              </div>
            )}

            {attemptsRemaining < 3 && lockoutRemaining === 0 && (
              <div className="attempts-warning">
                ⚠️ {attemptsRemaining} attempt{attemptsRemaining !== 1 ? 's' : ''} remaining | Next lockout: {getLockoutText(1)}
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
                    disabled={lockoutRemaining > 0}
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
                    disabled={lockoutRemaining > 0}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading || lockoutRemaining > 0} className="modern-login-btn">
                {lockoutRemaining > 0 
                  ? `${getLockoutText(lockoutLevel)} (${lockoutRemaining}s)` 
                  : loading ? 'Signing in...' : (
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
