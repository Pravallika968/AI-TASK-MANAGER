import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/taskService";
import { generateTaskAI } from "../services/aiService";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

function CreateTask() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [estimatedEffort, setEstimatedEffort] = useState("");

  const [loadingAI, setLoadingAI] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleGenerateAI = async () => {
    if (!title.trim()) {
      toast.warning("Enter task title first ⚠️");
      return;
    }

    try {
      setLoadingAI(true);

      const res = await generateTaskAI(title);
      const aiData = res.data;

      setDescription(aiData.description || "");
      setPriority(aiData.priority || "MEDIUM");
      setEstimatedEffort(aiData.estimatedEffort || "");

      toast.success("AI generated task details ✨");
    } catch (err) {
      toast.error("🤖 AI is temporarily unavailable. Please try again in a moment");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSave = async () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !priority ||
      !dueDate ||
      !estimatedEffort.trim()
    ) {
      toast.warning("Please fill all fields ⚠️");
      return;
    }

    try {
      setSaving(true);

      await createTask({
        title,
        description,
        priority,
        dueDate,
        estimatedEffort,
        status: "TODO",
      });

      toast.success("Task created successfully 🚀");
      navigate("/tasks");
    } catch (err) {
      toast.error("Error saving task ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10 px-4">

        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">

          {/* HEADER (ONLY THIS IS CHANGED) */}
          <div className="bg-blue-600 p-5 rounded-2xl mb-6">
            <h1 className="text-3xl font-bold text-white text-center">
              Create Task
            </h1>

            <p className="text-blue-100 mt-1 text-center">
              Create manually or generate using AI
            </p>
          </div>

          {/* FORM */}
          <div className="px-8 pb-8">

            {/* TITLE */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Task Title
              </label>

              <input
                required
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* AI BUTTON */}
            <button
              onClick={handleGenerateAI}
              disabled={loadingAI}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-medium mb-6 transition disabled:opacity-50"
            >
              {loadingAI ? "Generating..." : "✨ Generate with AI"}
            </button>

            {/* DESCRIPTION */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>

              <textarea
                required
                rows="4"
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* PRIORITY */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Priority
              </label>

              <select
                required
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="">Select Priority</option>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>

            {/* DUE DATE */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Due Date
              </label>

              <input
                required
                type="date"
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            {/* ESTIMATED EFFORT */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Estimated Effort
              </label>

              <input
                required
                className="w-full border border-gray-300 rounded-xl p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 4 hours"
                value={estimatedEffort}
                onChange={(e) => setEstimatedEffort(e.target.value)}
              />
            </div>

            {/* SAVE BUTTON */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Task"}
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTask;