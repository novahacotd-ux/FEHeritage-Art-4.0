// Mock data cho trang Tài liệu & Bài giảng
export const periodsData = [
  {
    id: 'bac-thuoc',
    name: 'Thời kỳ Bắc thuộc',
    period: '111 TCN - 939 SCN',
    color: 'from-red-500 to-orange-500',
    description: 'Thời kỳ Việt Nam bị các triều đại phương Bắc thống trị',
    documents: [
      {
        id: 1,
        title: 'Khởi nghĩa Hai Bà Trưng',
        description: 'Cuộc khởi nghĩa chống ách đô hộ phương Bắc của hai chị em Trưng Trắc và Trưng Nhị trong thế kỷ thứ nhất sau Công nguyên.',
        type: 'Bài giảng',
        duration: '45 phút',
        durationSeconds: 2700,
        level: 'Trung cấp',
        views: '2,340',
        rating: 4.8,
        author: 'GS. Nguyễn Văn Huyền',
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        downloadCount: 1250,
        createdDate: '2024-09-15',
        category: 'Lịch sử',
        hasSubtitles: true,
        hasTranscript: true,
        videoUrl: 'https://www.youtube.com/watch?v=vqvXYvF4Yes' // Mock URL
      },
      {
        id: 2,
        title: 'Khởi nghĩa Bà Triệu',
        description: 'Tìm hiểu về cuộc khởi nghĩa anh dũng của Bà Triệu chống lại sự đô hộ của nhà Ngô Đông, thể hiện tinh thần yêu nước bất khuất của dân tộc Việt Nam.',
        type: 'Tài liệu',
        pages: 45,
        level: 'Cao cấp',
        views: '1,890',
        rating: 4.6,
        author: 'PGS. Trần Thị Mai',
        thumbnail: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop',
        downloadCount: 867,
        createdDate: '2024-08-22',
        category: 'Lịch sử',
        fileSize: '2.3 MB',
        language: 'Tiếng Việt',
        publisher: 'NXB Giáo dục Việt Nam',
        format: 'PDF'
      },
      {
        id: 5,
        title: 'Văn hóa Đại Việt thời Bắc thuộc',
        description: 'Nghiên cứu về đời sống văn hóa, tín ngưỡng và các giá trị truyền thống của người Việt trong thời kỳ Bắc thuộc.',
        type: 'Tài liệu',
        pages: 120,
        level: 'Trung cấp',
        views: '3,240',
        rating: 4.7,
        author: 'TS. Lê Văn Thành',
        thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
        downloadCount: 1456,
        createdDate: '2024-07-18',
        category: 'Văn hóa',
        fileSize: '5.8 MB',
        language: 'Tiếng Việt',
        publisher: 'NXB Khoa học Xã hội',
        format: 'PDF'
      }
    ]
  },
  {
    id: 'ly-tran',
    name: 'Thời kỳ Lý - Trần',
    period: '1009 - 1400',
    color: 'from-blue-500 to-indigo-500',
    description: 'Thời kỳ phát triển rực rỡ của văn hóa và kinh tế Đại Việt',
    documents: [
      {
        id: 3,
        title: 'Lý Thái Tổ - Người khai sáng triều Lý',
        description: 'Tìm hiểu về cuộc đời, sự nghiệp và những đóng góp to lớn của vua Lý Thái Tổ trong việc xây dựng đất nước.',
        type: 'Bài giảng',
        duration: '40 phút',
        durationSeconds: 2400,
        level: 'Trung cấp',
        views: '2,890',
        rating: 4.7,
        author: 'GS. Phạm Đức Minh',
        thumbnail: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop',
        downloadCount: 1567,
        createdDate: '2024-09-28',
        category: 'Lịch sử',
        hasSubtitles: true,
        hasTranscript: true,
        videoUrl: 'https://example.com/video/ly-thai-to.mp4'
      },
      {
        id: 4,
        title: 'Kinh tế Đại Việt thời Lý-Trần',
        description: 'Phân tích chính sách kinh tế, hệ thống thuế khóa, thương mại và phát triển nông nghiệp thời Lý-Trần.',
        type: 'Tài liệu',
        pages: 78,
        level: 'Cao cấp',
        views: '2,450',
        rating: 4.5,
        author: 'TS. Hoàng Minh Tuấn',
        thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
        downloadCount: 1023,
        createdDate: '2024-09-05',
        category: 'Kinh tế',
        fileSize: '3.7 MB',
        language: 'Tiếng Việt',
        publisher: 'NXB Đại học Quốc gia',
        format: 'PDF'
      },
      {
        id: 6,
        title: 'Triết lý Phật giáo thời Trần',
        description: 'Nghiên cứu sâu về tư tưởng Phật giáo Việt Nam, đặc biệt học thuyết Thiền tông và ảnh hưởng đến xã hội.',
        type: 'Tài liệu',
        pages: 156,
        level: 'Cao cấp',
        views: '1,890',
        rating: 4.8,
        author: 'GS. Nguyễn Thị Lan',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        downloadCount: 923,
        createdDate: '2024-06-30',
        category: 'Triết học',
        fileSize: '6.2 MB',
        language: 'Tiếng Việt',
        publisher: 'NXB Tôn giáo',
        format: 'PDF'
      }
    ]
  },
  {
    id: 'tay-son',
    name: 'Thời kỳ Tây Sơn',
    period: '1771 - 1802',
    color: 'from-green-500 to-emerald-500',
    description: 'Thời kỳ cách mạng nông dân và thống nhất đất nước',
    documents: [
      {
        id: 7,
        title: 'Khởi nghĩa Tây Sơn và cuộc cải cách xã hội',
        description: 'Nghiên cứu về phong trào nông dân Tây Sơn, các chính sách cải cách tiến bộ và ảnh hưởng lịch sử.',
        type: 'Tài liệu',
        pages: 95,
        level: 'Trung cấp',
        views: '3,120',
        rating: 4.6,
        author: 'PGS.TS Võ Văn Sáng',
        thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=300&fit=crop',
        downloadCount: 1287,
        createdDate: '2024-08-15',
        category: 'Lịch sử',
        fileSize: '4.1 MB',
        language: 'Tiếng Việt',
        publisher: 'NXB Chính trị Quốc gia',
        format: 'PDF'
      },
      {
        id: 8,
        title: 'Nguyễn Huệ - Hoàng đế Quang Trung',
        description: 'Tiểu sử và chiến công hiển hách của vị anh hùng dân tộc Nguyễn Huệ trong việc đánh đuổi quân Thanh.',
        type: 'Bài giảng',
        duration: '50 phút',
        durationSeconds: 3000,
        level: 'Trung cấp',
        views: '4,567',
        rating: 4.9,
        author: 'GS. Trần Quốc Vượng',
        thumbnail: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=300&fit=crop',
        downloadCount: 2145,
        createdDate: '2024-07-22',
        category: 'Lịch sử',
        hasSubtitles: true,
        hasTranscript: true,
        videoUrl: 'https://example.com/video/nguyen-hue.mp4'
      }
    ]
  },
  {
    id: 'nguyen',
    name: 'Thời kỳ Nguyễn',
    period: '1802 - 1945',
    color: 'from-purple-500 to-pink-500',
    description: 'Triều đại cuối cùng của Việt Nam phong kiến',
    documents: [
      {
        id: 9,
        title: 'Kinh thành Huế - Di sản văn hóa thế giới',
        description: 'Khám phá kiến trúc cung đình, lăng tẩm và đời sống văn hóa tại kinh đô Huế thời Nguyễn.',
        type: 'Tài liệu',
        pages: 142,
        level: 'Trung cấp',
        views: '5,234',
        rating: 4.8,
        author: 'TS. Ngô Đức Thịnh',
        thumbnail: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop',
        downloadCount: 2456,
        createdDate: '2024-05-10',
        category: 'Văn hóa',
        fileSize: '7.5 MB',
        language: 'Tiếng Việt',
        publisher: 'NXB Văn hóa - Văn nghệ',
        format: 'PDF'
      },
      {
        id: 10,
        title: 'Phong trào Cần Vương và tinh thần yêu nước',
        description: 'Tìm hiểu về phong trào kháng Pháp cuối thế kỷ 19, vai trò các sĩ phu yêu nước.',
        type: 'Tài liệu',
        pages: 88,
        level: 'Cao cấp',
        views: '2,890',
        rating: 4.7,
        author: 'GS. Phan Huy Lê',
        thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
        downloadCount: 1345,
        createdDate: '2024-06-18',
        category: 'Lịch sử',
        fileSize: '3.9 MB',
        language: 'Tiếng Việt',
        publisher: 'NXB Giáo dục Việt Nam',
        format: 'PDF'
      }
    ]
  },
  {
    id: 'hien-dai',
    name: 'Thời kỳ Hiện đại',
    period: '1945 - nay',
    color: 'from-indigo-500 to-cyan-500',
    description: 'Thời kỳ đổi mới và phát triển của Việt Nam',
    documents: [
      {
        id: 11,
        title: 'Cách mạng Tháng Tám 1945',
        description: 'Nghiên cứu về sự kiện lịch sử trọng đại đánh dấu nền độc lập của dân tộc Việt Nam.',
        type: 'Bài giảng',
        duration: '55 phút',
        durationSeconds: 3300,
        level: 'Trung cấp',
        views: '6,789',
        rating: 4.9,
        author: 'GS. Nguyễn Quang Ngọc',
        thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
        downloadCount: 3456,
        createdDate: '2024-08-15',
        category: 'Lịch sử',
        hasSubtitles: true,
        hasTranscript: true,
        videoUrl: 'https://example.com/video/cach-mang-thang-tam.mp4'
      },
      {
        id: 12,
        title: 'Văn học Việt Nam hiện đại',
        description: 'Tổng quan về các trào lưu văn học, tác giả tiêu biểu và tác phẩm nổi bật thời kỳ đổi mới.',
        type: 'Tài liệu',
        pages: 178,
        level: 'Cao cấp',
        views: '4,123',
        rating: 4.6,
        author: 'PGS. Phạm Thị Hoài',
        thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
        downloadCount: 1876,
        createdDate: '2024-07-05',
        category: 'Văn học',
        fileSize: '5.4 MB',
        language: 'Tiếng Việt',
        publisher: 'NXB Văn học',
        format: 'PDF'
      }
    ]
  }
];

export const categories = [
  { id: 'all', name: 'Tất cả', count: 156 },
  { id: 'lectures', name: 'Bài giảng', count: 89 },
  { id: 'documents', name: 'Tài liệu', count: 67 },
  // { id: 'history', name: 'Lịch sử', count: 45 },
  // { id: 'culture', name: 'Văn hóa', count: 38 },
  // { id: 'art', name: 'Nghệ thuật', count: 25 },
  // { id: 'architecture', name: 'Kiến trúc', count: 19 }
];

export const levels = [
  { id: 'all', name: 'Tất cả cấp độ' },
  { id: 'basic', name: 'Cơ bản' },
  { id: 'intermediate', name: 'Trung cấp' },
  { id: 'advanced', name: 'Cao cấp' }
];

export const sortOptions = [
  { id: 'newest', name: 'Mới nhất' },
  { id: 'oldest', name: 'Cũ nhất' },
  { id: 'most-viewed', name: 'Xem nhiều nhất' },
  { id: 'highest-rated', name: 'Đánh giá cao nhất' },
  { id: 'most-downloaded', name: 'Tải về nhiều nhất' }
];