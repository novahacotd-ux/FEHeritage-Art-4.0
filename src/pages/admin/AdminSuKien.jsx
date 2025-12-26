import React, { useState } from 'react';
import { events as initialEvents } from '../../data/mockData';
import './AdminCongDong.css';

const AdminSuKien = () => {
    const [eventsList, setEventsList] = useState(initialEvents);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        shortIntro: '',
        content: '',
        date: '',
        time: '',
        location: '',
        imageUrl: ''
    });

    const handleCreate = () => {
        setEditingItem(null);
        setFormData({
            title: '',
            description: '',
            shortIntro: '',
            content: '',
            date: '',
            time: '',
            location: '',
            imageUrl: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            description: item.description,
            shortIntro: item.shortIntro || '',
            content: item.content,
            date: item.date,
            time: item.time,
            location: item.location || '',
            imageUrl: item.imageUrl
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sự kiện này?')) {
            setEventsList(eventsList.filter(item => item.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingItem) {
            setEventsList(eventsList.map(item =>
                item.id === editingItem.id
                    ? { ...item, ...formData }
                    : item
            ));
        } else {
            const newItem = {
                id: String(eventsList.length + 1),
                ...formData,
                theme: '',
                timeline: [],
                rules: [],
                requirements: [],
                criteria: [],
                judges: '',
                prizes: [],
                faq: []
            };
            setEventsList([newItem, ...eventsList]);
        }
        
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const filteredEvents = eventsList.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-cong-dong">
            <div className="admin-header">
                <div>
                    <h1>Quản lý Sự kiện</h1>
                    <p>Quản lý các sự kiện văn hóa, triển lãm và hoạt động cộng đồng</p>
                </div>
                <button className="btn-primary" onClick={handleCreate}>
                    <span>+</span> Thêm sự kiện mới
                </button>
            </div>

            <div className="admin-filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sự kiện..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="admin-stats">
                <div className="stat-card">
                    <h3>{eventsList.length}</h3>
                    <p>Tổng sự kiện</p>
                </div>
                <div className="stat-card">
                    <h3>{eventsList.filter(e => new Date(e.date.split('/').reverse().join('-')) >= new Date()).length}</h3>
                    <p>Sắp diễn ra</p>
                </div>
                <div className="stat-card">
                    <h3>{filteredEvents.length}</h3>
                    <p>Kết quả lọc</p>
                </div>
            </div>

            <div className="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tiêu đề</th>
                            <th>Ngày</th>
                            <th>Thời gian</th>
                            <th>Địa điểm</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEvents.map(item => (
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
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>{item.location}</td>
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
                            <h2>{editingItem ? 'Chỉnh sửa sự kiện' : 'Thêm sự kiện mới'}</h2>
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
                                    placeholder="Nhập tiêu đề sự kiện"
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
                                <label>Giới thiệu</label>
                                <textarea
                                    name="shortIntro"
                                    value={formData.shortIntro}
                                    onChange={handleChange}
                                    rows="2"
                                    placeholder="Giới thiệu chi tiết về sự kiện"
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
                                    <label>Ngày *</label>
                                    <input
                                        type="text"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        placeholder="DD/MM/YYYY"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Thời gian *</label>
                                    <input
                                        type="text"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                        placeholder="VD: 08:00 - 17:00"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Địa điểm</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Địa điểm tổ chức"
                                />
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

export default AdminSuKien;