import express from 'express';
import { signup, login, sendResetCode, resetPassword, updateProfile, totalUsers, } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { authLimiter, generalLimiter } from '../middlewares/rateLimit.middleware.js';
import { 
  validate,
  signupSchema,
  loginSchema,
  sendResetCodeSchema,
  resetPasswordSchema,
  updateProfileSchema
} from '../middlewares/zod-validation.middleware.js';

const router = express.Router();

// Apply strict rate limiting to auth endpoints
router.post('/signup', authLimiter, validate(signupSchema), signup);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/send-reset-code', authLimiter, validate(sendResetCodeSchema), sendResetCode);
router.post('/forgot-password', authLimiter, validate(sendResetCodeSchema), sendResetCode); // Alias for send-reset-code
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), resetPassword);
router.put('/profile', verifyToken, validate(updateProfileSchema), updateProfile);
router.get('/total-users', generalLimiter, totalUsers);

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: 'Profile information', userId: req.userId });
});

export default router;
