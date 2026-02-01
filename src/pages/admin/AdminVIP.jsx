import React, { useState, useEffect } from "react";

export default function AdminVIP() {
  const [vipHistory, setVipHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // ─── TOAST STATE ───
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  // ─── MODAL STATE ───
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");

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

  // ─── TOAST HELPER ───
  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  // ─── DELETE HANDLERS ───
  const handleDelete = (id) => {
    setDeleteTarget(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = vipHistory.filter((item) => item.id !== deleteTarget);
    setVipHistory(updated);
    localStorage.setItem("vipHistory", JSON.stringify(updated));
    setShowDeleteModal(false);
    setDeleteTarget(null);
    showSuccess("✅ Đã xóa lịch sử VIP thành công!");
  };

  const handleDeleteAll = () => {
    setShowDeleteAllModal(true);
    setConfirmText("");
  };

  const confirmDeleteAll = () => {
    if (confirmText === "XOA TAT CA") {
      localStorage.removeItem("vipHistory");
      setVipHistory([]);
      setShowDeleteAllModal(false);
      setConfirmText("");
      showSuccess("✅ Đã xóa toàn bộ lịch sử VIP!");
    }
  };

  // Lọc dữ liệu
  const filteredData = vipHistory.filter((item) => {
    const matchSearch =
      item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = filterStatus === "all" || item.status === filterStatus;

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
    <div style={{ minHeight: "100vh", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: "#fff",
            borderRadius: "1rem 1rem 0 0",
            padding: "clamp(1rem, 2vw, 1.25rem) clamp(1rem, 2vw, 1.5rem)",
            borderBottom: "1px solid #bae6fd",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                fontWeight: "bold",
                color: "#2563eb",
                margin: "0 0 0.25rem 0",
              }}
            >
              Quản lý Gói Thành Viên VIP
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.99rem", margin: 0 }}>
              Theo dõi và quản lý lịch sử nâng cấp gói VIP của người dùng
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              onClick={() => {
                loadVIPHistory();
                showSuccess("✅ Đã làm mới dữ liệu!");
              }}
              style={{
                background: "#e9ecf2",
                color: "#2673b8",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.56rem 1.25rem",
                cursor: "pointer",
                fontWeight: "500",
                boxShadow: "0 2px 6px 0 #e0e7ef88",
                transition: "background 0.14s",
                fontSize: "clamp(0.85rem, 2vw, 1rem)",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#e3e8ee")}
              onMouseLeave={(e) => (e.target.style.background = "#e9ecf2")}
            >
              🔄 Làm mới
            </button>
            <button
              onClick={handleDeleteAll}
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.56rem 1.25rem",
                cursor: "pointer",
                fontWeight: "500",
                boxShadow: "0 2px 6px 0 #e0e7ef88",
                transition: "background 0.14s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#fecaca")}
              onMouseLeave={(e) => (e.target.style.background = "#fee2e2")}
            >
              Xóa tất cả
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
            gap: "0.75rem",
            marginTop: "1rem",
          }}
        >
          <div className="dashboard-stat-card-vip">
            <h5 style={{ color: "#87684a" }}>Tổng số gói</h5>
            <div className="stat-value" style={{ color: "#87684a" }}>{stats.total}</div>
            <div className="stat-sub" style={{ color: "#87684a" }}>Tất cả gói đã đăng ký</div>
          </div>

          <div className="dashboard-stat-card-vip active">
            <h5 style={{ color: "#87684a" }}>Đang hoạt động</h5>
            <div className="stat-value" style={{ color: "#87684a" }}>{stats.active}</div>
            <div className="stat-sub" style={{ color: "#87684a" }}>Gói còn hiệu lực</div>
          </div>

          <div className="dashboard-stat-card-vip expired">
            <h5 style={{ color: "#87684a" }}>Đã hết hạn</h5>
            <div className="stat-value" style={{ color: "#87684a" }}>{stats.expired}</div>
            <div className="stat-sub" style={{ color: "#87684a" }}>Gói hết hiệu lực</div>
          </div>

          <div className="dashboard-stat-card-vip revenue">
            <h5 style={{ color: "#87684a" }}>Doanh thu</h5>
            <div className="stat-value">{stats.revenue.toLocaleString()}₫</div>
            <div className="stat-sub" style={{ color: "#87684a" }}>Từ các gói đang hoạt động</div>
          </div>
        </div>

        {/* Filter & Search */}
        <div
          style={{
            background: "#fff",
            padding: "1rem clamp(1rem, 2vw, 1.5rem)",
            marginTop: "1rem",
            borderRadius: "0.75rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
            border: "1px solid #e0e7ff",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Tìm theo tên, email, mã đơn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: "1 1 min(300px, 100%)",
    padding: "0.6em 1em",
    fontSize: "clamp(0.9rem, 2vw, 1rem)",
              borderRadius: "0.5em",
              border: "1.2px solid #bfdbfe",
              background: "#f8fafc",
              color: "#0c2860",
              outline: "none",
            }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
    padding: "0.6em 1em",
    fontSize: "clamp(0.9rem, 2vw, 1rem)",
    minWidth: "150px",
              borderRadius: "0.5em",
              border: "1.2px solid #bfdbfe",
              background: "#f8fafc",
              color: "#0c2860",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="expired">Đã hết hạn</option>
          </select>
        </div>

        {/* Table */}
        <div
          style={{
            background: "#fff",
  borderRadius: "0 0 1rem 1rem",
  padding: "clamp(1rem, 3vw, 1.5rem)",
            marginTop: "1rem",
            boxShadow: "0 2px 10px 0 #dbeafe5e",
            border: "1px solid #dbebff",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "clamp(0.85rem, 2vw, 1rem)",
              }}
            >
              <thead>
                <tr style={{ background: "#f1f5fe" }}>
                  <th
                    style={{
                      padding: "0.7em 0.5em",
                      textAlign: "left",
                      color: "#1e293b",
                      fontWeight: "600",
                      borderBottom: "2px solid #e0e7ff",
                      fontSize: "0.98rem",
                    }}
                  >
                    Mã đơn
                  </th>
                  <th
                    style={{
                      padding: "0.7em 0.5em",
                      textAlign: "left",
                      color: "#1e293b",
                      fontWeight: "600",
                      borderBottom: "2px solid #e0e7ff",
                      fontSize: "0.98rem",
                    }}
                  >
                    Người dùng
                  </th>
                  <th
                    style={{
                      padding: "0.7em 0.5em",
                      textAlign: "left",
                      color: "#1e293b",
                      fontWeight: "600",
                      borderBottom: "2px solid #e0e7ff",
                      fontSize: "0.98rem",
                    }}
                  >
                    Tên gói
                  </th>
                  <th
                    style={{
                      padding: "0.7em 0.5em",
                      textAlign: "left",
                      color: "#1e293b",
                      fontWeight: "600",
                      borderBottom: "2px solid #e0e7ff",
                      fontSize: "0.98rem",
                    }}
                  >
                    Giá
                  </th>
                  <th
                    style={{
                      padding: "0.7em 0.5em",
                      textAlign: "left",
                      color: "#1e293b",
                      fontWeight: "600",
                      borderBottom: "2px solid #e0e7ff",
                      fontSize: "0.98rem",
                    }}
                  >
                    Ngày mua
                  </th>
                  <th
                    style={{
                      padding: "0.7em 0.5em",
                      textAlign: "left",
                      color: "#1e293b",
                      fontWeight: "600",
                      borderBottom: "2px solid #e0e7ff",
                      fontSize: "0.98rem",
                    }}
                  >
                    Ngày hết hạn
                  </th>
                  <th
                    style={{
                      padding: "0.7em 0.5em",
                      textAlign: "center",
                      color: "#1e293b",
                      fontWeight: "600",
                      borderBottom: "2px solid #e0e7ff",
                      fontSize: "0.98rem",
                    }}
                  >
                    Trạng thái
                  </th>
                  <th
                    style={{
                      padding: "0.7em 0.5em",
                      textAlign: "center",
                      color: "#1e293b",
                      fontWeight: "600",
                      borderBottom: "2px solid #e0e7ff",
                      fontSize: "0.98rem",
                    }}
                  >
                    Tự động gia hạn
                  </th>
                  <th
                    style={{
                      padding: "0.7em 0.5em",
                      textAlign: "center",
                      color: "#1e293b",
                      fontWeight: "600",
                      borderBottom: "2px solid #e0e7ff",
                      fontSize: "0.98rem",
                    }}
                  >
                    Thao tác
                  </th>
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
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f8fafc")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td
                        style={{
                          padding: "0.45em 0.4em",
                          fontSize: "0.97rem",
                          color: "#334155",
                          fontWeight: "600",
                        }}
                      >
                        {item.id}
                      </td>
                      <td
                        style={{
                          padding: "0.45em 0.4em",
                          fontSize: "0.97rem",
                          color: "#334155",
                        }}
                      >
                        <div style={{ fontWeight: "600" }}>{item.userName}</div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                          {item.email}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "0.45em 0.4em",
                          fontSize: "0.97rem",
                          color: "#334155",
                        }}
                      >
                        <div style={{ fontWeight: "600" }}>
                          {item.packageName}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                          {item.billingCycle === "monthly"
                            ? "Theo tháng"
                            : "Theo năm"}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "0.45em 0.4em",
                          fontSize: "0.97rem",
                          color: "#334155",
                          fontWeight: "600",
                        }}
                      >
                        {item.packagePrice.toLocaleString()}₫
                      </td>
                      <td
                        style={{
                          padding: "0.45em 0.4em",
                          fontSize: "0.97rem",
                          color: "#334155",
                        }}
                      >
                        {new Date(item.purchaseDate).toLocaleDateString(
                          "vi-VN",
                        )}
                      </td>
                      <td
                        style={{
                          padding: "0.45em 0.4em",
                          fontSize: "0.97rem",
                          color: "#334155",
                        }}
                      >
                        {new Date(item.expiryDate).toLocaleDateString("vi-VN")}
                      </td>
                      <td
                        style={{
                          padding: "0.45em 0.4em",
                          fontSize: "0.97rem",
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.17em 0.7em",
                            borderRadius: "99em",
                            fontSize: "clamp(0.8rem, 1.8vw, 0.9em)",
                            fontWeight: "600",
                            background:
                              item.status === "active" ? "#d1fae5" : "#fee2e2",
                            color:
                              item.status === "active" ? "#065f46" : "#991b1b",
                          }}
                        >
                          {item.status === "active"
                            ? "✓ Còn hiệu lực"
                            : "✗ Hết hạn"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "0.45em 0.4em",
                          fontSize: "0.97rem",
                          textAlign: "center",
                        }}
                      >
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
                          {item.autoRenew ? "🔄 Bật" : "⏸ Tắt"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "0.45em 0.4em",
                          fontSize: "0.97rem",
                          textAlign: "center",
                        }}
                      >
                        <button
                          onClick={() => handleDelete(item.id)}
                          style={{
                            background: "#fee2e2",
                            border: "1.2px solid #fecaca",
                            color: "#ef4444",
                            padding: "0.45em 1.1em",
                            borderRadius: "0.6em",
                            cursor: "pointer",
                            fontSize: "clamp(0.85rem, 2vw, 0.97em)",
                            fontWeight: "500",
                            transition: "background 0.14s",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.background = "#fecaca")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.background = "#fee2e2")
                          }
                        >
                          🗑 Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── MODAL: XÓA 1 KHOẢN ─── */}
      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "440px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>⚠️</div>
              <h3 style={{ margin: "0 0 8px", fontSize: "20px", color: "#1f2937" }}>
                Xác nhận xóa
              </h3>
              <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
                Bạn có chắc muốn xóa lịch sử VIP này?
              </p>
              <p style={{ margin: "6px 0 0", color: "#dc2626", fontSize: "13px" }}>
                Hành động này không thể khôi phục!
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: XÓA TẤT CẢ ─── */}
      {showDeleteAllModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowDeleteAllModal(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "440px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <p
                style={{
                  margin: "0 0 4px",
                  color: "#374151",
                  fontSize: "24px",
                  fontWeight: "600",
                }}
              >
                Xóa toàn bộ lịch sử VIP?
              </p>
              <p
                style={{
                  margin: 0,
                  color: "#dc2626",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                Không thể khôi phục!
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#fefce8",
                border: "2px solid #fde047",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "20px",
              }}
            >
              <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#374151" }}>
                Nhập{" "}
                <span
                  style={{
                    fontFamily: "monospace",
                    fontWeight: "700",
                    color: "#dc2626",
                  }}
                >
                  XOA TAT CA
                </span>{" "}
                để xác nhận:
              </p>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="XOA TAT CA"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "2px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontFamily: "monospace",
                  textAlign: "center",
                  boxSizing: "border-box",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => {
                  setShowDeleteAllModal(false);
                  setConfirmText("");
                }}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Hủy
              </button>
              <button
                onClick={confirmDeleteAll}
                disabled={confirmText !== "XOA TAT CA"}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor:
                    confirmText === "XOA TAT CA" ? "#ef4444" : "#d1d5db",
                  color: confirmText === "XOA TAT CA" ? "#fff" : "#6b7280",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: confirmText === "XOA TAT CA" ? "pointer" : "not-allowed",
                }}
              >
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TOAST NOTIFICATION ─── */}
      {showSuccessModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              backgroundColor: "#22c55e",
              color: "#fff",
              padding: "16px 32px",
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            {successMessage}
          </div>
        </div>
      )}
    </div>
  );
}