import express from 'express';
import { addQuestion, getQuestions, testSubmit } from "../controller/questionsController.js";

const router = express.Router();

router.get('/questions', getQuestions);

router.post('/questions', addQuestion);

router.post('/submit', testSubmit);

export default router;