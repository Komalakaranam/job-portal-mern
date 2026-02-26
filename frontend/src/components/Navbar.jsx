import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          HireSphere
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Jobs</Link>
          <Link to="/" className="hover:text-blue-600">Companies</Link>
          <Link to="/" className="hover:text-blue-600">Services</Link>
        </div>
        
        {/* RIGHT SIDE */}
        {!user ? (
          <div className="flex gap-4">
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-2 rounded-md"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            {user.role === "recruiter" && (
              <Link to="/recruiter/dashboard">Recruiter Dashboard</Link>
            )}
            {user.role === "applicant" && (
              <Link to="/applicant/dashboard">Applicant Dashboard</Link>
            )}

            <span className="font-medium text-gray-700">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
