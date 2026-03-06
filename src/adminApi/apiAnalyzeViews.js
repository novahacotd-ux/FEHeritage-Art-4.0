// adminApi/apiAnalyzeViews.js
import api from "../services/api";

export const analyzeService = {
  // GET /api/analyze-views/
  getAll: async () => {
    const res = await api.get("/analyze-views/");
    // res = { success: true, data: [...] }
    return res;
  },

  // POST /api/analyze-views/
  create: async (payload) => {
    const res = await api.post("/analyze-views/", payload);
    return res;
  },

  // POST /api/analyze-views/:id/media/
  uploadMedia: async (id, file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post(`/analyze-views/${id}/media/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  },
};