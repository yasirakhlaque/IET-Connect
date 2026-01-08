import express from 'express';
import { uploadQuestionPaper, getQuestionPapers, getQuestionPaperById, getMyUploads, getMyDownloads, downloadQuestionPaper, viewQuestionPaper, upload } from '../controllers/questionpaper.controller.js';
import { verifyToken, optionalAuth } from '../middlewares/auth.middleware.js';
import { uploadLimiter, downloadLimiter } from '../middlewares/rateLimit.middleware.js';
import { validate, questionPaperUploadSchema, paginationSchema } from '../middlewares/zod-validation.middleware.js';

const router = express.Router();

router.post('/upload', verifyToken, uploadLimiter, upload.single('pdf'), validate(questionPaperUploadSchema), uploadQuestionPaper);
router.get('/', validate(paginationSchema), getQuestionPapers);
router.get('/my/uploads', verifyToken, validate(paginationSchema), getMyUploads);
router.get('/my/downloads', verifyToken, validate(paginationSchema), getMyDownloads);
router.get('/:id/view', optionalAuth, viewQuestionPaper);
router.get('/:id/download', optionalAuth, downloadLimiter, downloadQuestionPaper);
router.get('/:id', optionalAuth, getQuestionPaperById);

export default router;
