const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const {
    getAllRoutes,
    getRoute,
    createRoute,
    updateRoute,
    deleteRoute,
    addDummyRoutes
} = require('../controllers/routeController');

// Public routes
router.get('/', getAllRoutes);
router.get('/:id', getRoute);

// Admin routes
router.post('/', auth, isAdmin, createRoute);
router.put('/:id', auth, isAdmin, updateRoute);
router.delete('/:id', auth, isAdmin, deleteRoute);
router.post('/dummy', auth, isAdmin, addDummyRoutes);

module.exports = router; 