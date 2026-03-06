import { useEffect, useRef, useState } from "react";
import { analyzeService } from "../../adminApi/apiAnalyzeViews";
import CKEditorField from "../../components/common/CKEditorField";

const emptyForm = {
  summary: "",
  content: "",
  tag: "Phân tích",
  status: "Published",
  thumbnail_url: "",
  thumbnailFile: null,
};

const ITEMS_PER_PAGE = 5;

const AdminPhanTich = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingIdx, setEditingIdx] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [detailArticle, setDetailArticle] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const fileInputRef = useRef();

  // --- HÀM LẤY DANH SÁCH BÀI PHÂN TÍCH ---
  const fetchArticles = async () => {
  setIsLoading(true);
  try {
    const res = await analyzeService.getAll();
    console.log("Analyze API:", res);
    // res = { success: true, data: [...] }
    const data = Array.isArray(res?.data) ? res.data
                : Array.isArray(res?.results) ? res.results
                : Array.isArray(res) ? res
                : [];
    setArticles(data);
  } catch (error) {
    console.error("Lỗi GET analyze:", error);
  } finally {
    setIsLoading(false);
  }
};

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

  const doEdit = (idx) => {
    const article = articles[idx];
    setEditingIdx(idx);
    setForm({
      ...article,
      thumbnail_url: article.thumbnail_url || "",
      thumbnailFile: null,
    });
    setShowForm(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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

  // --- HÀM TẠO BÀI ---
 const submitArticle = async (e) => {
  e.preventDefault();
  if (!form.summary.trim()) return alert("Vui lòng nhập tiêu đề!");
  if (!form.content.trim()) return alert("Vui lòng nhập nội dung!");
  if (!form.thumbnailFile && !form.thumbnail_url)
    return alert("Vui lòng tải lên ảnh đại diện!");
  if (editingIdx !== null) {
    alert("Chức năng cập nhật sẽ làm sau!");
    return;
  }

  setIsLoading(true);
  try {
    // BƯỚC 1: Tạo bài
    const payload = {
      summary: form.summary,
      content: form.content,
      tag: form.tag,
      status: form.status,
    };
    const created = await analyzeService.create(payload);
    console.log("[CREATE] result:", created);

    // res = { success: true, data: { id: ... } }
    const newId = created?.data?.id || created?.id;
    if (!newId) throw new Error("Không lấy được ID sau khi tạo!");

    // BƯỚC 2: Upload ảnh
    if (form.thumbnailFile) {
      console.log(`[UPLOAD] gắn ảnh cho ID: ${newId}`);
      await analyzeService.uploadMedia(newId, form.thumbnailFile);
    }

    alert("Tạo bài phân tích thành công!");
    resetAll();
    fetchArticles();
  } catch (error) {
    console.error("Lỗi tạo bài:", error);
    alert("Có lỗi xảy ra! Xem log F12.");
  } finally {
    setIsLoading(false);
  }
};

  const deleteArticle = async (idx) => {
    if (window.confirm("Xóa bài phân tích này?")) {
      // Tạm thời chỉ xóa ở Frontend, sau này nối API Delete vào đây
      const remained = articles.filter((_, i) => i !== idx);
      setArticles(remained);
    }
  };

  const filterList = () =>
    articles.filter(
      (ar) =>
        (ar.summary || "").toLowerCase().includes(searchValue.toLowerCase()) ||
        (ar.tag || "").toLowerCase().includes(searchValue.toLowerCase()),
    );

  const filteredList = filterList();
  const totalPage = Math.ceil(filteredList.length / ITEMS_PER_PAGE) || 1;
  const firstIdx = (page - 1) * ITEMS_PER_PAGE;
  const showList = filteredList.slice(firstIdx, firstIdx + ITEMS_PER_PAGE);

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

  return (
    <div className="min-h-screen bg-[#FAF8F3] py-6">
      <div className="w-full px-2 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center mb-6 gap-1.5">
          <span className="inline-flex items-center bg-gradient-to-tr from-blue-600 to-green-400 text-white px-3 py-1 rounded-lg text-lg font-bold shadow">
            Quản lý Phân tích
          </span>
        </div>

        {/* Thanh tìm kiếm & Thêm mới */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 bg-white p-6 rounded-xl border border-[#E5FAFF] shadow mb-4">
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
              placeholder="🔎 Tìm kiếm theo tiêu đề hoặc thẻ..."
              className="w-full pl-10 pr-4 py-2.5 border border-[#BFF0FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800 bg-blue-50 transition text-sm"
            />
          </div>
          <div className="flex flex-row gap-2 items-center justify-end mt-2 md:mt-0">
            <span className="bg-yellow-100 text-yellow-800 text-[13px] font-bold px-3 py-1 rounded-full">
              {filteredList.length} bài phân tích
            </span>
            <button
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-bold bg-gradient-to-br from-sky-600 to-emerald-400 text-white shadow hover:shadow-lg transition-all text-sm"
              onClick={doAdd}
              type="button"
              disabled={isLoading}
            >
              Thêm bài phân tích
            </button>
          </div>
        </div>

        {/* Bảng danh sách */}
        <div className="bg-white rounded-xl shadow border border-blue-100 overflow-hidden w-full overflow-x-auto pt-1 pb-4">
          <div className="min-w-[700px] grid grid-cols-12 items-center bg-gradient-to-tr from-blue-100 to-green-100 border-b border-blue-200 px-6 py-3.5 text-xs font-bold text-blue-600 tracking-wider uppercase">
            <div className="col-span-1 text-center">STT</div>
            <div className="col-span-2 text-center">Ảnh</div>
            <div className="col-span-4">Tiêu đề (Summary)</div>
            <div className="col-span-2 text-center">Thẻ (Tag)</div>
            <div className="col-span-3 flex justify-center">Hành động</div>
          </div>

          {isLoading && showList.length === 0 ? (
            <div className="py-10 text-center text-blue-500 font-semibold">
              Đang tải dữ liệu...
            </div>
          ) : showList.length > 0 ? (
            showList.map((item, idx) => {
              const globalIdx = articles.findIndex((a) => a.id === item.id);
              return (
                <div
                  key={item.id || idx}
                  className="group min-w-[700px] grid grid-cols-12 items-center border-b last:border-0 border-cyan-50 px-6 py-3 text-[15px] transition hover:bg-emerald-50"
                >
                  <div className="col-span-1 text-center">
                    <span className="inline-block px-2 py-0.5 text-xs font-bold bg-teal-100 text-teal-700 rounded-md tracking-wide">
                      {firstIdx + idx + 1}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-center">
                    {/* Ưu tiên lấy thumbnail_url, nếu không có thì chui vào mảng images lấy tấm đầu tiên */}
                    {item.thumbnail_url || item.images?.[0]?.image_url ? (
                      <img
                        src={item.thumbnail_url || item.images[0].image_url}
                        alt="thumbnail"
                        className="w-16 h-10 object-cover rounded-md border border-cyan-200"
                      />
                    ) : (
                      <div className="w-16 h-10 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-300">
                        Trống
                      </div>
                    )}
                  </div>
                  <div className="col-span-4 flex flex-col gap-1 pr-2">
                    <span
                      className="text-emerald-900 font-bold line-clamp-2"
                      title={item.summary}
                    >
                      {item.summary}
                    </span>
                    {item.status && (
                      <span
                        className={`w-fit text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${item.status === "Published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                      >
                        {item.status}
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="inline-block bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded-md font-semibold truncate max-w-full">
                      {item.tag || "N/A"}
                    </span>
                  </div>
                  <div className="col-span-3 flex flex-row gap-2 justify-center items-center">
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-blue-50 border border-blue-200 rounded-full hover:bg-blue-100 transition"
                      onClick={() => setDetailArticle(item)}
                      title="Xem"
                    >
                      👁️
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded-full hover:bg-yellow-100 transition"
                      onClick={() => doEdit(globalIdx)}
                      title="Sửa"
                    >
                      ✏️
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-red-50 border border-red-200 rounded-full hover:bg-red-100 transition"
                      onClick={() => deleteArticle(globalIdx)}
                      title="Xóa"
                    >
                      🗑️
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

          {/* Phân trang giữ nguyên */}
          {totalPage > 1 && (
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 bg-gradient-to-r from-emerald-50 to-sky-50 border-t border-emerald-100 mt-2 rounded-b-xl">
              {/* Code phân trang... */}
              <div className="flex items-center gap-1.5 ml-auto">
                {paging().map((num, idx) => (
                  <button
                    key={idx}
                    onClick={() => typeof num === "number" && setPage(num)}
                    disabled={num === "..."}
                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition shadow ${num === page ? "bg-emerald-500 text-white" : "bg-white text-gray-700"}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal form thêm/sửa */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-[1.5px] transition animate-fadein-fast">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[96vh] overflow-y-auto border border-cyan-200">
              <div className="flex justify-between items-center p-6 border-b border-cyan-100 sticky top-0 bg-white z-10">
                <h2 className="text-xl font-extrabold text-cyan-800">
                  {editingIdx !== null
                    ? "Cập nhật Phân tích"
                    : "Thêm Phân tích mới"}
                </h2>
                <button
                  onClick={resetAll}
                  className="text-gray-400 hover:text-red-500 p-2 rounded-full"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>

              <form className="p-6 space-y-5" onSubmit={submitArticle}>
                {/* Tên bài (Summary) */}
                <div>
                  <label className="block text-sm font-bold text-teal-700 mb-2">
                    Tiêu đề bài viết (Summary){" "}
                    <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.summary}
                    onChange={(e) =>
                      setForm({ ...form, summary: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 bg-cyan-50 font-semibold"
                    placeholder="Nhập tiêu đề..."
                    autoFocus
                  />
                </div>

                {/* Thẻ (Tag) và Trạng thái */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-teal-700 mb-2">
                      Thẻ (Tag)
                    </label>
                    <input
                      type="text"
                      value={form.tag}
                      onChange={(e) =>
                        setForm({ ...form, tag: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 bg-cyan-50 font-semibold"
                      placeholder="VD: vanhoa, phantich"
                    />
                  </div>
                  <div className="w-1/3">
                    <label className="block text-sm font-bold text-teal-700 mb-2">
                      Trạng thái
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-400 bg-cyan-50 font-semibold"
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                </div>

                {/* Ảnh đại diện */}
                <div>
                  <label className="block text-sm font-bold text-cyan-700 mb-2">
                    Ảnh đại diện <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setForm({
                        ...form,
                        thumbnailFile: file || null,
                        thumbnail_url: "",
                      });
                    }}
                    className="block w-full px-4 py-2 border border-cyan-200 rounded-lg bg-cyan-50 font-semibold text-sm"
                  />

                  {form.thumbnailFile && (
                    <div className="mt-3">
                      <img
                        src={URL.createObjectURL(form.thumbnailFile)}
                        alt="preview"
                        className="rounded-lg h-24 object-cover border border-cyan-200"
                      />
                    </div>
                  )}
                  {editingIdx !== null &&
                    !form.thumbnailFile &&
                    form.thumbnail_url && (
                      <div className="mt-3">
                        <img
                          src={form.thumbnail_url}
                          alt="preview cũ"
                          className="rounded-lg h-24 object-cover border border-cyan-200"
                        />
                      </div>
                    )}
                </div>

                {/* Nội dung */}
                <div>
                  <label className="block text-sm font-bold text-teal-700 mb-2">
                    Nội dung <span className="text-pink-500">*</span>
                  </label>
                  <CKEditorField
                    value={form.content}
                    onChange={(text) => setForm({ ...form, content: text })}
                    placeholder="Chi tiết bài phân tích..."
                  />
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-tr from-sky-600 to-cyan-400 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg disabled:opacity-50"
                  >
                    {isLoading
                      ? "Đang xử lý..."
                      : editingIdx !== null
                        ? "Cập nhật"
                        : "Tạo bài viết"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal chi tiết rút gọn */}
        {detailArticle && (
          <div className="fixed inset-0 bg-black/30 z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-xl p-6 relative">
              <button
                onClick={() => setDetailArticle(null)}
                className="absolute top-4 right-4 text-red-500 font-bold"
              >
                Đóng ❌
              </button>
              <h3 className="text-xl font-extrabold text-teal-700 mb-3 pr-10">
                {detailArticle.summary}
              </h3>
              {(detailArticle.thumbnail_url ||
                detailArticle.images?.[0]?.image_url) && (
                <img
                  src={
                    detailArticle.thumbnail_url ||
                    detailArticle.images[0].image_url
                  }
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  alt="Ảnh chi tiết"
                />
              )}
              <div className="flex gap-2 mb-4">
                <span className="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded font-bold">
                  Thẻ: {detailArticle.tag || "N/A"}
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded font-bold">
                  Trạng thái: {detailArticle.status}
                </span>
              </div>
              <div
                className="ck-content text-gray-700 max-h-60 overflow-y-auto pr-2"
                dangerouslySetInnerHTML={{ __html: detailArticle.content }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPhanTich;