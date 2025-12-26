import React, { useState } from 'react';
import { events as initialEvents } from '../../data/mockData';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Container fluid className="py-4 bg-light" style={{ minHeight: '100vh' }}>
            <Row className="mb-4">
                <Col>
                    <h1 className="fw-bold">Quản lý Sự kiện</h1>
                    <p className="text-muted">Quản lý các sự kiện văn hóa, triển lãm và hoạt động cộng đồng</p>
                </Col>
                <Col xs="auto">
                    <Button variant="primary" size="lg" onClick={handleCreate}>
                        <i className="bi bi-plus-circle me-2"></i>
                        Thêm sự kiện mới
                    </Button>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <InputGroup>
                        <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm sự kiện..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </InputGroup>
                </Col>
            </Row>

            <Row className="mb-4 g-3">
                <Col md={4}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h2 className="text-primary fw-bold">{eventsList.length}</h2>
                            <Card.Text className="text-muted">Tổng sự kiện</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h2 className="text-primary fw-bold">
                                {eventsList.filter(e => new Date(e.date.split('/').reverse().join('-')) >= new Date()).length}
                            </h2>
                            <Card.Text className="text-muted">Sắp diễn ra</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center border-0 shadow-sm">
                        <Card.Body>
                            <h2 className="text-primary fw-bold">{filteredEvents.length}</h2>
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
                                    <td>{item.date}</td>
                                    <td>{item.time}</td>
                                    <td>{item.location}</td>
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
                    <Modal.Title>{editingItem ? 'Chỉnh sửa sự kiện' : 'Thêm sự kiện mới'}</Modal.Title>
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
                                placeholder="Nhập tiêu đề sự kiện"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả ngắn <span className="text-danger">*</span></Form.Label>
                            <Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleChange} required placeholder="Nhập mô tả ngắn" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Giới thiệu</Form.Label>
                            <Form.Control as="textarea" rows={2} name="shortIntro" value={formData.shortIntro} onChange={handleChange} placeholder="Giới thiệu chi tiết về sự kiện" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nội dung <span className="text-danger">*</span></Form.Label>
                            <Form.Control as="textarea" rows={6} name="content" value={formData.content} onChange={handleChange} required placeholder="Nhập nội dung chi tiết" />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ngày <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" name="date" value={formData.date} onChange={handleChange} required placeholder="DD/MM/YYYY" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Thời gian <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="text" name="time" value={formData.time} onChange={handleChange} required placeholder="VD: 08:00 - 17:00" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Địa điểm</Form.Label>
                            <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Địa điểm tổ chức" />
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

export default AdminSuKien;