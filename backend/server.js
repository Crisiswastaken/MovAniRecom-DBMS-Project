// Main Server File
// This is the entry point of the backend application

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const showRoutes = require('./routes/shows');
const genreRoutes = require('./routes/genres');
const watchHistoryRoutes = require('./routes/watchHistory');
const favouritesRoutes = require('./routes/favourites');
const recommendationRoutes = require('./routes/recommendations');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/watch-history', watchHistoryRoutes);
app.use('/api/favourites', favouritesRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Root route - serve main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Frontend served from: ${path.join(__dirname, '../frontend')}`);
});
