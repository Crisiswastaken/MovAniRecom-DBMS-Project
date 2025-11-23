# ⚠️ IMPORTANT - READ BEFORE RUNNING

## Quick Start Checklist

Before running the application, you MUST complete these steps:

### ✅ 1. Install Node.js Dependencies
```bash
cd backend
npm install
```

### ✅ 2. Create MySQL Database
Open MySQL and run:
```sql
source database/schema.sql
source database/sample_data.sql
```

### ✅ 3. Configure Environment Variables
Copy `.env.example` to `.env` in the backend folder:
```bash
cd backend
cp .env.example .env
```

Then edit `.env` with your actual values:
- MySQL password
- Gemini API key (get from https://makersuite.google.com/app/apikey)

### ✅ 4. Start the Server
```bash
cd backend
npm start
```

### ✅ 5. Open in Browser
Navigate to: http://localhost:3000

---

## Common Issues

**Database connection failed?**
- Check MySQL is running
- Verify credentials in `.env`

**Recommendations not working?**
- Add Gemini API key to `.env`
- Watch and rate at least one show first

**Port already in use?**
- Change PORT in `.env` to 3001 or another port

---

For detailed instructions, see README.md
