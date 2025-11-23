// Recommendations Route
// Generates AI-powered recommendations using Gemini API

const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { generateRecommendations } = require('../services/geminiService');

// GET RECOMMENDATIONS FOR USER
// GET /api/recommendations?userId=1
router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        // Get user's watch history with show details
        const [watchHistory] = await db.query(
            `SELECT wh.rating, s.title, g.name as genre_name, s.genre_id
             FROM watch_history wh
             JOIN shows s ON wh.show_id = s.show_id
             LEFT JOIN genres g ON s.genre_id = g.genre_id
             WHERE wh.user_id = ?
             ORDER BY wh.rating DESC, wh.watched_on DESC`,
            [userId]
        );

        // Check if user has watch history
        if (watchHistory.length === 0) {
            return res.status(400).json({ 
                error: 'No watch history found. Please watch and rate some shows first.' 
            });
        }

        // Get user's top genres (most watched)
        const [topGenres] = await db.query(
            `SELECT g.genre_id, g.name as genre_name, COUNT(*) as count
             FROM watch_history wh
             JOIN shows s ON wh.show_id = s.show_id
             LEFT JOIN genres g ON s.genre_id = g.genre_id
             WHERE wh.user_id = ?
             GROUP BY g.genre_id, g.name
             ORDER BY count DESC, AVG(wh.rating) DESC
             LIMIT 3`,
            [userId]
        );

        // Generate recommendations using Gemini AI
        const recommendations = await generateRecommendations(watchHistory, topGenres);

        res.json({
            message: 'Recommendations generated successfully',
            recommendations,
            basedOn: {
                totalWatched: watchHistory.length,
                topGenres: topGenres.map(g => g.genre_name)
            }
        });

    } catch (error) {
        console.error('Get recommendations error:', error);
        
        if (error.message.includes('API key')) {
            return res.status(500).json({ 
                error: 'Gemini API key not configured. Please add GEMINI_API_KEY to .env file.' 
            });
        }
        
        res.status(500).json({ 
            error: 'Failed to generate recommendations. Please try again.' 
        });
    }
});

module.exports = router;
