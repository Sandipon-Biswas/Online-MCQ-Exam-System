import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const Home = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await API.get('/exams');
        setExams(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch exams:', err);
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading exams...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Available Exams</h1>
      <div className="space-y-4">
        {exams.map((exam) => (
          <div key={exam._id} className="border p-4 rounded shadow-sm hover:shadow-md">
            <h2 className="text-xl font-semibold">{exam.title}</h2>
            <p className="text-gray-600">{exam.description}</p>
            <Link
              to={`/exams/${exam._id}`}
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Take Exam
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
