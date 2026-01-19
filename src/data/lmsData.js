// Mock LMS Data
export const lmsData = {
  users: [
    {
      id: 1,
      role: 'teacher',
      name: 'Thầy Nguyễn Văn Minh',
      email: 'nguyen.minh@school.edu.vn',
      avatar: '/avatars/teacher1.jpg',
      subject: 'Lịch sử Việt Nam',
      courses: [1, 2],
      totalStudents: 125,
      totalAssignments: 28,
      joinDate: '2023-08-15'
    },
    {
      id: 2,
      role: 'teacher',
      name: 'Cô Trần Thị Lan',
      email: 'tran.lan@school.edu.vn',
      avatar: '/avatars/teacher2.jpg',
      subject: 'Văn học Việt Nam',
      courses: [3],
      totalStudents: 89,
      totalAssignments: 22,
      joinDate: '2023-09-01'
    },
    {
      id: 10,
      role: 'student',
      name: 'Nguyễn Minh An',
      email: 'minh.an@student.edu.vn',
      avatar: '/avatars/student1.jpg',
      grade: '12A1',
      studentId: 'HS001',
      enrolledCourses: [1, 3],
      gpa: 8.5,
      joinDate: '2024-08-20'
    },
    {
      id: 11,
      role: 'student',
      name: 'Lê Thị Bảo',
      email: 'le.bao@student.edu.vn',
      avatar: '/avatars/student2.jpg',
      grade: '12A2',
      studentId: 'HS002',
      enrolledCourses: [1, 2],
      gpa: 9.2,
      joinDate: '2024-08-20'
    }
  ],

  courses: [
    {
      id: 1,
      title: 'Lịch sử Việt Nam thời kỳ phong kiến',
      description: 'Khóa học tích hợp AI về lịch sử Việt Nam từ thế kỷ X đến thế kỷ XIX',
      teacherId: 1,
      subject: 'Lịch sử',
      grade: '12',
      semester: 'HK1 2024-2025',
      students: [10, 11, 12, 13, 14],
      lessons: [1, 2, 3, 4, 5],
      assignments: [1, 2, 3],
      quizzes: [1, 2],
      startDate: '2024-09-01',
      endDate: '2024-12-20',
      status: 'active',
      coverImage: '/courses/history-vietnam.jpg'
    },
    {
      id: 2,
      title: 'AI và Di sản Văn hóa Việt Nam',
      description: 'Ứng dụng công nghệ AI trong bảo tồn và phát triển di sản văn hóa',
      teacherId: 1,
      subject: 'Công nghệ',
      grade: '12',
      semester: 'HK1 2024-2025',
      students: [11, 15, 16, 17],
      lessons: [6, 7, 8],
      assignments: [4, 5],
      quizzes: [3],
      startDate: '2024-09-01',
      endDate: '2024-12-20',
      status: 'active',
      coverImage: '/courses/ai-heritage.jpg'
    },
    {
      id: 3,
      title: 'Văn học dân gian Việt Nam',
      description: 'Khám phá kho tàng văn học dân gian qua các tác phẩm tiêu biểu',
      teacherId: 2,
      subject: 'Văn học',
      grade: '11',
      semester: 'HK1 2024-2025',
      students: [10, 18, 19, 20],
      lessons: [9, 10, 11],
      assignments: [6],
      quizzes: [4],
      startDate: '2024-09-01',
      endDate: '2024-12-20',
      status: 'active',
      coverImage: '/courses/folk-literature.jpg'
    }
  ],

  assignments: [
    {
      id: 1,
      courseId: 1,
      title: 'Tái tạo Tranh Dân gian Việt Nam bằng AI',
      description: 'Sử dụng công nghệ AI để tạo ra những bức tranh thể hiện tinh thần dân gian Việt Nam',
      type: 'ai-image', // 'text', 'ai-image', 'video', 'presentation'
      instructions: 'Học sinh sử dụng các công cụ AI để tạo ra ít nhất 3 bức tranh theo phong cách dân gian Việt Nam. Mỗi bức tranh phải có prompt chi tiết và giải thích.',
      requirements: [
        'Sử dụng ít nhất 2 AI tools khác nhau',
        'Tạo tối thiểu 3 variations của cùng một concept',
        'Viết prompt chi tiết bằng tiếng Anh và tiếng Việt',
        'Giải thích lựa chọn style và composition'
      ],
      aiPromptGuidelines: 'Prompt phải bao gồm: Style (traditional Vietnamese art), Subject (folk themes), Colors (earth tones, traditional colors), Mood (nostalgic, cultural), Technical specs (4K, detailed, masterpiece)',
      allowedAITools: ['Midjourney', 'DALL-E 3', 'Stable Diffusion', 'Leonardo AI'],
      rubric: [
        {
          name: 'Tính sáng tạo',
          description: 'Đánh giá mức độ sáng tạo và độc đáo trong ý tưởng',
          weight: 25
        },
        {
          name: 'Độ chính xác',
          description: 'Đánh giá độ chính xác về lịch sử và văn hóa',
          weight: 25
        },
        {
          name: 'Kỹ thuật AI',
          description: 'Đánh giá kỹ năng sử dụng công cụ AI và chất lượng prompt',
          weight: 25
        },
        {
          name: 'Tính liên quan',
          description: 'Đánh giá mức độ phù hợp với chủ đề dân gian Việt Nam',
          weight: 25
        }
      ],
      resources: [
        {
          name: 'Midjourney Guide',
          description: 'Hướng dẫn sử dụng Midjourney cho người mới',
          url: 'https://docs.midjourney.com'
        },
        {
          name: 'Prompt Engineering Tips',
          description: 'Mẹo viết prompt hiệu quả cho AI art',
          url: '/resources/prompt-guide.pdf'
        },
        {
          name: 'Vietnamese Folk Art Gallery',
          description: 'Bộ sưu tập tranh dân gian Việt Nam tham khảo',
          url: '/resources/folk-art-gallery.html'
        }
      ],
      maxScore: 100,
      minImages: 3,
      maxImages: 10,
      dueDate: '2024-11-15T23:59:00',
      createdDate: '2024-11-01T10:00:00',
      status: 'active', // 'draft', 'active', 'closed'
      submissions: [1, 2],
      totalStudents: 5
    },
    {
      id: 2,
      courseId: 1,
      title: 'Viết Luận về Chế độ Phong kiến Việt Nam',
      description: 'Phân tích đặc điểm và ảnh hưởng của chế độ phong kiến đến xã hội Việt Nam',
      type: 'text',
      instructions: 'Viết một bài luận 1500-2000 từ phân tích sâu về chế độ phong kiến Việt Nam. Sử dụng AI để hỗ trợ nghiên cứu và kiểm tra ngữ pháp.',
      requirements: [
        'Độ dài: 1500-2000 từ',
        'Cần có ít nhất 5 tài liệu tham khảo',
        'Sử dụng AI để kiểm tra grammar và style',
        'Có phần kết luận cá nhân'
      ],
      aiTools: ['Grammarly', 'ChatGPT', 'Google Bard'],
      rubric: [
        {
          name: 'Nội dung',
          description: 'Đánh giá độ sâu sắc và chính xác của nội dung',
          weight: 40
        },
        {
          name: 'Cấu trúc',
          description: 'Đánh giá tính logic và mạch lạc của bài viết',
          weight: 20
        },
        {
          name: 'Ngôn ngữ',
          description: 'Đánh giá ngữ pháp, từ vựng và phong cách viết',
          weight: 20
        },
        {
          name: 'Nghiên cứu',
          description: 'Đánh giá chất lượng tài liệu tham khảo',
          weight: 20
        }
      ],
      resources: [
        {
          name: 'Tài liệu về Chế độ Phong kiến Việt Nam',
          description: 'Bài giảng chi tiết về đặc điểm chế độ phong kiến',
          url: '/resources/feudal-system-vietnam.pdf'
        },
        {
          name: 'Video bài giảng',
          description: 'Video giải thích về cấu trúc xã hội phong kiến',
          url: 'https://youtube.com/watch?v=example'
        }
      ],
      maxScore: 100,
      minWords: 1500,
      maxWords: 2000,
      dueDate: '2024-11-20T23:59:00',
      createdDate: '2024-11-02T14:00:00',
      status: 'active',
      submissions: [3],
      totalStudents: 5
    },
    {
      id: 3,
      courseId: 1,
      title: 'Tạo Video Giới thiệu Lễ hội Truyền thống',
      description: 'Sử dụng AI để tạo video ngắn giới thiệu một lễ hội truyền thống Việt Nam',
      type: 'ai-video',
      instructions: 'Tạo video 2-3 phút giới thiệu một lễ hội truyền thống. Sử dụng AI để tạo voice-over, hình ảnh và hiệu ứng.',
      requirements: [
        'Thời lượng: 2-3 phút',
        'Chất lượng HD (1080p)',
        'Có voice-over bằng AI',
        'Sử dụng ít nhất 5 hình ảnh được tạo bởi AI'
      ],
      aiTools: ['Runway ML', 'Synthesia', 'ElevenLabs', 'Midjourney'],
      rubric: [
        {
          name: 'Tính sáng tạo',
          description: 'Đánh giá ý tưởng độc đáo và tính sáng tạo trong video',
          weight: 30
        },
        {
          name: 'Kỹ thuật',
          description: 'Đánh giá chất lượng kỹ thuật và sử dụng công nghệ AI',
          weight: 25
        },
        {
          name: 'Nội dung',
          description: 'Đánh giá tính chính xác và phong phú của thông tin',
          weight: 25
        },
        {
          name: 'Trình bày',
          description: 'Đánh giá khả năng trình bày và tương tác với khán giả',
          weight: 20
        }
      ],
      resources: [
        {
          name: 'Runway ML Tutorial',
          description: 'Hướng dẫn tạo video với Runway ML',
          url: 'https://runwayml.com/tutorials'
        },
        {
          name: 'ElevenLabs Voice Guide',
          description: 'Hướng dẫn tạo voice-over với AI',
          url: 'https://elevenlabs.io/docs'
        },
        {
          name: 'Lễ hội Truyền thống Việt Nam',
          description: 'Tài liệu tham khảo về các lễ hội dân tộc',
          url: '/resources/vietnamese-festivals.pdf'
        }
      ],
      maxScore: 100,
      dueDate: '2024-11-25T23:59:00',
      createdDate: '2024-11-03T09:00:00',
      status: 'draft',
      submissions: [],
      totalStudents: 5
    }
  ],

  submissions: [
    {
      id: 1,
      assignmentId: 1,
      studentId: 10,
      submissionDate: '2024-11-05T16:30:00',
      status: 'submitted', // 'draft', 'submitted', 'graded'
      content: {
        images: [
          {
            url: 'https://picsum.photos/512/512?random=1',
            prompt: 'Traditional Vietnamese village scene, oil painting style, warm earth tones, detailed brushwork, nostalgic atmosphere, 4K masterpiece',
            aiTool: 'Midjourney',
            promptVietnamese: 'Cảnh làng quê Việt Nam truyền thống, phong cách sơn dầu, tông màu đất ấm, nét vẽ tỉ mỉ, không khí hoài niệm, kiệt tác 4K'
          },
          {
            url: 'https://picsum.photos/512/512?random=2',
            prompt: 'Vietnamese folk art dragon dance, vibrant colors, traditional festival atmosphere, detailed crowd, cultural celebration, high quality digital art',
            aiTool: 'DALL-E 3',
            promptVietnamese: 'Múa rồng nghệ thuật dân gian Việt Nam, màu sắc rực rỡ, không khí lễ hội truyền thống, đám đông chi tiết, lễ kỷ niệm văn hóa, nghệ thuật kỹ thuật số chất lượng cao'
          }
        ],
        notes: 'Em đã thử nghiệm với nhiều prompt khác nhau và chọn ra những hình ảnh thể hiện tốt nhất tinh thần dân gian Việt Nam. Em thấy Midjourney tạo ra những hình ảnh có cảm xúc hơn còn DALL-E 3 chi tiết hơn.'
      },
      grade: null,
      feedback: null,
      gradedDate: null
    },
    {
      id: 2,
      assignmentId: 1,
      studentId: 11,
      submissionDate: '2024-11-06T10:15:00',
      status: 'graded',
      content: {
        images: [
          {
            url: 'https://picsum.photos/512/512?random=3',
            prompt: 'Vietnamese traditional ao dai fashion, elegant pose, lotus flowers background, soft watercolor style, cultural heritage, artistic portrait',
            aiTool: 'Leonardo AI',
            promptVietnamese: 'Thời trang áo dài truyền thống Việt Nam, tư thế thanh lịch, nền hoa sen, phong cách màu nước mềm mại, di sản văn hóa, chân dung nghệ thuật'
          }
        ],
        notes: 'Em tập trung vào việc thể hiện vẻ đẹp của trang phục truyền thống Việt Nam.'
      },
      grade: 85,
      feedback: 'Bài làm tốt! Hình ảnh đẹp và có ý nghĩa văn hóa. Tuy nhiên cần thêm nhiều hình ảnh hơn theo yêu cầu.',
      gradedDate: '2024-11-07T14:20:00'
    }
  ],

  lessons: [
    {
      id: 1,
      courseId: 1,
      title: 'Tổng quan về Chế độ Phong kiến Việt Nam',
      description: 'Tìm hiểu về đặc điểm chung của chế độ phong kiến và quá trình hình thành tại Việt Nam qua các thời kỳ',
      orderIndex: 1,
      duration: 45,
      videoUrl: 'https://youtube.com/watch?v=abc123',
      videoFile: null,
      status: 'published',
      contentSections: [
        {
          id: 1,
          type: 'text',
          title: 'Giới thiệu về chế độ phong kiến',
          content: `Chế độ phong kiến là một hình thức tổ chức xã hội dựa trên quyền sở hữu ruộng đất của tầng lớp quý tộc và sự phân chia xã hội thành các tầng lớp khác nhau.

Các đặc điểm chính của chế độ phong kiến:
• Quyền sở hữu ruộng đất tập trung vào tay quý tộc
• Xã hội phân chia thành các tầng lớp rõ rệt
• Nông dân phải đóng thuế và thực hiện các nghĩa vụ với chủ đất
• Hệ thống quan lại được tổ chức theo thứ bậc`,
          order: 1
        },
        {
          id: 2,
          type: 'video',
          title: 'Video minh họa: Cấu trúc xã hội phong kiến',
          content: 'https://youtube.com/embed/def456',
          order: 2
        },
        {
          id: 3,
          type: 'image',
          title: 'Sơ đồ tổ chức xã hội phong kiến',
          content: 'https://picsum.photos/800/600?random=feudal',
          caption: 'Cấu trúc tầng lớp trong xã hội phong kiến Việt Nam',
          order: 3
        },
        {
          id: 4,
          type: 'quiz',
          title: 'Kiểm tra hiểu biết về chế độ phong kiến',
          content: 'Hãy trả lời các câu hỏi sau để kiểm tra hiểu biết của bạn về chế độ phong kiến.',
          order: 4
        }
      ],
      materials: [
        {
          id: 1,
          type: 'pdf',
          title: 'Giáo trình Lịch sử Việt Nam - Chương 1',
          url: 'https://example.com/materials/chuong1.pdf',
          description: 'Tài liệu chính thức về lịch sử phong kiến Việt Nam'
        }
      ],
      learningObjectives: [
        'Hiểu được đặc điểm cơ bản của chế độ phong kiến',
        'Phân biệt được các tầng lớp xã hội thời phong kiến',
        'Nắm được quá trình hình thành chế độ phong kiến ở Việt Nam'
      ],
      createdDate: '2024-12-07T10:00:00Z',
      updatedDate: '2024-12-07T10:00:00Z',
      views: 156,
      completions: 89
    },
    {
      id: 2,
      courseId: 1,
      title: 'Các Triều đại Phong kiến Việt Nam',
      description: 'Khảo sát các triều đại phong kiến quan trọng trong lịch sử Việt Nam từ thời Đinh - Lê đến cuối thời Nguyễn',
      orderIndex: 2,
      duration: 60,
      videoUrl: '',
      videoFile: 'trieu_dai_phong_kien.mp4',
      status: 'draft',
      contentSections: [
        {
          id: 5,
          type: 'text',
          title: 'Thời kỳ Đinh - Tiền Lê (968-1009)',
          content: `Giai đoạn đầu của chế độ phong kiến tập quyền ở Việt Nam bắt đầu từ năm 968 với việc Đinh Bộ Lĩnh lên ngôi hoàng đế.

Các triều đại chính:
• Nhà Đinh (968-980): Thống nhất đất nước, thiết lập chế độ quân chủ tập quyền
• Nhà Tiền Lê (980-1009): Tiếp tục củng cố chế độ phong kiến
• Thành tựu: Xây dựng bộ máy nhà nước, thiết lập hệ thống luật pháp`,
          order: 1
        },
        {
          id: 6,
          type: 'video',
          title: 'Tài liệu về triều Đinh',
          content: 'https://youtube.com/embed/dinh_dynasty',
          order: 2
        },
        {
          id: 7,
          type: 'text',
          title: 'Nhà Lý và sự phát triển',
          content: `Triều Lý (1009-1225) đánh dấu thời kỳ phát triển mạnh mẽ của chế độ phong kiến Việt Nam.

Thành tựu của triều Lý:
• Xây dựng kinh đô Thăng Long
• Phát triển nông nghiệp và thủ công nghiệp  
• Thiết lập hệ thống giáo dục
• Mở rộng quan hệ ngoại giao`,
          order: 3
        }
      ],
      materials: [],
      learningObjectives: [
        'Liệt kê được các triều đại phong kiến chính',
        'So sánh được đặc điểm của từng triều đại',
        'Đánh giá được vai trò lịch sử của các triều đại'
      ],
      createdDate: '2024-12-06T14:30:00Z',
      updatedDate: '2024-12-07T09:15:00Z',
      views: 23,
      completions: 0
    },
    {
      id: 3,
      courseId: 2,
      title: 'Cách mạng Tháng Tám 1945',
      description: 'Nghiên cứu quá trình và ý nghĩa lịch sử của Cách mạng Tháng Tám năm 1945',
      orderIndex: 1,
      duration: 50,
      videoUrl: 'https://youtube.com/watch?v=revolution1945',
      videoFile: null,
      status: 'published',
      contentSections: [
        {
          id: 4,
          type: 'text',
          title: 'Bối cảnh lịch sử trước Cách mạng',
          content: 'Tình hình Việt Nam cuối thời Pháp thuộc và dưới ách đô hộ của Nhật Bản...',
          order: 1
        }
      ],
      materials: [
        {
          id: 2,
          type: 'pdf',
          title: 'Tài liệu về Cách mạng Tháng Tám',
          url: 'https://example.com/materials/cachmang_thang8.pdf',
          description: 'Tuyển tập tài liệu lịch sử về Cách mạng Tháng Tám'
        }
      ],
      learningObjectives: [
        'Hiểu được bối cảnh lịch sử của Cách mạng Tháng Tám',
        'Phân tích được các nhân tố dẫn đến thành công của cách mạng',
        'Đánh giá được ý nghĩa lịch sử của Cách mạng Tháng Tám'
      ],
      createdDate: '2024-12-05T08:00:00Z',
      updatedDate: '2024-12-06T16:30:00Z',
      views: 284,
      completions: 156
    }
  ]
};

export default lmsData;