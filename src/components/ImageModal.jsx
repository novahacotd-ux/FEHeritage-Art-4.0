// src/components/ImageModal.jsx

import React, { useState, useEffect } from 'react';

import DinhDocLap from "../assets/Dinh Độc Lập.png";
import diadaocuchi from "../assets/địa đạo Củ Chi.png";
import chuagiaclam from "../assets/Chùa Giác Lâm.png";
import langlevanduyet from "../assets/Lăng Lê Văn Duyệt.png";
import baotangmithuat from "../assets/Bảo tàng Mỹ thuật Thành phố Hồ Chí Minh.png";
import hoiquantuethanh from "../assets/Hội quán Tuệ Thành (Chùa Bà).png";
import toadaisuquan from "../assets/Tòa Đại sứ quán Mỹ (nay là Tổng Lãnh sự quán Hợp chủng quốc Hoa Kỳ tại TP. Hồ Chí Minh).png";
import caumong from "../assets/Cầu Mống.png";

const authorList = [
  { name: "Nguyễn Vân Anh", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Trần Minh Khôi", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Lê Ngọc Hân",     avatar: "https://randomuser.me/api/portraits/women/21.jpg" },
  { name: "Bùi Lan Hương",   avatar: "https://randomuser.me/api/portraits/women/90.jpg" },
  { name: "Sài Gòn Ký Sự",   avatar: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png" },
];

// QUAN TRỌNG: Dùng đúng index trong mảng galleryData của bạn!
const relatedImages = [
  { index: 0,  src: DinhDocLap,       caption: "Dinh Độc Lập – nơi xe tăng 843 húc đổ cổng..." },
  { index: 1,  src: diadaocuchi,      caption: "Địa đạo Củ Chi – kỳ quan lòng đất..." },
  { index: 3,  src: chuagiaclam,      caption: "Chùa Giác Lâm – chùa cổ nhất Sài Gòn" },
  { index: 7,  src: langlevanduyet,   caption: "Lăng Lê Văn Duyệt – Lăng Ông Bà Chiểu" },
  { index: 4,  src: baotangmithuat,   caption: "Bảo tàng Mỹ thuật – kiến trúc Đông Dương" },
  { index: 9,  src: hoiquantuethanh,  caption: "Chùa Bà Thiên Hậu Chợ Lớn" },
  { index: 16, src: toadaisuquan,     caption: "Nơi trực thăng Mỹ rời Sài Gòn 30/4/1975" },
  { index: 33, src: caumong,          caption: "Cầu Mống – thiết kế của Gustave Eiffel" },
];

const relatedTags = ["Sài Gòn xưa", "Di tích lịch sử", "Chùa cổ", "30/4/1975", "Kiến trúc Pháp"];

const ImageModal = ({ imageData, onClose, onNext, onPrev, onImageSelect, currentIndex, totalImages }) => {
  const [downloading, setDownloading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const author = authorList[Math.floor(Math.random() * authorList.length)];

  const handleNext = (e) => {
    e.stopPropagation();
    setIsTransitioning(true);
    setTimeout(() => { onNext(); setIsTransitioning(false); }, 200);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setIsTransitioning(true);
    setTimeout(() => { onPrev(); setIsTransitioning(false); }, 200);
  };

  // ĐÃ SỬA: Dùng đúng index thay vì id - 1
  const handleRelatedClick = (index) => {
    onImageSelect(index);        // ← Truyền đúng index
    onClose();                   // ← Đóng modal hiện tại
    window.scrollTo({ top: 0, behavior: 'smooth' }); // ← Cuộn lên đầu
  };

  const handleDownload = () => {
    setDownloading(true);
    const a = document.createElement('a');
    a.href = imageData.src;
    a.download = `${imageData.alt || 'heritage'}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setDownloading(false), 1000);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'ArrowLeft') handlePrev(e);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onNext, onPrev, onClose]);

  if (!imageData) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      {/* Nút điều hướng */}
      <button onClick={onClose} className="absolute top-4 right-4 z-50 text-white hover:scale-110 transition">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 rounded-full backdrop-blur hover:bg-white/30 transition hidden md:block">
        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/10 rounded-full backdrop-blur hover:bg-white/30 transition hidden md:block">
        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Modal chính - RỘNG + ĐẸP */}
      <div
        className="bg-amber-50 rounded-3xl shadow-2xl w-full max-w-7xl max-h-[94vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 flex items-center justify-between border-b border-amber-200">
          <div className="flex items-center gap-4">
            <img src={author.avatar} alt="" className="w-14 h-14 rounded-full ring-4 ring-amber-200 shadow-md" />
            <div>
              <p className="font-bold text-amber-900 text-xl">{author.name}</p>
              <p className="text-amber-700">Đồng hành cùng dòng chảy lịch sử</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-amber-200 text-amber-900 rounded-xl font-semibold hover:bg-amber-300 transition shadow">
              Like
            </button>
            <button className="px-6 py-3 bg-amber-200 text-amber-900 rounded-xl font-semibold hover:bg-amber-300 transition shadow">
              Dislike
            </button>
            <button
              onClick={handleDownload}
              className="px-7 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center gap-2"
            >
              {downloading ? "Đang tải..." : "Tải xuống"}
            </button>
          </div>
        </div>

        {/* Nội dung */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            <img
              src={imageData.src}
              alt={imageData.alt}
              className="w-full max-h-[65vh] object-contain rounded-2xl shadow-2xl mx-auto"
            />
          </div>

          <p className="text-center text-amber-900 font-medium text-xl leading-relaxed mt-8 mb-12">
            {imageData.caption}
          </p>

          <div>
            <h3 className="text-3xl font-bold text-amber-900 text-center mb-8">Khám phá thêm</h3>
            
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {relatedTags.map(tag => (
                <span key={tag} className="px-5 py-2.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedImages.map(item => (
                <div
                  key={item.index}
                  onClick={() => handleRelatedClick(item.index)}
                  className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                  <img src={item.src} alt="" className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-medium text-sm line-clamp-2">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center py-4 bg-amber-100 text-amber-800 font-semibold border-t border-amber-200">
          {currentIndex + 1} / {totalImages}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;