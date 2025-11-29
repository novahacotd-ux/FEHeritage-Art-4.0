// src/context/UserContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userProfile");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // 🧩 Khi user thay đổi → lưu lại vào localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("userProfile", JSON.stringify(user));
    } else {
      localStorage.removeItem("userProfile");
    }
  }, [user]);

  // 🧩 Khi trạng thái đăng nhập thay đổi → lưu lại
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  // 🟢 Đăng nhập (hoặc đăng ký)
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("userProfile", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
  };

  // 🔴 Đăng xuất
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("userProfile");
    localStorage.removeItem("isLoggedIn");
  };

  // ✏️ Cập nhật hồ sơ
  const updateProfile = (newData) => {
    setUser((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem("userProfile", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, login, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
