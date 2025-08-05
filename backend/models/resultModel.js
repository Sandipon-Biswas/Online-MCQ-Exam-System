import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  totalQuestions: Number,
  correctAnswers: Number,
  wrongAnswers: Number,
  score: Number,
  answers: [
    {
      questionId: String,
      selectedOption: Number,
      isCorrect: Boolean
    }
  ]
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);
export default Result;
