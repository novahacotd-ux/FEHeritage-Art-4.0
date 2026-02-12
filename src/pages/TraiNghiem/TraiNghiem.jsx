import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ExperienceHero from "./ExperienceHero";
import ExperienceMapSection from "./ExperienceMapSection";

const PERIODS = [
  "Lý",
  "Trần",
  "Nguyễn",
  "Hiện đại",
  "Pháp thuộc",
  "Hồ",
  "Hùng Vương",
];
const REGIONS = ["Bắc", "Trung", "Nam"];

const TraiNghiem = () => {
  const [isFilterPanelVisible, setFilterPanelVisible] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true, offset: 100 });
  }, []);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setFilterPanelVisible(false);
    };
    if (isFilterPanelVisible) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isFilterPanelVisible]);

  const handleScrollToMap = () => {
    const section = document.getElementById("experience-map-section");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <style>
        {`
          /* THUMB RANGE */
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none; width: 24px; height: 24px; background: #dc8154; border-radius: 50%; cursor: pointer; border: 4px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.2); margin-top: -9px; transition: transform 0.2s;
          }
          input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.1); }
          input[type="range"]::-moz-range-thumb { width: 24px; height: 24px; background: #dc8154; border-radius: 50%; cursor: pointer; border: 4px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.2); transition: transform 0.2s; }
          input[type="range"]::-moz-range-thumb:hover { transform: scale(1.1); }

          /* MAP */
          .map-container { transition: all 0.3s ease-in-out; }
          .map-container:hover { transform: scale(1.02); box-shadow: 0 15px 40px rgba(0,0,0,0.2); }

          /* PARALLAX */
          .parallax-bg { background-attachment: fixed; background-position: center; background-repeat: no-repeat; background-size: cover; }
          @media (max-width: 768px) { .parallax-bg { background-attachment: scroll; } }

          /* POPUP */
          .luxury-popup .leaflet-popup-content-wrapper { background: transparent !important; box-shadow: none !important; padding: 0 !important; border-radius: 16px !important; }
          .luxury-popup .leaflet-popup-tip { background: #2e1e10 !important; }

          /* PULSE (đã bỏ dùng cho marker) */
          @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(220, 129, 84, 0.5); } 70% { box-shadow: 0 0 0 10px rgba(220, 129, 84, 0); } 100% { box-shadow: 0 0 0 0 rgba(220, 129, 84, 0); } }

          /* ANIMATION */
          @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }

          @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; } 50% { transform: translateY(-30px) rotate(5deg); opacity: 0.8; } }
          .animate-float { animation: float linear infinite; }

          @keyframes pulse-slow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
          .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

          .filter-button:hover span { background: #2e1e10 !important; border-color: #2e1e10 !important; }
          .filter-button:hover svg { opacity: 1 !important; }

          .luxury-popup .leaflet-popup-content-wrapper {
            background: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
            border-radius: 24px !important;
            overflow: hidden;
          }
          .luxury-popup .leaflet-popup-tip {
            background: linear-gradient(135deg, #dc8154, #2e1e10) !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          }
          .luxury-popup .leaflet-popup-content {
            margin: 0 !important;
            width: 100% !important;
          }

          /* overlay mask khi mở sidebar */
          .sidebar-mask{
            position:absolute; inset:0; background:rgba(0,0,0,.15);
            opacity:0; pointer-events:none; transition:opacity .2s; border-radius:16px;
          }
          .sidebar-mask.open{ opacity:1; pointer-events:auto; }
        `}
      </style>

      <main className="bg-gradient-to-b from-[#fdfaf3] to-[#f5e6d3] p-4 md:p-8 overflow-hidden">
        <ExperienceHero onScrollToMap={handleScrollToMap} />

        <ExperienceMapSection
          periods={PERIODS}
          regions={REGIONS}
          isFilterPanelVisible={isFilterPanelVisible}
          setFilterPanelVisible={setFilterPanelVisible}
        />
      </main>
    </>
  );
};

export default TraiNghiem;
