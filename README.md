# Tours and Travels Website

A full-stack MERN application for booking bus tickets with user and admin functionalities.

## Features

### User Features
- User registration and authentication
- Search for bus routes
- Book tickets
- View booking history
- Cancel bookings

### Admin Features
- Add/Edit bus routes
- Manage bookings
- View all bookings and routes
- Admin authentication

## Tech Stack

### Frontend
- React.js
- Material-UI
- React Router
- Axios
- Date-fns

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tours-travels.git
cd tours-travels
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create a .env file in the backend directory:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Default Admin Credentials

- Email: admin@example.com
- Password: admin123

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Routes
- GET /api/routes - Get all routes
- GET /api/routes/:id - Get single route
- POST /api/routes - Add new route (admin only)
- PUT /api/routes/:id - Update route (admin only)
- DELETE /api/routes/:id - Delete route (admin only)

### Bookings
- POST /api/bookings - Create booking
- GET /api/bookings - Get all bookings (admin only)
- GET /api/bookings/my-bookings - Get user's bookings
- PATCH /api/bookings/:id/status - Update booking status (admin only)
- POST /api/bookings/:id/cancel - Cancel booking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/tours-travels 