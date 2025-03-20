import Questions from "../models/questionsSchema.js";
import Test from "../models/userTestSchema.js";

export const getQuestions = async (req, res, next) => {
    try {
        const questions = await Questions.find();
        return res.status(200).json(questions);
    } catch (err) {
        next(err)
    }
};

export const testSubmit = async (req, res, next) => {
    const { userId, answers } = req.body;
    try {
        let score = 0;
        for (const answer of answers) {
            const question = await Questions.findById(answer.questionId);
            if (question.correctAnswer === answer.selectedAnswer) {
                score += 5;
            }
        }
        const test = new Test({
            userId,
            answers,
            score
        });
        await test.save();

        return res.status(201).json({ message: 'Test submitted', score });
    } catch (err) {
        next(err)
    }
};