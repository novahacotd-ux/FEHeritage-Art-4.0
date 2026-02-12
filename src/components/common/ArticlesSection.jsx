import { useState } from "react";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import AnalysisCard from "./AnalysisCard";
import AnalysisModal from "./AnalysisModal";

import aiHeritageImg from "../../assets/nhathoducbaai.png";
import genZImg from "../../assets/hue.jpg";
import vrMuseumImg from "../../assets/nhathoducba.jpg";
import globalImg from "../../assets/diadao.png";

const categories = [
  { id: "all", name: "Tất cả" },
  { id: "technology", name: "Công nghệ" },
  { id: "heritage", name: "Di sản" },
  { id: "society", name: "Xã hội" },
  { id: "history", name: "Lịch sử" },
  { id: "lifestyle", name: "Đời sống" },
  { id: "culture", name: "Văn hóa" },
];

const articles = [
  {
    id: 1,
    title: "AI tái hiện di sản",
    category: "technology",
    description:
      "Khám phá cách AI đang cách mạng hóa môi trường làm việc hiện đại.",
    image: aiHeritageImg,
    date: "21/01/2026",
    author: "Nguyễn Văn A",
    content:
      "Công nghệ AI đang thay đổi cách chúng ta bảo tồn và tái hiện di sản văn hóa. Với khả năng phân tích, phục hồi và tái tạo hình ảnh, AI giúp các di sản bị hư hại có thể được khôi phục lại vẻ đẹp ban đầu.",
    link: "https://www.bbc.com/news/technology-66713465",
    linkText: "BBC",
  },
  {
    id: 2,
    title: "Lan tỏa di sản",
    category: "heritage",
    description: "Di sản Việt Nam vươn tầm thế giới.",
    image: globalImg,
    date: "20/01/2026",
    author: "Trần Thị B",
    content:
      "Số hóa di sản không chỉ bảo tồn mà còn nâng cao tính phổ quát, giúp di sản Việt Nam vươn tầm thế giới và được nhiều người biết đến hơn.",
    link: "https://www.unesco.org/en/articles/digital-heritage",
    linkText: "UNESCO",
  },
  {
    id: 3,
    title: "Gen Z & lịch sử",
    category: "society",
    description: "Tiếp cận lịch sử qua nền tảng số.",
    image: genZImg,
    date: "19/01/2026",
    author: "Lê Văn C",
    content:
      "Thế hệ Gen Z đang tiếp cận lịch sử theo cách hoàn toàn mới thông qua các nền tảng số, mạng xã hội và công nghệ tương tác. Họ không chỉ học mà còn tham gia tái tạo và chia sẻ tri thức lịch sử.",
    link: "https://www.theguardian.com/world/2023/jun/25/gen-z-history",
    linkText: "The Guardian",
  },
  {
    id: 4,
    title: "Dấu ấn triều Nguyễn",
    category: "history",
    description: "Khám phá di sản kiến trúc cuối cùng.",
    image: genZImg,
    date: "18/01/2026",
    author: "Phạm Thị D",
    content:
      "Triều Nguyễn (1802-1945) để lại một di sản kiến trúc độc đáo với Kinh thành Huế, các lăng tẩm hoàng gia và hệ thống đền đài. Những công trình này không chỉ phản ánh tài năng nghệ thuật mà còn thể hiện triết lý sống hài hòa với thiên nhiên của người Việt. Ngày nay, công nghệ số hóa đang giúp bảo tồn và tái hiện những giá trị lịch sử quý báu này.",
    link: "https://whc.unesco.org/en/list/678",
    linkText: "UNESCO World Heritage",
  },
  {
    id: 5,
    title: "Lễ hội truyền thống",
    category: "lifestyle",
    description: "Nét đẹp văn hóa trong cuộc sống.",
    image: vrMuseumImg,
    date: "17/01/2026",
    author: "Hoàng Văn E",
    content:
      "Lễ hội truyền thống Việt Nam như Tết Nguyên Đán, Tết Trung Thu, lễ hội Đền Hùng không chỉ là dịp vui chơi mà còn là cầu nối giữa quá khứ và hiện tại. Trong thời đại hiện đại, các lễ hội này vẫn giữ được giá trị văn hóa đặc sắc, đồng thời kết hợp với công nghệ để thu hút thế hệ trẻ tham gia và gìn giữ truyền thống.",
    link: "https://vietnamtourism.gov.vn",
    linkText: "Vietnam Tourism",
  },
  {
    id: 6,
    title: "Nghệ thuật dân gian",
    category: "culture",
    description: "Từ tranh dân gian đến sân khấu.",
    image: aiHeritageImg,
    date: "16/01/2026",
    author: "Đỗ Thị F",
    content:
      "Nghệ thuật dân gian Việt Nam bao gồm tranh Đông Hồ, ca trù, tuồng, chèo... là kho tàng văn hóa vô giá. Những nghệ thuật này phản ánh tâm hồn, tư tưởng và đời sống của người Việt qua các thời kỳ. Hiện nay, nhiều dự án số hóa đang được triển khai để lưu giữ, nghiên cứu và quảng bá các loại hình nghệ thuật này đến với công chúng rộng rãi hơn.",
    link: "https://ich.unesco.org/en/state/viet-nam-VN",
    linkText: "UNESCO ICH",
  },
  {
    id: 7,
    title: "Bảo tàng số & VR",
    category: "technology",
    description: "Kết hợp văn hóa và công nghệ.",
    image: vrMuseumImg,
    date: "15/01/2026",
    author: "Vũ Văn G",
    content:
      "Công nghệ thực tế ảo (VR) đang mang lại trải nghiệm bảo tàng hoàn toàn mới, cho phép người dùng khám phá các hiện vật cổ trong không gian số một cách sống động và tương tác.",
  },
  {
    id: 8,
    title: "Di sản kiến trúc Việt Nam qua thời gian",
    category: "heritage",
    description: "Khám phá vẻ đẹp kiến trúc truyền thống Việt Nam.",
    image:
      "https://images.unsplash.com/photo-1760236226002-c1e94420cafb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGN1bHR1cmV8ZW58MXx8fHwxNzY4OTY0MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "14/01/2026",
    author: "Ngô Thị H",
    content:
      "Kiến trúc Việt Nam là sự kết hợp tinh tế giữa yếu tố truyền thống và sự ảnh hưởng quốc tế...",
  },
];

export default function ArticlesSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const row1Articles = filteredArticles.filter((_, index) => index % 2 === 0);
  const row2Articles = filteredArticles.filter((_, index) => index % 2 === 1);

  const itemsVisible =
    window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const maxScroll = Math.max(
    0,
    Math.max(row1Articles.length, row2Articles.length) - itemsVisible,
  );

  const handleScroll = (direction) => {
    setCurrentIndex((prev) =>
      direction === "left"
        ? Math.max(0, prev - 1)
        : Math.min(maxScroll, prev + 1),
    );
  };

  const scrollOffset =
    window.innerWidth < 768 ? 100 : window.innerWidth < 1024 ? 50 : 33.33;

  return (
    <section className="relative px-4 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full mb-4 border-2 border-amber-200 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
          <FileText className="w-6 h-6 text-amber-700" />
          <h2 className="text-amber-900 text-md font-semibold">
            Bài viết nổi bật
          </h2>
        </div>
        <p className="text-gray-500 text-xs md:text-base max-w-2xl mx-auto">
          Khám phá những phân tích và góc nhìn sâu sắc về văn hóa, lịch sử và
          công nghệ
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Category Filter */}
        <div className="flex-shrink-0 w-full lg:w-56">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-amber-100">
            <h3 className="mb-4 text-amber-900 flex items-center gap-2 font-bold">
              <span className="w-1 h-6 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full"></span>
              Danh mục
            </h3>
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentIndex(0);
                  }}
                  className={`flex-shrink-0 lg:w-full text-left px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-amber-500 text-zinc-50 shadow-md scale-105"
                      : "bg-amber-100/60 hover:bg-amber-100 text-gray-700 hover:scale-102"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="flex-1 space-y-8 sm:space-y-12 overflow-hidden">
          {filteredArticles.length > 0 && (
            <div className="flex items-center justify-between lg:justify-end mb-5 gap-4">
              <span className="text-amber-800 font-medium text-sm italic">
                Khám phá bài viết
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleScroll("left")}
                  disabled={currentIndex === 0}
                  className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 disabled:from-gray-200 disabled:to-gray-300 transition-all shadow-md"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
                <button
                  onClick={() => handleScroll("right")}
                  disabled={currentIndex >= maxScroll}
                  className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 disabled:from-gray-200 disabled:to-gray-300 transition-all shadow-md"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              </div>
            </div>
          )}

          {filteredArticles.length > 0 ? (
            <>
              {/* Row 1 */}
              <div className="relative overflow-hidden pt-6 -mt-6 px-2">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * scrollOffset}%)`,
                  }}
                >
                  {row1Articles.map((article) => (
                    <AnalysisCard
                      key={article.id}
                      article={article}
                      categories={categories}
                      onClick={setSelectedArticle}
                    />
                  ))}
                </div>
              </div>
              {/* Row 2 */}
              <div className="relative overflow-hidden pt-6 -mt-6 px-2">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * scrollOffset}%)`,
                  }}
                >
                  {row2Articles.map((article) => (
                    <AnalysisCard
                      key={article.id}
                      article={article}
                      categories={categories}
                      onClick={setSelectedArticle}
                    />
                  ))}
                </div>
              </div>{" "}
            </>
          ) : (
            /* Notification when available */
            <div className="flex flex-col items-center justify-center py-20 bg-amber-50/30 rounded-3xl border-2 border-dashed border-amber-300">
              <FileText className="w-16 h-16 text-amber-400 mb-4" />
              <p className="text-amber-800 font-medium">
                Hiện chưa có bài viết nào trong danh mục này.
              </p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="mt-4 text-sm text-orange-600 hover:underline"
              >
                Xem tất cả bài viết
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Component */}
      <AnalysisModal
        article={selectedArticle}
        categories={categories}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
}

// import { useState } from "react";
// import { ChevronLeft, ChevronRight, X, Filter } from "lucide-react";

// // Giữ nguyên các import ảnh
// import aiHeritageImg from "../../assets/nhathoducbaai.png";
// import genZImg from "../../assets/hue.jpg";
// import vrMuseumImg from "../../assets/nhathoducba.jpg";
// import globalImg from "../../assets/diadao.png";

// const categories = [
//   { id: "all", name: "Tất cả" },
//   { id: "technology", name: "Công nghệ" },
//   { id: "heritage", name: "Di sản" },
//   { id: "society", name: "Xã hội" },
//   { id: "history", name: "Lịch sử" },
//   { id: "lifestyle", name: "Đời sống" },
//   { id: "culture", name: "Văn hóa" },
// ];

// const articles = [
//   {
//     id: 1,
//     title: "Trí tuệ nhân tạo đang thay đổi cách chúng ta làm việc",
//     category: "technology",
//     description:
//       "Khám phá cách AI đang cách mạng hóa môi trường làm việc hiện đại.",
//     image:
//       "https://images.unsplash.com/photo-1579532537902-1e50099867b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbmV3c3xlbnwxfHx8fDE3Njg5NDIzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     date: "21/01/2026",
//     author: "Nguyễn Văn A",
//     content:
//       "Trí tuệ nhân tạo (AI) không còn là một khái niệm xa lạ, mà đã trở thành một phần không thể thiếu trong cuộc sống và công việc của chúng ta...",
//   },
//   {
//     id: 2,
//     title: "Bảo tồn di sản văn hóa trong kỷ nguyên số",
//     category: "heritage",
//     description: "Công nghệ hiện đại giúp gìn giữ di sản cho thế hệ tương lai.",
//     image:
//       "https://images.unsplash.com/photo-1760236226002-c1e94420cafb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGN1bHR1cmV8ZW58MXx8fHwxNzY4OTY0MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
//     date: "20/01/2026",
//     author: "Trần Thị B",
//     content:
//       "Trong thời đại số hóa, việc bảo tồn di sản văn hóa đã có những phương pháp mới, tiên tiến hơn...",
//   },
//   {
//     id: 3,
//     title: "Những thách thức của xã hội hiện đại",
//     category: "society",
//     description: "Phân tích sâu về các vấn đề xã hội đương đại.",
//     image:
//       "https://images.unsplash.com/photo-1745419763610-31e9685081ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpZXR5JTIwcGVvcGxlfGVufDF8fHx8MTc2ODk2NDMyMnww&ixlib=rb-4.1.0&q=80&w=1080",
//     date: "19/01/2026",
//     author: "Lê Văn C",
//     content:
//       "Xã hội hiện đại đang đối mặt với nhiều thách thức phức tạp từ bất bình đẳng kinh tế...",
//   },
//   {
//     id: 4,
//     title: "Những bài học từ lịch sử Việt Nam",
//     category: "history",
//     description: "Nhìn lại quá khứ để hiểu hiện tại và tương lai.",
//     image:
//       "https://images.unsplash.com/photo-1696694139314-e0e5962b8dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwbXVzZXVtfGVufDF8fHx8MTc2ODk2NDMyMnww&ixlib=rb-4.1.0&q=80&w=1080",
//     date: "18/01/2026",
//     author: "Phạm Thị D",
//     content:
//       "Lịch sử Việt Nam là một hành trình dài với nhiều thăng trầm, nhưng cũng là nguồn cảm hứng...",
//   },
//   {
//     id: 5,
//     title: "Cân bằng giữa công việc và cuộc sống",
//     category: "lifestyle",
//     description: "Tìm kiếm sự hài hòa trong cuộc sống hiện đại.",
//     image:
//       "https://images.unsplash.com/photo-1650534017137-e316c54683b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBkYWlseXxlbnwxfHx8fDE3Njg5NjQzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     date: "17/01/2026",
//     author: "Hoàng Văn E",
//     content:
//       "Trong nhịp sống hối hả của xã hội hiện đại, việc tìm kiếm sự cân bằng trở nên quan trọng...",
//   },
//   {
//     id: 6,
//     title: "Văn hóa truyền thống trong thời hiện đại",
//     category: "culture",
//     description: "Giữ gìn bản sắc văn hóa trong bối cảnh toàn cầu hóa.",
//     image:
//       "https://images.unsplash.com/photo-1763733593826-d51c270cc8b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMHRyYWRpdGlvbnxlbnwxfHx8fDE3Njg5NjQzMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     date: "16/01/2026",
//     author: "Đỗ Thị F",
//     content:
//       "Trong làn sóng toàn cầu hóa mạnh mẽ, việc giữ gìn các giá trị văn hóa truyền thống là thách thức...",
//   },
//   {
//     id: 7,
//     title: "Blockchain và tương lai của tài chính",
//     category: "technology",
//     description: "Công nghệ blockchain đang định hình lại ngành tài chính.",
//     image:
//       "https://images.unsplash.com/photo-1579532537902-1e50099867b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbmV3c3xlbnwxfHx8fDE3Njg5NDIzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     date: "15/01/2026",
//     author: "Vũ Văn G",
//     content:
//       "Blockchain không chỉ là nền tảng của tiền mã hóa, mà còn có tiềm năng cách mạng hóa...",
//   },
//   {
//     id: 8,
//     title: "Di sản kiến trúc Việt Nam qua thời gian",
//     category: "heritage",
//     description: "Khám phá vẻ đẹp kiến trúc truyền thống Việt Nam.",
//     image:
//       "https://images.unsplash.com/photo-1760236226002-c1e94420cafb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJpdGFnZSUyMGN1bHR1cmV8ZW58MXx8fHwxNzY4OTY0MzIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
//     date: "14/01/2026",
//     author: "Ngô Thị H",
//     content:
//       "Kiến trúc Việt Nam là sự kết hợp tinh tế giữa yếu tố truyền thống và sự ảnh hưởng quốc tế...",
//   },
// ];

// export function ArticlesSection() {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedArticle, setSelectedArticle] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const filteredArticles =
//     selectedCategory === "all"
//       ? articles
//       : articles.filter((article) => article.category === selectedCategory);

//   const row1Articles = filteredArticles.filter((_, index) => index % 2 === 0);
//   const row2Articles = filteredArticles.filter((_, index) => index % 2 === 1);

//   // Tính toán giới hạn cuộn chung
//   const itemsVisible =
//     window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
//   const maxScroll = Math.max(
//     0,
//     Math.max(row1Articles.length, row2Articles.length) - itemsVisible,
//   );

//   const handleScroll = (direction) => {
//     setCurrentIndex((prev) =>
//       direction === "left"
//         ? Math.max(0, prev - 1)
//         : Math.min(maxScroll, prev + 1),
//     );
//   };

//   const ArticleCard = ({ article }) => (
//     <div
//       className="flex-shrink-0 w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.67rem)] bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer border-2 border-amber-100 hover:border-amber-300 group"
//       onClick={() => setSelectedArticle(article)}
//     >
//       <div className="relative overflow-hidden">
//         <img
//           src={article.image}
//           alt={article.title}
//           className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
//         <div className="absolute top-3 left-3">
//           <span className="inline-block px-3 py-1.5 text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg">
//             {categories.find((c) => c.id === article.category)?.name}
//           </span>
//         </div>
//       </div>
//       <div className="p-4 sm:p-5">
//         <h4 className="mb-2 line-clamp-2 text-gray-800 group-hover:text-amber-700 transition-colors font-semibold text-sm sm:text-base">
//           {article.title}
//         </h4>
//         <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3">
//           {article.description}
//         </p>
//         <div className="flex items-center justify-between pt-3 border-t border-amber-100">
//           <span className="text-[10px] sm:text-xs text-gray-500">
//             {article.date}
//           </span>
//           <span className="text-[10px] sm:text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
//             Đọc thêm →
//           </span>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <section className="relative px-4 py-8 max-w-7xl mx-auto">
//       {/* Section Header */}
//       <div className="mb-6 sm:mb-8 text-center">
//         <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-100 to-orange-100 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full mb-4 border-2 border-amber-200">
//           <Filter className="w-4 h-4 sm:w-5 h-5 text-amber-700" />
//           <h2 className="text-amber-900 text-sm sm:text-base font-bold">
//             Bài viết theo chủ đề
//           </h2>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Category Filter */}
//         <div className="flex-shrink-0 w-full lg:w-56">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-amber-100">
//             <h3 className="mb-4 text-amber-900 flex items-center gap-2 font-bold">
//               <span className="w-1 h-6 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full"></span>
//               Danh mục
//             </h3>
//             <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2">
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   onClick={() => {
//                     setSelectedCategory(category.id);
//                     setCurrentIndex(0);
//                   }}
//                   className={`flex-shrink-0 lg:w-full text-left px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
//                     selectedCategory === category.id
//                       ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md scale-105"
//                       : "bg-amber-50/50 hover:bg-amber-100 text-gray-700 hover:scale-102"
//                   }`}
//                 >
//                   {category.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Articles Grid with SINGLE Navigation Control */}
//         <div className="flex-1 space-y-8 sm:space-y-12 overflow-hidden">
//           {/* Global Navigation Buttons */}
//           <div className="flex items-center justify-between lg:justify-end mb-2 gap-4">
//             <span className="text-amber-800 font-medium text-sm italic">
//               Khám phá bài viết
//             </span>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => handleScroll("left")}
//                 disabled={currentIndex === 0}
//                 className="group relative p-2 sm:p-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 disabled:from-gray-200 disabled:to-gray-300 transition-all shadow-md"
//               >
//                 <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </button>
//               <button
//                 onClick={() => handleScroll("right")}
//                 disabled={currentIndex >= maxScroll}
//                 className="group relative p-2 sm:p-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 disabled:from-gray-200 disabled:to-gray-300 transition-all shadow-md"
//               >
//                 <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//               </button>
//             </div>
//           </div>

//           {/* Row 1 */}
//           <div className="overflow-hidden px-1">
//             <div
//               className="flex gap-4 transition-transform duration-500 ease-out"
//               style={{
//                 transform: `translateX(-${currentIndex * (window.innerWidth < 768 ? 100 : window.innerWidth < 1024 ? 50 : 33.33)}%)`,
//               }}
//             >
//               {row1Articles.map((article) => (
//                 <ArticleCard key={article.id} article={article} />
//               ))}
//             </div>
//           </div>

//           {/* Row 2 */}
//           <div className="overflow-hidden px-1">
//             <div
//               className="flex gap-4 transition-transform duration-500 ease-out"
//               style={{
//                 transform: `translateX(-${currentIndex * (window.innerWidth < 768 ? 100 : window.innerWidth < 1024 ? 50 : 33.33)}%)`,
//               }}
//             >
//               {row2Articles.map((article) => (
//                 <ArticleCard key={article.id} article={article} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Article Modal */}
//       {selectedArticle && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 animate-in fade-in duration-300"
//           onClick={() => setSelectedArticle(null)}
//         >
//           <div
//             className="bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border-2 border-amber-200 animate-in zoom-in duration-300"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="relative">
//               <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
//                 <img
//                   src={selectedArticle.image}
//                   alt={selectedArticle.title}
//                   className="w-full h-56 sm:h-80 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
//                 <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
//                   <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg text-xs sm:text-sm">
//                     {
//                       categories.find((c) => c.id === selectedArticle.category)
//                         ?.name
//                     }
//                   </span>
//                 </div>
//                 <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
//                   <h2 className="text-white text-xl sm:text-3xl font-bold leading-tight">
//                     {selectedArticle.title}
//                   </h2>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setSelectedArticle(null)}
//                 className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all shadow-lg"
//               >
//                 <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
//               </button>
//             </div>
//             <div className="p-5 sm:p-8">
//               <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 pb-6 border-b-2 border-amber-100">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
//                     {selectedArticle.author.charAt(0)}
//                   </div>
//                   <div>
//                     <p className="text-[10px] sm:text-sm text-gray-500">
//                       Tác giả
//                     </p>
//                     <p className="text-sm sm:text-base text-gray-800 font-medium">
//                       {selectedArticle.author}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="hidden sm:block h-10 w-px bg-amber-200"></div>
//                 <div>
//                   <p className="text-[10px] sm:text-sm text-gray-500">
//                     Ngày đăng
//                   </p>
//                   <p className="text-sm sm:text-base text-gray-800 font-medium">
//                     {selectedArticle.date}
//                   </p>
//                 </div>
//               </div>
//               <div className="prose prose-amber max-w-none">
//                 <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
//                   {selectedArticle.content}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }
