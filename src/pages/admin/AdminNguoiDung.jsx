import React, { useState, useMemo } from "react";

// Dữ liệu giả lập danh sách người dùng
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
    role: "admin",
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
    role: "content_manager",
  },
];

const genderMap = { male: "Nam", female: "Nữ" };

const roleMap = {
  admin: "Quản trị viên",
  content_manager: "Quản lý bài viết",
  editor: "Biên tập viên",
  user: "Người dùng",
};

const EditIcon = () => (
  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <path
      d="M15.232 5.232l3.536 3.536M9 13l6.207-6.207c.39-.39 1.024-.39 1.414 0l2.586 2.586c.39.39.39 1.024 0 1.414L13 17H9v-4z"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const AdminNguoiDung = () => {
  const [users, setUsers] = useState(mockUsers);
  const [selectedId, setSelectedId] = useState(users[0]?.id || null);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);

  // State preview ảnh đại diện
  const [avatarPreview, setAvatarPreview] = useState("");

  // State form chỉnh sửa thông tin người dùng
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    identityNumber: "",
    dateOfBirth: "",
    gender: "",
    intro: "",
    avatar: "",
    status: "",
    created_at: "",
    role: "",
  });

  // 
  const startEdit = (id) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setEditForm({
        name: user.name || "",
        email: user.email || "",
        identityNumber: user.identityNumber || "",
        dateOfBirth: user.dateOfBirth || "",
        gender: user.gender || "",
        intro: user.intro || "",
        avatar: "",
        status: user.status || "",
        created_at: user.created_at || "",
        role: user.role || "",
      });
      setAvatarPreview(user.avatar || "");
      setEditingId(id);
    }
  };

  // Lưu thay đổi người dùng
  const handleEditSave = () => {
    setUsers(prev =>
      prev.map(u =>
        u.id === editingId
          ? { ...u, ...editForm, avatar: avatarPreview }
          : u
      )
    );
    setEditingId(null);
    setAvatarPreview("");
  };

  // Change input trên form chỉnh sửa
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Chọn ảnh đại diện mới
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        setAvatarPreview(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Lọc người dùng theo query tìm kiếm (theo tên/email/id)
  const filteredUsers = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
    );
  }, [users, query]);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8 gap-2">
          <span className="inline-block bg-gradient-to-tr from-blue-600 to-green-400 text-white px-3 py-[2px] rounded-lg text-lg font-bold shadow">
            Quản lý Người dùng
          </span>
        </div>

        <div className="relative">
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
                  placeholder="Tìm tên, email, mã người dùng..."
                  className="max-w-xs w-full pl-10 pr-3 py-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800 bg-blue-50"
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-extrabold px-4 py-1 rounded-full shrink-0 ml-3">
                {filteredUsers.length} người dùng
              </span>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full w-full text-sm">
                <thead>
                  <tr className="bg-sky-50 border-b border-blue-100">
                    <th className="px-5 py-3 text-left font-bold text-blue-700">Mã</th>
                    <th className="px-5 py-3 text-left font-bold text-blue-700">Họ tên</th>
                    <th className="px-5 py-3 text-left font-bold text-blue-700">Email</th>
                    <th className="px-5 py-3 text-left font-bold text-blue-700">Giới tính</th>
                    <th className="px-5 py-3 text-left font-bold text-blue-700">Vai trò</th>
                    <th className="px-5 py-3 text-left font-bold text-blue-700">Trạng thái</th>
                    <th className="px-5 py-3 text-center font-bold text-blue-700">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className={`border-b border-blue-50 hover:bg-blue-50 cursor-pointer transition ${
                        user.id === selectedId ? "bg-gradient-to-r from-blue-50 via-blue-100" : ""
                      }`}
                    >
                      <td className="text-center align-middle">
                        <span className="inline-block px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-md tracking-wide ">
                          {user.id}
                        </span>
                      </td>
                      <td className="px-5 py-2">{user.name}</td>
                      <td className="px-5 py-2">{user.email}</td>
                      <td className="px-5 py-2">
                      
                        {genderMap[user.gender] || ""}
                      </td>
                      <td className="px-5 py-2">
                      
                        <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-blue-50 border border-blue-200 text-blue-700">
                          {roleMap[user.role] || "Chưa phân quyền"}
                        </span>
                      </td>
                      <td className="px-5 py-2">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold
                            ${
                              user.status === "active"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                        >
                          {user.status === "active" ? "Hoạt động" : "Đã khóa"}
                        </span>
                      </td>
                      <td className="px-5 py-2 flex justify-center gap-2" align="right">
                        <button
                          className="w-9 h-9 flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded-full shadow-md hover:bg-yellow-100 group/action transition"
                          onClick={() => startEdit(user.id)}
                          title="Chỉnh sửa"
                          type="button"
                        >
                          <EditIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center text-blue-300 py-9">
                        Không tìm thấy người dùng
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal chỉnh sửa user */}
        {editingId && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div
              className="bg-white rounded-2xl shadow px-7 py-8 min-w-[350px] max-w-[96vw] flex flex-col relative"
              style={{ maxHeight: "92vh" }}
            >
              <button
                className="absolute right-2 top-2 w-8 h-8 rounded-full flex items-center justify-center border border-blue-200 hover:bg-blue-50 transition"
                onClick={() => setEditingId(null)}
                title="Đóng"
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" stroke="#25b0e6" fill="none" strokeWidth={2}>
                  <circle cx="12" cy="12" r="11" fill="#f7fcfe" stroke="#b4eef7" strokeWidth={2} />
                  <line x1="8" y1="8" x2="16" y2="16" stroke="#25b0e6" strokeWidth={2} strokeLinecap="round" />
                  <line x1="16" y1="8" x2="8" y2="16" stroke="#25b0e6" strokeWidth={2} strokeLinecap="round" />
                </svg>
              </button>
              <div className="text-xl font-semibold text-blue-700 mb-4">
                Chỉnh sửa thông tin người dùng
              </div>
              {/* Form cuộn được trong modal */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5"
                style={{
                  maxHeight: "60vh",
                  overflowY: "auto",
                  paddingRight: "6px",
                  MozScrollbarWidth: "thin",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm text-gray-600">Họ và tên</label>
                  <input
                    className="border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm text-gray-600">Email</label>
                  <input
                    className="border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm text-gray-600">CCCD</label>
                  <input
                    className="border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    type="text"
                    name="identityNumber"
                    value={editForm.identityNumber}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm text-gray-600">Ngày sinh</label>
                  <input
                    className="border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    type="date"
                    name="dateOfBirth"
                    value={editForm.dateOfBirth}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm text-gray-600">Giới tính</label>
                  <select
                    className="border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    name="gender"
                    value={editForm.gender}
                    onChange={handleEditChange}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm text-gray-600">Vai trò</label>
                  <select
                    className="border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    name="role"
                    value={editForm.role}
                    onChange={handleEditChange}
                  >
                    <option value="">Chọn vai trò</option>
                    <option value="admin">Quản trị viên</option>
                    <option value="content_manager">Quản lý bài viết</option>
                    <option value="editor">Biên tập viên</option>
                    <option value="user">Người dùng</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm text-gray-600">Trạng thái</label>
                  <select
                    className="border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="active">Hoạt động</option>
                    <option value="locked">Đã khóa</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="font-medium text-sm text-gray-600">Mô tả</label>
                  <textarea
                    className="border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    rows={3}
                    name="intro"
                    value={editForm.intro}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="font-medium text-sm text-gray-600">Ảnh đại diện (chọn từ máy)</label>
                  <input
                    className="border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    type="file"
                    accept="image/*"
                    name="avatar"
                    onChange={handleAvatarChange}
                  />
                  {/* Preview nếu có ảnh */}
                  {avatarPreview && (
                    <img
                      src={avatarPreview}
                      alt="avatar"
                      className="mt-2 max-w-[90px] max-h-[90px] object-cover rounded-full border border-blue-200"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm text-gray-600">Ngày tạo</label>
                  <input
                    className="border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    type="date"
                    name="created_at"
                    value={editForm.created_at}
                    onChange={handleEditChange}
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end mt-2">
                <button
                  className="btn-transition px-4 py-2 rounded-lg border bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
                  onClick={() => { setEditingId(null); setAvatarPreview(""); }}
                  type="button"
                >
                  Huỷ
                </button>
                <button
                  className="btn-transition px-4 py-2 rounded-lg border bg-blue-600 text-white font-semibold hover:bg-blue-700"
                  onClick={handleEditSave}
                  type="button"
                  disabled={!avatarPreview} // Bắt buộc chọn avatar mới được lưu
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNguoiDung;
