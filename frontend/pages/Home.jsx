import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../pages/components/SearchBar';
import heroImg from '../src/images/hero.jpg';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await api.getAllProperties(filters);
      setProperties(response.data.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters) => {
    fetchProperties(filters);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

   {/* HERO SECTION */}
<div className="relative h-screen w-full overflow-hidden">

  {/* IMAGE */}
  <img
    src={heroImg}
    alt="home"
    className="absolute top-0 left-0 w-full h-full object-cover"
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* CONTENT */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">

    <h1 className="text-6xl font-bold mb-5">
      Find Your Perfect Rental Home
    </h1>

    <p className="text-xl mb-8">
      Discover amazing rental properties in your area
    </p>

    <button className="bg-blue-600 px-8 py-4 rounded-xl text-lg">
      Explore Rooms
    </button>

  </div>

</div>

      {/* SEARCH SECTION */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose RentHub?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">
              Verified Listings
            </h3>

            <p className="text-gray-600">
              We provide trusted and verified rental properties for students.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">
              Affordable Prices
            </h3>

            <p className="text-gray-600">
              Find rooms and flats according to your monthly budget easily.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-4">
              Student Friendly
            </h3>

            <p className="text-gray-600">
              Designed specially for college students and working professionals.
            </p>
          </div>

        </div>
      </div>

      {/* PROPERTY SECTION */}
      <div className="max-w-7xl mx-auto px-4 pb-20">

        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold">
            Latest Properties
          </h2>

          <button className="text-blue-600 font-semibold hover:underline">
            View All
          </button>
        </div>

        {loading ? (
          <div className="text-center text-2xl font-semibold py-20">
            Loading properties...
          </div>
        ) : properties.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id} data={property} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-xl py-20">
            No properties found.
          </div>
        )}
      </div>

      {/* CTA SECTION */}
      <div className="bg-blue-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready To Find Your New Home?
          </h2>

          <p className="text-lg text-blue-100 mb-8">
            Join thousands of students finding affordable rentals on RentHub.
          </p>

          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition">
            Get Started
          </button>

        </div>
      </div>

    </div>
  );
};

export default Home;