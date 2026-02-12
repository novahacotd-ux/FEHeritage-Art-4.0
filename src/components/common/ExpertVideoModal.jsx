import {
  X,
  Facebook,
  Instagram,
  Send,
  User,
  Landmark,
  Brush,
  Palmtree,
} from "lucide-react";
import { createPortal } from "react-dom";

export default function ExpertVideoModal({
  isOpen,
  onClose,
  expertName,
  expertImage,
  videoUrl,
  content,
  type,
  expertTitle,
}) {
  if (!isOpen) return null;

  //Icon for title
  const getFieldIcon = (title) => {
    const t = title?.toLowerCase() || "";
    if (t.includes("khảo cổ"))
      return <Landmark className="w-5 h-5 text-purple-600" />;
    if (t.includes("kiến trúc") || t.includes("di sản"))
      return <Landmark className="w-5 h-5 text-purple-600" />;
    if (t.includes("nghệ nhân"))
      return <Brush className="w-5 h-5 text-purple-600" />;
    return <Palmtree className="w-5 h-5 text-purple-600" />;
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Xem video của chuyên gia ${expertName}: `;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    instagram: `https://www.instagram.com/`,
  };

  const getInitials = (name) => {
    return name ? name.split(" ").pop().charAt(0).toUpperCase() : "M";
  };

  return createPortal(
    <div
      className="fixed inset-0 w-screen h-screen z-[10000] flex items-center justify-center bg-black p-3 md:p-4 animate-in fade-in duration-300"
      // onClick={onClose}
    >
      <div
        className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300 relative"
        style={{ backgroundColor: "#4a311a" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-2 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-amber-400">
              <img
                src={expertImage}
                alt={expertName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-xs md:text-sm">
                {type === "interview" ? "🎙️ Phỏng vấn:" : "🎬 Video:"}{" "}
                {expertName}
              </h3>
              <p className="text-amber-300/80 text-[10px]">
                Cập nhật: 24/01/2026
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          {videoUrl ? (
            <iframe
              className="w-full h-full"
              src={`${videoUrl.replace("watch?v=", "embed/")}?autoplay=1`}
              title={expertName}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/50 text-xs">
              Đang tải video...
            </div>
          )}
        </div>

        {/* Info Tags Section */}
        <div className="py-3 px-4">
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            {/* Tag Chuyên Gia */}
            <div className="flex-1 flex items-center gap-3 bg-indigo-100 rounded-2xl p-2 pr-4 min-w-0">
              <div className="w-10 h-10 flex-shrink-0 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-inner">
                {getInitials(expertName)}
              </div>
              <div className="overflow-hidden">
                <p className="text-gray-500 text-[10px] leading-tight">
                  Chuyên gia
                </p>
                <p className="text-gray-900 font-bold text-[11px] truncate">
                  {expertName}
                </p>
              </div>
            </div>

            {/* Tag Lĩnh Vực */}
            <div className="flex-1 flex items-center gap-3 bg-amber-50 rounded-2xl p-2 pr-4 min-w-0">
              <div className="w-10 h-10 flex-shrink-0 bg-indigo-200 rounded-full flex items-center justify-center shadow-inner">
                {getFieldIcon(expertTitle)}
              </div>
              <div className="overflow-hidden">
                <p className="text-gray-500 text-[10px] leading-tight">
                  Lĩnh vực
                </p>
                <p className="text-gray-900 font-bold text-[11px] truncate">
                  {expertTitle}
                </p>
              </div>
            </div>
          </div>

          <h4 className="text-amber-400 font-bold mb-1 text-[10px] md:text-xs uppercase tracking-tight">
            Nội dung tóm tắt:
          </h4>
          <div className="max-h-[60px] overflow-y-auto pr-1 custom-scrollbar">
            <p className="text-stone-200 text-[10px] md:text-xs leading-relaxed">
              {content || "Chưa có nội dung tóm tắt cho chuyên gia này."}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-2 md:p-3 bg-black/20 flex items-center justify-between">
          <span className="text-stone-400 text-[12px]">Chia sẻ:</span>
          <div className="flex gap-3">
            {/* Facebook */}
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Facebook className="w-4 h-4 text-blue-400 cursor-pointer" />
            </a>

            {/* Instagram */}
            <a
              href={shareLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Instagram className="w-4 h-4 text-pink-400 cursor-pointer" />
            </a>

            {/* Telegram (Send Icon) */}
            <a
              href={shareLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Send className="w-4 h-4 text-sky-400 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// import { useEffect } from 'react'

// export default function ExpertVideoModal({ expert, onClose }) {
//   useEffect(() => {
//     if (expert) {
//       const handleEsc = (e) => {
//         if (e.key === 'Escape') onClose()
//       }
//       document.addEventListener('keydown', handleEsc)
//       return () => document.removeEventListener('keydown', handleEsc)
//     }
//   }, [expert, onClose])

//   if (!expert) return null

//   return (
//     <div
//       className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
//       onClick={onClose}
//     >
//       <div
//         className="relative bg-gradient-to-br from-[#1b1512] to-[#2b2018] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-500"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90 group"
//           aria-label="Close modal"
//         >
//           <i className="fa-solid fa-times text-xl group-hover:text-amber-400 transition-colors" />
//         </button>

//         {/* Decorative corner elements */}
//         <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-amber-500 rounded-tl-2xl opacity-50" />
//         <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-amber-500 rounded-br-2xl opacity-50" />

//         <div className="p-6 md:p-8">
//           {/* Modal Header */}
//           <div className="flex items-start gap-4 mb-6">
//             <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500">
//               <img
//                 src={expert.image}
//                 alt={expert.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="flex-1">
//               <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-1 flex items-center gap-2">
//                 <i className={`fa-solid ${expert.icon} text-amber-500`} />
//                 Phỏng vấn {expert.name}
//               </h2>
//               <p className="text-amber-200/80 font-medium">{expert.title}</p>
//             </div>
//           </div>

//           {/* Video */}
//           <div className="relative rounded-xl overflow-hidden mb-6 bg-black shadow-2xl group">
//             {/* YouTube Embed */}
//             <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
//               <iframe
//                 className="absolute top-0 left-0 w-full h-full rounded-xl"
//                 src={expert.videoUrl}
//                 title={`Phỏng vấn ${expert.name}`}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 allowFullScreen
//               />
//             </div>

//             {/* Video overlay gradient */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           </div>

//           {/* Content */}
//           <div className="space-y-4">
//             <div className="bg-white/5 rounded-xl p-5 border border-amber-500/20 backdrop-blur-sm">
//               <h3 className="text-lg font-semibold text-amber-400 mb-2 flex items-center gap-2">
//                 <i className="fa-solid fa-quote-left" />
//                 Nội dung phỏng vấn
//               </h3>
//               <p className="text-gray-300 leading-relaxed">
//                 {expert.description}
//               </p>
//             </div>

//             {/* Additional Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 rounded-xl p-4 border border-amber-500/20">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
//                     <i className="fa-solid fa-user-graduate text-amber-400" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-400 uppercase tracking-wider">Chuyên gia</p>
//                     <p className="text-white font-semibold">{expert.name}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-4 border border-blue-500/20">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
//                     <i className="fa-solid fa-briefcase text-blue-400" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-400 uppercase tracking-wider">Lĩnh vực</p>
//                     <p className="text-white font-semibold">{expert.title}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Share buttons */}
//             <div className="flex items-center justify-center gap-3 pt-4">
//               <span className="text-sm text-gray-400">Chia sẻ:</span>
//               <button className="bg-blue-600 hover:bg-blue-700 text-white w-9 h-9 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
//                 <i className="fa-brands fa-facebook-f" />
//               </button>
//               <button className="bg-sky-500 hover:bg-sky-600 text-white w-9 h-9 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
//                 <i className="fa-brands fa-twitter" />
//               </button>
//               <button className="bg-red-600 hover:bg-red-700 text-white w-9 h-9 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
//                 <i className="fa-brands fa-youtube" />
//               </button>
//               <button className="bg-gray-700 hover:bg-gray-600 text-white w-9 h-9 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
//                 <i className="fa-solid fa-link" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
