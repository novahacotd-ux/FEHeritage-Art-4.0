import api from './api';
import { API_ENDPOINTS } from '../configs';

// ==================== ORDERS ====================

/**
 * Get all orders (Admin only)
 */
export const getAllOrders = async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return api.get(`${API_ENDPOINTS.ORDERS.BASE}?${queryParams}`);
};

/**
 * Get current user's orders
 */
export const getMyOrders = async () => {
    return api.get(API_ENDPOINTS.ORDERS.ME);
};

/**
 * Get order by ID
 * @param {number} id - Order ID
 */
export const getOrderById = async (id) => {
    return api.get(API_ENDPOINTS.ORDERS.BY_ID(id));
};

/**
 * Create order from cart
 * @param {number} addressId - Delivery address ID
 * @param {string} note - Optional order note
 */
export const createOrder = async (addressId, note = '') => {
    return api.post(API_ENDPOINTS.ORDERS.BASE, {
        address_id: addressId,
        note,
    });
};

/**
 * Update order status (Admin only)
 * @param {number} id - Order ID
 * @param {string} status - New status (Pending, Processing, Shipped, Delivered, Cancelled)
 * @param {string} receiveDate - Optional new receive date
 */
export const updateOrderStatus = async (id, status, receiveDate = null) => {
    const data = { status };
    if (receiveDate) data.receive_date = receiveDate;
    return api.put(API_ENDPOINTS.ORDERS.STATUS(id), data);
};

/**
 * Cancel order
 * @param {number} id - Order ID
 */
export const cancelOrder = async (id) => {
    return api.put(API_ENDPOINTS.ORDERS.CANCEL(id));
};

// ==================== PAYMENTS ====================

/**
 * Get all payments (Admin only)
 */
export const getAllPayments = async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return api.get(`${API_ENDPOINTS.PAYMENTS.BASE}?${queryParams}`);
};

/**
 * Get current user's payments
 */
export const getMyPayments = async () => {
    return api.get(API_ENDPOINTS.PAYMENTS.ME);
};

/**
 * Get payment by ID
 * @param {number} id - Payment ID
 */
export const getPaymentById = async (id) => {
    return api.get(API_ENDPOINTS.PAYMENTS.BY_ID(id));
};

/**
 * Create payment for order
 * @param {number} orderId - Order ID
 * @param {string} paymentMethod - Payment method
 * @param {number} amount - Payment amount
 */
export const createPayment = async (orderId, paymentMethod, amount) => {
    return api.post(API_ENDPOINTS.PAYMENTS.BASE, {
        order_id: orderId,
        payment_method: paymentMethod,
        amount,
    });
};

/**
 * Update payment status (Admin only)
 * @param {number} id - Payment ID
 * @param {string} status - New status (Pending, Completed, Failed, Refunded)
 */
export const updatePaymentStatus = async (id, status) => {
    return api.put(API_ENDPOINTS.PAYMENTS.STATUS(id), { status });
};

export default {
    // Orders
    getAllOrders,
    getMyOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    // Payments
    getAllPayments,
    getMyPayments,
    getPaymentById,
    createPayment,
    updatePaymentStatus,
};
