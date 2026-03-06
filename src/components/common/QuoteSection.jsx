export default function QuoteSection({ quote }) {
  return (
    <div className="max-w-4xl mx-auto text-center my-20 px-5 relative group">
      <div className="text-6xl text-amber-500 absolute -left-5 -top-8 font-serif animate-pulse" aria-hidden="true">"</div>
      <div className="text-6xl text-amber-500 absolute -right-5 -bottom-8 font-serif animate-pulse opacity-50 rotate-180" aria-hidden="true">"</div>
      
      {/* Decorative elements */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
      
      <p className="text-xl md:text-2xl italic text-amber-700 font-medium transition-all duration-500 hover:text-amber-800 hover:scale-105 relative z-10 py-8">
        <span className="relative inline-block">
          {quote}
          {/* Shine effect on hover */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </span>
      </p>
    </div>
  )
}
