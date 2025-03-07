const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Route = require('./models/Route');
const Booking = require('./models/Booking');
require('dotenv').config();

const dummyRoutes = [
  {
    from: 'Mumbai',
    to: 'Delhi',
    departureTime: new Date('2024-03-10T08:00:00'),
    arrivalTime: new Date('2024-03-11T08:00:00'),
    price: 1200,
    seats: 40,
    availableSeats: 40,
    busNumber: 'MB001',
    busType: 'Sleeper',
    totalSeats: 40
  },
  {
    from: 'Bangalore',
    to: 'Chennai',
    departureTime: new Date('2024-03-10T09:00:00'),
    arrivalTime: new Date('2024-03-10T17:00:00'),
    price: 800,
    seats: 40,
    availableSeats: 40,
    busNumber: 'BC001',
    busType: 'AC',
    totalSeats: 40
  },
  {
    from: 'Kolkata',
    to: 'Hyderabad',
    departureTime: new Date('2024-03-10T10:00:00'),
    arrivalTime: new Date('2024-03-11T06:00:00'),
    price: 1000,
    seats: 40,
    availableSeats: 40,
    busNumber: 'KH001',
    busType: 'Non-AC',
    totalSeats: 40
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Route.deleteMany({});
    await Booking.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash('admin@123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin'
    });
    console.log('Admin user created');

    // Create regular user
    const userPassword = await bcrypt.hash('user@123', 10);
    const user = await User.create({
      name: 'Test User',
      email: 'user@example.com',
      password: userPassword,
      role: 'user'
    });
    console.log('Test user created');

    // Create routes
    const routes = await Route.insertMany(dummyRoutes);
    console.log('Routes created');

    // Create some bookings
    const bookings = await Booking.create([
      {
        user: user._id,
        route: routes[0]._id,
        seats: 2,
        totalAmount: 2400,
        status: 'confirmed',
        bookingDate: new Date(),
        journeyDate: new Date('2024-03-10'),
        passengerName: 'John Doe',
        passengerAge: 30,
        passengerGender: 'Male',
        seatNumber: 1,
        paymentStatus: 'completed'
      },
      {
        user: user._id,
        route: routes[1]._id,
        seats: 1,
        totalAmount: 800,
        status: 'pending',
        bookingDate: new Date(),
        journeyDate: new Date('2024-03-10'),
        passengerName: 'Jane Doe',
        passengerAge: 25,
        passengerGender: 'Female',
        seatNumber: 2,
        paymentStatus: 'pending'
      }
    ]);
    console.log('Bookings created');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 