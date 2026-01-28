import React from "react";
import { useNavigate } from "react-router-dom";

// Dữ liệu thống kê tổng quan trên dashboard
const stats = [
    { label: "Người dùng", value: 12450, sub: "+320 mới / 30 ngày", path: "/admin/users" },
    { label: "Bài cộng đồng", value: 860, sub: "Tin tức, bài viết, diễn đàn", path: "/admin/news" },
    { label: "Cần duyệt", value: 42, sub: "Bài chờ duyệt & báo cáo", path: "/admin/forum" },
    { label: "Tương tác", value: "12.4K", sub: "Lượt xem & phản hồi", path: "/admin/analysis" },
];

// Danh sách nội dung đang chờ duyệt
const pendingItems = [
    { id: "P-1021", type: "Diễn đàn", title: "Nghệ thuật Đông Sơn", author: "Minh Hòa", status: "pending" },
    { id: "P-1022", type: "Tin tức", title: "Lễ hội Nghinh Ông 2024", author: "Báo cáo viên", status: "pending" },
    { id: "P-1023", type: "Góc nhìn", title: "Bảo tồn kiến trúc phố cổ", author: "Lan Anh", status: "pending" },
];

// Các cập nhật / hoạt động nổi bật gần đây
const highlights = [
    { title: "Bản đồ số di sản", detail: "Thêm 12 địa điểm, 38 hình ảnh mới", date: "Hôm nay" },
    { title: "Quy tắc cộng đồng", detail: "Cập nhật hướng dẫn xử lý nội dung nhạy cảm", date: "Hôm nay" },
    { title: "AI gợi ý mô tả", detail: "Triển khai thử nghiệm mô tả tranh tự động", date: "Hôm qua" },
];

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Điều hướng nhanh sang các màn quản trị khác
    const handleNavigate = (path) => {
        if (path) navigate(path);
    };

    return (
        <>
           
            <div className="dashboard-wrapper">
                {/* Tiêu đề trang & hành động chung */}
                <div className="dashboard-header">
                    <div>
                        <h3>Bảng điều khiển</h3>
                        <p className="panel-description">Tổng quan hoạt động hệ thống Heritage Art 4.0</p>
                    </div>
                    <button className="dashboard-mock-btn">Tải mock data</button>
                </div>

                {/* Thẻ thống kê nhanh */}
                <div className="dashboard-stats-row">
                    {stats.map((item) => (
                        <div
                            key={item.label}
                            className="dashboard-stat-card"
                            onClick={() => handleNavigate(item.path)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && handleNavigate(item.path)}
                        >
                            <h5>{item.label}</h5>
                            <div className="stat-value">{item.value}</div>
                            <div className="stat-sub">{item.sub}</div>
                        </div>
                    ))}
                </div>

                {/* cột: nội dung chờ duyệt & cập nhật nhanh */}
                <div className="dashboard-main-grid">
                    {/* Panel: danh sách nội dung đang chờ duyệt */}
                    <div className="dashboard-panel">
                        <div className="panel-head">
                            <h3>Đang chờ duyệt</h3>
                            <span className="badge warning">{pendingItems.length} mục</span>
                        </div>
                        {/* Bảng danh sách nội dung chờ duyệt */}
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Loại</th>
                                    <th>Tiêu đề</th>
                                    <th>Tác giả</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.type}</td>
                                        <td>{item.title}</td>
                                        <td>{item.author}</td>
                                        <td>
                                            <span className="status-pill pending">Chờ duyệt</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Panel: các cập nhật / highlight hệ thống */}
                    <div className="dashboard-panel">
                        <div className="panel-head">
                            <h3>Cập nhật nhanh</h3>
                            <span className="badge success">Hoạt động</span>
                        </div>
                        <div className="dashboard-highlight-list">
                            {highlights.map((item) => (
                                <div key={item.title} className="dashboard-highlight-card">
                                    <h4>{item.title}</h4>
                                    <div className="item-meta">{item.detail}</div>
                                    <div className="item-date">{item.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
