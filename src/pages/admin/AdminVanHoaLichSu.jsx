import React, { useEffect, useMemo, useState } from "react";
import CKEditorField from "../../components/common/CKEditorField";

/* ===== DỮ LIỆU MẪU ===== */
const initialCulture = [
    {
        id: "C-01",
        title: "Nghệ thuật Chăm pa",
        topic: "Văn hóa",
        period: "Thế kỷ 7 - 15",
        image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=600&q=80",
        content: "<p>Điêu khắc đá và kiến trúc tháp gạch đặc sắc của vương quốc Chăm pa.</p>",
    },
    {
        id: "C-02",
        title: "Khởi nghĩa Lam Sơn",
        topic: "Lịch sử",
        period: "1418 - 1427",
        image: "https://images.unsplash.com/photo-1478088702442-5a17d94b241c?auto=format&fit=crop&w=600&q=80",
        content: "<p>Cuộc khởi nghĩa giải phóng dân tộc, đặt nền móng cho triều đại Hậu Lê.</p>",
    },
];

const topics = [
    { label: "Văn hóa", value: "Văn hóa" },
    { label: "Lịch sử", value: "Lịch sử" },
];

const emptyForm = {
    id: "",
    title: "",
    topic: "Văn hóa",
    period: "",
    image: "",
    content: "",
};

const AdminVanHoaLichSu = () => {
    const [items, setItems] = useState(initialCulture);
    const [selectedId, setSelectedId] = useState(initialCulture[0]?.id || null);
    const [form, setForm] = useState(emptyForm);
    const [viewItem, setViewItem] = useState(null);

    const selected = useMemo(
        () => items.find((i) => i.id === selectedId),
        [items, selectedId]
    );

    /* ===== đồng bộ form khi đổi item ===== */
    useEffect(() => {
        if (selected) setForm(selected);
    }, [selectedId]);

    /* ===== LƯU ===== */
    const updateItem = (e) => {
        e.preventDefault();
        if (!selected) return;

        setItems((prev) =>
            prev.map((i) => (i.id === selected.id ? { ...form } : i))
        );
    };

    /* ===== XÓA ===== */
    const deleteItem = (id) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
        if (id === selectedId) {
            setSelectedId(null);
            setForm(emptyForm);
        }
    };

    // ===== IMAGE upload and preview handling (URL.createObjectURL replacement by reading file as dataURL for sameness with AdminTinTuc) =====
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setForm({ ...form, image: ev.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setForm({ ...form, image: "" });
    };

    return (
        <>
            
            <div className="adhvl-container">
                {/* ===== HEADER ===== */}
                <div className="adhvl-header">
                    <div>
                        <h2>Hành trình lịch sử</h2>
                        <p>Quản lý nội dung văn hóa – lịch sử</p>
                    </div>
                </div>
                <div className="adhvl-grid">
                    {/* ===== DANH SÁCH ===== */}
                    <div className="adhvl-panel">
                        <div className="adhvl-panel-head">
                            <h3>Danh sách</h3>
                            <span className="adhvl-badge">{items.length} nội dung</span>
                        </div>
                        <div className="adhvl-list-cards">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={`adhvl-card${selectedId === item.id ? " selected" : ""}`}
                                onClick={() => setSelectedId(item.id)}
                                tabIndex={0}
                            >
                                <div className="adhvl-card-title">{item.title}</div>
                                <div className="adhvl-item-meta">
                                    {item.topic} • {item.period}
                                </div>
                                <div className="adhvl-card-actions">
                                    <button
                                        className="adhvl-btn"
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setViewItem(item);
                                        }}
                                    >
                                        Xem chi tiết
                                    </button>
                                    <button
                                        className="adhvl-btn"
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedId(item.id);
                                        }}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        className="adhvl-btn danger"
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteItem(item.id);
                                        }}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                        {items.length === 0 && (
                            <div className="adhvl-empty-state">
                                Chưa có nội dung văn hóa/lịch sử.
                            </div>
                        )}
                        </div>
                    </div>

                    {/* ===== FORM ===== */}
                    <div className="adhvl-panel">
                        <div className="adhvl-panel-head">
                            <h3>Chi tiết & chỉnh sửa</h3>
                            {selected && (
                                <span className="adhvl-badge" style={{ background: selected.topic === "Văn hóa" ? "#ccfbf1" : "#fef08a", color: selected.topic === "Văn hóa" ? "#0e7490" : "#ca8a04" }}>
                                    {selected.topic}
                                </span>
                            )}
                        </div>
                        {selected ? (
                            <form className="adhvl-form-grid" onSubmit={updateItem}>
                                <div className="adhvl-form-row">
                                    <div>
                                        <label className="adhvl-label">
                                            Tiêu đề <span style={{ color: "#e11d48" }}>*</span>
                                        </label>
                                        <input
                                            className="adhvl-input"
                                            value={form.title}
                                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                                            required
                                            placeholder="Nhập tiêu đề văn hóa/lịch sử"
                                        />
                                    </div>

                                    <div>
                                        <label className="adhvl-label">Chủ đề</label>
                                        <select
                                            className="adhvl-select"
                                            value={form.topic}
                                            onChange={(e) => setForm({ ...form, topic: e.target.value })}
                                        >
                                            {topics.map((t) => (
                                                <option key={t.value} value={t.value}>
                                                    {t.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="adhvl-label">Thời gian</label>
                                        <input
                                            className="adhvl-input"
                                            value={form.period}
                                            onChange={(e) => setForm({ ...form, period: e.target.value })}
                                            placeholder="Giai đoạn, năm..."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="adhvl-label">Nội dung chi tiết</label>
                                    <CKEditorField
                                        value={form.content}
                                        onChange={(content) => setForm({ ...form, content })}
                                        placeholder="Nhập nội dung..."
                                    />
                                </div>
                                <div>
                                    <label className="adhvl-label">Hình ảnh</label>
                                    <label className="adhvl-file-label" htmlFor="adhvl-image-input">
                                        <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" width={20} height={20}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                                        </svg>
                                        {form.image ? 'Đổi hình ảnh' : 'Chọn hình ảnh'}
                                    </label>
                                    <input
                                        id="adhvl-image-input"
                                        type="file"
                                        accept="image/*"
                                        className="adhvl-file-input"
                                        onChange={handleImageUpload}
                                    />
                                    {form.image && (
                                        <div className="adhvl-preview-img-wrap">
                                            <img
                                                src={form.image}
                                                alt="preview"
                                                className="adhvl-preview-img"
                                            />
                                            <button
                                                type="button"
                                                className="adhvl-image-remove"
                                                onClick={removeImage}
                                                tabIndex={-1}
                                                title="Xóa ảnh"
                                            >
                                                &times;
                                            </button>
                                            <span className="adhvl-img-size-note">
                                                JPG, PNG, GIF (tối đa 5MB)
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div style={{ display: "flex", gap: "0.7em", marginTop: "1.6em" }}>
                                    <button className="adhvl-btn primary" type="submit">
                                        Lưu cập nhật
                                    </button>
                                    <button
                                        className="adhvl-btn cancel"
                                        type="button"
                                        onClick={() => setForm(selected)}
                                    >
                                        Hoàn tác
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="adhvl-empty-state">
                                Chọn nội dung để chỉnh sửa
                            </div>
                        )}
                    </div>
                </div>
                {/* ===== MODAL ===== */}
                {viewItem && (
                    <div className="adhvl-modal-ovl">
                        <div className="adhvl-modal-anim">
                            <div className="adhvl-modal-head">
                                <h3 className="adhvl-modal-title">{viewItem.title}</h3>
                                <button
                                    className="adhvl-modal-close"
                                    onClick={() => setViewItem(null)}
                                    aria-label="Đóng"
                                >&times;</button>
                            </div>
                            {viewItem.image && (
                                <img
                                    src={viewItem.image}
                                    alt={viewItem.title}
                                    className="adhvl-modal-img"
                                />
                            )}
                            <div className="adhvl-modal-meta">
                                {viewItem.topic} • {viewItem.period}
                            </div>
                            <div
                                className="ck-content"
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

export default AdminVanHoaLichSu;
