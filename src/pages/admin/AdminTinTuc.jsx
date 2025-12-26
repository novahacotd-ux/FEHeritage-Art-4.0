import React, { useState } from 'react';
import { news as initialNews } from '../../data/mockData';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Container fluid className="py-4 bg-light" style={{ minHeight: '100vh' }}>
            <Row className="mb-4">
                <Col>
                    <h1 className="fw-bold">Quản lý Tin tức</h1>
                    <p className="text-muted">Quản lý các bài viết tin tức về di sản văn hóa</p>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" size="lg" onClick={handleCreate}>
                        <i className="bi bi-plus-circle me-2"></i>
                        Thêm tin tức mới
                    </Button>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <InputGroup>
                        <InputGroup.Text>
                            <i className="bi bi-search"></i>
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm tin tức..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={3}>
                    <Form.Select 
                        value={filterCategory} 
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="all">Tất cả danh mục</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            <Row className="mb-4 g-3">
                <Col md={4}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h2 className="text-primary fw-bold">{newsList.length}</h2>
                            <Card.Text className="text-muted">Tổng tin tức</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h2 className="text-primary fw-bold">{categories.length}</h2>
                            <Card.Text className="text-muted">Danh mục</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h2 className="text-primary fw-bold">{filteredNews.length}</h2>
                            <Card.Text className="text-muted">Kết quả lọc</Card.Text>
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
                                <th style={{ width: '40%' }}>Tiêu đề</th>
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
                                        <div className="d-flex gap-3 align-items-start">
                                            {item.imageUrl && (
                                                <img 
                                                    src={item.imageUrl} 
                                                    alt={item.title} 
                                                    style={{ 
                                                        width: '80px', 
                                                        height: '60px', 
                                                        objectFit: 'cover',
                                                        borderRadius: '6px'
                                                    }}
                                                />
                                            )}
                                            <div>
                                                <strong className="d-block mb-1">{item.title}</strong>
                                                <small className="text-muted">{item.description}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td><Badge bg="info">{item.category}</Badge></td>
                                    <td>{item.author}</td>
                                    <td>{item.date}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button 
                                                variant="success" 
                                                size="sm" 
                                                onClick={() => handleEdit(item)}
                                            >
                                                Sửa
                                            </Button>
                                            <Button 
                                                variant="danger" 
                                                size="sm" 
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal 
                show={isModalOpen} 
                onHide={() => setIsModalOpen(false)} 
                size="lg"
                centered
            >
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title>{editingItem ? 'Chỉnh sửa tin tức' : 'Thêm tin tức mới'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tiêu đề <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Nhập tiêu đề tin tức"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả ngắn <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                placeholder="Nhập mô tả ngắn"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nội dung <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                placeholder="Nhập nội dung chi tiết"
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tác giả <span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        required
                                        placeholder="Tên tác giả"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Danh mục <span className="text-danger">*</span></Form.Label>
                                    <Form.Select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Chọn danh mục</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>URL hình ảnh</Form.Label>
                            <Form.Control
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="bg-light">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Hủy
                        </Button>
                        <Button variant="primary" type="submit">
                            {editingItem ? 'Cập nhật' : 'Tạo mới'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default AdminTinTuc;