import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ExamDetails from './pages/ExamDetails';
import ResultHistory from './pages/ResultHistory';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/exams/:id" element={<ProtectedRoute><ExamDetails /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><ResultHistory /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
