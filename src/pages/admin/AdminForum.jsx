import React, { useState } from "react";

// Danh sách dữ liệu mẫu diễn đàn
const initialThreads = [
  {
    id: "F-201",
    title: "Làm sao bảo tồn kiến trúc đình làng?",
    author: "Thanh Tùng",
    topic: "Kiến trúc",
    status: "approved",
    createdAt: "2025-01-11",
  },
  {
    id: "F-202",
    title: "Ảnh tư liệu phố cổ Hội An",
    author: "Mai Hương",
    topic: "Tư liệu",
    status: "approved",
    createdAt: "2025-01-08",
  },
  {
    id: "F-203",
    title: "Góp ý trải nghiệm 3D",
    author: "Nhật Linh",
    topic: "Công nghệ",
    status: "hidden",
    createdAt: "2024-12-30",
  },
];

// Icon chỉnh sửa dùng cho nút edit
const EditIcon = ({ className }) => (
  <svg
    className={`w-5 h-5 text-yellow-600 ${className || ""}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    viewBox="0 0 24 24"
    style={{ display: "inline-block" }}
  >
    <path
      d="M15.232 5.232l3.536 3.536M9 13l6.207-6.207c.39-.39 1.024-.39 1.414 0l2.586 2.586c.39.39.39 1.024 0 1.414L13 17H9v-4z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Form mặc định rỗng cho modal edit
const emptyForm = {
  id: "",
  title: "",
  author: "",
  topic: "",
  status: "",
  createdAt: "",
};

const AdminForum = () => {
  const [threads, setThreads] = useState(initialThreads);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [isAdding, setIsAdding] = useState(false);
  const [query, setQuery] = useState("");

  // Mở modal sửa bài
  const startEdit = (index) => {
    setEditingIndex(index);
    setForm(threads[index]);
    setIsAdding(true);
  };

  // Đóng modal và reset form
  const handleModalClose = () => {
    setIsAdding(false);
    setEditingIndex(null);
    setForm(emptyForm);
  };

  // Cập nhật dữ liệu form khi thay đổi
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Lưu thay đổi vào danh sách threads
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      setThreads((prev) =>
        prev.map((item, idx) => (idx === editingIndex ? { ...item, ...form } : item))
      );
    }
    setIsAdding(false);
    setEditingIndex(null);
    setForm(emptyForm);
  };

  // Lọc danh sách bài viết theo từ khoá
  const filteredThreads = threads.filter((item) =>
    item.title.toLowerCase().includes(query.trim().toLowerCase())
  );



  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8 gap-2">
          <span className="inline-block bg-gradient-to-tr from-blue-600 to-green-400 text-white px-3 py-[2px] rounded-lg text-lg font-bold shadow">
            Quản lý Diễn đàn
          </span>
        </div>

        <div className="relative">
          {/* Bảng danh sách bài viết */}
          <div className="w-full bg-white rounded-2xl shadow border border-blue-100 overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-4 border-b border-blue-200 bg-gradient-to-tr from-blue-100 to-green-100 rounded-t-2xl">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none select-none text-lg">
                  <svg
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  placeholder="Tìm tiêu đề, mô tả..."
                  className="max-w-xs w-full pl-10 pr-3 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 bg-blue-50"
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-extrabold px-4 py-1 rounded-full shrink-0 ml-3">
                {filteredThreads.length} bài
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-[650px] w-full divide-y divide-emerald-50 text-sm">
                <thead>
                  <tr className="bg-emerald-50 text-emerald-700">
                    <th className="py-2 px-3 font-bold text-center">ID</th>
                    <th className="py-2 px-3 font-bold text-center">Tiêu đề</th>
                    <th className="py-2 px-3 font-bold text-center">Tác giả</th>
                    <th className="py-2 px-3 font-bold text-center">Chủ đề</th>
                    <th className="py-2 px-3 font-bold text-center">Trạng thái</th>
                    <th className="py-2 px-3 font-bold text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredThreads.map((item, ) => {
                    // Lấy index thật trong threads gốc để chỉnh sửa đúng phần tử
                    const threadIdx = threads.findIndex(t => t.id === item.id);
                    return (
                      <tr
                        key={item.id}
                        data-hidden={item.status === "hidden"}
                        className="transition hover:bg-emerald-50"
                        style={{
                          opacity: item.status === "hidden" ? 0.68 : 1,
                        }}
                      >
                        <td className="py-2 px-3 text-center font-mono font-bold">
                        
                          <span className="inline-block px-2 py-0.5 text-xs font-bold bg-teal-100 text-teal-700 rounded-md tracking-wide">
                            {item.id}
                          </span>
                        </td>
                        <td className="py-2 px-3">{item.title}</td>
                        <td className="py-2 px-3">{item.author}</td>
                        <td className="py-2 px-3">{item.topic}</td>
                        <td className="py-2 px-3 text-center">
                          {item.status === "hidden" ? (
                            <span className="font-bold text-red-500">Đã ẩn</span>
                          ) : (
                            <span className="font-bold text-emerald-700">Hiển thị</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-center flex gap-2 justify-center">
                          <button
                            type="button"
                            tabIndex={0}
                            className="flex items-center justify-center rounded-full border-2 border-yellow-200 shadow hover:shadow-lg hover:bg-yellow-50 focus:outline-none active:scale-95 transition"
                            style={{
                              width: "56px",
                              height: "56px",
                              background: "#FFFBEB",
                            }}
                            onClick={e => {
                              e.stopPropagation();
                              startEdit(threadIdx);
                            }}
                            title="Sửa bài viết"
                          >
                            <EditIcon />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredThreads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-400 py-8">
                        Chưa có bài viết
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal chỉnh sửa bài viết */}
          {isAdding && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div
                className="bg-[#f7fcfe] rounded-[20px] shadow-lg border-2 border-[#27bae7] max-w-xl w-full mx-4 relative"
                style={{
                  boxShadow: "0 8px 38px 0 #96eefa52",
                  minWidth: 350,
                  maxWidth: 480,
                }}
              >
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="absolute top-4 right-5 w-8 h-8 flex justify-center items-center rounded-full hover:bg-[#ccf3ff] transition border border-[#b4eef7]"
                  title="Đóng"
                >
                  <svg
                    stroke="#27bae7"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    strokeWidth={2}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="11"
                      fill="#f7fcfe"
                      stroke="#b4eef7"
                      strokeWidth={2}
                    />
                    <line
                      x1="8"
                      y1="8"
                      x2="16"
                      y2="16"
                      stroke="#25b0e6"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                    <line
                      x1="16"
                      y1="8"
                      x2="8"
                      y2="16"
                      stroke="#25b0e6"
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                  <h4 className="text-2xl font-bold text-sky-700 mb-2" style={{ fontFamily: "inherit" }}>
                    Cập nhật bài diễn đàn
                  </h4>
                  <label className="flex flex-col gap-1 font-bold text-sky-700 text-base">
                    Tiêu đề bài viết *
                    <input
                      className="px-3 py-2 border-2 border-[#27bae7] bg-[#f0fafd] rounded-lg text-base font-normal focus:ring-1 focus:ring-[#32c7fa] focus:outline-none"
                      name="title"
                      value={form.title}
                      onChange={handleFormChange}
                      required
                      autoFocus
                    />
                  </label>
                  <label className="flex flex-col gap-1 font-bold text-sky-700 text-base">
                    Tác giả *
                    <input
                      name="author"
                      value={form.author}
                      onChange={handleFormChange}
                      className="px-3 py-2 border-2 border-[#27bae7] bg-[#f0fafd] rounded-lg text-base font-normal focus:ring-1 focus:ring-[#32c7fa] focus:outline-none"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 font-bold text-sky-700 text-base">
                    Chủ đề *
                    <input
                      name="topic"
                      value={form.topic}
                      onChange={handleFormChange}
                      className="px-3 py-2 border-2 border-[#27bae7] bg-[#f0fafd] rounded-lg text-base font-normal focus:ring-1 focus:ring-[#32c7fa] focus:outline-none"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 font-bold text-sky-700 text-base">
                    Ngày tạo *
                    <input
                      name="createdAt"
                      value={form.createdAt}
                      onChange={handleFormChange}
                      className="px-3 py-2 border-2 border-[#27bae7] bg-[#f0fafd] rounded-lg text-base font-normal focus:ring-1 focus:ring-[#32c7fa] focus:outline-none"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 font-bold text-sky-700 text-base">
                    Trạng thái *
                    <select
                      name="status"
                      value={form.status}
                      onChange={handleFormChange}
                      className="px-3 py-2 border-2 border-[#27bae7] bg-[#f0fafd] rounded-lg text-base font-normal focus:ring-1 focus:ring-[#32c7fa] focus:outline-none"
                      required
                    >
                      <option value="approved">Hiển thị</option>
                      <option value="hidden">Đã ẩn</option>
                    </select>
                  </label>
                  <div className="flex gap-3 mt-2">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg font-extrabold text-white bg-gradient-to-r from-cyan-500 to-sky-400 border-2 border-sky-300 shadow hover:from-cyan-400 hover:to-sky-300 focus:outline-none active:scale-95 transition"
                      style={{ fontSize: "1rem" }}
                    >
                      Lưu thay đổi
                    </button>
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="px-6 py-2 rounded-lg font-bold border-2 border-gray-200 bg-white text-gray-700 hover:bg-sky-100 transition"
                      style={{ fontSize: "1rem" }}
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminForum;
