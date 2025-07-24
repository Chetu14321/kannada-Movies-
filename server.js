// server.js
const express = require('express');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const connectdb = require('./db/dbconnect');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

// CORS configuration
const allowedOrigins = [
  'http://localhost:8081',              // React Native
  'http://localhost:3000',              // Web dev
  'https://kannada-movies.onrender.com' // Production
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Error handler for CORS
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS policy disallows this origin' });
  }
  next(err);
});

// Static file serving (React frontend)
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Public folder for file uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cookieParser(SECRET_KEY));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic root route
app.get("/", (req, res) => {
  console.log("Welcome to API");
  res.send("Welcome to Kannada Movies API");
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Catch-all for API routes that don't exist


// Serve React SPA on all non-API routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
});

// Start server
app.listen(PORT, () => {
  connectdb();
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
