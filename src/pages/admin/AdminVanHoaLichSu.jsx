import React, { useState } from "react";
import CKEditorField from "../../components/common/CKEditorField";

// Dữ liệu mẫu Văn hóa/Lịch sử
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

const ITEMS_PER_PAGE = 5;

const AdminVanHoaLichSu = () => {
  const [items, setItems] = useState(initialCulture);
  const [form, setForm] = useState(emptyForm);
  const [, setImagePreview] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Đặt lại form về trạng thái mặc định
  const resetForm = () => {
    setForm(emptyForm);
    setImagePreview("");
    setEditingIndex(null);
    setIsAdding(false);
    const input = document.getElementById("culture-image-upload");
    if (input) input.value = "";
  };

  // Mở giao diện thêm mới
  const startAdd = () => {
    resetForm();
    setIsAdding(true);
  };

  // Mở giao diện chỉnh sửa mục
  const startEdit = (index) => {
    const item = items[index];
    setEditingIndex(index);
    setForm(item);
    setImagePreview(item.image || "");
    setIsAdding(true);
  };

  // Icon đóng modal (x)
  const X = (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className || ""}
      width={props.width || "1em"}
      height={props.height || "1em"}
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  // Submit thêm mới hoặc lưu chỉnh sửa
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Vui lòng nhập: Tên sự kiện/văn hóa!");
      return;
    }
    if (!form.topic || !topics.find(t => t.value === form.topic)) {
      alert("Vui lòng chọn phân loại!");
      return;
    }
    if (!form.period.trim()) {
      alert("Vui lòng nhập: Thời kỳ!");
      return;
    }
    if (!form.content.trim()) {
      alert("Vui lòng nhập: Nội dung chi tiết!");
      return;
    }
    if (!form.image) {
      alert("Vui lòng upload ảnh!");
      return;
    }
    if (editingIndex !== null) {
      // Cập nhật mục hiện tại
      const updated = [...items];
      updated[editingIndex] = { ...form, id: items[editingIndex].id };
      setItems(updated);
      resetForm();
    } else {
      // Thêm mục mới
      const lastIdNum = items.length
        ? Math.max(
            ...items
              .map((it) => parseInt(it.id.replace("C-", ""), 10))
              .filter((x) => !Number.isNaN(x))
          )
        : 0;
      const nextId = `C-${String(lastIdNum + 1).padStart(2, "0")}`;
      setItems([...items, { ...form, id: nextId }]);
      resetForm();
    }
  };

  // Xóa mục
  const handleDelete = (index) => {
    if (window.confirm("Bạn có chắc muốn xóa mục này không?")) {
      const filtered = items.filter((_, i) => i !== index);
      setItems(filtered);

      // Điều chỉnh trang hiện tại nếu cần thiết (nếu xóa mục cuối cùng trên trang cuối)
      const filteredTotalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
      if (filtered.length && currentPage > filteredTotalPages) {
        setCurrentPage(filteredTotalPages);
      }
      if (editingIndex === index) resetForm();
      if (viewItem && items[index] && items[index].id === viewItem.id) setViewItem(null);
    }
  };

  // Xóa ảnh, làm trống preview
  const removeImage = () => {
    setForm((prev) => ({ ...prev, image: "" }));
    setImagePreview("");
    const input = document.getElementById("culture-image-upload");
    if (input) input.value = "";
  };

  // Xử lý upload ảnh và tạo image preview
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Ảnh tối đa 5MB!");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((prev) => ({ ...prev, image: ev.target.result }));
        setImagePreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert("Vui lòng chọn file hình ảnh hợp lệ!");
    }
  };

  // Lọc dữ liệu theo tìm kiếm, phân trang
  const getFilteredData = () => {
    return items.filter(
      (item) =>
        (item.title || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (item.period || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (item.topic || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  };
  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Tính mảng các số trang để hiển thị trong phân trang (paging)
  const getPageNumbers = () => {
    if (totalPages <= 8)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, "...");
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, "...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++)
        pages.push(i);
      pages.push("...", totalPages);
    }
    return pages;
  };

  // Render giao diện quản trị Văn hóa/Lịch sử
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8 gap-2">
          <span className="inline-block bg-gradient-to-tr from-blue-600 to-green-400 text-white px-3 py-[2px] rounded-lg text-lg font-bold shadow">
            Văn hóa & Lịch sử
          </span>
        </div>

        {/* Thanh tìm kiếm và nút thêm mới */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white p-7 rounded-t-2xl border-b border-emerald-100 shadow">

          {/* Ô nhập tìm kiếm */}
          <div className="flex items-center w-full md:max-w-md relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 w-5 h-5 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path
                d="M21 21l-4.35-4.35"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="🔎 Tìm theo tên, chủ đề hoặc thời kỳ..."
              className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 bg-blue-50 transition"
            />
          </div>

          {/* Hiển thị tổng mục và nút thêm mới */}
          <div className="flex flex-row gap-3 items-center mt-2 md:mt-0">
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-extrabold px-4 py-1 rounded-full">
              {filteredData.length} mục
            </span>
            <button
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-gradient-to-br from-sky-600 to-emerald-400 text-white shadow hover:shadow-lg transition-all"
              onClick={startAdd}
              type="button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Thêm mới
            </button>
          </div>
        </div>

        {/* Bảng danh sách */}
        <div className="bg-white rounded-2xl shadow-md border border-blue-100 overflow-hidden w-full overflow-x-auto pt-1 pb-4">
          {/* Header bảng */}
          <div className="min-w-[900px] grid grid-cols-12 items-center bg-gradient-to-tr from-blue-100 to-green-100 border-b border-blue-200 px-6 py-4 text-xs font-bold text-blue-600 tracking-wider uppercase">
            <div className="col-span-1 text-center">STT</div>
            <div className="col-span-2 text-center">Ảnh</div>
            <div className="col-span-3 text-center">Tên sự kiện</div>
            <div className="col-span-2 text-center">Phân loại</div>
            <div className="col-span-2 text-center">Thời kỳ</div>
            <div className="col-span-2 flex justify-end">Hành động</div>
          </div>
          {/* Dữ liệu bảng */}
          {currentData.length > 0 ? (
            currentData.map((item, idx) => {
              const globalIndex = items.findIndex((i) => i.id === item.id);
              return (
                <div
                  key={item.id}
                  className="group min-w-[900px] grid grid-cols-12 items-center border-b last:border-0 border-emerald-50 px-6 py-3 text-base transition hover:bg-emerald-50"
                >
                  {/* STT */}
                  <div className="col-span-1 text-center">
                    <span className="inline-block px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-md tracking-wide">
                      {startIndex + idx + 1}
                    </span>
                  </div>
                  {/* Ảnh đại diện */}
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="h-12 w-20 flex items-center justify-center rounded-xl overflow-hidden bg-white border border-emerald-100">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center flex-col text-emerald-200">
                          <svg
                            className="w-10 h-10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.2}
                            viewBox="0 0 24 24"
                          >
                            <rect x="4" y="4" width="16" height="16" rx="4" />
                            <path d="M8 16l2.822-3.494a1.5 1.5 0 0 1 2.357-.088L16 16" />
                            <circle cx="9.5" cy="9.5" r="1" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Tiêu đề */}
                  <div className="col-span-3 flex flex-col gap-1 min-w-0">
                    <span className="text-emerald-900 font-bold truncate">
                      {item.title}
                    </span>
                  </div>
                  {/* Phân loại */}
                  <div className="col-span-2 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${item.topic === "Văn hóa" ? "bg-sky-100 text-sky-900" : "bg-yellow-100 text-yellow-800"}
                    `}>
                      {item.topic}
                    </span>
                  </div>
                  {/* Thời kỳ */}
                  <div className="col-span-2 text-center">
                    <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-medium">{item.period}</span>
                  </div>
                  {/* Hành động */}
                  <div className="col-span-2 flex flex-row gap-2 justify-end items-center pr-2">
                    <button
                      className="w-9 h-9 flex items-center justify-center bg-emerald-50 border border-emerald-200 rounded-full shadow-md hover:bg-emerald-100 group/action transition"
                      onClick={() => setViewItem(item)}
                      title="Xem chi tiết"
                      type="button"
                    >
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="3.5" />
                        <path d="M2 12C4 7.5 8.5 5 12 5s8 2.5 10 7c-2 4.5-6.5 7-10 7s-8-2.5-10-7z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      className="w-9 h-9 flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded-full shadow-md hover:bg-yellow-100 group/action transition"
                      onClick={() => startEdit(globalIndex)}
                      title="Chỉnh sửa"
                      type="button"
                    >
                      <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                        <path d="M15.232 5.232l3.536 3.536M9 13l6.207-6.207c.39-.39 1.024-.39 1.414 0l2.586 2.586c.39.39.39 1.024 0 1.414L13 17H9v-4z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      className="w-9 h-9 flex items-center justify-center bg-red-50 border border-red-200 rounded-full shadow-md hover:bg-red-100 group/action transition"
                      onClick={() => handleDelete(globalIndex)}
                      title="Xóa"
                      type="button"
                    >
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                        <path d="M3 6h18M8 6V4h8v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-10 text-center text-gray-400 col-span-12">
              Chưa có dữ liệu
            </div>
          )}
          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-5 bg-gradient-to-r from-emerald-50 to-sky-50 border-t border-emerald-100 mt-2 rounded-b-2xl">
              <div className="text-sm text-gray-700 mb-3 md:mb-0 font-semibold">
                Hiển thị{" "}
                <span className="font-bold">
                  {filteredData.length === 0 ? 0 : startIndex + 1}
                </span>
                {" - "}
                <span className="font-bold">
                  {filteredData.length === 0
                    ? 0
                    : Math.min(
                        startIndex + ITEMS_PER_PAGE,
                        filteredData.length
                      )}
                </span>
                {" trên "}
                <span className="font-bold">
                  {filteredData.length}
                </span>{" "}
                mục
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                {getPageNumbers().map((page, i) => (
                  <button
                    key={i}
                    onClick={() => typeof page === "number" && setCurrentPage(page)}
                    disabled={page === "..."}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition shadow ${
                      page === currentPage
                        ? "bg-gradient-to-tr from-sky-600 to-emerald-500 text-white"
                        : page === "..."
                        ? "cursor-default text-gray-400 bg-transparent"
                        : "hover:bg-emerald-100 text-gray-700"
                    }`}
                    type="button"
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Form thêm/sửa thông tin (Modal) */}
        {isAdding && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-[1.5px] transition animate-fadein-fast">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[96vh] overflow-y-auto border border-emerald-200">
              {/* Header modal */}
              <div className="flex justify-between items-center p-6 border-b border-emerald-100 sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-extrabold bg-gradient-to-tr from-sky-600 to-emerald-400 bg-clip-text text-transparent select-none">
                  {editingIndex !== null ? "Chỉnh sửa" : "Thêm thông tin mới"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-red-500 transition p-2 rounded-full"
                  type="button"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>
              {/* Body modal */}
              <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                {/* Tên sự kiện */}
                <div>
                  <label className="block text-sm font-bold text-emerald-700 mb-2">
                    Tên sự kiện / Di sản <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-emerald-900 bg-emerald-50 font-semibold transition shadow-sm"
                    placeholder="Nhập tên sự kiện, di sản hoặc chủ đề..."
                    autoFocus
                  />
                </div>
                {/* Phân loại */}
                <div>
                  <label className="block text-sm font-bold text-emerald-700 mb-2">
                    Phân loại <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50 text-emerald-900 font-semibold transition shadow-sm"
                    value={form.topic}
                    onChange={e => setForm({ ...form, topic: e.target.value })}
                  >
                    {topics.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                {/* Thời kỳ */}
                <div>
                  <label className="block text-sm font-bold text-emerald-700 mb-2">
                    Thời kỳ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.period}
                    onChange={e =>
                      setForm({ ...form, period: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-emerald-50 text-emerald-900 font-semibold transition shadow-sm"
                    placeholder="Nhập thời kỳ (vd: Thế kỷ 16, 1945-1975, ...)"
                  />
                </div>
                {/* Nội dung chi tiết */}
                <div>
                  <label className="block text-sm font-bold text-emerald-700 mb-2">
                    Nội dung chi tiết <span className="text-red-500">*</span>
                  </label>
                  <CKEditorField
                    value={form.content}
                    onChange={content =>
                      setForm({ ...form, content })
                    }
                    placeholder="Nhập nội dung chi tiết..."
                  />
                </div>
                {/* Ảnh mô tả */}
                <div>
                  <label className="block text-sm font-bold text-emerald-700 mb-2">
                    Ảnh mô tả <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-emerald-200 rounded-lg p-6 text-center bg-emerald-50 transition">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="culture-image-upload"
                    />
                    <label
                      htmlFor="culture-image-upload"
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <svg
                        className="w-10 h-10 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 font-medium">
                        {form.image
                          ? "Đổi ảnh mô tả"
                          : "Chọn ảnh mô tả"}
                      </span>
                      <span className="text-xs text-gray-500">
                        JPG, PNG, GIF (tối đa 5MB)
                      </span>
                    </label>
                  </div>
                  {form.image && (
                    <div className="relative w-fit mt-3 mx-auto">
                      <img
                        src={form.image}
                        alt="preview"
                        className="max-w-xs max-h-44 object-contain rounded-xl border border-emerald-100 shadow-lg bg-white"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full p-2 shadow transition"
                        onClick={removeImage}
                        tabIndex={-1}
                        title="Xóa ảnh"
                      >
                        <X />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-2 justify-end">
                  <button
                    className="flex items-center gap-2 bg-gradient-to-tr from-sky-600 to-emerald-400 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition"
                    type="submit"
                  >
                    {editingIndex !== null ? "Lưu thay đổi" : "Tạo mới"}
                  </button>
                  <button
                    className="px-6 py-3 rounded-2xl font-semibold border border-emerald-300 bg-white text-emerald-700 hover:bg-emerald-50 transition"
                    type="button"
                    onClick={resetForm}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Modal xem chi tiết */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/30 z-[9999] flex items-center justify-center min-h-screen overflow-y-auto animate-fadein-fast p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-0 relative border border-emerald-200 flex flex-col max-h-[96vh] overflow-y-auto">
            {/* Header modal xem chi tiết */}
            <div className="flex justify-between items-center px-8 pt-8 pb-4 border-b border-emerald-50 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-extrabold text-emerald-700">
                {viewItem.title}
              </h3>
              <button
                className="bg-red-100 text-red-500 hover:bg-red-200 p-2 rounded-full transition"
                onClick={() => setViewItem(null)}
                type="button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Body chi tiết */}
            <div className="px-8 pb-8 pt-4 flex flex-col gap-3">
              {viewItem.image && (
                <img
                  src={viewItem.image}
                  alt={viewItem.title}
                  className="w-full max-h-64 object-cover rounded-xl border border-emerald-100 mb-2"
                />
              )}
              <div className="flex gap-3 mb-2">
                <span className="inline-block bg-sky-100 text-sky-900 text-xs px-3 py-1 rounded-full font-bold">
                  {viewItem.topic}
                </span>
                <span className="inline-block bg-yellow-100 text-yellow-900 text-xs px-3 py-1 rounded-full font-bold">
                  {viewItem.period}
                </span>
              </div>
              <div
                className="ck-content prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: viewItem.content,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVanHoaLichSu;
