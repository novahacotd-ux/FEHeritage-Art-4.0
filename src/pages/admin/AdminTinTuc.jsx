import React, { useState } from 'react';
import { news as initialNews } from '../../data/mockData';
import './AdminCongDong.css';

const AdminTinTuc = () => {
    const [newsList, setNewsList] = useState(initialNews);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        author: '',
        category: '',
        imageUrl: ''
    });

    const categories = ['Khảo cổ học', 'Di sản văn hóa', 'Nghệ thuật truyền thống', 'Triển lãm', 'Nghề truyền thống', 'Lễ hội', 'Kiến trúc'];

    const handleCreate = () => {
        setEditingItem(null);
        setFormData({
            title: '',
            description: '',
            content: '',
            author: '',
            category: '',
            imageUrl: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            description: item.description,
            content: item.content,
            author: item.author,
            category: item.category,
            imageUrl: item.imageUrl
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
            setNewsList(newsList.filter(item => item.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date().toLocaleDateString('vi-VN');
        
        if (editingItem) {
            setNewsList(newsList.map(item =>
                item.id === editingItem.id
                    ? { ...item, ...formData, date: currentDate }
                    : item
            ));
        } else {
            const newItem = {
                id: String(newsList.length + 1),
                ...formData,
                date: currentDate
            };
            setNewsList([newItem, ...newsList]);
        }
        
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const filteredNews = newsList.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="admin-cong-dong">
            <div className="admin-header">
                <div>
                    <h1>Quản lý Tin tức</h1>
                    <p>Quản lý các bài viết tin tức về di sản văn hóa</p>
                </div>
                <button className="btn-primary" onClick={handleCreate}>
                    <span>+</span> Thêm tin tức mới
                </button>
            </div>

            <div className="admin-filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm kiếm tin tức..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select 
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">Tất cả danh mục</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="admin-stats">
                <div className="stat-card">
                    <h3>{newsList.length}</h3>
                    <p>Tổng tin tức</p>
                </div>
                <div className="stat-card">
                    <h3>{categories.length}</h3>
                    <p>Danh mục</p>
                </div>
                <div className="stat-card">
                    <h3>{filteredNews.length}</h3>
                    <p>Kết quả lọc</p>
                </div>
            </div>

            <div className="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tiêu đề</th>
                            <th>Danh mục</th>
                            <th>Tác giả</th>
                            <th>Ngày đăng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredNews.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <div className="table-title">
                                        {item.imageUrl && (
                                            <img src={item.imageUrl} alt={item.title} className="table-thumbnail" />
                                        )}
                                        <div>
                                            <strong>{item.title}</strong>
                                            <p className="table-desc">{item.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td><span className="badge">{item.category}</span></td>
                                <td>{item.author}</td>
                                <td>{item.date}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn-edit" onClick={() => handleEdit(item)}>Sửa</button>
                                        <button className="btn-delete" onClick={() => handleDelete(item.id)}>Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingItem ? 'Chỉnh sửa tin tức' : 'Thêm tin tức mới'}</h2>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Tiêu đề *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Nhập tiêu đề tin tức"
                                />
                            </div>
                            <div className="form-group">
                                <label>Mô tả ngắn *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="2"
                                    placeholder="Nhập mô tả ngắn"
                                />
                            </div>
                            <div className="form-group">
                                <label>Nội dung *</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    placeholder="Nhập nội dung chi tiết"
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Tác giả *</label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        required
                                        placeholder="Tên tác giả"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Danh mục *</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>URL hình ảnh</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                                    Hủy
                                </button>
                                <button type="submit" className="btn-primary">
                                    {editingItem ? 'Cập nhật' : 'Tạo mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTinTuc;