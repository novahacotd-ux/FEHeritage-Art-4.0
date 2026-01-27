import React, { useState } from "react";
import CKEditorField from "../../components/common/CKEditorField";

// ===== DỮ LIỆU MẪU =====
const initialPosts = [
    {
        id: "A-01",
        title: "Góc nhìn về bảo tồn phố cổ",
        summary: "Những thách thức trong bảo tồn kiến trúc đô thị lịch sử.",
        content: "<p>Việc bảo tồn phố cổ cần kết hợp giữa quy hoạch hiện đại và giữ gìn giá trị nguyên bản...</p>",
        thumbnail: "",
    },
];

// ======= ICON X SVG =========
const X = (props) => (
    <svg className={props.className || "w-5 h-5"} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
);

const AdminGocNhin = () => {
    const [items, setItems] = useState(initialPosts);
    const [form, setForm] = useState({
        id: "",
        title: "",
        summary: "",
        content: "",
        thumbnail: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [viewItem, setViewItem] = useState(null);
    const [ setThumbnailPreview] = useState("");

    // RESET FORM
    const resetForm = () => {
        setForm({ id: "", title: "", summary: "", content: "", thumbnail: "" });
        setEditingId(null);
        setThumbnailPreview("");
    };

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.summary) return;

        if (editingId) {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === editingId ? { ...form, id: editingId } : item
                )
            );
        } else {
            const nextId = `A-${String(items.length + 1).padStart(2, "0")}`;
            setItems((prev) => [...prev, { ...form, id: nextId }]);
        }
        resetForm();
    };

    // EDIT
    const handleEdit = (item) => {
        setEditingId(item.id);
        setForm(item);
        setThumbnailPreview(item.thumbnail);
    };

    // DELETE
    const handleDelete = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
        if (editingId === id) resetForm();
    };

    // THUMBNAIL REMOVE
    const removeThumbnail = () => {
        setForm({ ...form, thumbnail: "" });
        setThumbnailPreview("");
    };

    // THUMBNAIL UPLOAD
    const handleThumbnailUpload = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setForm({ ...form, thumbnail: ev.target.result });
                setThumbnailPreview(ev.target.result);
            };
            reader.readAsDataURL(file);
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
                .btn-cancel {
                    background: #f1f5f9;
                    color: #0369a1;
                }
                .btn-cancel:hover {
                    background: #e0e7ef;
                }
                .admin-gocnhin-card:hover {
                    border-color: #38bdf8;
                    box-shadow: 0 4px 12px 0 #60a5fa38;
                }
                .admin-gocnhin-modal-anim {
                    animation: adminFadeIn 0.30s;
                }
                @keyframes adminFadeIn {
                    from { opacity: 0; transform: translateY(35px);}
                    to   { opacity: 1; transform: translateY(0);}
                }
                .input-file-label {
                    display: inline-flex;
                    align-items: center;
                    background: #e0e7ef;
                    color: #0369a1;
                    padding: 0.5rem 1rem;
                    border-radius: 0.75rem;
                    cursor: pointer;
                    font-weight: 500;
                    box-shadow: 0 2px 8px 0 #dbeafe50;
                    margin-top: 0.3rem;
                    transition: background 0.16s;
                }
                .input-file-label svg {
                    margin-right: 0.5rem;
                }
                .input-file-label:hover {
                    background: #bae6fd;
                }
                .input-file {
                    display: none;
                }
                .admin-preview-img {
                    box-shadow: 0 2px 12px 0 #2563eb34;
                    border: 2px solid #bae6fd;
                    transition: box-shadow .2s;
                }
                .admin-preview-img:hover {
                    box-shadow: 0 4px 18px 0 #2563eb54;
                }
                .admin-thumbnail-remove {
                    opacity: 0.84;
                    background: linear-gradient(45deg,#e11d48,#f87171);
                    border: none;
                }
                .admin-thumbnail-remove:hover {
                    opacity: 1;
                    background: linear-gradient(85deg,#b91c1c,#f43f5e);
                }
            `}</style>
            <div className="w-full flex flex-col gap-8 mt-4">
                {/* ===== HEADER ===== */}
                <div className="flex items-center justify-between py-4 px-6 bg-white border-b border-blue-100 rounded-t-lg">
                    <div>
                        <h2 className="text-xl font-bold text-blue-700">Góc nhìn</h2>
                        <p className="text-gray-500 text-sm">
                            Quản lý bài viết phân tích, góc nhìn: tiêu đề, mô tả, nội dung, ảnh đại diện
                        </p>
                    </div>
                    <button
                        className="btn-primary btn-transition px-4 py-2 rounded-lg"
                        onClick={resetForm}
                    >
                        Thêm mới
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* ===== DANH SÁCH ===== */}
                    <div className="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-5 pb-4 border-b border-blue-50">
                            <h3 className="font-semibold text-blue-700 text-lg">Danh sách</h3>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                                {items.length} bài
                            </span>
                        </div>
                        <div className="flex flex-col gap-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="admin-gocnhin-card flex flex-col border border-blue-50 rounded-lg shadow-sm p-4 bg-blue-50 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        {item.thumbnail && (
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="w-20 h-20 object-cover rounded-md border border-blue-200 shadow"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <h4 className="font-bold text-blue-900 text-base mb-1">
                                                {item.title}
                                            </h4>
                                            <div className="text-sm text-gray-600">
                                                {item.summary}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-4 justify-end">
                                        <button
                                            className="px-4 py-1 rounded bg-blue-50 text-blue-700 border border-blue-300 font-medium text-sm hover:bg-blue-100"
                                            onClick={() => setViewItem(item)}
                                        >
                                            Xem chi tiết
                                        </button>
                                        <button
                                            className="px-4 py-1 rounded bg-yellow-100 text-yellow-800 border border-yellow-300 font-medium text-sm hover:bg-yellow-200"
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
                                    </div>
                                </div>
                            ))}
                            {items.length === 0 && (
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
                                {editingId ? "Chỉnh sửa" : "Thêm mới"}
                            </h3>
                            {editingId && (
                                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
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
                                    onChange={(e) =>
                                        setForm({ ...form, title: e.target.value })
                                    }
                                    required
                                    placeholder="Nhập tiêu đề bài phân tích/góc nhìn"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-700 mb-2">
                                    Mô tả ngắn <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="border border-blue-200 rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-blue-900 bg-blue-50 placeholder:text-gray-400"
                                    value={form.summary}
                                    onChange={(e) =>
                                        setForm({ ...form, summary: e.target.value })
                                    }
                                    required
                                    placeholder="Tóm tắt nội dung"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-700 mb-2">
                                    Nội dung bài phân tích <span className="text-red-500">*</span>
                                </label>
                                <CKEditorField
                                    value={form.content}
                                    onChange={(content) => setForm({ ...form, content })}
                                    placeholder="Nhập nội dung phân tích, có thể in đậm, danh sách, trích dẫn, hình ảnh..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-blue-700 mb-2">
                                    Ảnh đại diện
                                </label>
                                <label className="input-file-label" htmlFor="admin-gocnhin-thumbnail-input">
                                    <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                                    </svg>
                                    {form.thumbnail ? 'Đổi ảnh đại diện' : 'Chọn ảnh đại diện'}
                                </label>
                                <input
                                    id="admin-gocnhin-thumbnail-input"
                                    type="file"
                                    accept="image/*"
                                    className="input-file"
                                    onChange={handleThumbnailUpload}
                                />
                                {form.thumbnail && (
                                    <div className="relative w-fit mt-3">
                                        <img
                                            src={form.thumbnail}
                                            alt="preview"
                                            className="max-w-xs max-h-44 object-contain rounded-lg admin-preview-img"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-2 right-2 admin-thumbnail-remove text-white rounded-full p-2 shadow transition"
                                            onClick={removeThumbnail}
                                            tabIndex={-1}
                                        >
                                            <X />
                                        </button>
                                        <span className="absolute left-2 bottom-2 text-xs bg-blue-50/80 px-2 py-1 text-blue-800 rounded shadow">
                                            JPG, PNG, GIF (tối đa 5MB)
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button
                                    className="btn-primary btn-transition px-4 py-2 rounded-lg"
                                    type="submit"
                                >
                                    {editingId ? "Lưu thay đổi" : "Tạo mới"}
                                </button>
                                <button
                                    className="btn-cancel px-4 py-2 rounded-lg font-semibold transition border border-blue-300 btn-transition"
                                    type="button"
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
                        <div className="admin-gocnhin-modal-anim bg-white rounded-xl shadow-xl max-w-xl w-full p-6 relative border border-blue-200">
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

                            {viewItem.thumbnail && (
                                <img
                                    src={viewItem.thumbnail}
                                    alt={viewItem.title}
                                    className="w-full max-h-64 object-cover rounded-lg border border-blue-100 mb-3"
                                />
                            )}
                            <div className="text-gray-600 text-base mb-2">
                                {viewItem.summary}
                            </div>
                            <div
                                className="ck-content prose max-w-none"
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

export default AdminGocNhin;