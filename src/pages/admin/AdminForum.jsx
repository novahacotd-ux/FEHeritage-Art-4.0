import React, { useState } from 'react';
import { forumPosts as initialPosts } from '../../data/mockData';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Container fluid className="py-4 bg-light" style={{ minHeight: '100vh' }}>
            <Row className="mb-4">
                <Col>
                    <h1 className="fw-bold">Quản lý Forum</h1>
                    <p className="text-muted">Quản lý các bài đăng và thảo luận trên diễn đàn cộng đồng</p>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" size="lg" onClick={handleCreate}>
                        <i className="bi bi-plus-circle me-2"></i>
                        Thêm bài đăng mới
                    </Button>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={4}>
                    <InputGroup>
                        <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm bài đăng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={3}>
                    <Form.Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                        <option value="all">Tất cả danh mục</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">Tất cả trạng thái</option>
                        <option value="active">Đang hiển thị</option>
                        <option value="hidden">Đã ẩn</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row className="mb-4 g-3">
                <Col md={3}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h2 className="text-primary fw-bold">{forumList.length}</h2>
                            <Card.Text className="text-muted">Tổng bài đăng</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h2 className="text-primary fw-bold">{forumList.filter(p => p.status === 'active').length}</h2>
                            <Card.Text className="text-muted">Đang hiển thị</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h2 className="text-primary fw-bold">{forumList.filter(p => p.isPinned).length}</h2>
                            <Card.Text className="text-muted">Đã ghim</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h2 className="text-primary fw-bold">{forumList.reduce((sum, item) => sum + item.comments, 0)}</h2>
                            <Card.Text className="text-muted">Tổng bình luận</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                    <Table responsive hover className="mb-0">
                        <thead className="table-primary">
                            <tr>
                                <th>ID</th>
                                <th style={{ width: '30%' }}>Tiêu đề</th>
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
                                <tr key={item.id} className={item.isPinned ? 'table-warning' : ''}>
                                    <td>{item.id}</td>
                                    <td>
                                        <div>
                                            {item.isPinned && <span className="me-2">📌</span>}
                                            <strong className="d-block mb-1">{item.title}</strong>
                                            <small className="text-muted d-block mb-2">{item.content.substring(0, 100)}...</small>
                                            <div className="d-flex gap-1 flex-wrap">
                                                {item.tags.map((tag, idx) => (
                                                    <Badge key={idx} bg="secondary" className="small">{tag}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td><Badge bg="info">{item.category}</Badge></td>
                                    <td>
                                        <div className="d-flex gap-2 align-items-center">
                                            <img 
                                                src={item.author.avatar} 
                                                alt={item.author.name}
                                                style={{ 
                                                    width: '40px', 
                                                    height: '40px', 
                                                    borderRadius: '50%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <div>
                                                <strong className="d-block small">{item.author.name}</strong>
                                                <small className="text-muted">{item.author.role}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.views}</td>
                                    <td>{item.comments}</td>
                                    <td>
                                        <Badge bg={item.status === 'active' ? 'success' : 'danger'}>
                                            {item.status === 'active' ? 'Hiển thị' : 'Đã ẩn'}
                                        </Badge>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-1 flex-wrap">
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm" 
                                                onClick={() => handleTogglePin(item.id)}
                                                title={item.isPinned ? 'Bỏ ghim' : 'Ghim'}
                                            >
                                                {item.isPinned ? '📌' : '📍'}
                                            </Button>
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm" 
                                                onClick={() => handleToggleStatus(item.id)}
                                                title={item.status === 'active' ? 'Ẩn' : 'Hiện'}
                                            >
                                                {item.status === 'active' ? '👁️' : '🚫'}
                                            </Button>
                                            <Button variant="success" size="sm" onClick={() => handleEdit(item)}>Sửa</Button>
                                            <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Xóa</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="lg" centered>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title>{editingItem ? 'Chỉnh sửa bài đăng' : 'Thêm bài đăng mới'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tiêu đề <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Nhập tiêu đề bài đăng" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nội dung <span className="text-danger">*</span></Form.Label>
                            <Form.Control as="textarea" rows={8} name="content" value={formData.content} onChange={handleChange} required placeholder="Nhập nội dung bài đăng" />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Danh mục <span className="text-danger">*</span></Form.Label>
                                    <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                                        <option value="">Chọn danh mục</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Trạng thái <span className="text-danger">*</span></Form.Label>
                                    <Form.Select name="status" value={formData.status} onChange={handleChange} required>
                                        <option value="active">Hiển thị</option>
                                        <option value="hidden">Ẩn</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Tags (phân cách bằng dấu phẩy)</Form.Label>
                            <Form.Control type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="VD: Bảo tồn, Văn hóa, Du lịch" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                name="isPinned"
                                checked={formData.isPinned}
                                onChange={handleChange}
                                label="Ghim bài đăng (hiển thị ở đầu trang)"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="bg-light">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Hủy</Button>
                        <Button variant="primary" type="submit">{editingItem ? 'Cập nhật' : 'Tạo mới'}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default AdminForum;