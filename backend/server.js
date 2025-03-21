import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js'
import { errorHandler } from './middleware/errorHandler.js';
import feedbackRouter from './routes/feedbackRoutes.js';
import testRouter from './routes/questionsRoutes.js';


dotenv.config();
const app = express();

app.use(cors({
    origin: "*",
    // origin: 'https://texol.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/auth', userRouter);
app.use('/api/test', testRouter);
app.use('/api/feedback', feedbackRouter);

connectDB();

const PORT = process.env.PORT || 5000;

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});   