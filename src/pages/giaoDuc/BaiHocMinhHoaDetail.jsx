import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Mock data cho bài học
const lessonsData = [
  {
    id: 1,
    title: 'Hệ thống AI với tiếng Việt - Nghệ thuật dân gian',
    description: 'Tìm hiểu về ứng dụng AI trong việc phân tích và tái tạo nghệ thuật dân gian Việt Nam qua các thuật toán machine learning hiện đại.',
    type: 'Miễn phí',
    difficulty: 'Cơ bản',
    duration: '45 phút',
    shortCode: 'AI',
    bgColor: 'from-blue-500 to-indigo-600',
    students: 1234,
    rating: 4.8,
    category: 'AI',
    instructor: 'TS. Nguyễn Minh AI',
    videoUrl: 'https://example.com/video1.mp4',
    thumbnail: 'https://picsum.photos/800/450?random=1',
    totalSteps: 8,
    estimatedTime: '45 phút',
    objectives: [
      'Hiểu được nguyên lý cơ bản của AI trong phân tích văn hóa',
      'Ứng dụng machine learning cho nghệ thuật dân gian',
      'Thực hành với các công cụ AI phân tích hình ảnh',
      'Tạo được mô hình AI đơn giản cho nhận diện pattern'
    ],
    steps: [
      {
        id: 1,
        title: 'Giới thiệu về AI và Văn hóa',
        type: 'video',
        duration: '8 phút',
        content: 'Video giới thiệu tổng quan về ứng dụng AI trong bảo tồn và phân tích văn hóa dân gian.'
      },
      {
        id: 2,
        title: 'Machine Learning cơ bản',
        type: 'theory',
        duration: '10 phút',
        content: 'Lý thuyết về các thuật toán machine learning phổ biến trong phân tích hình ảnh và pattern recognition.'
      },
      {
        id: 3,
        title: 'Thực hành với TensorFlow',
        type: 'interactive',
        duration: '15 phút',
        content: 'Coding lab: Xây dựng mô hình nhận diện họa tiết truyền thống Việt Nam.'
      },
      {
        id: 4,
        title: 'Case Study: Gốm Chu Đậu',
        type: 'case_study',
        duration: '12 phút',
        content: 'Phân tích ứng dụng AI trong nghiên cứu và tái tạo nghệ thuật gốm Chu Đậu.'
      }
    ],
    quiz: [
      {
        question: 'AI có thể được ứng dụng vào việc phân tích nghệ thuật dân gian như thế nào?',
        options: [
          'Chỉ có thể nhận diện màu sắc',
          'Phân tích pattern, màu sắc, và cấu trúc hình học',
          'Chỉ dùng để lưu trữ hình ảnh',
          'Không có ứng dụng thực tế'
        ],
        correct: 1
      },
      {
        question: 'Thuật toán nào phù hợp nhất cho việc nhận diện họa tiết truyền thống?',
        options: [
          'Linear Regression',
          'Decision Tree',
          'Convolutional Neural Networks (CNN)',
          'K-Means Clustering'
        ],
        correct: 2
      }
    ],
    resources: [
      { name: 'TensorFlow Documentation', url: '#', type: 'documentation' },
      { name: 'Vietnamese Art Patterns Dataset', url: '#', type: 'dataset' },
      { name: 'Sample Code Repository', url: '#', type: 'code' }
    ],
    relatedLessons: [2, 3, 5]
  },
  {
    id: 2,
    title: 'Quizz - Kiểm thử năng lực tư duy sáng tạo',
    description: 'Bài kiểm tra tương tác đánh giá khả năng tư duy sáng tạo và hiểu biết về văn hóa truyền thống qua các câu hỏi thực tế.',
    type: 'Quizz',
    difficulty: 'Trung bình',
    duration: '30 phút',
    shortCode: 'Q',
    bgColor: 'from-purple-500 to-pink-600',
    students: 876,
    rating: 4.6,
    category: 'Quiz',
    instructor: 'ThS. Trần Văn Quiz',
    videoUrl: 'https://example.com/video2.mp4',
    thumbnail: 'https://picsum.photos/800/450?random=2',
    totalSteps: 5,
    estimatedTime: '30 phút',
    objectives: [
      'Đánh giá khả năng tư duy sáng tạo trong bối cảnh văn hóa',
      'Hiểu được mối liên hệ giữa truyền thống và hiện đại',
      'Phát triển kỹ năng phân tích văn hóa',
      'Nâng cao nhận thức về di sản văn hóa'
    ],
    steps: [
      {
        id: 1,
        title: 'Giới thiệu về tư duy sáng tạo',
        type: 'theory',
        duration: '5 phút',
        content: 'Tổng quan về các phương pháp đánh giá tư duy sáng tạo trong nghiên cứu văn hóa.'
      },
      {
        id: 2,
        title: 'Phân tích case study',
        type: 'case_study',
        duration: '10 phút',
        content: 'Nghiên cứu các ví dụ thực tế về ứng dụng tư duy sáng tạo trong bảo tồn văn hóa.'
      },
      {
        id: 3,
        title: 'Thực hành quiz tương tác',
        type: 'interactive',
        duration: '15 phút',
        content: 'Làm bài quiz đa dạng về văn hóa truyền thống và tư duy sáng tạo.'
      }
    ],
    quiz: [
      {
        question: 'Tư duy sáng tạo trong bảo tồn văn hóa đóng vai trò gì?',
        options: [
          'Chỉ giúp tạo ra sản phẩm mới',
          'Kết nối truyền thống với hiện đại một cách sáng tạo',
          'Thay thế hoàn toàn các phương pháp truyền thống',
          'Không có vai trò quan trọng'
        ],
        correct: 1
      },
      {
        question: 'Đâu là phương pháp hiệu quả nhất để đánh giá tư duy sáng tạo?',
        options: [
          'Chỉ dựa vào kết quả cuối cùng',
          'Đánh giá quá trình tư duy và giải pháp',
          'Chỉ xem xét tính độc đáo',
          'Đếm số lượng ý tưởng'
        ],
        correct: 1
      }
    ],
    resources: [
      { name: 'Creative Thinking Guide', url: '#', type: 'guide' },
      { name: 'Cultural Analysis Templates', url: '#', type: 'template' },
      { name: 'Case Study Collection', url: '#', type: 'collection' }
    ],
    relatedLessons: [1, 3, 5]
  },
  {
    id: 3,
    title: 'Nghiên cứu - VR Tours: Trải nghiệm di sản',
    description: 'Nghiên cứu sâu về công nghệ VR trong việc tái tạo và bảo tồn di sản văn hóa, từ lý thuyết đến thực hành.',
    type: 'Nghiên cứu',
    difficulty: 'Nâng cao',
    duration: '90 phút',
    shortCode: 'VR',
    bgColor: 'from-green-500 to-emerald-600',
    students: 543,
    rating: 4.9,
    category: 'VR',
    instructor: 'PGS.TS Lê Văn VR',
    videoUrl: 'https://example.com/video3.mp4',
    thumbnail: 'https://picsum.photos/800/450?random=3',
    totalSteps: 12,
    estimatedTime: '90 phút',
    objectives: [
      'Nắm vững nguyên lý hoạt động của công nghệ VR',
      'Ứng dụng VR trong bảo tồn di sản văn hóa',
      'Thiết kế tour VR chuyên nghiệp',
      'Đánh giá hiệu quả của VR tours'
    ],
    steps: [
      {
        id: 1,
        title: 'Cơ sở lý thuyết VR',
        type: 'theory',
        duration: '15 phút',
        content: 'Tìm hiểu về công nghệ thực tế ảo và các ứng dụng trong di sản văn hóa.'
      },
      {
        id: 2,
        title: 'Thiết bị VR và Setup',
        type: 'technical',
        duration: '20 phút',
        content: 'Hướng dẫn sử dụng các thiết bị VR và thiết lập môi trường làm việc.'
      },
      {
        id: 3,
        title: 'Thực hành tạo VR Tour',
        type: 'hands_on',
        duration: '45 phút',
        content: 'Workshop thực hành tạo tour VR cho di tích lịch sử.'
      },
      {
        id: 4,
        title: 'Đánh giá và tối ưu hóa',
        type: 'evaluation',
        duration: '10 phút',
        content: 'Phương pháp đánh giá chất lượng và tối ưu hóa VR experience.'
      }
    ],
    quiz: [
      {
        question: 'VR có những ưu điểm gì trong việc bảo tồn di sản văn hóa?',
        options: [
          'Chỉ tạo ra hình ảnh đẹp',
          'Tái tạo trải nghiệm immersive và bảo tồn lâu dài',
          'Thay thế hoàn toàn tham quan thực tế',
          'Chỉ phục vụ giải trí'
        ],
        correct: 1
      },
      {
        question: 'Yếu tố nào quan trọng nhất khi thiết kế VR tour di sản?',
        options: [
          'Đồ họa đẹp mắt',
          'Tính tương tác cao',
          'Độ chính xác lịch sử và trải nghiệm người dùng',
          'Âm thanh sống động'
        ],
        correct: 2
      }
    ],
    resources: [
      { name: 'Unity VR Development Kit', url: '#', type: 'software' },
      { name: 'Historical Sites 3D Models', url: '#', type: 'assets' },
      { name: 'VR Design Best Practices', url: '#', type: 'guide' }
    ],
    relatedLessons: [1, 4, 8]
  },
  {
    id: 4,
    title: 'Thực hành - Tạo nội dung số cho di sản',
    description: 'Hướng dẫn thực hành tạo ra các sản phẩm số hóa di sản văn hóa sử dụng các công cụ AI và VR tiên tiến.',
    type: 'Thực hành',
    difficulty: 'Nâng cao',
    duration: '120 phút',
    shortCode: 'SP',
    bgColor: 'from-orange-500 to-red-600',
    students: 234,
    rating: 4.7,
    category: 'Thực hành',
    instructor: 'TS. Phạm Thị Digital',
    videoUrl: 'https://example.com/video4.mp4',
    thumbnail: 'https://picsum.photos/800/450?random=4',
    totalSteps: 15,
    estimatedTime: '120 phút',
    objectives: [
      'Thành thạo các công cụ số hóa di sản văn hóa',
      'Tạo ra sản phẩm số chất lượng cao',
      'Áp dụng AI trong quy trình sản xuất',
      'Quản lý dự án số hóa từ A đến Z'
    ],
    steps: [
      {
        id: 1,
        title: 'Khảo sát và lên kế hoạch',
        type: 'planning',
        duration: '20 phút',
        content: 'Phương pháp khảo sát di sản và lập kế hoạch số hóa chi tiết.'
      },
      {
        id: 2,
        title: 'Thu thập dữ liệu 3D',
        type: 'data_collection',
        duration: '30 phút',
        content: 'Sử dụng các công nghệ scan 3D và photogrammetry.'
      },
      {
        id: 3,
        title: 'Xử lý và tối ưu mô hình',
        type: 'processing',
        duration: '40 phút',
        content: 'Xử lý dữ liệu 3D và tối ưu hóa cho các ứng dụng khác nhau.'
      },
      {
        id: 4,
        title: 'Tích hợp AI và tương tác',
        type: 'integration',
        duration: '30 phút',
        content: 'Tích hợp AI chatbot và các tính năng tương tác thông minh.'
      }
    ],
    quiz: [
      {
        question: 'Bước đầu tiên quan trọng nhất trong số hóa di sản là gì?',
        options: [
          'Chọn công nghệ phù hợp',
          'Khảo sát và đánh giá tình trạng di sản',
          'Thiết lập ngân sách',
          'Tuyển dụng nhân sự'
        ],
        correct: 1
      },
      {
        question: 'AI có thể hỗ trợ gì trong quá trình số hóa di sản?',
        options: [
          'Chỉ tạo ra hình ảnh',
          'Tự động hóa quy trình, nâng cao chất lượng và tạo nội dung tương tác',
          'Thay thế hoàn toàn con người',
          'Chỉ lưu trữ dữ liệu'
        ],
        correct: 1
      }
    ],
    resources: [
      { name: 'Blender 3D Modeling Guide', url: '#', type: 'tutorial' },
      { name: 'AI Tools for Heritage', url: '#', type: 'tools' },
      { name: 'Digital Asset Management', url: '#', type: 'system' }
    ],
    relatedLessons: [3, 6, 7]
  },
  {
    id: 5,
    title: 'Chuyên đề - AI trong âm nhạc dân tộc',
    description: 'Khám phá ứng dụng trí tuệ nhân tạo trong phân tích, sáng tác và bảo tồn âm nhạc dân tộc Việt Nam.',
    type: 'Chuyên đề',
    difficulty: 'Trung bình',
    duration: '60 phút',
    shortCode: 'MU',
    bgColor: 'from-indigo-500 to-blue-600',
    students: 789,
    rating: 4.5,
    category: 'Chuyên đề',
    instructor: 'PGS. Nguyễn Âm Nhạc',
    videoUrl: 'https://example.com/video5.mp4',
    thumbnail: 'https://picsum.photos/800/450?random=5',
    totalSteps: 8,
    estimatedTime: '60 phút',
    objectives: [
      'Hiểu được đặc điểm âm nhạc dân tộc Việt Nam',
      'Ứng dụng AI trong phân tích âm thanh',
      'Tạo ra các công cụ hỗ trợ sáng tác',
      'Bảo tồn âm nhạc truyền thống bằng công nghệ'
    ],
    steps: [
      {
        id: 1,
        title: 'Tổng quan âm nhạc dân tộc',
        type: 'overview',
        duration: '10 phút',
        content: 'Giới thiệu về âm nhạc dân tộc Việt Nam và tầm quan trọng trong văn hóa.'
      },
      {
        id: 2,
        title: 'AI và xử lý âm thanh',
        type: 'technical',
        duration: '15 phút',
        content: 'Các thuật toán AI để phân tích và xử lý âm thanh truyền thống.'
      },
      {
        id: 3,
        title: 'Thực hành phân tích nhạc cụ',
        type: 'analysis',
        duration: '20 phút',
        content: 'Sử dụng AI để phân tích âm thanh của các nhạc cụ dân tộc.'
      },
      {
        id: 4,
        title: 'Sáng tác với AI Assistant',
        type: 'creative',
        duration: '15 phút',
        content: 'Tạo ra giai điệu mới dựa trên phong cách âm nhạc truyền thống.'
      }
    ],
    quiz: [
      {
        question: 'AI có thể hỗ trợ bảo tồn âm nhạc dân tộc như thế nào?',
        options: [
          'Chỉ ghi âm và lưu trữ',
          'Phân tích, số hóa và tái tạo các đặc trưng âm nhạc',
          'Thay thế hoàn toàn nghệ sĩ',
          'Chỉ tạo nhạc mới'
        ],
        correct: 1
      },
      {
        question: 'Thử thách lớn nhất khi ứng dụng AI vào âm nhạc dân tộc là gì?',
        options: [
          'Thiếu dữ liệu training',
          'Bảo tồn tinh thần và đặc trưng văn hóa trong quá trình số hóa',
          'Chi phí cao',
          'Công nghệ chưa đủ mạnh'
        ],
        correct: 1
      }
    ],
    resources: [
      { name: 'Vietnamese Music Database', url: '#', type: 'database' },
      { name: 'Audio Analysis Tools', url: '#', type: 'software' },
      { name: 'Music AI Research Papers', url: '#', type: 'research' }
    ],
    relatedLessons: [1, 2, 7]
  },
  {
    id: 6,
    title: 'Workshop - Xây dựng museum ảo',
    description: 'Workshop thực hành xây dựng bảo tàng ảo tương tác, kết hợp AI và VR để tạo trải nghiệm văn hóa immersive.',
    type: 'Workshop',
    difficulty: 'Nâng cao',
    duration: '180 phút',
    shortCode: 'WS',
    bgColor: 'from-teal-500 to-cyan-600',
    students: 156,
    rating: 4.8,
    category: 'Workshop',
    instructor: 'TS. Trần Museum Ảo',
    videoUrl: 'https://example.com/video6.mp4',
    thumbnail: 'https://picsum.photos/800/450?random=6',
    totalSteps: 20,
    estimatedTime: '180 phút',
    objectives: [
      'Thiết kế và xây dựng museum ảo hoàn chỉnh',
      'Tích hợp AI docent và hướng dẫn viên ảo',
      'Tạo trải nghiệm tương tác phong phú',
      'Triển khai và vận hành museum ảo'
    ],
    steps: [
      {
        id: 1,
        title: 'Concept và thiết kế',
        type: 'design',
        duration: '30 phút',
        content: 'Lên concept và thiết kế tổng thể cho museum ảo.'
      },
      {
        id: 2,
        title: 'Xây dựng không gian 3D',
        type: 'modeling',
        duration: '45 phút',
        content: 'Tạo các không gian trưng bày 3D chi tiết và chân thực.'
      },
      {
        id: 3,
        title: 'Tích hợp nội dung số',
        type: 'integration',
        duration: '40 phút',
        content: 'Đưa các hiện vật số và nội dung tương tác vào museum.'
      },
      {
        id: 4,
        title: 'AI Docent Development',
        type: 'ai_development',
        duration: '35 phút',
        content: 'Phát triển hệ thống AI docent thông minh và tương tác.'
      },
      {
        id: 5,
        title: 'Testing và Deploy',
        type: 'deployment',
        duration: '30 phút',
        content: 'Kiểm thử toàn hệ thống và triển khai museum ảo.'
      }
    ],
    quiz: [
      {
        question: 'Yếu tố nào quan trọng nhất trong thiết kế museum ảo?',
        options: [
          'Đồ họa 3D đẹp',
          'Trải nghiệm người dùng và tính giáo dục',
          'Công nghệ tiên tiến nhất',
          'Số lượng hiện vật nhiều'
        ],
        correct: 1
      },
      {
        question: 'AI docent có thể cung cấp những tính năng gì?',
        options: [
          'Chỉ trả lời câu hỏi đơn giản',
          'Hướng dẫn cá nhân hóa, giải thích chuyên sâu và tương tác thông minh',
          'Chỉ đọc thông tin có sẵn',
          'Thay thế hoàn toàn hướng dẫn viên thật'
        ],
        correct: 1
      }
    ],
    resources: [
      { name: 'Museum VR Framework', url: '#', type: 'framework' },
      { name: 'AI Docent SDK', url: '#', type: 'sdk' },
      { name: 'Museum Assets Library', url: '#', type: 'assets' }
    ],
    relatedLessons: [3, 4, 8]
  },
  {
    id: 7,
    title: 'AI Painting - Tái tạo tranh cổ Huế',
    description: 'Sử dụng AI để phân tích và tái tạo các tác phẩm hội họa cổ Huế, học cách ứng dụng GAN và style transfer.',
    type: 'Miễn phí',
    difficulty: 'Cơ bản',
    duration: '50 phút',
    shortCode: 'AP',
    bgColor: 'from-rose-500 to-orange-500',
    students: 2134,
    rating: 4.9,
    category: 'AI',
    instructor: 'ThS. Lê Hội Họa AI',
    videoUrl: 'https://example.com/video7.mp4',
    thumbnail: 'https://picsum.photos/800/450?random=7',
    totalSteps: 6,
    estimatedTime: '50 phút',
    objectives: [
      'Hiểu về nghệ thuật hội họa cổ Huế',
      'Ứng dụng GAN và style transfer',
      'Tái tạo và phục hồi tranh cổ',
      'Sáng tạo tác phẩm mới theo phong cách truyền thống'
    ],
    steps: [
      {
        id: 1,
        title: 'Nghệ thuật hội họa Huế',
        type: 'cultural',
        duration: '10 phút',
        content: 'Tìm hiểu về đặc trưng nghệ thuật hội họa cổ Huế.'
      },
      {
        id: 2,
        title: 'GAN và Style Transfer',
        type: 'technical',
        duration: '15 phút',
        content: 'Học về các thuật toán GAN và style transfer trong AI.'
      },
      {
        id: 3,
        title: 'Thực hành tái tạo tranh',
        type: 'hands_on',
        duration: '20 phút',
        content: 'Sử dụng AI để tái tạo và phục hồi tranh cổ hư hỏng.'
      },
      {
        id: 4,
        title: 'Tạo tác phẩm mới',
        type: 'creative',
        duration: '5 phút',
        content: 'Sáng tạo tranh mới theo phong cách hội họa Huế truyền thống.'
      }
    ],
    quiz: [
      {
        question: 'Style transfer trong AI painting hoạt động như thế nào?',
        options: [
          'Copy trực tiếp từ tranh gốc',
          'Học phong cách và áp dụng lên nội dung mới',
          'Chỉ thay đổi màu sắc',
          'Tạo tranh hoàn toàn mới'
        ],
        correct: 1
      },
      {
        question: 'Ưu điểm của AI trong việc phục hồi tranh cổ là gì?',
        options: [
          'Nhanh và rẻ',
          'Có thể phục hồi chi tiết đã mất và dự đoán phần bị hư hỏng',
          'Thay thế hoàn toàn thủ công',
          'Tạo ra tranh đẹp hơn bản gốc'
        ],
        correct: 1
      }
    ],
    resources: [
      { name: 'StyleGAN Tutorial', url: '#', type: 'tutorial' },
      { name: 'Hue Paintings Dataset', url: '#', type: 'dataset' },
      { name: 'AI Art Tools Collection', url: '#', type: 'tools' }
    ],
    relatedLessons: [1, 4, 5]
  },
  {
    id: 8,
    title: 'VR Tour - Chùa Thiên Mụ 360°',
    description: 'Trải nghiệm thực tế ảo tại chùa Thiên Mụ với công nghệ VR 360°, tìm hiểu lịch sử và kiến trúc độc đáo.',
    type: 'VR Experience',
    difficulty: 'Cơ bản',
    duration: '40 phút',
    shortCode: 'VT',
    bgColor: 'from-emerald-500 to-teal-500',
    students: 987,
    rating: 4.7,
    category: 'VR',
    instructor: 'PGS. Phạm Lịch Sử VR',
    videoUrl: 'https://example.com/video8.mp4',
    thumbnail: 'https://picsum.photos/800/450?random=8',
    totalSteps: 7,
    estimatedTime: '40 phút',
    objectives: [
      'Khám phá lịch sử chùa Thiên Mụ',
      'Trải nghiệm kiến trúc VR 360°',
      'Hiểu về văn hóa Phật giáo Việt Nam',
      'Sử dụng thành thạo công nghệ VR'
    ],
    steps: [
      {
        id: 1,
        title: 'Giới thiệu chùa Thiên Mụ',
        type: 'introduction',
        duration: '5 phút',
        content: 'Tìm hiểu lịch sử và ý nghĩa văn hóa của chùa Thiên Mụ.'
      },
      {
        id: 2,
        title: 'VR Tour - Cổng chùa',
        type: 'vr_tour',
        duration: '8 phút',
        content: 'Khám phá cổng tam quan và kiến trúc đặc trưng.'
      },
      {
        id: 3,
        title: 'VR Tour - Tháp Phước Duyên',
        type: 'vr_tour',
        duration: '10 phút',
        content: 'Trải nghiệm 360° tháp 7 tầng nổi tiếng của chùa.'
      },
      {
        id: 4,
        title: 'VR Tour - Chánh điện',
        type: 'vr_tour',
        duration: '12 phút',
        content: 'Tham quan chánh điện và tìm hiểu về nghệ thuật trang trí.'
      },
      {
        id: 5,
        title: 'Tương tác với môi trường',
        type: 'interactive',
        duration: '5 phút',
        content: 'Thực hành các tính năng tương tác trong môi trường VR.'
      }
    ],
    quiz: [
      {
        question: 'Chùa Thiên Mụ được xây dựng vào thời gian nào?',
        options: [
          'Thế kỷ 16',
          'Thế kỷ 17 (1601)',
          'Thế kỷ 18',
          'Thế kỷ 19'
        ],
        correct: 1
      },
      {
        question: 'Tháp Phước Duyên có bao nhiêu tầng?',
        options: [
          '5 tầng',
          '6 tầng',
          '7 tầng',
          '8 tầng'
        ],
        correct: 2
      }
    ],
    resources: [
      { name: 'Thiên Mụ Pagoda History', url: '#', type: 'documentation' },
      { name: 'VR Navigation Guide', url: '#', type: 'guide' },
      { name: 'Buddhist Architecture Study', url: '#', type: 'study' }
    ],
    relatedLessons: [3, 6, 4]
  }
];

// Survey Questions Database (same as in BaiGiangMinhHoa)
const surveyQuestions = {
  pre: {
    title: "Khảo sát Cá nhân hóa Ban đầu",
    subtitle: "Giúp chúng tôi hiểu phong cách học và tâm lý học tập của bạn",
    icon: "🎯",
    color: "from-purple-500 to-purple-600",
    questions: [
      {
        id: "learning_style",
        type: "multiple",
        question: "Bạn học tốt nhất khi:",
        options: [
          { value: "visual", label: "Nhìn hình ảnh, sơ đồ, video", icon: "👁️" },
          { value: "auditory", label: "Nghe giảng, thảo luận", icon: "👂" },
          { value: "kinesthetic", label: "Thực hành, vận động", icon: "✋" },
          { value: "reading", label: "Đọc văn bản, ghi chú", icon: "📚" }
        ]
      },
      {
        id: "personality",
        type: "scale",
        question: "Mức độ tự tin khi học bài mới:",
        min: 1, max: 5,
        labels: { 1: "Rất lo lắng", 5: "Rất tự tin" }
      },
      {
        id: "motivation",
        type: "multiple",
        question: "Động lực học tập chính của bạn:",
        options: [
          { value: "career", label: "Phát triển sự nghiệp", icon: "💼" },
          { value: "interest", label: "Đam mê cá nhân", icon: "❤️" },
          { value: "requirement", label: "Yêu cầu công việc", icon: "📋" },
          { value: "curiosity", label: "Tò mò khám phá", icon: "🔍" }
        ]
      }
    ]
  },
  mid: {
    title: "Khảo sát Tiến độ Giữa kỳ",
    subtitle: "Đánh giá quá trình học và điều chỉnh phương pháp",
    icon: "📊",
    color: "from-orange-500 to-orange-600",
    questions: [
      {
        id: "difficulty_areas",
        type: "checkbox",
        question: "Những phần bạn thấy khó nhất:",
        options: [
          { value: "concepts", label: "Hiểu khái niệm", icon: "🧠" },
          { value: "practice", label: "Làm bài tập", icon: "✍️" },
          { value: "memory", label: "Ghi nhớ thông tin", icon: "🧩" },
          { value: "application", label: "Ứng dụng thực tế", icon: "⚡" }
        ]
      },
      {
        id: "progress_satisfaction",
        type: "scale",
        question: "Mức độ hài lòng với tiến độ học tập:",
        min: 1, max: 5,
        labels: { 1: "Rất không hài lòng", 5: "Rất hài lòng" }
      }
    ]
  },
  post: {
    title: "Khảo sát Đánh giá Cuối khóa",
    subtitle: "Đánh giá cải thiện và hiệu quả học tập tổng thể",
    icon: "🎉",
    color: "from-green-500 to-green-600",
    questions: [
      {
        id: "knowledge_improvement",
        type: "scale",
        question: "Mức độ cải thiện kiến thức sau khóa học:",
        min: 1, max: 5,
        labels: { 1: "Không cải thiện", 5: "Cải thiện rất nhiều" }
      },
      {
        id: "confidence_change",
        type: "scale",
        question: "Sự tự tin của bạn đã thay đổi thế nào:",
        min: 1, max: 5,
        labels: { 1: "Giảm đáng kể", 5: "Tăng đáng kể" }
      }
    ]
  }
};

const BaiHocMinhHoaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [_isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Survey States
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [currentSurveyType, setCurrentSurveyType] = useState(null);
  const [surveyStep, setSurveyStep] = useState(0);

  useEffect(() => {
    const foundLesson = lessonsData.find(l => l.id.toString() === id);
    if (foundLesson) {
      setLesson(foundLesson);
    }
  }, [id]);

  const handleStepComplete = (stepId) => {
    setProgress((stepId / lesson.totalSteps) * 100);
    if (stepId < lesson.totalSteps) {
      setCurrentStep(stepId + 1);
    }
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answerIndex
    });
  };

  // Survey Functions
  const handleSurveyOpen = (surveyType) => {
    setCurrentSurveyType(surveyType);
    setSurveyStep(0);
    setShowSurveyModal(true);
  };

  const submitQuiz = () => {
    setShowResults(true);
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-4">Không tìm thấy bài học</h2>
          <Link to="/bai-giang-minh-hoa" className="text-amber-600 hover:text-amber-800">
            ← Quay lại danh sách bài học
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-stone-500">
            <Link
              to="/"
              className="hover:text-stone-700 transition-colors"
            >
              Trang chủ
            </Link>
            <span>/</span>
            <Link
              to="/giaoduc"
              className="hover:text-stone-700 transition-colors"
            >
              Giáo dục
            </Link>
            <span>/</span>
            <Link
              to="/bai-giang-minh-hoa"
              className="hover:text-stone-700 transition-colors"
            >
              Bài học minh họa
            </Link>
            <span>/</span>
            <span className="text-stone-800 font-medium">{lesson.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Lesson Header */}
            <div className="mb-8 rounded-3xl border border-amber-200 bg-white p-8 shadow-lg">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${lesson.bgColor} px-4 py-2 text-sm font-medium text-white`}>
                      {lesson.shortCode} • {lesson.type}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                      {lesson.difficulty}
                    </span>
                    <span className="text-sm text-stone-600">⏱ {lesson.duration}</span>
                    <span className="text-sm text-stone-600">👥 {lesson.students} học viên</span>
                  </div>

                  <h1 className="mb-4 text-3xl font-serif font-bold text-stone-800 sm:text-4xl">
                    {lesson.title}
                  </h1>

                  <p className="mb-6 text-lg text-stone-600 leading-relaxed">
                    {lesson.description}
                  </p>

                  <div className="flex items-center space-x-6 text-sm text-stone-600">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                        <span className="text-white font-bold">
                          {lesson.instructor.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-stone-800">{lesson.instructor}</p>
                        <p className="text-xs">Giảng viên</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-medium">{lesson.rating}/5</span>
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex-shrink-0">
                  <Link
                    to="/bai-giang-minh-hoa"
                    className="inline-flex items-center space-x-2 rounded-full border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-2 text-sm font-medium text-amber-700 hover:from-amber-100 hover:to-orange-100 hover:border-amber-400 transition-all shadow-sm hover:shadow-md"
                  >
                    <span>←</span>
                    <span>Quay lại danh sách</span>
                  </Link>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-stone-700">Tiến độ học tập</span>
                  <span className="text-sm text-stone-600">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Learning Objectives */}
              {lesson.objectives && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-serif text-lg font-bold text-blue-900 mb-4">Mục tiêu học tập</h3>
                  <ul className="space-y-2">
                    {lesson.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">✓</span>
                        <span className="text-blue-800">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Content Tabs */}
            <div className="mb-8 rounded-3xl border border-amber-200 bg-white shadow-lg overflow-hidden">
              {/* Tab Headers */}
              <div className="border-b border-amber-200 bg-amber-50">
                <nav className="flex space-x-8 px-8 py-4">
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'content'
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-stone-500 hover:text-stone-700'
                      }`}
                  >
                    📚 Nội dung bài học
                  </button>
                  {lesson.quiz && lesson.quiz.length > 0 && (
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'quiz'
                        ? 'border-amber-500 text-amber-600'
                        : 'border-transparent text-stone-500 hover:text-stone-700'
                        }`}
                    >
                      📝 Bài kiểm tra
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('resources')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'resources'
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-stone-500 hover:text-stone-700'
                      }`}
                  >
                    📎 Tài liệu tham khảo
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'content' && (
                  <div className="space-y-8">
                    {/* Video Player */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                      <img
                        src={lesson.thumbnail}
                        alt={lesson.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <button
                          onClick={() => setIsVideoPlaying(true)}
                          className="h-20 w-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all hover:scale-110"
                        >
                          <svg className="h-8 w-8 text-stone-700 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-black/50 rounded-lg p-3 text-white">
                          <h3 className="font-medium mb-1">{lesson.title}</h3>
                          <p className="text-sm opacity-90">Thời lượng: {lesson.estimatedTime}</p>
                        </div>
                      </div>
                    </div>

                    {/* Lesson Steps */}
                    {lesson.steps && (
                      <div className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold text-stone-800">Các bước học tập</h2>
                        {lesson.steps.map((step) => (
                          <div
                            key={step.id}
                            className={`border rounded-2xl p-6 transition-all ${currentStep === step.id
                              ? 'border-amber-400 bg-amber-50'
                              : currentStep > step.id
                                ? 'border-green-400 bg-green-50'
                                : 'border-stone-200 bg-white'
                              }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${currentStep > step.id ? 'bg-green-500' :
                                  currentStep === step.id ? 'bg-amber-500' : 'bg-stone-400'
                                  }`}>
                                  {currentStep > step.id ? '✓' : step.id}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-stone-800">{step.title}</h3>
                                  <p className="text-sm text-stone-600">{step.duration} • {step.type}</p>
                                </div>
                              </div>

                              {currentStep === step.id && (
                                <button
                                  onClick={() => handleStepComplete(step.id)}
                                  className="rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
                                >
                                  Hoàn thành
                                </button>
                              )}
                            </div>

                            {currentStep >= step.id && (
                              <div className="mt-4 pl-14">
                                <p className="text-stone-700">{step.content}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'quiz' && lesson.quiz && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-bold text-stone-800">Bài kiểm tra</h2>

                    {!showResults ? (
                      <div className="space-y-8">
                        {lesson.quiz.map((question, qIndex) => (
                          <div key={qIndex} className="border border-stone-200 rounded-2xl p-6 bg-white">
                            <h3 className="font-semibold text-stone-800 mb-4">
                              Câu {qIndex + 1}: {question.question}
                            </h3>
                            <div className="space-y-3">
                              {question.options.map((option, oIndex) => (
                                <label
                                  key={oIndex}
                                  className="flex items-center space-x-3 cursor-pointer hover:bg-stone-50 rounded-lg p-2"
                                >
                                  <input
                                    type="radio"
                                    name={`question-${qIndex}`}
                                    value={oIndex}
                                    onChange={() => handleQuizAnswer(qIndex, oIndex)}
                                    className="h-4 w-4 text-amber-500"
                                  />
                                  <span className="text-stone-700">{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}

                        <button
                          onClick={submitQuiz}
                          disabled={Object.keys(userAnswers).length < lesson.quiz.length}
                          className="w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 font-semibold text-white transition-all hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Nộp bài kiểm tra
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="text-center p-8 bg-green-50 rounded-2xl border border-green-200">
                          <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl">✓</span>
                          </div>
                          <h3 className="text-xl font-bold text-green-800 mb-2">Hoàn thành bài kiểm tra!</h3>
                          <p className="text-green-700">
                            Điểm số: {Object.keys(userAnswers).reduce((score, qIndex) =>
                              userAnswers[qIndex] === lesson.quiz[qIndex].correct ? score + 1 : score, 0
                            )}/{lesson.quiz.length}
                          </p>
                        </div>

                        {lesson.quiz.map((question, qIndex) => (
                          <div key={qIndex} className="border rounded-2xl p-6 bg-white">
                            <h3 className="font-semibold text-stone-800 mb-4">
                              Câu {qIndex + 1}: {question.question}
                            </h3>
                            <div className="space-y-2">
                              {question.options.map((option, oIndex) => (
                                <div
                                  key={oIndex}
                                  className={`p-3 rounded-lg ${oIndex === question.correct
                                    ? 'bg-green-100 border border-green-300'
                                    : oIndex === userAnswers[qIndex] && oIndex !== question.correct
                                      ? 'bg-red-100 border border-red-300'
                                      : 'bg-stone-50'
                                    }`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <span className={`h-4 w-4 rounded-full ${oIndex === question.correct ? 'bg-green-500' :
                                      oIndex === userAnswers[qIndex] && oIndex !== question.correct ? 'bg-red-500' : 'bg-stone-300'
                                      }`}></span>
                                    <span className="text-stone-700">{option}</span>
                                    {oIndex === question.correct && (
                                      <span className="text-green-600 font-medium">✓ Đáp án đúng</span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-bold text-stone-800">Tài liệu tham khảo</h2>

                    {lesson.resources && lesson.resources.length > 0 ? (
                      <div className="grid gap-4">
                        {lesson.resources.map((resource, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-stone-200 rounded-xl bg-white hover:bg-stone-50">
                            <div className="flex items-center space-x-4">
                              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600">
                                  {resource.type === 'documentation' ? '📚' :
                                    resource.type === 'dataset' ? '📊' :
                                      resource.type === 'code' ? '💻' : '📎'}
                                </span>
                              </div>
                              <div>
                                <h3 className="font-medium text-stone-800">{resource.name}</h3>
                                <p className="text-sm text-stone-600 capitalize">{resource.type}</p>
                              </div>
                            </div>
                            <button className="rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600">
                              Tải về
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="h-16 w-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-stone-400 text-2xl">📎</span>
                        </div>
                        <h3 className="text-lg font-medium text-stone-600 mb-2">Chưa có tài liệu</h3>
                        <p className="text-stone-500">Tài liệu tham khảo sẽ được cập nhật sớm.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Course Progress */}
              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">Tiến độ khóa học</h3>
                <div className="text-center mb-4">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#f59e0b"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2.51 * progress} 251.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-stone-800">{Math.round(progress)}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-stone-600">
                    {currentStep}/{lesson.totalSteps} bước hoàn thành
                  </p>
                </div>
              </div>

              {/* Survey Section */}
              <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">📋 Khảo sát 3 Giai đoạn</h3>
                <p className="text-sm text-stone-600 mb-4">Cá nhân hóa trải nghiệm học tập của bạn</p>
                <div className="space-y-3">
                  <button
                    onClick={() => handleSurveyOpen('pre')}
                    className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3 text-sm font-medium text-white hover:from-purple-600 hover:to-purple-700 transition-all"
                  >
                    🎯 Khảo sát Ban đầu
                  </button>
                  <button
                    onClick={() => handleSurveyOpen('mid')}
                    className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-medium text-white hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    📊 Khảo sát Giữa kỳ
                  </button>
                  <button
                    onClick={() => handleSurveyOpen('post')}
                    className="w-full rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 text-sm font-medium text-white hover:from-green-600 hover:to-green-700 transition-all"
                  >
                    🎉 Khảo sát Cuối kỳ
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">Hành động nhanh</h3>
                <div className="space-y-3">
                  <button className="w-full rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium text-white hover:bg-blue-600 transition-colors">
                    🔖 Đánh dấu trang
                  </button>
                  <button className="w-full rounded-lg bg-green-500 px-4 py-3 text-sm font-medium text-white hover:bg-green-600 transition-colors">
                    📤 Chia sẻ
                  </button>
                  <button className="w-full rounded-lg bg-purple-500 px-4 py-3 text-sm font-medium text-white hover:bg-purple-600 transition-colors">
                    📝 Ghi chú
                  </button>
                  <button className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
                    📥 Tải về offline
                  </button>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">Điều hướng nhanh</h3>
                <div className="space-y-3">
                  <Link
                    to="/bai-giang-minh-hoa"
                    className="block w-full text-left p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">📚</span>
                      <div>
                        <div className="font-medium text-stone-800 group-hover:text-amber-700">Tất cả bài học</div>
                        <div className="text-xs text-stone-600">Danh sách đầy đủ</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/giaoduc"
                    className="block w-full text-left p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🎓</span>
                      <div>
                        <div className="font-medium text-stone-800 group-hover:text-blue-700">Trang Giáo dục</div>
                        <div className="text-xs text-stone-600">Hệ thống học tập</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/"
                    className="block w-full text-left p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">🏠</span>
                      <div>
                        <div className="font-medium text-stone-800 group-hover:text-green-700">Trang chủ</div>
                        <div className="text-xs text-stone-600">Về trang chính</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Related Lessons */}
              <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-serif font-bold text-stone-800">Bài học liên quan</h3>
                <div className="space-y-4">
                  {lesson.relatedLessons && lesson.relatedLessons.map((relatedId) => {
                    const relatedLesson = lessonsData.find(l => l.id === relatedId);
                    if (!relatedLesson) return null;

                    return (
                      <div
                        key={relatedId}
                        onClick={() => navigate(`/bai-hoc-minh-hoa/${relatedId}`)}
                        className="group cursor-pointer rounded-xl border border-stone-200 p-4 transition-all hover:border-amber-300 hover:bg-amber-50"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`h-10 w-10 rounded-lg bg-gradient-to-r ${relatedLesson.bgColor} flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white text-sm font-bold">{relatedLesson.shortCode}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-stone-800 group-hover:text-amber-700 line-clamp-2 mb-1">
                              {relatedLesson.title}
                            </h4>
                            <p className="text-xs text-stone-600">{relatedLesson.duration} • {relatedLesson.difficulty}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-stone-800 mb-2">Tiếp tục học tập</h2>
            <p className="text-stone-600">Khám phá thêm các bài học và trang khác</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/bai-giang-minh-hoa"
              className="group p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-white text-xl">
                  📚
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-amber-700">Tất cả bài học</h3>
                  <p className="text-sm text-stone-600">Danh sách bài học minh họa</p>
                </div>
              </div>
            </Link>

            <Link
              to="/giaoduc"
              className="group p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                  🎓
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-blue-700">Trang Giáo dục</h3>
                  <p className="text-sm text-stone-600">Tổng quan hệ thống</p>
                </div>
              </div>
            </Link>

            <Link
              to="/"
              className="group p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
                  🏠
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 group-hover:text-green-700">Trang chủ</h3>
                  <p className="text-sm text-stone-600">Về trang chính</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-6">
            <div className="flex justify-center space-x-4">
              <Link
                to="/phantichgocnhin"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all text-sm font-medium"
              >
                <span>🔍</span>
                <span>Phân tích góc nhìn</span>
              </Link>
              <Link
                to="/vanhoalichsu"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-all text-sm font-medium"
              >
                <span>🏛️</span>
                <span>Văn hóa lịch sử</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Survey Modal */}
      {showSurveyModal && currentSurveyType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {(() => {
              const currentSurvey = surveyQuestions[currentSurveyType];
              const currentQuestion = currentSurvey.questions[surveyStep];
              const totalQuestions = currentSurvey.questions.length;
              const progress = ((surveyStep + 1) / totalQuestions) * 100;

              const handleAnswer = (answer) => {
                console.log('Survey Answer:', {
                  lessonId: lesson.id,
                  lessonTitle: lesson.title,
                  surveyType: currentSurveyType,
                  questionId: currentQuestion.id,
                  answer: answer,
                  step: surveyStep + 1,
                  total: totalQuestions
                });

                // Move to next question or finish survey
                if (surveyStep < totalQuestions - 1) {
                  setSurveyStep(surveyStep + 1);
                } else {
                  // Survey completed
                  alert(`🎉 Hoàn thành ${currentSurvey.title}!\n\nCảm ơn bạn đã tham gia khảo sát cho bài học "${lesson.title}". Hệ thống AI sẽ cá nhân hóa phương pháp học phù hợp với bạn.`);
                  setShowSurveyModal(false);
                  setCurrentSurveyType(null);
                  setSurveyStep(0);
                }
              };

              const handleClose = () => {
                setShowSurveyModal(false);
                setCurrentSurveyType(null);
                setSurveyStep(0);
              };

              return (
                <>
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${currentSurvey.color} p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{currentSurvey.icon}</span>
                        <div>
                          <h2 className="text-xl font-bold">{currentSurvey.title}</h2>
                          <p className="text-sm opacity-90">{currentSurvey.subtitle}</p>
                          <p className="text-xs opacity-75">Bài học: {lesson.title}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleClose}
                        className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                      >
                        <span className="text-xl">×</span>
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Câu hỏi {surveyStep + 1} / {totalQuestions}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 bg-white bg-opacity-30 rounded-full">
                        <div
                          className="h-2 bg-white rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">
                      {currentQuestion.question}
                    </h3>

                    {/* Multiple Choice Questions */}
                    {currentQuestion.type === 'multiple' && (
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswer(option.value)}
                            className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all group"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{option.icon}</span>
                              <span className="font-medium group-hover:text-purple-700">{option.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Scale Questions */}
                    {currentQuestion.type === 'scale' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{currentQuestion.labels[currentQuestion.min]}</span>
                          <span className="text-sm text-gray-500">{currentQuestion.labels[currentQuestion.max]}</span>
                        </div>
                        <div className="flex justify-between space-x-2">
                          {Array.from({ length: currentQuestion.max }, (_, i) => (
                            <button
                              key={i + 1}
                              onClick={() => handleAnswer(i + 1)}
                              className={`flex-1 py-3 px-2 rounded-xl border-2 font-semibold transition-all ${i + 1 <= 2 ? 'border-red-200 hover:border-red-400 hover:bg-red-50 hover:text-red-700' :
                                  i + 1 === 3 ? 'border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700' :
                                    'border-green-200 hover:border-green-400 hover:bg-green-50 hover:text-green-700'
                                }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Checkbox Questions */}
                    {currentQuestion.type === 'checkbox' && (
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <label
                            key={index}
                            className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all group"
                          >
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                            />
                            <span className="text-2xl">{option.icon}</span>
                            <span className="font-medium group-hover:text-purple-700">{option.label}</span>
                          </label>
                        ))}
                        <button
                          onClick={() => handleAnswer('multiple_selections')}
                          className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all"
                        >
                          Tiếp tục
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Navigation Footer */}
                  <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                    <button
                      onClick={() => surveyStep > 0 && setSurveyStep(surveyStep - 1)}
                      disabled={surveyStep === 0}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 font-medium transition-colors"
                    >
                      ← Trước
                    </button>

                    <div className="text-sm text-gray-500">
                      Cá nhân hóa cho: {lesson.title}
                    </div>

                    <button
                      onClick={() => handleAnswer('skip')}
                      className="px-4 py-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
                    >
                      Bỏ qua →
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default BaiHocMinhHoaDetail;
