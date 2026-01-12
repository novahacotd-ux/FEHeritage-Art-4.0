// src/pages/ChiTietTranh.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useProducts } from "../../context/ProductContext";
import { UserContext } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";
import logoWatermark from "../../assets/logo-watermark.png";
import { RefreshCw } from "lucide-react";

export default function ChiTietTranh() {
  // Context & state
  const { user } = useContext(UserContext);
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductById, products: allProducts } = useProducts();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [watermarkedImage, setWatermarkedImage] = useState(null);

  // Fetch product by ID from API
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        if (data) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, fetchProductById]);

  // Load reviews from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`reviews_${id}`);
    if (saved) setReviews(JSON.parse(saved));
  }, [id]);

  // Add watermark to image
  const addWatermark = (imageSrc, logoSrc, callback) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const logo = new window.Image();
      logo.src = logoSrc;
      logo.onload = () => {
        const logoWidth = img.width * 0.25;
        const logoHeight = (logo.height / logo.width) * logoWidth;
        const x = (img.width - logoWidth) / 2;
        const y = (img.height - logoHeight) / 2;
        ctx.globalAlpha = 0.35;
        ctx.drawImage(logo, x, y, logoWidth, logoHeight);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        callback(dataUrl);
      };
    };
  };

  // Add watermark when image changes
  useEffect(() => {
    if (product?.image) {
      addWatermark(product.image, logoWatermark, setWatermarkedImage);
    }
  }, [product?.image]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4 text-orange-500" size={48} />
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="p-10 text-center">
        <div className="text-6xl mb-4">😞</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy sản phẩm</h2>
        <Link to="/mua-tranh-in" className="text-orange-600 hover:underline">
          ← Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  // Toast notifications
  const toastAddCart = () => toast.success("Đã thêm vào giỏ hàng");
  const toastReview = () => toast.success("Đánh giá của bạn đã được lưu!");

  // Add to cart
  const handleAddToCart = async () => {
    try {
      await addToCart(product, "default", quantity);
      toastAddCart();
    } catch (error) {
      toast.error("Lỗi thêm vào giỏ hàng");
    }
  };

  // Buy now - direct checkout without adding to cart
  const { setBuyNow } = useCart();

  const handleBuyNow = () => {
    // Set this product for direct checkout
    setBuyNow(product, quantity);
    toast.success("🧾 Đang chuyển đến trang thanh toán...");
    navigate("/checkout");
  };

  // Add review
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const r = { ...newReview, date: new Date().toLocaleString() };
    const updated = [r, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));
    setNewReview({ name: "", rating: 5, comment: "" });
    toastReview();
  };

  // Similar products (from same category)
  const similarItems =
    allProducts?.filter(
      (p) => p.category?.category_id === product.category?.category_id && p.product_id !== product.product_id
    ) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <motion.div
            className="overflow-hidden rounded-lg shadow-md relative cursor-zoom-in select-none"
            onClick={() => setIsZoomed(true)}
          >
            <img
              src={watermarkedImage || product.image || "https://placehold.co/600x600?text=No+Image"}
              alt={product.name}
              className="w-full h-[460px] object-cover rounded-lg pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-2">
            Danh mục: {product.category?.name || "Chưa phân loại"}
          </p>
          {product.topic && (
            <p className="text-sm text-gray-500 mb-2">Chủ đề: {product.topic.name}</p>
          )}
          {product.style && (
            <p className="text-sm text-gray-500 mb-2">Phong cách: {product.style.name}</p>
          )}

          <div className="flex items-center gap-3 my-2">
            <div className="text-yellow-400">
              {"★".repeat(reviews.length > 0 ? Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 5)}
            </div>
            <div className="text-sm text-gray-600">({reviews.length} đánh giá)</div>
          </div>

          <div className="text-3xl font-extrabold text-orange-600 mb-4">
            {Number(product.price).toLocaleString()}₫
          </div>

          {/* Stock status */}
          {product.stock_quantity > 0 ? (
            <p className="text-sm text-green-600 mb-4">
              Còn hàng: {product.stock_quantity} sản phẩm
            </p>
          ) : (
            <p className="text-sm text-red-600 mb-4">Hết hàng</p>
          )}

          {/* Quantity */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Số lượng</div>
            <div className="inline-flex items-center border rounded-md">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2"
                disabled={quantity <= 1}
              >
                −
              </button>
              <div className="px-6">{quantity}</div>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock_quantity, q + 1))}
                className="px-3 py-2"
                disabled={quantity >= product.stock_quantity}
              >
                +
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock_quantity === 0}
              className="flex-1 bg-orange-500 text-white py-3 rounded-md font-semibold hover:bg-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              🛒 Thêm vào giỏ
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock_quantity === 0}
              className="flex-1 bg-amber-400 text-white py-3 rounded-md font-semibold hover:bg-amber-500 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              ⚡ Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Reviews & Similar Products */}
      <div className="max-w-7xl mx-auto mt-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Đánh giá của người dùng</h3>
          <form onSubmit={handleAddReview} className="space-y-3 mb-6">
            <input
              type="text"
              placeholder="Tên của bạn"
              className="w-full border rounded p-2"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              required
            />
            <div className="flex gap-3 items-center">
              <label className="text-sm">Chấm sao:</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value, 10) })}
                className="border rounded p-2"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} sao
                  </option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Viết nhận xét..."
              className="w-full border rounded p-2 h-28"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
            />
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
              Gửi đánh giá
            </button>
          </form>
          <div>
            {reviews.length === 0 ? (
              <p className="text-gray-500">Chưa có đánh giá nào.</p>
            ) : (
              reviews.map((r, i) => (
                <div key={i} className="border-t py-3">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-sm text-gray-400">{r.date}</div>
                  </div>
                  <div className="text-yellow-500">{"⭐".repeat(r.rating)}</div>
                  <p className="text-gray-700 mt-1">{r.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <aside className="bg-white rounded-lg shadow p-6">
          <h4 className="font-semibold mb-3">🛍️ Sản phẩm tương tự</h4>
          {similarItems.length === 0 ? (
            <p className="text-gray-500">Không có sản phẩm tương tự.</p>
          ) : (
            <div className="space-y-3">
              {similarItems.slice(0, 4).map((item) => (
                <Link
                  key={item.product_id}
                  to={`/chi-tiet/${item.product_id}`}
                  className="group flex gap-2 bg-gray-50 rounded-md shadow hover:shadow-md overflow-hidden transition"
                >
                  <img
                    src={item.image || "https://placehold.co/80x80?text=No+Image"}
                    alt={item.name}
                    className="w-20 h-20 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 p-2">
                    <h5 className="text-sm font-semibold text-gray-800 truncate">{item.name}</h5>
                    <p className="text-orange-600 text-sm font-bold">
                      {Number(item.price).toLocaleString()}₫
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>

      {/* Zoom Image Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
            <motion.div
              className="relative z-10 max-h-[90vh] max-w-[90vw]"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded overflow-hidden bg-gray-900">
                <img
                  src={watermarkedImage || product.image}
                  alt={product.name}
                  className="max-w-[90vw] max-h-[90vh] object-contain"
                />
                <button
                  onClick={() => setIsZoomed(false)}
                  className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-2"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back link */}
      <div className="max-w-7xl mx-auto text-center mt-10">
        <Link to="/mua-tranh-in" className="text-orange-600 hover:underline">
          ← Quay lại cửa hàng
        </Link>
      </div>
    </div>
  );
}
