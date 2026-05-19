import React from 'react';
import './Home.css';

const About = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>About RentHub</h1>
          <p>Your trusted platform for finding the perfect rental home.</p>
        </div>
      </section>

      <section className="features" style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '30px', color: '#333' }}>Our Mission</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#666' }}>
          At RentHub, we believe everyone deserves a place to call home. Our platform connects renters with
          property owners, making the rental process simple, transparent, and hassle-free.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#666', marginTop: '20px' }}>
          Whether you're looking for your first apartment, a family home, or a commercial space,
          RentHub provides the tools and resources you need to find the perfect property.
        </p>
      </section>

      <section className="feature-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        padding: '40px 20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div className="feature-card" style={{
          background: 'white',
          padding: '40px 30px',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '24px', color: '#667eea', marginBottom: '15px' }}>🏠</h3>
          <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>Quality Listings</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>Carefully curated properties with detailed information and high-quality images.</p>
        </div>

        <div className="feature-card" style={{
          background: 'white',
          padding: '40px 30px',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '24px', color: '#667eea', marginBottom: '15px' }}>🔍</h3>
          <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>Easy Search</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>Powerful search and filter tools to find exactly what you're looking for.</p>
        </div>

        <div className="feature-card" style={{
          background: 'white',
          padding: '40px 30px',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '24px', color: '#667eea', marginBottom: '15px' }}>🤝</h3>
          <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>Trusted Community</h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>A safe platform connecting verified renters and property owners.</p>
        </div>
      </section>
    </div>
  );
};

export default About;
