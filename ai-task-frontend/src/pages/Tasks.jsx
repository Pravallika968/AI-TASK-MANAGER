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

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted 🗑️");
      loadTasks();
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus(id, status);
      toast.success("Status updated ✅");
      loadTasks();
    } catch (err) {
      toast.error("Status update failed ❌");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

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

      {/* TASK PAGE */}
      <div className="min-h-screen bg-slate-100 p-8 text-gray-900">
        <div className="max-w-6xl mx-auto">

          <div className="mb-8">
            <h1 className="text-4xl font-bold">All Tasks</h1>
          </div>

          <div className="space-y-5">
            {tasks.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center shadow-md">
                No Tasks Found 🚀
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-5 rounded-2xl shadow-md flex justify-between"
                >
                  {/* LEFT */}
                  <div className="w-full">
                    <h2 className="text-2xl font-bold">{task.title}</h2>

                    <p className="text-gray-700 mt-2">
                      {task.description || "No description"}
                    </p>

                    <div className="flex gap-3 mt-4 text-sm">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        {task.priority}
                      </span>

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {task.dueDate || "No date"}
                      </span>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {task.estimatedEffort || "No effort"}
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col gap-3 ml-5">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                      className="border p-2 rounded-lg"
                    >
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="DONE">DONE</option>
                    </select>

                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          {/* MODAL BOX */}
          <div className="bg-white w-[550px] max-w-[95vw] rounded-2xl shadow-2xl overflow-hidden">

            {/* HEADER */}
            <div className="bg-blue-600 p-4">
              <h2 className="text-xl font-bold text-center text-white">
                ✏️ Edit Task
              </h2>
            </div>

            {/* FORM */}
            <div className="p-6 text-gray-900">

              {/* TITLE */}
              <label className="text-sm font-semibold text-gray-700">Title</label>
              <input
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
                className="border border-gray-300 text-gray-900 p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              {/* DESCRIPTION */}
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <textarea
                value={editingTask.description}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    description: e.target.value,
                  })
                }
                className="border border-gray-300 text-gray-900 p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              {/* PRIORITY */}
              <label className="text-sm font-semibold text-gray-700">Priority</label>
              <select
                value={editingTask.priority}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, priority: e.target.value })
                }
                className="border border-gray-300 text-gray-900 p-3 w-full mb-3 rounded-lg"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>

              {/* DUE DATE */}
              <label className="text-sm font-semibold text-gray-700">Due Date</label>
              <input
                type="date"
                value={editingTask.dueDate || ""}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, dueDate: e.target.value })
                }
                className="border border-gray-300 text-gray-900 p-3 w-full mb-3 rounded-lg"
              />

              {/* EFFORT */}
              <label className="text-sm font-semibold text-gray-700">
                Estimated Effort
              </label>
              <input
                type="text"
                value={editingTask.estimatedEffort || ""}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    estimatedEffort: e.target.value,
                  })
                }
                className="border border-gray-300 text-gray-900 p-3 w-full mb-5 rounded-lg"
              />

              {/* BUTTONS */}
              <div className="flex justify-end gap-3">

                <button
                  onClick={() => setEditingTask(null)}
                  className="bg-gray-400 px-4 py-2 rounded-lg text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="bg-green-600 px-4 py-2 rounded-lg text-white"
                >
                  {loading ? "Saving..." : "Save"}
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Tasks;