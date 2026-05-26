# 🔐 Admin Panel Setup Guide

## What's Included

Your admin panel has been completely built with:

### ✅ **Backend (Node.js/Express)**
- Admin authentication routes
- Admin middleware for security
- User management endpoints
- Property management endpoints
- Dashboard statistics endpoints
- Search functionality for users and properties

### ✅ **Frontend (React)**
- Admin login page with beautiful UI
- Admin dashboard with statistics
- User management interface
- Property management interface
- Responsive design for all devices

---

## 🚀 How to Access Admin Panel

### Step 1: Set Admin Credentials

You need to set your admin email and password in the `.env` file:

**Backend `.env` file** (add these lines):
```env
ADMIN_EMAIL=admin@renthub.in
ADMIN_PASSWORD=your_secure_password_here
JWT_SECRET=your-super-secret-key
```

**Important:** Change the password to something secure! Example:
```env
ADMIN_EMAIL=admin@renthub.in
ADMIN_PASSWORD=MySecureAdmin@123
JWT_SECRET=super_secret_jwt_key_12345
```

### Step 2: Deploy Backend Changes

```bash
cd backend
git add .
git commit -m "Add: Admin panel backend with routes and controllers"
git push origin main
```

### Step 3: Deploy Frontend Changes

```bash
cd frontend
git add .
git commit -m "Add: Admin panel with dashboard, users, and properties management"
git push origin main
```

### Step 4: Access Admin Panel

After deployment:
1. Go to: **https://renthub.in/admin/login** (or your domain)
2. Enter the credentials:
   - Email: `admin@renthub.in` (or your custom email)
   - Password: `your_secure_password_here`
3. Click Login

---

## 📊 Admin Panel Features

### 1. **Admin Dashboard** 📊
View key metrics at a glance:
- Total users count
- Total properties count
- Verified vs unverified users
- Properties by city
- Properties by type
- Average property price by city
- Recent users (last 10)
- Recent properties (last 10)

**Access:** `/admin/dashboard`

### 2. **Users Management** 👥
Complete user management system:
- View all registered users
- Search users by name or email
- See email verification status
- Delete users
- View join date
- User avatars with first letter

**Features:**
- Search in real-time
- Instant deletion
- User status badges (Verified/Pending)
- Responsive user table

**Access:** `/admin/users`

### 3. **Properties Management** 🏠
Complete property listing management:
- View all properties
- Search by title, city, or area
- See property images
- View property details (price, type, location)
- Delete properties
- Owner information

**Features:**
- Property cards with images
- Price and location display
- Property type badges
- Quick delete functionality
- Responsive grid layout

**Access:** `/admin/properties`

---

## 🔑 Default Login Credentials

```
Email: admin@renthub.in
Password: Set in .env file
```

**⚠️ IMPORTANT:** Change these credentials after first login in production!

---

## 📁 Files Created/Modified

### Backend Files Created:
- `backend/controllers/adminController.js` - Admin controller with all logic
- `backend/middleware/adminAuth.js` - Admin authentication middleware
- `backend/routes/adminRoutes.js` - Admin API routes

### Backend Files Modified:
- `backend/server.js` - Added admin routes

### Frontend Files Created:
- `frontend/src/pages/AdminLogin.jsx` - Admin login page
- `frontend/src/pages/AdminLogin.css` - Login styling
- `frontend/src/pages/AdminDashboard.jsx` - Dashboard page
- `frontend/src/pages/AdminDashboard.css` - Dashboard styling
- `frontend/src/pages/AdminUsers.jsx` - Users management page
- `frontend/src/pages/AdminUsers.css` - Users styling
- `frontend/src/pages/AdminProperties.jsx` - Properties management page
- `frontend/src/pages/AdminProperties.css` - Properties styling
- `frontend/src/components/AdminNavbar.jsx` - Admin sidebar navigation
- `frontend/src/components/AdminNavbar.css` - Navigation styling
- `frontend/src/services/adminApi.js` - Admin API service

### Frontend Files Modified:
- `frontend/src/App.jsx` - Added admin routes

---

## 🔒 Security Features

### ✅ JWT Authentication
- Secure token-based authentication
- 24-hour token expiration
- Token stored in localStorage

### ✅ Admin Middleware
- Validates JWT tokens
- Checks admin role
- Prevents unauthorized access

### ✅ Protected Routes
- All admin endpoints require authentication
- Login endpoint is public (for login only)

### ✅ Password Security
- Store in environment variables (.env)
- Never hardcoded in the application
- Use strong passwords in production

---

## 📊 API Endpoints

### Admin Authentication
```
POST /api/admin/login
- Body: { email, password }
- Returns: { token, admin info }
```

### Dashboard
```
GET /api/admin/dashboard/stats (Protected)
- Returns: Users, properties, statistics, recent items
```

### Users Management
```
GET /api/admin/users (Protected)
GET /api/admin/users/:userId (Protected)
GET /api/admin/users/search?query=... (Protected)
DELETE /api/admin/users/:userId (Protected)
```

### Properties Management
```
GET /api/admin/properties (Protected)
GET /api/admin/properties/:propertyId (Protected)
GET /api/admin/properties/search?query=... (Protected)
DELETE /api/admin/properties/:propertyId (Protected)
```

---

## 🎨 UI Design

### Admin Panel Colors
- **Primary:** #667eea (Purple Blue)
- **Secondary:** #764ba2 (Dark Purple)
- **Success:** #48bb78 (Green)
- **Danger:** #f56565 (Red)
- **Warning:** #ed8936 (Orange)

### Responsive Design
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

---

## 🚀 Usage Instructions

### Login to Admin Panel
1. Navigate to `/admin/login`
2. Enter your credentials
3. Click "Login"
4. You'll be redirected to dashboard

### View Dashboard Statistics
1. Go to Dashboard
2. See overview of users and properties
3. View recent items
4. Monitor key metrics

### Manage Users
1. Go to Users page
2. Search users by name or email
3. View user status (verified/unverified)
4. Delete users if needed
5. Click Refresh to reload data

### Manage Properties
1. Go to Properties page
2. Search properties by title, city, or area
3. View property details and images
4. Delete properties if needed
5. Click Refresh to reload data

### Logout
1. Click "Logout" button in top right or sidebar
2. You'll be redirected to login page

---

## ⚠️ Important Notes

### Security Best Practices

1. **Change Default Password**
   - Always change admin password before production
   - Use strong, unique passwords
   - Store in `.env` file, never in code

2. **Protect `.env` File**
   - Add `.env` to `.gitignore` (already done)
   - Never commit credentials to git
   - Use environment secrets in production (Render, Vercel)

3. **Session Management**
   - Admin token expires after 24 hours
   - User will need to login again
   - Logout before leaving admin panel

4. **Data Safety**
   - Deleting users/properties is permanent
   - Confirm deletion before proceeding
   - No undo functionality

### Environment Variables Setup

**For Render Backend:**
1. Go to Dashboard → Your Service
2. Go to "Environment" tab
3. Add these variables:
   ```
   ADMIN_EMAIL=admin@renthub.in
   ADMIN_PASSWORD=YourSecurePassword123
   JWT_SECRET=YourSecretKey12345
   ```
4. Redeploy service

**For Vercel Frontend:**
- Frontend doesn't need any admin env vars
- All auth handled by backend

---

## 🐛 Troubleshooting

### "Invalid admin credentials"
- Check email and password match `.env` file
- Make sure backend is deployed with correct .env
- Try logging out and back in

### "Access denied. Admin role required"
- Ensure you're using the correct credentials
- Check JWT token is valid (hasn't expired)
- Try clearing localStorage and logging in again

### "No data loading"
- Refresh the page
- Check browser console for errors
- Verify backend is running and accessible
- Check network tab in DevTools

### "Search not working"
- Make sure you have properties/users in database
- Try different search terms
- Refresh page and try again

---

## 📈 Features You Can Add Later

1. **Export Data** - CSV/Excel export of users and properties
2. **Analytics** - Charts and graphs for trends
3. **Property Approval** - Approve pending properties before listing
4. **User Roles** - Multiple admin levels (super admin, moderator, etc.)
5. **Activity Logs** - Track admin actions
6. **Bulk Operations** - Delete multiple items at once
7. **Edit Properties** - Update property details
8. **Email Campaigns** - Send emails to users
9. **Backup System** - Automated database backups
10. **Custom Reports** - Generate custom reports

---

## ✨ Summary

Your admin panel is now:
- ✅ Fully functional and styled
- ✅ Connected to your backend
- ✅ Mobile responsive
- ✅ Secure with JWT authentication
- ✅ Ready for production

**Next Steps:**
1. Deploy backend and frontend
2. Set admin credentials in `.env`
3. Access `/admin/login` on your domain
4. Login and start managing your platform!

---

## 🎯 Quick Reference

| Feature | URL | What It Does |
|---------|-----|-------------|
| Admin Login | `/admin/login` | Login to admin panel |
| Dashboard | `/admin/dashboard` | View overview statistics |
| Users | `/admin/users` | Manage all users |
| Properties | `/admin/properties` | Manage all properties |

---

**Questions?** Check the browser console (F12) for error messages and API responses!

Enjoy your admin panel! 🚀
