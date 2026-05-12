import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-content">
          <h2>About RentHub</h2>
          <p>Welcome to RentHub</p>
        </div>
      </div>

      <div className="about-container">
        
        <section className="about-intro section-block">
          <p>Finding a safe, affordable, and comfortable place to stay in a new city is one of the biggest challenges for students and working professionals. Many people move to different cities every year for education, internships, jobs, coaching, or career opportunities, but they often struggle to find trusted rental homes within their budget.</p>
          <p><strong>That's why RentHub was created.</strong></p>
          <p>RentHub is a smart and user-friendly rental platform specially designed to help students and newcomers easily find rooms, PGs, flats, hostels, and rental homes without unnecessary stress. Our goal is to make the house-hunting process simple, fast, affordable, and transparent.</p>
          <p>Whether you are moving to a city for college, university, coaching, or your first job, RentHub helps you discover rental properties based on your budget, preferred location, room type, and personal needs.</p>
        </section>

        <div className="cards-section">
          <div className="info-card">
            <div className="icon">🎯</div>
            <h3>Our Mission</h3>
            <p>At RentHub, our mission is to simplify the rental experience for students and people relocating to new cities. We aim to connect tenants and property owners through a trusted digital platform where finding a rental home becomes easier, safer, and more affordable.</p>
            <p className="mt-2">We believe that every student deserves a comfortable place to live without wasting time, money, or energy searching through unreliable sources.</p>
          </div>
          <div className="info-card">
            <div className="icon">🌟</div>
            <h3>Our Vision</h3>
            <p>Our vision is to become one of the most trusted student rental platforms in India by helping millions of students and working professionals find the right accommodation without hassle.</p>
            <p className="mt-2">We want RentHub to create a future where moving to a new city feels exciting instead of stressful.</p>
          </div>
        </div>

        <section className="features-section section-block">
          <h3 className="section-title">What RentHub Offers</h3>
          <div className="features-grid">
            <div className="feature-item">
              <h4>💰 Budget-Friendly Options</h4>
              <p>Find rooms, PGs, flats, and rental homes according to your budget and lifestyle needs.</p>
            </div>
            <div className="feature-item">
              <h4>🔍 Easy Property Search</h4>
              <p>Search properties by city, area, rent price, facilities, and room type with a smooth and simple experience.</p>
            </div>
            <div className="feature-item">
              <h4>✅ Verified Listings</h4>
              <p>We aim to provide reliable and genuine property listings to help users avoid scams and fake information.</p>
            </div>
            <div className="feature-item">
              <h4>🎓 Student-Focused Platform</h4>
              <p>RentHub is specially built for students and newcomers who need affordable accommodation in unfamiliar cities.</p>
            </div>
            <div className="feature-item">
              <h4>🤝 Direct Owner Connection</h4>
              <p>Users can connect directly with property owners or landlords for better communication and transparency.</p>
            </div>
          </div>
        </section>

        <section className="why-choose-section section-block">
          <h3 className="section-title">Why Choose RentHub?</h3>
          <ul className="benefits-list">
            <li><span>✨</span> Simple and easy-to-use platform</li>
            <li><span>🎓</span> Designed specially for students</li>
            <li><span>💸</span> Affordable rental solutions</li>
            <li><span>⚡</span> Faster property discovery</li>
            <li><span>🔍</span> Transparent and user-friendly experience</li>
            <li><span>🛡️</span> Helps users explore homes in new cities confidently</li>
          </ul>
        </section>

        <section className="cta-section section-block">
          <h3 className="section-title">Join the RentHub Community</h3>
          <p>If you are searching for a rental home, room, PG, or student accommodation, RentHub is here to help you find the perfect place quickly and comfortably.</p>
          <div className="cta-highlight">
            Start your journey with RentHub and discover better rental living today.
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;