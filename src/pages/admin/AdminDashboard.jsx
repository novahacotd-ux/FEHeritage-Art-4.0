import React from "react";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";

// === DỮ LIỆU MẪU DASHBOARD ADMIN ===
const stats = [
  { label: "Người dùng", value: 12450, sub: "Tổng số người đăng ký", change: "+320 mới / 30 ngày", path: "/admin/users" },
  { label: "Bài cộng đồng", value: 860, sub: "Tin tức, bài viết, diễn đàn", change: "", path: "/admin/news" },
  { label: "Cần duyệt", value: 42, sub: "Bài chờ duyệt & báo cáo", change: "", path: "/admin/TraiNghiem" },
  { label: "Tương tác Forum", value: 5700, sub: "Lượt xem, trả lời diễn đàn", change: "", path: "/admin/forum" },
  { label: "Tương tác Góc nhìn", value: 3100, sub: "Bình luận & phản hồi góc nhìn", change: "", path: "/admin/viewpoint" },
  { label: "Tương tác Phân tích", value: 3600, sub: "Lượt xem & số liệu phân tích", change: "", path: "/admin/analysis" },
];

const pendingItems = [
  {
    id: "P-1021",
    type: "Diễn đàn",
    title: "Nghệ thuật Đông Sơn",
    author: "Minh Hòa",
    status: "pending",
    image: "https://images.pexels.com/photos/461940/pexels-photo-461940.jpeg",
  },
  {
    id: "P-1022",
    type: "Tin tức",
    title: "Lễ hội Nghinh Ông 2024",
    author: "Báo cáo viên",
    status: "pending",
    image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg",
  },
  {
    id: "P-1023",
    type: "Góc nhìn",
    title: "Bảo tồn kiến trúc phố cổ",
    author: "Lan Anh",
    status: "pending",
    image: "https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg",
  },
];

const highlights = [
  { title: "Bản đồ số di sản", detail: "Thêm 12 địa điểm, 38 hình ảnh mới", date: "Hôm nay" },
  { title: "Quy tắc cộng đồng", detail: "Cập nhật hướng dẫn xử lý nội dung nhạy cảm", date: "Hôm nay" },
  { title: "AI gợi ý mô tả", detail: "Triển khai thử nghiệm mô tả tranh tự động", date: "Hôm qua" },
];

// === COMPONENT DASHBOARD ===
const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    if (path) navigate(path);
  };

  const handleExportToExcel = async () => {
    // Tạo workbook và worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("System Overview");

    // Định nghĩa style header
    const headerStyle = {
      font: { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0369A1' } },
      alignment: { vertical: 'middle', horizontal: 'center' },
      border: {
        top:    { style: 'thin', color: { argb: 'FFE0E7EF' } },
        left:   { style: 'thin', color: { argb: 'FFE0E7EF' } },
        bottom: { style: 'thin', color: { argb: 'FFE0E7EF' } },
        right:  { style: 'thin', color: { argb: 'FFE0E7EF' } },
      },
    };

    const dataStyle = {
      border: {
        top:    { style: 'thin', color: { argb: 'FFE0E7EF' } },
        left:   { style: 'thin', color: { argb: 'FFE0E7EF' } },
        bottom: { style: 'thin', color: { argb: 'FFE0E7EF' } },
        right:  { style: 'thin', color: { argb: 'FFE0E7EF' } },
      },
      alignment: { vertical: 'middle', horizontal: 'left' },
    };

    // Header row
    worksheet.addRow(["Category", "Value", "Description", "Change"]);
    worksheet.columns = [
      { header: "Category", key: "category", width: 22 },
      { header: "Value", key: "value", width: 14 },
      { header: "Description", key: "description", width: 34 },
      { header: "Change", key: "change", width: 20 },
    ];

    // Add data rows
    stats.forEach(stat => {
      worksheet.addRow([
        stat.label,
        stat.value,
        stat.sub || "",
        stat.change || ""
      ]);
    });

    // Apply styles
    worksheet.getRow(1).eachCell((cell) => {
      Object.assign(cell, { style: headerStyle });
    });

    for (let i = 2; i <= stats.length + 1; i++) {
      worksheet.getRow(i).eachCell((cell, colNumber) => {
        Object.assign(cell, { style: dataStyle });
        // Định dạng cột số
        if (colNumber === 2) {
          cell.numFmt = '#,##0';
          cell.alignment = { ...cell.alignment, horizontal: 'right' };
        }
        // màu mô tả
        if (colNumber === 3) {
          cell.font = { color: { argb: 'FF4B5563' } };
        }
        // màu change
        if (colNumber === 4) {
          cell.font = { color: { argb: 'FF089981' } };
        }
      });
    }

    // AutoFilter
    worksheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: 4 },
    };
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];

    // Tải file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "heritageart-system-overview.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8 gap-2">
          <span className="inline-block bg-gradient-to-tr from-blue-600 to-green-400 text-white px-3 py-[2px] rounded-lg text-lg font-bold shadow">
            Bảng điều khiển
          </span>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white p-7 rounded-t-2xl border-b border-emerald-100 shadow">
          <div>
            <h2 className="text-2xl font-extrabold bg-gradient-to-tr from-sky-600 to-emerald-400 bg-clip-text text-transparent select-none">
              Tổng quan hệ thống Heritage Art 4.0
            </h2>
            <div className="text-gray-500 text-sm font-medium mt-2">
              Thống kê, hoạt động và nội dung đang chờ duyệt
            </div>
          </div>
          <button
            className="px-6 py-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 text-white font-bold shadow hover:shadow-xl hover:from-sky-600 hover:to-green-500 transition"
            type="button"
            onClick={handleExportToExcel}
            title="Xuất thống kê tổng hệ thống ra Excel"
          >
            Export
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-7 bg-white px-8 py-6 border-b border-emerald-50">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex flex-col cursor-pointer select-none border border-emerald-100 hover:shadow-xl bg-emerald-50/70 rounded-2xl p-6 transition shadow group"
              tabIndex={0}
              role="button"
              onClick={() => handleNavigate(item.path)}
              onKeyDown={(e) => e.key === "Enter" && handleNavigate(item.path)}
            >
              <span className="text-lg font-bold text-emerald-700 group-hover:text-sky-700">{item.label}</span>
              <span className="text-3xl font-extrabold text-sky-600 group-hover:text-emerald-500 mt-1">
                {typeof item.value === "number" ? item.value.toLocaleString("vi-VN") : item.value}
              </span>
              <span className="text-xs text-gray-500 mt-2">{item.sub}</span>
              {item.change && <span className="text-xs text-emerald-700 mt-0.5">{item.change}</span>}
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 bg-white px-8 py-10 rounded-b-2xl shadow">
          {/* Pending review section */}
          <div className="flex flex-col rounded-2xl border border-emerald-100 bg-emerald-50/60 shadow-sm pb-2">
            <div className="flex justify-between items-center px-7 pt-7 pb-3 border-b border-emerald-50">
              <h3 className="font-bold text-xl text-emerald-700">Đang chờ duyệt</h3>
              <span className="inline-block bg-yellow-200 text-yellow-800 font-semibold px-3 py-1 text-xs rounded-full shadow">
                {pendingItems.length} mục
              </span>
            </div>
            <div className="overflow-x-auto px-2">
              <table className="min-w-full divide-y divide-emerald-100">
                <thead>
                  <tr className="bg-emerald-100/60 text-emerald-600 font-bold text-sm">
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Ảnh</th>
                    <th className="px-4 py-3 text-left">Loại</th>
                    <th className="px-4 py-3 text-left">Tiêu đề</th>
                    <th className="px-4 py-3 text-left">Tác giả</th>
                    <th className="px-4 py-3 text-left">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-400 py-6 font-medium">
                        Không có nội dung đang chờ duyệt.
                      </td>
                    </tr>
                  ) : (
                    pendingItems.map((item) => (
                      <tr key={item.id} className="even:bg-white hover:bg-emerald-100/30 transition">
                        <td className="px-4 py-2 font-mono text-xs text-gray-700">{item.id}</td>
                        <td className="px-4 py-2">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-14 h-14 object-cover rounded-lg border border-emerald-100 bg-white"
                          />
                        </td>
                        <td className="px-4 py-2 text-emerald-600 font-semibold">{item.type}</td>
                        <td className="px-4 py-2 font-semibold text-gray-800">{item.title}</td>
                        <td className="px-4 py-2 text-gray-700">{item.author}</td>
                        <td className="px-4 py-2">
                          <span className="inline-block bg-yellow-400/80 text-yellow-900 font-bold text-xs px-2 py-1 rounded-full shadow">
                            Chờ duyệt
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Highlights section */}
          <div className="flex flex-col rounded-2xl border border-emerald-100 bg-emerald-50/60 shadow-sm pb-2">
            <div className="flex justify-between items-center px-7 pt-7 pb-3 border-b border-emerald-50">
              <h3 className="font-bold text-xl text-emerald-700">Cập nhật nhanh</h3>
              <span className="inline-block bg-green-200 text-green-800 font-semibold px-3 py-1 text-xs rounded-full shadow">
                Hoạt động
              </span>
            </div>
            <div className="flex flex-col gap-4 p-6">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-0.5 bg-white rounded-xl border border-emerald-50 px-5 py-4 shadow group hover:bg-emerald-100 transition"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-bold text-sky-700 group-hover:text-emerald-700">{item.title}</h4>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <div className="text-gray-600 text-base">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
