// Watchlist Page JavaScript
// Displays user's watch history with edit/delete functionality

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

// Load watch history
async function loadWatchHistory() {
    try {
        document.getElementById('loadingMessage').style.display = 'block';
        document.getElementById('noHistoryMessage').style.display = 'none';
        
        const response = await fetch(`${API_BASE_URL}/watch-history?userId=${user.userId}`);
        const watchHistory = await response.json();
        
        displayWatchHistory(watchHistory);
        
    } catch (error) {
        console.error('Error loading watch history:', error);
        document.getElementById('loadingMessage').textContent = 'Error loading watch history';
    }
}

// Display watch history
function displayWatchHistory(history) {
    const watchHistoryList = document.getElementById('watchHistoryList');
    const loadingMessage = document.getElementById('loadingMessage');
    const noHistoryMessage = document.getElementById('noHistoryMessage');
    
    loadingMessage.style.display = 'none';
    
    if (history.length === 0) {
        watchHistoryList.innerHTML = '';
        noHistoryMessage.style.display = 'block';
        return;
    }
    
    noHistoryMessage.style.display = 'none';
    
    watchHistoryList.innerHTML = history.map(item => {
        const stars = '⭐'.repeat(item.rating);
        const watchedDate = new Date(item.watched_on).toLocaleDateString();
        
        return `
            <div class="watchlist-item">
                <img src="${item.image_url || 'https://via.placeholder.com/150x200?text=No+Image'}" 
                     alt="${item.title}" 
                     class="watchlist-image">
                
                <div class="watchlist-info">
                    <h3>${item.title}</h3>
                    <p class="watchlist-meta">${item.genre_name || 'Unknown'} • Watched on ${watchedDate}</p>
                    <div class="watchlist-rating">${stars} (${item.rating}/5)</div>
                    <p class="watchlist-review">${item.review || 'No review'}</p>
                </div>
                
                <div class="watchlist-actions">
                    <button class="btn btn-secondary" onclick="editEntry(${item.history_id}, ${item.rating}, '${escapeQuotes(item.review || '')}')">
                        Edit
                    </button>
                    <button class="btn btn-secondary" onclick="deleteEntry(${item.history_id})">
                        Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Helper function to escape quotes
function escapeQuotes(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

// Edit entry
function editEntry(historyId, rating, review) {
    const modal = document.getElementById('editModal');
    document.getElementById('editHistoryId').value = historyId;
    document.getElementById('editRating').value = rating;
    document.getElementById('editReview').value = review.replace(/\\'/g, "'");
    modal.classList.add('show');
}

// Delete entry
async function deleteEntry(historyId) {
    if (!confirm('Are you sure you want to delete this entry?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/watch-history/${historyId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete entry');
        }
        
        // Reload watch history
        loadWatchHistory();
        
    } catch (error) {
        console.error('Error deleting entry:', error);
        alert('Failed to delete entry');
    }
}

// Handle edit form submission
document.getElementById('editForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const historyId = document.getElementById('editHistoryId').value;
    const rating = document.getElementById('editRating').value;
    const review = document.getElementById('editReview').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/watch-history/${historyId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                rating: parseInt(rating),
                review: review
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to update entry');
        }
        
        // Close modal and reload
        document.getElementById('editModal').classList.remove('show');
        loadWatchHistory();
        
    } catch (error) {
        console.error('Error updating entry:', error);
        alert('Failed to update entry');
    }
});

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('editModal').classList.remove('show');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('editModal');
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Initialize page
loadWatchHistory();
