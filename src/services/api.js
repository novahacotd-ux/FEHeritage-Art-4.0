import axios from 'axios';
import { API_CONFIG } from '../configs';

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Xử lý response và errors
api.interceptors.response.use(
  (response) => {
    // Trả về data từ response
    return response.data;
  },
  (error) => {
    // Xử lý các lỗi phổ biến
    if (error.response) {
      // Server trả về response với status code ngoài 2xx
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - Token hết hạn hoặc không hợp lệ
          localStorage.removeItem('authToken');
          localStorage.removeItem('userProfile');
          localStorage.removeItem('isLoggedIn');

          // Redirect to login nếu không phải trang public
          if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
            window.location.href = '/login';
          }
          break;

        case 403:
          // Forbidden - Không có quyền truy cập
          console.error('Bạn không có quyền truy cập tài nguyên này');
          break;

        case 404:
          // Not Found
          console.error('Tài nguyên không tồn tại');
          break;

        case 409:
          // Conflict - Dữ liệu đã tồn tại
          console.error('Dữ liệu đã tồn tại');
          break;

        case 500:
          // Internal Server Error
          console.error('Lỗi máy chủ, vui lòng thử lại sau');
          break;

        default:
          console.error(`Lỗi ${status}: ${data?.message || 'Có lỗi xảy ra'}`);
      }

      return Promise.reject(data || error);
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      console.error('Không thể kết nối đến máy chủ');
      return Promise.reject({
        success: false,
        message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.',
      });
    } else {
      // Lỗi khi setup request
      console.error('Lỗi:', error.message);
      return Promise.reject({
        success: false,
        message: error.message,
      });
    }
  }
);

export default api;
