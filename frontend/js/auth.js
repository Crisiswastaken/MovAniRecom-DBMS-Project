// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Authentication Functions for Login & Register Pages

// Check if user is already logged in
if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
        window.location.href = 'dashboard.html';
    }
}

// Handle Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');
        
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }
            
            // Save user data to localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
            
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.classList.add('show');
        }
    });
}

// Handle Register Form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');
        
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }
            
            // Auto-login after registration
            const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const loginData = await loginResponse.json();
            localStorage.setItem('user', JSON.stringify(loginData.user));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
            
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.classList.add('show');
        }
    });
}

// Check Authentication Helper Function
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return user;
}

// Logout Function
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}
