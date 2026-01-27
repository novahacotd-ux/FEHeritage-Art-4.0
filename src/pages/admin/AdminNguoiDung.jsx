import React, { useMemo, useState } from "react";

// ======= ICON SVG =========
const X = (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
);

const mockUsers = [
    {
        id: "U-1001",
        name: "Nguyễn Văn An",
        identityNumber: "012345678901",
        dateOfBirth: "1998-03-12",
        email: "an.nguyen@example.com",
        gender: "male",
        intro: "Quản trị viên hệ thống",
        avatar: "https://i.pravatar.cc/150?img=12",
        created_at: "2024-01-12",
        status: "active",
    },
    {
        id: "U-1002",
        name: "Trần Thu Hà",
        identityNumber: "079845612300",
        dateOfBirth: "2000-07-21",
        email: "ha.tran@example.com",
        gender: "female",
        intro: "Cộng tác viên nội dung",
        avatar: "https://i.pravatar.cc/150?img=32",
        created_at: "2024-05-20",
        status: "locked",
    },
];



const genderMap = { male: "Nam", female: "Nữ" };

const AdminNguoiDung = () => {
    const [users, setUsers] = useState(mockUsers);
    const [selectedId, setSelectedId] = useState(users[0]?.id || null);
    const [query, setQuery] = useState("");
    const [viewUser, setViewUser] = useState(null);

    /** user đang được chọn */
    const selectedUser = useMemo(
        () => users.find((u) => u.id === selectedId),
        [users, selectedId]
    );

    /** filter danh sách */
    const filteredUsers = useMemo(() => {
        const q = query.toLowerCase();
        return users.filter(
            (u) =>
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                u.id.toLowerCase().includes(q)
        );
    }, [users, query]);

    /** khóa / mở khóa */
    const toggleStatus = (id) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === id
                    ? { ...u, status: u.status === "active" ? "locked" : "active" }
                    : u
            )
        );
        // Sync possible changes in modal/profile view
        if (viewUser?.id === id) {
            setViewUser((prev) =>
                prev ? { ...prev, status: prev.status === "active" ? "locked" : "active" } : prev
            );
        }
    };

    return (
        <>
            <style>{`
                .btn-transition {
                    transition: background 0.15s, box-shadow 0.15s;
                }
                .btn-primary {
                    background: linear-gradient(90deg,#2563eb,#22d3ee);
                    color: #fff;
                    font-weight: 600;
                    box-shadow: 0 2px 6px 0 #dbeafecc;
                }
                .btn-primary:hover {
                    background: linear-gradient(90deg,#2563eb 80%,#0ea5e9);
                }
                .btn-danger {
                    background: linear-gradient(90deg,#be123c,#f43f5e 95%);
                    color: #fff;
                    font-weight: 600;
                    box-shadow: 0 2px 6px 0 #fecdd3cc;
                }
                .btn-danger:hover {
                    background: linear-gradient(90deg,#be123c 75%,#ef4444 100%);
                }
                .btn-cancel {
                    background: #f1f5f9;
                    color: #0369a1;
                }
                .btn-cancel:hover {
                    background: #e0e7ef;
                }
                .badge-status {
                    display: inline-block;
                    border-radius: 999px;
                    padding: 0.22em 0.85em;
                    font-weight: 600;
                    font-size: 0.89em;
                    border-width: 1.5px;
                }
                .admin-nguoidung-avatar {
                    width: 64px;
                    height: 64px;
                    object-fit: cover;
                    border-radius: 999px;
                    border: 3px solid #bae6fd;
                    box-shadow: 0 2px 12px 0 #2563eb34;
                }
                .admin-nguoidung-table {
                    border-radius: 0.75rem;
                    overflow: hidden;
                    background: #fff;
                    border: 1.5px solid #bfdbfe;
                }
                .admin-nguoidung-table th, .admin-nguoidung-table td {
                    padding: 0.55rem 1rem;
                }
                .admin-nguoidung-table thead {
                    background: #f1f5f9;
                }
                .admin-nguoidung-modal-anim {
                    animation: adminFadeIn 0.30s;
                }
                @keyframes adminFadeIn {
                    from { opacity: 0; transform: translateY(35px);}
                    to   { opacity: 1; transform: translateY(0);}
                }
                .table-empty {
                    text-align: center;
                    color: #64748b;
                    background: #f1f5f9;
                    font-style: italic;
                }
                .admin-user-detail-label {
                    color: #2563eb;
                    font-weight: 500;
                }
                .admin-user-meta-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.7em 2.6em;
                    font-size: 1rem;
                    margin-top: 0.45em;
                    margin-bottom: 0.45em;
                }
            `}</style>
            <div className="w-full flex flex-col gap-8 mt-4">
                {/* ===== HEADER ===== */}
                <div className="flex items-center justify-between py-4 px-6 bg-white border-b border-blue-100 rounded-t-lg">
                    <div>
                        <h2 className="text-xl font-bold text-blue-700" style={{margin: 0}}>Quản lý người dùng</h2>
                        <p className="text-gray-500 text-sm">
                            Quản lý tài khoản người dùng hệ thống: xem, tìm kiếm, trạng thái, chi tiết.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 admin-grid-2">
                    {/* ================= LIST PANEL ================= */}
                    <div className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-5 pb-4 border-b border-blue-50">
                            <h3 className="font-semibold text-blue-700 text-lg">Danh sách người dùng</h3>
                            <input
                                className="border border-blue-200 rounded px-3 py-2 w-72 outline-none focus:ring-2 focus:ring-blue-300
                                    focus:border-blue-400 text-blue-900 bg-blue-50 placeholder:text-gray-400"
                                placeholder="Tìm theo tên, email, mã..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className="overflow-x-auto w-full">
                            <table className="admin-nguoidung-table min-w-full">
                                <thead>
                                    <tr>
                                        <th>Mã</th>
                                        <th>Họ tên</th>
                                        <th>Email</th>
                                        <th>Trạng thái</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="table-empty py-6">Không tìm thấy người dùng</td>
                                        </tr>
                                    )}
                                    {filteredUsers.map((u) => (
                                        <tr
                                            key={u.id}
                                            className={u.id === selectedId ? "bg-blue-50" : ""}
                                            style={{
                                                transition: "background 0.18s"
                                            }}
                                        >
                                            <td className="font-semibold text-blue-700">{u.id}</td>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                <span
                                                    className={`badge-status ${
                                                        u.status === "active"
                                                            ? "bg-green-100 text-green-800 border-green-200"
                                                            : "bg-red-100 text-red-800 border-red-200"
                                                    } border`}
                                                >
                                                    {u.status === "active"
                                                        ? "Hoạt động"
                                                        : "Đã khóa"}
                                                </span>
                                            </td>
                                            <td align="right">
                                                <button
                                                    className="px-4 py-1 rounded bg-blue-50 text-blue-700 border border-blue-300 font-medium text-sm hover:bg-blue-100 btn-transition"
                                                    onClick={() => setSelectedId(u.id)}
                                                >
                                                    Chi tiết
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* ================= DETAIL PANEL ================= */}
                    <div className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col">
                        <div className="flex items-center gap-4 mb-5 pb-4 border-b border-blue-50">
                            <h3 className="font-semibold text-blue-700 text-lg">Thông tin chi tiết</h3>
                            {selectedUser && (
                                <span
                                    className={`badge-status border ${
                                        selectedUser.status === "active"
                                            ? "bg-green-100 text-green-800 border-green-200"
                                            : "bg-red-100 text-red-800 border-red-200"
                                    }`}
                                >
                                    {selectedUser.status === "active" ? "Hoạt động" : "Đã khóa"}
                                </span>
                            )}
                        </div>
                        {selectedUser ? (
                            <div className="flex flex-col items-center w-full">
                                <div className="flex flex-col items-center mb-6">
                                    <img
                                        src={selectedUser.avatar}
                                        alt={selectedUser.name}
                                        className="admin-nguoidung-avatar shadow"
                                    />
                                    <h4 className="text-lg font-bold text-blue-800 mt-3 mb-2">{selectedUser.name}</h4>
                                    <div className="text-gray-500 mb-1 italic font-medium">{selectedUser.intro || <span>Không có mô tả</span>}</div>
                                </div>
                                <div className="admin-user-meta-row mb-3">
                                    <div>
                                        <span className="admin-user-detail-label">Mã:</span> {selectedUser.id}
                                    </div>
                                    <div>
                                        <span className="admin-user-detail-label">Email:</span> {selectedUser.email}
                                    </div>
                                </div>
                                <div className="admin-user-meta-row mb-3">
                                    <div>
                                        <span className="admin-user-detail-label">CCCD:</span> {selectedUser.identityNumber}
                                    </div>
                                    <div>
                                        <span className="admin-user-detail-label">Ngày sinh:</span> {selectedUser.dateOfBirth}
                                    </div>
                                </div>
                                <div className="admin-user-meta-row mb-3">
                                    <div>
                                        <span className="admin-user-detail-label">Giới tính:</span> {genderMap[selectedUser.gender] || selectedUser.gender}
                                    </div>
                                </div>
                                <div className="admin-user-meta-row mb-2">
                                    <div>
                                        <span className="admin-user-detail-label">Ngày tạo:</span> {selectedUser.created_at}
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button
                                        className={`btn-transition px-4 py-2 rounded-lg font-semibold border
                                            ${selectedUser.status === "active"
                                                ? "btn-danger border-pink-200"
                                                : "btn-primary border-blue-200"
                                            }`}
                                        onClick={() => toggleStatus(selectedUser.id)}
                                    >
                                        {selectedUser.status === "active"
                                            ? "Khóa tài khoản"
                                            : "Mở khóa"}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-blue-400 py-10 text-center font-medium">
                                Chọn người dùng để xem chi tiết
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminNguoiDung;
