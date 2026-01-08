import express from 'express';
import { getAllSubjects, getSubjectById, } from '../controllers/subject.controller.js';
import { validate, paginationSchema } from '../middlewares/zod-validation.middleware.js';

const router = express.Router();

// Public routes
router.get('/', validate(paginationSchema), getAllSubjects);
router.get('/:id', getSubjectById);

export default router;
