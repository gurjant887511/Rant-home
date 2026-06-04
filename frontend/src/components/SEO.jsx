import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url, image }) => {
  const siteTitle = 'RentHub | Student Room For Rent, PGs & Hostels Near You';
  const defaultTitle = title ? `${title} | RentHub` : siteTitle;
  
  const defaultDescription = description || 'RentHub (Rant Home) - Best platform for student room rent in India. Find cheap student rooms, PG for girls and boys, hostels near college, and single rooms for rent.';
  const defaultKeywords = keywords || 'renthub, rent home, room rent, student room for rent, PG for students, cheap rooms for students';
  const defaultImage = image || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1950&q=80';
  const currentUrl = url || 'https://renthub.online/';

  return (
    <Helmet>
      {/* Standard Metadata Tags */}
      <title>{defaultTitle}</title>
      <meta name="title" content={defaultTitle} />
      <meta name="description" content={defaultDescription} />
      <meta name="keywords" content={defaultKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:image" content={defaultImage} />
      <meta property="og:site_name" content="RentHub" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={defaultTitle} />
      <meta property="twitter:description" content={defaultDescription} />
      <meta property="twitter:image" content={defaultImage} />
    </Helmet>
  );
};

export default SEO;
