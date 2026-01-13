import React, { useState, useEffect, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Search, Eye, RefreshCw, ShoppingBag, Truck, Package, CheckCircle, XCircle } from 'lucide-react';
import * as orderService from '../../services/orderService';

const ITEMS_PER_PAGE = 10;

const STATUS_OPTIONS = [
    { value: 'Pending', label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-700', icon: Package },
    { value: 'Processing', label: 'Đang xử lý', color: 'bg-blue-100 text-blue-700', icon: RefreshCw },
    { value: 'Shipped', label: 'Đang giao', color: 'bg-purple-100 text-purple-700', icon: Truck },
    { value: 'Delivered', label: 'Đã giao', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    { value: 'Cancelled', label: 'Đã hủy', color: 'bg-red-100 text-red-700', icon: XCircle },
];

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const params = { page: currentPage, limit: ITEMS_PER_PAGE };
            if (filterStatus) params.status = filterStatus;

            const response = await orderService.getAllOrders(params);
            if (response.success) {
                setOrders(response.data.orders || []);
                setTotalPages(response.data.pagination?.totalPages || 1);
            }
        } catch (error) {
            toast.error('Lỗi tải danh sách đơn hàng');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, filterStatus]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleViewDetail = async (order) => {
        try {
            const response = await orderService.getOrderById(order.order_id);
            if (response.success) {
                setSelectedOrder(response.data.order);
                setIsDetailOpen(true);
            }
        } catch (error) {
            toast.error('Lỗi tải chi tiết đơn hàng');
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await orderService.updateOrderStatus(orderId, newStatus);
            toast.success(`Đã cập nhật trạng thái: ${newStatus}`);
            fetchOrders();
            if (selectedOrder?.order_id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (error) {
            toast.error(error.message || 'Lỗi cập nhật trạng thái');
        }
    };

    const getStatusStyle = (status) => {
        return STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleString('vi-VN');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <ShoppingBag className="text-orange-500" /> Quản lý Đơn hàng
                </h1>
                <p className="text-gray-500 text-sm mt-1">Theo dõi và xử lý đơn hàng từ khách hàng</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option value="">Tất cả trạng thái</option>
                        {STATUS_OPTIONS.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>

                    <div className="flex-1" />

                    <button
                        onClick={fetchOrders}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Làm mới
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Mã đơn</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Khách hàng</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Ngày đặt</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-700">Tổng tiền</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-700">Trạng thái</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-700">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500">
                                    <RefreshCw className="animate-spin mx-auto mb-2" /> Đang tải...
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500">
                                    Không có đơn hàng nào
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => {
                                const statusStyle = getStatusStyle(order.status);
                                return (
                                    <tr key={order.order_id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <span className="font-mono font-medium text-gray-800">#{order.order_id}</span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">
                                            {order.user?.email || `User #${order.user_id}`}
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 text-sm">
                                            {formatDate(order.order_date)}
                                        </td>
                                        <td className="py-3 px-4 text-right font-medium text-orange-600">
                                            {Number(order.total_price).toLocaleString()}₫
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleUpdateStatus(order.order_id, e.target.value)}
                                                className={`px-2 py-1 rounded-lg text-xs font-medium border-0 outline-none cursor-pointer ${statusStyle.color}`}
                                            >
                                                {STATUS_OPTIONS.map((s) => (
                                                    <option key={s.value} value={s.value}>
                                                        {s.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleViewDetail(order)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                    title="Xem chi tiết"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 py-4 border-t">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                        >
                            Trước
                        </button>
                        <span className="text-sm text-gray-600">
                            Trang {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                        >
                            Sau
                        </button>
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            {isDetailOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-orange-500 to-amber-500">
                            <h2 className="text-lg font-bold text-white">
                                Chi tiết đơn hàng #{selectedOrder.order_id}
                            </h2>
                            <button
                                onClick={() => setIsDetailOpen(false)}
                                className="text-white hover:bg-white/20 p-1 rounded"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-4">
                            {/* Order Info */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Trạng thái:</span>
                                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getStatusStyle(selectedOrder.status).color}`}>
                                        {getStatusStyle(selectedOrder.status).label}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Ngày đặt:</span>
                                    <span className="ml-2">{formatDate(selectedOrder.order_date)}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Ngày giao dự kiến:</span>
                                    <span className="ml-2">{formatDate(selectedOrder.receive_date)}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Ghi chú:</span>
                                    <span className="ml-2">{selectedOrder.note || '-'}</span>
                                </div>
                            </div>

                            {/* Address */}
                            {selectedOrder.address && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="font-medium text-gray-800 mb-1">Địa chỉ giao hàng</p>
                                    <p className="text-sm text-gray-600">{selectedOrder.address.address}</p>
                                    <p className="text-sm text-gray-500">{selectedOrder.address.phone}</p>
                                </div>
                            )}

                            {/* Order Items */}
                            <div>
                                <p className="font-medium text-gray-800 mb-2">Sản phẩm</p>
                                <div className="space-y-2">
                                    {selectedOrder.orderDetails?.map((item) => (
                                        <div
                                            key={item.order_detail_id}
                                            className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
                                        >
                                            {item.product?.image && (
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">{item.product?.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {Number(item.price).toLocaleString()}₫ × {item.quantity}
                                                </p>
                                            </div>
                                            <p className="font-medium text-orange-600">
                                                {(Number(item.price) * item.quantity).toLocaleString()}₫
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center pt-4 border-t">
                                <span className="text-lg font-bold text-gray-800">Tổng cộng</span>
                                <span className="text-xl font-bold text-orange-600">
                                    {Number(selectedOrder.total_price).toLocaleString()}₫
                                </span>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t bg-gray-50">
                            <button
                                onClick={() => setIsDetailOpen(false)}
                                className="w-full py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition font-medium"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrder;