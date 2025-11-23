-- ===================================
-- Movie/Anime Recommendation Logger
-- Database Schema Creation Script
-- ===================================

-- Create database
CREATE DATABASE IF NOT EXISTS movie_anime_logger;
USE movie_anime_logger;

-- ===================================
-- 1. USERS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================================
-- 2. GENRES TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ===================================
-- 3. SHOWS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS shows (
    show_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    genre_id INT,
    release_year INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE SET NULL
);

-- ===================================
-- 4. WATCH_HISTORY TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS watch_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    show_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    watched_on DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (show_id) REFERENCES shows(show_id) ON DELETE CASCADE
);

-- ===================================
-- 5. FAVOURITES TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS favourites (
    fav_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    show_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (show_id) REFERENCES shows(show_id) ON DELETE CASCADE,
    UNIQUE KEY unique_favourite (user_id, show_id)
);

-- ===================================
-- INDEXES FOR BETTER PERFORMANCE
-- ===================================
CREATE INDEX idx_shows_genre ON shows(genre_id);
CREATE INDEX idx_watch_history_user ON watch_history(user_id);
CREATE INDEX idx_watch_history_show ON watch_history(show_id);
CREATE INDEX idx_favourites_user ON favourites(user_id);
CREATE INDEX idx_favourites_show ON favourites(show_id);

-- ===================================
-- DISPLAY SUCCESS MESSAGE
-- ===================================
SELECT 'Database schema created successfully!' AS message;
