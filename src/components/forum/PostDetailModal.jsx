import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  ThumbsUp,
  Share2,
  Eye,
  MessageSquare,
  Send,
  Hash,
  ThumbsDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
// import { formatDistanceToNow } from "date-fns";
// import { vi } from "date-fns/locale";

function getRelativeTimeVi(date) {
  if (!date) return "";
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

  if (diffInSeconds < 60) return "vừa xong";

  const units = [
    { name: "năm", seconds: 31536000 },
    { name: "tháng", seconds: 2592000 },
    { name: "tuần", seconds: 604800 },
    { name: "ngày", seconds: 86400 },
    { name: "giờ", seconds: 3600 },
    { name: "phút", seconds: 60 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.name} trước`;
    }
  }
  return "vừa xong";
}

const categoryLabels = {
  technology: "Công nghệ",
  travel: "Du lịch",
  discussion: "Thảo luận",
  education: "Giáo dục",
  heritage: "Di sản",
};

const categoryColors = {
  technology: "from-blue-100 to-cyan-100 text-blue-700",
  travel: "from-green-100 to-emerald-100 text-green-700",
  discussion: "from-purple-100 to-violet-100 text-purple-700",
  education: "from-pink-100 to-rose-100 text-pink-700",
  heritage: "from-yellow-100 to-amber-100 text-yellow-800",
};

export default function PostDetailModal({
  post,
  author,
  onClose,
  onLike,
  onDislike,
  onShare,
  onAddComment,
  currentUser,
  onAvatarClick,
}) {
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleNextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % post.images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex(
      (prev) => (prev - 1 + post.images.length) % post.images.length,
    );
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
      onLike();
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
      onDislike();
    }
  };

  const handleShare = () => {
    onShare();
  };

  const handleSubmitComment = () => {
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  // const timeAgo = formatDistanceToNow(new Date(post.created_date), {
  //   addSuffix: true,
  //   locale: vi,
  // });

  const timeAgo = getRelativeTimeVi(post.created_date);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="bg-zinc-50 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-400 to-amber-600 p-6 text-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onAvatarClick && onAvatarClick(author)}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={author?.avatar}
                    alt={author?.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white cursor-pointer"
                  />
                </button>
                <div>
                  <h3 className="font-semibold">{author?.name}</h3>
                  <p className="text-sm opacity-90">{timeAgo}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/40 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 bg-gradient-to-r ${categoryColors[post.category]} text-sm rounded-full font-medium shadow-sm`}
              >
                {categoryLabels[post.category]}
              </span>
            </div>
            {/* Title */}
            <h1 className="text-3xl font-bold text-amber-900">{post.title}</h1>

            {/* Content */}
            <div className="text-amber-800 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>

            {/* Images */}
            {post.images && post.images.length > 0 && (
              <div
                className={`grid gap-4 ${
                  post.images.length === 1
                    ? "grid-cols-1"
                    : post.images.length === 2
                      ? "grid-cols-2"
                      : "grid-cols-2"
                }`}
              >
                {post.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-xl"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`Post image ${index + 1}`}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1 bg-amber-100/60 hover:bg-amber-200/50 text-amber-700 text-sm rounded-full flex items-center gap-1 hover:from-amber-100 hover:to-orange-100 transition-colors shadow-sm cursor-pointer"
                  >
                    <Hash className="w-3 h-3" />
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 pt-6 border-t border-amber-200">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  liked
                    ? "bg-blue-100 text-blue-600"
                    : "bg-amber-100/60 text-amber-700 hover:bg-amber-100"
                }`}
              >
                <ThumbsUp
                  className={`w-5 h-5 ${liked ? "fill-current" : ""}`}
                />
                <span className="font-medium">{post.likes}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDislike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  disliked
                    ? "bg-red-100 text-red-600"
                    : "bg-amber-100/60 text-amber-700 hover:bg-amber-100"
                }`}
              >
                <ThumbsDown
                  className={`w-5 h-5 ${disliked ? "fill-current" : ""}`}
                />
                <span className="font-medium">{post.dislikes || 0}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-amber-100/60 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-medium">{post.shares}</span>
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-amber-600"
              >
                <Eye className="w-5 h-5" />
                <span className="font-medium">{post.views}</span>
              </motion.div>
            </div>

            {/* Comments Section */}
            <div className="space-y-4 pt-6 border-t border-amber-200">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-amber-900">
                  Bình luận ({post.comments?.length || 0})
                </h3>
              </div>

              {/* Comment Input */}
              <div className="flex gap-3">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSubmitComment()
                    }
                    placeholder="Viết bình luận..."
                    className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmitComment}
                    disabled={!comment.trim()}
                    className="px-4 py-2 bg-amber-500 text-zinc-50 rounded-lg hover:bg-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {post.comments?.map((comment) => {
                  const commentAuthor = [author, currentUser].find(
                    (u) => u.user_id === comment.user_id,
                  );
                  // const commentTimeAgo = formatDistanceToNow(
                  //   new Date(comment.created_date),
                  //   {
                  //     addSuffix: true,
                  //     locale: vi,
                  //   },
                  // );
                  const commentTimeAgo = getRelativeTimeVi(
                    comment.created_date,
                  );

                  return (
                    <motion.div
                      key={comment.post_comment_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ backgroundColor: "#fef3c7" }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-3 p-4 bg-amber-50 rounded-lg"
                    >
                      <img
                        src={commentAuthor?.avatar}
                        alt={commentAuthor?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-amber-900">
                            {commentAuthor?.name}
                          </span>
                          <span className="text-sm text-amber-600">
                            {commentTimeAgo}
                          </span>
                        </div>
                        <p className="text-amber-800">{comment.content}</p>
                      </div>
                    </motion.div>
                  );
                })}

                {(!post.comments || post.comments.length === 0) && (
                  <p className="text-center text-amber-600 py-8">
                    Chưa có bình luận nào. Hãy là người đầu tiên!
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
          >
            {/* Nút đóng */}
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 z-[110] p-2"
              onClick={(e) => {
                e?.stopPropagation?.();
                setSelectedImageIndex(null);
              }}
            >
              <X className="w-10 h-10" />
            </button>

            {/* Nút Previous */}
            {post.images.length > 1 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[110]"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* Ảnh */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={`gallery-img-${selectedImageIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={post.images[selectedImageIndex]}
                className="max-w-full max-h-[90vh] object-contain shadow-2xl select-none"
              />
            </div>

            {/* Nút Next */}
            {post.images.length > 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[110]"
                onClick={handleNextImage}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* Chỉ số ảnh */}
            <div className="absolute bottom-9 text-white/80 font-medium bg-black/20 px-4 py-1 rounded-full">
              {selectedImageIndex + 1} / {post.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}

// import { useState } from 'react'

// export default function PostDetailModal({ post, onClose, onLike, onDislike, onAddComment, onViewProfile }) {
//   const [comment, setComment] = useState('')
//   const [selectedImage, setSelectedImage] = useState(null) // State cho ảnh được chọn

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (comment.trim()) {
//       onAddComment(post.id, comment)
//       setComment('')
//     }
//   }

//   return (
//     <div
//       className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
//       onClick={onClose}
//     >
//       <div
//         className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-500"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="sticky top-0 bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 rounded-t-2xl z-10">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold text-white flex items-center gap-3">
//               <i className="fa-solid fa-newspaper" />
//               Chi tiết bài viết
//             </h2>
//             <button
//               onClick={onClose}
//               className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:rotate-90"
//             >
//               <i className="fa-solid fa-times text-xl" />
//             </button>
//           </div>
//         </div>

//         {/* Content - Scrollable */}
//         <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
//           {/* Post Header */}
//           <div className="p-6 border-b border-gray-200">
//             <div
//               className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity mb-4"
//               onClick={() => onViewProfile(post.author)}
//             >
//               <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
//                 {post.author.avatar}
//               </div>
//               <div>
//                 <h3 className="font-bold text-gray-800 hover:text-amber-600 transition-colors text-lg">
//                   {post.author.name}
//                 </h3>
//                 <p className="text-sm text-gray-500 flex items-center gap-2">
//                   <span>{post.author.role}</span>
//                   <span>•</span>
//                   <span>{post.timestamp}</span>
//                 </p>
//               </div>
//             </div>

//             {/* Category Badge */}
//             <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
//               <i className="fa-solid fa-tag" />
//               {post.category}
//             </span>

//             {/* Title */}
//             <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
//               {post.title}
//             </h1>

//             {/* Content */}
//             <p className="text-gray-700 leading-relaxed text-lg mb-4 whitespace-pre-wrap">
//               {post.content}
//             </p>

//             {/* Images Gallery */}
//             {post.images && post.images.length > 0 && (
//               <div className="mb-4">
//                 <div className={`grid gap-3 ${
//                   post.images.length === 1 ? 'grid-cols-1' :
//                   post.images.length === 2 ? 'grid-cols-2' :
//                   'grid-cols-2 md:grid-cols-3'
//                 }`}>
//                   {post.images.map((image, index) => (
//                     <div
//                       key={index}
//                       className="relative group overflow-hidden rounded-lg border-2 border-gray-200 hover:border-amber-400 transition-all cursor-pointer"
//                       onClick={() => setSelectedImage(image)}
//                     >
//                       <img
//                         src={image}
//                         alt={`Post image ${index + 1}`}
//                         className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
//                       />
//                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
//                         <i className="fa-solid fa-search-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Tags */}
//             <div className="flex flex-wrap gap-2">
//               {post.tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
//                 >
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Interactions Bar */}
//           <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-4 flex-wrap">
//             <button
//               onClick={() => onLike(post.id)}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 text-gray-600 hover:text-green-600 transition-all duration-300 hover:scale-105 group"
//             >
//               <i className="fa-solid fa-thumbs-up group-hover:animate-bounce" />
//               <span className="font-semibold">{post.likes}</span>
//             </button>

//             <button
//               onClick={() => onDislike(post.id)}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-105 group"
//             >
//               <i className="fa-solid fa-thumbs-down group-hover:animate-bounce" />
//               <span className="font-semibold">{post.dislikes}</span>
//             </button>

//             <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 group">
//               <i className="fa-solid fa-share group-hover:animate-bounce" />
//               <span className="font-semibold">Chia sẻ</span>
//             </button>
//           </div>

//           {/* Comments Section */}
//           <div className="p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <i className="fa-solid fa-comments text-indigo-600" />
//               Bình luận ({post.comments.length})
//             </h3>

//             {/* Comments List */}
//             {post.comments.length === 0 ? (
//               <div className="text-center py-12 bg-gray-50 rounded-xl">
//                 <i className="fa-solid fa-comment-slash text-5xl text-gray-300 mb-3" />
//                 <p className="text-gray-500">Chưa có bình luận nào</p>
//                 <p className="text-sm text-gray-400 mt-1">Hãy là người đầu tiên bình luận!</p>
//               </div>
//             ) : (
//               <div className="space-y-4 mb-6">
//                 {post.comments.map(comment => (
//                   <div key={comment.id} className="flex gap-3 group">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//                       {comment.author.substring(0, 2).toUpperCase()}
//                     </div>
//                     <div className="flex-1">
//                       <div className="bg-gray-100 group-hover:bg-gray-200 rounded-2xl rounded-tl-none p-4 transition-colors duration-300">
//                         <p className="font-semibold text-gray-800 mb-1">{comment.author}</p>
//                         <p className="text-gray-700">{comment.content}</p>
//                       </div>
//                       <div className="flex items-center gap-4 mt-2 ml-2">
//                         <span className="text-xs text-gray-500">{comment.timestamp}</span>
//                         <button className="text-xs text-gray-500 hover:text-indigo-600 font-medium transition-colors">
//                           <i className="fa-solid fa-thumbs-up mr-1" />
//                           Thích
//                         </button>
//                         <button className="text-xs text-gray-500 hover:text-indigo-600 font-medium transition-colors">
//                           <i className="fa-solid fa-reply mr-1" />
//                           Trả lời
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Comment Input */}
//             <form onSubmit={handleSubmit} className="mt-6 space-y-3">
//               <div className="flex gap-3">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//                   ND
//                 </div>
//                 <textarea
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   placeholder="Viết bình luận của bạn..."
//                   rows="3"
//                   className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none transition-all text-gray-800 resize-none"
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   disabled={!comment.trim()}
//                   className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:scale-100"
//                 >
//                   <i className="fa-solid fa-paper-plane mr-2" />
//                   Gửi bình luận
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Image Lightbox Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
//           onClick={() => setSelectedImage(null)}
//         >
//           <button
//             onClick={() => setSelectedImage(null)}
//             className="absolute top-4 right-4 text-white hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:rotate-90 z-10"
//           >
//             <i className="fa-solid fa-times text-2xl" />
//           </button>

//           <div
//             className="relative max-w-6xl max-h-[90vh] animate-in zoom-in slide-in-from-bottom-4 duration-500"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img
//               src={selectedImage}
//               alt="Full size"
//               className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
//             />

//             {/* Image controls */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-3">
//               <button
//                 onClick={() => setSelectedImage(null)}
//                 className="text-white hover:text-amber-400 transition-colors px-3 py-1"
//                 title="Đóng (ESC)"
//               >
//                 <i className="fa-solid fa-times mr-2" />
//                 Đóng
//               </button>
//               <span className="text-white/40">|</span>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   const link = document.createElement('a')
//                   link.href = selectedImage
//                   link.download = 'image.jpg'
//                   link.click()
//                 }}
//                 className="text-white hover:text-amber-400 transition-colors px-3 py-1"
//                 title="Tải xuống"
//               >
//                 <i className="fa-solid fa-download mr-2" />
//                 Tải xuống
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
