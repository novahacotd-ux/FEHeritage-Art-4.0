import { motion } from "framer-motion";
import { Filter, TrendingUp, Clock } from "lucide-react";

const categories = [
  { value: "all", label: "Tất cả" },
  { value: "technology", label: "Công nghệ" },
  { value: "travel", label: "Du lịch" },
  { value: "discussion", label: "Thảo luận" },
  { value: "education", label: "Giáo dục" },
  { value: "heritage", label: "Di sản" },
];

export default function Filters({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-md p-6 space-y-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-amber-700" />
        <h3 className="font-semibold text-amber-900">Bộ lọc</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-amber-800">Danh mục</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => onCategoryChange(category.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.value
                    ? "bg-amber-500 text-zinc-50 shadow-md"
                    : "bg-amber-100/60 text-amber-800 hover:bg-amber-200/50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-amber-800">
            Sắp xếp theo
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onSortChange("newest")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                sortBy === "newest"
                  ? "bg-amber-500 text-zinc-50 shadow-md"
                  : "bg-amber-100/60 text-amber-800 hover:bg-amber-200/50"
              }`}
            >
              <Clock className="w-4 h-4" />
              Mới nhất
            </button>
            <button
              onClick={() => onSortChange("popular")}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                sortBy === "popular"
                  ? "bg-amber-500 text-zinc-50 shadow-md"
                  : "bg-amber-100/60 text-amber-800 hover:bg-amber-200/50"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Phổ biến
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
