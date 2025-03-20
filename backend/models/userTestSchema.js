import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    answers: [{ questionId: mongoose.Schema.Types.ObjectId, selectedAnswer: String }],
    score: {
        type: Number,
    }
}, { timestamps: true });
const Test = mongoose.model('Test', TestSchema);

export default Test;