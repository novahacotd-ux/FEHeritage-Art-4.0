import React, { useState, useEffect } from "react";

const EventImageSlider = ({ images, interval = 5000, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, interval);
    return () => clearInterval(timer);
  }, [currentIndex, images.length, interval]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0)
    return <div className="w-full h-full bg-gray-100" />;

  return (
    <div
      className="relative w-full h-full group bg-white overflow-hidden cursor-zoom-in"
      onClick={() => onImageClick && onImageClick(images, currentIndex)}
    >
      {/* Hình ảnh */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-full object-cover transition-opacity duration-500"
      />

      {/* Nút điều khiển */}
      {images.length > 1 && (
        <>
          {/* Nút bên trái */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white w-8 h-8 flex items-center justify-center rounded-full transition-all"
          >
            <span className="border-l-2 border-b-2 border-white rotate-45 w-2 h-2 ml-1"></span>
          </button>

          {/* Nút bên phải */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white w-8 h-8 flex items-center justify-center rounded-full transition-all"
          >
            <span className="border-r-2 border-t-2 border-white rotate-45 w-2 h-2 mr-1"></span>
          </button>

          {/* Chỉ số hình với nền hơi tối để nổi bật chữ trắng */}
          <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-light z-10 border border-white/10">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default EventImageSlider;
