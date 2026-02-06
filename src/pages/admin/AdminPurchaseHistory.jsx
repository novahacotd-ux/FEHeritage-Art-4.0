import React, { useState, useEffect } from "react";

const VIP_STORAGE_KEY = "vipHistory";

export default function AdminPurchaseHistory() {
  const [vipHistory, setVipHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportRange, setExportRange] = useState("all");

  useEffect(() => {
    loadVIPHistory();
    const interval = setInterval(loadVIPHistory, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadVIPHistory = () => {
    const stored = localStorage.getItem(VIP_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setVipHistory(Array.isArray(parsed) ? parsed : []);
      } catch {
        setVipHistory([]);
      }
    } else {
      const mockData = [
        { id: "VIP-001", userName: "Nguyễn Văn A", email: "nguyenvana@gmail.com", packageName: "Premium Cá Nhân", packagePrice: 149000, billingCycle: "monthly", purchaseDate: "2025-01-15", expiryDate: "2025-02-15", status: "active", autoRenew: true },
        { id: "VIP-002", userName: "Trần Thị B", email: "tranthib@gmail.com", packageName: "Nhà Bảo Trợ Nghệ Thuật", packagePrice: 4792000, billingCycle: "yearly", purchaseDate: "2024-12-01", expiryDate: "2025-12-01", status: "active", autoRenew: false },
        { id: "VIP-003", userName: "Lê Minh C", email: "leminhc@gmail.com", packageName: "Premium Cá Nhân", packagePrice: 1432800, billingCycle: "yearly", purchaseDate: "2024-11-20", expiryDate: "2025-01-20", status: "expired", autoRenew: false },
      ];
      localStorage.setItem(VIP_STORAGE_KEY, JSON.stringify(mockData));
      setVipHistory(mockData);
    }
  };

  const applyTimeFilter = (list) => {
    if (timeFilter === "all") return list;
    const now = new Date();
    return list.filter((item) => {
      const d = new Date(item.purchaseDate || item.expiryDate);
      if (timeFilter === "today") return d.toDateString() === now.toDateString();
      if (timeFilter === "week") return d >= new Date(now.getTime() - 7 * 86400000);
      if (timeFilter === "month") return d >= new Date(now.getTime() - 30 * 86400000);
      return true;
    });
  };

  const filteredData = applyTimeFilter(
    vipHistory.filter((item) => {
      const matchSearch =
        (item.userName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.packageName || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = filterStatus === "all" || item.status === filterStatus;
      return matchSearch && matchStatus;
    })
  );

  const stats = {
    total: vipHistory.length,
    active: vipHistory.filter((item) => item.status === "active").length,
    expired: vipHistory.filter((item) => item.status === "expired").length,
    revenue: vipHistory.filter((item) => item.status === "active").reduce((sum, item) => sum + (item.packagePrice || 0), 0),
  };

  const handleDelete = (id) => {
    setDeleteTarget(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      const updated = vipHistory.filter((item) => item.id !== deleteTarget);
      setVipHistory(updated);
      localStorage.setItem(VIP_STORAGE_KEY, JSON.stringify(updated));
      setShowDeleteModal(false);
      setDeleteTarget(null);
      showSuccess("Đã xóa bản ghi lịch sử mua gói!");
    }
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  const openExportModal = () => {
    setShowExportModal(true);
    setExportRange("all");
  };

  const handleExportExcel = () => {
    let dataToExport = exportRange === "all" 
      ? filteredData 
      : exportRange === "active"
      ? filteredData.filter(item => item.status === "active")
      : exportRange === "expired"
      ? filteredData.filter(item => item.status === "expired")
      : exportRange === "monthly"
      ? filteredData.filter(item => item.billingCycle === "monthly")
      : filteredData.filter(item => item.billingCycle === "yearly");

    if (dataToExport.length === 0) {
      alert("Không có dữ liệu để xuất!");
      return;
    }

    // Tính toán thống kê
    const totalRevenue = dataToExport.reduce((sum, item) => sum + (item.packagePrice || 0), 0);
    const activeCount = dataToExport.filter(item => item.status === "active").length;
    const expiredCount = dataToExport.filter(item => item.status === "expired").length;
    
    // Tìm khoảng thời gian
    const dates = dataToExport.map(item => new Date(item.purchaseDate)).filter(d => !isNaN(d));
    const minDate = dates.length > 0 ? new Date(Math.min(...dates)).toLocaleDateString("vi-VN") : "N/A";
    const maxDate = dates.length > 0 ? new Date(Math.max(...dates)).toLocaleDateString("vi-VN") : "N/A";

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px; background: #f5f5f5; }
        .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 14px; }
        .summary { background: white; padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; border-left: 3px solid #f59e0b; border-right: 3px solid #f59e0b; }
        .summary-item { padding: 15px; background: #fff7ed; border-radius: 8px; border-left: 4px solid #f59e0b; }
        .summary-label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
        .summary-value { font-size: 24px; font-weight: 700; color: #333; }
        table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-radius: 0 0 10px 10px; }
        thead { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; }
        th { padding: 15px 12px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
        td { padding: 12px; border-bottom: 1px solid #e0e0e0; font-size: 14px; }
        tbody tr:hover { background: #fff7ed; }
        tbody tr:nth-child(even) { background: #fafafa; }
        .price { font-weight: 700; color: #059669; text-align: right; }
        .status { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
        .status-active { background: #d4edda; color: #155724; }
        .status-expired { background: #f8d7da; color: #721c24; }
        .cycle-monthly { background: #dbeafe; color: #1e40af; padding: 3px 8px; border-radius: 8px; font-size: 11px; font-weight: 600; }
        .cycle-yearly { background: #fce7f3; color: #9f1239; padding: 3px 8px; border-radius: 8px; font-size: 11px; font-weight: 600; }
        .footer { margin-top: 30px; padding: 20px; background: white; border-radius: 10px; text-align: center; color: #666; font-size: 12px; border: 2px solid #e0e0e0; }
        .footer-note { margin-top: 15px; padding: 15px; background: #fff7ed; border-left: 4px solid #f59e0b; border-radius: 5px; text-align: left; }
        .footer-note strong { color: #d97706; }
    </style>
</head>
<body>
    <div class="header">
        <h1>💎 BÁO CÁO LỊCH SỬ MUA GÓI VIP</h1>
        <p>Heritage Art 4.0 - Quản Lý Gói Thành Viên Premium</p>
        <p>Xuất ngày: ${new Date().toLocaleDateString("vi-VN", { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        })}</p>
    </div>
    <div class="summary">
        <div class="summary-item">
            <div class="summary-label">Tổng giao dịch</div>
            <div class="summary-value">${dataToExport.length}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Đang hoạt động</div>
            <div class="summary-value">${activeCount}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Đã hết hạn</div>
            <div class="summary-value">${expiredCount}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Tổng doanh thu</div>
            <div class="summary-value">${totalRevenue.toLocaleString("vi-VN")}₫</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Khoảng thời gian</div>
            <div class="summary-value" style="font-size: 14px;">${minDate} - ${maxDate}</div>
        </div>
        <div class="summary-item">
            <div class="summary-label">Loại xuất</div>
            <div class="summary-value" style="font-size: 16px;">
                ${exportRange === "all" ? "Toàn bộ" : exportRange === "active" ? "Đang hoạt động" : exportRange === "expired" ? "Đã hết hạn" : exportRange === "monthly" ? "Theo tháng" : "Theo năm"}
            </div>
        </div>
    </div>
    <table>
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã đơn</th>
                <th>Người dùng</th>
                <th>Email</th>
                <th>Tên gói</th>
                <th>Chu kỳ</th>
                <th>Giá</th>
                <th>Ngày mua</th>
                <th>Ngày hết hạn</th>
                <th>Trạng thái</th>
                <th>Tự động gia hạn</th>
            </tr>
        </thead>
        <tbody>
            ${dataToExport.map((item, i) => `
            <tr>
                <td>${i + 1}</td>
                <td style="font-family: monospace; font-size: 11px; font-weight: 600;">${item.id}</td>
                <td><strong>${item.userName || "—"}</strong></td>
                <td style="font-size: 13px; color: #666;">${item.email || "—"}</td>
                <td><strong>${item.packageName || "—"}</strong></td>
                <td><span class="${item.billingCycle === 'monthly' ? 'cycle-monthly' : 'cycle-yearly'}">${item.billingCycle === 'monthly' ? '📅 Tháng' : '📆 Năm'}</span></td>
                <td class="price">${(item.packagePrice || 0).toLocaleString("vi-VN")}₫</td>
                <td>${item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString("vi-VN") : "—"}</td>
                <td>${item.expiryDate ? new Date(item.expiryDate).toLocaleDateString("vi-VN") : "—"}</td>
                <td><span class="status ${item.status === 'active' ? 'status-active' : 'status-expired'}">${item.status === 'active' ? '✓ Còn hiệu lực' : '✗ Hết hạn'}</span></td>
                <td style="text-align: center;">${item.autoRenew ? '✓ Bật' : '✗ Tắt'}</td>
            </tr>
            `).join('')}
        </tbody>
    </table>
    <div class="footer">
        <p><strong>Heritage Art 4.0</strong> - Dự án Bảo Tồn và Phát Triển Nghệ Thuật Truyền Thống Việt Nam</p>
        <p>Báo cáo được tạo tự động từ hệ thống quản lý gói thành viên</p>
        <div class="footer-note">
            <strong>📋 Lưu ý quan trọng:</strong>
            <ul style="margin: 10px 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
                <li>Báo cáo này có thể được sử dụng cho mục đích khai báo thuế và kế toán nội bộ</li>
                <li>Tổng doanh thu được tính từ các gói đang hoạt động tại thời điểm xuất báo cáo</li>
                <li>Vui lòng lưu trữ báo cáo này cùng với các chứng từ kế toán liên quan</li>
                <li>Mọi thắc mắc xin liên hệ bộ phận kế toán của Heritage Art 4.0</li>
            </ul>
        </div>
        <p style="margin-top: 15px; color: #999; font-size: 11px;">© ${new Date().getFullYear()} Heritage Art 4.0. All rights reserved.</p>
    </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `BaoCao_LichSuMuaGoi_${new Date().toISOString().split('T')[0]}.xls`;
    link.click();

    setShowExportModal(false);
    showSuccess(`✅ Đã xuất ${dataToExport.length} giao dịch thành công!`);
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
    maxWidth: "440px",
    width: "90%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div>
          <h3>Lịch sử mua gói</h3>
          <p className="panel-description">Theo dõi lịch sử mua gói thành viên VIP / Premium tại cửa hàng</p>
        </div>
        <button onClick={openExportModal} style={{
          background: "#10b981", color: "#fff", border: "none", borderRadius: "8px",
          padding: "8px 16px", cursor: "pointer", fontWeight: "600", fontSize: "14px"
        }}>📊 Xuất Excel</button>
      </div>

      <div className="dashboard-stats-row">
        <div className="dashboard-stat-card">
          <h5>Tổng số giao dịch</h5>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-sub">Tất cả lần mua gói</div>
        </div>
        <div className="dashboard-stat-card">
          <h5>Đang hoạt động</h5>
          <div className="stat-value">{stats.active}</div>
          <div className="stat-sub">Gói còn hiệu lực</div>
        </div>
        <div className="dashboard-stat-card">
          <h5>Đã hết hạn</h5>
          <div className="stat-value">{stats.expired}</div>
          <div className="stat-sub">Gói hết hiệu lực</div>
        </div>
        <div className="dashboard-stat-card">
          <h5>Doanh thu (gói đang hoạt động)</h5>
          <div className="stat-value">{stats.revenue.toLocaleString()}₫</div>
          <div className="stat-sub">Tổng giá trị gói đang dùng</div>
        </div>
      </div>

      <div className="dashboard-panel">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", alignItems: "end" }}>
          <div>
            <label className="dashboard-input-label">Tìm kiếm</label>
            <input
              type="text"
              className="dashboard-input"
              placeholder="Tên, email, mã đơn, tên gói..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="dashboard-input-label">Trạng thái</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="dashboard-select"
            >
              <option value="all">Tất cả</option>
              <option value="active">Đang hoạt động</option>
              <option value="expired">Đã hết hạn</option>
            </select>
          </div>
          <div>
            <label className="dashboard-input-label">Thời gian</label>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["all", "today", "week", "month"].map((f) => (
                <button
                  key={f}
                  onClick={() => setTimeFilter(f)}
                  style={{
                    cursor: "pointer",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: timeFilter === f ? "#2563eb" : "#e5e7eb",
                    color: timeFilter === f ? "#fff" : "#374151",
                    fontWeight: "500",
                    fontSize: "13px",
                  }}
                >
                  {f === "all" ? "Tất cả" : f === "today" ? "Hôm nay" : f === "week" ? "7 ngày" : "30 ngày"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-panel">
        <div className="panel-head">
          <h3>Danh sách lịch sử mua gói</h3>
          <span className="badge success" style={{ backgroundColor: "#2563eb", color: "#fff" }}>{filteredData.length} bản ghi</span>
        </div>
        {filteredData.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#999" }}>
            <p style={{ fontSize: "1.05rem", fontWeight: "600", margin: "0 0 4px", color: "#374151" }}>Chưa có lịch sử mua gói</p>
            <p style={{ fontSize: "0.9rem", color: "#666", margin: 0 }}>Khi có người dùng mua gói VIP / Premium, dữ liệu sẽ hiển thị tại đây.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th style={{ minWidth: "90px" }}>Mã đơn</th>
                  <th style={{ minWidth: "140px" }}>Người dùng</th>
                  <th style={{ minWidth: "140px" }}>Tên gói</th>
                  <th style={{ minWidth: "100px" }}>Giá</th>
                  <th style={{ minWidth: "100px" }}>Ngày mua</th>
                  <th style={{ minWidth: "100px" }}>Ngày hết hạn</th>
                  <th style={{ minWidth: "110px" }}>Trạng thái</th>
                  <th style={{ minWidth: "100px" }}>Tự động gia hạn</th>
                  <th style={{ minWidth: "80px" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff" }}>
                    <td style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#334155", fontWeight: "600" }}>{item.id}</td>
                    <td>
                      <div style={{ fontWeight: "600", color: "#374151", fontSize: "13px" }}>{item.userName || "—"}</div>
                      <div style={{ fontSize: "0.85rem", color: "#64748b" }}>{item.email || "—"}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: "600", color: "#374151", fontSize: "13px" }}>{item.packageName || "—"}</div>
                      <div style={{ fontSize: "0.85rem", color: "#64748b" }}>{item.billingCycle === "monthly" ? "Theo tháng" : "Theo năm"}</div>
                    </td>
                    <td><span className="dashboard-price">{(item.packagePrice || 0).toLocaleString()}₫</span></td>
                    <td style={{ fontSize: "0.9rem", color: "#374151" }}>{item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString("vi-VN") : "—"}</td>
                    <td style={{ fontSize: "0.9rem", color: "#374151" }}>{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString("vi-VN") : "—"}</td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          background: item.status === "active" ? "#dcfce7" : "#fee2e2",
                          color: item.status === "active" ? "#16a34a" : "#dc2626",
                        }}
                      >
                        {item.status === "active" ? "Còn hiệu lực" : "Hết hạn"}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: "12px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          background: item.autoRenew ? "#dbeafe" : "#f1f5f9",
                          color: item.autoRenew ? "#1e40af" : "#64748b",
                        }}
                      >
                        {item.autoRenew ? "Bật" : "Tắt"}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(item.id)} className="dashboard-btn-danger">Xóa</button>
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
            <p style={{ margin: "0 0 20px", color: "#64748b", fontSize: "14px" }}>Chọn loại giao dịch để xuất</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {[
                { value: "all", label: "📦 Toàn bộ giao dịch", count: filteredData.length },
                { value: "active", label: "✅ Đang hoạt động", count: filteredData.filter(item => item.status === "active").length },
                { value: "expired", label: "⚠️ Đã hết hạn", count: filteredData.filter(item => item.status === "expired").length },
                { value: "monthly", label: "📅 Gói theo tháng", count: filteredData.filter(item => item.billingCycle === "monthly").length },
                { value: "yearly", label: "📆 Gói theo năm", count: filteredData.filter(item => item.billingCycle === "yearly").length }
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

      {/* Modal Xóa */}
      {showDeleteModal && (
        <div style={overlayStyle} onClick={() => setShowDeleteModal(false)}>
          <div style={modalBoxStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: "20px", color: "#1f2937" }}>Xác nhận xóa</h3>
              <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>Bạn có chắc muốn xóa bản ghi lịch sử mua gói này? Hành động không thể khôi phục.</p>
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