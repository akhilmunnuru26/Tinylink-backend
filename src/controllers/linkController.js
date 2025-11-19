// src/controllers/linkController.js
const pool = require('../config/database');
const { validateUrl, generateShortCode } = require('../utils/helpers');

// CREATE: Add new short link
const createLink = async (req, res, next) => {
  try {
    const { target_url, custom_code } = req.body;

    // Validate target URL
    if (!validateUrl(target_url)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Generate or use custom code
    const code = custom_code || generateShortCode();

    // Validate code format (6-8 alphanumeric characters)
    if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
      return res.status(400).json({ 
        error: 'Code must be 6-8 alphanumeric characters' 
      });
    }

    // Insert into database
    const result = await pool.query(
      'INSERT INTO links (code, target_url) VALUES ($1, $2) RETURNING *',
      [code, target_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    // Handle duplicate code error
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Code already exists' });
    }
    next(error);
  }
};

// READ: Get all links
const getAllLinks = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM links ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// READ: Get single link stats
const getLinkStats = async (req, res, next) => {
  try {
    const { code } = req.params;

    const result = await pool.query(
      'SELECT * FROM links WHERE code = $1',
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// REDIRECT: Redirect to target URL and increment clicks
const redirectLink = async (req, res, next) => {
  try {
    const { code } = req.params;

    // Update clicks and last_clicked timestamp
    const result = await pool.query(
      `UPDATE links 
       SET clicks = clicks + 1, last_clicked = NOW() 
       WHERE code = $1 
       RETURNING target_url`,
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Link not found');
    }

    // Perform 302 redirect
    res.redirect(302, result.rows[0].target_url);
  } catch (error) {
    next(error);
  }
};

// DELETE: Remove link
const deleteLink = async (req, res, next) => {
  try {
    const { code } = req.params;

    const result = await pool.query(
      'DELETE FROM links WHERE code = $1 RETURNING *',
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLink,
  getAllLinks,
  getLinkStats,
  redirectLink,
  deleteLink,
};
