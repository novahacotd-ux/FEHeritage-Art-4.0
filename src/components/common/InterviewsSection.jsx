import { ChevronRight, ChevronLeft, MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExpertCarousel from "./ExpertCarousel";
import ExpertVideoModal from "./ExpertVideoModal";

export default function InterviewsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const allExperts = [
    {
      id: 1,
      name: "GS.TS Nguyễn Văn Huy",
      title: "Chuyên gia Di sản văn hóa",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      description: "Chuyên gia số hóa di sản Việt Nam và triển khai VR/AR.",
      content:
        "Trong buổi phỏng vấn này, GS.TS Nguyễn Văn Huy chia sẻ sâu về hành trình 10 năm số hóa các di vật tại Bảo tàng Dân tộc học. Ông nhấn mạnh tầm quan trọng của việc kết hợp công nghệ thực tế ảo để thu hút thế hệ trẻ tìm hiểu về cội nguồn văn hóa dân tộc.",
      videoUrl: "https://www.youtube.com/embed/_XX248bq6Pw",
    },
    {
      id: 2,
      name: "PGS.TS Trần Thị Mai",
      title: "Nhà khảo cổ học",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      description: "Chuyên gia truyền thông số & nền tảng giáo dục.",
      content:
        "PGS.TS Trần Thị Mai trình bày về các phương pháp khảo cổ hiện đại bằng máy quét laser mặt đất. Nội dung tập trung vào cách bảo tồn các hiện vật dễ bị phân hủy trong môi trường khí hậu nhiệt đới ẩm của Việt Nam.",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    },
    {
      id: 3,
      name: "TS. Lê Quang Minh",
      title: "Chuyên gia Kiến trúc cổ",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      description: "Nghệ thuật số & triển lãm VR/AR.",
      content:
        "TS. Lê Quang Minh hướng dẫn cách phục dựng lại các đình làng Bắc Bộ bằng mô hình 3D. Video bao gồm các tư liệu quý giá về các hoa văn chạm khắc đã bị bào mòn theo thời gian.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 4,
      name: "ThS. Hoàng Nam",
      title: "Nghệ nhân Diều Huế",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      description: "Gìn giữ nghệ thuật diều truyền thống.",
      content:
        "Khám phá kỹ thuật làm diều phượng hoàng - một trong những biểu tượng cao quý của vùng đất Cố đô. Nghệ nhân Hoàng Nam chia sẻ về cách chọn tre và giấy dó để diều có thể bay cao và bền bỉ.",
      videoUrl: "https://www.youtube.com/embed/fHI8X4OXluQ",
    },
    {
      id: 5,
      name: "ThS. Hoàng Nam",
      title: "Nghệ nhân Diều Huế",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      description: "Gìn giữ nghệ thuật diều truyền thống.",
      content:
        "Khám phá kỹ thuật làm diều phượng hoàng - một trong những biểu tượng cao quý của vùng đất Cố đô. Nghệ nhân Hoàng Nam chia sẻ về cách chọn tre và giấy dó để diều có thể bay cao và bền bỉ.",
      videoUrl: "https://www.youtube.com/embed/fHI8X4OXluQ",
    },
    {
      id: 6,
      name: "TS. Lê Quang Minh",
      title: "Chuyên gia Kiến trúc cổ",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      description: "Nghệ thuật số & triển lãm VR/AR.",
      content:
        "TS. Lê Quang Minh hướng dẫn cách phục dựng lại các đình làng Bắc Bộ bằng mô hình 3D. Video bao gồm các tư liệu quý giá về các hoa văn chạm khắc đã bị bào mòn theo thời gian.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  const featuredExpert = allExperts[0];

  const expertsPerPage = 4;
  const itemsPerScroll = 2;
  const displayedExperts = allExperts.slice(
    currentPage * itemsPerScroll,
    currentPage * itemsPerScroll + expertsPerPage,
  );

  const maxScrollPage = Math.ceil(allExperts.length / itemsPerScroll) - 1;

  const handleOpenModal = (expert, type) => {
    setSelectedExpert({ ...expert, type });
    setModalOpen(true);
  };

  const handleNavigate = (dir) => {
    if (dir === "left" && currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    } else if (dir === "right" && currentPage < maxScrollPage) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50/50 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-amber-100/20 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-zinc-300">
          {/* Header */}
          <div className="text-center mb-7 md:mb-9 lg:mb-11">
            <div
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-base mb-3 md:mb-4 cursor-pointer
                border-2 border-blue-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                hover:scale-105 hover:shadow-blue-200/50 hover:border-blue-300
                active:scale-95 active:shadow-inner transition-all duration-300"
            >
              <MessageCircle className="w-6 h-6" />
              <h2 className="text-base font-semibold">Chuyên gia</h2>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-700 mb-2 md:mb-3">
              Phòng Vấn Diễn Giả
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-gray-600">
              Kết nối con người – Khám phá lịch sử – Lan tỏa văn hóa Việt.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Section */}
            <div className="lg:col-span-5">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-amber-500 rounded-full inline-block"></span>
                Chuyên gia nổi bật
              </h2>
              <ExpertCarousel
                {...featuredExpert}
                featured
                onViewInterview={() =>
                  handleOpenModal(featuredExpert, "interview")
                }
              />
            </div>

            {/* Others Section */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-800">
                  Các Chuyên Gia Khác
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNavigate("left")}
                    disabled={currentPage === 0}
                    className="p-2 rounded-full bg-amber-500 text-white disabled:opacity-30 hover:bg-amber-600 transition-colors shadow-md"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => handleNavigate("right")}
                    disabled={currentPage >= maxScrollPage}
                    className="p-2 rounded-full bg-amber-500 text-white disabled:opacity-30 hover:bg-amber-600 transition-colors shadow-md"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden min-h-[800px] md:min-h-[500px] pt-3 -mt-3">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentPage}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 absolute w-full"
                  >
                    {displayedExperts.map((expert) => (
                      <ExpertCarousel
                        key={expert.id}
                        {...expert}
                        onViewVideo={() => handleOpenModal(expert, "video")}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedExpert && (
        <ExpertVideoModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          expertName={selectedExpert.name}
          expertImage={selectedExpert.image}
          videoUrl={selectedExpert.videoUrl}
          content={selectedExpert.content}
          type={selectedExpert.type}
          expertTitle={selectedExpert.title}
        />
      )}
    </div>
  );
}
