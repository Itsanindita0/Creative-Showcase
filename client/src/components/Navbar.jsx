import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-pink-700 text-white px-6 py-4 flex items-center justify-between shadow w-full">
      
      <Link to="/" className="font-bold text-xl hover:text-pink-200 transition">
        Creative Showcase
      </Link>

        
      <div className="flex items-center space-x-6">
        <Link to="/" className="font-semibold hover:text-pink-200 transition">
          Home
        </Link>
        <Link to="/about" className="font-semibold hover:text-pink-200 transition">
          About
        </Link>

        {!token && (
          <>
            <Link
              to="/login"
              className="font-semibold hover:text-pink-200 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="font-semibold hover:text-pink-200 transition"
            >
              Signup
            </Link>
          </>
        )}

        {token && (
          <>
            <Link
              to="/dashboard"
              className="font-semibold hover:text-pink-200 transition"
            >
              My Uploads
            </Link>
            <button
              onClick={handleLogout}
              className="font-semibold hover:text-pink-200 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
