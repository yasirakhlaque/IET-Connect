import rateLimit from 'express-rate-limit';

// Skip rate limiting in development environment
const skipRateLimitInDev = (req, res) => {
  return process.env.NODE_ENV === 'development' || 
         req.ip === '127.0.0.1' || 
         req.ip === '::1' ||
         req.hostname === 'localhost';
};

// General API rate limiter - generous for production
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Increased from 100 to 200 requests per 15 minutes
  message: 'Too many requests from this IP, please try again in a few minutes',
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipRateLimitInDev, // Skip in development
});

// Strict rate limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Increased from 5 to 10 attempts per 15 minutes
  message: 'Too many login attempts, please try again in 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
  skip: skipRateLimitInDev, // Skip in development
});

// Rate limiter for upload endpoint
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Increased from 10 to 20 uploads per hour
  message: 'Upload limit reached. You can upload up to 20 files per hour. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipRateLimitInDev, // Skip in development
});

// Rate limiter for download endpoint
export const downloadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Increased from 50 to 100 downloads per hour
  message: 'Download limit reached. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipRateLimitInDev, // Skip in development
});
