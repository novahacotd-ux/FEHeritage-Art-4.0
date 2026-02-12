import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import ExperienceGallery from "./ExperienceGallery";
import { galleryData } from "../../data/historicalSitesData";
import ImageModal from "../../components/ImageModal";

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

const TrienLam = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isFilterPanelVisible, setFilterPanelVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true, offset: 100 });
  }, []);

  const [galleryFilters, setGalleryFilters] = useState({
    periods: new Set(PERIODS),
    regions: new Set(REGIONS),
    year: 2024,
  });

  const filteredGalleryItems = galleryData
    .filter((item) => {
      const matchPeriod = item.period.some((p) =>
        galleryFilters.periods.has(p),
      );
      const matchRegion = item.region.some((r) =>
        galleryFilters.regions.has(r),
      );
      const matchYear = item.year <= galleryFilters.year;
      return matchPeriod && matchRegion && matchYear;
    })
    .filter((item) => {
      if (activeTab === "all") return true;
      if (activeTab === "image") {
        return !item.type || item.type === "image";
      }
      if (activeTab === "video") {
        return item.type === "video";
      }
      if (activeTab === "bxh") {
        return !item.type || item.type === "image";
      }
      return true;
    });

  const handleFilterChange = (setter, type, value) => {
    setter((prev) => {
      const newSet = new Set(prev[type]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return { ...prev, [type]: newSet };
    });
  };

  const handleYearChange = (setter, e) => {
    setter((prev) => ({ ...prev, year: parseInt(e.target.value, 10) }));
  };

  const openModal = (index) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);

  const showNextImage = () => {
    if (selectedImageIndex === null) return;
    const nextIndex = (selectedImageIndex + 1) % filteredGalleryItems.length;
    setSelectedImageIndex(nextIndex);
  };

  const showPrevImage = () => {
    if (selectedImageIndex === null) return;
    const prevIndex =
      (selectedImageIndex - 1 + filteredGalleryItems.length) %
      filteredGalleryItems.length;
    setSelectedImageIndex(prevIndex);
  };

  return (
    <>
      <main className="bg-gradient-to-b from-[#fdfaf3] to-[#f5e6d3] p-4 md:p-8 overflow-hidden">
        <ExperienceGallery
          periods={PERIODS}
          regions={REGIONS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isFilterPanelVisible={isFilterPanelVisible}
          setFilterPanelVisible={setFilterPanelVisible}
          galleryFilters={galleryFilters}
          setGalleryFilters={setGalleryFilters}
          handleFilterChange={handleFilterChange}
          handleYearChange={handleYearChange}
          filteredGalleryItems={filteredGalleryItems}
          openModal={openModal}
        />
      </main>

      <ImageModal
        imageData={filteredGalleryItems[selectedImageIndex]}
        onClose={closeModal}
        onNext={showNextImage}
        onPrev={showPrevImage}
        currentIndex={selectedImageIndex}
        totalImages={galleryData.length}
      />
    </>
  );
};

export default TrienLam;
