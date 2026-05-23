import React, { useState } from 'react';
import axios from 'axios';
import './EmailVerification.css';

const EmailVerification = ({ email, onVerified, onBackToSignup }) => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(true);

  const apiUrl = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) 
    || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) 
    || (process.env.NODE_ENV === 'production' ? 'https://rant-home.onrender.com/api' : 'http://localhost:8000/api');

  const handleVerify = async (e) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setMessage('Please enter the verification code');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const response = await axios.post(`${apiUrl}/auth/verify-email`, {
        email,
        code
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        setMessage('Email verified successfully!');
        setTimeout(() => {
          onVerified(response.data.data);
        }, 1500);
      }
    } catch (error) {
      console.error('Verification Error:', error);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error verifying email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResendLoading(true);
      setMessage('');

      const response = await axios.post(`${apiUrl}/auth/resend-verification-code`, {
        email
      });

      if (response.data.success) {
        setMessage('Verification code sent to your email!');
        setCodeSent(true);
        setCode('');
      }
    } catch (error) {
      console.error('Resend Error:', error);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error sending verification code. Please try again.');
      }
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="email-verification">
      <div className="verification-container">
        <div className="verification-box">
          <h1>Verify Your Email</h1>
          <p>We've sent a 6-digit code to <strong>{email}</strong></p>

          {message && (
            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleVerify} className="verification-form">
            <div className="form-group">
              <label htmlFor="code">Verification Code</label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength="6"
                required
                className="code-input"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !code}
              className="btn-verify"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <div className="verification-actions">
            <button 
              onClick={handleResend}
              disabled={resendLoading}
              className="btn-resend"
            >
              {resendLoading ? 'Sending...' : 'Resend Code'}
            </button>
            <button 
              onClick={onBackToSignup}
              className="btn-back"
            >
              Back to Signup
            </button>
          </div>

          <p className="verification-info">
            The code will expire in 15 minutes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
