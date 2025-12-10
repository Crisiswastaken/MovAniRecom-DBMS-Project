// Show Details Page JavaScript
// Handles displaying show details and adding to watch history

const API_BASE_URL = 'http://localhost:3000/api';

// Check authentication
const user = JSON.parse(localStorage.getItem('user') || 'null');
if (!user) {
    window.location.href = 'login.html';
}

// Display user name
document.getElementById('userName').textContent = user.name;

// Logout button
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});

// Get show ID from URL
const urlParams = new URLSearchParams(window.location.search);
const showId = urlParams.get('id');

if (!showId) {
    alert('No show selected');
    window.location.href = 'dashboard.html';
}

let currentShow = null;
let isFavourite = false;

// Load show details
async function loadShowDetails() {
    try {
        const response = await fetch(`${API_BASE_URL}/shows/${showId}`);
        currentShow = await response.json();
        
        // Update page content
        document.getElementById('showTitle').textContent = currentShow.title;
        document.getElementById('showGenre').textContent = currentShow.genre_name || 'Unknown';
        document.getElementById('showYear').textContent = currentShow.release_year || 'N/A';
        document.getElementById('showDescription').textContent = currentShow.description || 'No description available';
        
        // Use gradient placeholder instead of image
        const imgElement = document.getElementById('showImage');
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        ];
        const gradient = gradients[showId % gradients.length];
        imgElement.style.background = gradient;
        imgElement.removeAttribute('src');
        imgElement.alt = currentShow.title;
        
        // Set today's date as default
        document.getElementById('watchedOn').valueAsDate = new Date();
        
        // Check if already in favourites
        checkFavouriteStatus();
        
    } catch (error) {
        console.error('Error loading show details:', error);
        alert('Failed to load show details');
        window.location.href = 'dashboard.html';
    }
}

// Check favourite status
async function checkFavouriteStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/favourites/check?userId=${user.userId}&showId=${showId}`);
        const data = await response.json();
        isFavourite = data.isFavourite;
        updateFavouriteButton();
    } catch (error) {
        console.error('Error checking favourite status:', error);
    }
}

// Update favourite button
function updateFavouriteButton() {
    const btn = document.getElementById('favouriteBtn');
    const icon = document.getElementById('favIcon');
    
    if (isFavourite) {
        icon.textContent = '★';
        btn.innerHTML = '<span id="favIcon">★</span> Remove from Favourites';
    } else {
        icon.textContent = '☆';
        btn.innerHTML = '<span id="favIcon">☆</span> Add to Favourites';
    }
}

// Toggle favourite
document.getElementById('favouriteBtn').addEventListener('click', async () => {
    try {
        if (isFavourite) {
            // Remove from favourites
            await fetch(`${API_BASE_URL}/favourites?userId=${user.userId}&showId=${showId}`, {
                method: 'DELETE'
            });
            isFavourite = false;
        } else {
            // Add to favourites
            await fetch(`${API_BASE_URL}/favourites`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user.userId,
                    show_id: showId
                })
            });
            isFavourite = true;
        }
        updateFavouriteButton();
    } catch (error) {
        console.error('Error toggling favourite:', error);
        alert('Failed to update favourites');
    }
});

// Handle watch history form submission
document.getElementById('watchForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;
    const watchedOn = document.getElementById('watchedOn').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/watch-history`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: user.userId,
                show_id: showId,
                rating: parseInt(rating),
                review: review,
                watched_on: watchedOn
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to add to watch history');
        }
        
        alert('Added to watch history successfully!');
        window.location.href = 'watchlist.html';
        
    } catch (error) {
        console.error('Error adding to watch history:', error);
        alert(error.message);
    }
});

// Initialize page
loadShowDetails();
