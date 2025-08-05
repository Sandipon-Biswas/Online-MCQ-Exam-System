import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

const ExamDetails = () => {
  const { id } = useParams();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await API.get(`/exams/${id}`);
        setExam(res.data);
      } catch (err) {
        console.error('Failed to load exam', err);
      }
    };
    fetchExam();
  }, [id]);

  const handleOptionSelect = (qId, index) => {
    setAnswers({ ...answers, [qId]: index });
  };

  const handleSubmit = async () => {
    if (submitted) return;

    const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption
    }));

    try {
      const res = await API.post('/results/submit', {
        examId: id,
        answers: formattedAnswers
      });
      setResult(res.data.result);
      setSubmitted(true);
    } catch (err) {
      console.error('Submit failed', err);
    }
  };

  if (!exam) return <p className="text-center mt-10">Loading exam...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      <p className="text-gray-700 mb-6">{exam.description}</p>

      {exam.questions.map((q, idx) => (
        <div key={q._id} className="mb-6 border-b pb-4">
          <h3 className="font-semibold">{idx + 1}. {q.questionText}</h3>
          <div className="mt-2 space-y-2">
            {q.options.map((opt, i) => (
              <label key={i} className="block">
                <input
                  type="radio"
                  name={`question-${q._id}`}
                  value={i}
                  onChange={() => handleOptionSelect(q._id, i)}
                  disabled={submitted}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Submit Exam
        </button>
      ) : (
        <div className="mt-6 bg-blue-100 border border-blue-400 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Your Result</h2>
          <p><strong>Score:</strong> {result.score}%</p>
          <p><strong>Correct:</strong> {result.correctAnswers}</p>
          <p><strong>Wrong:</strong> {result.wrongAnswers}</p>
        </div>
      )}
    </div>
  );
};

export default ExamDetails;
