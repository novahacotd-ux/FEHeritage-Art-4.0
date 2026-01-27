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
            <style>{`
                /* =========== ADMIN STYLE ĐỒNG BỘ VỚI AdminTinTuc.jsx ============ */
                .adhvl-container {
                    margin-top: 1.25rem;
                }
                .adhvl-header {
                    padding: 1rem 1.5rem;
                    background: #fff;
                    border-bottom: 1px solid #bfdbfe;
                    border-radius: 0.75rem 0.75rem 0 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .adhvl-header h2 {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: #2563eb;
                }
                .adhvl-header p {
                    color: #64748b;
                }
                .adhvl-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    margin-top: 1rem;
                }
                @media (max-width: 900px) {
                    .adhvl-grid {
                        grid-template-columns: 1fr;
                    }
                }
                .adhvl-panel {
                    background: #fff;
                    border-radius: 1rem;
                    box-shadow: 0 2px 12px 0 #dbeafe90;
                    border: 1px solid #bfdbfe;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                }
                .adhvl-panel-head {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #e0e7ef;
                }
                .adhvl-panel-head h3 {
                    font-weight: 700;
                    color: #2563eb;
                    font-size: 1.1rem;
                }
                .adhvl-badge {
                    background: #fef08a;
                    color: #ca8a04;
                    font-size: .82em;
                    font-weight: 700;
                    border-radius: 999px;
                    padding: 0.2em 0.8em;
                }
                .adhvl-list-cards {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .adhvl-card {
                    border: 1px solid #e0e7ef;
                    background: #f1f5f9;
                    border-radius: 0.75rem;
                    padding: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    cursor: pointer;
                    transition: box-shadow 0.16s, border-color .16s;
                }
                .adhvl-card.selected, .adhvl-card:hover {
                    border-color: #38bdf8;
                    box-shadow: 0 4px 12px 0 #60a5fa38;
                    background: #e0f2fe;
                }
                .adhvl-card-title {
                    font-weight: 700;
                    color: #0c2860;
                    margin-bottom: 0;
                }
                .adhvl-item-meta {
                    font-size: 0.95em;
                    color: #475569;
                }
                .adhvl-card-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                    justify-content: flex-end;
                }
                .adhvl-btn {
                    font-size: 0.97em;
                    padding: 0.45em 1.1em;
                    border-radius: 0.6em;
                    border: 1px solid #bfdbfe;
                    font-weight: 500;
                    background: #e0e7ef;
                    color: #0369a1;
                    transition: background .14s, color .15s;
                }
                .adhvl-btn:hover {
                    background: #bae6fd;
                    color: #0ea5e9;
                }
                .adhvl-btn.primary {
                    background: linear-gradient(90deg,#2563eb,#22d3ee);
                    color: #fff;
                    font-weight: 600;
                    border: none;
                }
                .adhvl-btn.primary:hover {
                    background: linear-gradient(90deg,#2563eb 80%,#0ea5e9);
                }
                .adhvl-btn.cancel {
                    background: #f1f5f9;
                    color: #0369a1;
                }
                .adhvl-btn.cancel:hover {
                    background: #e0e7ef;
                }
                .adhvl-btn.danger {
                    background: #fee2e2;
                    border: 1px solid #fecaca;
                    color: #ef4444;
                }
                .adhvl-btn.danger:hover {
                    background: #fecaca;
                }
                .adhvl-btn.selected {
                    color: #38bdf8;
                    border-color: #2563eb;
                }
                .adhvl-empty-state {
                    text-align: center;
                    padding: 2em 0;
                    color: #94a3b8;
                }
                .adhvl-form-grid {
                    display: grid;
                    gap: 1.2rem;
                }
                .adhvl-form-row {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                .adhvl-form-row > div {
                    flex: 1 1 220px;
                }
                .adhvl-label {
                    display: block;
                    margin-bottom: 0.35em;
                    font-size: .96em;
                    color: #0369a1;
                    font-weight: 500;
                }
                .adhvl-input, .adhvl-select {
                    width: 100%;
                    padding: 0.6em 1em;
                    font-size: 1em;
                    border-radius: 0.5em;
                    border: 1px solid #bfdbfe;
                    background: #f8fafc;
                    color: #0c2860;
                    outline: none;
                    transition: border-color .15s;
                }
                .adhvl-input:focus, .adhvl-select:focus {
                    border-color: #2563eb;
                    background: #f1f5f9;
                }
                /* File upload field for image */
                .adhvl-file-label {
                    display: inline-flex;
                    align-items: center;
                    background: #e0e7ef;
                    color: #0369a1;
                    padding: 0.47em 1em;
                    border-radius: 0.75em;
                    cursor: pointer;
                    font-weight: 500;
                    box-shadow: 0 2px 8px 0 #dbeafe30;
                    margin-top: 0.3rem;
                    transition: background 0.16s;
                }
                .adhvl-file-label svg {
                    margin-right: 0.5rem;
                }
                .adhvl-file-label:hover {
                    background: #bae6fd;
                }
                .adhvl-file-input {
                    display: none;
                }
                .adhvl-preview-img-wrap {
                    position: relative;
                    width: fit-content;
                    margin-top: .7em;
                }
                .adhvl-preview-img {
                    max-width: 240px;
                    max-height: 180px;
                    object-fit: contain;
                    border-radius: 0.7em;
                    box-shadow: 0 2px 12px 0 #2563eb34;
                    border: 2px solid #bae6fd;
                    transition: box-shadow .2s;
                    background: #fff;
                }
                .adhvl-preview-img:hover {
                    box-shadow: 0 4px 18px 0 #2563eb54;
                }
                .adhvl-image-remove {
                    position: absolute;
                    top: 0.45em;
                    right: 0.45em;
                    opacity: 0.9;
                    background: linear-gradient(45deg,#e11d48,#f87171);
                    border: none;
                    color: #fff;
                    border-radius: 999px;
                    padding: .3em .4em;
                    cursor: pointer;
                }
                .adhvl-image-remove:hover {
                    opacity: 1;
                    background: linear-gradient(80deg,#b91c1c,#f43f5e);
                }
                .adhvl-img-size-note {
                    position: absolute;
                    left: 0.85em;
                    bottom: 0.7em;
                    font-size: .75em;
                    background: #f0f9ffcc;
                    color: #0c2860;
                    padding: 0.18em 0.7em;
                    border-radius: 0.55em;
                    box-shadow: 0 1px 2px 0 #07598518;
                }
                /* Modal overlay */
                .adhvl-modal-ovl {
                    position: fixed;
                    z-index: 9999;
                    inset: 0;
                    background: rgba(0,0,0,0.24);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .adhvl-modal-anim {
                    background: #fff;
                    border-radius: 1.1em;
                    box-shadow: 0 8px 48px #2a40651a, 0 1.5px 0 #bae6fd;
                    max-width: 480px;
                    width: 100%;
                    padding: 2rem;
                    border: 1.2px solid #bae6fd;
                    animation: adminFadeIn 0.30s;
                }
                @keyframes adminFadeIn {
                    from { opacity: 0; transform: translateY(30px);}
                    to   { opacity: 1; transform: translateY(0);}
                }
                .adhvl-modal-head {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #e0e7ef;
                    margin-bottom: 1.2em;
                    padding-bottom: .6em;
                }
                .adhvl-modal-title {
                    font-size: 1.18em;
                    font-weight: bold;
                    color: #2563eb;
                }
                .adhvl-modal-close {
                    background: #fee2e2;
                    color: #e11d48;
                    padding: .4em .6em;
                    border-radius: 50%;
                    border: none;
                    font-size: 1.05em;
                    cursor: pointer;
                    transition: background .13s;
                }
                .adhvl-modal-close:hover {
                    background: #fecaca;
                }
                .adhvl-modal-img {
                    width: 100%;
                    max-height: 240px;
                    object-fit: cover;
                    margin-bottom: 1.1em;
                    border-radius: .85em;
                    border: 1px solid #bae6fd;
                }
                .adhvl-modal-meta {
                    color: #64748b;
                    margin-bottom: .6em;
                    font-size: 0.95em;
                    opacity: .85;
                }
            `}</style>
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
