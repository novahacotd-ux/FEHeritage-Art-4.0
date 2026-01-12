import React, { useState, useEffect, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Search, Eye, RefreshCw, CreditCard, CheckCircle, XCircle, Clock, RotateCcw } from 'lucide-react';
import * as orderService from '../../services/orderService';

const ITEMS_PER_PAGE = 10;

const STATUS_OPTIONS = [
    { value: 'Pending', label: 'Chờ thanh toán', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    { value: 'Completed', label: 'Đã thanh toán', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    { value: 'Failed', label: 'Thất bại', color: 'bg-red-100 text-red-700', icon: XCircle },
    { value: 'Refunded', label: 'Hoàn tiền', color: 'bg-purple-100 text-purple-700', icon: RotateCcw },
];

const PAYMENT_METHODS = ['Credit Card', 'Debit Card', 'Bank Transfer', 'E-Wallet', 'COD'];

const AdminThanhToan = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState('');
    const [filterMethod, setFilterMethod] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const fetchPayments = useCallback(async () => {
        setLoading(true);
        try {
            const params = { page: currentPage, limit: ITEMS_PER_PAGE };
            if (filterStatus) params.status = filterStatus;
            if (filterMethod) params.payment_method = filterMethod;

            const response = await orderService.getAllPayments(params);
            if (response.success) {
                setPayments(response.data.payments || []);
                setTotalPages(response.data.pagination?.totalPages || 1);
            }
        } catch (error) {
            toast.error('Lỗi tải danh sách thanh toán');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, filterStatus, filterMethod]);

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    const handleUpdateStatus = async (paymentId, newStatus) => {
        try {
            await orderService.updatePaymentStatus(paymentId, newStatus);
            toast.success(`Đã cập nhật trạng thái: ${newStatus}`);
            fetchPayments();
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
                    <CreditCard className="text-orange-500" /> Quản lý Thanh toán
                </h1>
                <p className="text-gray-500 text-sm mt-1">Theo dõi và xác nhận thanh toán từ đơn hàng</p>
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

                    {/* Method Filter */}
                    <select
                        value={filterMethod}
                        onChange={(e) => setFilterMethod(e.target.value)}
                        className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option value="">Tất cả phương thức</option>
                        {PAYMENT_METHODS.map((method) => (
                            <option key={method} value={method}>
                                {method}
                            </option>
                        ))}
                    </select>

                    <div className="flex-1" />

                    <button
                        onClick={fetchPayments}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> Làm mới
                    </button>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Mã thanh toán</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Đơn hàng</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Phương thức</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-700">Số tiền</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Ngày tạo</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-700">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500">
                                    <RefreshCw className="animate-spin mx-auto mb-2" /> Đang tải...
                                </td>
                            </tr>
                        ) : payments.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500">
                                    Không có thanh toán nào
                                </td>
                            </tr>
                        ) : (
                            payments.map((payment) => {
                                const statusStyle = getStatusStyle(payment.status);
                                return (
                                    <tr key={payment.payment_id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <span className="font-mono font-medium text-gray-800">#{payment.payment_id}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="font-mono text-gray-600">#{payment.order_id}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                                                {payment.payment_method}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right font-medium text-orange-600">
                                            {Number(payment.amount).toLocaleString()}₫
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 text-sm">
                                            {formatDate(payment.created_at)}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <select
                                                value={payment.status}
                                                onChange={(e) => handleUpdateStatus(payment.payment_id, e.target.value)}
                                                className={`px-2 py-1 rounded-lg text-xs font-medium border-0 outline-none cursor-pointer ${statusStyle.color}`}
                                            >
                                                {STATUS_OPTIONS.map((s) => (
                                                    <option key={s.value} value={s.value}>
                                                        {s.label}
                                                    </option>
                                                ))}
                                            </select>
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

            {/* Stats Summary */}
            <div className="mt-6 grid grid-cols-4 gap-4">
                {STATUS_OPTIONS.map((status) => {
                    const Icon = status.icon;
                    const count = payments.filter((p) => p.status === status.value).length;
                    return (
                        <div key={status.value} className={`${status.color} rounded-xl p-4`}>
                            <div className="flex items-center gap-2 mb-2">
                                <Icon size={20} />
                                <span className="font-medium">{status.label}</span>
                            </div>
                            <p className="text-2xl font-bold">{count}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminThanhToan;