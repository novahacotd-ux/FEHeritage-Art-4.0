import { useEffect } from 'react'

export default function ExpertVideoModal({ expert, onClose }) {
  useEffect(() => {
    if (expert) {
      const handleEsc = (e) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }
  }, [expert, onClose])

  if (!expert) return null

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-br from-[#1b1512] to-[#2b2018] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90 group"
          aria-label="Close modal"
        >
          <i className="fa-solid fa-times text-xl group-hover:text-amber-400 transition-colors" />
        </button>

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-amber-500 rounded-tl-2xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-amber-500 rounded-br-2xl opacity-50" />

        <div className="p-6 md:p-8">
          {/* Modal Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-1 flex items-center gap-2">
                <i className={`fa-solid ${expert.icon} text-amber-500`} />
                Phỏng vấn {expert.name}
              </h2>
              <p className="text-amber-200/80 font-medium">{expert.title}</p>
            </div>
          </div>

          {/* Video */}
          <div className="relative rounded-xl overflow-hidden mb-6 bg-black shadow-2xl group">
            {/* YouTube Embed */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src={expert.videoUrl}
                title={`Phỏng vấn ${expert.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            
            {/* Video overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-5 border border-amber-500/20 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-amber-400 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-quote-left" />
                Nội dung phỏng vấn
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {expert.description}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl p-4 border border-amber-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <i className="fa-solid fa-user-graduate text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Chuyên gia</p>
                    <p className="text-white font-semibold">{expert.name}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-4 border border-blue-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <i className="fa-solid fa-briefcase text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Lĩnh vực</p>
                    <p className="text-white font-semibold">{expert.title}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <span className="text-sm text-gray-400">Chia sẻ:</span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white w-9 h-9 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
                <i className="fa-brands fa-facebook-f" />
              </button>
              <button className="bg-sky-500 hover:bg-sky-600 text-white w-9 h-9 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
                <i className="fa-brands fa-twitter" />
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white w-9 h-9 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
                <i className="fa-brands fa-youtube" />
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white w-9 h-9 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
                <i className="fa-solid fa-link" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
