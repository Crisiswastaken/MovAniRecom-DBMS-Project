
# 📘 **PRD – Movie/Anime Recommendation Logger (Simplified)**

**Tech Stack:**
HTML + CSS + JS + MySQL (core project)
Optional: Gemini API for AI recommendations (simple API call)

**Goal:**
A lightweight web app where users can log the movies/anime they have watched, give ratings, and receive automated recommendations based on their watch history.

---

# 🔥 1. **Core Features (Very Simple)**

### **1. User Registration & Login**

* Register using: Name, Email, Password
* Simple login form
* No advanced auth needed

---

### **2. Add Shows (Movies/Anime) to Personal Watchlist**

Users can:

* View all available shows in database
* Add show → Watchlist
* Add rating (1–5 stars)
* Add short review (optional)

---

### **3. Browse Shows**

* Category filter (Action, Romance, Thriller, Anime, etc.)
* Search by name

---

### **4. View Watch History**

* All shows user has watched
* Display rating
* Display review
* Date watched

---

### **5. Auto AI Suggestions **

A button: **“Get Recommendations”**

* Sends user’s top genres + favourite ratings to Gemini
* Returns 5 new show suggestions
* Display list only (no storing needed)

> *This keeps Gemini integration extremely simple: one API call, one response.*

---

# 💡 2. **Non-Goals (To Keep It Simple)**

* No payment systems
* No third-party OAuth
* No complex UI frameworks
* No streaming links
* No real-time features

---

# 🗄️ 3. **Database Schema (VERY Clean – 5 Tables Only)**

### **1. users**

| Field        | Type                |
| ------------ | ------------------- |
| user_id (PK) | INT AUTO_INCREMENT  |
| name         | VARCHAR(100)        |
| email        | VARCHAR(100) UNIQUE |
| password     | VARCHAR(255)        |

---

### **2. shows**

| Field         | Type                    |
| ------------- | ----------------------- |
| show_id (PK)  | INT AUTO_INCREMENT      |
| title         | VARCHAR(150)            |
| description   | TEXT                    |
| genre_id (FK) | INT                     |
| release_year  | INT                     |
| image_url     | VARCHAR(255) (optional) |

---

### **3. genres**

| Field         | Type               |
| ------------- | ------------------ |
| genre_id (PK) | INT AUTO_INCREMENT |
| name          | VARCHAR(100)       |

---

### **4. watch_history**

| Field           | Type               |
| --------------- | ------------------ |
| history_id (PK) | INT AUTO_INCREMENT |
| user_id (FK)    | INT                |
| show_id (FK)    | INT                |
| rating          | INT (1–5)          |
| review          | TEXT               |
| watched_on      | DATE               |

---

### **5. favourites (optional small table)**

| Field        | Type               |
| ------------ | ------------------ |
| fav_id (PK)  | INT AUTO_INCREMENT |
| user_id (FK) | INT                |
| show_id (FK) | INT                |

---

# 📄 4. **User Flows (Minimal)**

### **1. Onboarding**

User visits site → sees login → registers → redirected to dashboard.

---

### **2. Dashboard**

Contains:

* Search bar
* Genre filter
* Recommended button
* List of shows
* Add/Remove favourite button

---

### **3. Add to Watch History**

User clicks a show → sees detail page:

* Title
* Description
* Genre
* Rating dropdown
* Review box
* “Add to Watch History” button

---

### **4. View “My Watchlist”**

User can:

* Edit rating
* Edit review
* Delete entry

---

### **5. AI Recommendations**

Button: “Generate Recommendations”

System collects:

* User’s top genre (max frequency in watch_history)
* Average rating user gives to shows
* Some titles user rated highest

Sends a prompt to Gemini like:

```
User likes Action, Thriller. 
They rated "Demon Slayer" 5, "Attack on Titan" 5, "Inception" 4.

Suggest 5 similar movies/anime (short list).
```

Gemini returns JSON → displayed in UI.

---

# 🎨 5. UI Structure (Very Clean & Small)

### Pages (4 total)

1. **Login/Register**
2. **Dashboard (browse shows)**
3. **Show Details + Add Rating**
4. **My Watchlist**

No unnecessary pages or complexity.

# 6. Design Theme:
Dark Minimalist User Friendly simple UI with extremely minimalist components.
---
