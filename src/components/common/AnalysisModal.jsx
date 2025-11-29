export default function AnalysisModal({ data, onClose }) {
  if (!data) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-5 animate-in fade-in duration-300"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-gradient-to-br from-white via-amber-50/30 to-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl border-2 border-amber-300 animate-in zoom-in slide-in-from-bottom duration-500">
        {/* Close button with animation */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-3xl text-gray-600 hover:text-amber-700 transition-all duration-300 hover:rotate-90 hover:scale-110 z-10"
          aria-label="Đóng"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Image with fade in */}
        <div className="relative overflow-hidden rounded-xl mb-5 border-2 border-amber-300 shadow-lg group">
          <img 
            src={data.image} 
            alt={data.title}
            className="w-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <h2 className="text-amber-700 text-2xl font-bold mb-4 flex items-center gap-3 animate-in slide-in-from-left duration-500">
          <i className={`fa-solid ${data.icon} text-amber-600`}></i>
          {data.title}
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-4 animate-in fade-in slide-in-from-bottom duration-500 delay-100">
          {data.fullContent}
        </p>

        {data.link && (
          <p className="text-gray-600 animate-in fade-in slide-in-from-bottom duration-500 delay-200">
            Xem thêm{' '}
            <a 
              href={data.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-600 underline hover:text-amber-700 font-medium inline-flex items-center gap-1 group transition-all duration-300"
            >
              {data.linkText}
              <i className="fa-solid fa-arrow-up-right-from-square text-xs group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></i>
            </a>
            .
          </p>
        )}

        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-amber-400 rounded-tl-2xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-amber-400 rounded-br-2xl opacity-30" />
      </div>
    </div>
  )
}
