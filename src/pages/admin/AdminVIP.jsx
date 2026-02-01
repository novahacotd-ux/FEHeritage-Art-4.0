import React, { useState, useEffect } from "react";

export default function AdminVIP() {
  const [vipHistory, setVipHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Load dữ liệu từ localStorage khi component mount
  useEffect(() => {
    loadVIPHistory();
    
    // Kiểm tra gói hết hạn mỗi phút
    const interval = setInterval(() => {
      checkExpiredPackages();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Load lịch sử VIP từ localStorage
  const loadVIPHistory = () => {
    const stored = localStorage.getItem("vipHistory");
    if (stored) {
      const parsed = JSON.parse(stored);
      setVipHistory(parsed);
    } else {
      // Mock data mẫu
      const mockData = [
        {
          id: "VIP-001",
          userName: "Nguyễn Văn A",
          email: "nguyenvana@gmail.com",
          packageName: "Premium Cá Nhân",
          packagePrice: 149000,
          billingCycle: "monthly",
          purchaseDate: "2025-01-15",
          expiryDate: "2025-02-15",
          status: "active",
          autoRenew: true,
        },
        {
          id: "VIP-002",
          userName: "Trần Thị B",
          email: "tranthib@gmail.com",
          packageName: "Nhà Bảo Trợ Nghệ Thuật",
          packagePrice: 4792000,
          billingCycle: "yearly",
          purchaseDate: "2024-12-01",
          expiryDate: "2025-12-01",
          status: "active",
          autoRenew: false,
        },
        {
          id: "VIP-003",
          userName: "Lê Minh C",
          email: "leminhc@gmail.com",
          packageName: "Premium Cá Nhân",
          packagePrice: 1432800,
          billingCycle: "yearly",
          purchaseDate: "2024-11-20",
          expiryDate: "2025-01-20",
          status: "expired",
          autoRenew: false,
        },
        {
          id: "VIP-004",
          userName: "Phạm Hồng D",
          email: "phamhongd@gmail.com",
          packageName: "Premium Cá Nhân",
          packagePrice: 149000,
          billingCycle: "monthly",
          purchaseDate: "2025-01-25",
          expiryDate: "2025-02-25",
          status: "active",
          autoRenew: true,
        },
      ];
      localStorage.setItem("vipHistory", JSON.stringify(mockData));
      setVipHistory(mockData);
    }
  };

  // Kiểm tra và cập nhật gói hết hạn
  const checkExpiredPackages = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updated = vipHistory.map((item) => {
      const expiryDate = new Date(item.expiryDate);
      expiryDate.setHours(0, 0, 0, 0);

      if (expiryDate < today && item.status === "active") {
        return { ...item, status: "expired" };
      }
      return item;
    });

    const hasChanges = JSON.stringify(updated) !== JSON.stringify(vipHistory);
    if (hasChanges) {
      setVipHistory(updated);
      localStorage.setItem("vipHistory", JSON.stringify(updated));
    }
  };

  // Xóa bản ghi
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa lịch sử này?")) {
      const updated = vipHistory.filter((item) => item.id !== id);
      setVipHistory(updated);
      localStorage.setItem("vipHistory", JSON.stringify(updated));
    }
  };

  // Lọc dữ liệu
  const filteredData = vipHistory.filter((item) => {
    const matchSearch =
      item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      filterStatus === "all" || item.status === filterStatus;

    return matchSearch && matchStatus;
  });

  // Thống kê
  const stats = {
    total: vipHistory.length,
    active: vipHistory.filter((item) => item.status === "active").length,
    expired: vipHistory.filter((item) => item.status === "expired").length,
    revenue: vipHistory
      .filter((item) => item.status === "active")
      .reduce((sum, item) => sum + item.packagePrice, 0),
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div>
          <h3>Quản lý Gói Thành Viên VIP</h3>
          <p className="panel-description">Theo dõi và quản lý lịch sử nâng cấp gói VIP của người dùng</p>
        </div>
      </div>

      <div className="dashboard-stats-row">
        <div className="dashboard-stat-card" style={{ borderLeft: "4px solid #2563eb" }}>
          <h5>Tổng số gói</h5>
          <div className="stat-value" style={{ color: "#87684a" }}>{stats.total}</div>
          <div className="stat-sub">Tất cả gói đã đăng ký</div>
        </div>
        <div className="dashboard-stat-card" style={{ borderLeft: "4px solid #10b981" }}>
          <h5>Đang hoạt động</h5>
          <div className="stat-value" style={{ color: "#87684a" }}>{stats.active}</div>
          <div className="stat-sub">Gói còn hiệu lực</div>
        </div>
        <div className="dashboard-stat-card" style={{ borderLeft: "4px solid #f59e0b" }}>
          <h5>Đã hết hạn</h5>
          <div className="stat-value" style={{ color: "#87684a" }}>{stats.expired}</div>
          <div className="stat-sub">Gói hết hiệu lực</div>
        </div>
        <div className="dashboard-stat-card" style={{ borderLeft: "4px solid #8b5cf6" }}>
          <h5>Doanh thu</h5>
          <div className="stat-value" style={{ color: "#87684a" }}>{stats.revenue.toLocaleString()}₫</div>
          <div className="stat-sub">Gói đang hoạt động</div>
        </div>
      </div>

      <div className="dashboard-panel">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", alignItems: "end" }}>
          <div>
            <label className="dashboard-input-label">Tìm kiếm</label>
            <input
              type="text"
              className="dashboard-input"
              placeholder="Tên, email, mã đơn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="dashboard-input-label">Trạng thái</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="dashboard-select">
              <option value="all">Tất cả</option>
              <option value="active">Đang hoạt động</option>
              <option value="expired">Đã hết hạn</option>
            </select>
          </div>
        </div>
      </div>

      <div className="dashboard-panel">
        <div className="panel-head">
          <h3>Danh sách gói VIP</h3>
          <span className="badge success" style={{ backgroundColor: "#2563eb", color: "#fff" }}>{filteredData.length} bản ghi</span>
        </div>
        <div style={{ overflowX: "auto" }}>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Người dùng</th>
                  <th>Tên gói</th>
                  <th>Giá</th>
                  <th>Ngày mua</th>
                  <th>Ngày hết hạn</th>
                  <th>Trạng thái</th>
                  <th>Tự động gia hạn</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      style={{
                        textAlign: "center",
                        padding: "2rem 0",
                        color: "#94a3b8",
                        fontSize: "1.05rem",
                      }}
                    >
                      Không tìm thấy dữ liệu
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: "1px solid #e0e7ff",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "0.45em 0.4em", fontSize: "0.97rem", color: "#334155", fontWeight: "600" }}>
                        {item.id}
                      </td>
                      <td style={{ padding: "0.45em 0.4em", fontSize: "0.97rem", color: "#334155" }}>
                        <div style={{ fontWeight: "600" }}>{item.userName}</div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>{item.email}</div>
                      </td>
                      <td style={{ padding: "0.45em 0.4em", fontSize: "0.97rem", color: "#334155" }}>
                        <div style={{ fontWeight: "600" }}>{item.packageName}</div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                          {item.billingCycle === "monthly" ? "Theo tháng" : "Theo năm"}
                        </div>
                      </td>
                      <td style={{ padding: "0.45em 0.4em", fontSize: "0.97rem", color: "#334155", fontWeight: "600" }}>
                        {item.packagePrice.toLocaleString()}₫
                      </td>
                      <td style={{ padding: "0.45em 0.4em", fontSize: "0.97rem", color: "#334155" }}>
                        {new Date(item.purchaseDate).toLocaleDateString("vi-VN")}
                      </td>
                      <td style={{ padding: "0.45em 0.4em", fontSize: "0.97rem", color: "#334155" }}>
                        {new Date(item.expiryDate).toLocaleDateString("vi-VN")}
                      </td>
                      <td style={{ padding: "0.45em 0.4em", fontSize: "0.97rem", textAlign: "center" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.17em 0.7em",
                            borderRadius: "99em",
                            fontSize: "0.9em",
                            fontWeight: "600",
                            background: item.status === "active" ? "#d1fae5" : "#fee2e2",
                            color: item.status === "active" ? "#065f46" : "#991b1b",
                          }}
                        >
                          {item.status === "active" ? "Còn hiệu lực" : "Hết hạn"}
                        </span>
                      </td>
                      <td style={{ padding: "0.45em 0.4em", fontSize: "0.97rem", textAlign: "center" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.17em 0.7em",
                            borderRadius: "99em",
                            fontSize: "0.9em",
                            fontWeight: "600",
                            background: item.autoRenew ? "#dbeafe" : "#f1f5f9",
                            color: item.autoRenew ? "#1e40af" : "#64748b",
                          }}
                        >
                          {item.autoRenew ? "Bật" : "Tắt"}
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button onClick={() => handleDelete(item.id)} className="dashboard-btn-danger">Xóa</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}