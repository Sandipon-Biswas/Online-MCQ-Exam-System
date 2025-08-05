import { useState } from 'react';
import API from '../api';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);
  const [success, setSuccess] = useState('');

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'questionText') {
      newQuestions[index].questionText = value;
    } else if (field.startsWith('option')) {
      const optIndex = parseInt(field.split('-')[1]);
      newQuestions[index].options[optIndex] = value;
    } else if (field === 'correctAnswer') {
      newQuestions[index].correctAnswer = parseInt(value);
    }
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/exams', { title, description, questions });
      setTitle('');
      setDescription('');
      setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]);
      setSuccess('Exam created successfully!');
    } catch (err) {
      console.error('Exam create failed', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {success && <p className="text-green-600 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Exam Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        {questions.map((q, index) => (
          <div key={index} className="border p-4 rounded bg-gray-50">
            <h3 className="font-semibold mb-2">Question {index + 1}</h3>
            <input
              type="text"
              placeholder="Question Text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
              className="w-full border px-2 py-1 mb-2"
              required
            />
            {q.options.map((opt, optIdx) => (
              <input
                key={optIdx}
                type="text"
                placeholder={`Option ${optIdx + 1}`}
                value={opt}
                onChange={(e) => handleQuestionChange(index, `option-${optIdx}`, e.target.value)}
                className="w-full border px-2 py-1 mb-1"
                required
              />
            ))}
            <label className="block mt-2">
              Correct Answer (0-3):
              <input
                type="number"
                min="0"
                max="3"
                value={q.correctAnswer}
                onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                className="border px-2 py-1 ml-2"
                required
              />
            </label>
          </div>
        ))}

        <button type="button" onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 rounded">
          + Add Question
        </button>
        <br />
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded mt-4">
          Create Exam
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
