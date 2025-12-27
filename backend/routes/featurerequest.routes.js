import express from 'express';
const router = express.Router();
import {
    createFeatureRequest,
    getMyFeatureRequests
} from '../controllers/featurerequest.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

// Student routes - Authenticated users only
router.post('/', verifyToken, createFeatureRequest);
router.get('/my-requests', verifyToken, getMyFeatureRequests);

// Note: Admin endpoints (getAll, update, delete, stats) are handled by the separate admin backend
// Refer to ADMIN_FEATURE_REQUESTS.md for admin API implementation

export default router;
