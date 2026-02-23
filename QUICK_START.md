# 🚀 Quick Start Guide

## Run the Project in 3 Simple Steps

### Step 1: Open Two Terminals

You need to run backend and frontend separately.

### Step 2: Start Backend Server

**Terminal 1:**
```bash
# Make sure you're in the project root directory
cd C:\Users\workh\OneDrive\Desktop\mini_proj

# Start the backend
npm run dev
```

**Expected Output:**
```
✓ MongoDB connected successfully
✓ Server running on port 5000
✓ Backend URL: http://localhost:5000
```

### Step 3: Start Frontend Server

**Terminal 2:**
```bash
# Navigate to client folder
cd C:\Users\workh\OneDrive\Desktop\mini_proj\client

# Start the frontend
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view client in the browser.
Local: http://localhost:3000
```

## ✅ That's It!

Your browser should automatically open to `http://localhost:3000`

## 🎯 First Time Setup?

If you haven't installed dependencies yet:

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd client
npm install
cd ..
```

## 🧪 Test the Application

1. **Register a Patient Account**
   - Go to http://localhost:3000/register
   - Name: John Doe
   - Email: john@test.com
   - Password: 123456
   - Role: Patient

2. **Register a Doctor Account**
   - Open incognito/private window
   - Go to http://localhost:3000/register
   - Name: Dr. Smith
   - Email: smith@test.com
   - Password: 123456
   - Role: Doctor

3. **Book an Appointment (as Patient)**
   - Login as john@test.com
   - Click "Book New Appointment"
   - Select department, doctor, date, time
   - Submit

4. **Approve Appointment (as Doctor)**
   - Login as smith@test.com (in another browser/incognito)
   - View pending appointments
   - Click "Approve"

## ❌ Troubleshooting

**Backend not starting?**
- Check if port 5000 is free
- Make sure `.env` file exists
- Run `npm install` again

**Frontend not starting?**
- Check if port 3000 is free
- Delete `node_modules` in client folder
- Run `npm install` again in client folder

**"Cannot connect to server" error?**
- Make sure backend is running (Terminal 1)
- Check backend shows "MongoDB connected successfully"

## 🛑 Stop the Servers

Press `Ctrl + C` in both terminals to stop the servers.

## 📱 Access URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Register: http://localhost:3000/register
- Login: http://localhost:3000/login
