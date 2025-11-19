import express from 'express';
import { uploadQuestionPaper, getQuestionPapers, getQuestionPaperById, getMyUploads, downloadQuestionPaper, viewQuestionPaper, upload } from '../controllers/questionpaper.controller.js';
import { verifyToken, optionalAuth } from '../middlewares/auth.middleware.js';
import { uploadLimiter, downloadLimiter } from '../middlewares/rateLimit.middleware.js';

const router = express.Router();

router.post('/upload', verifyToken, uploadLimiter, upload.single('pdf'), uploadQuestionPaper);
router.get('/', getQuestionPapers);
router.get('/my/uploads', verifyToken, getMyUploads);
router.get('/:id/view', optionalAuth, viewQuestionPaper);
router.get('/:id/download', optionalAuth, downloadLimiter, downloadQuestionPaper);
router.get('/:id', optionalAuth, getQuestionPaperById);

export default router;
