const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

// GET /api/user/profile - Get user profile (Protected)
router.get('/profile', verifyToken, getProfile);

// PUT /api/user/profile - Update user profile (Protected)
router.put('/profile', verifyToken, updateProfile);

module.exports = router;
