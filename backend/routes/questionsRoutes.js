import express from 'express';
import { addQuestion, getQuestions } from "../controller/questionsController.js";
import verifyToken from '../middleware/jwtValidation.js';

const router = express.Router();

router.get('/questions', verifyToken, getQuestions);

router.post('/questions', addQuestion);

// router.post('/submit', testSubmit);

export default router;