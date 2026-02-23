# 🏥 Medical Appointment Management System

A beautiful, full-stack MERN application for managing medical appointments with role-based access control.

## ✨ Features

- 🔐 User authentication (Register/Login)
- 👥 Role-based access (Patient/Doctor)
- 📅 Patients can book and view appointments
- ✅ Doctors can view and approve/reject appointments
- 🎨 Modern, beautiful UI with animations
- 🏗️ Proper MVC architecture

## 🛠️ Tech Stack

- **Frontend**: React
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **Styling**: Custom CSS with gradients and animations

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher) installed
- npm or yarn package manager
- MongoDB Atlas account (already configured)

## 🚀 Installation & Setup

### Step 1: Clone or Download the Project

If you haven't already, make sure you're in the project directory:
```bash
cd C:\Users\workh\OneDrive\Desktop\mini_proj
```

### Step 2: Install Backend Dependencies

```bash
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- express-validator

### Step 3: Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- react-scripts

### Step 4: Environment Variables

The `.env` file is already configured with your MongoDB connection:
```
PORT=5000
MONGODB_URI=mongodb+srv://workharsh99_db_user:JVN8hvVgunPKraxD@doctor-appointment-syst.pn4utqz.mongodb.net/?appName=doctor-appointment-system
JWT_SECRET=medical_appointment_jwt_secret_key_2024
NODE_ENV=development
```

## ▶️ Running the Application

### Option 1: Run Backend and Frontend Separately (Recommended)

**Terminal 1 - Backend Server:**
```bash
npm run dev
```
or
```bash
node server.js
```

You should see:
```
✓ MongoDB connected successfully
✓ Server running on port 5000
✓ Backend URL: http://localhost:5000
```

**Terminal 2 - Frontend Server:**
```bash
cd client
npm start
```

The React app will open automatically at `http://localhost:3000`

### Option 2: Run Both Servers Concurrently

From the root directory:
```bash
npm run dev:full
```

## 🌐 Access the Application

Once both servers are running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 👤 How to Use

### For Patients:

1. **Register** as a Patient
   - Go to http://localhost:3000/register
   - Fill in your details
   - Select "Patient" role
   - Click "Register Now"

2. **Login**
   - Use your email and password
   - You'll be redirected to Patient Dashboard

3. **Book Appointment**
   - Click "Book New Appointment"
   - Select Department
   - Choose a Doctor from dropdown
   - Pick Date and Time Slot
   - Submit

4. **View Appointments**
   - See all your appointments with status (Pending/Approved/Rejected)

### For Doctors:

1. **Register** as a Doctor
   - Go to http://localhost:3000/register
   - Fill in your details
   - Select "Doctor" role
   - Click "Register Now"

2. **Login**
   - Use your email and password
   - You'll be redirected to Doctor Dashboard

3. **Manage Appointments**
   - View all appointment requests
   - Use checkbox to filter only your appointments
   - Approve or Reject pending appointments

## 📁 Project Structure

```
mini_proj/
├── controllers/              # Request handlers
│   ├── authController.js
│   └── appointmentController.js
├── models/                   # Database schemas
│   ├── User.js
│   └── Appointment.js
├── routes/                   # API routes
│   ├── authRoutes.js
│   └── appointmentRoutes.js
├── middleware/               # Auth middleware
│   └── auth.js
├── client/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── PatientDashboard.js
│   │   │   ├── DoctorDashboard.js
│   │   │   └── PrivateRoute.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── .env                      # Environment variables
├── server.js                 # Entry point
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/doctors` - Get all doctors

### Appointments
- `POST /api/appointments` - Book appointment (Patient only)
- `GET /api/appointments` - Get appointments (Patient & Doctor)
- `PUT /api/appointments/:id` - Update appointment status (Doctor only)

## 🐛 Troubleshooting

### Backend won't start:
- Make sure port 5000 is not in use
- Check if MongoDB connection string is correct
- Verify all dependencies are installed: `npm install`

### Frontend won't start:
- Make sure port 3000 is not in use
- Clear node_modules and reinstall: `cd client && rm -rf node_modules && npm install`

### "Cannot connect to server" error:
- Ensure backend is running on port 5000
- Check if `.env` file exists in root directory
- Verify MongoDB Atlas IP whitelist includes your IP

### Database connection error:
- Check internet connection
- Verify MongoDB Atlas credentials
- Make sure your IP is whitelisted in MongoDB Atlas

## 🎨 UI Features

- Modern gradient backgrounds
- Glass morphism effects
- Smooth animations
- Responsive design
- Interactive hover effects
- Beautiful status badges
- Professional table styling

## 📝 Sample Test Data

**Test Patient:**
- Email: patient@test.com
- Password: 123456
- Role: Patient

**Test Doctor:**
- Email: doctor@test.com
- Password: 123456
- Role: Doctor

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Protected routes
- Input validation

## 📞 Support

If you encounter any issues:
1. Check if both servers are running
2. Verify MongoDB connection
3. Clear browser cache
4. Check console for errors

## 🎯 Future Enhancements

- Email notifications
- Appointment reminders
- Doctor availability calendar
- Patient medical history
- Prescription management
- Payment integration

---

Made with ❤️ using MERN Stack
