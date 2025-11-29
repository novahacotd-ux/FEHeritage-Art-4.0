import { useRef } from 'react'

export default function AnalysisCard({ item, isVisible, onOpenModal }) {
  const cardRef = useRef(null)

  const handle3DHover = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const dx = (x - cx) / cx
    const dy = (y - cy) / cy
    const tiltX = dy * 10
    const tiltY = dx * -10

    const inner = cardRef.current.querySelector('.card-inner')
    if (inner) {
      inner.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`
    }
  }

  const handle3DLeave = () => {
    if (!cardRef.current) return
    const inner = cardRef.current.querySelector('.card-inner')
    if (inner) {
      inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
    }
  }

  return (
    <div
      ref={cardRef}
      className={`inline-block w-full mb-7 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'
      }`}
      onMouseMove={handle3DHover}
      onMouseLeave={handle3DLeave}
    >
      <div className="card-inner bg-gradient-to-br from-white via-amber-50/50 to-white rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-amber-200/50 relative group border border-amber-100 h-full flex flex-col">
        {/* Tooltip */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 z-10 shadow-lg">
          {item.tooltip}
        </div>

        {/* Shine effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-[1]" />

        {/* Image Section */}
        {item.image && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Category badge on image */}
            <div className="absolute top-3 left-3 bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg">
              {item.category}
            </div>
          </div>
        )}

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-amber-700 font-semibold text-lg mb-2 flex items-center gap-2 group-hover:text-amber-800 transition-colors duration-300">
            <i className={`fa-solid ${item.icon} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}></i>
            <span className="group-hover:translate-x-1 transition-transform duration-300">{item.title}</span>
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{item.description}</p>
          <button
            onClick={() => onOpenModal(item)}
            className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:scale-105 hover:shadow-lg hover:shadow-amber-300/50 overflow-hidden group/btn w-full"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Đọc thêm
              <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover/btn:translate-x-1"></i>
            </span>
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>
    </div>
  )
}
