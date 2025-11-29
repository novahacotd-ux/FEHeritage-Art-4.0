export default function PostCard({ post, onEdit, onDelete, onViewProfile, onViewDetail }) {
  // Dynamic category badge colors
  const getCategoryStyle = (category) => {
    const styles = {
      'Công nghệ': 'bg-blue-600 text-white',
      'Du lịch': 'bg-green-600 text-white',
      'Thảo luận': 'bg-purple-600 text-white',
      'Giáo dục': 'bg-indigo-600 text-white',
      'Di sản': 'bg-amber-600 text-white',
      'default': 'bg-red-600 text-white'
    }
    return styles[category] || styles.default
  }

  return (
    <article 
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
      onClick={() => onViewDetail(post)}
    >
      <div className="flex items-start gap-4 p-4">
        {/* Left: Avatar */}
        <div 
          className="flex-shrink-0 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            onViewProfile(post.author)
          }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-bold text-sm shadow-md hover:scale-110 transition-transform">
            {post.author.avatar}
          </div>
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0">
          {/* Category Badge - Dynamic */}
          <div className="mb-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getCategoryStyle(post.category)}`}>
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors line-clamp-1">
            {post.title}
          </h2>

          {/* Meta Info */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span 
              className="font-medium hover:text-amber-600 transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onViewProfile(post.author)
              }}
            >
              {post.author.name}
            </span>
            <span>•</span>
            <span>{post.timestamp}</span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">Tags:</span>
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded hover:bg-amber-100 hover:text-amber-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Images Preview - Show first 2 images */}
          {post.images && post.images.length > 0 && (
            <div className="mt-3 flex gap-2">
              {post.images.slice(0, 2).map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 group-hover:border-amber-400 transition-all"
                  />
                  {index === 1 && post.images.length > 2 && (
                    <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">+{post.images.length - 2}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Stats & Actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Replies & Views Stats */}
          <div className="text-center min-w-[80px]">
            <div className="text-xs text-gray-500 mb-1">
              Replies:
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {post.comments?.length || 0}
            </div>
            <div className="text-xs text-gray-500 mb-1">
              Likes:
            </div>
            <div className="text-base font-semibold text-gray-600">
              {post.likes + post.dislikes || 0}
            </div>
          </div>

          {/* Action Menu (Hidden, show on hover) */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 ml-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(post)
              }}
              className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-all"
              title="Chỉnh sửa"
            >
              <i className="fa-solid fa-edit text-xs" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(post.id)
              }}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
              title="Xóa"
            >
              <i className="fa-solid fa-trash text-xs" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
