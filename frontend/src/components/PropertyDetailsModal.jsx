import React, { useState } from 'react';
import './PropertyDetailsModal.css';

const PropertyDetailsModal = ({ property, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !property) return null;

  const {
    title,
    description,
    price,
    city,
    area,
    type,
    images,
    ownerName,
    phone,
    whatsAppPhone,
    location,
    furnished,
    ac,
    wifi,
    parking,
    foodAvailable,
    genderPreference,
    petAllowed,
    nearbyCollege
  } = property;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>Ã—</button>

        <div className="modal-body">
          {/* Images Section */}
          <div className="modal-images-section">
            <div className="modal-main-image">
              {images && images.length > 0 ? (
                <img 
                  src={images[currentImageIndex]} 
                  alt={title}
                  className="modal-image"
                />
              ) : (
                <div className="modal-image-placeholder">No Images Available</div>
              )}
            </div>

            {images && images.length > 1 && (
              <>
                <button className="modal-nav-btn prev" onClick={prevImage}>â®</button>
                <button className="modal-nav-btn next" onClick={nextImage}>â¯</button>
              </>
            )}

            {/* Image Thumbnails */}
            {images && images.length > 0 && (
              <div className="modal-thumbnails">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${title} ${idx + 1}`}
                    className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="modal-details-section">
            <h1 className="modal-title">{title}</h1>

            <div className="modal-meta">
              <span className="modal-badge">{type}</span>
              <span className="modal-badge">{area}</span>
            </div>

            <div className="modal-price">
              â‚¹ {price.toLocaleString()}/month
            </div>

            <div className="modal-info-grid">
              <div className="info-item">
                <label>City</label>
                <p>{city}</p>
              </div>
              <div className="info-item">
                <label>Area</label>
                <p>{area}</p>
              </div>
              <div className="info-item">
                <label>Type</label>
                <p>{type}</p>
              </div>
              <div className="info-item">
                <label>Price</label>
                <p>â‚¹ {price.toLocaleString()}/month</p>
              </div>
            </div>

            {description && (
              <div className="modal-description">
                <h3>Description</h3>
                <p>{description}</p>
              </div>
            )}

            {(furnished || ac || wifi || parking || foodAvailable || petAllowed || genderPreference !== 'Any' || (nearbyCollege && nearbyCollege.length > 0)) && (
              <div className="modal-features-section">
                <h3>Features & Amenities</h3>
                <div className="features-grid">
                  {furnished && <div className="feature-badge">✓ Furnished</div>}
                  {ac && <div className="feature-badge">✓ AC Available</div>}
                  {wifi && <div className="feature-badge">✓ WiFi Available</div>}
                  {parking && <div className="feature-badge">✓ Parking Available</div>}
                  {foodAvailable && <div className="feature-badge">✓ Food Available</div>}
                  {petAllowed && <div className="feature-badge">✓ Pets Allowed</div>}
                  {genderPreference && genderPreference !== 'Any' && (
                    <div className="feature-badge">👥 {genderPreference}</div>
                  )}
                  {nearbyCollege && nearbyCollege.length > 0 && (
                    <div className="feature-badge">🎓 Near {nearbyCollege.join(', ')}</div>
                  )}
                </div>
              </div>
            )}

            <div className="modal-owner-section">
              <h3>Contact Information</h3>
              <div className="owner-info">
                {ownerName && (
                  <div className="info-item">
                    <label>Owner Name</label>
                    <p>{ownerName}</p>
                  </div>
                )}
                {phone && (
                  <div className="info-item">
                    <label>Phone</label>
                    <p>
                      <a href={`tel:${phone}`} className="phone-link">
                        ðŸ“ž {phone}
                      </a>
                    </p>
                  </div>
                )}
                {whatsAppPhone && (
                  <div className="info-item">
                    <label>WhatsApp</label>
                    <p>
                      <a href={`https://wa.me/${whatsAppPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                        ðŸ’¬ {whatsAppPhone}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {location && (location.lat || location.lng) && (
              <div className="modal-location-section">
                <h3>Location</h3>
                <div className="location-info">
                  {location.lat && <p>Latitude: {location.lat}</p>}
                  {location.lng && <p>Longitude: {location.lng}</p>}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          {phone && (
            <a href={`tel:${phone}`} className="modal-btn contact-btn">
              ðŸ“ž Call Owner
            </a>
          )}
          {whatsAppPhone && (
            <a href={`https://wa.me/${whatsAppPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="modal-btn whatsapp-btn">
              ðŸ’¬ WhatsApp
            </a>
          )}
          <button className="modal-btn close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
