import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import banner from '../../assets/banner.png';
import LazyImage from '../../components/common/LazyImage';

const SectionDivider = () => (
  <div className="w-full py-6">
    <div
      className="w-full h-16 sm:h-20 md:h-24 lg:h-32 bg-cover bg-center bg-no-repeat opacity-80"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  </div>
);

const GiaoDuc = () => {
  const [selectedVideoFilter, setSelectedVideoFilter] = useState('Tất cả');

  // Mock Raw Learning Data for AI Survey System
  const [surveyData] = useState({
    courses: [
      {
        id: 1,
        title: "AI và Di sản Văn hóa Việt Nam",
        progress: 45,
        studyTimeToday: 47,
        quizAttempts: 3,
        performance: 78,
        aiStatus: "Active",
        lastActivity: Date.now() - 15 * 60000, // 15 minutes ago
        shouldTriggerSurvey: true,
        nextSurveyType: "mid"
      },
      {
        id: 2,
        title: "Lịch sử Kiến trúc Cổ đại",
        progress: 80,
        studyTimeToday: 62,
        quizAttempts: 5,
        performance: 86,
        aiStatus: "Final",
        lastActivity: Date.now() - 5 * 60000, // 5 minutes ago
        shouldTriggerSurvey: true,
        nextSurveyType: "post"
      },
      {
        id: 3,
        title: "Nghệ thuật Truyền thống",
        progress: 20,
        studyTimeToday: 12,
        quizAttempts: 1,
        performance: 65,
        aiStatus: "Waiting",
        lastActivity: Date.now() - 120 * 60000, // 2 hours ago
        shouldTriggerSurvey: false,
        nextSurveyType: "pre"
      }
    ]
  });

  const [videos] = useState([
    {
      title: "Cửa Đại - Hội An Xưa Nay",
      duration: "15 phút",
      views: "2.4K",
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop",
      category: "Lịch sử"
    },
    {
      title: "Di sản Kiến trúc Huế",
      duration: "20 phút",
      views: "3.1K",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop",
      category: "Văn hóa"
    },
    {
      title: "Nghệ thuật Chăm Pa cổ đại",
      duration: "18 phút",
      views: "1.8K",
      image: "https://images.unsplash.com/photo-1604622204871-41e695c14414?w=400&h=300&fit=crop",
      category: "Văn hóa"
    }
  ]);

  const videoFilters = ['Tất cả', 'Lịch sử', 'Văn hóa', 'AI'];

  const filteredVideos = selectedVideoFilter === 'Tất cả'
    ? videos
    : videos.filter(video => video.category === selectedVideoFilter);

  // Handle Survey Actions with Raw Data Demo
  const handleSurveyAction = (courseId, actionType) => {
    const course = surveyData.courses.find(c => c.id === courseId);
    console.log('🤖 AI Survey System - Raw Data Processing:', {
      courseId,
      actionType,
      course: {
        title: course.title,
        progress: course.progress,
        studyTime: course.studyTimeToday,
        performance: course.performance,
        aiStatus: course.aiStatus,
        triggerConditions: {
          progressThreshold: course.progress >= 25,
          timeThreshold: course.studyTimeToday >= 30,
          quizActivity: course.quizAttempts >= 2,
          shouldTrigger: course.shouldTriggerSurvey
        }
      },
      timestamp: new Date().toISOString(),
      aiRecommendations: generateAIRecommendations(course)
    });

    // In real implementation, this would send data to AI backend
    alert(`🤖 AI Survey System Demo\n\nCourse: ${course.title}\nAction: ${actionType}\nProgress: ${course.progress}%\nStudy Time: ${course.studyTimeToday}min\nAI Status: ${course.aiStatus}\n\nSee console for detailed raw data analysis.`);
  };

  // Generate AI Recommendations based on raw learning data
  const generateAIRecommendations = (course) => {
    const recommendations = [];

    if (course.performance < 70) {
      recommendations.push("Increase study frequency");
      recommendations.push("Review previous modules");
    }

    if (course.studyTimeToday < 30) {
      recommendations.push("Extend daily study time");
    }

    if (course.quizAttempts < 2) {
      recommendations.push("Take more practice quizzes");
    }

    return recommendations;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f6eadf' }}>
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mb-8 text-4xl font-serif font-bold text-amber-900 sm:text-5xl lg:text-6xl">
            Hành trình Khám phá AI & Di sản Việt Nam
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-amber-800 sm:text-xl">
            Khám phá và trải nghiệm di sản văn hóa Việt Nam thông qua công nghệ AI tiên tiến,
            mang đến những góc nhìn mới về lịch sử và văn hóa dân tộc.
          </p>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Cộng đồng */}
            <Link
              to="/forum"
              className="group relative overflow-hidden rounded-2xl border border-stone-300 bg-white p-8 shadow-lg transition-all duration-300 hover:border-amber-400 hover:shadow-xl hover:scale-105"
            >
              <div className="mb-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-3 text-center font-serif text-2xl font-semibold text-stone-800">
                Cộng đồng
              </h3>
              <p className="text-center text-base text-stone-600">
                Kết nối và chia sẻ với cộng đồng yêu văn hóa
              </p>
            </Link>

            {/* Game Truyện Tương Tác */}
            <Link
              to="/virtual-chronicle"
              className="group relative overflow-hidden rounded-2xl border border-stone-300 bg-white p-8 shadow-lg transition-all duration-300 hover:border-amber-400 hover:shadow-xl hover:scale-105"
            >
              <div className="mb-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-pink-500">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-3 text-center font-serif text-2xl font-semibold text-stone-800">
                Game Truyện Tương Tác
              </h3>
              <p className="text-center text-base text-stone-600">
                Trải nghiệm lịch sử qua game đóng vai và tạo ảnh AI
              </p>
            </Link>

            {/* Hệ thống học tập */}
            <Link
              to="/lms/student/dashboard?studentId=10"
              className="group relative overflow-hidden rounded-2xl border border-stone-300 bg-white p-8 shadow-lg transition-all duration-300 hover:border-amber-400 hover:shadow-xl hover:scale-105"
            >
              <div className="mb-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-3 text-center font-serif text-2xl font-semibold text-stone-800">
                Hệ thống học tập
              </h3>
              <p className="text-center text-base text-stone-600">
                Khóa học trực tuyến và bài tập tương tác về văn hóa
              </p>
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Interactive Features */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-6 text-4xl font-serif font-bold text-amber-900 sm:text-5xl lg:text-6xl">
              Tính năng nổi bật
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature Cards */}
            {[
              {
                icon: "🎯",
                title: "Tìm hiểu thông minh",
                description: "AI phân tích sở thích và đề xuất nội dung phù hợp"
              },
              {
                icon: "📚",
                title: "Kiến thức chuyên sâu",
                description: "Cơ sở dữ liệu phong phú về lịch sử và văn hóa"
              },
              {
                icon: "🎨",
                title: "Sáng tạo điện tử",
                description: "Tạo tác phẩm nghệ thuật với công cụ AI"
              },
              {
                icon: "🎪",
                title: "Tương tác cộng đồng",
                description: "Tham gia các hoạt động cộng đồng trực tuyến"
              },
              {
                icon: "🏛️",
                title: "Kết nối chuyên gia",
                description: "Kết nối với các chuyên gia và nhà nghiên cứu"
              },
              {
                icon: "🌟",
                title: "Theo dõi tiến độ",
                description: "Đánh giá và chứng nhận quá trình học tập"
              }
            ].map((feature, index) => (
              <div key={index} className="rounded-2xl border border-stone-200 bg-white p-8 shadow-md transition-all hover:shadow-lg hover:scale-105">
                <div className="mb-6 text-6xl">{feature.icon}</div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-stone-800">
                  {feature.title}
                </h3>
                <p className="text-stone-600 text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Video Gallery Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-6 text-4xl font-serif font-bold text-amber-900 sm:text-5xl lg:text-6xl">
              Thư viện Video Giáo dục
            </h2>
            <div className="flex justify-center space-x-4">
              {videoFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedVideoFilter(filter)}
                  className={`rounded-full border border-stone-300 px-4 py-2 shadow-md transition-all ${selectedVideoFilter === filter
                    ? 'bg-stone-800 text-white'
                    : 'bg-white text-stone-700 hover:bg-stone-800 hover:text-white'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Video Cards */}
            {filteredVideos.map((video, index) => (
              <div key={index} className="group cursor-pointer overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md transition-all hover:shadow-xl hover:scale-105">
                <div className="relative">
                  <LazyImage
                    src={video.image}
                    alt={video.title}
                    className="h-48 w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-lg">
                      <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 font-medium text-stone-800">{video.title}</h3>
                  <div className="flex items-center justify-between text-xs text-stone-600">
                    <span>{video.views} lượt xem</span>
                    <div className="flex items-center space-x-1">
                      <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span>4.5</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Library Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-6 text-4xl font-serif font-bold text-amber-900 sm:text-5xl lg:text-6xl">
              Thư viện Tài liệu & Bài giảng
            </h2>
            <p className="text-amber-800 mb-4">
              Kho tàng tài liệu phong phú về văn hóa và lịch sử Việt Nam
            </p>
            <Link
              to="/tai-lieu-bai-giang"
              className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white transition-all hover:from-amber-600 hover:to-orange-600 hover:scale-105 hover:shadow-lg"
            >
              <span>📚</span>
              <span>Khám phá Tài liệu & Bài giảng</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Giáo trình Văn Minh Đông Tá Cảng",
                author: "PGS. TS Nguyễn Văn A",
                pages: "245 trang",
                downloads: "1.2K",
                rating: "4.8"
              },
              {
                title: "Lịch sử kiến trúc Huế qua các thời kỳ",
                author: "TS. Trần Thị B",
                pages: "180 trang",
                downloads: "2.1K",
                rating: "4.7"
              },
              {
                title: "Nghệ thuật điêu khắc Chăm Pa",
                author: "PGS. Lê Văn C",
                pages: "320 trang",
                downloads: "890",
                rating: "4.9"
              },
              {
                title: "Tương tác của Cộng đồng văn hóa",
                author: "TS. Ngô Thị F",
                pages: "200 trang",
                downloads: "950",
                rating: "4.5"
              }
            ].map((doc, index) => (
              <div key={index} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-md transition-all hover:shadow-lg">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="mb-2 font-medium text-stone-800 text-sm leading-tight">
                  {doc.title}
                </h3>
                <p className="mb-2 text-xs text-stone-600">{doc.author}</p>
                <div className="mb-3 flex items-center justify-between text-xs text-stone-500">
                  <span>{doc.pages}</span>
                  <div className="flex items-center space-x-1">
                    <svg className="h-3 w-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span>{doc.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500">{doc.downloads} tải về</span>
                  <button className="rounded bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-1 text-xs text-white transition-all hover:from-blue-600 hover:to-indigo-700 hover:shadow-md">
                    Tải về
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Community Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-stone-200 bg-gradient-to-br from-slate-50 to-stone-100 p-8 shadow-xl lg:p-12">
            <div className="mb-8 text-center">
              <h2 className="mb-6 text-4xl font-serif font-bold text-stone-800 sm:text-5xl lg:text-6xl">
                Chia sẻ về Cộng đồng
              </h2>
            </div>

            <div className="space-y-6">
              {/* Community Stats */}
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-2">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-stone-800">15K+</div>
                  <div className="text-sm text-stone-600">Thành viên</div>
                </div>
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-teal-500 mx-auto mb-2">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-stone-800">2.5K+</div>
                  <div className="text-sm text-stone-600">Thảo luận</div>
                </div>
                <div className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 mx-auto mb-2">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-stone-800">500+</div>
                  <div className="text-sm text-stone-600">Chia sẻ</div>
                </div>
              </div>

              {/* Community Features */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-md">
                  <h3 className="mb-2 font-serif text-lg font-semibold text-stone-800">
                    Chuyên gia hướng dẫn
                  </h3>
                  <p className="text-stone-600 text-sm">
                    Kết nối trực tiếp với các chuyên gia hàng đầu về văn hóa và lịch sử Việt Nam
                  </p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-md">
                  <h3 className="mb-2 font-serif text-lg font-semibold text-stone-800">
                    Diễn đàn tương tác
                  </h3>
                  <p className="text-stone-600 text-sm">
                    Thảo luận, chia sẻ kiến thức và kinh nghiệm với cộng đồng yêu văn hóa
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 font-semibold text-white transition-all hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg">
                  Tham gia Cộng đồng
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Virtual Chronicle Game Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-4xl font-serif font-bold text-amber-900 sm:text-5xl lg:text-6xl">
              🎮 Virtual Chronicle
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-amber-800">
              Hành trình tương tác qua lịch sử Việt Nam - Tạo nghệ thuật AI từ những lựa chọn của bạn
            </p>
          </div>

          {/* Main Game Showcase */}
          <div className="mb-12 overflow-hidden rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 shadow-2xl">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
              {/* Game Info Side */}
              <div className="p-8 lg:p-12">
                <div className="mb-6 flex items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg mr-4">
                    <span className="text-2xl">📜</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-purple-600 uppercase tracking-wide">
                      Story Game
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-purple-900">
                      Virtual Chronicle
                    </h3>
                  </div>
                </div>

                <p className="mb-6 text-lg text-purple-700 leading-relaxed">
                  Khám phá lịch sử Việt Nam qua góc nhìn của bạn. Mỗi lựa chọn tạo ra một tác phẩm nghệ thuật AI độc đáo,
                  cùng mã giảm giá để in thành sản phẩm thực tế.
                </p>

                {/* Game Features */}
                <div className="mb-8 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                      <span className="text-lg">👑</span>
                    </div>
                    <div>
                      <div className="font-semibold text-purple-800">3 Vai Trò Khác Nhau</div>
                      <div className="text-sm text-purple-600">Tướng Lĩnh • Quốc Sư • Dân Làng</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-lg">🎨</span>
                    </div>
                    <div>
                      <div className="font-semibold text-purple-800">AI Art Generation</div>
                      <div className="text-sm text-purple-600">Tạo tác phẩm từ lựa chọn của bạn</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <span className="text-lg">🎟️</span>
                    </div>
                    <div>
                      <div className="font-semibold text-purple-800">Coupon & Rewards</div>
                      <div className="text-sm text-purple-600">Mã giảm giá để in thành sản phẩm</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                      <span className="text-lg">📚</span>
                    </div>
                    <div>
                      <div className="font-semibold text-purple-800">Cốt Truyện Đa Nhánh</div>
                      <div className="text-sm text-purple-600">Hàng chục kết thúc khác nhau</div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/virtual-chronicle"
                  className="block w-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-center text-lg font-bold text-white shadow-xl transition-all hover:from-purple-700 hover:to-indigo-700 hover:shadow-2xl hover:scale-[1.02]"
                >
                  🎮 Bắt đầu hành trình
                </Link>
              </div>

              {/* Game Preview Side */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 lg:p-12">
                <div className="mb-6">
                  <div className="mb-4 text-sm font-medium text-gray-400 uppercase tracking-wide">
                    Game Preview
                  </div>
                  <h4 className="text-xl font-serif font-bold text-white">
                    Chọn vai của bạn
                  </h4>
                </div>

                {/* Role Selection Cards */}
                <div className="space-y-3">
                  <div className="rounded-lg border border-amber-300 bg-gradient-to-r from-amber-400 to-orange-400 p-4 text-gray-900">
                    <div className="mb-2 flex items-center">
                      <span className="mr-3 text-xl">⚔️</span>
                      <div className="font-bold">Tướng Lĩnh</div>
                    </div>
                    <div className="text-sm">Dẫn dắt quân đội, quyết định chiến thuật</div>
                  </div>

                  <div className="rounded-lg border border-blue-300 bg-gradient-to-r from-blue-400 to-indigo-400 p-4 text-white">
                    <div className="mb-2 flex items-center">
                      <span className="mr-3 text-xl">📜</span>
                      <div className="font-bold">Quốc Sư</div>
                    </div>
                    <div className="text-sm">Cố vấn triều đình, định hướng chính sách</div>
                  </div>

                  <div className="rounded-lg border border-green-300 bg-gradient-to-r from-green-400 to-emerald-400 p-4 text-gray-900">
                    <div className="mb-2 flex items-center">
                      <span className="mr-3 text-xl">🌾</span>
                      <div className="font-bold">Dân Làng</div>
                    </div>
                    <div className="text-sm">Sống gần gũi đất, lo cho cộng đồng</div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-gray-600 bg-gray-800/50 p-4">
                  <div className="mb-2 text-sm text-gray-400">Ví dụ lựa chọn:</div>
                  <div className="text-sm text-gray-200">
                    "Bạn dẫn quân tới sườn đồi. Chọn chiến lược:
                    <span className="ml-2 font-medium text-amber-300">Tấn công ồ ạt</span> hoặc
                    <span className="ml-1 font-medium text-blue-300">Mai phục đêm</span>"
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Play Process */}
          <div className="mb-12 rounded-3xl border border-stone-200 bg-gradient-to-br from-slate-50 to-stone-100 p-8 shadow-xl lg:p-12">
            <div className="mb-8 text-center">
              <h3 className="mb-4 text-3xl font-serif font-bold text-stone-800">
                🎯 Cách chơi Virtual Chronicle
              </h3>
              <p className="text-stone-600">
                4 bước đơn giản để tạo ra bộ sưu tập nghệ thuật riêng của bạn
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="mb-3 font-serif text-lg font-semibold text-stone-800">
                  Chọn Vai Trò
                </h4>
                <p className="text-sm text-stone-600">
                  Tướng Lĩnh, Quốc Sư, hay Dân Làng - mỗi vai có cốt truyện riêng
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="mb-3 font-serif text-lg font-semibold text-stone-800">
                  Đưa Ra Lựa Chọn
                </h4>
                <p className="text-sm text-stone-600">
                  Quyết định định hướng câu chuyện qua các tình huống lịch sử
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="mb-3 font-serif text-lg font-semibold text-stone-800">
                  Tạo Nghệ Thuật
                </h4>
                <p className="text-sm text-stone-600">
                  AI tạo tác phẩm dựa trên lựa chọn và bối cảnh câu chuyện
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h4 className="mb-3 font-serif text-lg font-semibold text-stone-800">
                  Nhận Thưởng
                </h4>
                <p className="text-sm text-stone-600">
                  Tải tác phẩm về máy, nhận mã giảm giá để in thành sản phẩm
                </p>
              </div>
            </div>
          </div>

          {/* Game Stats */}

          {/* Sample Artworks Showcase */}
          <div className="mb-12 rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 p-8 shadow-xl">
            <div className="mb-8 text-center">
              <h3 className="mb-4 text-3xl font-serif font-bold text-purple-900">
                🖼️ Thư viện Tác phẩm
              </h3>
              <p className="text-purple-700">
                Những tác phẩm AI được tạo ra từ hành trình của người chơi
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { title: "Chiến Thắng Mạnh Mẽ", type: "Tướng Lĩnh", color: "from-red-400 to-orange-400" },
                { title: "Cứu Dân An Cư", type: "Quốc Sư", color: "from-blue-400 to-indigo-400" },
                { title: "Đoàn Kết Làng Quê", type: "Dân Làng", color: "from-green-400 to-emerald-400" }
              ].map((artwork, index) => (
                <div key={index} className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                  <div className={`mb-4 aspect-square w-full rounded-lg bg-gradient-to-br ${artwork.color} p-8 flex items-center justify-center`}>
                    <span className="text-4xl text-white">🎨</span>
                  </div>
                  <h4 className="mb-2 font-serif text-lg font-semibold text-purple-900">
                    {artwork.title}
                  </h4>
                  <div className="mb-3 text-sm text-purple-600">
                    Từ lựa chọn: <span className="font-medium">{artwork.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-purple-500">
                    <span>AI Generated</span>
                    <span>Có thể tải về</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-block rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 text-sm font-medium text-purple-700">
                🔥 Trending Game
              </span>
            </div>
            <h3 className="mb-6 text-3xl font-serif font-bold text-amber-900">
              Sẵn sàng viết nên lịch sử của riêng bạn?
            </h3>
            <p className="mb-8 text-lg text-amber-700">
              Mỗi lựa chọn tạo ra một tác phẩm nghệ thuật độc nhất. Bắt đầu hành trình ngay hôm nay!
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/virtual-chronicle"
                className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:from-purple-700 hover:to-indigo-700 hover:scale-105 hover:shadow-xl"
              >
                <span>🎮</span>
                <span>Chơi Virtual Chronicle ngay</span>
                <span>→</span>
              </Link>
              <button className="rounded-full border-2 border-purple-300 bg-white px-8 py-4 font-semibold text-purple-700 shadow-lg transition-all hover:bg-purple-50 hover:border-purple-400 hover:scale-105">
                📖 Xem hướng dẫn chi tiết
              </button>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Call to Action */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-8 text-4xl font-serif font-bold text-amber-900 sm:text-5xl lg:text-6xl">
            Bắt đầu hành trình khám phá ngay hôm nay
          </h2>
          <p className="mb-8 text-lg text-amber-800">
            Tham gia cùng chúng tôi trong việc bảo tồn và phát huy di sản văn hóa Việt Nam thông qua công nghệ AI
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:scale-105">
              Bắt đầu học ngay
            </button>
            <button className="rounded-full border-2 border-stone-300 bg-white px-8 py-4 font-semibold text-stone-700 shadow-lg transition-all hover:bg-stone-800 hover:text-white hover:border-stone-800 hover:scale-105">
              Xem demo
            </button>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Smart Learning with AI Survey Integration */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-6 text-4xl font-serif font-bold text-amber-900 sm:text-5xl lg:text-6xl">
              Hệ thống Học tập Thông minh với AI
            </h2>
            <p className="text-amber-800 mb-4">
              AI phân tích hành vi học tập và đưa ra lộ trình cá nhân hóa theo từng giai đoạn
            </p>
          </div>

          {/* AI Learning Analytics Dashboard */}
          <div className="mb-12 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">�</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-indigo-800 mb-4">
                  AI Adaptive Learning System
                </h3>
                <p className="text-indigo-700 mb-6 leading-relaxed">
                  Hệ thống theo dõi hành vi học tập thời gian thực và tự động kích hoạt khảo sát dựa trên:
                  <strong> tiến độ học tập, thời gian học, pattern tương tác và hiệu quả học</strong>.
                  AI phân tích raw data để đưa ra lộ trình học tập tối ưu cho từng cá nhân.
                </p>

                {/* Learning Analytics Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-indigo-600">TIẾN ĐỘ</span>
                      <span className="text-lg">⏱️</span>
                    </div>
                    <div className="text-2xl font-bold text-indigo-800 mb-1">68%</div>
                    <p className="text-xs text-indigo-600">Avg. completion rate</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-green-600">ENGAGEMENT</span>
                      <span className="text-lg">📊</span>
                    </div>
                    <div className="text-2xl font-bold text-green-800 mb-1">4.2h</div>
                    <p className="text-xs text-green-600">Daily avg. study time</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-orange-600">SURVEYS</span>
                      <span className="text-lg">📝</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-800 mb-1">1,247</div>
                    <p className="text-xs text-orange-600">Completed responses</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-purple-600">AI INSIGHTS</span>
                      <span className="text-lg">🎯</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-800 mb-1">94%</div>
                    <p className="text-xs text-purple-600">Recommendation accuracy</p>
                  </div>
                </div>

                {/* Survey Trigger Conditions */}
                <div className="bg-white rounded-lg p-4 border border-indigo-200 mb-4">
                  <h4 className="font-semibold text-indigo-800 mb-3">🔔 Survey Trigger Conditions (Raw Data Demo)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Lesson progress ≥ 25%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-700">Study time ≥ 30 minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Quiz attempts ≥ 2</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700">Low performance detected</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700">Extended idle time</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-gray-700">Module completion</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    Real-time Tracking
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    Adaptive Surveys
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    AI Recommendations
                  </span>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    Raw Data Analysis
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Cards with Survey Integration */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Course 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-lg transition-all hover:shadow-xl hover:scale-105">
              {/* Survey Alert Badge */}
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  🔔 Survey Ready
                </div>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Đang học
                </div>
              </div>
              <div className="relative h-48 overflow-hidden">
                <LazyImage
                  src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&h=300&fit=crop"
                  alt="AI và Di sản Văn hóa"
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">AI và Di sản Văn hóa Việt Nam</h3>
                  <p className="text-sm opacity-90">8 tuần • TS. Nguyễn Văn A</p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progress & AI Triggers</span>
                    <span className="flex items-center space-x-1">
                      <span>45%</span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">🤖 Active</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 relative">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full" style={{ width: '45%' }}></div>
                    {/* Survey trigger points */}
                    <div className="absolute top-0 left-1/4 w-0.5 h-3 bg-red-400"></div>
                    <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-orange-400"></div>
                    <div className="absolute top-0 right-1/4 w-0.5 h-3 bg-green-400"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Khám phá ứng dụng AI trong bảo tồn và phát triển di sản văn hóa.
                  Tích hợp công nghệ hiện đại với giá trị truyền thống.
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      234 học viên
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                      </svg>
                      4.8/5
                    </span>
                  </div>
                </div>

                {/* Learning Analytics */}
                <div className="bg-indigo-50 rounded-lg p-3 mb-4 border border-indigo-200">
                  <h4 className="text-xs font-semibold text-indigo-700 mb-2">📊 Real-time Analytics</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Today:</span>
                      <span className="font-semibold text-green-600">47min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quiz:</span>
                      <span className="font-semibold text-blue-600">3 attempts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Performance:</span>
                      <span className="font-semibold text-orange-600">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">AI Status:</span>
                      <span className="font-semibold text-purple-600">Ready</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Survey Alert Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">Survey Status:</span>
                    <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      🔔 Triggered (45% + 47min)
                    </div>
                  </div>

                  <Link
                    to="/survey/khoa-hoc-1"
                    className="block w-full py-3 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-center rounded-lg hover:from-red-600 hover:to-pink-600 transition-all font-medium animate-pulse"
                  >
                    🚨 Mid-Progress Survey Ready
                  </Link>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSurveyAction(1, 'analytics')}
                      className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                      📊 Analytics
                    </button>
                    <button
                      onClick={() => handleSurveyAction(1, 'ai-tips')}
                      className="flex-1 py-2 px-3 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition-colors">
                      🤖 AI Tips
                    </button>
                  </div>

                  <button
                    onClick={() => handleSurveyAction(1, 'raw-data')}
                    className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-xs hover:bg-gray-200 transition-colors">
                    🔧 Raw Learning Data (Demo)
                  </button>
                </div>
              </div>
            </div>

            {/* Course 2 - Nearly Complete, Ready for Final Survey */}
            <div className="group relative overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-lg transition-all hover:shadow-xl hover:scale-105">
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  🎯 Final Survey
                </div>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Sắp hoàn thành
                </div>
              </div>
              <div className="relative h-48 overflow-hidden">
                <LazyImage
                  src="https://images.unsplash.com/photo-1548013146-72479768bada?w=500&h=300&fit=crop"
                  alt="Lịch sử Kiến trúc Cổ đại"
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Lịch sử Kiến trúc Cổ đại</h3>
                  <p className="text-sm opacity-90">6 tuần • ThS. Trần Thị B</p>
                </div>
              </div>

              <div className="p-6">
                {/* Learning Analytics */}
                <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-200">
                  <h4 className="text-xs font-semibold text-green-700 mb-2">📊 Near Completion Analytics</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Today:</span>
                      <span className="font-semibold text-green-600">62min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quiz:</span>
                      <span className="font-semibold text-blue-600">5 attempts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Performance:</span>
                      <span className="font-semibold text-green-600">86%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">AI Status:</span>
                      <span className="font-semibold text-orange-600">Final</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progress & AI Triggers</span>
                    <span className="flex items-center space-x-1">
                      <span>80%</span>
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">🎯 Final</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 relative">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full" style={{ width: '80%' }}></div>
                    {/* Survey trigger points */}
                    <div className="absolute top-0 left-1/4 w-0.5 h-3 bg-red-400"></div>
                    <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-orange-400"></div>
                    <div className="absolute top-0 right-1/4 w-0.5 h-3 bg-green-400"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Tìm hiểu về kiến trúc cổ đại Việt Nam qua các thời kỳ.
                  Phân tích đặc điểm và giá trị văn hóa trong từng công trình.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">Survey Status:</span>
                    <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-bold">
                      🎯 Final Assessment Ready
                    </div>
                  </div>

                  <Link
                    to="/survey/khoa-hoc-2"
                    className="block w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-center rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all font-medium"
                  >
                    🎯 Final Assessment Survey
                  </Link>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSurveyAction(2, 'results')}
                      className="flex-1 py-2 px-3 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors">
                      📈 Results
                    </button>
                    <button
                      onClick={() => handleSurveyAction(2, 'certificate')}
                      className="flex-1 py-2 px-3 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition-colors">
                      🏆 Certificate
                    </button>
                  </div>

                  <button
                    onClick={() => handleSurveyAction(2, 'complete-data')}
                    className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-xs hover:bg-gray-200 transition-colors">
                    🔧 Complete Learning Data
                  </button>
                </div>
              </div>
            </div>

            {/* Course 3 - Early Stage, No Survey Yet */}
            <div className="group relative overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-lg transition-all hover:shadow-xl hover:scale-105 opacity-90">
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-medium">
                  ⏱️ Too Early
                </div>
              </div>
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Mới bắt đầu
                </div>
              </div>
              <div className="relative h-48 overflow-hidden">
                <LazyImage
                  src="https://images.unsplash.com/photo-1604622204871-41e695c14414?w=500&h=300&fit=crop"
                  alt="Nghệ thuật Truyền thống"
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Nghệ thuật Truyền thống</h3>
                  <p className="text-sm opacity-90">10 tuần • GS. Lê Văn C</p>
                </div>
              </div>

              <div className="p-6">
                {/* Learning Analytics */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">📊 Early Stage Analytics</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Today:</span>
                      <span className="font-semibold text-gray-600">12min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quiz:</span>
                      <span className="font-semibold text-gray-600">1 attempt</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Performance:</span>
                      <span className="font-semibold text-gray-600">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">AI Status:</span>
                      <span className="font-semibold text-gray-600">Waiting</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progress & AI Triggers</span>
                    <span className="flex items-center space-x-1">
                      <span>20%</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">⏱️ Waiting</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 relative">
                    <div className="bg-gradient-to-r from-gray-400 to-gray-500 h-3 rounded-full" style={{ width: '20%' }}></div>
                    {/* Survey trigger points */}
                    <div className="absolute top-0 left-1/4 w-0.5 h-3 bg-red-400"></div>
                    <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-orange-400"></div>
                    <div className="absolute top-0 right-1/4 w-0.5 h-3 bg-green-400"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Khám phá các loại hình nghệ thuật truyền thống của Việt Nam.
                  Tìm hiểu kỹ thuật và ý nghĩa văn hóa trong từng tác phẩm.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">Survey Status:</span>
                    <div className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                      ⏱️ Need 25% + 30min
                    </div>
                  </div>

                  <button
                    disabled
                    className="w-full py-3 px-4 bg-gray-300 text-gray-500 text-center rounded-lg cursor-not-allowed font-medium"
                  >
                    📝 Survey Conditions Not Met
                  </button>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSurveyAction(3, 'continue-learning')}
                      className="flex-1 py-2 px-3 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      📚 Continue Learning
                    </button>
                    <button
                      onClick={() => handleSurveyAction(3, 'info')}
                      className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                      ℹ️ Info
                    </button>
                  </div>

                  <button
                    onClick={() => handleSurveyAction(3, 'basic-data')}
                    className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-xs hover:bg-gray-200 transition-colors">
                    🔧 Basic Learning Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">
                Trải nghiệm Học tập Thông minh với AI
              </h3>
              <p className="text-indigo-600 mb-6 max-w-2xl mx-auto">
                Đăng ký ngay để trải nghiệm hệ thống khảo sát tâm lý học tập tiên tiến,
                giúp bạn tối ưu hóa phương pháp học tập và đạt kết quả tốt nhất.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all font-semibold shadow-lg hover:shadow-xl">
                  Đăng ký miễn phí
                </button>
                <button className="px-8 py-3 border border-indigo-300 text-indigo-700 rounded-lg hover:bg-indigo-50 transition-colors font-semibold">
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />
    </div>
  );
};

export default GiaoDuc;
