// Watch History Routes
// CRUD operations for user watch history

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET ALL WATCH HISTORY FOR A USER
// GET /api/watch-history?userId=1
router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        const [history] = await db.query(
            `SELECT wh.*, s.title, s.image_url, g.name as genre_name
             FROM watch_history wh
             JOIN shows s ON wh.show_id = s.show_id
             LEFT JOIN genres g ON s.genre_id = g.genre_id
             WHERE wh.user_id = ?
             ORDER BY wh.watched_on DESC`,
            [userId]
        );

        res.json(history);
    } catch (error) {
        console.error('Get watch history error:', error);
        res.status(500).json({ error: 'Failed to fetch watch history' });
    }
});

// GET SINGLE WATCH HISTORY ENTRY
// GET /api/watch-history/:id
router.get('/:id', async (req, res) => {
    try {
        const [history] = await db.query(
            `SELECT wh.*, s.title, s.description, s.image_url, g.name as genre_name
             FROM watch_history wh
             JOIN shows s ON wh.show_id = s.show_id
             LEFT JOIN genres g ON s.genre_id = g.genre_id
             WHERE wh.history_id = ?`,
            [req.params.id]
        );

        if (history.length === 0) {
            return res.status(404).json({ error: 'Watch history entry not found' });
        }

        res.json(history[0]);
    } catch (error) {
        console.error('Get watch history entry error:', error);
        res.status(500).json({ error: 'Failed to fetch watch history entry' });
    }
});

// ADD TO WATCH HISTORY
// POST /api/watch-history
router.post('/', async (req, res) => {
    try {
        const { user_id, show_id, rating, review, watched_on } = req.body;

        if (!user_id || !show_id || !rating) {
            return res.status(400).json({ error: 'user_id, show_id, and rating are required' });
        }

        // Use current date if not provided
        const watchDate = watched_on || new Date().toISOString().split('T')[0];

        const [result] = await db.query(
            'INSERT INTO watch_history (user_id, show_id, rating, review, watched_on) VALUES (?, ?, ?, ?, ?)',
            [user_id, show_id, rating, review, watchDate]
        );

        res.status(201).json({
            message: 'Added to watch history successfully',
            historyId: result.insertId
        });
    } catch (error) {
        console.error('Add to watch history error:', error);
        res.status(500).json({ error: 'Failed to add to watch history' });
    }
});

// UPDATE WATCH HISTORY ENTRY
// PUT /api/watch-history/:id
router.put('/:id', async (req, res) => {
    try {
        const { rating, review } = req.body;

        await db.query(
            'UPDATE watch_history SET rating = ?, review = ? WHERE history_id = ?',
            [rating, review, req.params.id]
        );

        res.json({ message: 'Watch history updated successfully' });
    } catch (error) {
        console.error('Update watch history error:', error);
        res.status(500).json({ error: 'Failed to update watch history' });
    }
});

// DELETE WATCH HISTORY ENTRY
// DELETE /api/watch-history/:id
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM watch_history WHERE history_id = ?', [req.params.id]);
        res.json({ message: 'Watch history entry deleted successfully' });
    } catch (error) {
        console.error('Delete watch history error:', error);
        res.status(500).json({ error: 'Failed to delete watch history entry' });
    }
});

module.exports = router;
