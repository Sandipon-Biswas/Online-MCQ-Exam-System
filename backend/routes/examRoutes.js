import express from 'express';
import { createExam, getAllExams, getExamById } from '../controllers/examController.js';
import authMiddleware, { adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

//  Protected
router.post('/', authMiddleware,adminMiddleware , createExam);

//  Public
router.get('/', getAllExams);
router.get('/:id', getExamById);

export default router;
