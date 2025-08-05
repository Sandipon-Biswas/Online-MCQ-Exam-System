import { useEffect, useState } from 'react';
import API from '../api';

const ResultHistory = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get('/results/mine');
        setResults(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching result history', err);
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading your results...</p>;

  if (results.length === 0) return <p className="text-center mt-10">You have not submitted any exam yet.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">My Exam Results</h1>
      <div className="space-y-4">
        {results.map((res) => (
          <div key={res._id} className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-semibold">{res.exam?.title || 'Untitled Exam'}</h2>
            <p><strong>Score:</strong> {res.score}%</p>
            <p><strong>Correct:</strong> {res.correctAnswers} | <strong>Wrong:</strong> {res.wrongAnswers}</p>
            <p className="text-sm text-gray-500">Submitted on: {new Date(res.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultHistory;
