import { useState } from 'react'

export default function PostDetailModal({ post, onClose, onLike, onDislike, onAddComment, onViewProfile }) {
  const [comment, setComment] = useState('')
  const [selectedImage, setSelectedImage] = useState(null) // State cho ảnh được chọn

  const handleSubmit = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      onAddComment(post.id, comment)
      setComment('')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <i className="fa-solid fa-newspaper" />
              Chi tiết bài viết
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:rotate-90"
            >
              <i className="fa-solid fa-times text-xl" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Post Header */}
          <div className="p-6 border-b border-gray-200">
            <div 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity mb-4"
              onClick={() => onViewProfile(post.author)}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {post.author.avatar}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 hover:text-amber-600 transition-colors text-lg">
                  {post.author.name}
                </h3>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span>{post.author.role}</span>
                  <span>•</span>
                  <span>{post.timestamp}</span>
                </p>
              </div>
            </div>

            {/* Category Badge */}
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              <i className="fa-solid fa-tag" />
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Content */}
            <p className="text-gray-700 leading-relaxed text-lg mb-4 whitespace-pre-wrap">
              {post.content}
            </p>

            {/* Images Gallery */}
            {post.images && post.images.length > 0 && (
              <div className="mb-4">
                <div className={`grid gap-3 ${
                  post.images.length === 1 ? 'grid-cols-1' : 
                  post.images.length === 2 ? 'grid-cols-2' : 
                  'grid-cols-2 md:grid-cols-3'
                }`}>
                  {post.images.map((image, index) => (
                    <div 
                      key={index} 
                      className="relative group overflow-hidden rounded-lg border-2 border-gray-200 hover:border-amber-400 transition-all cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`Post image ${index + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                        <i className="fa-solid fa-search-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-indigo-100 hover:text-indigo-700 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactions Bar */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-4 flex-wrap">
            <button
              onClick={() => onLike(post.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 text-gray-600 hover:text-green-600 transition-all duration-300 hover:scale-105 group"
            >
              <i className="fa-solid fa-thumbs-up group-hover:animate-bounce" />
              <span className="font-semibold">{post.likes}</span>
            </button>

            <button
              onClick={() => onDislike(post.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all duration-300 hover:scale-105 group"
            >
              <i className="fa-solid fa-thumbs-down group-hover:animate-bounce" />
              <span className="font-semibold">{post.dislikes}</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 group">
              <i className="fa-solid fa-share group-hover:animate-bounce" />
              <span className="font-semibold">Chia sẻ</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-comments text-indigo-600" />
              Bình luận ({post.comments.length})
            </h3>

            {/* Comments List */}
            {post.comments.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <i className="fa-solid fa-comment-slash text-5xl text-gray-300 mb-3" />
                <p className="text-gray-500">Chưa có bình luận nào</p>
                <p className="text-sm text-gray-400 mt-1">Hãy là người đầu tiên bình luận!</p>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                {post.comments.map(comment => (
                  <div key={comment.id} className="flex gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {comment.author.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 group-hover:bg-gray-200 rounded-2xl rounded-tl-none p-4 transition-colors duration-300">
                        <p className="font-semibold text-gray-800 mb-1">{comment.author}</p>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-2 ml-2">
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        <button className="text-xs text-gray-500 hover:text-indigo-600 font-medium transition-colors">
                          <i className="fa-solid fa-thumbs-up mr-1" />
                          Thích
                        </button>
                        <button className="text-xs text-gray-500 hover:text-indigo-600 font-medium transition-colors">
                          <i className="fa-solid fa-reply mr-1" />
                          Trả lời
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Input */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  ND
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Viết bình luận của bạn..."
                  rows="3"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none transition-all text-gray-800 resize-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!comment.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:scale-100"
                >
                  <i className="fa-solid fa-paper-plane mr-2" />
                  Gửi bình luận
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:rotate-90 z-10"
          >
            <i className="fa-solid fa-times text-2xl" />
          </button>
          
          <div 
            className="relative max-w-6xl max-h-[90vh] animate-in zoom-in slide-in-from-bottom-4 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-3">
              <button
                onClick={() => setSelectedImage(null)}
                className="text-white hover:text-amber-400 transition-colors px-3 py-1"
                title="Đóng (ESC)"
              >
                <i className="fa-solid fa-times mr-2" />
                Đóng
              </button>
              <span className="text-white/40">|</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const link = document.createElement('a')
                  link.href = selectedImage
                  link.download = 'image.jpg'
                  link.click()
                }}
                className="text-white hover:text-amber-400 transition-colors px-3 py-1"
                title="Tải xuống"
              >
                <i className="fa-solid fa-download mr-2" />
                Tải xuống
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
