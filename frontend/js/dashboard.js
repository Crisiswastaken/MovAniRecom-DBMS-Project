// Dashboard Page JavaScript
// Handles show browsing, filtering, and AI recommendations

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

// State
let allShows = [];
let allGenres = [];

// Load genres for filter
async function loadGenres() {
    try {
        const response = await fetch(`${API_BASE_URL}/genres`);
        allGenres = await response.json();
        
        const genreFilter = document.getElementById('genreFilter');
        allGenres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.genre_id;
            option.textContent = genre.name;
            genreFilter.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading genres:', error);
    }
}

// Load all shows
async function loadShows(genreId = '', searchTerm = '') {
    try {
        document.getElementById('loadingMessage').style.display = 'block';
        document.getElementById('noShowsMessage').style.display = 'none';
        
        let url = `${API_BASE_URL}/shows?`;
        if (genreId) url += `genre=${genreId}&`;
        if (searchTerm) url += `search=${searchTerm}`;
        
        const response = await fetch(url);
        allShows = await response.json();
        
        displayShows(allShows);
        
    } catch (error) {
        console.error('Error loading shows:', error);
        document.getElementById('loadingMessage').textContent = 'Error loading shows';
    }
}

// Display shows in grid
function displayShows(shows) {
    const showsGrid = document.getElementById('showsGrid');
    const loadingMessage = document.getElementById('loadingMessage');
    const noShowsMessage = document.getElementById('noShowsMessage');
    
    loadingMessage.style.display = 'none';
    
    if (shows.length === 0) {
        showsGrid.innerHTML = '';
        noShowsMessage.style.display = 'block';
        return;
    }
    
    noShowsMessage.style.display = 'none';
    
    showsGrid.innerHTML = shows.map(show => `
        <div class="show-card" onclick="viewShow(${show.show_id})">
            <img src="${show.image_url || 'https://via.placeholder.com/250x350?text=No+Image'}" 
                 alt="${show.title}" 
                 class="show-card-image">
            <div class="show-card-content">
                <h3 class="show-card-title">${show.title}</h3>
                <p class="show-card-genre">${show.genre_name || 'Unknown'} • ${show.release_year || 'N/A'}</p>
                <p class="show-card-description">${show.description || 'No description available'}</p>
            </div>
        </div>
    `).join('');
}

// View show details
function viewShow(showId) {
    window.location.href = `showDetails.html?id=${showId}`;
}

// Filter by genre
document.getElementById('genreFilter').addEventListener('change', (e) => {
    const genreId = e.target.value;
    const searchTerm = document.getElementById('searchInput').value;
    loadShows(genreId, searchTerm);
});

// Search functionality
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value;
        const genreId = document.getElementById('genreFilter').value;
        loadShows(genreId, searchTerm);
    }, 300); // Debounce 300ms
});

// Get AI Recommendations
document.getElementById('getRecommendationsBtn').addEventListener('click', async () => {
    try {
        const modal = document.getElementById('recommendationsModal');
        const recommendationsList = document.getElementById('recommendationsList');
        
        recommendationsList.innerHTML = '<p class="loading">Generating recommendations...</p>';
        modal.classList.add('show');
        
        const response = await fetch(`${API_BASE_URL}/recommendations?userId=${user.userId}`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to get recommendations');
        }
        
        // Display recommendations
        recommendationsList.innerHTML = `
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                Based on ${data.basedOn.totalWatched} shows you've watched 
                (Top genres: ${data.basedOn.topGenres.join(', ')})
            </p>
            ${data.recommendations.map(rec => `
                <div class="recommendation-item">
                    <h3>${rec.title}</h3>
                    <p class="genre">${rec.genre}</p>
                    <p class="reason">${rec.reason}</p>
                </div>
            `).join('')}
        `;
        
    } catch (error) {
        console.error('Error getting recommendations:', error);
        document.getElementById('recommendationsList').innerHTML = 
            `<p class="error-message show">${error.message}</p>`;
    }
});

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('recommendationsModal').classList.remove('show');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('recommendationsModal');
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Initialize page
loadGenres();
loadShows();
