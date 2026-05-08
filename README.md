# Rental Property App

A full-stack web application for listing and searching rental properties built with React and Node.js.

## Features

- **Property Listings**: Browse available rental properties
- **Search & Filter**: Filter properties by city, price range, and property type
- **Add Properties**: List your rental property with images, location, and contact info
- **Geolocation**: Automatically capture property location using GPS
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Property Details**: View detailed information about each property

## Project Structure

```
rental-app/
├── client/              (React Frontend)
│   ├── components/      (Reusable UI components)
│   ├── pages/          (Page components)
│   ├── services/       (API services)
│   └── App.jsx         (Main component)
│
└── server/             (Node.js Backend)
    ├── controllers/    (Business logic)
    ├── models/         (Database schemas)
    ├── routes/         (API routes)
    ├── middleware/     (Authentication, validation)
    ├── config/         (Database configuration)
    └── server.js       (Entry point)
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Backend Setup

1. Navigate to the server directory:
```bash
cd rental-app/server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/rental-app
PORT=5000
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd rental-app/client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### Properties

- `GET /api/properties` - Get all properties with optional filters
  - Query params: `city`, `maxPrice`, `minPrice`, `type`, `page`, `limit`

- `GET /api/properties/:id` - Get single property details

- `POST /api/properties` - Create new property (requires authentication)

- `PUT /api/properties/:id` - Update property (requires authentication)

- `DELETE /api/properties/:id` - Delete property (requires authentication)

## Usage

1. **Search for properties**: Use the search bar on the home page to find properties by city and price range

2. **Filter listings**: Apply filters by property type and price range on the listings page

3. **View property details**: Click on any property card to see full details and contact the owner

4. **Add property**: Click "Add Property" to list your rental property with images and location

## Technologies Used

### Frontend
- React 18
- React Router v6
- Axios (API calls)
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Future Enhancements

- User authentication (JWT)
- Property reviews and ratings
- Favorites/wishlist
- Advanced search filters
- Map view integration
- Image upload to cloud storage
- User dashboard
- Email notifications

## SEO Checklist (added)

- Replace the placeholder domain `https://www.example.com/` in `public/index.html`, `public/robots.txt`, and `public/sitemap.xml` with your real production domain.
- Customize the meta `description`, `keywords`, and Open Graph (`og:*`) tags in `public/index.html` to match your site's messaging.
- Add a real `public/hero-image.jpg` if you prefer a local image; update the `og:image` accordingly.
- Submit `https://your-domain/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
- Consider adding per-page dynamic meta tags using `react-helmet` or server-side rendering for better SEO on individual pages.
- Monitor search performance in Google Search Console and run PageSpeed Insights to improve performance metrics.

## License

MIT License
