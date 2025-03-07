const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
        required: true
    },
    seatNumber: {
        type: Number,
        required: true
    },
    passengerName: {
        type: String,
        required: true,
        trim: true
    },
    passengerAge: {
        type: Number,
        required: true,
        min: 0
    },
    passengerGender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    journeyDate: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    ticketNumber: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Generate ticket number before saving
bookingSchema.pre('save', async function(next) {
    if (!this.ticketNumber) {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        this.ticketNumber = `TKT${year}${month}${random}`;
    }
    next();
});

module.exports = mongoose.model('Booking', bookingSchema); 