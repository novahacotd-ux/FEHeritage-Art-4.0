export default function TabFilter({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-3 md:gap-5 justify-center flex-wrap px-4 max-w-4xl mx-auto">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{ animationDelay: `${index * 100}ms` }}
          className={`px-5 md:px-6 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 animate-in fade-in zoom-in text-sm md:text-base ${
            activeTab === tab
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-xl shadow-amber-300/50 scale-105 ring-2 ring-amber-400 ring-offset-2'
              : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-white hover:scale-105 hover:shadow-lg border-2 border-amber-200 hover:border-transparent'
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            {tab}
            {activeTab === tab && (
              <i className="fa-solid fa-check text-xs animate-in zoom-in duration-300"></i>
            )}
          </span>
        </button>
      ))}
    </div>
  )
}
