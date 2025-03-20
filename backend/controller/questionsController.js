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

export const addQuestion = async (req, res) => {
    try {
        const { questionText, options, correctAnswer } = req.body;

        // Validate request data
        if (!questionText || !correctAnswer || !Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ message: "Invalid input. Ensure all fields are correctly filled." });
        }

        // Create a new question
        const newQuestion = new Questions({
            questionText,
            options,
            correctAnswer
        });

        // Save to database
        await newQuestion.save();

        res.status(201).json({ message: "Question added successfully!", question: newQuestion });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
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