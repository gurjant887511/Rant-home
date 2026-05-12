import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ data }) => {
  const { _id, title, price, city, type, images, area } = data;

  return (
    <div className="property-card">
      <div className="property-image-container">
        {images && images.length > 0 ? (
          <img 
            src={images[0]} 
            alt={title} 
            className="property-image"
          />
        ) : (
          <div className="property-image-placeholder">No Image</div>
        )}
      </div>
      
      <div className="property-info">
        <h3 className="property-title">{title}</h3>
        
        <div className="property-details">
          <span className="property-type">{type}</span>
          <span className="property-area">{area}</span>
        </div>
        
        <div className="property-location">
          <span className="property-city">ðŸ“ {city}</span>
        </div>
        
        <div className="property-footer">
          <div className="property-price">â‚¹{price.toLocaleString()}/month</div>
          <button className="view-btn">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ data }) => {
  const { _id, title, price, city, type, images, area } = data;

  return (
    <div className="property-card">
      <div className="property-image-container">
        {images && images.length > 0 ? (
          <img 
            src={images[0]} 
            alt={title} 
            className="property-image"
          />
        ) : (
          <div className="property-image-placeholder">No Image</div>
        )}
      </div>
      
      <div className="property-info">
        <h3 className="property-title">{title}</h3>
        
        <div className="property-details">
          <span className="property-type">{type}</span>
          <span className="property-area">{area}</span>
        </div>
        
        <div className="property-location">
          <span className="property-city">ðŸ“ {city}</span>
        </div>
        
        <div className="property-footer">
          <div className="property-price">â‚¹{price.toLocaleString()}/month</div>
          <button className="view-btn">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

