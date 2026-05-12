import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Review Form State
  const [review, setReview] = useState({ user: '', rating: '5', comment: '' });
  const [reviewMsg, setReviewMsg] = useState('');

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      const res = await api.getPropertyById(id);
      if (res.data.success) {
        setProperty(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching details", error);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      // Note: Make sure to add this endpoint in your frontend api service
      const res = await api.addPropertyReview(id, review);
      if (res.data.success) {
        setReviewMsg('Review added successfully!');
        setProperty(res.data.data); // Update UI with new review
        setReview({ user: '', rating: '5', comment: '' }); // Reset form
      }
    } catch (error) {
      setReviewMsg('Error adding review.');
    }
  };

  if (loading) return <div className="text-center py-20 text-2xl">Loading...</div>;
  if (!property) return <div className="text-center py-20 text-xl text-red-500">Property not found!</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">{property.title}</h1>
        <p className="text-gray-600 mt-2 text-lg flex items-center gap-2">
          📍 {property.area}, {property.city}
        </p>
      </div>

      {/* Images Grid */}
      {property.images && property.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {property.images.map((img, idx) => (
            <img key={idx} src={img} alt={`Property ${idx}`} className="w-full h-64 object-cover rounded-xl shadow-md" />
          ))}
        </div>
      )}

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <p className="text-gray-500 text-sm font-semibold uppercase">Monthly Rent</p>
            <h3 className="text-4xl font-bold text-blue-600 mb-4">₹{property.price}</h3>
            
            <div className="space-y-3 pt-4 border-t border-blue-200">
              <p><strong>Type:</strong> {property.type}</p>
              <p><strong>Owner:</strong> {property.ownerName}</p>
              <p><strong>Contact:</strong> {property.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border mt-8">
        <h2 className="text-3xl font-bold mb-6">Property Reviews</h2>
        
        {/* Display Reviews */}
        <div className="space-y-4 mb-10">
          {property.reviews && property.reviews.length > 0 ? (
            property.reviews.map((r, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between mb-2">
                  <strong className="text-lg">{r.user}</strong>
                  <span className="text-yellow-500 font-bold">⭐ {r.rating}/5</span>
                </div>
                <p className="text-gray-600">{r.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          )}
        </div>

        {/* Add Review Form */}
        <div className="bg-gray-50 p-6 rounded-xl border">
          <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
          {reviewMsg && <div className="mb-4 text-green-600 font-medium">{reviewMsg}</div>}
          
          <form onSubmit={submitReview} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm font-semibold mb-1">Your Name</label>
              <input type="text" value={review.user} onChange={(e) => setReview({...review, user: e.target.value})} required className="w-full border rounded-lg p-2" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1">Rating</label>
              <select value={review.rating} onChange={(e) => setReview({...review, rating: e.target.value})} className="w-full border rounded-lg p-2 bg-white">
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Poor</option>
                <option value="1">1 - Terrible</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1">Comment</label>
              <textarea rows="3" value={review.comment} onChange={(e) => setReview({...review, comment: e.target.value})} required className="w-full border rounded-lg p-2"></textarea>
            </div>
            
            <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition">
              Submit Review
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default PropertyDetails;