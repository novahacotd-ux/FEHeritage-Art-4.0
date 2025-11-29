export default function UserProfileModal({ user, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-500 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 p-8 text-white">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:rotate-90"
          >
            <i className="fa-solid fa-times text-xl" />
          </button>

          {/* Profile Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-4xl shadow-2xl mb-4 ring-4 ring-white/30">
              {user.avatar}
            </div>
            <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
            <p className="text-purple-100 flex items-center gap-2">
              <i className="fa-solid fa-briefcase text-sm" />
              {user.role}
            </p>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 p-6 bg-gradient-to-br from-purple-50 to-white">
          <div className="bg-white rounded-xl p-4 text-center shadow-md border border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-1">{user.posts}</div>
            <div className="text-sm text-gray-600 font-medium">Bài viết</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-md border border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              <i className="fa-solid fa-clock text-2xl" />
            </div>
            <div className="text-sm text-gray-600 font-medium">{user.joined}</div>
          </div>
        </div>

        {/* Bio */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <i className="fa-solid fa-user text-purple-600" />
            Giới thiệu
          </h3>
          <p className="text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-200">
            {user.bio}
          </p>
        </div>

        {/* Badges */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <i className="fa-solid fa-award text-purple-600" />
            Thành tích
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full text-xs font-bold shadow-md flex items-center gap-1">
              <i className="fa-solid fa-star" />
              Thành viên tích cực
            </span>
            <span className="px-3 py-1.5 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full text-xs font-bold shadow-md flex items-center gap-1">
              <i className="fa-solid fa-fire" />
              Người đóng góp
            </span>
            <span className="px-3 py-1.5 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full text-xs font-bold shadow-md flex items-center gap-1">
              <i className="fa-solid fa-heart" />
              Người hỗ trợ
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <i className="fa-solid fa-envelope" />
            Gửi tin nhắn
          </button>
        </div>
      </div>
    </div>
  )
}
