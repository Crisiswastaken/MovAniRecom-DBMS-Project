// Favourites Routes
// CRUD operations for user favourites

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET ALL FAVOURITES FOR A USER
// GET /api/favourites?userId=1
router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const [favourites] = await db.query(
            `SELECT f.*, s.title, s.description, s.image_url, s.release_year, g.name as genre_name
             FROM favourites f
             JOIN shows s ON f.show_id = s.show_id
             LEFT JOIN genres g ON s.genre_id = g.genre_id
             WHERE f.user_id = ?
             ORDER BY s.title`,
            [userId]
        );

        res.json(favourites);
    } catch (error) {
        console.error('Get favourites error:', error);
        res.status(500).json({ error: 'Failed to fetch favourites' });
    }
});

// CHECK IF SHOW IS FAVOURITE
// GET /api/favourites/check?userId=1&showId=5
router.get('/check', async (req, res) => {
    try {
        const { userId, showId } = req.query;

        if (!userId || !showId) {
            return res.status(400).json({ error: 'userId and showId are required' });
        }

        const [result] = await db.query(
            'SELECT * FROM favourites WHERE user_id = ? AND show_id = ?',
            [userId, showId]
        );

        res.json({ isFavourite: result.length > 0 });
    } catch (error) {
        console.error('Check favourite error:', error);
        res.status(500).json({ error: 'Failed to check favourite status' });
    }
});

// ADD TO FAVOURITES
// POST /api/favourites
router.post('/', async (req, res) => {
    try {
        const { user_id, show_id } = req.body;

        if (!user_id || !show_id) {
            return res.status(400).json({ error: 'user_id and show_id are required' });
        }

        // Check if already exists
        const [existing] = await db.query(
            'SELECT * FROM favourites WHERE user_id = ? AND show_id = ?',
            [user_id, show_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ error: 'Already in favourites' });
        }

        const [result] = await db.query(
            'INSERT INTO favourites (user_id, show_id) VALUES (?, ?)',
            [user_id, show_id]
        );

        res.status(201).json({
            message: 'Added to favourites successfully',
            favId: result.insertId
        });
    } catch (error) {
        console.error('Add to favourites error:', error);
        res.status(500).json({ error: 'Failed to add to favourites' });
    }
});

// REMOVE FROM FAVOURITES
// DELETE /api/favourites
router.delete('/', async (req, res) => {
    try {
        const { userId, showId } = req.query;

        if (!userId || !showId) {
            return res.status(400).json({ error: 'userId and showId are required' });
        }

        await db.query(
            'DELETE FROM favourites WHERE user_id = ? AND show_id = ?',
            [userId, showId]
        );

        res.json({ message: 'Removed from favourites successfully' });
    } catch (error) {
        console.error('Remove from favourites error:', error);
        res.status(500).json({ error: 'Failed to remove from favourites' });
    }
});

module.exports = router;
