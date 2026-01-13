import React, { useState, useEffect, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Search, Plus, Edit2, Trash2, X, Save, FolderTree, Tag, Palette, RefreshCw } from 'lucide-react';
import * as storeService from '../../services/storeService';

const ITEMS_PER_PAGE = 10;
const TABS = [
    { id: 'categories', label: 'Danh mục', icon: FolderTree },
    { id: 'topics', label: 'Chủ đề', icon: Tag },
    { id: 'styles', label: 'Phong cách', icon: Palette },
];

const AdminDanhMuc = () => {
    const [activeTab, setActiveTab] = useState('categories');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ name: '', status: 'Active' });

    const getService = () => {
        switch (activeTab) {
            case 'categories':
                return {
                    get: storeService.getCategories,
                    create: storeService.createCategory,
                    update: storeService.updateCategory,
                    delete: storeService.deleteCategory,
                    dataKey: 'categories',
                    idKey: 'category_id',
                };
            case 'topics':
                return {
                    get: storeService.getTopics,
                    create: storeService.createTopic,
                    update: storeService.updateTopic,
                    delete: storeService.deleteTopic,
                    dataKey: 'topics',
                    idKey: 'topic_id',
                };
            case 'styles':
                return {
                    get: storeService.getStyles,
                    create: storeService.createStyle,
                    update: storeService.updateStyle,
                    delete: storeService.deleteStyle,
                    dataKey: 'styles',
                    idKey: 'style_id',
                };
            default:
                return null;
        }
    };

    const fetchItems = useCallback(async () => {
        const service = getService();
        if (!service) return;

        setLoading(true);
        try {
            const params = { page: currentPage, limit: ITEMS_PER_PAGE };
            if (searchTerm) params.search = searchTerm;

            const response = await service.get(params);
            if (response.success) {
                setItems(response.data[service.dataKey] || []);
                setTotalPages(response.data.pagination?.totalPages || 1);
            }
        } catch (error) {
            toast.error('Lỗi tải dữ liệu');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [activeTab, currentPage, searchTerm]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    useEffect(() => {
        setCurrentPage(1);
        setSearchTerm('');
    }, [activeTab]);

    const handleOpenModal = (item = null) => {
        const service = getService();
        if (item) {
            setEditingItem(item);
            setFormData({ name: item.name, status: item.status });
        } else {
            setEditingItem(null);
            setFormData({ name: '', status: 'Active' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const service = getService();
        if (!formData.name.trim()) {
            toast.error('Vui lòng nhập tên');
            return;
        }

        try {
            if (editingItem) {
                await service.update(editingItem[service.idKey], formData);
                toast.success('Cập nhật thành công!');
            } else {
                await service.create(formData);
                toast.success('Thêm mới thành công!');
            }
            handleCloseModal();
            fetchItems();
        } catch (error) {
            toast.error(error.message || 'Có lỗi xảy ra');
        }
    };

    const handleDelete = async (item) => {
        const service = getService();
        if (!window.confirm(`Bạn có chắc muốn xóa "${item.name}"?`)) return;

        try {
            await service.delete(item[service.idKey]);
            toast.success('Đã xóa thành công');
            fetchItems();
        } catch (error) {
            toast.error(error.message || 'Không thể xóa (có thể đang được sử dụng)');
        }
    };

    const getTabLabel = () => {
        const tab = TABS.find((t) => t.id === activeTab);
        return tab?.label || '';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FolderTree className="text-orange-500" /> Quản lý Danh mục
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Quản lý danh mục, chủ đề và phong cách sản phẩm
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow'
                                    : 'bg-white border hover:bg-gray-50'
                                }`}
                        >
                            <Icon size={18} /> {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow p-4 mb-6">
                <div className="flex gap-4 items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder={`Tìm kiếm ${getTabLabel().toLowerCase()}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-300 outline-none"
                        />
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition shadow"
                    >
                        <Plus size={18} /> Thêm mới
                    </button>
                    <button
                        onClick={fetchItems}
                        className="p-2 border rounded-lg hover:bg-gray-100 transition"
                        title="Làm mới"
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Tên</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-700">Trạng thái</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-700">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-10 text-gray-500">
                                    <RefreshCw className="animate-spin mx-auto mb-2" /> Đang tải...
                                </td>
                            </tr>
                        ) : items.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-10 text-gray-500">
                                    Không có dữ liệu
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => {
                                const service = getService();
                                return (
                                    <tr key={item[service.idKey]} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-gray-500">{item[service.idKey]}</td>
                                        <td className="py-3 px-4 font-medium text-gray-800">{item.name}</td>
                                        <td className="py-3 px-4 text-center">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(item)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                    title="Sửa"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    title="Xóa"
                                                >
                                                    <Trash2 size={16} />
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-orange-500 to-amber-500">
                            <h2 className="text-lg font-bold text-white">
                                {editingItem ? `Sửa ${getTabLabel()}` : `Thêm ${getTabLabel()}`}
                            </h2>
                            <button onClick={handleCloseModal} className="text-white hover:bg-white/20 p-1 rounded">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

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
                                    <Save size={16} /> {editingItem ? 'Cập nhật' : 'Thêm mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDanhMuc;
