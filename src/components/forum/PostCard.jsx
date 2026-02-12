import { MessageSquare, Eye, Hash, ThumbsUp } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";
// import { vi } from "date-fns/locale";
import { motion } from "framer-motion";

function getRelativeTimeVi(date) {
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

export default function PostCard({ post, author, onPostClick, onAvatarClick }) {
  // const timeAgo = formatDistanceToNow(new Date(post.created_date), {
  //   addSuffix: true,
  //   locale: vi,
  // });
  const timeAgo = getRelativeTimeVi(post.created_date);

  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="bg-zinc-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-amber-100"
    >
      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAvatarClick();
              }}
              className="relative group/avatar"
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={author?.avatar}
                alt={author?.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-200 group-hover/avatar:ring-4 group-hover/avatar:ring-orange-300 transition-all"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/20 to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
            </button>
            <div>
              <h4 className="font-semibold text-amber-900">{author?.name}</h4>
              <p className="text-sm text-amber-600">{timeAgo}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 bg-gradient-to-r ${categoryColors[post.category]} text-sm rounded-full font-medium shadow-sm`}
          >
            {categoryLabels[post.category]}
          </span>
        </div>

        {/* Post Content */}
        <div onClick={onPostClick}>
          <h3 className="text-xl font-bold text-amber-900 mb-3 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-amber-700 mb-4 line-clamp-2">{post.content}</p>

          {/* Images Preview */}
          {post.images && post.images.length > 0 && (
            <div
              className={`grid gap-2 mb-4 ${
                post.images.length === 1
                  ? "grid-cols-1"
                  : post.images.length === 2
                    ? "grid-cols-2"
                    : post.images.length === 3
                      ? "grid-cols-3"
                      : "grid-cols-2"
              }`}
            >
              {post.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg aspect-video bg-amber-50"
                >
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {index === 3 && post.images.length > 4 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold text-xl">
                      +{post.images.length - 4}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1 bg-amber-100/60 hover:bg-amber-200/50 text-amber-700 text-sm rounded-full flex items-center gap-1 transition-colors shadow-sm"
                >
                  <Hash className="w-3 h-3" />
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-end gap-6 pt-4 border-t border-amber-200">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 text-red-600"
          >
            <ThumbsUp className="w-5 h-5" />
            <span className="font-medium">{post.likes}</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 text-blue-600"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">{post.commentsCount || 0}</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2 text-green-600"
          >
            <Eye className="w-5 h-5" />
            <span className="font-medium">{post.views}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// export default function PostCard({ post, onEdit, onDelete, onViewProfile, onViewDetail }) {
//   // Dynamic category badge colors
//   const getCategoryStyle = (category) => {
//     const styles = {
//       'Công nghệ': 'bg-blue-600 text-white',
//       'Du lịch': 'bg-green-600 text-white',
//       'Thảo luận': 'bg-purple-600 text-white',
//       'Giáo dục': 'bg-indigo-600 text-white',
//       'Di sản': 'bg-amber-600 text-white',
//       'default': 'bg-red-600 text-white'
//     }
//     return styles[category] || styles.default
//   }

//   return (
//     <article
//       className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
//       onClick={() => onViewDetail(post)}
//     >
//       <div className="flex items-start gap-4 p-4">
//         {/* Left: Avatar */}
//         <div
//           className="flex-shrink-0 cursor-pointer"
//           onClick={(e) => {
//             e.stopPropagation()
//             onViewProfile(post.author)
//           }}
//         >
//           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold text-sm shadow-md hover:scale-110 transition-transform">
//             {post.author.avatar}
//           </div>
//         </div>

//         {/* Middle: Content */}
//         <div className="flex-1 min-w-0">
//           {/* Category Badge - Dynamic */}
//           <div className="mb-2">
//             <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getCategoryStyle(post.category)}`}>
//               {post.category}
//             </span>
//           </div>

//           {/* Title */}
//           <h2 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors line-clamp-1">
//             {post.title}
//           </h2>

//           {/* Meta Info */}
//           <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
//             <span
//               className="font-medium hover:text-amber-600 transition-colors cursor-pointer"
//               onClick={(e) => {
//                 e.stopPropagation()
//                 onViewProfile(post.author)
//               }}
//             >
//               {post.author.name}
//             </span>
//             <span>•</span>
//             <span>{post.timestamp}</span>
//           </div>

//           {/* Tags */}
//           {post.tags && post.tags.length > 0 && (
//             <div className="flex items-center gap-2 text-xs">
//               <span className="text-gray-400">Tags:</span>
//               <div className="flex flex-wrap gap-1">
//                 {post.tags.slice(0, 3).map((tag, index) => (
//                   <span
//                     key={index}
//                     className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded hover:bg-amber-100 hover:text-amber-700 transition-colors"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Images Preview - Show first 2 images */}
//           {post.images && post.images.length > 0 && (
//             <div className="mt-3 flex gap-2">
//               {post.images.slice(0, 2).map((image, index) => (
//                 <div key={index} className="relative group">
//                   <img
//                     src={image}
//                     alt={`Post image ${index + 1}`}
//                     className="w-20 h-20 object-cover rounded-lg border border-gray-200 group-hover:border-amber-400 transition-all"
//                   />
//                   {index === 1 && post.images.length > 2 && (
//                     <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
//                       <span className="text-white font-bold text-sm">+{post.images.length - 2}</span>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Right: Stats & Actions */}
//         <div className="flex items-center gap-4 flex-shrink-0">
//           {/* Replies & Views Stats */}
//           <div className="text-center min-w-[80px]">
//             <div className="text-xs text-gray-500 mb-1">
//               Replies:
//             </div>
//             <div className="text-2xl font-bold text-gray-900 mb-2">
//               {post.comments?.length || 0}
//             </div>
//             <div className="text-xs text-gray-500 mb-1">
//               Likes:
//             </div>
//             <div className="text-base font-semibold text-gray-600">
//               {post.likes + post.dislikes || 0}
//             </div>
//           </div>

//           {/* Action Menu (Hidden, show on hover) */}
//           <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 ml-2">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation()
//                 onEdit(post)
//               }}
//               className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-all"
//               title="Chỉnh sửa"
//             >
//               <i className="fa-solid fa-edit text-xs" />
//             </button>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation()
//                 onDelete(post.id)
//               }}
//               className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
//               title="Xóa"
//             >
//               <i className="fa-solid fa-trash text-xs" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </article>
//   )
// }
