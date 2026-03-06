// adminApi/apiAdminProducts.js
import api from "../services/api";

export const productsService = {
  // GET /api/products/
  getAll: async (params = {}) => {
    const res = await api.get("/api/products/", { params });
    // res = { success, data: [...], pagination }
    // vì interceptor đã return response.data rồi
    return res;
  },

  // GET /api/products/:id/
  getById: async (id) => {
    const res = await api.get(`/api/products/${id}/`);
    return res;
  },

  // POST /api/products/ — Admin Only
  create: async (payload) => {
    const res = await api.post("/api/products/", payload);
    return res;
  },

  // PUT /api/products/:id/ — Admin Only
  update: async (id, payload) => {
    const res = await api.put(`/api/products/${id}/`, payload);
    return res;
  },

  // DELETE /api/products/:id/ — Admin Only
  delete: async (id) => {
    const res = await api.delete(`/api/products/${id}/`);
    return res;
  },
};