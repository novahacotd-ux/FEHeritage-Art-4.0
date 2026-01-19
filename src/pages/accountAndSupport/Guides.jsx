import React, { useState } from 'react'
import SectionHeading from '../../components/common/SectionHeading'
import { guideCategories, guidesList } from '../../data/guidesData'

const Guides = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGuides = guidesList.filter(guide => {
    const matchesCategory = activeCategory === 'all' || guide.category === activeCategory
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fef8f3] to-[#f6eadf]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <SectionHeading
          label="Trợ giúp"
          title="Hướng dẫn sử dụng"
          description="Tìm câu trả lời cho các câu hỏi thường gặp và hướng dẫn chi tiết về cách sử dụng website"
        />

        {/* Search Bar */}
        <div className="mt-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm hướng dẫn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border-2 border-brand-brown-200 px-6 py-4 pl-12 text-brand-brown-900 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8 flex flex-wrap gap-3">
          {guideCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-6 py-3 font-medium transition-all ${activeCategory === category.id
                ? 'bg-gradient-to-r from-[#3b2412] to-[#4a2d18] text-white shadow-lg'
                : 'bg-white text-brand-brown-700 hover:bg-[#f6eadf] shadow-md'
                }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Guides Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#f6eadf] to-[#e8d3c0]">
                    <span className="text-2xl">{guide.icon}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif font-semibold text-brand-brown-900">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-brown-600">
                    {guide.description}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-brand-brown-700 mb-3">Các bước thực hiện:</h4>
                <ol className="space-y-2">
                  {guide.steps.map((step, index) => (
                    <li key={index} className="flex items-start text-sm text-brand-brown-600">
                      <span className="mr-2 flex-shrink-0 font-semibold text-brand-brown-900">
                        {index + 1}.
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-brown-100">
                <button className="text-sm font-semibold text-brand-brown-700 hover:text-brand-brown-900 transition">
                  Xem chi tiết →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredGuides.length === 0 && (
          <div className="mt-12 text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-serif font-semibold text-brand-brown-900 mb-2">
              Không tìm thấy hướng dẫn
            </h3>
            <p className="text-brand-brown-600">
              Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
            </p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#3b2412] to-[#4a2d18] p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-serif font-semibold mb-4">
            Không tìm thấy câu trả lời?
          </h3>
          <p className="text-white/90 mb-6">
            Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="rounded-full bg-white px-6 py-3 font-semibold text-brand-brown-900 transition hover:bg-brand-brown-50"
            >
              Liên hệ hỗ trợ
            </a>
            <a
              href="/forum"
              className="rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Hỏi cộng đồng
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Guides
