import React, { useState, useRef } from "react";
import CKEditorField from "../../components/common/CKEditorField";

// Dữ liệu mẫu
const initialArticles = [
  {
    id: "A-01",
    title: "Bảo tồn di sản số: Cơ hội và thách thức",
    author: "Phạm Thu Thảo",
    authorImage: "",
    content:
      "<p>Phân tích cách số hóa giúp tiếp cận di sản và những rủi ro khi phụ thuộc vào công nghệ.</p>",
    date: "2025-01-14",
  },
  {
    id: "A-02",
    title: "Góc nhìn: Du lịch di sản bền vững",
    author: "Ngô Minh Quân",
    authorImage: "",
    content:
      "<p>Đề xuất mô hình cộng đồng tham gia quản lý và chia sẻ lợi ích từ du lịch văn hóa.</p>",
    date: "2024-12-30",
  },
];

const emptyForm = {
  title: "",
  author: "",
  authorImage: "",
  authorImageFile: null,
  content: "",
  date: "",
};

const ITEMS_PER_PAGE = 5;

const AdminPhanTich = () => {
  // State quản lý bài viết, form, modal, search, phân trang
  const [articles, setArticles] = useState(initialArticles);
  const [form, setForm] = useState(emptyForm);
  const [editingIdx, setEditingIdx] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [detailArticle, setDetailArticle] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const fileInputRef = useRef();

  // Reset form và trạng thái chỉnh sửa
  const resetAll = () => {
    setForm(emptyForm);
    setEditingIdx(null);
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const doAdd = () => {
    resetAll();
    setShowForm(true);
  };

  // Load thông tin bài viết vào form để chỉnh sửa
  const doEdit = (idx) => {
    const article = articles[idx];
    setEditingIdx(idx);
    setForm({
      ...article,
      authorImage: article.authorImage || "",
      authorImageFile: null,
    });
    setShowForm(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Icon đóng/cancel
  const XIcon = (props) => (
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

  // Thêm/sửa bài viết
  const submitArticle = (e) => {
    e.preventDefault();
    // Kiểm tra trường bắt buộc
    if (!form.title.trim()) {
      alert("Vui lòng nhập: Tiêu đề bài phân tích!");
      return;
    }
    if (!form.author.trim()) {
      alert("Vui lòng nhập: Tên tác giả!");
      return;
    }
    if (!form.content.trim()) {
      alert("Vui lòng nhập: Nội dung bài viết!");
      return;
    }
    if (!form.date.trim()) {
      alert("Vui lòng nhập: Ngày xuất bản!");
      return;
    }

    // Kiểm tra trùng tiêu đề (không tính bài đang chỉnh sửa)
    const nameLC = form.title.trim().toLocaleLowerCase();
    const isDuplicated = articles.some(
      (ar, idx) =>
        ar.title.trim().toLocaleLowerCase() === nameLC &&
        (editingIdx === null || idx !== editingIdx)
    );
    if (isDuplicated) {
      alert("Tiêu đề bài phân tích đã tồn tại.");
      return;
    }

    // Lưu bài viết mới hoặc cập nhật
    const handleSave = (authorImageValue) => {
      if (editingIdx !== null) {
        const next = [...articles];
        next[editingIdx] = {
          ...form,
          authorImage: authorImageValue,
          id: articles[editingIdx].id,
          authorImageFile: undefined,
        };
        setArticles(next);
        resetAll();
      } else {
        const lastNum =
          articles.length > 0
            ? Math.max(
                ...articles
                  .map((ar) =>
                    parseInt(String(ar.id).replace("A-", ""), 10)
                  )
                  .filter((n) => !isNaN(n))
              )
            : 0;
        const newId = "A-" + String(lastNum + 1).padStart(2, "0");
        setArticles([
          ...articles,
          {
            ...form,
            authorImage: authorImageValue,
            id: newId,
            authorImageFile: undefined,
          },
        ]);
        resetAll();
      }
    };

    // Xử lý upload ảnh tác giả
    if (form.authorImageFile) {
      const reader = new window.FileReader();
      reader.onload = function (loadEvt) {
        handleSave(loadEvt.target.result);
      };
      reader.readAsDataURL(form.authorImageFile);
      return;
    } else {
      handleSave("");
    }
  };

  // Xóa bài viết
  const deleteArticle = (idx) => {
    if (window.confirm("Xóa bài phân tích này?")) {
      const remained = articles.filter((_, i) => i !== idx);
      setArticles(remained);
      const lastPage = Math.ceil(remained.length / ITEMS_PER_PAGE) || 1;
      if (remained.length && page > lastPage) setPage(lastPage);
      if (editingIdx === idx) resetAll();
      if (
        detailArticle &&
        articles[idx] &&
        articles[idx].id === detailArticle.id
      ) {
        setDetailArticle(null);
      }
    }
  };

  // Tìm kiếm bài viết
  const filterList = () =>
    articles.filter(
      (ar) =>
        (ar.title || "")
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        (ar.author || "")
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        (ar.content || "")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
    );

  // Phân trang
  const filteredList = filterList();
  const totalPage = Math.ceil(filteredList.length / ITEMS_PER_PAGE) || 1;
  const firstIdx = (page - 1) * ITEMS_PER_PAGE;
  const showList = filteredList.slice(firstIdx, firstIdx + ITEMS_PER_PAGE);

  // Tạo mảng các trang để render nút số trang
  const paging = () => {
    if (totalPage <= 8)
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    const arr = [];
    if (page <= 4) {
      for (let i = 1; i <= 5; i++) arr.push(i);
      arr.push("...", totalPage);
    } else if (page >= totalPage - 3) {
      arr.push(1, "...");
      for (let i = totalPage - 4; i <= totalPage; i++) arr.push(i);
    } else {
      arr.push(1, "...");
      for (let i = page - 1; i <= page + 1; i++) arr.push(i);
      arr.push("...", totalPage);
    }
    return arr;
  };

  // UI render
  return (
    <div class="min-h-screen bg-[#FAF8F3] py-6">
      <div className="w-full px-2 sm:px-6 max-w-7xl mx-auto">
        {/* Tiêu đề */}
        <div className="flex items-center mb-6 gap-1.5">
          <span 
           class="inline-flex items-center
           bg-gradient-to-tr from-blue-600 to-green-400
           text-white px-3 py-1
           rounded-lg text-lg font-bold
           shadow">
            Phân tích
          </span>
        </div>

        {/* Thanh tìm kiếm & Thêm mới */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 bg-white p-6 rounded-xl border border-[#E5FAFF] shadow mb-4">
          {/* Tìm kiếm */}
          <div className="flex items-center w-full md:w-1/2 relative">
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
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setPage(1);
              }}
              placeholder="🔎 Tìm kiếm tiêu đề, tác giả, nội dung..."
              className="w-full pl-10 pr-4 py-2.5 border border-[#BFF0FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 bg-blue-50 transition text-sm"
            />
          </div>
          {/* Đếm và nút thêm */}
          <div className="flex flex-row gap-2 items-center justify-end mt-2 md:mt-0">
            <span className="bg-yellow-100 text-yellow-800 text-[13px] font-bold px-3 py-1 rounded-full">
              {filteredList.length} bài phân tích
            </span>
            <button
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-bold bg-gradient-to-br from-sky-600 to-emerald-400 text-white shadow hover:shadow-lg transition-all text-sm"
              onClick={doAdd}
              type="button"
            >
              <svg
                className="w-5 h-5"
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
              Thêm bài phân tích
            </button>
          </div>
        </div>

        {/* Bảng danh sách */}
        <div className="bg-white rounded-xl shadow border border-blue-100 overflow-hidden w-full overflow-x-auto pt-1 pb-4">
          <div className="min-w-[700px] grid grid-cols-12 items-center bg-gradient-to-tr from-blue-100 to-green-100 border-b border-blue-200 px-6 py-3.5 text-xs font-bold text-blue-600 tracking-wider uppercase">
            <div className="col-span-1 text-center">STT</div>
            <div className="col-span-4 text-center">Tiêu đề bài viết</div>
            <div className="col-span-2 text-center">Tác giả</div>
            <div className="col-span-2 text-center">Ngày</div>
            <div className="col-span-3 flex justify-center">Hành động</div>
          </div>
          {/* Dữ liệu */}
          {showList.length > 0 ? (
            showList.map((item, idx) => {
              const globalIdx = articles.findIndex((a) => a.id === item.id);
              return (
                <div
                  key={item.id}
                  className="group min-w-[700px] grid grid-cols-12 items-center border-b last:border-0 border-cyan-50 px-6 py-3 text-[15px] transition hover:bg-emerald-50"
                >
                  {/* STT */}
                  <div className="col-span-1 text-center">
                    <span className="inline-block px-2 py-0.5 text-xs font-bold bg-teal-100 text-teal-700 rounded-md tracking-wide">
                      {firstIdx + idx + 1}
                    </span>
                  </div>
                  {/* Tiêu đề */}
                  <div className="col-span-4 flex flex-col gap-1 min-w-0">
                    <span className="text-emerald-900 font-bold truncate">
                      {item.title}
                    </span>
                  </div>
                  {/* Tác giả */}
                  <div className="col-span-2 text-center flex flex-col items-center gap-1">
                    {item.authorImage ? (
                      <img
                        src={item.authorImage}
                        alt={item.author}
                        className="w-9 h-9 object-cover rounded-full border border-cyan-200 mx-auto mb-1"
                      />
                    ) : (
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-cyan-50 text-cyan-400 mx-auto mb-1 text-xl font-bold">
                        {item.author && item.author.length > 0
                          ? item.author[0].toUpperCase()
                          : "A"}
                      </div>
                    )}
                    <span className="font-semibold text-cyan-800 text-[15px]">
                      {item.author}
                    </span>
                  </div>
                  {/* Ngày */}
                  <div className="col-span-2 text-center text-gray-500 font-medium text-[15px]">
                    {item.date}
                  </div>
                  {/* Hành động */}
                  <div className="col-span-3 flex flex-row gap-2 justify-center items-center pr-0">
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-blue-50 border border-blue-200 rounded-full shadow-md hover:bg-blue-100 group/action transition"
                      onClick={() => setDetailArticle(item)}
                      title="Xem"
                      type="button"
                    >
                      <svg
                        className="w-5 h-5 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="3.5" />
                        <path
                          d="M2 12C4 7.5 8.5 5 12 5s8 2.5 10 7c-2 4.5-6.5 7-10 7s-8-2.5-10-7z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded-full shadow-md hover:bg-yellow-100 group/action transition"
                      onClick={() => doEdit(globalIdx)}
                      title="Sửa"
                      type="button"
                    >
                      <svg
                        className="w-5 h-5 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M15.232 5.232l3.536 3.536M9 13l6.207-6.207c.39-.39 1.024-.39 1.414 0l2.586 2.586c.39.39.39 1.024 0 1.414L13 17H9v-4z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-red-50 border border-red-200 rounded-full shadow-md hover:bg-red-100 group/action transition"
                      onClick={() => deleteArticle(globalIdx)}
                      title="Xóa"
                      type="button"
                    >
                      <svg
                        className="w-5 h-5 text-pink-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M3 6h18M8 6V4h8v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-10 text-center text-gray-400 col-span-12">
              Không có bài phân tích nào
            </div>
          )}
          {/* Phân trang */}
          {totalPage > 1 && (
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 bg-gradient-to-r from-emerald-50 to-sky-50 border-t border-emerald-100 mt-2 rounded-b-xl">
              <div className="text-sm text-gray-700 mb-3 md:mb-0 font-semibold">
                Hiển thị{" "}
                <span className="font-bold">
                  {filteredList.length === 0 ? 0 : firstIdx + 1}
                </span>
                {" - "}
                <span className="font-bold">
                  {filteredList.length === 0
                    ? 0
                    : Math.min(firstIdx + ITEMS_PER_PAGE, filteredList.length)}
                </span>
                {" trên "}
                <span className="font-bold">
                  {filteredList.length}
                </span>{" "}
                bài phân tích
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M15 19l-7-7 7-7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {paging().map((num, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      typeof num === "number" && setPage(num)
                    }
                    disabled={num === "..."}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition shadow ${
                      num === page
                        ? "bg-gradient-to-tr from-sky-600 to-emerald-500 text-white"
                        : num === "..."
                        ? "cursor-default text-gray-400 bg-transparent"
                        : "hover:bg-emerald-100 text-gray-700"
                    }`}
                    type="button"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
                  disabled={page === totalPage}
                  className="p-2 rounded-lg hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal form thêm/sửa */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-[1.5px] transition animate-fadein-fast">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[96vh] overflow-y-auto border border-cyan-200">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-cyan-100 sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-extrabold bg-gradient-to-tr from-sky-600 to-emerald-400 bg-clip-text text-transparent select-none">
                  {editingIdx !== null
                    ? "Cập nhật bài phân tích"
                    : "Thêm bài phân tích"}
                </h2>
                <button
                  onClick={resetAll}
                  className="text-gray-400 hover:text-red-500 transition p-2 rounded-full"
                  type="button"
                >
                  <XIcon className="w-7 h-7" />
                </button>
              </div>
              {/* Form content */}
              <form className="p-6 space-y-6" onSubmit={submitArticle}>
                {/* Tiêu đề */}
                <div>
                  <label className="block text-sm font-bold text-teal-700 mb-2">
                    Tiêu đề bài viết <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-emerald-900 bg-cyan-50 font-semibold transition shadow-sm"
                    placeholder="Nhập tiêu đề bài phân tích"
                    autoFocus
                  />
                </div>
                {/* Tác giả */}
                <div>
                  <label className="block text-sm font-bold text-teal-700 mb-2">
                    Tác giả <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, author: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-emerald-900 bg-cyan-50 font-semibold transition shadow-sm"
                    placeholder="Tên tác giả"
                  />
                </div>
                {/* Ảnh tác giả (upload file) */}
                <div>
                  <label className="block text-sm font-bold text-cyan-700 mb-2">
                    Ảnh tác giả
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setForm((f) => ({
                        ...f,
                        authorImageFile: file ? file : null,
                        authorImage: "",
                      }));
                    }}
                    className="block w-full px-4 py-2 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 bg-cyan-50 font-semibold transition shadow-sm"
                  />
                  {form.authorImageFile && (
                    <div className="mt-3 flex items-center gap-3">
                      <img
                        alt="Ảnh tác giả"
                        className="rounded-full w-12 h-12 object-cover border border-cyan-200"
                        src={
                          form.authorImageFile
                            ? URL.createObjectURL(form.authorImageFile)
                            : ""
                        }
                      />
                      <span className="text-cyan-700 font-medium truncate">
                        {form.authorImageFile.name}
                      </span>
                      <button
                        type="button"
                        className="text-pink-500 ml-2 hover:underline font-semibold"
                        onClick={() => {
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                          setForm((f) => ({
                            ...f,
                            authorImageFile: null,
                          }));
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                  {/* Nếu đang chỉnh sửa và chưa chọn file mới, hiện ảnh cũ */}
                  {editingIdx !== null &&
                    !form.authorImageFile &&
                    form.authorImage && (
                      <div className="mt-3 flex items-center gap-3">
                        <img
                          alt="Ảnh tác giả đã lưu"
                          className="rounded-full w-12 h-12 object-cover border border-cyan-200"
                          src={form.authorImage}
                        />
                        <span className="text-cyan-700 font-medium">
                          Ảnh tác giả đã lưu
                        </span>
                      </div>
                    )}
                </div>
                {/* Nội dung */}
                <div>
                  <label className="block text-sm font-bold text-teal-700 mb-2">
                    Nội dung bài viết <span className="text-pink-500">*</span>
                  </label>
                  <CKEditorField
                    value={form.content}
                    onChange={(text) =>
                      setForm((f) => ({ ...f, content: text }))
                    }
                    placeholder="Chi tiết bài phân tích, nhận định..."
                  />
                </div>
                {/* Ngày xuất bản */}
                <div>
                  <label className="block text-sm font-bold text-teal-700 mb-2">
                    Ngày xuất bản <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-emerald-900 bg-cyan-50 font-semibold transition shadow-sm"
                  />
                </div>
                <div className="flex gap-3 mt-2 justify-end">
                  <button
                    className="flex items-center gap-2 bg-gradient-to-tr from-sky-600 to-cyan-400 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition"
                    type="submit"
                  >
                    {editingIdx !== null
                      ? "Cập nhật"
                      : "Tạo bài phân tích"}
                  </button>
                  <button
                    className="px-6 py-3 rounded-2xl font-semibold border border-cyan-300 bg-white text-cyan-700 hover:bg-cyan-50 transition"
                    type="button"
                    onClick={resetAll}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal chi tiết bài */}
        {detailArticle && (
          <div className="fixed inset-0 bg-black/30 z-[9999] flex items-center justify-center min-h-screen overflow-y-auto animate-fadein-fast p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-0 relative border border-cyan-200 flex flex-col max-h-[96vh] overflow-y-auto">
              <div className="flex justify-between items-center px-8 pt-8 pb-4 border-b border-emerald-50 sticky top-0 bg-white z-10">
                <h3 className="text-xl font-extrabold text-teal-700">
                  {detailArticle.title}
                </h3>
                <button
                  className="bg-red-100 text-red-500 hover:bg-red-200 p-2 rounded-full transition"
                  onClick={() => setDetailArticle(null)}
                  type="button"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="px-8 pb-8 pt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between text-base">
                  <span className="font-semibold text-teal-900 flex items-center gap-2">
                    {detailArticle.authorImage ? (
                      <img
                        src={detailArticle.authorImage}
                        alt={detailArticle.author}
                        className="w-9 h-9 object-cover rounded-full border border-cyan-200"
                      />
                    ) : (
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-cyan-50 text-cyan-400 text-xl font-bold">
                        {detailArticle.author &&
                        detailArticle.author.length > 0
                          ? detailArticle.author[0].toUpperCase()
                          : "A"}
                      </div>
                    )}
                    Tác giả: {detailArticle.author}
                  </span>
                  <span className="text-gray-600 font-medium">
                    {detailArticle.date}
                  </span>
                </div>
                <div
                  className="ck-content prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: detailArticle.content,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPhanTich;
