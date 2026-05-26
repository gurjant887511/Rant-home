import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminEmail = localStorage.getItem('adminEmail') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', label: '📊 Dashboard', icon: '📊' },
    { path: '/admin/users', label: '👥 Users', icon: '👥' },
    { path: '/admin/properties', label: '🏠 Properties', icon: '🏠' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="admin-navbar">
        <div className="navbar-brand">
          <h2>RentHub Admin</h2>
        </div>

        <div className="navbar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </div>

        <div className="navbar-user">
          <span className="user-email">👤 {adminEmail}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav className="admin-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout">
            🚪 Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default AdminNavbar;
