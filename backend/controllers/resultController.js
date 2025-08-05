import Exam from '../models/examModel.js';
import Result from '../models/resultModel.js';

export const submitExam = async (req, res) => {
  const { examId, answers } = req.body;

  try {
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    let correct = 0;
    let wrong = 0;
    const answerSheet = [];

    exam.questions.forEach((question, index) => {
      const submitted = answers.find(ans => ans.questionId === question._id.toString());
      const isCorrect = submitted && submitted.selectedOption === question.correctAnswer;

      if (isCorrect) correct++;
      else wrong++;

      answerSheet.push({
        questionId: question._id,
        selectedOption: submitted?.selectedOption ?? -1,
        isCorrect
      });
    });

    const total = exam.questions.length;
    const score = (correct / total) * 100;

    const result = await Result.create({
      user: req.user.id,
      exam: examId,
      totalQuestions: total,
      correctAnswers: correct,
      wrongAnswers: wrong,
      score,
      answers: answerSheet
    });

    res.status(201).json({
      message: "Exam submitted successfully",
      result
    });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting exam', error: err.message });
  }
};


export const getUserResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id }).populate('exam', 'title description');
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch results', error: err.message });
  }
};