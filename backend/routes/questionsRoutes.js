import express from 'express';
import { getQuestions, testSubmit } from "../controller/questionsController.js";

const router = express.Router();

router.get('/questions', getQuestions);

router.post('/submit',testSubmit);

export default router;