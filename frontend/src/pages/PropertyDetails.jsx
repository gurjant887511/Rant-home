<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);
      const response = await api.getPropertyById(id);
      setProperty(response.data.data);
    } catch (error) {
      console.error('Error fetching property details:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) {
    return <div className="loading">Loading property details...</div>;
  }

  if (!property) {
    return <div className="error">Property not found.</div>;
  }

  return (
    <div className="property-details">
      <div className="details-container">
        <div className="details-gallery">
          <div className="gallery-main">
            {property.images && property.images.length > 0 ? (
              <>
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="main-image"
                />
                {property.images.length > 1 && (
                  <div className="gallery-controls">
                    <button onClick={prevImage} className="gallery-btn">❮</button>
                    <span className="gallery-counter">
                      {currentImageIndex + 1} / {property.images.length}
                    </span>
                    <button onClick={nextImage} className="gallery-btn">❯</button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-image">No Images Available</div>
            )}
          </div>

          {property.images && property.images.length > 1 && (
            <div className="gallery-thumbnails">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="details-info">
          <h1 className="details-title">{property.title}</h1>

          <div className="details-price">
            <span className="price-amount">₹{property.price.toLocaleString()}</span>
            <span className="price-period">/month</span>
          </div>

          <div className="details-highlights">
            <div className="highlight">
              <span className="highlight-label">Type</span>
              <span className="highlight-value">{property.type}</span>
            </div>
            <div className="highlight">
              <span className="highlight-label">Area</span>
              <span className="highlight-value">{property.area}</span>
            </div>
            <div className="highlight">
              <span className="highlight-label">Location</span>
              <span className="highlight-value">{property.city}</span>
            </div>
          </div>

          <div className="details-section">
            <h2>Description</h2>
            <p>{property.description}</p>
          </div>

          <div className="details-section">
            <h2>Contact Owner</h2>
            <div className="owner-info">
              <div className="owner-detail">
                <span className="label">Owner Name:</span>
                <span className="value">{property.ownerName}</span>
              </div>
              <div className="owner-detail">
                <span className="label">Phone:</span>
                <a href={`tel:${property.phone}`} className="phone-link">
                  {property.phone}
                </a>
              </div>
            </div>
          </div>

          {property.location && (property.location.lat || property.location.lng) && (
            <div className="details-section">
              <h2>Location</h2>
              <p>Latitude: {property.location.lat}</p>
              <p>Longitude: {property.location.lng}</p>
            </div>
          )}

          <button className="contact-btn">Contact Owner</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
=======
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);
      const response = await api.getPropertyById(id);
      setProperty(response.data.data);
    } catch (error) {
      console.error('Error fetching property details:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (loading) {
    return <div className="loading">Loading property details...</div>;
  }

  if (!property) {
    return <div className="error">Property not found.</div>;
  }

  return (
    <div className="property-details">
      <div className="details-container">
        <div className="details-gallery">
          <div className="gallery-main">
            {property.images && property.images.length > 0 ? (
              <>
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="main-image"
                />
                {property.images.length > 1 && (
                  <div className="gallery-controls">
                    <button onClick={prevImage} className="gallery-btn">❮</button>
                    <span className="gallery-counter">
                      {currentImageIndex + 1} / {property.images.length}
                    </span>
                    <button onClick={nextImage} className="gallery-btn">❯</button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-image">No Images Available</div>
            )}
          </div>

          {property.images && property.images.length > 1 && (
            <div className="gallery-thumbnails">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="details-info">
          <h1 className="details-title">{property.title}</h1>

          <div className="details-price">
            <span className="price-amount">₹{property.price.toLocaleString()}</span>
            <span className="price-period">/month</span>
          </div>

          <div className="details-highlights">
            <div className="highlight">
              <span className="highlight-label">Type</span>
              <span className="highlight-value">{property.type}</span>
            </div>
            <div className="highlight">
              <span className="highlight-label">Area</span>
              <span className="highlight-value">{property.area}</span>
            </div>
            <div className="highlight">
              <span className="highlight-label">Location</span>
              <span className="highlight-value">{property.city}</span>
            </div>
          </div>

          <div className="details-section">
            <h2>Description</h2>
            <p>{property.description}</p>
          </div>

          <div className="details-section">
            <h2>Contact Owner</h2>
            <div className="owner-info">
              <div className="owner-detail">
                <span className="label">Owner Name:</span>
                <span className="value">{property.ownerName}</span>
              </div>
              <div className="owner-detail">
                <span className="label">Phone:</span>
                <a href={`tel:${property.phone}`} className="phone-link">
                  {property.phone}
                </a>
              </div>
            </div>
          </div>

          {property.location && (property.location.lat || property.location.lng) && (
            <div className="details-section">
              <h2>Location</h2>
              <p>Latitude: {property.location.lat}</p>
              <p>Longitude: {property.location.lng}</p>
            </div>
          )}

          <button className="contact-btn">Contact Owner</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
>>>>>>> 387879c9b953b3be03e99b06b9b3d62f91c8b64c
