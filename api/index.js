const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

// Load env vars — try root .env first, then backend/.env as fallback
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config({ path: path.resolve(__dirname, '..', 'backend', '.env') });

const app = express();

// ─── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// ─── MongoDB Connection (cached for serverless) ─────────────
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cusoc_dev';
    const conn = await mongoose.connect(mongoURI, {
      bufferCommands: false,
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    throw error;
  }
};

// Connect before every request (uses cached connection in warm lambdas)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// ─── Routes ─────────────────────────────────────────────────
const applyRoutes = require('../backend/routes/applyRoutes');
const adminRoutes = require('../backend/routes/adminRoutes');

app.use('/api/apply', applyRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'CUSoC API is running ✅', timestamp: new Date().toISOString() });
});

// ─── Global Error Handler ───────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

// Export for Vercel serverless — NO app.listen()
module.exports = app;
