import express from 'express';
import { userFeedback } from "../controller/feedbackController.js";
import verifyToken from '../middleware/jwtValidation.js';

const router = express.Router();

router.post('/submit', verifyToken, userFeedback); 

export default router;