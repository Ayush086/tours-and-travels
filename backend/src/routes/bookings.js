const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const {
    createBooking,
    getUserBookings,
    getAllBookings,
    updateBookingStatus,
    cancelBooking
} = require('../controllers/bookingController');

// User routes
router.post('/', auth, createBooking);
router.get('/my-bookings', auth, getUserBookings);
router.post('/:id/cancel', auth, cancelBooking);

// Admin routes
router.get('/', auth, isAdmin, getAllBookings);
router.patch('/:id/status', auth, isAdmin, updateBookingStatus);

module.exports = router; 