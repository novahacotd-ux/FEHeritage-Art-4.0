import api from './api';

// ==================== ADDRESS API ====================

/**
 * Get all addresses for current user
 * User: /addresses/me
 * Admin: /addresses (to see all)
 */
export const getAddresses = async () => {
    return api.get('/addresses/me');
};

/**
 * Get address by ID
 */
export const getAddressById = async (id) => {
    return api.get(`/addresses/${id}`);
};

/**
 * Create new address
 * @param {Object} data - { street, city, district, ward, phone, is_default }
 */
export const createAddress = async (data) => {
    return api.post('/addresses', data);
};

/**
 * Update address
 * @param {number} id - Address ID
 * @param {Object} data - { street, city, district, ward, phone, is_default }
 */
export const updateAddress = async (id, data) => {
    return api.put(`/addresses/${id}`, data);
};

/**
 * Delete address
 */
export const deleteAddress = async (id) => {
    return api.delete(`/addresses/${id}`);
};

/**
 * Set address as default
 */
export const setDefaultAddress = async (id) => {
    return api.put(`/addresses/${id}/default`);
};

export default {
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
};
