// src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../services";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userProfile");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return authService.isAuthenticated();
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🧩 Khi user thay đổi → lưu lại vào localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("userProfile", JSON.stringify(user));
    } else {
      localStorage.removeItem("userProfile");
    }
  }, [user]);

  // 🔄 Load user profile khi app khởi động (nếu có token)
  useEffect(() => {
    const loadUserProfile = async () => {
      if (authService.isAuthenticated() && !user) {
        try {
          setLoading(true);
          const response = await authService.getProfile();
          if (response.success && response.data.user) {
            setUser(response.data.user);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Failed to load user profile:", error);
          // Token có thể đã hết hạn, clear storage
          authService.logout();
          setIsLoggedIn(false);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserProfile();
  }, []);

  // 🟢 Đăng nhập
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.login({ email, password });

      if (response.success && response.data.user) {
        setUser(response.data.user);
        setIsLoggedIn(true);
        localStorage.setItem("userProfile", JSON.stringify(response.data.user));
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      const errorMessage = error.message || "Đăng nhập thất bại";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 📝 Đăng ký
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.register(userData);

      if (response.success && response.data.user) {
        setUser(response.data.user);
        setIsLoggedIn(true);
        localStorage.setItem("userProfile", JSON.stringify(response.data.user));
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || "Đăng ký thất bại");
      }
    } catch (error) {
      const errorMessage = error.message || "Đăng ký thất bại";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Đăng xuất
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("userProfile");
      setLoading(false);
    }
  };

  // ✏️ Cập nhật hồ sơ (sync with server)
  const updateProfile = async (newData) => {
    try {
      setLoading(true);
      setError(null);

      // Nếu có userId, call API update
      if (user?.id) {
        const response = await authService.getProfile();
        if (response.success && response.data.user) {
          const updatedUser = { ...response.data.user, ...newData };
          setUser(updatedUser);
          localStorage.setItem("userProfile", JSON.stringify(updatedUser));
          return { success: true, data: updatedUser };
        }
      } else {
        // Fallback: chỉ update local
        const updatedUser = { ...user, ...newData };
        setUser(updatedUser);
        localStorage.setItem("userProfile", JSON.stringify(updatedUser));
        return { success: true, data: updatedUser };
      }
    } catch (error) {
      const errorMessage = error.message || "Cập nhật thông tin thất bại";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Refresh user profile từ server
  const refreshProfile = async () => {
    try {
      setLoading(true);
      const response = await authService.getProfile();
      if (response.success && response.data.user) {
        setUser(response.data.user);
        localStorage.setItem("userProfile", JSON.stringify(response.data.user));
        return { success: true, data: response.data.user };
      }
    } catch (error) {
      console.error("Failed to refresh profile:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    isLoggedIn,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    refreshProfile,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
