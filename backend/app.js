import express from "express";
import compression from "compression";
import morgan from "morgan";
import corsMiddleware from "./middlewares/cors.middleware.js";
import authRoutes from './routes/auth.routes.js';
import questionPaperRoutes from './routes/questionpaper.routes.js';
import subjectRoutes from './routes/subject.routes.js';
import featureRequestRoutes from './routes/featurerequest.routes.js';
import { generalLimiter } from './middlewares/rateLimit.middleware.js';
import { 
  helmetConfig, 
  sanitizeData, 
  preventParameterPollution, 
  httpsRedirect,
  sanitizeErrors 
} from './middlewares/security.middleware.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

// HTTPS redirect in production
app.use(httpsRedirect);

// Security headers
app.use(helmetConfig);

// HTTP request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Detailed logs in development
} else {
  app.use(morgan('combined')); // Apache-style logs in production
}

// Enable gzip compression for all responses
app.use(compression({
    level: 6, // Compression level (0-9, 6 is default and balanced)
    threshold: 1024, // Only compress responses larger than 1KB
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

app.use(express.json({ limit: '10mb' }));
app.use(corsMiddleware);

// Data sanitization against NoSQL injection
app.use(sanitizeData);

// Prevent HTTP parameter pollution
app.use(preventParameterPollution);

// Apply general rate limiting to all API routes
app.use('/api/', generalLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/questionpapers', questionPaperRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/feature-requests', featureRequestRoutes);

// Global error handler (must be last)
app.use(sanitizeErrors);

export default app;