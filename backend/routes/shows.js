// Show Routes
// CRUD operations for shows (movies/anime)

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET ALL SHOWS with optional filtering
// GET /api/shows?genre=1&search=naruto
router.get('/', async (req, res) => {
    try {
        const { genre, search } = req.query;
        let query = `
            SELECT s.*, g.name as genre_name 
            FROM shows s 
            LEFT JOIN genres g ON s.genre_id = g.genre_id 
            WHERE 1=1
        `;
        const params = [];

        // Filter by genre if provided
        if (genre) {
            query += ' AND s.genre_id = ?';
            params.push(genre);
        }

        // Search by title if provided
        if (search) {
            query += ' AND s.title LIKE ?';
            params.push(`%${search}%`);
        }

        query += ' ORDER BY s.title';

        const [shows] = await db.query(query, params);
        res.json(shows);
    } catch (error) {
        console.error('Get shows error:', error);
        res.status(500).json({ error: 'Failed to fetch shows' });
    }
});

// GET SHOW BY ID
// GET /api/shows/:id
router.get('/:id', async (req, res) => {
    try {
        const [shows] = await db.query(
            `SELECT s.*, g.name as genre_name 
             FROM shows s 
             LEFT JOIN genres g ON s.genre_id = g.genre_id 
             WHERE s.show_id = ?`,
            [req.params.id]
        );

        if (shows.length === 0) {
            return res.status(404).json({ error: 'Show not found' });
        }

        res.json(shows[0]);
    } catch (error) {
        console.error('Get show error:', error);
        res.status(500).json({ error: 'Failed to fetch show' });
    }
});

// CREATE NEW SHOW
// POST /api/shows
router.post('/', async (req, res) => {
    try {
        const { title, description, genre_id, release_year, image_url } = req.body;

        if (!title || !genre_id) {
            return res.status(400).json({ error: 'Title and genre are required' });
        }

        const [result] = await db.query(
            'INSERT INTO shows (title, description, genre_id, release_year, image_url) VALUES (?, ?, ?, ?, ?)',
            [title, description, genre_id, release_year, image_url]
        );

        res.status(201).json({
            message: 'Show created successfully',
            showId: result.insertId
        });
    } catch (error) {
        console.error('Create show error:', error);
        res.status(500).json({ error: 'Failed to create show' });
    }
});

// UPDATE SHOW
// PUT /api/shows/:id
router.put('/:id', async (req, res) => {
    try {
        const { title, description, genre_id, release_year, image_url } = req.body;

        await db.query(
            'UPDATE shows SET title = ?, description = ?, genre_id = ?, release_year = ?, image_url = ? WHERE show_id = ?',
            [title, description, genre_id, release_year, image_url, req.params.id]
        );

        res.json({ message: 'Show updated successfully' });
    } catch (error) {
        console.error('Update show error:', error);
        res.status(500).json({ error: 'Failed to update show' });
    }
});

// DELETE SHOW
// DELETE /api/shows/:id
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM shows WHERE show_id = ?', [req.params.id]);
        res.json({ message: 'Show deleted successfully' });
    } catch (error) {
        console.error('Delete show error:', error);
        res.status(500).json({ error: 'Failed to delete show' });
    }
});

module.exports = router;
