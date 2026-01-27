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
            <style>{`
                /* TONE DASHBOARD BỚT CHÓI, MÁT MẮT HƠN */
                .dashboard-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    margin-top: 1.5rem;
                }
                .dashboard-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.25rem 1.5rem;
                    background: #f7fafc;
                    border-bottom: 1px solid #e2e8f0;
                    border-radius: 1rem 1rem 0 0;
                }
                .dashboard-header h3 {
                    margin: 0;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #1d3557;
                }
                .dashboard-header .panel-description {
                    color: #64748b;
                    font-size: 0.98rem;
                    margin-top: 0.1rem;
                }
                .dashboard-mock-btn {
                    background: #e9ecf2;
                    color: #2673b8;
                    border-radius: 0.5rem;
                    padding: 0.56rem 1.25rem;
                    cursor: pointer;
                    font-weight: 500;
                    box-shadow: 0 2px 6px 0 #e0e7ef88;
                    border: none;
                    transition: background 0.14s;
                }
                .dashboard-mock-btn:hover {
                    background: #e3e8ee;
                }
                .dashboard-stats-row {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 1.25rem;
                }
                .dashboard-stat-card {
                    background: linear-gradient(120deg, #f8fafc 60%, #dbeafe 94%);
                    color: #213055;
                    border-radius: 1rem;
                    padding: 1.65rem 1.3rem 1.4rem 1.3rem;
                    box-shadow: 0 2px 10px 0 #b6c7de28;
                    cursor: pointer;
                    border: 2px solid #dbebff;
                    transition: box-shadow .16s, border-color .18s, background .15s;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                .dashboard-stat-card:hover {
                    border-color: #38bdf8;
                    box-shadow: 0 4px 18px 0 #60a5fa38;
                    background: linear-gradient(90deg,#2563eb 82%,#0ea5e9);
                }
                .dashboard-stat-card h5 {
                    font-size: 1.08rem;
                    margin: 0 0 0.25rem 0;
                    font-weight: 700;
                }
                .dashboard-stat-card .stat-value {
                    font-size: 2rem;
                    font-weight: 800;
                    letter-spacing: 0.01em;
                }
                .dashboard-stat-card .stat-sub {
                    color: #bae6fd;
                    font-size: 0.97rem;
                    font-weight: 500;
                }
                .dashboard-main-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2.25rem;
                }
                @media (max-width: 950px) {
                    .dashboard-main-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }
                .dashboard-panel {
                    background: #fff;
                    border: 1px solid #dbebff;
                    border-radius: 1.35rem;
                    padding: 1.5rem;
                    box-shadow: 0 2px 10px 0 #dbeafe5e;
                    display: flex;
                    flex-direction: column;
                    gap: 1.1rem;
                }
                .dashboard-panel .panel-head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid #e0e7ff;
                }
                .dashboard-panel .panel-head h3 {
                    font-weight: 700;
                    color: #2563eb;
                    font-size: 1.05rem;
                    margin: 0;
                }
                .badge {
                    display: inline-block;
                    font-size: 0.8rem;
                    font-weight: bold;
                    padding: 0.2em 1.1em;
                    border-radius: 9999px;
                    letter-spacing: 0.01em;
                }
                .badge.warning {
                    background: #e0e7ff;
                    color: #2563eb;
                }
                .badge.success {
                    background: #d1fade;
                    color: #17693f;
                }
                .dashboard-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 1rem;
                }
                .dashboard-table th {
                    background: #f1f5fe;
                    color: #1e293b;
                    font-weight: 600;
                    padding: 0.9em 0.6em;
                    border-bottom: 2px solid #e0e7ff;
                    text-align: left;
                    font-size: 0.98rem;
                }
                .dashboard-table td {
                    padding: 0.85em 0.6em;
                    border-bottom: 1px solid #e0e7ff;
                    color: #334155;
                    font-size: 0.97rem;
                }
                .dashboard-table tr:last-child td {
                    border-bottom: none;
                }
                .status-pill {
                    display: inline-block;
                    padding: 0.17em 0.7em;
                    border-radius: 99em;
                    font-size: 0.9em;
                    font-weight: 600;
                }
                .status-pill.pending {
                    background: #ffeeda;
                    color: #e37402;
                }
                .dashboard-highlight-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.95rem;
                }
                .dashboard-highlight-card {
                    background: #e0f2fe;
                    border: 1px solid #bae6fd;
                    border-radius: 0.85em;
                    box-shadow: 0 2px 8px 0 #bae6fd75;
                    padding: 1.05rem 1.10rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                .dashboard-highlight-card h4 {
                    font-size: 1.02rem;
                    color: #0369a1;
                    margin-bottom: 0.17rem;
                    margin-top: 0;
                    font-weight: 700;
                }
                .dashboard-highlight-card .item-meta {
                    color: #0c4a6e;
                    font-size: 0.95rem;
                }
                .dashboard-highlight-card .item-date {
                    color: #155e75;
                    font-weight: 700;
                    font-size: 0.96rem;
                    margin-top: 0.11rem;
                }
            `}</style>
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
