const Route = require('../models/Route');

// Get all routes
exports.getAllRoutes = async (req, res) => {
    try {
        const { from, to, date } = req.query;
        let query = { isActive: true };

        if (from) query.from = from;
        if (to) query.to = to;

        const routes = await Route.find(query);
        res.json(routes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching routes', error: error.message });
    }
};

// Get single route
exports.getRoute = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        res.json(route);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching route', error: error.message });
    }
};

// Create new route (admin only)
exports.createRoute = async (req, res) => {
    try {
        const route = new Route(req.body);
        await route.save();
        res.status(201).json(route);
    } catch (error) {
        res.status(500).json({ message: 'Error creating route', error: error.message });
    }
};

// Update route (admin only)
exports.updateRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        res.json(route);
    } catch (error) {
        res.status(500).json({ message: 'Error updating route', error: error.message });
    }
};

// Delete route (admin only)
exports.deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }
        res.json({ message: 'Route deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting route', error: error.message });
    }
};

// Add dummy routes
exports.addDummyRoutes = async (req, res) => {
    try {
        const dummyRoutes = [
            {
                from: 'New York',
                to: 'Boston',
                departureTime: '08:00',
                arrivalTime: '12:00',
                price: 50,
                totalSeats: 40,
                availableSeats: 40,
                busNumber: 'NYB001',
                busType: 'AC'
            },
            {
                from: 'Boston',
                to: 'Washington DC',
                departureTime: '09:00',
                arrivalTime: '14:00',
                price: 65,
                totalSeats: 40,
                availableSeats: 40,
                busNumber: 'BWD001',
                busType: 'Sleeper'
            },
            {
                from: 'Washington DC',
                to: 'Philadelphia',
                departureTime: '10:00',
                arrivalTime: '13:00',
                price: 45,
                totalSeats: 40,
                availableSeats: 40,
                busNumber: 'WDP001',
                busType: 'Non-AC'
            }
        ];

        await Route.insertMany(dummyRoutes);
        res.status(201).json({ message: 'Dummy routes added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding dummy routes', error: error.message });
    }
}; 