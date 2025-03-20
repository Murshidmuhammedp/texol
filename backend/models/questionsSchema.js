import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: [String]
    },
    correctAnswer: {
        type: String,
        required: true
    }
});
const Questions = mongoose.model('Question', QuestionSchema);

export default Questions;