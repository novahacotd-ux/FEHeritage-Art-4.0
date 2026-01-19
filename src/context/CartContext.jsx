// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Lưu giỏ hàng vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (art, selectedType = "Tranh Canvas", quantity = 1) => {
    const existingItem = cart.find(
      (item) => item.id === art.id && item.selectedType === selectedType
    );

    if (existingItem) {
      // Nếu đã có, tăng số lượng
      setCart(
        cart.map((item) =>
          item.id === art.id && item.selectedType === selectedType
            ? { ...item, quantity: item.quantity + Math.max(1, quantity) }
            : item
        )
      );
    } else {
      // Nếu chưa có, thêm mới
      setCart([
        ...cart,
        {
          id: art.id,
          title: art.title,
          category: art.category,
          selectedType,
          price: art.price[selectedType],
          image: art.images[selectedType],
          quantity: Math.max(1, quantity),
        },
      ]);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id, selectedType) => {
    setCart(cart.filter((item) => !(item.id === id && item.selectedType === selectedType)));
  };

  // Cập nhật số lượng
  const updateQuantity = (id, selectedType, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedType);
      return;
    }
    setCart(
      cart.map((item) =>
        item.id === id && item.selectedType === selectedType
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Tính tổng tiền
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Tính tổng số sản phẩm
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
