import api from './api';
import { API_ENDPOINTS } from '../configs';


const roleService = {

  getAllRoles: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ROLES.BASE);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getRoleById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.ROLES.BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  createRole: async (roleData) => {
    try {
      const response = await api.post(API_ENDPOINTS.ROLES.BASE, roleData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateRole: async (id, roleData) => {
    try {
      const response = await api.put(API_ENDPOINTS.ROLES.BY_ID(id), roleData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteRole: async (id) => {
    try {
      const response = await api.delete(API_ENDPOINTS.ROLES.BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default roleService;
