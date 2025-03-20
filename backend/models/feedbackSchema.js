import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    score: {
        type: Number,
    },
    rating: {
        type: Number
    },
    feedback: {
        type: String,
    }
}, {
    timestamps: true
});
const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback;