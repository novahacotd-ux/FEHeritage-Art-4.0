// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback, useRef } from "react";
import * as cartService from "../services/cartService";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("userProfile");
  });

  // Selection state for checkout
  const [selectedItems, setSelectedItems] = useState([]); // Array of product IDs
  const [buyNowItem, setBuyNowItem] = useState(null); // For direct "Mua ngay" checkout

  // Sync confirmation state
  const [showSyncConfirm, setShowSyncConfirm] = useState(false);
  const [pendingGuestCart, setPendingGuestCart] = useState([]);
  const hasSyncedRef = useRef(false);

  // Check if user is authenticated
  const checkAuth = useCallback(() => {
    const userProfile = localStorage.getItem("userProfile");
    const isAuth = !!userProfile;
    setIsAuthenticated(isAuth);
    return isAuth;
  }, []);

  // Listen for auth changes
  useEffect(() => {
    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      const newAuthState = !!localStorage.getItem("userProfile");
      if (newAuthState !== isAuthenticated) {
        console.log("🔄 [CartContext] Auth state changed:", newAuthState);
        setIsAuthenticated(newAuthState);
      }
    }, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  // Guest cart operations
  const getLocalCart = () => {
    try {
      const saved = localStorage.getItem("guestCart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const saveLocalCart = (items) => {
    localStorage.setItem("guestCart", JSON.stringify(items));
  };

  // Fetch cart - uses API when authenticated, localStorage when guest
  const fetchCart = useCallback(async () => {
    console.log("📦 [CartContext] fetchCart called, isAuthenticated:", isAuthenticated);
    setLoading(true);

    try {
      if (isAuthenticated) {
        console.log("📦 [CartContext] Fetching cart from API...");
        const response = await cartService.getCart();
        console.log("📦 [CartContext] API Response:", response);

        if (response.success && response.data) {
          const items = response.data.cart?.items || [];
          const transformedItems = items.map((item) => ({
            id: item.product_id,
            product_id: item.product_id,
            cart_item_id: item.cart_item_id,
            title: item.product?.name || "Unknown Product",
            name: item.product?.name || "Unknown Product",
            price: Number(item.product?.price) || 0,
            image: item.product?.image || "",
            quantity: item.quantity || 1,
            stock_quantity: item.product?.stock_quantity || 0,
            selectedType: "default",
          }));
          setCart(transformedItems);
          setCartTotal(Number(response.data.total) || 0);
          console.log("📦 [CartContext] Cart loaded from API:", transformedItems.length, "items");
        }
      } else {
        const localCart = getLocalCart();
        setCart(localCart);
        const total = localCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setCartTotal(total);
        console.log("📦 [CartContext] Cart loaded from localStorage:", localCart.length, "items");
      }
    } catch (error) {
      console.error("❌ [CartContext] Error fetching cart:", error);
      const localCart = getLocalCart();
      setCart(localCart);
      setCartTotal(localCart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch cart when auth state changes
  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  // Sync guest cart to server (called when user confirms)
  const [isSyncing, setIsSyncing] = useState(false);

  const syncCartToServer = useCallback(async () => {
    if (!isAuthenticated || isSyncing) return;
    if (pendingGuestCart.length === 0) return;

    setIsSyncing(true);
    console.log("🔄 [CartContext] Syncing", pendingGuestCart.length, "guest items to server...");

    try {
      for (const item of pendingGuestCart) {
        await cartService.addToCart(item.id || item.product_id, item.quantity);
      }
      console.log("✅ [CartContext] Guest cart synced to server");
    } catch (error) {
      console.error("❌ [CartContext] Error syncing cart:", error);
    } finally {
      localStorage.removeItem("guestCart");
      setPendingGuestCart([]);
      setIsSyncing(false);
      await fetchCart();
    }
  }, [isAuthenticated, fetchCart, pendingGuestCart, isSyncing]);

  // Check for guest cart when user logs in - show confirmation popup
  useEffect(() => {
    if (isAuthenticated && !hasSyncedRef.current) {
      const guestCart = getLocalCart();
      if (guestCart.length > 0) {
        hasSyncedRef.current = true;
        // Save to pending and IMMEDIATELY clear localStorage to prevent duplicate
        setPendingGuestCart(guestCart);
        localStorage.removeItem("guestCart");
        setShowSyncConfirm(true);
      }
    }

    if (!isAuthenticated) {
      hasSyncedRef.current = false;
      setShowSyncConfirm(false);
      setPendingGuestCart([]);
    }
  }, [isAuthenticated]);

  // User confirms sync
  const confirmSync = async () => {
    setShowSyncConfirm(false);
    await syncCartToServer();
  };

  // User declines sync - just clear guest cart
  const declineSync = () => {
    setShowSyncConfirm(false);
    localStorage.removeItem("guestCart");
    setPendingGuestCart([]);
    fetchCart(); // Load user's server cart
  };

  // Add to cart
  const addToCart = async (product, selectedType = "default", quantity = 1) => {
    const productId = product.product_id || product.id;

    if (!productId) {
      console.error("❌ [CartContext] Product ID is required");
      return;
    }

    console.log("🛒 [CartContext] addToCart:", { productId, quantity, isAuthenticated });

    try {
      if (isAuthenticated) {
        console.log("🛒 [CartContext] Adding to cart via API...");
        await cartService.addToCart(productId, quantity);
        await fetchCart();
        console.log("✅ [CartContext] Added to cart via API");
      } else {
        const localCart = getLocalCart();
        const existingIndex = localCart.findIndex(
          (item) => (item.id === productId || item.product_id === productId) && item.selectedType === selectedType
        );

        if (existingIndex >= 0) {
          localCart[existingIndex].quantity += quantity;
        } else {
          localCart.push({
            id: productId,
            product_id: productId,
            title: product.name || product.title,
            name: product.name || product.title,
            category: product.category?.name || product.category,
            selectedType,
            price: Number(product.price) || 0,
            image: product.image,
            quantity,
            stock_quantity: product.stock_quantity,
          });
        }

        saveLocalCart(localCart);
        setCart(localCart);
        setCartTotal(localCart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
        console.log("✅ [CartContext] Added to guest cart");
      }
    } catch (error) {
      console.error("❌ [CartContext] Error adding to cart:", error);
      throw error;
    }
  };

  // Remove from cart
  const removeFromCart = async (productId, selectedType = "default") => {
    console.log("🗑️ [CartContext] removeFromCart:", { productId, isAuthenticated });

    try {
      if (isAuthenticated) {
        await cartService.removeFromCart(productId);
        await fetchCart();
      } else {
        const localCart = getLocalCart().filter(
          (item) => !((item.id === productId || item.product_id === productId) && item.selectedType === selectedType)
        );
        saveLocalCart(localCart);
        setCart(localCart);
        setCartTotal(localCart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
      }
    } catch (error) {
      console.error("❌ [CartContext] Error removing from cart:", error);
    }
  };

  // Update quantity
  const updateQuantity = async (productId, selectedType, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(productId, selectedType);
    }

    console.log("🔄 [CartContext] updateQuantity:", { productId, quantity, isAuthenticated });

    try {
      if (isAuthenticated) {
        await cartService.updateCartItem(productId, quantity);
        await fetchCart();
      } else {
        const localCart = getLocalCart().map((item) =>
          (item.id === productId || item.product_id === productId) && item.selectedType === selectedType
            ? { ...item, quantity }
            : item
        );
        saveLocalCart(localCart);
        setCart(localCart);
        setCartTotal(localCart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
      }
    } catch (error) {
      console.error("❌ [CartContext] Error updating cart:", error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    console.log("🗑️ [CartContext] clearCart, isAuthenticated:", isAuthenticated);

    try {
      if (isAuthenticated) {
        await cartService.clearCart();
      }
      localStorage.removeItem("guestCart");
      setCart([]);
      setCartTotal(0);
    } catch (error) {
      console.error("❌ [CartContext] Error clearing cart:", error);
    }
  };

  // Calculate totals
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // ============ SELECTION FUNCTIONS ============

  // Toggle selection of an item
  const toggleSelectItem = (productId) => {
    setSelectedItems(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  // Select all items
  const selectAllItems = () => {
    setSelectedItems(cart.map(item => item.id || item.product_id));
  };

  // Deselect all items
  const deselectAllItems = () => {
    setSelectedItems([]);
  };

  // Check if item is selected
  const isItemSelected = (productId) => {
    return selectedItems.includes(productId);
  };

  // Get selected items for checkout
  const getSelectedCartItems = () => {
    return cart.filter(item => selectedItems.includes(item.id || item.product_id));
  };

  // Get total price of selected items
  const getSelectedTotalPrice = () => {
    return getSelectedCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get total quantity of selected items  
  const getSelectedTotalItems = () => {
    return getSelectedCartItems().reduce((total, item) => total + item.quantity, 0);
  };

  // ============ BUY NOW FUNCTIONS ============

  // Set item for direct checkout (Mua ngay)
  const setBuyNow = (product, quantity = 1) => {
    setBuyNowItem({
      id: product.product_id || product.id,
      product_id: product.product_id || product.id,
      title: product.name || product.title,
      name: product.name || product.title,
      price: Number(product.price) || 0,
      image: product.image,
      quantity,
      stock_quantity: product.stock_quantity,
      selectedType: "default",
    });
  };

  // Clear buy now item
  const clearBuyNow = () => {
    setBuyNowItem(null);
  };

  // Get items for checkout (either buyNow item or selected cart items)
  const getCheckoutItems = () => {
    if (buyNowItem) {
      return [buyNowItem];
    }
    return getSelectedCartItems();
  };

  // Get checkout total
  const getCheckoutTotal = () => {
    if (buyNowItem) {
      return buyNowItem.price * buyNowItem.quantity;
    }
    return getSelectedTotalPrice();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotal,
        loading,
        isAuthenticated,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        fetchCart,
        syncCartToServer,
        // Sync confirmation
        showSyncConfirm,
        pendingGuestCart,
        confirmSync,
        declineSync,
        // Selection
        selectedItems,
        toggleSelectItem,
        selectAllItems,
        deselectAllItems,
        isItemSelected,
        getSelectedCartItems,
        getSelectedTotalPrice,
        getSelectedTotalItems,
        // Buy Now
        buyNowItem,
        setBuyNow,
        clearBuyNow,
        // Checkout helpers
        getCheckoutItems,
        getCheckoutTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

