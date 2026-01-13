// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TIMEOUT: 30000,
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    BASE: '/auth',
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  // Users
  USERS: {
    BASE: '/users',
    BY_ID: (id) => `/users/${id}`,
    ASSIGN_ROLES: (id) => `/users/${id}/roles`,
  },
  // Roles
  ROLES: {
    BASE: '/roles',
    BY_ID: (id) => `/roles/${id}`,
  },
  // Store - Categories
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id) => `/categories/${id}`,
  },
  // Store - Topics
  TOPICS: {
    BASE: '/topics',
    BY_ID: (id) => `/topics/${id}`,
  },
  // Store - Styles
  STYLES: {
    BASE: '/styles',
    BY_ID: (id) => `/styles/${id}`,
  },
  // Store - Products
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id) => `/products/${id}`,
    STOCK: (id) => `/products/${id}/stock`,
  },
  // Store - Cart
  CART: {
    BASE: '/cart',
    ITEMS: '/cart/items',
    ITEM: (productId) => `/cart/items/${productId}`,
  },
  // Store - Orders
  ORDERS: {
    BASE: '/orders',
    ME: '/orders/me',
    BY_ID: (id) => `/orders/${id}`,
    STATUS: (id) => `/orders/${id}/status`,
    CANCEL: (id) => `/orders/${id}/cancel`,
  },
  // Store - Payments
  PAYMENTS: {
    BASE: '/payments',
    ME: '/payments/me',
    BY_ID: (id) => `/payments/${id}`,
    STATUS: (id) => `/payments/${id}/status`,
  },
  // Health
  HEALTH: '/health',
};
