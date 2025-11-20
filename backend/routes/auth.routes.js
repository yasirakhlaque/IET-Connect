import express from 'express';
import { signup, login, sendResetCode, resetPassword, updateProfile, totalUsers, } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authLimiter, generalLimiter } from '../middlewares/rateLimit.middleware.js';

const router = express.Router();

// Apply strict rate limiting to auth endpoints
router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);
router.post('/forgot-password', authLimiter, sendResetCode);
router.post('/reset-password', authLimiter, resetPassword);
router.put('/profile', verifyToken, updateProfile);
router.get('/total-users', generalLimiter, totalUsers);

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Profile information', userId: req.userId });
});

export default router;
