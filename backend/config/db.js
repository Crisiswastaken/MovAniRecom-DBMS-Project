// Database Connection Configuration
// This file creates and exports a MySQL connection pool

const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool (better for handling multiple requests)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert pool to use promises instead of callbacks
const promisePool = pool.promise();

// Test connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        return;
    }
    console.log('✅ Database connected successfully');
    connection.release();
});

module.exports = promisePool;
