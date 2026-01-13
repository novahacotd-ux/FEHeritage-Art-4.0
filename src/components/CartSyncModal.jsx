// src/components/CartSyncModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function CartSyncModal() {
    const { showSyncConfirm, pendingGuestCart, confirmSync, declineSync } = useCart();

    if (!showSyncConfirm) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={declineSync}
                />

                {/* Modal */}
                <motion.div
                    className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 z-10"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                >
                    {/* Icon */}
                    <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🛒</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Đồng bộ giỏ hàng?
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="text-center mb-6">
                        <p className="text-gray-600 mb-4">
                            Bạn có <span className="font-semibold text-orange-600">{pendingGuestCart.length} sản phẩm</span> trong giỏ hàng trước khi đăng nhập.
                        </p>
                        <p className="text-gray-500 text-sm">
                            Bạn có muốn thêm chúng vào giỏ hàng của tài khoản không?
                        </p>
                    </div>

                    {/* Preview items */}
                    {pendingGuestCart.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-6 max-h-32 overflow-y-auto">
                            {pendingGuestCart.slice(0, 3).map((item, index) => (
                                <div key={index} className="flex items-center gap-2 py-1 text-sm">
                                    <span className="text-gray-600">•</span>
                                    <span className="flex-1 truncate text-gray-700">{item.name || item.title}</span>
                                    <span className="text-gray-500">x{item.quantity}</span>
                                </div>
                            ))}
                            {pendingGuestCart.length > 3 && (
                                <p className="text-xs text-gray-400 mt-1">
                                    +{pendingGuestCart.length - 3} sản phẩm khác...
                                </p>
                            )}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={declineSync}
                            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
                        >
                            Bỏ qua
                        </button>
                        <button
                            onClick={confirmSync}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition shadow-lg"
                        >
                            Đồng bộ
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
