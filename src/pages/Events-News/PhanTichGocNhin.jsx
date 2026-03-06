import React, { useEffect, useState } from 'react'
import TabFilter from '../../components/common/TabFilter'
import AnalysisCard from '../../components/common/AnalysisCard'
import AnalysisModal from '../../components/common/AnalysisModal'
import QuoteSection from '../../components/common/QuoteSection'
import ExpertCarousel from '../../components/common/ExpertCarousel'
import ExpertVideoModal from '../../components/common/ExpertVideoModal'

// Import images from assets
import aiHeritageImg from '../../assets/nhathoducbaai.png'
import genZImg from '../../assets/hue.jpg'
import vrMuseumImg from '../../assets/nhathoducba.jpg'
import globalImg from '../../assets/diadao.png'

// Mock data cho các bài phân tích
const analysisData = [
    {
        id: 'modal1',
        category: 'Công nghệ',
        title: 'AI tái hiện di sản',
        icon: 'fa-robot',
        description: 'Trí tuệ nhân tạo mở ra hướng đi mới.',
        tooltip: 'Bảo tồn',
        image: aiHeritageImg,
        fullContent: 'Công nghệ AI đang thay đổi cách chúng ta bảo tồn và tái hiện di sản văn hóa. Với khả năng phân tích, phục hồi và tái tạo hình ảnh, AI giúp các di sản bị hư hại có thể được khôi phục lại vẻ đẹp ban đầu.',
        link: 'https://www.bbc.com/news/technology-66713465',
        linkText: 'BBC'
    },
    {
        id: 'modal2',
        category: 'Xã hội',
        title: 'Gen Z & lịch sử',
        icon: 'fa-users',
        description: 'Tiếp cận lịch sử qua nền tảng số.',
        tooltip: 'Khám phá',
        image: genZImg,
        fullContent: 'Thế hệ Gen Z đang tiếp cận lịch sử theo cách hoàn toàn mới thông qua các nền tảng số, mạng xã hội và công nghệ tương tác. Họ không chỉ học mà còn tham gia tái tạo và chia sẻ tri thức lịch sử.',
        link: 'https://www.theguardian.com/world/2023/jun/25/gen-z-history',
        linkText: 'The Guardian'
    },
    {
        id: 'modal3',
        category: 'Công nghệ',
        title: 'Bảo tàng số & VR',
        icon: 'fa-vr-cardboard',
        description: 'Kết hợp văn hóa và công nghệ.',
        tooltip: 'Trải nghiệm',
        image: vrMuseumImg,
        fullContent: 'Công nghệ thực tế ảo (VR) đang mang lại trải nghiệm bảo tàng hoàn toàn mới, cho phép người dùng khám phá các hiện vật cổ trong không gian số một cách sống động và tương tác.'
    },
    {
        id: 'modal4',
        category: 'Di sản',
        title: 'Lan tỏa di sản',
        icon: 'fa-globe',
        description: 'Di sản Việt Nam vươn tầm thế giới.',
        tooltip: 'Lan tỏa',
        image: globalImg,
        fullContent: 'Số hóa di sản không chỉ bảo tồn mà còn nâng cao tính phổ quát, giúp di sản Việt Nam vươn tầm thế giới và được nhiều người biết đến hơn.',
        link: 'https://www.unesco.org/en/articles/digital-heritage',
        linkText: 'UNESCO'
    },
    {
        id: 'modal5',
        category: 'Lịch sử',
        title: 'Dấu ấn triều Nguyễn',
        icon: 'fa-landmark',
        description: 'Khám phá di sản kiến trúc cuối cùng.',
        tooltip: 'Di sản',
        image: genZImg,
        fullContent: 'Triều Nguyễn (1802-1945) để lại một di sản kiến trúc độc đáo với Kinh thành Huế, các lăng tẩm hoàng gia và hệ thống đền đài. Những công trình này không chỉ phản ánh tài năng nghệ thuật mà còn thể hiện triết lý sống hài hòa với thiên nhiên của người Việt. Ngày nay, công nghệ số hóa đang giúp bảo tồn và tái hiện những giá trị lịch sử quý báu này.',
        link: 'https://whc.unesco.org/en/list/678',
        linkText: 'UNESCO World Heritage'
    },
    {
        id: 'modal6',
        category: 'Đời sống',
        title: 'Lễ hội truyền thống',
        icon: 'fa-calendar-days',
        description: 'Nét đẹp văn hóa trong cuộc sống.',
        tooltip: 'Dân gian & Đương đại',
        image: vrMuseumImg,
        fullContent: 'Lễ hội truyền thống Việt Nam như Tết Nguyên Đán, Tết Trung Thu, lễ hội Đền Hùng không chỉ là dịp vui chơi mà còn là cầu nối giữa quá khứ và hiện tại. Trong thời đại hiện đại, các lễ hội này vẫn giữ được giá trị văn hóa đặc sắc, đồng thời kết hợp với công nghệ để thu hút thế hệ trẻ tham gia và gìn giữ truyền thống.',
        link: 'https://vietnamtourism.gov.vn',
        linkText: 'Vietnam Tourism'
    },
    {
        id: 'modal7',
        category: 'Văn hóa',
        title: 'Nghệ thuật dân gian',
        icon: 'fa-masks-theater',
        description: 'Từ tranh dân gian đến sân khấu.',
        tooltip: 'Bảo tồn',
        image: aiHeritageImg,
        fullContent: 'Nghệ thuật dân gian Việt Nam bao gồm tranh Đông Hồ, ca trù, tuồng, chèo... là kho tàng văn hóa vô giá. Những nghệ thuật này phản ánh tâm hồn, tư tưởng và đời sống của người Việt qua các thời kỳ. Hiện nay, nhiều dự án số hóa đang được triển khai để lưu giữ, nghiên cứu và quảng bá các loại hình nghệ thuật này đến với công chúng rộng rãi hơn.',
        link: 'https://ich.unesco.org/en/state/viet-nam-VN',
        linkText: 'UNESCO ICH'
    }
]

export default function PhanTichGocNhin() {
const [activeTab, setActiveTab] = useState('Tất cả')
const [modalData, setModalData] = useState(null)
const [visibleCards, setVisibleCards] = useState([])
const [selectedExpert, setSelectedExpert] = useState(null)
const [showBackToTop, setShowBackToTop] = useState(false)

// Scroll reveal animation
useEffect(() => {
const revealCards = () => {
        const triggerBottom = window.innerHeight * 0.85
        const cards = document.querySelectorAll('.analysis-card')
        cards.forEach((card, i) => {
        if (!card) return
        const top = card.getBoundingClientRect().top
        if (top < triggerBottom && !visibleCards.includes(i)) {
            setTimeout(() => {
                setVisibleCards(prev => [...prev, i])
            }, i * 150)
        }
    })
}

revealCards()
    window.addEventListener('scroll', revealCards)
    return () => window.removeEventListener('scroll', revealCards)
}, [visibleCards])

// Back to top button visibility
useEffect(() => {
    const handleScroll = () => {
        setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
}, [])

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openModal = (data) => {
    setModalData(data)
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    setModalData(null)
    document.body.style.overflow = ''
}

const handleViewExpertVideo = (expert) => {
    setSelectedExpert(expert)
    document.body.style.overflow = 'hidden'
}

const closeExpertModal = () => {
    setSelectedExpert(null)
    document.body.style.overflow = ''
}

const filteredData = activeTab === 'Tất cả' 
? analysisData 
: analysisData.filter(item => item.category === activeTab)

const tabs = ['Tất cả', 'Công nghệ', 'Di sản', 'Xã hội', 'Lịch sử', 'Đời sống', 'Văn hóa']

return (
    <div className="min-h-screen bg-[#f6eadf] text-gray-800 relative overflow-x-hidden">

        {/* Hero Header with enhanced animation */}
        <header 
        className="relative z-10 py-20 md:py-28 px-5 text-center text-white bg-cover bg-center overflow-hidden group"
        style={{
            backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url("/images/analysis-bg.jpg")'
        }}
        >
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 animate-pulse" />
        
        <div className="relative z-10 max-w-5xl mx-auto">
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white animate-in fade-in slide-in-from-top duration-700 delay-200 leading-tight">
            Phân tích & Góc nhìn
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-300 leading-relaxed mb-8">
            Nơi hội tụ các phân tích chuyên sâu và góc nhìn đa chiều về di sản, nghệ thuật và công nghệ — giúp độc giả tiếp cận thông tin một cách toàn diện và sáng tạo.
            </p>
        </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 py-16 md:py-20">
        {/* Tabs with stagger animation - Sticky on scroll */}
        <div className="sticky top-0 z-40 bg-[#f6eadf]/95 backdrop-blur-md shadow-sm border-b border-amber-200/50 animate-in fade-in slide-in-from-top duration-500 delay-300 mb-12 py-4">
            <TabFilter 
            tabs={tabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            />
        </div>

        {/* Section Title */}
        <div className="max-w-6xl mx-auto px-4 mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
            <i className="fa-solid fa-newspaper text-amber-600" />
            Bài viết nổi bật
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá những phân tích và góc nhìn sâu sắc về văn hóa, lịch sử và công nghệ
            </p>
        </div>

        {/* Grid Layout - Better for consistent card heights */}
        <div className="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 px-4">
            {filteredData.map((item, index) => (
            <div key={item.id} className="analysis-card">
                <AnalysisCard
                item={item}
                isVisible={visibleCards.includes(index)}
                onOpenModal={openModal}
                />
            </div>
            ))}
        </div>

        {/* Empty state */}
        {filteredData.length === 0 && (
            <div className="text-center py-20">
            <i className="fa-solid fa-inbox text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Không tìm thấy bài viết nào</p>
            </div>
        )}

        {/* Quote Section with fade in */}
        <div className="relative animate-in fade-in zoom-in duration-700 delay-500 mt-20 md:mt-28 py-16 bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-3xl mx-4 md:mx-8 shadow-xl border border-amber-200/50">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
                backgroundSize: '30px 30px'
            }} />
            </div>
            
            <QuoteSection quote="Công nghệ chỉ thực sự có ý nghĩa khi nó giúp ký ức văn hóa được sống lại và lan tỏa đến cộng đồng." />
            
            {/* Author */}
            <div className="text-center mt-6">
            <p className="text-amber-700 font-semibold">— Nghệ Thuật Ký Ức 4.0 —</p>
            </div>
        </div>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-4 my-20 md:my-28">
            <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-amber-300" />
            </div>
            <div className="relative flex justify-center">
                <span className="bg-[#f6eadf] px-6 py-2 rounded-full border-2 border-amber-300 text-amber-700 font-semibold flex items-center gap-2 shadow-lg">
                <i className="fa-solid fa-star animate-spin" style={{ animationDuration: '3s' }} />
                Phỏng vấn Diễn giả
                <i className="fa-solid fa-star animate-spin" style={{ animationDuration: '3s' }} />
                </span>
            </div>
            </div>
        </div>

        {/* Expert Carousel Section */}
        <div className="animate-in fade-in slide-in-from-bottom duration-700 bg-gradient-to-b from-white via-amber-50/40 to-white rounded-3xl mx-4 md:mx-8 py-16 md:py-20 shadow-xl border border-amber-200/50 mb-16">
            <ExpertCarousel onViewVideo={handleViewExpertVideo} />
        </div>
        </div>

        {/* Modal */}
        <AnalysisModal data={modalData} onClose={closeModal} />

        {/* Expert Video Modal */}
        <ExpertVideoModal expert={selectedExpert} onClose={closeExpertModal} />

        {/* Back to Top Button */}
        {showBackToTop && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white p-4 rounded-full shadow-2xl hover:shadow-amber-400/50 transition-all duration-300 hover:scale-110 group animate-in slide-in-from-bottom fade-in"
                aria-label="Back to top"
            >
                <i className="fa-solid fa-arrow-up text-xl group-hover:animate-bounce" />
            </button>
        )}

        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    </div>
    )
}
