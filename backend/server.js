const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Routes
const applyRoutes = require('./routes/applyRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/apply', applyRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('CUSoC API is running');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Caught:", err);
  res.status(500).json({
    message: "Global Error",
    error: err.message || err
  });
});

// Start server for local development only
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
