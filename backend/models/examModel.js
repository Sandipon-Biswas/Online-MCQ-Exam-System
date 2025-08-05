import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true } // index of correct option
});

const examSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    questions: [questionSchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Exam = mongoose.model('Exam', examSchema);
export default Exam;
