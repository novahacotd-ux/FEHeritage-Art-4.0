import React, { useState } from 'react';
import { forumPosts as initialPosts } from '../../data/mockData';
import './AdminCongDong.css';

const AdminForum = () => {
    const [forumList, setForumList] = useState(initialPosts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        tags: '',
        status: 'active',
        isPinned: false
    });

    const categories = ['Bảo tồn', 'Du lịch di sản', 'Học hỏi', 'Nghệ thuật', 'Tín ngưỡng', 'Công nghệ', 'Thảo luận chung'];

    const handleCreate = () => {
        setEditingItem(null);
        setFormData({
            title: '',
            content: '',
            category: '',
            tags: '',
            status: 'active',
            isPinned: false
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            content: item.content,
            category: item.category,
            tags: item.tags.join(', '),
            status: item.status,
            isPinned: item.isPinned || false
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
            setForumList(forumList.filter(item => item.id !== id));
        }
    };

    const handleTogglePin = (id) => {
        setForumList(forumList.map(item =>
            item.id === id ? { ...item, isPinned: !item.isPinned } : item
        ));
    };

    const handleToggleStatus = (id) => {
        setForumList(forumList.map(item =>
            item.id === id 
                ? { ...item, status: item.status === 'active' ? 'hidden' : 'active' } 
                : item
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString();
        const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        
        if (editingItem) {
            setForumList(forumList.map(item =>
                item.id === editingItem.id
                    ? { 
                        ...item, 
                        title: formData.title,
                        content: formData.content,
                        category: formData.category,
                        tags: tagsArray,
                        status: formData.status,
                        isPinned: formData.isPinned,
                        updatedAt: currentDate
                    }
                    : item
            ));
        } else {
            const newItem = {
                id: String(forumList.length + 1),
                title: formData.title,
                content: formData.content,
                author: {
                    id: 'admin',
                    name: 'Admin',
                    avatar: 'https://i.pravatar.cc/150?img=1',
                    role: 'Quản trị viên'
                },
                category: formData.category,
                tags: tagsArray,
                createdAt: currentDate,
                updatedAt: currentDate,
                views: 0,
                likes: 0,
                comments: 0,
                status: formData.status,
                isPinned: formData.isPinned
            };
            setForumList([newItem, ...forumList]);
        }
        
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const filteredForum = forumList.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <div className="admin-cong-dong">
            <div className="admin-header">
                <div>
                    <h1>Quản lý Forum</h1>
                    <p>Quản lý các bài đăng và thảo luận trên diễn đàn cộng đồng</p>
                </div>
                <button className="btn-primary" onClick={handleCreate}>
                    <span>+</span> Thêm bài đăng mới
                </button>
            </div>

            <div className="admin-filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm kiếm bài đăng..."
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
                <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="active">Đang hiển thị</option>
                    <option value="hidden">Đã ẩn</option>
                </select>
            </div>

            <div className="admin-stats">
                <div className="stat-card">
                    <h3>{forumList.length}</h3>
                    <p>Tổng bài đăng</p>
                </div>
                <div className="stat-card">
                    <h3>{forumList.filter(p => p.status === 'active').length}</h3>
                    <p>Đang hiển thị</p>
                </div>
                <div className="stat-card">
                    <h3>{forumList.filter(p => p.isPinned).length}</h3>
                    <p>Đã ghim</p>
                </div>
                <div className="stat-card">
                    <h3>{forumList.reduce((sum, item) => sum + item.comments, 0)}</h3>
                    <p>Tổng bình luận</p>
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
                            <th>Lượt xem</th>
                            <th>Bình luận</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredForum.map(item => (
                            <tr key={item.id} className={item.isPinned ? 'pinned-row' : ''}>
                                <td>{item.id}</td>
                                <td>
                                    <div className="table-title">
                                        <div>
                                            {item.isPinned && <span className="pin-badge">📌</span>}
                                            <strong>{item.title}</strong>
                                            <p className="table-desc">{item.content.substring(0, 100)}...</p>
                                            <div className="tags">
                                                {item.tags.map((tag, idx) => (
                                                    <span key={idx} className="tag">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className="badge">{item.category}</span></td>
                                <td>
                                    <div className="author-info">
                                        <img src={item.author.avatar} alt={item.author.name} className="author-avatar" />
                                        <div>
                                            <strong>{item.author.name}</strong>
                                            <p className="author-role">{item.author.role}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.views}</td>
                                <td>{item.comments}</td>
                                <td>
                                    <span className={`status-badge ${item.status}`}>
                                        {item.status === 'active' ? 'Hiển thị' : 'Đã ẩn'}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            className="btn-pin" 
                                            onClick={() => handleTogglePin(item.id)}
                                            title={item.isPinned ? 'Bỏ ghim' : 'Ghim'}
                                        >
                                            {item.isPinned ? '📌' : '📍'}
                                        </button>
                                        <button 
                                            className="btn-toggle" 
                                            onClick={() => handleToggleStatus(item.id)}
                                            title={item.status === 'active' ? 'Ẩn' : 'Hiện'}
                                        >
                                            {item.status === 'active' ? '👁️' : '🚫'}
                                        </button>
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
                            <h2>{editingItem ? 'Chỉnh sửa bài đăng' : 'Thêm bài đăng mới'}</h2>
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
                                    placeholder="Nhập tiêu đề bài đăng"
                                />
                            </div>
                            <div className="form-group">
                                <label>Nội dung *</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    required
                                    rows="8"
                                    placeholder="Nhập nội dung bài đăng"
                                />
                            </div>
                            <div className="form-row">
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
                                <div className="form-group">
                                    <label>Trạng thái *</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="active">Hiển thị</option>
                                        <option value="hidden">Ẩn</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Tags (phân cách bằng dấu phẩy)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder="VD: Bảo tồn, Văn hóa, Du lịch"
                                />
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="isPinned"
                                        checked={formData.isPinned}
                                        onChange={handleChange}
                                    />
                                    <span>Ghim bài đăng (hiển thị ở đầu trang)</span>
                                </label>
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

export default AdminForum;