// File: ./Store/MuaTranhIn.jsx
// src/pages/MuaTranhIn.jsx
import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import { RefreshCw, ShoppingCart, Filter, Search } from "lucide-react";

export default function MuaTranhIn() {
  const { user } = useContext(UserContext);
  const { addToCart, cart, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice, fetchCart, isAuthenticated } = useCart();
  const { products, loading, error, pagination, fetchProducts, categories, topics, styles } = useProducts();
  const navigate = useNavigate();

  // Local filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterTopic, setFilterTopic] = useState("");
  const [filterStyle, setFilterStyle] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Auto-fetch cart when entering this page to activate user's cart
  useEffect(() => {
    console.log("🛒 [MuaTranhIn] Auto-fetching cart...", { isAuthenticated });
    fetchCart();
  }, []);

  // Fetch products when filters change
  const applyFilters = useCallback(() => {
    const params = { page: currentPage, limit: 12 };
    if (searchTerm) params.search = searchTerm;
    if (filterCategory) params.category_id = filterCategory;
    if (filterTopic) params.topic_id = filterTopic;
    if (filterStyle) params.style_id = filterStyle;
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    params.status = "Active"; // Only show active products

    fetchProducts(params);
  }, [fetchProducts, currentPage, searchTerm, filterCategory, filterTopic, filterStyle, minPrice, maxPrice]);

  useEffect(() => {
    applyFilters();
  }, [currentPage]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      applyFilters();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilterTopic("");
    setFilterStyle("");
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("");
    setCurrentPage(1);
    fetchProducts({ page: 1, limit: 12, status: "Active" });
  };

  // Handle filter change
  const handleFilterChange = () => {
    setCurrentPage(1);
    applyFilters();
  };

  // View product detail
  const handleViewDetail = (product) => {
    navigate(`/chi-tiet/${product.product_id}`);
  };

  // Add to cart
  const handleAddToCart = async (product) => {
    try {
      await addToCart(product, "default", 1);
      toast.success("Đã thêm vào giỏ hàng!");
    } catch (err) {
      toast.error("Lỗi thêm vào giỏ hàng");
    }
  };

  // Checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowCart(false);
    navigate("/checkout");
  };

  // Sort products locally
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") return Number(a.price) - Number(b.price);
    if (sortOrder === "desc") return Number(b.price) - Number(a.price);
    return 0;
  });

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Floating Cart Button */}
      <button
        className="fixed bottom-8 right-8 z-40 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg px-6 py-3 text-lg flex items-center gap-2"
        onClick={() => setShowCart(true)}
      >
        <ShoppingCart size={20} /> Giỏ hàng ({getTotalItems()})
      </button>

      {/* Mobile Filter Button */}
      <button
        className="fixed bottom-8 left-8 z-40 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-full shadow-lg p-3 md:hidden"
        onClick={() => setShowMobileFilter(true)}
      >
        <Filter size={20} />
      </button>

      {/* Cart Modal */}
      {showCart && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShowCart(false)}
        >
          <motion.div
            className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4 flex items-center justify-between shadow-md z-10">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🛒</span>
                <div>
                  <h2 className="text-xl font-bold text-white">Giỏ hàng của bạn</h2>
                  <p className="text-sm text-orange-100">{getTotalItems()} sản phẩm</p>
                </div>
              </div>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white text-2xl font-bold"
                onClick={() => setShowCart(false)}
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🛍️</div>
                  <p className="text-gray-500 text-lg mb-4">Giỏ hàng của bạn đang trống</p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.selectedType}`}
                      className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={item.image || "https://placehold.co/80x80?text=No+Image"}
                          alt={item.title || item.name}
                          className="w-20 h-20 rounded-lg object-cover shadow-sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate mb-1">{item.title || item.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Số lượng:</span>
                          <div className="flex items-center bg-white rounded-lg border overflow-hidden">
                            <button
                              className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                              onClick={() => updateQuantity(item.id, item.selectedType, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="px-3 py-1 font-medium text-orange-600 min-w-[40px] text-center border-x">
                              {item.quantity}
                            </span>
                            <button
                              className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                              onClick={() => updateQuantity(item.id, item.selectedType, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="font-bold text-orange-600 text-lg">
                          {(item.price * item.quantity).toLocaleString()}₫
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                          onClick={() => removeFromCart(item.id, item.selectedType)}
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t px-6 py-4 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tổng cộng</p>
                    <p className="text-2xl font-bold text-orange-600">{getTotalPrice().toLocaleString()}₫</p>
                  </div>
                  <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 font-medium">
                    Xóa tất cả
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCart(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                  >
                    Tiếp tục mua
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 shadow-lg"
                  >
                    Thanh toán →
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      <Toaster position="top-right" />

      {/* Sidebar Filters */}
      <aside
        className={`w-72 bg-white shadow-md p-6 border-r fixed md:relative inset-y-0 left-0 z-40 transform transition-transform ${showMobileFilter ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-orange-600">🖼️ Cửa hàng HA4</h1>
          <button className="md:hidden" onClick={() => setShowMobileFilter(false)}>
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Tìm kiếm</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Nhập tên sản phẩm..."
              className="border rounded-md p-2 pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Danh mục</label>
          <select
            className="border rounded-md p-2 w-full"
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="">Tất cả</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Topic */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Chủ đề</label>
          <select
            className="border rounded-md p-2 w-full"
            value={filterTopic}
            onChange={(e) => {
              setFilterTopic(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="">Tất cả</option>
            {topics.map((topic) => (
              <option key={topic.topic_id} value={topic.topic_id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>

        {/* Style */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Phong cách</label>
          <select
            className="border rounded-md p-2 w-full"
            value={filterStyle}
            onChange={(e) => {
              setFilterStyle(e.target.value);
              handleFilterChange();
            }}
          >
            <option value="">Tất cả</option>
            {styles.map((style) => (
              <option key={style.style_id} value={style.style_id}>
                {style.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Khoảng giá (₫)</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Từ"
              className="border rounded-md p-2 w-1/2"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={handleFilterChange}
            />
            <input
              type="number"
              placeholder="Đến"
              className="border rounded-md p-2 w-1/2"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={handleFilterChange}
            />
          </div>
        </div>

        {/* Sort */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Sắp xếp</label>
          <select className="border rounded-md p-2 w-full" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Mặc định</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>

        <button onClick={resetFilters} className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
          🔄 Reset bộ lọc
        </button>
      </aside>

      {/* Overlay for mobile */}
      {showMobileFilter && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setShowMobileFilter(false)} />
      )}

      {/* Products Grid */}
      <main className="flex-1 p-6 md:p-10">
        {/* Banner */}
        <motion.div
          className="mb-10 text-center bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-300 rounded-xl p-6 shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h2
            className="text-2xl font-bold text-orange-700 mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ❤️ Chung tay vì dự án Heritage Art 4.0
          </motion.h2>
          <p className="text-lg text-gray-800 font-medium">
            Khi bạn mua tranh, <span className="text-orange-600 font-bold">5% tổng số tiền bán ra</span> sẽ được dành tặng
            cho các <span className="font-semibold">Mẹ Việt Nam anh hùng</span> và{" "}
            <span className="font-semibold">Anh hùng lực lượng vũ trang nhân dân</span>.
          </p>
        </motion.div>

        {/* Loading/Error States */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="animate-spin text-orange-500 mr-2" size={24} />
            <span className="text-gray-600">Đang tải sản phẩm...</span>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <motion.div
                    key={product.product_id}
                    className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ y: -6 }}
                  >
                    {/* Image */}
                    <div onClick={() => handleViewDetail(product)} className="relative cursor-pointer group overflow-hidden">
                      <motion.img
                        src={product.image || "https://placehold.co/400x400?text=No+Image"}
                        alt={product.name}
                        className="w-full h-full object-cover aspect-square select-none"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <motion.button
                          className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-orange-600"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          🔍 Xem chi tiết
                        </motion.button>
                      </motion.div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div
                        onClick={() => handleViewDetail(product)}
                        className="text-base font-semibold mb-2 text-gray-800 hover:text-orange-600 cursor-pointer truncate"
                      >
                        {product.name}
                      </div>

                      {product.category && (
                        <p className="text-xs text-gray-500 mb-2">📁 {product.category.name}</p>
                      )}

                      <p className="text-lg font-bold text-orange-600 mb-3">
                        {Number(product.price).toLocaleString()}₫
                      </p>

                      {product.stock_quantity <= 0 ? (
                        <button
                          disabled
                          className="w-full py-2 bg-gray-300 text-gray-600 font-medium rounded-lg cursor-not-allowed"
                        >
                          Hết hàng
                        </button>
                      ) : (
                        <motion.button
                          onClick={() => handleAddToCart(product)}
                          className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg shadow hover:from-orange-600 hover:to-amber-600"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          🛒 Thêm vào giỏ
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center col-span-4 text-gray-500 italic py-10">
                  Không tìm thấy sản phẩm phù hợp.
                </p>
              )}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Trước
                </button>
                <span className="px-4 py-2 text-gray-600">
                  Trang {currentPage} / {pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
