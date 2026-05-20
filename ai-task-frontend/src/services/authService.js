import api from "../api/axiosConfig";

export const login = (data) => api.post("/auth/login", data);

export const register = (data) => api.post("/auth/register", data);