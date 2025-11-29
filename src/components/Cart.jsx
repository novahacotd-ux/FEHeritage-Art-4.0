import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  // Lấy các hàm và state từ context
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  const navigate = useNavigate();

  // Xử lý chuyển sang trang thanh toán
  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header: Back, Title, Clear */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/mua-tranh-in')}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-100 px-4 py-2 text-orange-700 font-semibold hover:bg-orange-200 transition"
          >
            <span className="text-xl">←</span> Quay lại mua tranh
          </button>
          <h1 className="text-2xl font-bold text-gray-800 ml-4">
            🛒 Giỏ hàng ({getTotalItems()} sản phẩm)
          </h1>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm rounded-lg bg-red-50 px-3 py-2 font-medium text-red-600 hover:bg-red-100"
            >
              Xóa toàn bộ
            </button>
          )}
        </div>

        {/* Nếu giỏ hàng rỗng */}
        {cart.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="mb-4 text-gray-600">Giỏ hàng trống. Hãy thêm sản phẩm trước khi thanh toán.</p>
            <Link
              to="/mua-tranh-in"
              className="inline-block rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 font-medium text-white shadow hover:from-orange-600 hover:to-amber-600"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <>
            {/* Danh sách sản phẩm trong giỏ */}
            <div className="rounded-xl border bg-white p-6 shadow-sm mb-8">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedType}`}
                  className="flex items-center gap-4 border-b last:border-b-0 py-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 truncate">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.selectedType}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Giảm số lượng"
                      className="px-3 py-1.5 text-gray-700 hover:bg-gray-50"
                      onClick={() => updateQuantity(item.id, item.selectedType, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      className="w-14 border-x border-orange-400 text-orange-700 py-1.5 text-center outline-none focus:ring-2 focus:ring-orange-300 bg-white"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, item.selectedType, Number(e.target.value))}
                    />
                    <button
                      aria-label="Tăng số lượng"
                      className="px-3 py-1.5 text-gray-700 hover:bg-gray-50"
                      onClick={() => updateQuantity(item.id, item.selectedType, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="w-24 text-right font-semibold text-gray-800">
                    {(item.price * item.quantity).toLocaleString()}₫
                  </div>
                  <button
                    aria-label="Xóa sản phẩm"
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => removeFromCart(item.id, item.selectedType)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Tổng kết và thanh toán */}
            <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col items-end">
              <div className="mb-4 w-full flex items-center justify-between text-lg">
                <span className="font-semibold text-gray-700">Tổng cộng</span>
                <span className="font-bold text-orange-600 text-2xl">{getTotalPrice().toLocaleString()}₫</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full md:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold shadow hover:from-orange-600 hover:to-amber-600 transition disabled:opacity-60"
              >
                Thanh toán
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
