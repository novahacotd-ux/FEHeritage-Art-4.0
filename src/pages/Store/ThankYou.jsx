import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Trang cảm ơn sau thanh toán
export default function ThankYou() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Lấy thông tin đơn hàng từ localStorage
    try {
      const lastOrder = localStorage.getItem("lastOrder");
      if (lastOrder) {
        setOrder(JSON.parse(lastOrder));
      }
    } catch (error) {
      console.error("Error loading order:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Success Header */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center border-t-4 border-green-500"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="text-5xl">✅</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Thanh toán thành công!
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Cảm ơn bạn đã tin tưởng và ủng hộ Heritage Art 4.0
          </p>
          <p className="text-sm text-gray-500">
            Đơn hàng của bạn đang được xử lý và sẽ được giao sớm nhất có thể
          </p>
        </motion.div>

        {/* Order Details */}
        {order && (
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>📦</span> Thông tin đơn hàng
            </h2>
            
            {/* Order ID and Date */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="font-semibold text-gray-800">{order.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ngày đặt hàng:</span>
                <span className="font-semibold text-gray-800">
                  {new Date(order.createdAt).toLocaleString('vi-VN')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Phương thức thanh toán:</span>
                <span className="font-semibold text-gray-800">
                  {order.payment.method === 'momo' ? '🟣 Ví MoMo' : 
                   order.payment.method === 'bank' ? '🏦 Chuyển khoản' : 
                   '💳 Thẻ quốc tế'}
                </span>
              </div>
            </div>

            {/* Customer Info */}
            <div className="border-t pt-4 mb-4">
              <h3 className="font-semibold text-gray-800 mb-3">Thông tin người nhận</h3>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-600 w-32">Họ tên:</span>
                  <span className="font-medium text-gray-800">{order.customer.name}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600 w-32">Số điện thoại:</span>
                  <span className="font-medium text-gray-800">{order.customer.phone}</span>
                </div>
                {order.customer.email && (
                  <div className="flex gap-2">
                    <span className="text-gray-600 w-32">Email:</span>
                    <span className="font-medium text-gray-800">{order.customer.email}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  <span className="text-gray-600 w-32">Địa chỉ:</span>
                  <span className="font-medium text-gray-800">{order.customer.address}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-3">Sản phẩm đã mua</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm">{item.title}</div>
                      <div className="text-xs text-gray-500">
                        {item.selectedType} × {item.quantity}
                      </div>
                    </div>
                    <div className="font-semibold text-orange-600">
                      {(item.price * item.quantity).toLocaleString()}₫
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
                <span className="text-lg font-semibold text-gray-800">Tổng cộng</span>
                <span className="text-2xl font-bold text-orange-600">
                  {order.amounts.total.toLocaleString()}₫
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Support Message */}
        <motion.div 
          className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg p-6 text-white text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-2">💖 Cảm ơn sự đóng góp của bạn!</h3>
          <p className="text-orange-100 text-sm">
            5% tổng số tiền sẽ được dành tặng cho các Mẹ Việt Nam anh hùng và Anh hùng lực lượng vũ trang nhân dân
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            to="/mua-tranh-in"
            className="px-8 py-3 bg-white text-orange-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-orange-200 text-center"
          >
            🛍️ Tiếp tục mua sắm
          </Link>
          <Link
            to="/"
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all text-center"
          >
            🏠 Về trang chủ
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="mt-8 text-center text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="mb-2">Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ:</p>
          <div className="flex flex-wrap justify-center gap-4 text-orange-600 font-medium">
            <span>📧 support@heritage-art.vn</span>
            <span>📱 1900 xxxx</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}