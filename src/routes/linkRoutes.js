// src/routes/linkRoutes.js
const express = require('express');
const router = express.Router();
const {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
} = require('../controllers/linkController');

// API Routes
router.post('/api/links', createLink);

module.exports = router;
