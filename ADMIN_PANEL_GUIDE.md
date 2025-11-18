# Admin Panel Guide

## Overview
The admin panel allows authorized users to manage products, categories, and other aspects of the TownMarket application directly from the website.

## Accessing the Admin Panel

### Method 1: Direct URL
Navigate to `http://localhost:5173/admin` in your browser.

### Method 2: From the Main Website
1. Log in to your account
2. Click on your profile in the header
3. Select "Admin Panel" from the dropdown menu (only visible to admin users)

## Admin Login
- **Email-based Access**: Admin access is automatically granted to `enjirapunikhil@gmail.com`
- **Demo Password**: `admin123` (for fallback access)
- Simply log in with the email `enjirapunikhil@gmail.com` to get immediate admin access
- The login screen will appear if you're not authenticated as an admin
- For demo purposes, you can also use the password `admin123`

## Admin Dashboard Features

### 1. Product Management
- **View all products** in a sortable table format
- **Add new products** with the following fields:
  - Product Name
  - Description
  - Price
  - Category
  - Stock Quantity
  - Image URL
  - Featured Status
- **Edit existing products** by clicking the edit icon
- **Delete products** by clicking the trash icon
- **Real-time stock status** indicators (green/orange/red based on stock levels)

### 2. Statistics Overview
- Total number of products
- Number of categories
- Featured products count
- Low stock alerts (products with < 10 units)

### 3. Navigation Menu
- **Products**: Main product management interface
- **Orders**: Order management (coming soon)
- **Customers**: Customer management (coming soon)
- **Analytics**: Sales analytics (coming soon)
- **Settings**: System configuration (coming soon)

## Product Management Operations

### Adding a New Product
1. Click the "Add New Product" button
2. Fill in all required fields:
   - Product Name (required)
   - Description (required)
   - Price in ₹ (required)
   - Category (required)
   - Stock Quantity (required)
   - Image URL (required)
   - Featured Product (optional checkbox)
3. Click "Add Product" to save

### Editing a Product
1. Find the product in the table
2. Click the edit (pencil) icon
3. Modify the desired fields
4. Click "Update Product" to save changes

### Deleting a Product
1. Find the product in the table
2. Click the trash icon
3. Confirm the deletion in the popup dialog

## API Endpoints
The admin panel uses the following backend endpoints:
- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update existing product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/categories` - Fetch all categories

## Security Features
- Email-based admin access for `enjirapunikhil@gmail.com`
- Password-protected admin access (demo fallback)
- Session-based authentication (localStorage)
- Protected routes that redirect to login if not authenticated
- Logout functionality to clear admin session
- Automatic admin status detection based on logged-in user email

## Technical Implementation
- **Frontend**: React components with Tailwind CSS
- **Backend**: Spring Boot REST API
- **Database**: MongoDB for product and category storage
- **Authentication**: Simple localStorage-based system for demo purposes

## Future Enhancements
- User role management system
- JWT-based authentication
- Order management system
- Customer management
- Sales analytics dashboard
- Image upload functionality
- Bulk product operations
- Category management interface

## Troubleshooting

### Admin Panel Not Showing
- Ensure you're logged in as an admin
- Check that localStorage contains `isAdmin: true`
- Try clearing cache and refreshing

### Products Not Saving
- Ensure backend server is running on port 8080
- Check browser console for error messages
- Verify all required fields are filled

### Images Not Displaying
- Ensure image URLs are valid and accessible
- Check for CORS issues with external image sources
- Use HTTPS URLs for better compatibility

## Development Notes
- The admin panel is designed to be responsive and works on mobile devices
- All CRUD operations are performed in real-time
- The interface provides immediate feedback for all operations
- Stock levels are color-coded for quick visual reference
