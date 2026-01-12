import React, { useState, useEffect, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Search, Plus, Edit2, Trash2, X, Save, Package, RefreshCw } from 'lucide-react';
import * as storeService from '../../services/storeService';

const ITEMS_PER_PAGE = 10;

const STATUS_OPTIONS = ['Active', 'Inactive', 'Out of Stock'];

const AdminSanPham = () => {
    // State management
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [topics, setTopics] = useState([]);
    const [styles, setStyles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category_id: '',
        topic_id: '',
        style_id: '',
        price: '',
        stock_quantity: '',
        image: '',
        status: 'Active',
    });

    // Fetch data
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params = { page: currentPage, limit: ITEMS_PER_PAGE };
            if (searchTerm) params.search = searchTerm;
            if (filterCategory) params.category_id = filterCategory;
            if (filterStatus) params.status = filterStatus;

            const response = await storeService.getProducts(params);
            if (response.success) {
                setProducts(response.data.products || []);
                setTotalPages(response.data.pagination?.totalPages || 1);
            }
        } catch (error) {
            toast.error('Lỗi tải danh sách sản phẩm');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchTerm, filterCategory, filterStatus]);

    const fetchFilters = async () => {
        try {
            const [catRes, topicRes, styleRes] = await Promise.all([
                storeService.getCategories({ limit: 100 }),
                storeService.getTopics({ limit: 100 }),
                storeService.getStyles({ limit: 100 }),
            ]);
            if (catRes.success) setCategories(catRes.data.categories || []);
            if (topicRes.success) setTopics(topicRes.data.topics || []);
            if (styleRes.success) setStyles(styleRes.data.styles || []);
        } catch (error) {
            console.error('Error fetching filters:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        fetchFilters();
    }, []);

    // Handlers
    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                category_id: product.category?.category_id || '',
                topic_id: product.topic?.topic_id || '',
                style_id: product.style?.style_id || '',
                price: product.price,
                stock_quantity: product.stock_quantity,
                image: product.image || '',
                status: product.status,
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                category_id: categories[0]?.category_id || '',
                topic_id: '',
                style_id: '',
                price: '',
                stock_quantity: 0,
                image: '',
                status: 'Active',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.category_id || !formData.price) {
            toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        try {
            const data = {
                name: formData.name,
                category_id: Number(formData.category_id),
                topic_id: formData.topic_id ? Number(formData.topic_id) : null,
                style_id: formData.style_id ? Number(formData.style_id) : null,
                price: Number(formData.price),
                stock_quantity: Number(formData.stock_quantity) || 0,
                image: formData.image,
                status: formData.status,
            };

            if (editingProduct) {
                await storeService.updateProduct(editingProduct.product_id, data);
                toast.success('Cập nhật sản phẩm thành công!');
            } else {
                await storeService.createProduct(data);
                toast.success('Thêm sản phẩm thành công!');
            }

            handleCloseModal();
            fetchProducts();
        } catch (error) {
            toast.error(error.message || 'Có lỗi xảy ra');
        }
    };

    const handleDelete = async (product) => {
        if (!window.confirm(`Bạn có chắc muốn xóa "${product.name}"?`)) return;

        try {
            await storeService.deleteProduct(product.product_id);
            toast.success('Đã xóa sản phẩm');
            fetchProducts();
        } catch (error) {
            toast.error(error.message || 'Lỗi xóa sản phẩm');
        }
    };

    const handleUpdateStock = async (product, newStock) => {
        try {
            await storeService.updateProductStock(product.product_id, newStock);
            toast.success('Cập nhật tồn kho thành công');
            fetchProducts();
        } catch (error) {
            toast.error(error.message || 'Lỗi cập nhật tồn kho');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Package className="text-orange-500" /> Quản lý Sản phẩm
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý danh sách sản phẩm trong cửa hàng</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition shadow"
                >
                    <Plus size={18} /> Thêm sản phẩm
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Search */}
                    <div className="relative flex-1 min-w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 outline-none"
                        />
                    </div>

                    {/* Category Filter */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option value="">Tất cả danh mục</option>
                        {categories.map((cat) => (
                            <option key={cat.category_id} value={cat.category_id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <option value="">Tất cả trạng thái</option>
                        {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>

                    {/* Refresh */}
                    <button
                        onClick={fetchProducts}
                        className="p-2 border rounded-lg hover:bg-gray-100 transition"
                        title="Làm mới"
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Sản phẩm</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Danh mục</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-700">Giá</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-700">Tồn kho</th>
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
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-10 text-gray-500">
                                    Không có sản phẩm nào
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.product_id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover rounded-lg"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <Package className="text-gray-400" size={20} />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-gray-800">{product.name}</p>
                                                <p className="text-xs text-gray-500">ID: {product.product_id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">{product.category?.name || '-'}</td>
                                    <td className="py-3 px-4 text-right font-medium text-orange-600">
                                        {Number(product.price).toLocaleString()}₫
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <input
                                            type="number"
                                            min="0"
                                            value={product.stock_quantity}
                                            onChange={(e) => handleUpdateStock(product, parseInt(e.target.value) || 0)}
                                            className="w-16 text-center border rounded px-2 py-1 focus:ring-2 focus:ring-orange-300 outline-none"
                                        />
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${product.status === 'Active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : product.status === 'Inactive'
                                                        ? 'bg-gray-100 text-gray-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenModal(product)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                title="Sửa"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="Xóa"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 py-4 border-t">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Trước
                        </button>
                        <span className="text-sm text-gray-600">
                            Trang {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sau
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-orange-500 to-amber-500">
                            <h2 className="text-lg font-bold text-white">
                                {editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
                            </h2>
                            <button onClick={handleCloseModal} className="text-white hover:bg-white/20 p-1 rounded">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên sản phẩm <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Danh mục <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.category_id}
                                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                    required
                                >
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((cat) => (
                                        <option key={cat.category_id} value={cat.category_id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Topic */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đề</label>
                                    <select
                                        value={formData.topic_id}
                                        onChange={(e) => setFormData({ ...formData, topic_id: e.target.value })}
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                    >
                                        <option value="">Không chọn</option>
                                        {topics.map((topic) => (
                                            <option key={topic.topic_id} value={topic.topic_id}>
                                                {topic.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Style */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phong cách</label>
                                    <select
                                        value={formData.style_id}
                                        onChange={(e) => setFormData({ ...formData, style_id: e.target.value })}
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                    >
                                        <option value="">Không chọn</option>
                                        {styles.map((style) => (
                                            <option key={style.style_id} value={style.style_id}>
                                                {style.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Giá (₫) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                        required
                                    />
                                </div>

                                {/* Stock */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tồn kho</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.stock_quantity}
                                        onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                    />
                                </div>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL Hình ảnh</label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                    placeholder="https://..."
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                >
                                    {STATUS_OPTIONS.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition"
                                >
                                    <Save size={16} /> {editingProduct ? 'Cập nhật' : 'Thêm mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSanPham;