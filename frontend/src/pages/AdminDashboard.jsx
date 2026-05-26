import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../services/adminApi';
import AdminNavbar from '../components/AdminNavbar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getDashboardStats();
      
      if (response.data.success) {
        setStats(response.data.data);
      } else {
        setError('Failed to load statistics');
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <AdminNavbar />
        <div className="admin-content">
          <div className="loading">⏳ Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <AdminNavbar />
        <div className="admin-content">
          <div className="error-message">⚠️ {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <AdminNavbar />
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>📊 Admin Dashboard</h1>
          <p>Welcome to RentHub Administration Panel</p>
        </div>

        {/* Statistics Grid */}
        <div className="stats-grid">
          <div className="stat-card users">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Total Users</h3>
              <p className="stat-value">{stats?.totalUsers || 0}</p>
              <p className="stat-subtitle">{stats?.verifiedUsers || 0} verified</p>
            </div>
          </div>

          <div className="stat-card properties">
            <div className="stat-icon">🏠</div>
            <div className="stat-info">
              <h3>Total Properties</h3>
              <p className="stat-value">{stats?.totalProperties || 0}</p>
              <p className="stat-subtitle">Active listings</p>
            </div>
          </div>

          <div className="stat-card verified">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>Verified Users</h3>
              <p className="stat-value">{stats?.verifiedUsers || 0}</p>
              <p className="stat-subtitle">{stats?.totalUsers ? ((stats?.verifiedUsers / stats?.totalUsers) * 100).toFixed(1) : 0}% verified</p>
            </div>
          </div>

          <div className="stat-card unverified">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>Unverified Users</h3>
              <p className="stat-value">{stats?.unverifiedUsers || 0}</p>
              <p className="stat-subtitle">Pending verification</p>
            </div>
          </div>
        </div>

        {/* Properties by City */}
        {stats?.propertiesByCity?.length > 0 && (
          <div className="dashboard-section">
            <h2>🌆 Properties by City</h2>
            <div className="city-list">
              {stats.propertiesByCity.map((city, idx) => (
                <div key={idx} className="city-item">
                  <span className="city-name">{city._id}</span>
                  <span className="city-count">{city.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Properties by Type */}
        {stats?.propertiesByType?.length > 0 && (
          <div className="dashboard-section">
            <h2>🏘️ Properties by Type</h2>
            <div className="type-list">
              {stats.propertiesByType.map((type, idx) => (
                <div key={idx} className="type-item">
                  <span className="type-name">{type._id}</span>
                  <span className="type-count">{type.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Users */}
        {stats?.recentUsers?.length > 0 && (
          <div className="dashboard-section">
            <div className="section-header">
              <h2>👤 Recent Users</h2>
              <a href="/admin/users" className="view-all">View All →</a>
            </div>
            <div className="recent-list">
              {stats.recentUsers.slice(0, 5).map((user) => (
                <div key={user._id} className="recent-item">
                  <div className="recent-info">
                    <p className="recent-name">{user.name}</p>
                    <p className="recent-email">{user.email}</p>
                  </div>
                  <div className="recent-status">
                    {user.isEmailVerified ? (
                      <span className="badge verified">✅ Verified</span>
                    ) : (
                      <span className="badge unverified">⏳ Pending</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Properties */}
        {stats?.recentProperties?.length > 0 && (
          <div className="dashboard-section">
            <div className="section-header">
              <h2>🏠 Recent Properties</h2>
              <a href="/admin/properties" className="view-all">View All →</a>
            </div>
            <div className="recent-list">
              {stats.recentProperties.slice(0, 5).map((property) => (
                <div key={property._id} className="recent-item">
                  <div className="recent-info">
                    <p className="recent-name">{property.title}</p>
                    <p className="recent-email">{property.city} • ₹{property.price}/month</p>
                  </div>
                  <div className="recent-status">
                    <span className="badge type">{property.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
