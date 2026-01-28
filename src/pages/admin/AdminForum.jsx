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
