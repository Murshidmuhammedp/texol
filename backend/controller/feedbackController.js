import Feedback from "../models/feedbackSchema.js";
import ApiError from "../utils/apiError.js";

export const userFeedback = async (req, res, next) => {
    const {  score, rating, feedback } = req.body;
    try {
        if (!userId) {
            throw new ApiError(404, "Invalid input data. userId are required.");
        };
        const newFeedback = new Feedback({
            userId,
            score,
            rating,
            feedback
        });

        await newFeedback.save();
        return res.status(201).json({ message: 'Feedback submitted' });
    } catch (err) {
        next(err)
    }; 
};