import Feedback from "../models/feedbackSchema.js";

export const userFeedback = async (req, res, next) => {
    const { score, rating, feedback } = req.body;
    const userId = req.user
    try {
        if (!userId) {
            return res.status(404).json({ message: "UserId not found" });
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