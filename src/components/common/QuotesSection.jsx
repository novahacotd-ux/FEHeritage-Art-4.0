import { Palette, Quote } from "lucide-react";

const quotes = [
  {
    id: 1,
    text: "Công nghệ không sinh ra để thay thế quá khứ, mà để đánh thức những ký ức văn hóa đang ngủ quên và trao cho chúng một đời sống mới trong lòng thời đại số.",
  },
  {
    id: 2,
    text: "Di sản chỉ là những mảnh ghép rời rạc nếu thiếu đi sợi dây công nghệ kết nối chúng thành một dòng chảy văn hóa xuyên suốt đến cộng đồng.",
  },
  {
    id: 3,
    text: "Giá trị của một thuật toán không nằm ở tốc độ xử lý, mà ở khả năng nó mang một bản sắc văn hóa từ hàng thế kỷ trước chạm đến trái tim của người trẻ hôm nay.",
  },
  {
    id: 4,
    text: "Khi ký ức văn hóa được số hóa với sự trân trọng, công nghệ đã biến những di sản hữu hình dễ phai tàn thành những giá trị tinh thần bất tử và lan tỏa.",
  },
  {
    id: 5,
    text: "Sứ mệnh cao cả nhất của công nghệ không phải là đưa con người đến tương lai xa xôi, mà là mang những tâm hồn của quá khứ trở lại đồng hành cùng hiện tại.",
  },
  {
    id: 6,
    text: "Công nghệ là chiếc loa phóng thanh hiện đại, biến những tiếng thì thầm của lịch sử thành những giai điệu văn hóa vang vọng trong lòng cộng đồng.",
  },
];

export default function QuotesSection() {
  return (
    <section className="relative py-12 bg-gradient-to-br from-orange-300/60 via-amber-100/50 to-orange-200/40 rounded-3xl overflow-hidden border border-white/40 shadow-[0_20px_50px_rgba(245,158,11,0.15)] ring-2 ring-orange-200/60">
      <div className="max-w-6xl mx-auto px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 px-5 py-2.5 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer border-2 border-amber-50/40">
            <Palette className="w-6 h-6 text-zinc-100" />
            <h2 className="text-zinc-100 text-md font-semibold">
              Nghệ Thuật Ký Ức 4.0
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-orange-200/50 transition-all hover:-translate-y-1 border border-orange-100/50 hover:border-orange-400"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-100/50 group-hover:bg-orange-500 transition-colors duration-500">
                <Quote className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors duration-500 rotate-180" />
              </div>
              <p className="text-gray-600/80 group-hover:text-gray-900 leading-relaxed text-sm text-justify transition-all duration-300">
                "{quote.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// export default function QuoteSection({ quote }) {
//   return (
//     <div className="max-w-4xl mx-auto text-center my-20 px-5 relative group">
//       <div className="text-6xl text-amber-500 absolute -left-5 -top-8 font-serif animate-pulse" aria-hidden="true">"</div>
//       <div className="text-6xl text-amber-500 absolute -right-5 -bottom-8 font-serif animate-pulse opacity-50 rotate-180" aria-hidden="true">"</div>

//       {/* Decorative elements */}
//       <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
//       <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />

//       <p className="text-xl md:text-2xl italic text-amber-700 font-medium transition-all duration-500 hover:text-amber-800 hover:scale-105 relative z-10 py-8">
//         <span className="relative inline-block">
//           {quote}
//           {/* Shine effect on hover */}
//           <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//         </span>
//       </p>
//     </div>
//   )
// }
