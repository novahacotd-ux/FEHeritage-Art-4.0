import React, { useState } from "react";
import CKEditorField from "../../components/common/CKEditorField";

const initialArticles = [
    {
        id: "A-01",
        title: "Bảo tồn di sản số: Cơ hội và thách thức",
        author: "Phạm Thu Thảo",
        content: "<p>Phân tích cách số hóa giúp tiếp cận di sản và những rủi ro khi phụ thuộc vào công nghệ.</p>",
        date: "2025-01-14",
    },
    {
        id: "A-02",
        title: "Góc nhìn: Du lịch di sản bền vững",
        author: "Ngô Minh Quân",
        content: "<p>Đề xuất mô hình cộng đồng tham gia quản lý và chia sẻ lợi ích từ du lịch văn hóa.</p>",
        date: "2024-12-30",
    },
];

const emptyForm = { title: "", author: "", content: "", date: "" };

const X = (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
);

const AdminPhanTich = () => {
    const [viewItem, setViewItem] = useState(null);
    const [articles, setArticles] = useState(initialArticles);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);

    // ===== RESET FORM =====
    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.author || !form.date) return;
        if (editingId) {
            setArticles(prev =>
                prev.map(item => (item.id === editingId ? { ...form, id: editingId } : item))
            );
        } else {
            const nextId = `A-${String(articles.length + 1).padStart(2, "0")}`;
            setArticles(prev => [...prev, { ...form, id: nextId }]);
        }
        resetForm();
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setForm(item);
    };

    const handleDelete = (id) => {
        setArticles(prev => prev.filter(item => item.id !== id));
        if (editingId === id) resetForm();
    };

    return (
        <>
            <style>{`
                .btn-transition {
                    transition: background 0.15s, box-shadow 0.15s;
                }
                .btn-primary {
                    background: linear-gradient(90deg,#2563eb,#38bdf8);
                    color: #fff;
                    font-weight: 600;
                    box-shadow: 0 2px 6px 0 #2563eb22;
                }
                .btn-primary:hover {
                    background: linear-gradient(90deg,#1d4ed8 80%,#0ea5e9);
                }
                .btn-cancel {
                    background: #e0e7ff;
                    color: #2563eb;
                }
                .btn-cancel:hover {
                    background: #c7d2fe;
                }
                .admin-phantich-card:hover {
                    border-color: #0ea5e9;
                    box-shadow: 0 4px 12px 0 #38bdf828;
                }
                .admin-phantich-modal-anim {
                    animation: adminFadeIn 0.30s;
                }
                @keyframes adminFadeIn {
                    from { opacity: 0; transform: translateY(35px);}
                    to   { opacity: 1; transform: translateY(0);}
                }
                .badge-warning {
                    background: #e0e7ff;
                    color: #2563eb;
                }
            `}</style>
            <div className="w-full flex flex-col gap-8 mt-4">
                {/* ===== HEADER ===== */}
                <div className="flex items-center justify-between py-4 px-6 bg-white border-b border-blue-100 rounded-t-lg">
                    <div>
                        <h2 className="text-xl font-bold text-blue-700">Phân tích</h2>
                        <p className="text-gray-500 text-sm">
                            Quản lý phân tích: tiêu đề, nội dung, tác giả, ngày
                        </p>
                    </div>
                    <button
                        className="btn-primary btn-transition px-4 py-2 rounded-lg"
                        onClick={resetForm}
                    >
                        Thêm bài phân tích
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* ===== DANH SÁCH ===== */}
                    <div className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-5 pb-4 border-b border-blue-50">
                            <h3 className="font-semibold text-blue-700 text-lg">Danh sách</h3>
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                                {articles.length} bài
                            </span>
                        </div>
                        <div className="flex flex-col gap-4">
                            {articles.map((item) => (
                                <div
                                    key={item.id}
                                    className="admin-phantich-card flex flex-col border border-blue-50 rounded-lg shadow-sm p-4 bg-blue-50 transition-all"
                                >
                                    <h4 className="font-bold text-blue-900 text-base mb-1">{item.title}</h4>
                                    <div className="text-sm text-blue-700 mb-0.5">Tác giả: {item.author}</div>
                                    <div className="text-sm text-blue-500 mb-2">Ngày đăng: {item.date}</div>
                                    <div
                                        className="prose max-w-none text-blue-900 text-sm mb-2"
                                        dangerouslySetInnerHTML={{ __html: item.content }}
                                    />
                                    <div className="flex gap-2 mt-3 justify-end">
                                        <button
                                            className="px-4 py-1 rounded bg-blue-100 text-blue-800 border border-blue-300 font-medium text-sm hover:bg-blue-200"
                                            onClick={() => handleEdit(item)}
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button
                                            className="px-4 py-1 rounded bg-red-100 text-red-700 border border-red-300 font-medium text-sm hover:bg-red-200"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Xóa
                                        </button>
                                        <button
                                            className="px-4 py-1 rounded bg-white text-blue-700 border border-blue-300 font-medium text-sm hover:bg-blue-100"
                                            onClick={() => setViewItem(item)}
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {articles.length === 0 && (
                                <div className="text-center text-gray-400 py-6">
                                    Chưa có bài viết
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ===== FORM ===== */}
                    <div className="bg-white rounded-xl shadow border border-blue-100 p-6">
                        <div className="flex items-center gap-4 mb-5 pb-4 border-b border-blue-50">
                            <h3 className="font-semibold text-blue-700 text-lg">
                                {editingId ? "Cập nhật bài viết" : "Soạn bài mới"}
                            </h3>
                            {editingId && (
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                                    Đang sửa {editingId}
                                </span>
                            )}
                        </div>
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-blue-700 mb-2">
                                    Tiêu đề <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="border border-blue-200 rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-blue-900 bg-blue-50 placeholder:text-gray-400"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    required
                                    placeholder="Nhập tiêu đề bài phân tích"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-700 mb-2">
                                    Tác giả <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="border border-blue-200 rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-blue-900 bg-blue-50 placeholder:text-gray-400"
                                    value={form.author}
                                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                                    required
                                    placeholder="Nhập tên tác giả"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-700 mb-2">
                                    Ngày đăng <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="border border-blue-200 rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-blue-900 bg-blue-50 placeholder:text-gray-400"
                                    type="date"
                                    value={form.date}
                                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                                    required
                                    placeholder="Chọn ngày đăng"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-700 mb-2">
                                    Nội dung <span className="text-red-500">*</span>
                                </label>
                                <CKEditorField
                                    value={form.content}
                                    onChange={(content) => setForm({ ...form, content })}
                                    placeholder="Nhập nội dung phân tích..."
                                />
                            </div>

                            <div className="flex gap-2 mt-2">
                                <button type="submit" className="btn-primary btn-transition px-4 py-2 rounded-lg">
                                    {editingId ? "Lưu thay đổi" : "Xuất bản"}
                                </button>
                                <button
                                    type="button"
                                    className="btn-cancel px-4 py-2 rounded-lg font-semibold transition border border-blue-300 btn-transition"
                                    onClick={resetForm}
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* ===== MODAL XEM CHI TIẾT ===== */}
                {viewItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 z-[9999] flex items-center justify-center">
                        <div className="admin-phantich-modal-anim bg-white rounded-xl shadow-xl max-w-xl w-full p-6 relative border border-blue-200">
                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-blue-50">
                                <h3 className="text-lg font-bold text-blue-700">
                                    {viewItem.title}
                                </h3>
                                <button
                                    className="bg-red-100 text-red-500 hover:bg-red-200 p-2 rounded-full transition"
                                    onClick={() => setViewItem(null)}
                                >
                                    <X className="w-6 h-6"/>
                                </button>
                            </div>

                            <div className="text-blue-700 text-sm mb-1">
                                <span className="font-medium">Tác giả: </span>
                                {viewItem.author}
                                {viewItem.date && (
                                    <span className="ml-6 text-blue-800">
                                        <span className="font-medium">Ngày đăng:&nbsp;</span>
                                        {viewItem.date}
                                    </span>
                                )}
                            </div>
                            <div
                                className="ck-content prose max-w-none mt-3"
                                dangerouslySetInnerHTML={{
                                    __html: viewItem.content,
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminPhanTich;