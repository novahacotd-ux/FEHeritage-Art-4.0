import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge, InputGroup, Stack } from 'react-bootstrap';
import { useArts } from '../../context/ArtContext';
import toast, { Toaster } from 'react-hot-toast';


const AdminSanPham = () => {
    const { arts, setArts } = useArts();
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('Tất cả');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        images: {
            "Tranh Canvas": '',
            "Áo Thun In Hình": '',
            "Cốc Nghệ Thuật": '',
            "File Kỹ Thuật Số (Digital Art)": ''
        },
        price: {
            "Tranh Canvas": 0,
            "Áo Thun In Hình": 0,
            "Cốc Nghệ Thuật": 0,
            "File Kỹ Thuật Số (Digital Art)": 0
        },
        details: {
            warrantyType: '',
            warrantyPeriod: '',
            style: '',
            material: '',
            origin: '',
            glassType: '',
            shipFrom: ''
        }
    });

    const productTypes = [
        "Tranh Canvas",
        "Áo Thun In Hình",
        "Cốc Nghệ Thuật",
        "File Kỹ Thuật Số (Digital Art)"
    ];

    const categories = ['Tất cả', 'Di tích lịch sử', 'Văn hóa', 'Phố cổ', 'Nghệ thuật'];

    const getProductStats = () => {
        const stats = {
            total: arts.length,
            byCategory: {}
        };

        categories.forEach(cat => {
            if (cat !== 'Tất cả') {
                stats.byCategory[cat] = arts.filter(art => art.category === cat).length;
            }
        });

        return stats;
    };

    const stats = getProductStats();

    const filteredProducts = arts.filter(art => {
        const matchSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = filterCategory === 'Tất cả' || art.category === filterCategory;
        return matchSearch && matchCategory;
    });

    const handleCreate = () => {
        setModalMode('create');
        setSelectedProduct(null);
        setFormData({
            title: '',
            category: '',
            description: '',
            images: {
                "Tranh Canvas": '',
                "Áo Thun In Hình": '',
                "Cốc Nghệ Thuật": '',
                "File Kỹ Thuật Số (Digital Art)": ''
            },
            price: {
                "Tranh Canvas": 0,
                "Áo Thun In Hình": 0,
                "Cốc Nghệ Thuật": 0,
                "File Kỹ Thuật Số (Digital Art)": 0
            },
            details: {
                warrantyType: '',
                warrantyPeriod: '',
                style: '',
                material: '',
                origin: '',
                glassType: '',
                shipFrom: ''
            }
        });
        setShowModal(true);
    };

    const handleEdit = (product) => {
        setModalMode('edit');
        setSelectedProduct(product);
        setFormData({
            title: product.title || '',
            category: product.category || '',
            description: product.description || '',
            images: product.images || {
                "Tranh Canvas": '',
                "Áo Thun In Hình": '',
                "Cốc Nghệ Thuật": '',
                "File Kỹ Thuật Số (Digital Art)": ''
            },
            price: product.price || {
                "Tranh Canvas": 0,
                "Áo Thun In Hình": 0,
                "Cốc Nghệ Thuật": 0,
                "File Kỹ Thuật Số (Digital Art)": 0
            },
            details: product.details || {
                warrantyType: '',
                warrantyPeriod: '',
                style: '',
                material: '',
                origin: '',
                glassType: '',
                shipFrom: ''
            }
        });
        setShowModal(true);
    };

    const confirmDelete = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (productToDelete) {
            const updatedArts = arts.filter(art => art.id !== productToDelete.id);
            setArts(updatedArts);
            toast.success(`Đã xóa "${productToDelete.title}" thành công!`);
            setShowDeleteModal(false);
            setProductToDelete(null);
        }
    };

    const handleSave = () => {
        if (!formData.title || !formData.category) {
            toast.error('Vui lòng nhập tên và danh mục sản phẩm!');
            return;
        }

        if (modalMode === 'create') {
            const newProduct = {
                ...formData,
                id: Math.max(...arts.map(a => a.id), 0) + 1
            };
            setArts([...arts, newProduct]);
            toast.success('Thêm sản phẩm mới thành công!');
        } else {
            const updatedArts = arts.map(art => 
                art.id === selectedProduct.id ? { ...art, ...formData } : art
            );
            setArts(updatedArts);
            toast.success('Cập nhật sản phẩm thành công!');
        }

        setShowModal(false);
    };

    const updateFormField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateImageField = (type, value) => {
        setFormData(prev => ({
            ...prev,
            images: { ...prev.images, [type]: value }
        }));
    };

    const updatePriceField = (type, value) => {
        setFormData(prev => ({
            ...prev,
            price: { ...prev.price, [type]: parseFloat(value) || 0 }
        }));
    };

    const updateDetailField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            details: { ...prev.details, [field]: value }
        }));
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Container fluid className="py-4">
                <Toaster position="top-right" />
                
                {/* Header */}
                <div className="mb-4">
                    <h2 className="fw-bold mb-1">Quản Lý Sản Phẩm</h2>
                    <p className="text-muted mb-0">Quản lý danh sách sản phẩm và thông tin chi tiết</p>
                </div>

                {/* Stats Cards */}
                <Row className="g-3 mb-4">
                    <Col lg={3} md={6}>
                        <Card className="border-0 shadow-sm h-100">
                            <Card.Body>
                                <Stack direction="horizontal" gap={3}>
                                    <div className="flex-grow-1">
                                        <p className="text-muted small mb-1">Tổng sản phẩm</p>
                                        <h3 className="fw-bold mb-0">{stats.total}</h3>
                                    </div>
                                    <div className="bg-primary bg-opacity-10 p-3 rounded">
                                        <i className="bi bi-box-seam fs-4 text-primary"></i>
                                    </div>
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                    {Object.entries(stats.byCategory).slice(0, 3).map(([category, count]) => (
                        <Col lg={3} md={6} key={category}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Body>
                                    <p className="text-muted small mb-1">{category}</p>
                                    <h3 className="fw-bold mb-0">{count}</h3>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Filter & Search */}
                <Card className="border-0 shadow-sm mb-4">
                    <Card.Body>
                        <Row className="g-3 align-items-center">
                            <Col md={4}>
                                <InputGroup>
                                    <InputGroup.Text className="bg-white">
                                        <i className="bi bi-search"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Tìm kiếm sản phẩm..."
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
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={5} className="text-end">
                                <Button variant="primary" onClick={handleCreate}>
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Thêm sản phẩm mới
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Products Table */}
                <Card className="border-0 shadow-sm">
                    <Card.Body className="p-0">
                        <div className="table-responsive">
                            <Table hover className="mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="fw-semibold" style={{ width: '5%' }}>ID</th>
                                        <th className="fw-semibold" style={{ width: '10%' }}>HÌNH ẢNH</th>
                                        <th className="fw-semibold" style={{ width: '25%' }}>TÊN SẢN PHẨM</th>
                                        <th className="fw-semibold" style={{ width: '12%' }}>DANH MỤC</th>
                                        <th className="fw-semibold" style={{ width: '13%' }}>GIÁ CANVAS</th>
                                        <th className="fw-semibold" style={{ width: '20%' }}>LOẠI SẢN PHẨM</th>
                                        <th className="fw-semibold text-center" style={{ width: '15%' }}>THAO TÁC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center py-5">
                                                <i className="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
                                                <p className="text-muted mb-0">Không tìm thấy sản phẩm nào</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredProducts.map(product => (
                                            <tr key={product.id}>
                                                <td className="align-middle">
                                                    <span className="fw-bold text-primary">#{product.id}</span>
                                                </td>
                                                <td className="align-middle">
                                                    <img 
                                                        src={product.images["Tranh Canvas"]} 
                                                        alt={product.title}
                                                        style={{
                                                            width: '70px',
                                                            height: '70px',
                                                            objectFit: 'cover',
                                                            borderRadius: '8px',
                                                            border: '1px solid #dee2e6'
                                                        }}
                                                    />
                                                </td>
                                                <td className="align-middle">
                                                    <div className="fw-semibold mb-1">{product.title}</div>
                                                    <small className="text-muted">
                                                        {product.description?.substring(0, 60)}...
                                                    </small>
                                                </td>
                                                <td className="align-middle">
                                                    <Badge bg="info" className="px-3 py-2">
                                                        {product.category}
                                                    </Badge>
                                                </td>
                                                <td className="align-middle">
                                                    <span className="fw-bold text-success">
                                                        {product.price["Tranh Canvas"]?.toLocaleString('vi-VN')}₫
                                                    </span>
                                                </td>
                                                <td className="align-middle">
                                                    <Stack direction="horizontal" gap={1} className="flex-wrap">
                                                        {Object.keys(product.price).map((type, idx) => {
                                                            const labels = ['Canvas', 'Áo', 'Cốc', 'Digital'];
                                                            return (
                                                                <Badge 
                                                                    key={type} 
                                                                    bg="secondary" 
                                                                    className="small"
                                                                >
                                                                    {labels[idx]}
                                                                </Badge>
                                                            );
                                                        })}
                                                    </Stack>
                                                </td>
                                                <td className="align-middle text-center">
                                                    <Stack direction="horizontal" gap={2} className="justify-content-center">
                                                        <Button 
                                                            variant="success"
                                                            size="sm"
                                                            onClick={() => handleEdit(product)}
                                                        >
                                                            <i className="bi bi-pencil me-1"></i>
                                                            Sửa
                                                        </Button>
                                                        <Button 
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => confirmDelete(product)}
                                                        >
                                                            <i className="bi bi-trash me-1"></i>
                                                            Xóa
                                                        </Button>
                                                    </Stack>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>

                <Modal show={showModal} onHide={() => setShowModal(false)} className="custom-modal" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {modalMode === 'create' ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <h6 className="form-section-title">Thông tin cơ bản</h6>
                            <Row>
                                <Col md={8}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="custom-form-label">Tên sản phẩm <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            className="custom-form-control"
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => updateFormField('title', e.target.value)}
                                            placeholder="Nhập tên sản phẩm"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="custom-form-label">Danh mục <span className="text-danger">*</span></Form.Label>
                                        <Form.Select
                                            className="custom-form-control"
                                            value={formData.category}
                                            onChange={(e) => updateFormField('category', e.target.value)}
                                        >
                                            <option value="">Chọn danh mục</option>
                                            {categories.filter(c => c !== 'Tất cả').map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label className="custom-form-label">Mô tả</Form.Label>
                                <Form.Control
                                    className="custom-form-control"
                                    as="textarea"
                                    rows={2}
                                    value={formData.description}
                                    onChange={(e) => updateFormField('description', e.target.value)}
                                    placeholder="Mô tả chi tiết về sản phẩm"
                                />
                            </Form.Group>

                            <h6 className="form-section-title mt-3">Hình ảnh sản phẩm</h6>
                            <Row>
                                {productTypes.map(type => (
                                    <Col md={6} key={type}>
                                        <Form.Group className="mb-2">
                                            <Form.Label className="custom-form-label">{type}</Form.Label>
                                            <Form.Control
                                                className="custom-form-control"
                                                type="url"
                                                value={formData.images[type]}
                                                onChange={(e) => updateImageField(type, e.target.value)}
                                                placeholder={`URL hình ảnh`}
                                            />
                                        </Form.Group>
                                    </Col>
                                ))}
                            </Row>

                            <h6 className="form-section-title mt-3">Giá sản phẩm (VNĐ)</h6>
                            <Row>
                                {productTypes.map(type => (
                                    <Col md={6} key={type}>
                                        <Form.Group className="mb-2">
                                            <Form.Label className="custom-form-label">{type}</Form.Label>
                                            <Form.Control
                                                className="custom-form-control"
                                                type="number"
                                                value={formData.price[type]}
                                                onChange={(e) => updatePriceField(type, e.target.value)}
                                                placeholder="0"
                                            />
                                        </Form.Group>
                                    </Col>
                                ))}
                            </Row>

                            <h6 className="form-section-title mt-3">Thông tin chi tiết</h6>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="custom-form-label">Loại bảo hành</Form.Label>
                                        <Form.Control
                                            className="custom-form-control"
                                            type="text"
                                            value={formData.details.warrantyType}
                                            onChange={(e) => updateDetailField('warrantyType', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="custom-form-label">Thời gian bảo hành</Form.Label>
                                        <Form.Control
                                            className="custom-form-control"
                                            type="text"
                                            value={formData.details.warrantyPeriod}
                                            onChange={(e) => updateDetailField('warrantyPeriod', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="custom-form-label">Phong cách</Form.Label>
                                        <Form.Control
                                            className="custom-form-control"
                                            type="text"
                                            value={formData.details.style}
                                            onChange={(e) => updateDetailField('style', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="custom-form-label">Chất liệu</Form.Label>
                                        <Form.Control
                                            className="custom-form-control"
                                            type="text"
                                            value={formData.details.material}
                                            onChange={(e) => updateDetailField('material', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="custom-form-label">Xuất xứ</Form.Label>
                                        <Form.Control
                                            className="custom-form-control"
                                            type="text"
                                            value={formData.details.origin}
                                            onChange={(e) => updateDetailField('origin', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="custom-form-label">Loại kính</Form.Label>
                                        <Form.Control
                                            className="custom-form-control"
                                            type="text"
                                            value={formData.details.glassType}
                                            onChange={(e) => updateDetailField('glassType', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="custom-form-label">Giao hàng từ</Form.Label>
                                        <Form.Control
                                            className="custom-form-control"
                                            type="text"
                                            value={formData.details.shipFrom}
                                            onChange={(e) => updateDetailField('shipFrom', e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="btn-modal-cancel" onClick={() => setShowModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="primary" className="btn-modal-save" onClick={handleSave}>
                            {modalMode === 'create' ? 'Thêm mới' : 'Cập nhật'}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} className="delete-modal" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận xóa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="delete-alert">
                            <div className="d-flex align-items-start">
                                <i className="bi bi-exclamation-triangle text-danger fs-3 me-3"></i>
                                <div>
                                    <h6 className="fw-bold mb-2">Bạn có chắc chắn muốn xóa sản phẩm này?</h6>
                                    <p className="mb-0">
                                        Sản phẩm <strong>"{productToDelete?.title}"</strong> sẽ bị xóa vĩnh viễn.
                                        Hành động này không thể hoàn tác.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Hủy
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Xác nhận xóa
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
}

export default AdminSanPham;