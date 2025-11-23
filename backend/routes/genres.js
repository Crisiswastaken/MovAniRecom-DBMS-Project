// Genre Routes
// CRUD operations for genres

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET ALL GENRES
// GET /api/genres
router.get('/', async (req, res) => {
    try {
        const [genres] = await db.query('SELECT * FROM genres ORDER BY name');
        res.json(genres);
    } catch (error) {
        console.error('Get genres error:', error);
        res.status(500).json({ error: 'Failed to fetch genres' });
    }
});

// GET GENRE BY ID
// GET /api/genres/:id
router.get('/:id', async (req, res) => {
    try {
        const [genres] = await db.query('SELECT * FROM genres WHERE genre_id = ?', [req.params.id]);

        if (genres.length === 0) {
            return res.status(404).json({ error: 'Genre not found' });
        }

        res.json(genres[0]);
    } catch (error) {
        console.error('Get genre error:', error);
        res.status(500).json({ error: 'Failed to fetch genre' });
    }
});

// CREATE NEW GENRE
// POST /api/genres
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Genre name is required' });
        }

        const [result] = await db.query('INSERT INTO genres (name) VALUES (?)', [name]);

        res.status(201).json({
            message: 'Genre created successfully',
            genreId: result.insertId
        });
    } catch (error) {
        console.error('Create genre error:', error);
        res.status(500).json({ error: 'Failed to create genre' });
    }
});

// UPDATE GENRE
// PUT /api/genres/:id
router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;

        await db.query('UPDATE genres SET name = ? WHERE genre_id = ?', [name, req.params.id]);

        res.json({ message: 'Genre updated successfully' });
    } catch (error) {
        console.error('Update genre error:', error);
        res.status(500).json({ error: 'Failed to update genre' });
    }
});

// DELETE GENRE
// DELETE /api/genres/:id
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM genres WHERE genre_id = ?', [req.params.id]);
        res.json({ message: 'Genre deleted successfully' });
    } catch (error) {
        console.error('Delete genre error:', error);
        res.status(500).json({ error: 'Failed to delete genre' });
    }
});

module.exports = router;
