// src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const linkRoutes = require('./routes/linkRoutes');
const { redirectLink } = require('./controllers/linkController');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🔗 Tiny Link Backend is starting...',process.env.PORT,process.env.DATABASE_URL);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).json({ 
    ok: true, 
    version: '1.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use(linkRoutes);

// Redirect route (must be last to avoid conflicts)
app.get('/:code', redirectLink);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
