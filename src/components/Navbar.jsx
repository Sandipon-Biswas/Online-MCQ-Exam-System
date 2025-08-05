import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../auth';

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">📝 Online Exam</Link>
      <div className="space-x-4">
        
        {user ? (
          <>
            <span>{user.name}</span>
            <Link to="/results" className="hover:underline">My Results</Link>
           
            {user?.role === 'admin' && (
  <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
)}
 <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>

          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
