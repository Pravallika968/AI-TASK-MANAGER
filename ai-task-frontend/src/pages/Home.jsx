import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../services/taskService";
import Navbar from "../components/Navbar";

function Home() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  };

  // TASK COUNTS
  const todoCount = tasks.filter(
    (t) => t.status === "TODO"
  ).length;

  const inProgressCount = tasks.filter(
    (t) => t.status === "IN_PROGRESS"
  ).length;

  const doneCount = tasks.filter(
    (t) => t.status === "DONE"
  ).length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">

        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-8">

            <h1 className="text-4xl font-bold text-gray-900">
              Welcome, {username || "User"} 👋
            </h1>

            <p className="text-gray-600 mt-2 text-lg">
              Manage your work smarter with AI
            </p>

          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* TODO */}
            <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-blue-500 hover:shadow-xl transition">

              <h2 className="text-lg font-semibold text-gray-600">
                TODO Tasks
              </h2>

              <p className="text-5xl font-bold text-blue-600 mt-3">
                {todoCount}
              </p>

            </div>

            {/* IN PROGRESS */}
            <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-yellow-500 hover:shadow-xl transition">

              <h2 className="text-lg font-semibold text-gray-600">
                In Progress
              </h2>

              <p className="text-5xl font-bold text-yellow-600 mt-3">
                {inProgressCount}
              </p>

            </div>

            {/* DONE */}
            <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-green-500 hover:shadow-xl transition">

              <h2 className="text-lg font-semibold text-gray-600">
                Completed Tasks
              </h2>

              <p className="text-5xl font-bold text-green-600 mt-3">
                {doneCount}
              </p>

            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">

            <button
              onClick={() =>
                navigate("/create-task")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition shadow"
            >
              + Create Task
            </button>

            <button
              onClick={() =>
                navigate("/tasks")
              }
              className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl text-lg font-medium transition shadow"
            >
              View All Tasks
            </button>

          </div>

          {/* TOTAL TASKS SECTION */}
          <div className="bg-white mt-10 p-6 rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold text-gray-900">
              Total Tasks
            </h2>

            <p className="text-5xl font-bold text-indigo-600 mt-3">
              {tasks.length}
            </p>

          </div>

        </div>

      </div>
    </>
  );
}

export default Home;