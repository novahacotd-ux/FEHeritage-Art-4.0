import api from './api';
import { API_ENDPOINTS } from '../configs';

// ==================== CATEGORIES ====================

export const getCategories = async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return api.get(`${API_ENDPOINTS.CATEGORIES.BASE}?${queryParams}`);
};

export const getCategoryById = async (id) => {
    return api.get(API_ENDPOINTS.CATEGORIES.BY_ID(id));
};

export const createCategory = async (data) => {
    return api.post(API_ENDPOINTS.CATEGORIES.BASE, data);
};

export const updateCategory = async (id, data) => {
    return api.put(API_ENDPOINTS.CATEGORIES.BY_ID(id), data);
};

export const deleteCategory = async (id) => {
    return api.delete(API_ENDPOINTS.CATEGORIES.BY_ID(id));
};

// ==================== TOPICS ====================

export const getTopics = async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return api.get(`${API_ENDPOINTS.TOPICS.BASE}?${queryParams}`);
};

export const getTopicById = async (id) => {
    return api.get(API_ENDPOINTS.TOPICS.BY_ID(id));
};

export const createTopic = async (data) => {
    return api.post(API_ENDPOINTS.TOPICS.BASE, data);
};

export const updateTopic = async (id, data) => {
    return api.put(API_ENDPOINTS.TOPICS.BY_ID(id), data);
};

export const deleteTopic = async (id) => {
    return api.delete(API_ENDPOINTS.TOPICS.BY_ID(id));
};

// ==================== STYLES ====================

export const getStyles = async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return api.get(`${API_ENDPOINTS.STYLES.BASE}?${queryParams}`);
};

export const getStyleById = async (id) => {
    return api.get(API_ENDPOINTS.STYLES.BY_ID(id));
};

export const createStyle = async (data) => {
    return api.post(API_ENDPOINTS.STYLES.BASE, data);
};

export const updateStyle = async (id, data) => {
    return api.put(API_ENDPOINTS.STYLES.BY_ID(id), data);
};

export const deleteStyle = async (id) => {
    return api.delete(API_ENDPOINTS.STYLES.BY_ID(id));
};

// ==================== PRODUCTS ====================

export const getProducts = async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return api.get(`${API_ENDPOINTS.PRODUCTS.BASE}?${queryParams}`);
};

export const getProductById = async (id) => {
    return api.get(API_ENDPOINTS.PRODUCTS.BY_ID(id));
};

export const createProduct = async (data) => {
    return api.post(API_ENDPOINTS.PRODUCTS.BASE, data);
};

export const updateProduct = async (id, data) => {
    return api.put(API_ENDPOINTS.PRODUCTS.BY_ID(id), data);
};

export const updateProductStock = async (id, stockQuantity) => {
    return api.put(API_ENDPOINTS.PRODUCTS.STOCK(id), { stock_quantity: stockQuantity });
};

export const deleteProduct = async (id) => {
    return api.delete(API_ENDPOINTS.PRODUCTS.BY_ID(id));
};

export default {
    // Categories
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    // Topics
    getTopics,
    getTopicById,
    createTopic,
    updateTopic,
    deleteTopic,
    // Styles
    getStyles,
    getStyleById,
    createStyle,
    updateStyle,
    deleteStyle,
    // Products
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    updateProductStock,
    deleteProduct,
};
