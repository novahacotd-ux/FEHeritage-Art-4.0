import React from "react";
import { BookOpenText, ExternalLink, X } from "lucide-react";
import { createPortal } from "react-dom";

const AnalysisModal = ({ article, categories, onClose }) => {
  if (!article) return null;

  return createPortal(
    <div
      className="fixed inset-0 h-screen w-screen bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-white via-amber-50/60 to-orange-50/60 rounded-2xl sm:rounded-3xl w-full max-w-[95vw] sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-amber-200 animate-in zoom-in duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 w-full">
          <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-56 sm:h-68 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-500 text-zinc-50 rounded-full shadow-lg text-xs sm:text-sm">
                {categories.find((c) => c.id === article.category)?.name}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <h2 className="flex gap-3 items-center text-white text-xl sm:text-3xl font-bold leading-tight">
                <span>
                  <BookOpenText className="text-white size-10" />
                </span>
                {article.title}
              </h2>
            </div>
          </div>
          {/* Exit button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 
             bg-white/90 backdrop-blur-sm rounded-full p-2.5 
             text-gray-700 shadow-lg border border-white/20
             transition-all duration-200 select-none
             hover:bg-white hover:scale-110 hover:rotate-90 hover:text-orange-600
             active:scale-90 active:bg-orange-100 active:shadow-inner"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        {/* Content */}
        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 pb-6 border-b-2 border-amber-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="text-[10px] sm:text-sm text-gray-600">Tác giả</p>
                <p className="text-sm sm:text-base text-gray-800 font-medium">
                  {article.author}
                </p>
              </div>
            </div>
            <div className="hidden sm:block h-10 w-px bg-amber-200"></div>
            <div>
              <p className="text-[10px] sm:text-sm text-gray-600">Ngày đăng</p>
              <p className="text-sm sm:text-base text-gray-800 font-medium">
                {article.date}
              </p>
            </div>
          </div>
          <div className="prose prose-amber max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {article.content}
            </p>
            {article.link && (
              <div className="pt-4 flex justify-end">
                <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
                  <span>Xem thêm:</span>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 font-semibold hover:text-orange-700 hover:underline inline-flex items-center gap-1 transition-colors"
                  >
                    {article.linkText || "Tại đây"}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </p>
              </div>
            )}
          </div>
          {/* Decorative Footer */}
          <div className="mt-8 pt-6 border-t-2 border-amber-100">
            <div className="flex items-center justify-center gap-2">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent to-amber-500 rounded-full"></div>
              <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
              <div className="h-1 w-32 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
              <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              <div className="h-1 w-20 bg-gradient-to-l from-transparent to-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AnalysisModal;

// export default function AnalysisModal({ data, onClose }) {
//   if (!data) return null

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-5 animate-in fade-in duration-300"
//       onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
//     >
//       <div className="bg-gradient-to-br from-white via-amber-50/30 to-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl border-2 border-amber-300 animate-in zoom-in slide-in-from-bottom duration-500">
//         {/* Close button with animation */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-5 text-3xl text-gray-600 hover:text-amber-700 transition-all duration-300 hover:rotate-90 hover:scale-110 z-10"
//           aria-label="Đóng"
//         >
//           <i className="fa-solid fa-xmark"></i>
//         </button>

//         {/* Image with fade in */}
//         <div className="relative overflow-hidden rounded-xl mb-5 border-2 border-amber-300 shadow-lg group">
//           <img
//             src={data.image}
//             alt={data.title}
//             className="w-full transition-transform duration-500 group-hover:scale-105"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//         </div>

//         <h2 className="text-amber-700 text-2xl font-bold mb-4 flex items-center gap-3 animate-in slide-in-from-left duration-500">
//           <i className={`fa-solid ${data.icon} text-amber-600`}></i>
//           {data.title}
//         </h2>

//         <p className="text-gray-700 leading-relaxed mb-4 animate-in fade-in slide-in-from-bottom duration-500 delay-100">
//           {data.fullContent}
//         </p>

//         {data.link && (
//           <p className="text-gray-600 animate-in fade-in slide-in-from-bottom duration-500 delay-200">
//             Xem thêm{' '}
//             <a
//               href={data.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-amber-600 underline hover:text-amber-700 font-medium inline-flex items-center gap-1 group transition-all duration-300"
//             >
//               {data.linkText}
//               <i className="fa-solid fa-arrow-up-right-from-square text-xs group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></i>
//             </a>
//             .
//           </p>
//         )}

//         {/* Decorative corner elements */}
//         <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-amber-400 rounded-tl-2xl opacity-30" />
//         <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-amber-400 rounded-br-2xl opacity-30" />
//       </div>
//     </div>
//   )
// }
