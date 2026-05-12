import React, { useState } from 'react';
import PropertyDetailsModal from './PropertyDetailsModal';
import './PropertyCard.css';

const PropertyCard = ({ data }) => {
  const { title, price, city, type, images, area } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
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
            <span className="property-city">City : {city}</span>
          </div>
          
          <div className="property-footer">
            <div className="property-price">Price : {price.toLocaleString()}/month</div>
            <button className="view-btn" onClick={openModal}>View Details</button>
          </div>
        </div>
      </div>

      <PropertyDetailsModal 
        property={data} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};

export default PropertyCard;