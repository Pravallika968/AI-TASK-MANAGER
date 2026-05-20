import { useNavigate } from "react-router-dom";
import bgImage from "../assets/AI.jpeg";

function Landing() {
  const navigate = useNavigate();

  return (
   <div
  className="h-screen flex flex-col items-center justify-center text-center bg-center relative"
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "100% 100%",
  }}
>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 px-4">

        <h1 className="text-5xl font-extrabold text-white mb-3">
          AI Task Manager
        </h1>

        <p className="text-gray-200 mb-8 text-lg">
          Manage your tasks smartly with AI assistance
        </p>

        <div className="flex gap-4 justify-center">

          <button
            onClick={() => navigate("/register")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
          >
            Create Account
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg transition"
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
}

export default Landing;