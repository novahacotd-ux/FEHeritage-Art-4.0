import React, { useState } from 'react';
import { analysis as initialAnalysis } from '../../data/mockData';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPhanTich = () => {
    const [analysisList, setAnalysisList] = useState(initialAnalysis);
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
        tags: '',
        imageUrl: ''
    });

    const categories = ['Kiến trúc', 'Văn hóa ẩm thực', 'Nghệ thuật', 'Tín ngưỡng', 'Âm nhạc', 'Lịch sử', 'Văn học'];

    const handleCreate = () => {
        setEditingItem(null);
        setFormData({
            title: '',
            description: '',
            content: '',
            author: '',
            category: '',
            tags: '',
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
            tags: item.tags.join(', '),
            imageUrl: item.imageUrl
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài phân tích này?')) {
            setAnalysisList(analysisList.filter(item => item.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date().toLocaleDateString('vi-VN');
        const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        
        if (editingItem) {
            setAnalysisList(analysisList.map(item =>
                item.id === editingItem.id
                    ? { ...item, ...formData, tags: tagsArray, date: currentDate, views: item.views, likes: item.likes }
                    : item
            ));
        } else {
            const newItem = {
                id: String(analysisList.length + 1),
                ...formData,
                tags: tagsArray,
                date: currentDate,
                views: 0,
                likes: 0
            };
            setAnalysisList([newItem, ...analysisList]);
        }
        
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const filteredAnalysis = analysisList.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <Container fluid className="py-4 bg-light" style={{ minHeight: '100vh' }}>
            <Row className="mb-4">
                <Col>
                    <h1 className="fw-bold">Quản lý Phân tích</h1>
                    <p className="text-muted">Quản lý các bài phân tích chuyên sâu về văn hóa và di sản</p>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" size="lg" onClick={handleCreate}>
                        <i className="bi bi-plus-circle me-2"></i>
                        Thêm bài phân tích mới
                    </Button>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <InputGroup>
                        <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm bài phân tích..."
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
            </Row>

            <Row className="mb-4 g-3">
                <Col md={4}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h2 className="text-primary fw-bold">{analysisList.length}</h2>
                            <Card.Text className="text-muted">Tổng bài phân tích</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h2 className="text-primary fw-bold">{analysisList.reduce((sum, item) => sum + item.views, 0)}</h2>
                            <Card.Text className="text-muted">Tổng lượt xem</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h2 className="text-primary fw-bold">{filteredAnalysis.length}</h2>
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
                                <th style={{ width: '35%' }}>Tiêu đề</th>
                                <th>Danh mục</th>
                                <th>Tác giả</th>
                                <th>Lượt xem</th>
                                <th>Lượt thích</th>
                                <th>Ngày đăng</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAnalysis.map(item => (
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
                                                <small className="text-muted d-block mb-2">{item.description}</small>
                                                <div className="d-flex gap-1 flex-wrap">
                                                    {item.tags.map((tag, idx) => (
                                                        <Badge key={idx} bg="secondary" className="small">{tag}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><Badge bg="info">{item.category}</Badge></td>
                                    <td>{item.author}</td>
                                    <td>{item.views}</td>
                                    <td>{item.likes}</td>
                                    <td>{item.date}</td>
                                    <td>
                                        <div className="d-flex gap-2">
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
                    <Modal.Title>{editingItem ? 'Chỉnh sửa bài phân tích' : 'Thêm bài phân tích mới'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tiêu đề <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Nhập tiêu đề bài phân tích" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả ngắn <span className="text-danger">*</span></Form.Label>
                            <Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleChange} required placeholder="Nhập mô tả ngắn" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nội dung <span className="text-danger">*</span></Form.Label>
                            <Form.Control as="textarea" rows={8} name="content" value={formData.content} onChange={handleChange} required placeholder="Nhập nội dung phân tích chi tiết" />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tác giả <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" name="author" value={formData.author} onChange={handleChange} required placeholder="Tên tác giả (VD: TS. Nguyễn Văn A)" />
                                </Form.Group>
                            </Col>
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
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Tags (phân cách bằng dấu phẩy)</Form.Label>
                            <Form.Control type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="VD: Kiến trúc, Văn hóa, Lịch sử" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>URL hình ảnh</Form.Label>
                            <Form.Control type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" />
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

export default AdminPhanTich;