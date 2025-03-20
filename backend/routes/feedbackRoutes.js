import express from 'express';
import { userFeedback } from "../controller/feedbackController.js";

const router = express.Router();

router.post('/submit', userFeedback);

export default router;