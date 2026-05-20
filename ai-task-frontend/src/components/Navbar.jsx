import { Link, useNavigate } from "react-router-dom";
import { logout, getUsername } from "../utils/auth";
function Navbar() {
  const navigate = useNavigate();
  const username = getUsername();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 shadow-lg sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-white">
          AI Task Manager
        </h1>

        <div className="flex items-center gap-6">

          <span className="text-gray-300 text-sm">
            Welcome, {username || "User"}
          </span>

          <Link
            to="/home"
            className="text-white hover:text-blue-400 transition"
          >
            Home
          </Link>

          <Link
            to="/tasks"
            className="text-white hover:text-blue-400 transition"
          >
            Tasks
          </Link>

          <Link
            to="/create-task"
            className="text-white hover:text-blue-400 transition"
          >
            Create Task
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;