const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware - Fix CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Notes Manager API is running!' });
});

// Database connection - Remove deprecated options
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('MongoDB connected successfully');
  console.log('Database:', mongoose.connection.db.databaseName);
})
.catch(err => {
  console.log('MongoDB connection error:', err.message);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});