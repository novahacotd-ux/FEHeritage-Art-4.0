// File moved to ./Store/MuaTranhIn.jsx
// src/pages/MuaTranhIn.jsx
import React, { useState, useContext } from "react";
import Cart from "../../components/Cart";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useArts } from "../../context/ArtContext";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";


export default function MuaTranhIn() {
  // Context và state
  const { user } = useContext(UserContext);
  const { addToCart, cart, updateQuantity, removeFromCart, clearCart, getTotalItems, getTotalPrice } = useCart();
  const { arts } = useArts();
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Tất cả");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [sortOrder, setSortOrder] = useState("none");
  const [showCart, setShowCart] = useState(false);

  // Lọc tranh theo các tiêu chí
  const filteredArts = arts
    .filter((art) => art.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((art) => filterCategory === "Tất cả" ? true : art.category === filterCategory)
    .filter((art) => {
      // Lọc theo chất liệu
      const filterMaterial = selectedTypes["filterMaterial"];
      if (filterMaterial && art.price) {
        // Kiểm tra xem tranh có loại chất liệu được chọn không
        if (!Object.keys(art.price).includes(filterMaterial)) {
          return false;
        }
      }
      return true;
    })
    .filter((art) => {
      // Lọc theo phong cách
      const filterStyle = selectedTypes["filterStyle"];
      if (filterStyle && art.style) {
        return art.style === filterStyle;
      }
      return true;
    })
    .filter((art) => {
      const type = selectedTypes[art.id] || selectedTypes["filterMaterial"] || "Tranh Canvas";
      const price = art.price[type] || art.price["Tranh Canvas"];
      return price >= minPrice && price <= maxPrice;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        const typeA = selectedTypes[a.id] || "Tranh Canvas";
        const typeB = selectedTypes[b.id] || "Tranh Canvas";
        return a.price[typeA] - b.price[typeB];
      }
      if (sortOrder === "desc") {
        const typeA = selectedTypes[a.id] || "Tranh Canvas";
        const typeB = selectedTypes[b.id] || "Tranh Canvas";
        return b.price[typeB] - a.price[typeA];
      }
      return 0;
    });

  // Reset bộ lọc
  const resetFilters = () => {
    setSearchTerm("");
    setFilterCategory("Tất cả");
    setMinPrice(0);
    setMaxPrice(5000000);
    setSortOrder("none");
    setSelectedTypes({});
  };

  // Xử lý chọn loại tranh
  const handleTypeChange = (artId, type) => {
    setSelectedTypes((prev) => ({ ...prev, [artId]: type }));
  };

  // Xem chi tiết tranh
  const handleViewDetail = (art) => {
    navigate(`/chi-tiet/${art.id}`);
  };

  // Thêm vào giỏ hàng
  const handleAddToCart = (art) => {
    const type = selectedTypes[art.id] || "Tranh Canvas";
    addToCart(art, type);
    toast.success("Đã thêm vào giỏ hàng!");
  };

  // Xử lý thanh toán
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowCart(false);
    navigate("/checkout");
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Nút mở Cart popup */}
      <button
        className="fixed bottom-8 right-8 z-40 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg px-6 py-3 text-lg flex items-center gap-2"
        onClick={() => setShowCart(true)}
      >
        🛒 Xem giỏ hàng
      </button>
      {/* Cart popup modal */}
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
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-4 flex items-center justify-between shadow-md z-10">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🛒</span>
                <div>
                  <h2 className="text-xl font-bold text-white">Giỏ hàng của bạn</h2>
                  <p className="text-sm text-orange-100">
                    {getTotalItems()} sản phẩm
                  </p>
                </div>
              </div>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white text-2xl font-bold transition-colors"
                onClick={() => setShowCart(false)}
              >
                ×
              </button>
            </div>

            {/* Body - Scrollable */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🛍️</div>
                  <p className="text-gray-500 text-lg mb-4">Giỏ hàng của bạn đang trống</p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition"
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
                      exit={{ opacity: 0, x: 20 }}
                    >
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 rounded-lg object-cover shadow-sm"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          <span className="inline-flex items-center gap-1">
                            <span className="text-orange-600">📦</span>
                            {item.selectedType}
                          </span>
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Số lượng:</span>
                          <div className="flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <button
                              className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition"
                              onClick={() => updateQuantity(item.id, item.selectedType, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="px-3 py-1 font-medium text-orange-600 min-w-[40px] text-center border-x border-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition"
                              onClick={() => updateQuantity(item.id, item.selectedType, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex flex-col items-end gap-2">
                        <div className="font-bold text-orange-600 text-lg">
                          {(item.price * item.quantity).toLocaleString()}₫
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition"
                          onClick={() => removeFromCart(item.id, item.selectedType)}
                        >
                          <span>🗑️</span> Xóa
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Total & Checkout */}
            {cart.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tổng cộng</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {getTotalPrice().toLocaleString()}₫
                    </p>
                  </div>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-700 font-medium transition"
                  >
                    Xóa tất cả
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCart(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                  >
                    Tiếp tục mua
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition shadow-lg"
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
      
      {/* Sidebar bộ lọc */}
      <aside className="w-72 bg-white shadow-md p-6 border-r hidden md:block">
        <h1 className="text-2xl font-bold text-orange-600 mb-6">
          🖼️ Cửa hàng HA4
        </h1>

        {/* Tìm kiếm */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Tìm kiếm theo tên
          </label>
          <input
            type="text"
            placeholder="Nhập tên tranh..."
            className="border rounded-md p-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Lọc theo chủ đề */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Chủ đề</label>
          <select
            className="border rounded-md p-2 w-full"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Di tích lịch sử">Di tích lịch sử</option>
            <option value="Văn hóa">Văn hóa</option>
            <option value="Phố cổ">Phố cổ</option>
          </select>
        </div>

        {/* Bộ lọc chất liệu */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Chất liệu</label>
          <select
            className="border rounded-md p-2 w-full"
            value={selectedTypes["filterMaterial"] || ""}
            onChange={(e) =>
              setSelectedTypes((prev) => ({ ...prev, filterMaterial: e.target.value }))
            }
          >
            <option value="">Tất cả</option>
            <option value="Tranh Canvas">Tranh Canvas</option>
            <option value="Tranh Lụa">Tranh Lụa</option>
            <option value="Tranh Gỗ">Tranh Gỗ</option>
            <option value="Tranh Kính">Tranh Kính</option>
          </select>
        </div>

        {/* Bộ lọc phong cách */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Phong cách</label>
          <select
            className="border rounded-md p-2 w-full"
            value={selectedTypes["filterStyle"] || ""}
            onChange={(e) =>
              setSelectedTypes((prev) => ({ ...prev, filterStyle: e.target.value }))
            }
          >
            <option value="">Tất cả</option>
            <option value="Cổ điển">Cổ điển</option>
            <option value="Hiện đại">Hiện đại</option>
            <option value="Trừu tượng">Trừu tượng</option>
            <option value="Thiên nhiên">Thiên nhiên</option>
          </select>
        </div>

        {/* Bộ lọc giá */}
        <div className="mb-8">
          <label className="block mb-2 font-medium text-gray-700">
            Khoảng giá (₫)
          </label>
          <div className="flex items-center justify-between mb-1 text-sm text-gray-600">
            <span>{parseInt(minPrice || 0).toLocaleString()}₫</span>
            <span>{parseInt(maxPrice || 5000000).toLocaleString()}₫</span>
          </div>
          <input
            type="range"
            min="0"
            max="5000000"
            step="50000"
            value={minPrice || 0}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full accent-orange-500"
          />
          <input
            type="range"
            min="0"
            max="5000000"
            step="50000"
            value={maxPrice || 5000000}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full accent-orange-500 mt-2"
          />
        </div>

        {/* Sắp xếp */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Sắp xếp
          </label>
          <select
            className="border rounded-md p-2 w-full"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Mặc định</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>

        <button
          onClick={resetFilters}
          className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
        >
          🔄 Reset bộ lọc
        </button>
      </aside>

      {/* Danh sách tranh */}
      <main className="flex-1 p-6 md:p-10">
        <motion.div
          className="mb-10 text-center bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-300 rounded-xl p-6 shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-2xl font-bold text-orange-700 mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ❤️ Chung tay vì dự án Heritage Art 4.0
          </motion.h2>
          <motion.p
            className="text-lg text-gray-800 font-medium"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Khi bạn mua tranh, <span className="text-orange-600 font-bold">5% tổng số tiền bán ra</span> sẽ được dành tặng cho các <span className="font-semibold">Mẹ Việt Nam anh hùng</span> và <span className="font-semibold">Anh hùng lực lượng vũ trang nhân dân</span>.
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArts && filteredArts.length > 0 ? (
            filteredArts.map((art) => {
              const selectedType = selectedTypes[art.id] || "Tranh Canvas";
              const price = art.price[selectedType];
              const imageUrl = art.images[selectedType];

              return (
                <motion.div
                  key={art.id}
                  className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -6 }}
                >
                  {/* Ảnh sản phẩm */}
                  <div
                    onClick={() => handleViewDetail(art)}
                    className="relative cursor-pointer group overflow-hidden"
                  >
                    <motion.img
                      src={imageUrl}
                      alt={`${art.title} - ${selectedType}`}
                      className="w-full h-full object-cover aspect-square select-none"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.button
                        className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🔍 Xem chi tiết
                      </motion.button>
                    </motion.div>
                  </div>
                  {/* Thông tin sản phẩm */}
                  <div className="p-4">
                    <div
                      onClick={() => handleViewDetail(art)}
                      className="text-base font-semibold mb-2 text-gray-800 hover:text-orange-600 cursor-pointer truncate"
                    >
                      {art.title}
                    </div>
                    <label className="block mb-1 text-xs font-medium text-gray-600">
                      Loại sản phẩm:
                    </label>
                    <select
                      className="border rounded-md p-2 w-full mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={selectedType}
                      onChange={(e) => handleTypeChange(art.id, e.target.value)}
                    >
                      {Object.keys(art.price).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <p className="text-lg font-bold text-orange-600 mb-3">
                      {price.toLocaleString()}₫
                    </p>
                    <motion.button
                      onClick={() => handleAddToCart(art)}
                      className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg shadow hover:from-orange-600 hover:to-amber-600 transition-all"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      🛒 Thêm vào giỏ
                    </motion.button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="text-center col-span-4 text-gray-500 italic">
              Hiện chưa có sản phẩm nào. Vui lòng thêm từ trang Admin.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
