const Booking = require('../models/Booking');
const Route = require('../models/Route');

// Create booking
exports.createBooking = async (req, res) => {
    try {
        const { routeId, seatNumber, passengerName, passengerAge, passengerGender, journeyDate } = req.body;

        // Check if route exists and has available seats
        const route = await Route.findById(routeId);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        if (route.availableSeats < 1) {
            return res.status(400).json({ message: 'No seats available' });
        }

        // Check if seat is already booked
        const existingBooking = await Booking.findOne({
            route: routeId,
            seatNumber,
            journeyDate,
            status: { $ne: 'cancelled' }
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'Seat already booked' });
        }

        // Create booking
        const booking = new Booking({
            user: req.user._id,
            route: routeId,
            seatNumber,
            passengerName,
            passengerAge,
            passengerGender,
            journeyDate,
            bookingDate: new Date(),
            totalAmount: route.price
        });

        await booking.save();

        // Update available seats
        route.availableSeats -= 1;
        await route.save();

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// Get user's bookings
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('route')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email')
            .populate('route')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};

// Update booking status (admin only)
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // If booking is cancelled, update available seats
        if (status === 'cancelled' && booking.status !== 'cancelled') {
            const route = await Route.findById(booking.route);
            route.availableSeats += 1;
            await route.save();
        }

        booking.status = status;
        await booking.save();

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking status', error: error.message });
    }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if user owns the booking
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to cancel this booking' });
        }

        // Update booking status
        booking.status = 'cancelled';
        await booking.save();

        // Update available seats
        const route = await Route.findById(booking.route);
        route.availableSeats += 1;
        await route.save();

        res.json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling booking', error: error.message });
    }
}; 