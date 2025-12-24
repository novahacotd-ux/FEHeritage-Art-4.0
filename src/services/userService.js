import api from './api';
import { API_ENDPOINTS } from '../configs';

const userService = {

  getAllUsers: async (params = {}) => {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.BASE, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.USERS.BASE, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await api.put(API_ENDPOINTS.USERS.BY_ID(id), userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  assignRoles: async (id, role_ids) => {
    try {
      const response = await api.put(API_ENDPOINTS.USERS.ASSIGN_ROLES(id), {
        role_ids,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await api.delete(API_ENDPOINTS.USERS.BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
