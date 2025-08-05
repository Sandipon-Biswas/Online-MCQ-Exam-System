import express from 'express';
import { submitExam,getUserResults  } from '../controllers/resultController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/submit', authMiddleware, submitExam);
router.get('/mine', authMiddleware, getUserResults);
export default router;
