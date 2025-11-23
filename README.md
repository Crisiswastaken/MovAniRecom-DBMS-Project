# 🎬 Movie/Anime Recommendation Logger

A simple, dark-themed web application for logging movies and anime you've watched, rating them, and getting AI-powered recommendations using Google's Gemini API.

## 📋 Features

- ✅ User registration and login
- ✅ Browse movies and anime
- ✅ Add shows to watch history with ratings and reviews
- ✅ Manage favourites
- ✅ AI-powered recommendations based on watch history
- ✅ Dark minimalist UI

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js, Express
- **Database**: MySQL
- **AI**: Google Gemini API

## 📁 Project Structure

```
MovAniRecom-DBMS-Project/
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── routes/
│   │   ├── auth.js            # Login/Register routes
│   │   ├── users.js           # User CRUD
│   │   ├── shows.js           # Shows CRUD
│   │   ├── genres.js          # Genres CRUD
│   │   ├── watchHistory.js    # Watch history CRUD
│   │   ├── favourites.js      # Favourites CRUD
│   │   └── recommendations.js # AI recommendations
│   ├── services/
│   │   └── geminiService.js   # Gemini API integration
│   ├── server.js              # Main server file
│   ├── package.json
│   └── .env.example           # Environment variables template
├── frontend/
│   ├── css/
│   │   └── style.css          # All styles
│   ├── js/
│   │   ├── auth.js            # Login/Register logic
│   │   ├── dashboard.js       # Browse shows logic
│   │   ├── showDetails.js     # Show details & add to history
│   │   └── watchlist.js       # Watch history management
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── showDetails.html
│   └── watchlist.html
├── database/
│   ├── schema.sql             # Database schema
│   └── sample_data.sql        # Sample shows and genres
└── README.md
```

---

## 🚀 Setup Instructions

### **Step 1: Install Dependencies**

1. Make sure you have **Node.js** installed (v14 or higher)
   - Download from: https://nodejs.org/

2. Make sure you have **MySQL** installed and running
   - Download from: https://dev.mysql.com/downloads/mysql/

3. Navigate to the backend folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```

---

### **Step 2: Setup MySQL Database**

1. **Start MySQL** (make sure MySQL server is running)

2. **Open MySQL Command Line or MySQL Workbench**

3. **Run the schema creation script**:
   ```bash
   mysql -u root -p < ../database/schema.sql
   ```
   Or manually:
   - Open `database/schema.sql` in MySQL Workbench
   - Execute the entire script
   - This will create the database `movie_anime_logger` and all 5 tables

4. **Run the sample data script**:
   ```bash
   mysql -u root -p < ../database/sample_data.sql
   ```
   Or manually:
   - Open `database/sample_data.sql` in MySQL Workbench
   - Execute the entire script
   - This will insert 11 genres and 35 sample shows (movies and anime)

---

### **Step 3: Get Gemini API Key**

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Get API Key"**
4. Click **"Create API key in new project"**
5. Copy the API key (you'll need it in the next step)

> **Note**: Gemini API has a free tier. If you don't want AI recommendations, the app will still work for browsing and logging shows.

---

### **Step 4: Configure Environment Variables**

1. In the `backend` folder, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your actual values:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_actual_mysql_password
   DB_NAME=movie_anime_logger
   DB_PORT=3306

   # Server Configuration
   PORT=3000

   # Gemini API Configuration
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

   **Important**: Replace `your_actual_mysql_password` and `your_actual_gemini_api_key_here` with your real credentials!

---

### **Step 5: Run the Application**

1. **Start the backend server**:
   ```bash
   cd backend
   npm start
   ```

   You should see:
   ```
   ✅ Database connected successfully
   🚀 Server running on http://localhost:3000
   ```

2. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

3. **Register a new account** and start using the app!

---

## 🧪 Testing the Application

### **1. Register and Login**
- Navigate to `http://localhost:3000`
- Click "Register here"
- Create an account with name, email, and password
- You'll be auto-logged in and redirected to the dashboard

### **2. Browse Shows**
- View all available movies and anime
- Filter by genre using the dropdown
- Search by title using the search bar
- Click on any show to view details

### **3. Add to Watch History**
- Click on a show
- Select a rating (1-5 stars)
- Optionally write a review
- Select the date you watched it
- Click "Add to Watch History"

### **4. View Your Watchlist**
- Click "My Watchlist" in the navigation
- View all shows you've watched with ratings and reviews
- Edit ratings and reviews
- Delete entries

### **5. Get AI Recommendations**
- After adding at least one show to your watch history
- Click "Get AI Recommendations" button on the dashboard
- Wait for Gemini to generate 5 personalized recommendations
- Recommendations are based on your top genres and highest-rated shows

### **6. Manage Favourites**
- On any show details page
- Click "Add to Favourites" to save it
- Click again to remove from favourites

---

## 🔧 Troubleshooting

### **Database Connection Error**
- Make sure MySQL is running
- Check your database credentials in `.env`
- Verify the database `movie_anime_logger` exists

### **Gemini API Error**
- Verify your API key is correct in `.env`
- Check if you have API quota remaining
- Make sure you have watch history before requesting recommendations

### **Port Already in Use**
- Change the `PORT` value in `.env` to something else (e.g., 3001)
- Restart the server

### **Cannot Access Frontend**
- Make sure you're accessing `http://localhost:3000` (not file://)
- Clear browser cache
- Check browser console for JavaScript errors

---

## 📊 Database Schema

### **Tables:**

1. **users** - User accounts
2. **genres** - Movie/Anime categories
3. **shows** - Movies and anime information
4. **watch_history** - User's watched shows with ratings
5. **favourites** - User's favourite shows

### **Relationships:**

```
users (1) ←→ (M) watch_history
users (1) ←→ (M) favourites
shows (1) ←→ (M) watch_history
shows (1) ←→ (M) favourites
genres (1) ←→ (M) shows
```

---

## 🎯 API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### **Shows**
- `GET /api/shows` - Get all shows (with optional filters)
- `GET /api/shows/:id` - Get show by ID
- `POST /api/shows` - Create new show
- `PUT /api/shows/:id` - Update show
- `DELETE /api/shows/:id` - Delete show

### **Genres**
- `GET /api/genres` - Get all genres
- `GET /api/genres/:id` - Get genre by ID
- `POST /api/genres` - Create new genre

### **Watch History**
- `GET /api/watch-history?userId=X` - Get user's watch history
- `POST /api/watch-history` - Add to watch history
- `PUT /api/watch-history/:id` - Update watch history entry
- `DELETE /api/watch-history/:id` - Delete watch history entry

### **Favourites**
- `GET /api/favourites?userId=X` - Get user's favourites
- `GET /api/favourites/check?userId=X&showId=Y` - Check if favourite
- `POST /api/favourites` - Add to favourites
- `DELETE /api/favourites?userId=X&showId=Y` - Remove from favourites

### **Recommendations**
- `GET /api/recommendations?userId=X` - Get AI recommendations

---

## 🌟 Key Features Explained

### **AI Recommendations**
The system uses Google's Gemini API to analyze:
- Your top 3 most-watched genres
- Your highest-rated shows (4-5 stars)
- Your viewing patterns

It then generates 5 personalized recommendations with:
- Show title
- Genre
- Reason why you'd like it

### **Dark Minimalist UI**
- Clean, distraction-free interface
- Easy navigation
- Responsive design for mobile and desktop
- Minimal color palette focused on content

---

## 💡 Tips for Your Viva

1. **Explain the architecture**:
   - Frontend communicates with backend via REST API
   - Backend connects to MySQL database
   - Gemini API integration for AI recommendations

2. **Highlight the features**:
   - Full CRUD operations on all entities
   - User authentication with password hashing
   - AI-powered recommendations
   - Responsive design

3. **Discuss the database design**:
   - Normalized schema (no data redundancy)
   - Foreign key constraints for data integrity
   - Indexes for query optimization

4. **Show the code**:
   - Clean, readable code with comments
   - Separation of concerns (routes, services, config)
   - Error handling throughout

5. **Demo the app**:
   - Register → Browse → Add to history → Get recommendations
   - Show filtering and search
   - Show edit/delete functionality

---

## 📝 Notes

- All passwords are hashed using bcrypt before storing
- User sessions are managed using localStorage (for simplicity)
- The app uses vanilla JavaScript (no frameworks) as per requirements
- All code is commented for easy understanding

---

## 🤝 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all dependencies are installed
3. Check console logs for errors
4. Ensure database is properly set up

---

**Built with ❤️ for your DBMS Project**
