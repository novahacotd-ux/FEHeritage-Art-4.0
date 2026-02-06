import React, { useState, useEffect } from "react";

import imgHalong from "../../assets/halong.jpg";
import imgHue from "../../assets/hue.jpg";
import imgHoankiem from "../../assets/hoankiem.jpg";
import img123 from "../../assets/123.jpg";
import imgBanner from "../../assets/banner.png";

const STORAGE_KEY = "adminProducts";
const MOCK_IMAGES = [imgHalong, imgHue, imgHoankiem, img123, imgBanner];

// Cấu hình cho tranh
const CATEGORIES_TRANH = ["Tranh Canvas", "Tranh Gỗ", "Tranh Sơn Dầu", "Tranh In"];
const TOPICS_TRANH = ["Phong cảnh", "Chân dung", "Trừu tượng", "Di sản văn hóa"];
const STYLES_TRANH = ["Cổ điển", "Hiện đại", "Dân gian", "Đương đại"];

// Cấu hình cho đồ lưu niệm
const CATEGORIES_SOUVENIR = ["Áo thun", "Cốc/Ly", "Túi vải", "Móc khóa", "Tranh mini", "Digital Art"];
const TOPICS_SOUVENIR = ["Di tích lịch sử", "Văn hóa", "Phố cổ", "Thiên nhiên"];
const STYLES_SOUVENIR = ["Cổ điển", "Hiện đại", "Trừu tượng", "Thiên nhiên"];

const defaultProduct = (type = "tranh") => ({
  id: `${type === "tranh" ? "SP" : "SV"}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  name: "",
  price: 0,
  image: "",
  description: "",
  stock_quantity: 0,
  status: "active",
  type: type, // "tranh" hoặc "souvenir"
  category: type === "tranh" ? CATEGORIES_TRANH[0] : CATEGORIES_SOUVENIR[0],
  topic: type === "tranh" ? TOPICS_TRANH[0] : TOPICS_SOUVENIR[0],
  style: type === "tranh" ? STYLES_TRANH[0] : STYLES_SOUVENIR[0],
});

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all"); // "all", "tranh", "souvenir"
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(defaultProduct());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ─── EXPORT MODAL STATE ───
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportRange, setExportRange] = useState("all");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const patched = parsed.map((p, i) => ({
          ...p,
          image: p.image && p.image.trim() ? p.image : MOCK_IMAGES[i % MOCK_IMAGES.length],
        }));
        setProducts(patched);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(patched));
      } catch {
        setProducts([]);
      }
    } else {
      const mock = [
        // Tranh
        { ...defaultProduct("tranh"), id: "SP-001", name: "Tranh Phong cảnh Hạ Long", price: 450000, stock_quantity: 20, status: "active", category: "Tranh Canvas", topic: "Phong cảnh", style: "Hiện đại", image: MOCK_IMAGES[0], description: "Tranh in canvas chất lượng cao." },
        { ...defaultProduct("tranh"), id: "SP-002", name: "Tranh Chân dung Bác Hồ", price: 680000, stock_quantity: 0, status: "inactive", category: "Tranh Gỗ", topic: "Chân dung", style: "Cổ điển", image: MOCK_IMAGES[1], description: "Tranh gỗ điêu khắc tinh xảo." },
        { ...defaultProduct("tranh"), id: "SP-003", name: "Tranh Phong cảnh Hồ Hoàn Kiếm", price: 380000, stock_quantity: 15, status: "active", category: "Tranh In", topic: "Phong cảnh", style: "Hiện đại", image: MOCK_IMAGES[2], description: "Tranh in chất lượng cao." },
        { ...defaultProduct("tranh"), id: "SP-004", name: "Tranh Di sản Huế", price: 520000, stock_quantity: 8, status: "active", category: "Tranh Canvas", topic: "Di sản văn hóa", style: "Cổ điển", image: MOCK_IMAGES[3], description: "Tranh canvas di sản văn hóa." },
        { ...defaultProduct("tranh"), id: "SP-005", name: "Tranh Trừu tượng", price: 290000, stock_quantity: 25, status: "active", category: "Tranh Sơn Dầu", topic: "Trừu tượng", style: "Đương đại", image: MOCK_IMAGES[4], description: "Tranh sơn dầu trừu tượng." },
        
        // Đồ lưu niệm
        { ...defaultProduct("souvenir"), id: "SV-001", name: "Áo thun Cố Đô Huế", price: 250000, stock_quantity: 30, status: "active", category: "Áo thun", topic: "Di tích lịch sử", style: "Cổ điển", image: MOCK_IMAGES[0], description: "Áo thun cotton 100% in hình Cố Đô Huế." },
        { ...defaultProduct("souvenir"), id: "SV-002", name: "Cốc Chùa Một Cột", price: 150000, stock_quantity: 50, status: "active", category: "Cốc/Ly", topic: "Văn hóa", style: "Hiện đại", image: MOCK_IMAGES[1], description: "Cốc sứ cao cấp in hình Chùa Một Cột." },
        { ...defaultProduct("souvenir"), id: "SV-003", name: "Túi vải Di sản Việt Nam", price: 200000, stock_quantity: 20, status: "active", category: "Túi vải", topic: "Văn hóa", style: "Hiện đại", image: MOCK_IMAGES[2], description: "Túi vải canvas in họa tiết di sản." },
        { ...defaultProduct("souvenir"), id: "SV-004", name: "Móc khóa Chùa Cầu", price: 50000, stock_quantity: 100, status: "active", category: "Móc khóa", topic: "Di tích lịch sử", style: "Cổ điển", image: MOCK_IMAGES[3], description: "Móc khóa gỗ khắc Chùa Cầu Hội An." },
        { ...defaultProduct("souvenir"), id: "SV-005", name: "Digital Art Phố Cổ", price: 80000, stock_quantity: 999, status: "active", category: "Digital Art", topic: "Phố cổ", style: "Hiện đại", image: MOCK_IMAGES[4], description: "File ảnh 4K về Phố Cổ Hà Nội." },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mock));
      setProducts(mock);
    }
  };

  const saveProducts = (list) => {
    setProducts(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const filteredData = products.filter((p) => {
    const matchSearch =
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    const matchCategory = filterCategory === "all" || p.category === filterCategory;
    const matchType = filterType === "all" || p.type === filterType;
    return matchSearch && matchStatus && matchCategory && matchType;
  });

  const stats = {
    total: products.length,
    tranh: products.filter((p) => p.type === "tranh").length,
    souvenir: products.filter((p) => p.type === "souvenir").length,
    active: products.filter((p) => p.status === "active").length,
    outOfStock: products.filter((p) => (p.stock_quantity || 0) <= 0).length,
    totalValue: products.reduce((s, p) => s + (p.price || 0) * (p.stock_quantity || 0), 0),
  };

  const openAdd = (type = "tranh") => {
    setEditingProduct(null);
    setForm(defaultProduct(type));
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditingProduct(p);
    setForm({ ...p });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name?.trim()) {
      alert("Vui lòng nhập tên sản phẩm.");
      return;
    }
    if (editingProduct) {
      const updated = products.map((x) => (x.id === editingProduct.id ? { ...form } : x));
      saveProducts(updated);
      showSuccess("Đã cập nhật sản phẩm!");
    } else {
      const prefix = form.type === "tranh" ? "SP" : "SV";
      const newProduct = { ...form, id: `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}` };
      saveProducts([...products, newProduct]);
      showSuccess("Đã thêm sản phẩm!");
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setDeleteTarget(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      saveProducts(products.filter((p) => p.id !== deleteTarget));
      setShowDeleteModal(false);
      setDeleteTarget(null);
      showSuccess("Đã xóa sản phẩm!");
    }
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  // ─── EXPORT EXCEL ───
  const openExportModal = () => {
    setShowExportModal(true);
    setExportRange("all");
  };

  const handleExportExcel = () => {
    let dataToExport = exportRange === "all" 
      ? products 
      : exportRange === "active"
      ? products.filter(p => p.status === "active")
      : exportRange === "tranh"
      ? products.filter(p => p.type === "tranh")
      : exportRange === "souvenir"
      ? products.filter(p => p.type === "souvenir")
      : products.filter(p => (p.stock_quantity || 0) <= 0);

    if (dataToExport.length === 0) {
      alert("Không có dữ liệu để xuất!");
      return;
    }

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px; background: #f5f5f5; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 14px; }
        .summary { background: white; padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; border-left: 3px solid #667eea; border-right: 3px solid #667eea; }
        .summary-item { padding: 15px; background: #f8f9ff; border-radius: 8px; border-left: 4px solid #667eea; }
        .summary-label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
        .summary-value { font-size: 24px; font-weight: 700; color: #333; }
        table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-radius: 0 0 10px 10px; }
        thead { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        th { padding: 15px 12px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
        td { padding: 12px; border-bottom: 1px solid #e0e0e0; font-size: 14px; }
        tbody tr:hover { background: #f8f9ff; }
        tbody tr:nth-child(even) { background: #fafafa; }
        .price { font-weight: 700; color: #2ecc71; text-align: right; }
        .status { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
        .status-active { background: #d4edda; color: #155724; }
        .status-inactive { background: #f8d7da; color: #721c24; }
        .type-tranh { background: #e3f2fd; color: #1565c0; padding: 3px 8px; border-radius: 8px; font-size: 11px; font-weight: 600; }
        .type-souvenir { background: #f3e5f5; color: #7b1fa2; padding: 3px 8px; border-radius: 8px; font-size: 11px; font-weight: 600; }
        .footer { margin-top: 30px; padding: 20px; background: white; border-radius: 10px; text-align: center; color: #666; font-size: 12px; border: 2px solid #e0e0e0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📦 BÁO CÁO SẢN PHẨM</h1>
        <p>Heritage Art 4.0 - Quản Lý Sản Phẩm (Tranh & Đồ Lưu Niệm)</p>
        <p>Xuất ngày: ${new Date().toLocaleDateString("vi-VN", { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        })}</p>
    </div>
    <div class="summary">
        <div class="summary-item">
            <div class="summary-label">Tổng sản phẩm</div>
            <div class="summary-value">${dataToExport.length}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Tranh nghệ thuật</div>
            <div class="summary-value">${dataToExport.filter(p => p.type === "tranh").length}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Đồ lưu niệm</div>
            <div class="summary-value">${dataToExport.filter(p => p.type === "souvenir").length}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Tổng giá trị kho</div>
            <div class="summary-value">${dataToExport.reduce((s, p) => s + (p.price || 0) * (p.stock_quantity || 0), 0).toLocaleString("vi-VN")}₫</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Loại xuất</div>
            <div class="summary-value" style="font-size: 16px;">
                ${exportRange === "all" ? "Toàn bộ" : exportRange === "active" ? "Đang bán" : exportRange === "tranh" ? "Tranh" : exportRange === "souvenir" ? "Đồ lưu niệm" : "Hết hàng"}
            </div>
        </div>
    </div>
    <table>
        <thead>
            <tr>
                <th>STT</th>
                <th>Loại</th>
                <th>Mã SP</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Chủ đề</th>
                <th>Phong cách</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Giá trị kho</th>
                <th>Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            ${dataToExport.map((p, i) => `
            <tr>
                <td>${i + 1}</td>
                <td><span class="${p.type === 'tranh' ? 'type-tranh' : 'type-souvenir'}">${p.type === 'tranh' ? '🖼️ Tranh' : '🎁 Lưu niệm'}</span></td>
                <td style="font-family: monospace; font-size: 11px;">${p.id}</td>
                <td><strong>${p.name || "—"}</strong></td>
                <td>${p.category || "—"}</td>
                <td>${p.topic || "—"}</td>
                <td>${p.style || "—"}</td>
                <td class="price">${(p.price || 0).toLocaleString("vi-VN")}₫</td>
                <td style="text-align: center;">${p.stock_quantity ?? 0}</td>
                <td class="price">${((p.price || 0) * (p.stock_quantity || 0)).toLocaleString("vi-VN")}₫</td>
                <td><span class="status ${p.status === 'active' ? 'status-active' : 'status-inactive'}">${p.status === 'active' ? 'Đang bán' : 'Ẩn'}</span></td>
            </tr>
            `).join('')}
        </tbody>
    </table>
    <div class="footer">
        <p><strong>Heritage Art 4.0</strong> - Dự án Bảo Tồn và Phát Triển Nghệ Thuật Truyền Thống Việt Nam</p>
        <p>Báo cáo được tạo tự động từ hệ thống quản lý</p>
        <p style="margin-top: 10px; color: #999; font-size: 11px;">© ${new Date().getFullYear()} Heritage Art 4.0. All rights reserved.</p>
    </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `BaoCao_SanPham_${new Date().toISOString().split('T')[0]}.xls`;
    link.click();

    setShowExportModal(false);
    showSuccess(`✅ Đã xuất ${dataToExport.length} sản phẩm thành công!`);
  };

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };
  const modalBoxStyle = {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "24px",
    maxWidth: "520px",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  };

  // Lấy danh sách categories, topics, styles dựa vào loại sản phẩm
  const getCurrentCategories = () => form.type === "tranh" ? CATEGORIES_TRANH : CATEGORIES_SOUVENIR;
  const getCurrentTopics = () => form.type === "tranh" ? TOPICS_TRANH : TOPICS_SOUVENIR;
  const getCurrentStyles = () => form.type === "tranh" ? STYLES_TRANH : STYLES_SOUVENIR;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div>
          <h3>Quản lý Sản phẩm</h3>
          <p className="panel-description">Theo dõi và quản lý sản phẩm cửa hàng (tranh in, đồ lưu niệm, tồn kho)</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={openExportModal} style={{
            background: "#10b981", color: "#fff", border: "none", borderRadius: "8px",
            padding: "8px 16px", cursor: "pointer", fontWeight: "600", fontSize: "14px"
          }}>📊 Xuất Excel</button>
          <button onClick={() => openAdd("tranh")} className="dashboard-btn-primary">+ Thêm tranh</button>
          <button onClick={() => openAdd("souvenir")} style={{
            background: "#9333ea", color: "#fff", border: "none", borderRadius: "8px",
            padding: "8px 16px", cursor: "pointer", fontWeight: "600", fontSize: "14px"
          }}>+ Thêm đồ lưu niệm</button>
        </div>
      </div>

      <div className="dashboard-stats-row">
        <div className="dashboard-stat-card">
          <h5>Tổng sản phẩm</h5>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-sub">Tất cả sản phẩm trong kho</div>
        </div>
        <div className="dashboard-stat-card">
          <h5>Tranh nghệ thuật</h5>
          <div className="stat-value">{stats.tranh}</div>
          <div className="stat-sub">Sản phẩm tranh</div>
        </div>
        <div className="dashboard-stat-card">
          <h5>Đồ lưu niệm</h5>
          <div className="stat-value">{stats.souvenir}</div>
          <div className="stat-sub">Sản phẩm đồ lưu niệm</div>
        </div>
        <div className="dashboard-stat-card">
          <h5>Đang bán</h5>
          <div className="stat-value">{stats.active}</div>
          <div className="stat-sub">Sản phẩm đang hiển thị</div>
        </div>
        <div className="dashboard-stat-card">
          <h5>Hết hàng</h5>
          <div className="stat-value">{stats.outOfStock}</div>
          <div className="stat-sub">Cần nhập thêm</div>
        </div>
        <div className="dashboard-stat-card">
          <h5>Tổng giá trị kho</h5>
          <div className="stat-value">{stats.totalValue.toLocaleString()}₫</div>
          <div className="stat-sub">Theo giá × tồn kho</div>
        </div>
      </div>

      <div className="dashboard-panel">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", alignItems: "end" }}>
          <div>
            <label className="dashboard-input-label">Tìm kiếm</label>
            <input
              type="text"
              className="dashboard-input"
              placeholder="Tên, mã, danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="dashboard-input-label">Loại sản phẩm</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="dashboard-select"
            >
              <option value="all">Tất cả</option>
              <option value="tranh">Tranh nghệ thuật</option>
              <option value="souvenir">Đồ lưu niệm</option>
            </select>
          </div>
          <div>
            <label className="dashboard-input-label">Trạng thái</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="dashboard-select"
            >
              <option value="all">Tất cả</option>
              <option value="active">Đang bán</option>
              <option value="inactive">Ẩn</option>
            </select>
          </div>
          <div>
            <label className="dashboard-input-label">Danh mục</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="dashboard-select"
            >
              <option value="all">Tất cả</option>
              {[...CATEGORIES_TRANH, ...CATEGORIES_SOUVENIR].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="dashboard-panel">
        <div className="panel-head">
          <h3>Danh sách sản phẩm</h3>
          <span className="badge success" style={{ backgroundColor: "#2563eb", color: "#fff" }}>{filteredData.length} sản phẩm</span>
        </div>
        {filteredData.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#999" }}>
            <p style={{ fontSize: "1.05rem", fontWeight: "600", margin: "0 0 4px", color: "#374151" }}>Chưa có sản phẩm nào</p>
            <p style={{ fontSize: "0.9rem", color: "#666", margin: 0 }}>Thêm sản phẩm bằng nút "Thêm tranh" hoặc "Thêm đồ lưu niệm" phía trên.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th style={{ minWidth: "50px" }}>#</th>
                  <th style={{ minWidth: "80px" }}>Loại</th>
                  <th style={{ minWidth: "80px" }}>Ảnh</th>
                  <th style={{ minWidth: "140px" }}>Mã / Tên</th>
                  <th style={{ minWidth: "100px" }}>Danh mục</th>
                  <th style={{ minWidth: "100px" }}>Giá</th>
                  <th style={{ minWidth: "80px" }}>Tồn kho</th>
                  <th style={{ minWidth: "100px" }}>Trạng thái</th>
                  <th style={{ minWidth: "120px" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((p, index) => (
                  <tr key={p.id} style={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff" }}>
                    <td style={{ fontWeight: "600", color: "#666", fontSize: "13px" }}>{index + 1}</td>
                    <td>
                      <span style={{
                        padding: "3px 8px",
                        borderRadius: "8px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        background: p.type === "tranh" ? "#e3f2fd" : "#f3e5f5",
                        color: p.type === "tranh" ? "#1565c0" : "#7b1fa2",
                      }}>
                        {p.type === "tranh" ? "🖼️" : "🎁"}
                      </span>
                    </td>
                    <td>
                      {p.image ? (
                        <img src={p.image} alt="" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: "8px", border: "1px solid #e0e7ff" }} />
                      ) : (
                        <div style={{ width: 48, height: 48, background: "#e0e7ff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#64748b" }}>—</div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#666" }}>{p.id}</div>
                      <strong style={{ color: "#374151", fontSize: "13px" }}>{p.name || "—"}</strong>
                    </td>
                    <td><span style={{ fontSize: "0.9rem", color: "#374151" }}>{p.category || "—"}</span></td>
                    <td><span className="dashboard-price">{(p.price || 0).toLocaleString()}₫</span></td>
                    <td style={{ fontWeight: "600", color: (p.stock_quantity || 0) <= 0 ? "#dc2626" : "#374151" }}>{p.stock_quantity ?? 0}</td>
                    <td>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          background: p.status === "active" ? "#dcfce7" : "#f1f5f9",
                          color: p.status === "active" ? "#16a34a" : "#64748b",
                        }}
                      >
                        {p.status === "active" ? "Đang bán" : "Ẩn"}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        <button onClick={() => openEdit(p)} className="dashboard-btn-edit">Sửa</button>
                        <button onClick={() => handleDelete(p.id)} className="dashboard-btn-danger">Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Export */}
      {showExportModal && (
        <div style={overlayStyle} onClick={() => setShowExportModal(false)}>
          <div style={{ ...modalBoxStyle, maxWidth: "450px" }} onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 16px", fontSize: "20px", color: "#1e293b" }}>📊 Xuất báo cáo Excel</h3>
            <p style={{ margin: "0 0 20px", color: "#64748b", fontSize: "14px" }}>Chọn loại sản phẩm để xuất</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {[
                { value: "all", label: "📦 Toàn bộ sản phẩm", count: products.length },
                { value: "tranh", label: "🖼️ Chỉ tranh nghệ thuật", count: products.filter(p => p.type === "tranh").length },
                { value: "souvenir", label: "🎁 Chỉ đồ lưu niệm", count: products.filter(p => p.type === "souvenir").length },
                { value: "active", label: "✅ Sản phẩm đang bán", count: products.filter(p => p.status === "active").length },
                { value: "outofstock", label: "⚠️ Sản phẩm hết hàng", count: products.filter(p => (p.stock_quantity || 0) <= 0).length }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setExportRange(option.value)}
                  style={{
                    padding: "12px 16px",
                    border: exportRange === option.value ? "2px solid #2563eb" : "1px solid #e2e8f0",
                    borderRadius: "8px",
                    background: exportRange === option.value ? "#eff6ff" : "#fff",
                    color: exportRange === option.value ? "#2563eb" : "#64748b",
                    cursor: "pointer",
                    fontWeight: exportRange === option.value ? "600" : "500",
                    fontSize: "14px",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <span>{option.label}</span>
                  <span style={{ 
                    background: exportRange === option.value ? "#2563eb" : "#e2e8f0",
                    color: exportRange === option.value ? "#fff" : "#64748b",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "700"
                  }}>{option.count}</span>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setShowExportModal(false)} style={{
                flex: 1, padding: "10px 0", border: "none", borderRadius: "10px",
                backgroundColor: "#f3f4f6", color: "#374151", fontWeight: "600", fontSize: "14px", cursor: "pointer"
              }}>Hủy</button>
              <button onClick={handleExportExcel} style={{
                flex: 1, padding: "10px 0", border: "none", borderRadius: "10px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "#fff", fontWeight: "600", fontSize: "14px", cursor: "pointer"
              }}>📥 Tải xuống</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add/Edit */}
      {showModal && (
        <div style={overlayStyle} onClick={() => setShowModal(false)}>
          <div style={modalBoxStyle} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: "0 0 16px", fontSize: "1.2rem", color: "#2563eb" }}>
              {editingProduct ? "Sửa sản phẩm" : `Thêm ${form.type === "tranh" ? "tranh nghệ thuật" : "đồ lưu niệm"}`}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {!editingProduct && (
                <div>
                  <label className="dashboard-input-label">Loại sản phẩm *</label>
                  <select
                    value={form.type}
                    onChange={(e) => {
                      const newType = e.target.value;
                      setForm({
                        ...form,
                        type: newType,
                        category: newType === "tranh" ? CATEGORIES_TRANH[0] : CATEGORIES_SOUVENIR[0],
                        topic: newType === "tranh" ? TOPICS_TRANH[0] : TOPICS_SOUVENIR[0],
                        style: newType === "tranh" ? STYLES_TRANH[0] : STYLES_SOUVENIR[0],
                      });
                    }}
                    className="dashboard-select"
                    style={{ padding: "8px 10px", fontSize: "14px" }}
                  >
                    <option value="tranh">Tranh nghệ thuật</option>
                    <option value="souvenir">Đồ lưu niệm</option>
                  </select>
                </div>
              )}
              <div>
                <label className="dashboard-input-label">Tên sản phẩm *</label>
                <input
                  className="dashboard-input"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  style={{ padding: "8px 10px", fontSize: "14px" }}
                  placeholder="Nhập tên sản phẩm"
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="dashboard-input-label">Giá (₫)</label>
                  <input
                    type="number"
                    className="dashboard-input"
                    min={0}
                    value={form.price || ""}
                    onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) || 0 }))}
                    style={{ padding: "8px 10px", fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label className="dashboard-input-label">Tồn kho</label>
                  <input
                    type="number"
                    className="dashboard-input"
                    min={0}
                    value={form.stock_quantity ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, stock_quantity: Number(e.target.value) || 0 }))}
                    style={{ padding: "8px 10px", fontSize: "14px" }}
                  />
                </div>
              </div>
              <div>
                <label className="dashboard-input-label">URL ảnh</label>
                <input
                  className="dashboard-input"
                  value={form.image || ""}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  style={{ padding: "8px 10px", fontSize: "14px" }}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="dashboard-input-label">Mô tả</label>
                <textarea
                  className="dashboard-input"
                  value={form.description || ""}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={2}
                  style={{ padding: "8px 10px", fontSize: "14px", resize: "vertical" }}
                  placeholder="Mô tả ngắn"
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                <div>
                  <label className="dashboard-input-label">Danh mục</label>
                  <select
                    value={form.category || getCurrentCategories()[0]}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="dashboard-select"
                    style={{ padding: "8px 10px", fontSize: "13px" }}
                  >
                    {getCurrentCategories().map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="dashboard-input-label">Chủ đề</label>
                  <select
                    value={form.topic || getCurrentTopics()[0]}
                    onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                    className="dashboard-select"
                    style={{ padding: "8px 10px", fontSize: "13px" }}
                  >
                    {getCurrentTopics().map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="dashboard-input-label">Phong cách</label>
                  <select
                    value={form.style || getCurrentStyles()[0]}
                    onChange={(e) => setForm((f) => ({ ...f, style: e.target.value }))}
                    className="dashboard-select"
                    style={{ padding: "8px 10px", fontSize: "13px" }}
                  >
                    {getCurrentStyles().map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="dashboard-input-label">Trạng thái</label>
                <select
                  value={form.status || "active"}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  className="dashboard-select"
                  style={{ padding: "8px 10px", fontSize: "13px" }}
                >
                  <option value="active">Đang bán</option>
                  <option value="inactive">Ẩn</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button onClick={() => setShowModal(false)} className="dashboard-mock-btn" style={{ flex: 1, padding: "10px 0" }}>Hủy</button>
              <button onClick={handleSave} className="dashboard-btn-primary" style={{ flex: 1, padding: "10px 0" }}>{editingProduct ? "Lưu thay đổi" : "Thêm sản phẩm"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xóa */}
      {showDeleteModal && (
        <div style={overlayStyle} onClick={() => setShowDeleteModal(false)}>
          <div style={modalBoxStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: "20px", color: "#1f2937" }}>Xác nhận xóa</h3>
              <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>Bạn có chắc muốn xóa sản phẩm này? Hành động không thể khôi phục.</p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setShowDeleteModal(false)} className="dashboard-mock-btn" style={{ flex: 1, padding: "10px 0" }}>Hủy</button>
              <button onClick={confirmDelete} className="dashboard-btn-danger" style={{ flex: 1, padding: "10px 0", background: "#ef4444", color: "#fff" }}>Xóa</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, pointerEvents: "none" }}>
          <div style={{ backgroundColor: "#22c55e", color: "#fff", padding: "16px 32px", borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", fontSize: "18px", fontWeight: "700" }}>{successMessage}</div>
        </div>
      )}
    </div>
  );
}