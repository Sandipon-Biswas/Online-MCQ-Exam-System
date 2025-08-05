import Exam from '../models/examModel.js';

// 🔐 Only admin creates exam
export const createExam = async (req, res) => {
    const { title, description, questions } = req.body;

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Only admin can create exams' });
    }

    try {
        const newExam = await Exam.create({
            title,
            description,
            questions,
            createdBy: req.user.id
        });

        res.status(201).json({ message: 'Exam created successfully', exam: newExam });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create exam', error: err.message });
    }
};

// ✅ Show all exams to users
export const getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find().select('title description');
        res.status(200).json(exams);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch exams', error: err.message });
    }
};

// ✅ Get exam details by ID (for exam taking)
export const getExamById = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });
        res.status(200).json(exam);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching exam', error: err.message });
    }
};
