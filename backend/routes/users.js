// User Routes
// CRUD operations for users

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET USER BY ID
// GET /api/users/:id
router.get('/:id', async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT user_id, name, email FROM users WHERE user_id = ?',
            [req.params.id]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(users[0]);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// UPDATE USER
// PUT /api/users/:id
router.put('/:id', async (req, res) => {
    try {
        const { name, email } = req.body;

        await db.query(
            'UPDATE users SET name = ?, email = ? WHERE user_id = ?',
            [name, email, req.params.id]
        );

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// DELETE USER
// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE user_id = ?', [req.params.id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
