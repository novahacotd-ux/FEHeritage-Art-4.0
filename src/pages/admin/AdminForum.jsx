import React, { useState } from "react";

// ====== DỮ LIỆU MẪU DIỄN ĐÀN ======
const initialThreads = [
    { id: "F-201", title: "Làm sao bảo tồn kiến trúc đình làng?", author: "Thanh Tùng", topic: "Kiến trúc", status: "pending", createdAt: "2025-01-11" },
    { id: "F-202", title: "Ảnh tư liệu phố cổ Hội An", author: "Mai Hương", topic: "Tư liệu", status: "approved", createdAt: "2025-01-08" },
    { id: "F-203", title: "Góp ý trải nghiệm 3D", author: "Nhật Linh", topic: "Công nghệ", status: "hidden", createdAt: "2024-12-30" },
];

const AdminForum = () => {
    const [threads, setThreads] = useState(initialThreads);
    const [selectedId, setSelectedId] = useState(initialThreads[0]?.id || null);

    const selected = threads.find((t) => t.id === selectedId);

    // Ẩn / Hiện bài viết
    const toggleHide = (id) => {
        setThreads((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, status: item.status === "hidden" ? "approved" : "hidden" }
                    : item
            )
        );
    };

    return (
        <>
            <style>{`
               
                .adminforum-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.25rem 1.5rem;
                    background: #fff;
                    border-bottom: 1px solid #bae6fd;
                    border-radius: 1rem 1rem 0 0;
                }
                .adminforum-header h2 {
                    font-size: 1.3rem;
                    font-weight: bold;
                    color: #2563eb;
                    margin: 0;
                }
                .adminforum-header .panel-description {
                    color: #64748b;
                    font-size: .99rem;
                    margin-top: 0.1rem;
                }

                .adminforum-panel {
                    background: #fff;
                    border: 1px solid #bae6fd;
                    border-radius: 1rem;
                    box-shadow: 0 4px 18px 0 #60a5fa22;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                }
                .adminforum-panel .panel-head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    padding-bottom: .5rem;
                    border-bottom: 1px solid #e0e7ef;
                }
                .adminforum-panel h3 {
                    font-size: 1.09rem;
                    font-weight: 700;
                    color: #0c4a6e;
                    margin: 0;
                }
                .adminforum-panel .badge {
                    font-size: .89rem;
                    font-weight: 700;
                    border-radius: 1rem;
                    padding: 0.25em 0.9em;
                    background: #fef08a;
                    color: #ca8a04;
                    border: 1px solid #fde047;
                }
                .adminforum-panel .table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0;
                    background: transparent;
                    margin-top: 0.8rem;
                }
                .adminforum-panel th, .adminforum-panel td {
                    text-align: left;
                    padding: 8px 10px;
                }
                .adminforum-panel thead th {
                    background: #eff6ff;
                    color: #2563eb;
                    font-size: .98rem;
                    font-weight: 700;
                    border-bottom: 2px solid #bae6fd;
                }
                .adminforum-panel tbody tr {
                    transition: background .16s, box-shadow .16s;
                    cursor: pointer;
                }
                .adminforum-panel tbody tr:hover {
                    background: #f0f9ff;
                }
                .adminforum-panel tbody tr.selected, .adminforum-panel tbody tr:active {
                    background: #dbeafe !important;
                }
                .adminforum-panel tbody tr[data-hidden="true"] {
                    opacity: .5;
                }
                .adminforum-panel td {
                    font-size: .96rem;
                }

                .adminforum-detail .item-card {
                    background: #f0f9ff;
                    border-radius: .9rem;
                    box-shadow: 0 1px 4px 0 #818cf845;
                    padding: 1.2rem 1rem;
                    margin-bottom: 1.2rem;
                    transition: box-shadow .16s;
                }
                .adminforum-detail .item-card h4 {
                    margin: 0 0 .6rem 0;
                    color: #1e293b;
                    font-size: 1.08rem;
                    font-weight: 700;
                }
                .adminforum-detail .item-meta {
                    font-size: .98rem;
                    color: #334155;
                    margin-bottom: .3rem;
                }
                .adminforum-detail .item-meta b {
                    color: #2563eb;
                }
                .adminforum-detail .btn-hide {
                    background: linear-gradient(90deg,#2563eb,#22d3ee);
                    color: #fff;
                    font-weight: 700;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: .75rem;
                    font-size: 1rem;
                    box-shadow: 0 2px 6px 0 #dbeafecc;
                    margin-bottom: 4px;
                    transition: background 0.15s, box-shadow 0.13s;
                }
                .adminforum-detail .btn-hide:hover {
                    background: linear-gradient(90deg,#2563eb 80%,#0ea5e9);
                    box-shadow: 0 3px 14px 0 #a5f3fc45;
                }
                .adminforum-detail .btn-hide.hide {
                    opacity: .88;
                    background: linear-gradient(90deg,#f87171 80%,#ef4444);
                }
                .adminforum-detail .btn-hide.hide:hover {
                    background: linear-gradient(90deg,#ef4444 80%,#e11d48 110%);
                    box-shadow: 0 3px 12px 0 #ef444438;
                }
                .adminforum-detail .empty-state {
                    color: #a3a3a3;
                    text-align: center;
                    padding: 2rem 0 1rem 0;
                    font-size: 1.05rem;
                }
                @media (max-width: 900px) {
                    .admin-grid-forum {
                        grid-template-columns: 1fr !important;
                    }
                }
                .admin-grid-forum {
                    display: grid;
                    grid-template-columns: 1.2fr 1.1fr;
                    gap: 2rem;
                    margin-top: 1.5rem;
                }
            `}</style>
            <div className="w-full flex flex-col gap-8 mt-4">
                {/* ===== HEADER ===== */}
                <div className="adminforum-header">
                    <div>
                        <h2>Quản lý diễn đàn</h2>
                        <p className="panel-description">Quản lý & ẩn/hiện bài viết cộng đồng</p>
                    </div>
                </div>

                <div className="admin-grid-forum">
                    {/* ===== DANH SÁCH BÀI VIẾT ===== */}
                    <div className="adminforum-panel">
                        <div className="panel-head">
                            <h3>Danh sách bài viết</h3>
                            <span className="badge">{threads.length} bài</span>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tiêu đề</th>
                                    <th>Tác giả</th>
                                    <th>Chủ đề</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {threads.map((item) => (
                                    <tr
                                        key={item.id}
                                        onClick={() => setSelectedId(item.id)}
                                        data-hidden={item.status === "hidden"}
                                        className={selectedId === item.id ? "selected" : ""}
                                    >
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.author}</td>
                                        <td>{item.topic}</td>
                                        <td>
                                            {item.status === "hidden"
                                                ? <span style={{ color: "#ef4444", fontWeight: 600 }}>Đã ẩn</span>
                                                : <span style={{ color: "#16a34a", fontWeight: 600 }}>Hiển thị</span>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ===== CHI TIẾT BÀI VIẾT ===== */}
                    <div className="adminforum-panel adminforum-detail">
                        <div className="panel-head">
                            <h3>Chi tiết bài viết</h3>
                        </div>
                        {selected ? (
                            <div className="stacked">
                                <div className="item-card">
                                    <h4>{selected.title}</h4>
                                    <div className="item-meta">Tác giả: <b>{selected.author}</b></div>
                                    <div className="item-meta">Chủ đề: <b>{selected.topic}</b></div>
                                    <div className="item-meta">
                                        Ngày tạo:{" "}
                                        <b>
                                            {selected.createdAt}
                                        </b>
                                    </div>
                                    <div className="item-meta">
                                        Trạng thái:{" "}
                                        {selected.status === "hidden"
                                            ? <b style={{ color: "#ef4444" }}>Đã ẩn</b>
                                            : <b style={{ color: "#16a34a" }}>Hiển thị</b>
                                        }
                                    </div>
                                </div>
                                <button
                                    className={`btn-hide ${selected.status === "hidden" ? "hide" : ""}`}
                                    onClick={() => toggleHide(selected.id)}
                                >
                                    {selected.status === "hidden"
                                        ? "Hiện bài viết"
                                        : "Ẩn bài viết"}
                                </button>
                            </div>
                        ) : (
                            <div className="empty-state">Chọn một bài viết</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminForum;
