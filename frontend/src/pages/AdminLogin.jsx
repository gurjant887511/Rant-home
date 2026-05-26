import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../services/adminApi';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await adminApi.login(email, password);
      
      if (response.data.success) {
        // Save token to localStorage
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminEmail', response.data.admin.email);
        
        // Update axios header
        import('../services/api').then(module => {
          module.default.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        });

        // Navigate to dashboard
        navigate('/admin/dashboard');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h1>🔐 Admin Portal</h1>
          <p>RentHub Administration</p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form">
          {error && <div className="admin-login-error">{error}</div>}

          <div className="admin-login-group">
            <label htmlFor="email">Admin Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
              disabled={loading}
            />
          </div>

          <div className="admin-login-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>For security purposes, only authorized administrators can access this panel.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
