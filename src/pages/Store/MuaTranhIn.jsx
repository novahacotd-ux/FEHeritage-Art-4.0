// File moved to ./Store/MuaTranhIn.jsx
// src/pages/MuaTranhIn.jsx
import React, { useState, useContext } from "react";
import Cart from "../../components/Cart";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useArts } from "../../context/ArtContext";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";


export default function MuaTranhIn() {
  // Context và state
  const { user } = useContext(UserContext);
  const { addToCart } = useCart();
  const { arts } = useArts();
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Tất cả");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [sortOrder, setSortOrder] = useState("none");
  const [showCart, setShowCart] = useState(false);

  // Lọc tranh theo các tiêu chí
  const filteredArts = arts
    .filter((art) => art.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((art) => filterCategory === "Tất cả" ? true : art.category === filterCategory)
    .filter((art) => {
      const type = selectedTypes[art.id] || "Tranh Canvas";
      const price = art.price[type];
      return price >= minPrice && price <= maxPrice;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        const typeA = selectedTypes[a.id] || "Tranh Canvas";
        const typeB = selectedTypes[b.id] || "Tranh Canvas";
        return a.price[typeA] - b.price[typeB];
      }
      if (sortOrder === "desc") {
        const typeA = selectedTypes[a.id] || "Tranh Canvas";
        const typeB = selectedTypes[b.id] || "Tranh Canvas";
        return b.price[typeB] - a.price[typeA];
      }
      return 0;
    });

  // Xử lý chọn loại tranh
  const handleTypeChange = (artId, type) => {
    setSelectedTypes((prev) => ({ ...prev, [artId]: type }));
  };

  // Xem chi tiết tranh
  const handleViewDetail = (art) => {
    navigate(`/chi-tiet/${art.id}`);
  };

  // Thêm vào giỏ hàng
  const handleAddToCart = (art) => {
    const type = selectedTypes[art.id] || "Tranh Canvas";
    addToCart(art, type);
    toast.success("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Nút mở Cart popup */}
      <button
        className="fixed bottom-8 right-8 z-40 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg px-6 py-3 text-lg flex items-center gap-2"
        onClick={() => setShowCart(true)}
      >
        🛒 Xem giỏ hàng
      </button>
      {/* Cart popup modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 relative">
            <button
              className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-orange-600 font-bold"
              onClick={() => setShowCart(false)}
            >
              ×
            </button>
            <Cart />
          </div>
        </div>
      )}
      <Toaster position="top-right" />
      {/* Sidebar bộ lọc */}
      <aside className="w-72 bg-white shadow-md p-6 border-r hidden md:block">
        <h1 className="text-2xl font-bold text-orange-600 mb-6">🖼️ Cửa hàng HA4</h1>
        {/* Có thể bổ sung các filter, search, ... ở đây */}
      </aside>
      {/* Danh sách tranh */}
      <main className="flex-1 p-6 md:p-10">
        <motion.div
          className="mb-10 text-center bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-300 rounded-xl p-6 shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-2xl font-bold text-orange-700 mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ❤️ Chung tay vì dự án Heritage Art 4.0
          </motion.h2>
          <motion.p
            className="text-lg text-gray-800 font-medium"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Khi bạn mua tranh, <span className="text-orange-600 font-bold">5% tổng số tiền bán ra</span> sẽ được dành tặng cho các <span className="font-semibold">Mẹ Việt Nam anh hùng</span> và <span className="font-semibold">Anh hùng lực lượng vũ trang nhân dân</span>.
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArts && filteredArts.length > 0 ? (
            filteredArts.map((art) => {
              const selectedType = selectedTypes[art.id] || "Tranh Canvas";
              const price = art.price[selectedType];
              const imageUrl = art.images[selectedType];

              return (
                <motion.div
                  key={art.id}
                  className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -6 }}
                >
                  {/* Ảnh sản phẩm */}
                  <div
                    onClick={() => handleViewDetail(art)}
                    className="relative cursor-pointer group overflow-hidden"
                  >
                    <motion.img
                      src={imageUrl}
                      alt={`${art.title} - ${selectedType}`}
                      className="w-full h-full object-cover aspect-square select-none"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.button
                        className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🔍 Xem chi tiết
                      </motion.button>
                    </motion.div>
                  </div>
                  {/* Thông tin sản phẩm */}
                  <div className="p-4">
                    <div
                      onClick={() => handleViewDetail(art)}
                      className="text-base font-semibold mb-2 text-gray-800 hover:text-orange-600 cursor-pointer truncate"
                    >
                      {art.title}
                    </div>
                    <label className="block mb-1 text-xs font-medium text-gray-600">
                      Loại sản phẩm:
                    </label>
                    <select
                      className="border rounded-md p-2 w-full mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      value={selectedType}
                      onChange={(e) => handleTypeChange(art.id, e.target.value)}
                    >
                      {Object.keys(art.price).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <p className="text-lg font-bold text-orange-600 mb-3">
                      {price.toLocaleString()}₫
                    </p>
                    <motion.button
                      onClick={() => handleAddToCart(art)}
                      className="w-full py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg shadow hover:from-orange-600 hover:to-amber-600 transition-all"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      🛒 Thêm vào giỏ
                    </motion.button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="text-center col-span-4 text-gray-500 italic">
              Hiện chưa có sản phẩm nào. Vui lòng thêm từ trang Admin.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
