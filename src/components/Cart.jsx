import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    // Selection
    selectedItems,
    toggleSelectItem,
    selectAllItems,
    deselectAllItems,
    isItemSelected,
    getSelectedTotalPrice,
    getSelectedTotalItems,
  } = useCart();
  const navigate = useNavigate();

  // Check if all items are selected
  const allSelected = cart.length > 0 && selectedItems.length === cart.length;

  // Toggle select all
  const handleToggleAll = () => {
    if (allSelected) {
      deselectAllItems();
    } else {
      selectAllItems();
    }
  };

  // Xử lý chuyển sang trang thanh toán
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/mua-tranh-in')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-orange-600 font-semibold hover:bg-orange-50 transition shadow-sm border border-orange-200"
            >
              <span className="text-xl">←</span> Tiếp tục mua sắm
            </button>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm rounded-xl bg-white px-4 py-3 font-medium text-red-600 hover:bg-red-50 transition shadow-sm border border-red-200"
              >
                🗑️ Xóa toàn bộ
              </button>
            )}
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-md">
                🛒
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-1">Giỏ hàng của bạn</h1>
                <p className="text-orange-100 text-lg">
                  {cart.length === 0 ? "Chưa có sản phẩm nào" : `${getTotalItems()} sản phẩm trong giỏ`}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Nếu giỏ hàng rỗng */}
        {cart.length === 0 ? (
          <motion.div
            className="rounded-2xl bg-white p-16 text-center shadow-lg border border-gray-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-8xl mb-6">🛍️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Giỏ hàng trống</h2>
            <p className="mb-6 text-gray-600 text-lg">Hãy khám phá bộ sưu tập tranh tuyệt đẹp của chúng tôi!</p>
            <Link
              to="/mua-tranh-in"
              className="inline-block rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 font-semibold text-white shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105"
            >
              Khám phá ngay →
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Danh sách sản phẩm - 2 cột */}
            <div className="lg:col-span-2 space-y-4">
              {/* Select All Header */}
              <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 border border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleToggleAll}
                    className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                  />
                  <span className="font-medium text-gray-700">
                    {allSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"} ({cart.length} sản phẩm)
                  </span>
                </label>
                {selectedItems.length > 0 && (
                  <span className="ml-auto text-sm text-orange-600 font-medium">
                    Đã chọn {selectedItems.length} sản phẩm
                  </span>
                )}
              </div>

              {cart.map((item, index) => {
                const itemId = item.id || item.product_id;
                const isSelected = isItemSelected(itemId);

                return (
                  <motion.div
                    key={`${itemId}-${item.selectedType}`}
                    className={`bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all border-2 ${isSelected ? 'border-orange-400' : 'border-gray-100'
                      }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4 p-5">
                      {/* Checkbox */}
                      <div className="flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectItem(itemId)}
                          className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                        />
                      </div>

                      {/* Ảnh sản phẩm */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 rounded-xl object-cover shadow-md border-2 border-orange-100"
                        />
                      </div>

                      {/* Thông tin sản phẩm */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 text-lg mb-2 truncate">
                          {item.title || item.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-500 font-medium">Đơn giá:</span>
                          <span className="text-orange-600 font-semibold">
                            {item.price.toLocaleString()}₫
                          </span>
                        </div>

                        {/* Số lượng */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 font-medium">Số lượng:</span>
                          <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                            <button
                              className="px-3 py-1.5 hover:bg-orange-100 text-gray-700 font-semibold transition disabled:opacity-40"
                              onClick={() => updateQuantity(itemId, item.selectedType, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="px-4 font-bold text-orange-600">{item.quantity}</span>
                            <button
                              className="px-3 py-1.5 hover:bg-orange-100 text-gray-700 font-semibold transition"
                              onClick={() => updateQuantity(itemId, item.selectedType, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Giá và nút xóa */}
                      <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1">Thành tiền</div>
                          <div className="text-xl font-bold text-orange-600">
                            {(item.price * item.quantity).toLocaleString()}₫
                          </div>
                        </div>
                        <button
                          className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium text-sm bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
                          onClick={() => removeFromCart(itemId, item.selectedType)}
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Tổng kết và thanh toán - 1 cột sticky */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span>💰</span> Tóm tắt đơn hàng
                </h2>

                {/* Chi tiết đã chọn */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Đã chọn</span>
                    <span className="font-semibold">{getSelectedTotalItems()} sản phẩm</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span className="font-semibold">{getSelectedTotalPrice().toLocaleString()}₫</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className="font-semibold text-green-600">Miễn phí</span>
                  </div>
                </div>

                {/* Tổng cộng */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 mb-6 border border-orange-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold text-lg">Tổng cộng</span>
                    <span className="text-2xl font-bold text-orange-600">
                      {getSelectedTotalPrice().toLocaleString()}₫
                    </span>
                  </div>
                </div>

                {/* Nút thanh toán */}
                <button
                  onClick={handleCheckout}
                  disabled={selectedItems.length === 0}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {selectedItems.length === 0
                    ? "Chọn sản phẩm để thanh toán"
                    : `Thanh toán (${selectedItems.length}) →`}
                </button>

                {/* Thông tin thêm */}
                <div className="mt-6 space-y-2 text-sm text-gray-500">
                  <div className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Miễn phí vận chuyển toàn quốc</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Đổi trả trong 7 ngày</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Thanh toán an toàn & bảo mật</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
