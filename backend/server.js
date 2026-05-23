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
  origin: true, // Allow all origins for seamless deployment
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const applyRoutes = require('./routes/applyRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/apply', applyRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('CUSoC API is running');
});

// Start server only in non-serverless environments (e.g. local dev)
// Vercel handles listening automatically via the exported app
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Caught:", err);
  res.status(500).json({
    message: "Global Error",
    error: err.message || err
  });
});

module.exports = app;

// Disable Vercel's default body parser to allow Multer to process multipart/form-data
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
