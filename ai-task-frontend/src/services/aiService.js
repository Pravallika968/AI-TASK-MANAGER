import api from "../api/axiosConfig";

export const generateTaskAI = (title) =>
  api.post("/ai/generate-task", { title });