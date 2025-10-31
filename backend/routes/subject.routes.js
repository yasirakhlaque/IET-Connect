import express from 'express';
import { getAllSubjects, getSubjectById, } from '../controllers/subject.controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);

export default router;
