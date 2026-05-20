import { useEffect, useState } from "react";
import {
  getTasks,
  deleteTask,
  updateStatus,
  updateTask,
} from "../services/taskService";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to load tasks ❌");
    }
  };

  // DELETE TASK
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted 🗑️");
      loadTasks();
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  // UPDATE STATUS
  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus(id, status);
      toast.success("Status updated ✅");
      loadTasks();
    } catch (err) {
      toast.error("Status update failed ❌");
    }
  };

  // OPEN EDIT
  const handleEdit = (task) => {
    setEditingTask(task);
  };

  // SAVE UPDATE
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateTask(editingTask.id, editingTask);

      toast.success("Task updated ✏️");

      setEditingTask(null);
      loadTasks();
    } catch (err) {
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              All Tasks
            </h1>
          </div>

          {/* TASKS */}
          <div className="space-y-5">
            {tasks.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-700">
                  No Tasks Found
                </h2>
                <p className="text-gray-500 mt-2">
                  Create a task to get started 🚀
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white border border-gray-200 p-5 rounded-2xl shadow-md flex justify-between items-start hover:shadow-lg transition duration-300"
                >
                  {/* LEFT SIDE */}
                  <div className="w-full">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {task.title}
                    </h2>

                    <p className="text-gray-700 mt-2">
                      {task.description || "No description"}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4 text-sm">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                        Priority: {task.priority}
                      </span>

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        Due: {task.dueDate || "Not Set"}
                      </span>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                        Effort: {task.estimatedEffort || "N/A"}
                      </span>
                    </div>

                    <div className="mt-4">
                      <span className="font-semibold text-gray-800">
                        Status:
                      </span>

                      <span className="ml-2 text-indigo-600 font-bold">
                        {task.status}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT ACTIONS */}
                  <div className="flex flex-col gap-3 ml-5">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                      className="border border-gray-300 p-2 rounded-lg text-gray-800"
                    >
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">
                        IN PROGRESS
                      </option>
                      <option value="DONE">DONE</option>
                    </select>

                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* EDIT MODAL */}
          {editingTask && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

              <div className="bg-white rounded-2xl shadow-xl p-6 w-[450px]">

                <h2 className="text-2xl font-bold text-gray-900 mb-5">
                  Edit Task
                </h2>

                <input
                  className="border border-gray-300 text-gray-900 p-3 w-full mb-3 rounded-lg"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      title: e.target.value,
                    })
                  }
                />

                <textarea
                  className="border border-gray-300 text-gray-900 p-3 w-full mb-3 rounded-lg"
                  rows="4"
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                />

                <select
                  className="border border-gray-300 text-gray-900 p-3 w-full mb-3 rounded-lg"
                  value={editingTask.priority}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      priority: e.target.value,
                    })
                  }
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>

                <input
                  type="date"
                  className="border border-gray-300 text-gray-900 p-3 w-full mb-5 rounded-lg"
                  value={editingTask.dueDate || ""}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      dueDate: e.target.value,
                    })
                  }
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditingTask(null)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Tasks;