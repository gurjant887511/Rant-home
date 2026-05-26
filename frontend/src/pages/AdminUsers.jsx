import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../services/adminApi';
import AdminNavbar from '../components/AdminNavbar';
import './AdminUsers.css';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await adminApi.getAllUsers();
      
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        setError('Failed to load users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      const response = await adminApi.searchUsers(query);
      
      if (response.data.success) {
        setSearchResults(response.data.data);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        const response = await adminApi.deleteUser(userId);
        
        if (response.data.success) {
          setUsers(users.filter(u => u._id !== userId));
          setSearchResults(searchResults.filter(u => u._id !== userId));
          alert('User deleted successfully');
        }
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete user');
      }
    }
  };

  const displayUsers = searchQuery.trim() !== '' ? searchResults : users;

  if (loading) {
    return (
      <div className="admin-container">
        <AdminNavbar />
        <div className="admin-content">
          <div className="loading">⏳ Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <AdminNavbar />
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>👥 Users Management</h1>
          <p>Manage all registered users</p>
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}

        {/* Search Bar */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          {isSearching && <span className="search-status">🔍 Searching...</span>}
        </div>

        {/* Users Table */}
        <div className="users-section">
          <div className="section-header">
            <h2>Total Users: {displayUsers.length}</h2>
            <button onClick={fetchUsers} className="refresh-btn">🔄 Refresh</button>
          </div>

          {displayUsers.length > 0 ? (
            <div className="users-table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayUsers.map((user) => (
                    <tr key={user._id} className="user-row">
                      <td className="user-name">
                        <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
                        {user.name}
                      </td>
                      <td className="user-email">{user.email}</td>
                      <td>
                        {user.isEmailVerified ? (
                          <span className="status-badge verified">✅ Verified</span>
                        ) : (
                          <span className="status-badge unverified">⏳ Pending</span>
                        )}
                      </td>
                      <td className="user-date">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="user-actions">
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteUser(user._id, user.name)}
                          title="Delete user"
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-results">
              {searchQuery ? 'No users found matching your search.' : 'No users found.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
