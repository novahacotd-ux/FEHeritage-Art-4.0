import React from "react";
import halongImg from "../../assets/halong.jpg";

const ExperienceHero = ({ onScrollToMap }) => {
  return (
    <header
      className="parallax-bg relative -mx-4 md:-mx-8 -mt-4 md:-mt-8 mb-12 overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url(${halongImg})`,
        backgroundBlendMode: "multiply",
      }}
      data-aos="fade-down"
      data-aos-duration="1200"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-amber-700/10"></div>
        <div className="absolute inset-0 opacity-30">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-amber-100 tracking-tight drop-shadow-2xl mb-4 leading-tight">
          <span className="inline-block" style={{ animationDelay: "0.2s" }}>
            Việt Nam
          </span>{" "}
          <span
            className="inline-block text-amber-400"
            style={{ animationDelay: "0.4s" }}
          >
            Sử Ký
          </span>
        </h1>
        <p
          className="text-xl md:text-2xl text-amber-200 font-medium max-w-5xl mx-auto leading-relaxed"
          style={{ animationDelay: "0.7s" }}
        >
          Chạm vào từng địa danh – nghe tiếng vọng của ngàn năm dựng nước và giữ
          nước.
        </p>
        <div className="mt-8" style={{ animationDelay: "1s" }}>
          <button
            onClick={onScrollToMap}
            className="group inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <span>Khám Phá Ngay</span>
            <svg
              className="w-6 h-6 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ExperienceHero;
