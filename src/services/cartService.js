import api from './api';
import { API_ENDPOINTS } from '../configs';

// ==================== CART ====================

/**
 * Get current user's cart
 * @returns {Promise} Cart data with items and total
 */
export const getCart = async () => {
    return api.get(API_ENDPOINTS.CART.BASE);
};

/**
 * Add item to cart
 * @param {number} productId - Product ID to add
 * @param {number} quantity - Quantity to add
 */
export const addToCart = async (productId, quantity = 1) => {
    return api.post(API_ENDPOINTS.CART.ITEMS, {
        product_id: productId,
        quantity,
    });
};

/**
 * Update cart item quantity
 * @param {number} productId - Product ID to update
 * @param {number} quantity - New quantity
 */
export const updateCartItem = async (productId, quantity) => {
    return api.put(API_ENDPOINTS.CART.ITEM(productId), { quantity });
};

/**
 * Remove item from cart
 * @param {number} productId - Product ID to remove
 */
export const removeFromCart = async (productId) => {
    return api.delete(API_ENDPOINTS.CART.ITEM(productId));
};

/**
 * Clear all items from cart
 */
export const clearCart = async () => {
    return api.delete(API_ENDPOINTS.CART.BASE);
};

export default {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
};
