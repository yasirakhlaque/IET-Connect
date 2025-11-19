import express from "express";
import corsMiddleware from "./middlewares/cors.middleware.js";
import authRoutes from './routes/auth.routes.js';
import questionPaperRoutes from './routes/questionpaper.routes.js';
import subjectRoutes from './routes/subject.routes.js';
import { generalLimiter } from './middlewares/rateLimit.middleware.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(express.json());
app.use(corsMiddleware);

// Apply general rate limiting to all API routes
app.use('/api/', generalLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/questionpapers', questionPaperRoutes);
app.use('/api/subjects', subjectRoutes);

export default app;