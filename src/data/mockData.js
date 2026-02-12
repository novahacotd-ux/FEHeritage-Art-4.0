// Mock data for events
export const events = [
  {
    id: "1",
    title: "Khám phá di sản văn hóa Huế",
    description:
      "Hành trình khám phá kiến trúc và văn hóa cung đình triều Nguyễn qua các di tích lịch sử nổi tiếng.",
    shortIntro:
      "Một trải nghiệm cả ngày tại cố đô Huế, kết hợp tham quan, thuyết minh chuyên sâu và giao lưu cùng các chuyên gia di sản.",
    theme: "Ký ức cố đô — khám phá không gian, kiến trúc và nghi lễ cung đình",
    timeline: [
      { time: "08:00", label: "Tập trung & đón khách tại điểm hẹn" },
      { time: "09:00", label: "Tham quan Đại Nội - hướng dẫn chuyên đề" },
      { time: "12:00", label: "Ăn trưa & giao lưu" },
      { time: "13:30", label: "Tham quan lăng tẩm & đền chùa" },
      { time: "16:30", label: "Q&A với chuyên gia và kết thúc" },
    ],
    rules: [
      {
        title: "Đối tượng",
        content:
          "Sinh viên, nghệ sĩ, nhà nghiên cứu và người yêu văn hóa Việt Nam",
      },
      {
        title: "Số lượng tác phẩm",
        content: "Mỗi cá nhân / nhóm được nộp tối đa 3 tác phẩm",
      },
      {
        title: "Định dạng file",
        content:
          "PNG, JPEG (tranh/ảnh), MP4 (video), PDF (báo cáo). Dung lượng ≤100MB",
      },
      {
        title: "Bản quyền",
        content:
          "Tác phẩm phải do người nộp sáng tạo, không vi phạm bản quyền bên thứ ba",
      },
      {
        title: "Thời gian nộp",
        content: "Từ ngày 15/12/2024 đến hết 15/01/2025",
      },
      {
        title: "Công bố kết quả",
        content: "Dự kiến ngày 01/02/2025 trên website và email",
      },
    ],
    requirements: [
      {
        title: "Tác phẩm",
        content:
          "Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).",
      },
      {
        title: "Kích thước",
        content: "Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.",
      },
      {
        title: "Thông tin bắt buộc",
        content:
          "Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.",
      },
      {
        title: "Bản quyền",
        content:
          "Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.",
      },
      { title: "Số lượng", content: "Mỗi người được gửi tối đa 3 tác phẩm." },
    ],
    criteria: [
      {
        title: "Sáng tạo & ý tưởng",
        percent: "40%",
        description: "Độc đáo, truyền tải ký ức/di sản.",
      },
      {
        title: "Chất lượng nghệ thuật",
        percent: "30%",
        description: "Bố cục, màu sắc, kỹ thuật.",
      },
      {
        title: "Tương tác công nghệ",
        percent: "20%",
        description: "Sử dụng AI/AR/VR/âm thanh sáng tạo.",
      },
      {
        title: "Tác động văn hóa",
        percent: "10%",
        description: "Khả năng truyền cảm hứng & giáo dục cộng đồng.",
      },
    ],
    judges:
      "Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.",
    prizes: [
      { name: "Giải Nhất", value: "10.000.000₫", bonus: "Triển lãm & ấn phẩm" },
      { name: "Giải Nhì", value: "5.000.000₫", bonus: "Triển lãm" },
      {
        name: "Giải Khuyến khích & Khán giả bình chọn",
        value: "Quà tặng",
        bonus: "Giấy chứng nhận",
      },
    ],
    faq: [
      { question: "Đăng ký có mất phí không?", answer: "Miễn phí hoàn toàn." },
      {
        question: "Bản quyền tác phẩm thuộc về ai?",
        answer:
          "Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.",
      },
      {
        question: "Có thể gửi nhiều tác phẩm không?",
        answer: "Có, tối đa 3 tác phẩm mỗi tác giả.",
      },
    ],
    content:
      "Sự kiện này sẽ đưa bạn đến với những di tích lịch sử quan trọng nhất của cố đô Huế, bao gồm Đại Nội, các lăng tẩm của các vị vua triều Nguyễn, và các đền chùa cổ kính. Chuyên gia sẽ hướng dẫn và giải thích về kiến trúc, lịch sử và ý nghĩa văn hóa của từng công trình.",
    date: "15/12/2024",
    time: "7 ngày",
    location: "Huế, Thừa Thiên Huế",
    imageUrl:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop",
    isFeatured: true,
    tags: ["di sản", "lịch sử", "huế"],
  },
  {
    id: "2",
    title: "Hội thảo nghệ thuật điêu khắc Chăm",
    description:
      "Tìm hiểu về nghệ thuật điêu khắc tinh xảo của văn hóa Chăm Pa qua các di tích và tác phẩm nghệ thuật.",
    shortIntro:
      "Hội thảo nêu bật các phát hiện mới và phương pháp phục dựng điêu khắc Chăm.",
    theme: "Bảo tồn & phục dựng di sản điêu khắc Chăm",
    rules: [
      {
        title: "Đối tượng",
        content: "Mở rộng cho tất cả đối tượng quan tâm đến nghệ thuật Chăm Pa",
      },
      { title: "Số lượng tác phẩm", content: "Tối đa 2 tác phẩm mỗi cá nhân" },
      { title: "Định dạng file", content: "PNG, JPEG, PDF. Dung lượng ≤50MB" },
      {
        title: "Bản quyền",
        content: "Đảm bảo tính nguyên gốc và không vi phạm bản quyền",
      },
      { title: "Thời gian nộp", content: "Đến hết 20/12/2024" },
      { title: "Công bố kết quả", content: "Ngày 25/12/2024" },
    ],
    requirements: [
      {
        title: "Tác phẩm",
        content:
          "Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).",
      },
      {
        title: "Kích thước",
        content: "Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.",
      },
      {
        title: "Thông tin bắt buộc",
        content:
          "Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.",
      },
      {
        title: "Bản quyền",
        content:
          "Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.",
      },
      { title: "Số lượng", content: "Mỗi người được gửi tối đa 3 tác phẩm." },
    ],
    criteria: [
      {
        title: "Sáng tạo & ý tưởng",
        percent: "40%",
        description: "Độc đáo, truyền tải ký ức/di sản.",
      },
      {
        title: "Chất lượng nghệ thuật",
        percent: "30%",
        description: "Bố cục, màu sắc, kỹ thuật.",
      },
      {
        title: "Tương tác công nghệ",
        percent: "20%",
        description: "Sử dụng AI/AR/VR/âm thanh sáng tạo.",
      },
      {
        title: "Tác động văn hóa",
        percent: "10%",
        description: "Khả năng truyền cảm hứng & giáo dục cộng đồng.",
      },
    ],
    judges:
      "Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.",
    prizes: [
      { name: "Giải Nhất", value: "10.000.000₫", bonus: "Triển lãm & ấn phẩm" },
      { name: "Giải Nhì", value: "5.000.000₫", bonus: "Triển lãm" },
      {
        name: "Giải Khuyến khích & Khán giả bình chọn",
        value: "Quà tặng",
        bonus: "Giấy chứng nhận",
      },
    ],
    faq: [
      { question: "Đăng ký có mất phí không?", answer: "Miễn phí hoàn toàn." },
      {
        question: "Bản quyền tác phẩm thuộc về ai?",
        answer:
          "Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.",
      },
      {
        question: "Có thể gửi nhiều tác phẩm không?",
        answer: "Có, tối đa 3 tác phẩm mỗi tác giả.",
      },
    ],
    content:
      "Hội thảo sẽ giới thiệu về lịch sử phát triển nghệ thuật điêu khắc Chăm, các đặc điểm độc đáo trong phong cách nghệ thuật, và ảnh hưởng của văn hóa Chăm đến nghệ thuật Việt Nam. Các chuyên gia hàng đầu sẽ trình bày và thảo luận về các phát hiện mới trong nghiên cứu văn hóa Chăm.",
    date: "20/12/2024",
    time: "7 ngày",
    location: "Đà Nẵng, Việt Nam",
    imageUrl:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
    isFeatured: true,
    tags: ["nghệ thuật", "chăm pa", "điêu khắc"],
  },
  {
    id: "3",
    title: "Triển lãm tranh dân gian Đông Hồ",
    description:
      "Chiêm ngưỡng và tìm hiểu về nghệ thuật tranh dân gian truyền thống Đông Hồ với các nghệ nhân.",
    shortIntro:
      "Triển lãm giới thiệu tranh Đông Hồ cổ điển và các tác phẩm đương đại lấy cảm hứng từ tranh dân gian.",
    theme: "Tranh dân gian — kết nối truyền thống và hiện đại",
    rules: [
      {
        title: "Đối tượng",
        content:
          "Sinh viên nghệ thuật, họa sĩ, nhà thiết kế và công chúng yêu tranh dân gian",
      },
      {
        title: "Số lượng tác phẩm",
        content: "Mỗi người được nộp tối đa 3 tác phẩm",
      },
      {
        title: "Định dạng file",
        content: "PNG, JPEG (tranh), MP4 (video giới thiệu). Dung lượng ≤100MB",
      },
      {
        title: "Bản quyền",
        content:
          "Tác phẩm phải tự sáng tạo, được phép lấy cảm hứng từ tranh Đông Hồ truyền thống",
      },
      { title: "Thời gian nộp", content: "Từ 01/12/2024 đến 20/12/2024" },
      { title: "Công bố kết quả", content: "Ngày 28/12/2024 tại triển lãm" },
    ],
    requirements: [
      {
        title: "Tác phẩm",
        content:
          "Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).",
      },
      {
        title: "Kích thước",
        content: "Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.",
      },
      {
        title: "Thông tin bắt buộc",
        content:
          "Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.",
      },
      {
        title: "Bản quyền",
        content:
          "Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.",
      },
      { title: "Số lượng", content: "Mỗi người được gửi tối đa 3 tác phẩm." },
    ],
    criteria: [
      {
        title: "Sáng tạo & ý tưởng",
        percent: "40%",
        description: "Độc đáo, truyền tải ký ức/di sản.",
      },
      {
        title: "Chất lượng nghệ thuật",
        percent: "30%",
        description: "Bố cục, màu sắc, kỹ thuật.",
      },
      {
        title: "Tương tác công nghệ",
        percent: "20%",
        description: "Sử dụng AI/AR/VR/âm thanh sáng tạo.",
      },
      {
        title: "Tác động văn hóa",
        percent: "10%",
        description: "Khả năng truyền cảm hứng & giáo dục cộng đồng.",
      },
    ],
    judges:
      "Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.",
    prizes: [
      { name: "Giải Nhất", value: "10.000.000₫", bonus: "Triển lãm & ấn phẩm" },
      { name: "Giải Nhì", value: "5.000.000₫", bonus: "Triển lãm" },
      {
        name: "Giải Khuyến khích & Khán giả bình chọn",
        value: "Quà tặng",
        bonus: "Giấy chứng nhận",
      },
    ],
    faq: [
      { question: "Đăng ký có mất phí không?", answer: "Miễn phí hoàn toàn." },
      {
        question: "Bản quyền tác phẩm thuộc về ai?",
        answer:
          "Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.",
      },
      {
        question: "Có thể gửi nhiều tác phẩm không?",
        answer: "Có, tối đa 3 tác phẩm mỗi tác giả.",
      },
    ],
    content:
      "Triển lãm trưng bày hơn 100 tác phẩm tranh Đông Hồ từ các thời kỳ khác nhau, cùng với workshop thực hành in tranh truyền thống. Các nghệ nhân sẽ trực tiếp hướng dẫn và chia sẻ về quy trình tạo ra những bức tranh dân gian độc đáo này.",
    date: "25/12/2024",
    time: "7 ngày",
    location: "Hà Nội, Việt Nam",
    imageUrl:
      "https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?w=800&h=600&fit=crop",
    isFeatured: true,
    tags: ["tranh dân gian", "đông hồ", "triển lãm"],
  },
  {
    id: "4",
    title: "Lễ hội văn hóa dân tộc thiểu số",
    description:
      "Trải nghiệm văn hóa đa dạng của các dân tộc thiểu số Việt Nam qua âm nhạc, múa và ẩm thực.",
    shortIntro:
      "Lễ hội quy tụ nhiều dân tộc thiểu số với các hoạt động biểu diễn, hội chợ nghề truyền thống và ẩm thực đặc sắc.",
    theme: "Sắc màu văn hóa — tôn vinh đa dạng dân tộc",
    rules: [
      {
        title: "Đối tượng",
        content: "Tất cả các cá nhân và tổ chức quan tâm văn hóa dân tộc",
      },
      {
        title: "Số lượng tác phẩm",
        content: "Không giới hạn số lượng tác phẩm",
      },
      {
        title: "Định dạng file",
        content: "PNG, JPEG, MP4, PDF. Dung lượng ≤150MB",
      },
      {
        title: "Bản quyền",
        content: "Tôn trọng văn hóa dân tộc, không xuyên tạc",
      },
      { title: "Thời gian nộp", content: "Đến hết 25/12/2024" },
      { title: "Công bố kết quả", content: "Ngày 05/01/2025" },
    ],
    requirements: [
      {
        title: "Tác phẩm",
        content:
          "Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).",
      },
      {
        title: "Kích thước",
        content: "Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.",
      },
      {
        title: "Thông tin bắt buộc",
        content:
          "Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.",
      },
      {
        title: "Bản quyền",
        content:
          "Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.",
      },
      { title: "Số lượng", content: "Mỗi người được gửi tối đa 3 tác phẩm." },
    ],
    criteria: [
      {
        title: "Sáng tạo & ý tưởng",
        percent: "40%",
        description: "Độc đáo, truyền tải ký ức/di sản.",
      },
      {
        title: "Chất lượng nghệ thuật",
        percent: "30%",
        description: "Bố cục, màu sắc, kỹ thuật.",
      },
      {
        title: "Tương tác công nghệ",
        percent: "20%",
        description: "Sử dụng AI/AR/VR/âm thanh sáng tạo.",
      },
      {
        title: "Tác động văn hóa",
        percent: "10%",
        description: "Khả năng truyền cảm hứng & giáo dục cộng đồng.",
      },
    ],
    judges:
      "Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.",
    prizes: [
      { name: "Giải Nhất", value: "10.000.000₫", bonus: "Triển lãm & ấn phẩm" },
      { name: "Giải Nhì", value: "5.000.000₫", bonus: "Triển lãm" },
      {
        name: "Giải Khuyến khích & Khán giả bình chọn",
        value: "Quà tặng",
        bonus: "Giấy chứng nhận",
      },
    ],
    faq: [
      { question: "Đăng ký có mất phí không?", answer: "Miễn phí hoàn toàn." },
      {
        question: "Bản quyền tác phẩm thuộc về ai?",
        answer:
          "Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.",
      },
      {
        question: "Có thể gửi nhiều tác phẩm không?",
        answer: "Có, tối đa 3 tác phẩm mỗi tác giả.",
      },
    ],
    content:
      "Lễ hội quy tụ đại diện từ hơn 20 dân tộc thiểu số, mang đến những màn trình diễn nghệ thuật truyền thống, gian hàng thủ công mỹ nghệ, và ẩm thực đặc sắc. Đây là cơ hội tuyệt vời để tìm hiểu về sự đa dạng văn hóa của Việt Nam.",
    date: "30/12/2024",
    time: "7 ngày",
    location: "Sapa, Lào Cai",
    imageUrl:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    isFeatured: false,
    tags: ["lễ hội", "dân tộc", "văn hóa"],
  },
  {
    id: "5",
    title: "Tọa đàm bảo tồn di sản văn hóa",
    description:
      "Thảo luận về các phương pháp hiện đại trong bảo tồn và phát huy giá trị di sản văn hóa.",
    shortIntro:
      "Tọa đàm chuyên sâu về các phương pháp kỹ thuật và chính sách trong bảo tồn di sản.",
    theme: "Bảo tồn để phát huy — giải pháp và chính sách",
    rules: [
      {
        title: "Đối tượng",
        content:
          "Nhà nghiên cứu, chuyên gia, sinh viên và người quan tâm bảo tồn",
      },
      {
        title: "Số lượng tác phẩm",
        content: "Tối đa 2 bài nghiên cứu hoặc đề xuất",
      },
      {
        title: "Định dạng file",
        content: "PDF (báo cáo nghiên cứu). Dung lượng ≤50MB",
      },
      {
        title: "Bản quyền",
        content: "Nghiên cứu độc lập, trích dẫn nguồn rõ ràng",
      },
      { title: "Thời gian nộp", content: "Đến hết 01/01/2025" },
      { title: "Công bố kết quả", content: "Ngày 10/01/2025" },
    ],
    requirements: [
      {
        title: "Tác phẩm",
        content:
          "Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).",
      },
      {
        title: "Kích thước",
        content: "Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.",
      },
      {
        title: "Thông tin bắt buộc",
        content:
          "Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.",
      },
      {
        title: "Bản quyền",
        content:
          "Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.",
      },
      { title: "Số lượng", content: "Mỗi người được gửi tối đa 3 tác phẩm." },
    ],
    criteria: [
      {
        title: "Sáng tạo & ý tưởng",
        percent: "40%",
        description: "Độc đáo, truyền tải ký ức/di sản.",
      },
      {
        title: "Chất lượng nghệ thuật",
        percent: "30%",
        description: "Bố cục, màu sắc, kỹ thuật.",
      },
      {
        title: "Tương tác công nghệ",
        percent: "20%",
        description: "Sử dụng AI/AR/VR/âm thanh sáng tạo.",
      },
      {
        title: "Tác động văn hóa",
        percent: "10%",
        description: "Khả năng truyền cảm hứng & giáo dục cộng đồng.",
      },
    ],
    judges:
      "Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.",
    prizes: [
      { name: "Giải Nhất", value: "10.000.000₫", bonus: "Triển lãm & ấn phẩm" },
      { name: "Giải Nhì", value: "5.000.000₫", bonus: "Triển lãm" },
      {
        name: "Giải Khuyến khích & Khán giả bình chọn",
        value: "Quà tặng",
        bonus: "Giấy chứng nhận",
      },
    ],
    faq: [
      { question: "Đăng ký có mất phí không?", answer: "Miễn phí hoàn toàn." },
      {
        question: "Bản quyền tác phẩm thuộc về ai?",
        answer:
          "Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.",
      },
      {
        question: "Có thể gửi nhiều tác phẩm không?",
        answer: "Có, tối đa 3 tác phẩm mỗi tác giả.",
      },
    ],
    content:
      "Tọa đàm tập trung vào các thách thức và giải pháp trong công tác bảo tồn di sản văn hóa vật thể và phi vật thể. Các chuyên gia trong nước và quốc tế sẽ chia sẻ kinh nghiệm và công nghệ mới nhất trong lĩnh vực bảo tồn di sản.",
    date: "05/01/2025",
    time: "7 ngày",
    location: "TP. Hồ Chí Minh",
    imageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop",
    isFeatured: false,
    tags: ["bảo tồn", "di sản", "hội thảo"],
  },
  {
    id: "6",
    title: "Workshop nghệ thuật gốm sứ Bát Tràng",
    description:
      "Học nghệ thuật làm gốm truyền thống cùng các nghệ nhân làng gốm Bát Tràng nổi tiếng.",
    shortIntro:
      "Workshop thực hành gốm sứ 2 ngày, hướng dẫn từ nhào nặn đến nung bởi nghệ nhân Bát Tràng.",
    theme: "Kỹ thuật truyền thống & sáng tạo vật liệu",
    rules: [
      {
        title: "Đối tượng",
        content: "Học viên từ 16 tuổi trở lên, yêu thích nghệ thuật gốm sứ",
      },
      {
        title: "Số lượng tác phẩm",
        content: "Mỗi người tạo tối đa 3 sản phẩm gốm trong workshop",
      },
      {
        title: "Định dạng file",
        content:
          "PNG, JPEG (ảnh sản phẩm), MP4 (video quá trình). Dung lượng ≤100MB",
      },
      {
        title: "Bản quyền",
        content:
          "Sản phẩm thuộc về người tham gia, được mang về sau khi nung xong",
      },
      { title: "Thời gian nộp", content: "Đến hết 05/01/2025" },
      { title: "Công bố kết quả", content: "Ngày 15/01/2025" },
    ],
    requirements: [
      {
        title: "Tác phẩm",
        content:
          "Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).",
      },
      {
        title: "Kích thước",
        content: "Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.",
      },
      {
        title: "Thông tin bắt buộc",
        content:
          "Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.",
      },
      {
        title: "Bản quyền",
        content:
          "Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.",
      },
      { title: "Số lượng", content: "Mỗi người được gửi tối đa 3 tác phẩm." },
    ],
    criteria: [
      {
        title: "Sáng tạo & ý tưởng",
        percent: "40%",
        description: "Độc đáo, truyền tải ký ức/di sản.",
      },
      {
        title: "Chất lượng nghệ thuật",
        percent: "30%",
        description: "Bố cục, màu sắc, kỹ thuật.",
      },
      {
        title: "Tương tác công nghệ",
        percent: "20%",
        description: "Sử dụng AI/AR/VR/âm thanh sáng tạo.",
      },
      {
        title: "Tác động văn hóa",
        percent: "10%",
        description: "Khả năng truyền cảm hứng & giáo dục cộng đồng.",
      },
    ],
    judges:
      "Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.",
    prizes: [
      { name: "Giải Nhất", value: "10.000.000₫", bonus: "Triển lãm & ấn phẩm" },
      { name: "Giải Nhì", value: "5.000.000₫", bonus: "Triển lãm" },
      {
        name: "Giải Khuyến khích & Khán giả bình chọn",
        value: "Quà tặng",
        bonus: "Giấy chứng nhận",
      },
    ],
    faq: [
      { question: "Đăng ký có mất phí không?", answer: "Miễn phí hoàn toàn." },
      {
        question: "Bản quyền tác phẩm thuộc về ai?",
        answer:
          "Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.",
      },
      {
        question: "Có thể gửi nhiều tác phẩm không?",
        answer: "Có, tối đa 3 tác phẩm mỗi tác giả.",
      },
    ],
    content:
      "Workshop 2 ngày với các nghệ nhân hàng đầu của làng gốm Bát Tràng. Người tham gia sẽ được học từ khâu nhào nặn, tạo hình, trang trí đến nung gốm. Mỗi người sẽ được mang về sản phẩm gốm do chính mình làm ra.",
    date: "10/01/2025",
    time: "7 ngày",
    location: "Bát Tràng, Hà Nội",
    imageUrl:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=600&fit=crop",
    isFeatured: false,
    tags: ["workshop", "gốm sứ", "bát tràng"],
  },
  {
    id: "7",
    title: "Khóa học thư pháp chữ Nôm",
    description:
      "Học viên sẽ được tìm hiểu và thực hành nghệ thuật viết chữ Nôm cổ truyền với các thầy giáo có kinh nghiệm.",
    shortIntro:
      "Khóa học 4 tuần giới thiệu lịch sử chữ Nôm và kỹ thuật thư pháp truyền thống.",
    theme: "Bảo tồn văn tự cổ — thư pháp Nôm",
    rules: [
      {
        title: "Đối tượng",
        content:
          "Người yêu thích thư pháp, văn hóa chữ Nôm, từ 18 tuổi trở lên",
      },
      {
        title: "Số lượng tác phẩm",
        content: "Mỗi học viên hoàn thành 5 bài thư pháp trong khóa học",
      },
      {
        title: "Định dạng file",
        content: "PNG, JPEG (ảnh tác phẩm). Dung lượng ≤50MB",
      },
      { title: "Bản quyền", content: "Tác phẩm thuộc về học viên" },
      { title: "Thời gian nộp", content: "Đến hết 10/01/2025" },
      { title: "Công bố kết quả", content: "Ngày 20/01/2025" },
    ],
    requirements: [
      {
        title: "Tác phẩm",
        content:
          "Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).",
      },
      {
        title: "Kích thước",
        content: "Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.",
      },
      {
        title: "Thông tin bắt buộc",
        content:
          "Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.",
      },
      {
        title: "Bản quyền",
        content:
          "Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.",
      },
      { title: "Số lượng", content: "Mỗi người được gửi tối đa 3 tác phẩm." },
    ],
    criteria: [
      {
        title: "Sáng tạo & ý tưởng",
        percent: "40%",
        description: "Độc đáo, truyền tải ký ức/di sản.",
      },
      {
        title: "Chất lượng nghệ thuật",
        percent: "30%",
        description: "Bố cục, màu sắc, kỹ thuật.",
      },
      {
        title: "Tương tác công nghệ",
        percent: "20%",
        description: "Sử dụng AI/AR/VR/âm thanh sáng tạo.",
      },
      {
        title: "Tác động văn hóa",
        percent: "10%",
        description: "Khả năng truyền cảm hứng & giáo dục cộng đồng.",
      },
    ],
    judges:
      "Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.",
    prizes: [
      { name: "Giải Nhất", value: "10.000.000₫", bonus: "Triển lãm & ấn phẩm" },
      { name: "Giải Nhì", value: "5.000.000₫", bonus: "Triển lãm" },
      {
        name: "Giải Khuyến khích & Khán giả bình chọn",
        value: "Quà tặng",
        bonus: "Giấy chứng nhận",
      },
    ],
    faq: [
      { question: "Đăng ký có mất phí không?", answer: "Miễn phí hoàn toàn." },
      {
        question: "Bản quyền tác phẩm thuộc về ai?",
        answer:
          "Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.",
      },
      {
        question: "Có thể gửi nhiều tác phẩm không?",
        answer: "Có, tối đa 3 tác phẩm mỗi tác giả.",
      },
    ],
    content:
      "Khóa học thư pháp chữ Nôm kéo dài 4 tuần, với 2 buổi học mỗi tuần. Học viên sẽ được học về lịch sử chữ Nôm, các nét cơ bản và cách viết các bài thơ Nôm nổi tiếng. Cuối khóa, mỗi học viên sẽ có một tác phẩm hoàn chỉnh để triển lãm.",
    date: "15/01/2025",
    time: "7 ngày",
    location: "Văn Miếu - Quốc Tử Giám, Hà Nội",
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
    isFeatured: false,
    tags: ["thư pháp", "chữ nôm", "văn hóa"],
  },
  {
    id: "8",
    title: "Festival âm nhạc cổ truyền Việt Nam",
    description:
      "Liên hoan âm nhạc cổ truyền quy tụ các nghệ sĩ nổi tiếng biểu diễn ca trù, chèo, tuồng và nhã nhạc cung đình.",
    shortIntro:
      "Festival 3 ngày với hơn 30 tiết mục âm nhạc cổ truyền từ 3 miền đất nước.",
    theme: "Hòa quyện di sản âm nhạc — từ truyền thống đến hiện đại",
    rules: [
      {
        title: "Đối tượng",
        content: "Nghệ sĩ, nhóm nhạc cổ truyền, người yêu âm nhạc dân tộc",
      },
      {
        title: "Số lượng tác phẩm",
        content: "Mỗi nghệ sĩ/nhóm biểu diễn 1-2 tiết mục",
      },
      {
        title: "Định dạng file",
        content: "MP3, MP4 (video biểu diễn). Dung lượng ≤200MB",
      },
      {
        title: "Bản quyền",
        content: "Tôn trọng bản quyền tác phẩm âm nhạc truyền thống",
      },
      { title: "Thời gian nộp", content: "Đến hết 15/01/2025" },
      { title: "Công bố kết quả", content: "Ngày 25/01/2025" },
    ],
    requirements: [
      {
        title: "Tác phẩm",
        content:
          "Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).",
      },
      {
        title: "Kích thước",
        content: "Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.",
      },
      {
        title: "Thông tin bắt buộc",
        content:
          "Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.",
      },
      {
        title: "Bản quyền",
        content:
          "Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.",
      },
      { title: "Số lượng", content: "Mỗi người được gửi tối đa 3 tác phẩm." },
    ],
    criteria: [
      {
        title: "Sáng tạo & ý tưởng",
        percent: "40%",
        description: "Độc đáo, truyền tải ký ức/di sản.",
      },
      {
        title: "Chất lượng nghệ thuật",
        percent: "30%",
        description: "Bố cục, màu sắc, kỹ thuật.",
      },
      {
        title: "Tương tác công nghệ",
        percent: "20%",
        description: "Sử dụng AI/AR/VR/âm thanh sáng tạo.",
      },
      {
        title: "Tác động văn hóa",
        percent: "10%",
        description: "Khả năng truyền cảm hứng & giáo dục cộng đồng.",
      },
    ],
    judges:
      "Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.",
    prizes: [
      { name: "Giải Nhất", value: "10.000.000₫", bonus: "Triển lãm & ấn phẩm" },
      { name: "Giải Nhì", value: "5.000.000₫", bonus: "Triển lãm" },
      {
        name: "Giải Khuyến khích & Khán giả bình chọn",
        value: "Quà tặng",
        bonus: "Giấy chứng nhận",
      },
    ],
    faq: [
      { question: "Đăng ký có mất phí không?", answer: "Miễn phí hoàn toàn." },
      {
        question: "Bản quyền tác phẩm thuộc về ai?",
        answer:
          "Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.",
      },
      {
        question: "Có thể gửi nhiều tác phẩm không?",
        answer: "Có, tối đa 3 tác phẩm mỗi tác giả.",
      },
    ],
    content:
      "Festival âm nhạc cổ truyền là sự kiện văn hóa lớn nhất năm, quy tụ các nghệ sĩ ưu tú từ cả nước. Chương trình gồm các màn trình diễn ca trù, hát chèo, hát tuồng, nhã nhạc cung đình Huế, và nhiều loại hình âm nhạc dân gian khác. Đây là cơ hội để công chúng được thưởng thức nghệ thuật âm nhạc truyền thống đích thực.",
    date: "20/01/2025",
    time: "7 ngày",
    location: "Nhà hát Lớn Hà Nội",
    imageUrl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop",
    isFeatured: true,
    tags: ["âm nhạc", "festival", "ca trù"],
  },
  {
    id: "9",
    title: "Hội chợ sách cổ và tư liệu lịch sử",
    description:
      "Hội chợ trưng bày và giao lưu sách cổ, tư liệu lịch sử quý hiếm về Việt Nam từ các nhà sưu tầm.",
    shortIntro:
      "Hội chợ 2 ngày với hàng ngàn đầu sách cổ, tư liệu và bản đồ lịch sử.",
    theme: "Lưu giữ ký ức — sách cổ & tư liệu quý",
    rules: [
      {
        title: "Đối tượng",
        content: "Nhà sưu tầm, nhà nghiên cứu, sinh viên và người yêu sách cổ",
      },
      {
        title: "Số lượng tác phẩm",
        content: "Không giới hạn số lượng sách/tư liệu trưng bày",
      },
      {
        title: "Định dạng file",
        content: "PDF (catalog sách). Dung lượng ≤100MB",
      },
      {
        title: "Bản quyền",
        content: "Đảm bảo nguồn gốc hợp pháp của sách và tư liệu",
      },
      { title: "Thời gian nộp", content: "Đến hết 20/01/2025" },
      { title: "Công bố kết quả", content: "Ngày 30/01/2025" },
    ],
    requirements: [
      {
        title: "Tác phẩm",
        content:
          "Tranh (PNG/JPEG), video/animation hoặc mô tả dự án trải nghiệm (PDF + ảnh minh họa).",
      },
      {
        title: "Kích thước",
        content: "Tối đa ảnh: 10 MB; video: 100 MB; PDF: 10 MB.",
      },
      {
        title: "Thông tin bắt buộc",
        content:
          "Ghi rõ: tên tác phẩm, tác giả, năm, mô tả ngắn (≤200 từ), công cụ/AI sử dụng.",
      },
      {
        title: "Bản quyền",
        content:
          "Không vi phạm bản quyền; nếu sử dụng nội dung bên thứ ba, cần có giấy phép/ghi nguồn.",
      },
      { title: "Số lượng", content: "Mỗi người được gửi tối đa 3 tác phẩm." },
    ],
    criteria: [
      {
        title: "Sáng tạo & ý tưởng",
        percent: "40%",
        description: "Độc đáo, truyền tải ký ức/di sản.",
      },
      {
        title: "Chất lượng nghệ thuật",
        percent: "30%",
        description: "Bố cục, màu sắc, kỹ thuật.",
      },
      {
        title: "Tương tác công nghệ",
        percent: "20%",
        description: "Sử dụng AI/AR/VR/âm thanh sáng tạo.",
      },
      {
        title: "Tác động văn hóa",
        percent: "10%",
        description: "Khả năng truyền cảm hứng & giáo dục cộng đồng.",
      },
    ],
    judges:
      "Ban giám khảo gồm chuyên gia nghệ thuật, nhà sử học, và chuyên gia công nghệ AI.",
    prizes: [
      { name: "Giải Nhất", value: "10.000.000₫", bonus: "Triển lãm & ấn phẩm" },
      { name: "Giải Nhì", value: "5.000.000₫", bonus: "Triển lãm" },
      {
        name: "Giải Khuyến khích & Khán giả bình chọn",
        value: "Quà tặng",
        bonus: "Giấy chứng nhận",
      },
    ],
    faq: [
      { question: "Đăng ký có mất phí không?", answer: "Miễn phí hoàn toàn." },
      {
        question: "Bản quyền tác phẩm thuộc về ai?",
        answer:
          "Tác giả giữ bản quyền; MT4 xin quyền sử dụng cho mục đích triển lãm/truyền thông có ghi nguồn.",
      },
      {
        question: "Có thể gửi nhiều tác phẩm không?",
        answer: "Có, tối đa 3 tác phẩm mỗi tác giả.",
      },
    ],
    content:
      "Hội chợ sách cổ và tư liệu lịch sử là điểm hẹn của các nhà sưu tầm và người yêu sách cổ. Tại đây trưng bày hàng ngàn đầu sách cổ, tài liệu lịch sử, bản đồ cổ về Việt Nam từ thế kỷ 18 đến nay. Các chuyên gia sẽ tư vấn về giá trị và cách bảo quản sách cổ. Đây cũng là cơ hội để giao lưu, mua bán và trao đổi sách giữa các nhà sưu tầm.",
    date: "25/01/2025",
    time: "7 ngày",
    location: "Trung tâm Triển lãm Giảng Võ, Hà Nội",
    imageUrl:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=600&fit=crop",
    isFeatured: false,
    tags: ["sách cổ", "hội chợ", "lịch sử"],
  },
];

// Mock data for news
export const news = [
  {
    id: "1",
    title: "Phát hiện khu di tích mới tại Thăng Long",
    description:
      "Các nhà khảo cổ học vừa phát hiện một khu di tích quan trọng thuộc thời Lý - Trần tại hoàng thành Thăng Long.",
    content:
      "Khu di tích mới được phát hiện bao gồm nhiều công trình kiến trúc, các hiện vật quý giá và dấu tích sinh hoạt của cư dân thời xưa. Đây là phát hiện quan trọng giúp làm sáng tỏ thêm về lịch sử kinh đô Thăng Long ngàn năm văn hiến. Các chuyên gia đang tiến hành khai quật và nghiên cứu để có thể công bố đầy đủ về giá trị lịch sử và văn hóa của khu di tích này.",
    date: "01/12/2024",
    author: "Nguyễn Văn A",
    category: "Khảo cổ học",
    imageUrl:
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    title: "UNESCO công nhận thêm di sản văn hóa Việt Nam",
    description:
      "Di sản văn hóa phi vật thể mới của Việt Nam được UNESCO ghi danh vào danh sách đại diện.",
    content:
      "Trong phiên họp gần đây tại Paris, UNESCO đã chính thức công nhận thêm một di sản văn hóa phi vật thể của Việt Nam vào danh sách di sản văn hóa phi vật thể đại diện của nhân loại. Đây là minh chứng cho sự đa dạng và giá trị to lớn của văn hóa Việt Nam trên bản đồ văn hóa thế giới.",
    date: "28/11/2024",
    author: "Trần Thị B",
    category: "Di sản văn hóa",
    imageUrl:
      "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    title: "Nghệ thuật hát Xẩm được bảo tồn và phát huy",
    description:
      "Dự án bảo tồn nghệ thuật hát Xẩm truyền thống đang mang lại những kết quả khả quan.",
    content:
      "Sau 3 năm triển khai, dự án bảo tồn nghệ thuật hát Xẩm đã đào tạo được hơn 50 nghệ nhân trẻ, tổ chức nhiều buổi biểu diễn và ghi âm lưu trữ hàng trăm ca khúc Xẩm truyền thống. Nghệ thuật hát Xẩm đang dần được giới trẻ quan tâm và yêu thích hơn.",
    date: "25/11/2024",
    author: "Lê Văn C",
    category: "Nghệ thuật truyền thống",
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    title: "Triển lãm ảnh lịch sử Việt Nam thế kỷ 20",
    description:
      "Hơn 500 bức ảnh quý hiếm về Việt Nam thế kỷ 20 được trưng bày tại bảo tàng Lịch sử.",
    content:
      "Triển lãm quy tụ những bức ảnh quý hiếm ghi lại những khoảnh khắc lịch sử quan trọng của đất nước, từ thời kỳ đầu thế kỷ 20 đến những năm đầu thống nhất đất nước. Đây là cơ hội tuyệt vời để công chúng được chiêm ngưỡng những tư liệu ảnh có giá trị lịch sử cao.",
    date: "20/11/2024",
    author: "Phạm Thị D",
    category: "Triển lãm",
    imageUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=600&fit=crop",
  },
  {
    id: "5",
    title: "Khôi phục nghề dệt thổ cẩm truyền thống",
    description:
      "Các nghệ nhân đang nỗ lực khôi phục và phát triển nghề dệt thổ cẩm của đồng bào dân tộc thiểu số.",
    content:
      "Nghề dệt thổ cẩm truyền thống của các dân tộc thiểu số miền núi đang được khôi phục và phát triển nhờ sự nỗ lực của các nghệ nhân và sự hỗ trợ của chính quyền địa phương. Sản phẩm thổ cẩm hiện đại vừa giữ được nét truyền thống vừa đáp ứng nhu cầu thị trường.",
    date: "15/11/2024",
    author: "Hoàng Văn E",
    category: "Nghề truyền thống",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
  },
  {
    id: "6",
    title: "Lễ hội đền Hùng thu hút hàng triệu lượt khách",
    description:
      "Lễ hội đền Hùng năm nay đã thu hút hơn 3 triệu lượt khách về dâng hương tưởng nhớ công đức tổ tiên.",
    content:
      'Với ý nghĩa "Uống nước nhớ nguồn", lễ hội đền Hùng năm nay diễn ra trang trọng và đậm đà bản sắc văn hóa dân tộc. Bên cạnh lễ dâng hương, nhiều hoạt động văn hóa, nghệ thuật và thể thao dân gian được tổ chức, góp phần gìn giữ và phát huy giá trị văn hóa truyền thống.',
    date: "10/11/2024",
    author: "Vũ Thị F",
    category: "Lễ hội",
    imageUrl:
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop",
  },
  {
    id: "7",
    title: "Chùa Một Cột được tu bổ và tôn tạo",
    description:
      "Công trình tu bổ chùa Một Cột vừa hoàn thành, giữ nguyên được kiến trúc độc đáo từ thế kỷ 11.",
    content:
      "Sau 6 tháng thi công, công trình tu bổ chùa Một Cột đã hoàn thành với sự tham gia của các chuyên gia kiến trúc và nghệ nhân hàng đầu. Công trình giữ nguyên được nét kiến trúc độc đáo, tinh xảo của ngôi chùa được xây dựng từ thời Lý Thánh Tông. Chùa Một Cột được UNESCO công nhận là di tích kiến trúc có giá trị đặc biệt.",
    date: "05/11/2024",
    author: "Đỗ Minh Tuấn",
    category: "Kiến trúc",
    imageUrl:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&h=600&fit=crop",
  },
  {
    id: "8",
    title: "Làng nghề truyền thống được đầu tư phát triển du lịch",
    description:
      "Nhiều làng nghề truyền thống đang chuyển mình thành điểm đến du lịch hấp dẫn cho du khách trong và ngoài nước.",
    content:
      "Các làng nghề như làng gốm Bát Tràng, làng lụa Vạn Phúc, làng tranh Đông Hồ đang được đầu tư phát triển hạ tầng và dịch vụ du lịch. Du khách không chỉ được chiêm ngưỡng sản phẩm thủ công mà còn được trải nghiệm làm nghề cùng nghệ nhân. Mô hình này vừa bảo tồn nghề truyền thống vừa tạo thu nhập cho người dân địa phương.",
    date: "02/11/2024",
    author: "Bùi Thu Hương",
    category: "Du lịch văn hóa",
    imageUrl:
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop",
  },
  {
    id: "9",
    title: "Bảo tàng Hồ Chí Minh kỷ niệm 50 năm thành lập",
    description:
      "Bảo tàng Hồ Chí Minh tổ chức chuỗi sự kiện kỷ niệm 50 năm thành lập với nhiều hoạt động ý nghĩa.",
    content:
      "Nhân dịp kỷ niệm 50 năm thành lập, Bảo tàng Hồ Chí Minh tổ chức triển lãm đặc biệt với hơn 1000 hiện vật quý hiếm về cuộc đời và sự nghiệp của Chủ tịch Hồ Chí Minh. Bên cạnh đó, nhiều hoạt động như tọa đàm, chiếu phim tài liệu, và các chương trình giáo dục cho học sinh được tổ chức xuyên suốt tháng 11.",
    date: "30/10/2024",
    author: "Ngô Thanh Long",
    category: "Bảo tàng",
    imageUrl:
      "https://images.unsplash.com/photo-1566127444979-b3d2b654e3b7?w=800&h=600&fit=crop",
  },
];

// Mock data for speakers
export const speakers = [
  {
    id: "1",
    name: "GS.TS Nguyễn Văn Huy",
    title: "Chuyên gia Di sản văn hóa",
    bio: "Giáo sư Nguyễn Văn Huy là một trong những chuyên gia hàng đầu về di sản văn hóa phi vật thể tại Việt Nam. Ông có hơn 30 năm kinh nghiệm trong nghiên cứu và bảo tồn di sản.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    expertise: ["Di sản văn hóa", "Nhân học", "Bảo tồn"],
  },
  {
    id: "2",
    name: "PGS.TS Trần Thị Mai",
    title: "Nhà khảo cổ học",
    bio: "Phó Giáo sư Trần Thị Mai chuyên về khảo cổ học thời tiền sử và lịch sử Việt Nam. Bà đã tham gia nhiều dự án khai quật và nghiên cứu di tích quan trọng.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    expertise: ["Khảo cổ học", "Lịch sử", "Di tích"],
  },
  {
    id: "3",
    name: "TS Lê Quang Minh",
    title: "Chuyên gia Kiến trúc cổ",
    bio: "Tiến sĩ Lê Quang Minh là chuyên gia về kiến trúc cổ Việt Nam, đặc biệt là kiến trúc thời Lý - Trần. Ông đã công bố nhiều công trình nghiên cứu có giá trị.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    expertise: ["Kiến trúc cổ", "Bảo tồn công trình", "Lịch sử kiến trúc"],
  },
  {
    id: "4",
    name: "ThS Phạm Thu Hà",
    title: "Chuyên gia Nghệ thuật dân gian",
    bio: "Thạc sĩ Phạm Thu Hà chuyên nghiên cứu về nghệ thuật dân gian Việt Nam, đặc biệt là tranh dân gian và điêu khắc truyền thống. Cô đã tổ chức nhiều triển lãm nghệ thuật dân gian.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    expertise: ["Nghệ thuật dân gian", "Điêu khắc", "Hội họa"],
  },
  {
    id: "5",
    name: "TS Hoàng Văn Nam",
    title: "Chuyên gia Văn hóa dân tộc",
    bio: "Tiến sĩ Hoàng Văn Nam có nhiều năm nghiên cứu về văn hóa các dân tộc thiểu số Việt Nam. Ông đã thực hiện nhiều chuyến khảo sát thực địa và xuất bản nhiều tác phẩm giá trị.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    expertise: ["Văn hóa dân tộc", "Nhân học", "Nghiên cứu thực địa"],
  },
  {
    id: "6",
    name: "PGS.TS Đặng Thị Lan",
    title: "Chuyên gia Âm nhạc truyền thống",
    bio: "Phó Giáo sư Đặng Thị Lan là chuyên gia hàng đầu về âm nhạc truyền thống Việt Nam. Bà đã góp phần lớn trong việc bảo tồn và phát huy các loại hình âm nhạc dân gian.",
    imageUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    expertise: ["Âm nhạc truyền thống", "Dân ca", "Bảo tồn di sản âm nhạc"],
  },
];

// Mock data for dynasty history
export const dynastyData = {
  prehistory: {
    title: "Thời Tiền Sử - Hồng Bàng (40.000 TCN - 258 TCN)",
    img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770337164/download_dhxgzs.jpg",
    desc: "Người Việt cổ sinh sống tại hang động, ven sông, ven biển, sống chủ yếu bằng săn bắn và hái lượm. Thời kỳ các vua Hùng dựng nước Văn Lang.",
    figures: [
      {
        name: "Kinh Dương Vương",
        per: "Thời Kỳ Đồ Đá Khoảng 40.000 – 3.000 TCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770199678/kinh-duong-vuong-1_h3rtgy.jpg",
        bio: "Kinh Dương Vương được xem là vị thủy tổ trong truyền thuyết dựng nước của người Việt. Ông tượng trưng cho giai đoạn hình thành sớm nhất của cộng đồng cư dân Việt cổ, khi con người sống chủ yếu bằng săn bắt, hái lượm và bắt đầu biết chế tác công cụ đá. Dù mang tính huyền thoại, hình tượng Kinh Dương Vương phản ánh nhận thức của người Việt về cội nguồn dân tộc, đánh dấu bước khởi đầu của quá trình hình thành xã hội nguyên thủy trên đất Việt.",
      },
      {
        name: "Hùng Quốc Vương",
        per: "Thời kỳ Đồ Đồng – Đồ Sắt Khoảng 3.000 TCN – 1.000 TCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211092/image_4_uwmxvg.webp",
        bio: "Hùng Quốc Vương là danh xưng chung cho các thủ lĩnh bộ lạc trong giai đoạn chuyển tiếp từ xã hội nguyên thủy sang xã hội có tổ chức cao hơn. Thời kì này, cư dân Việt cổ đã biết luyện kim, chế tác công cụ bằng đồng và sắt, phát triển nông nghiệp trồng lúa nước. Sự xuất hiện của các thủ lĩnh đứng đầu cộng đồng phản ánh bước tiến quan trọng trong tổ chức xã hội, đặt nền móng cho nhà nước sơ khai sau này",
      },
      {
        name: "Các Vua Hùng",
        per: "Văn Hóa Đông Sơn 700 TCN – 100 SCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211727/T%C6%B0%E1%BB%A3ng_H%C3%B9ng_V%C6%B0%C6%A1ng_t%E1%BA%A1i_%C4%90%E1%BB%81n_H%C3%B9ng__Tao_%C4%90%C3%A0n__th%C3%A1ng_12_n%C4%83m_2021__12_gecfcv.jpg",
        bio: "Vua Hùng là biểu tượng tiêu biểu nhất của văn hóa Đông Sơn và thời đại dựng nước Văn Lang. Dưới thời các Vua Hùng, cư dân Đông Sơn đạt trình độ phát triển cao về kỹ thuật luyện đồng, tiêu biểu là trống đồng Đông Sơn – biểu tượng quyền lực, tín ngưỡng và đời sống tinh thần. Xã hội có tổ chức chặt chẽ hơn, kinh tế nông nghiệp lúa nước phát triển, đời sống văn hóa phong phú. Thời đại Hùng Vương đánh dấu bước hình thành rõ nét của quốc gia sơ khai đầu tiên trong lịch sử Việt Nam.",
      },
      {
        name: "Hùng Vương",
        per: "Thời Đại Các Vua Hùng 2879 TCN - 258 TCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215110/vua-hung-10421458_tsylje.webp",
        bio: "Người con trưởng của Lạc Long Quân và Âu Cơ được tôn làm Hùng Vương, lập nên nhà nước Văn Lang và đóng đô tại Phong Châu. Các vua Hùng nối tiếp nhau cai trị đất nước cho đến năm 258 TCN.",
      },
      {
        name: "Lạc Long Quân Và Âu Cơ",
        per: "Truyền Thuyết Con Rồng Cháu Tiên",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770214260/image_6_jbfaph.jpg",
        bio: "Lạc Long Quân là vị vua thuộc dòng giống rồng, cai quản vùng ven biển. Ông được xem là thủy tổ của người Việt theo truyền thuyết, có vai trò dẫn dắt cộng đồng cư dân Việt cổ. Âu Cơ là tiên nữ sống ở miền núi, kết duyên với Lạc Long Quân và sinh ra một bọc trăm trứng, nở thành một trăm người con – tổ tiên chung của dân tộc Việt. Cuộc hôn phối giữa Lạc Long Quân và Âu Cơ sinh ra bọc trăm trứng, nở thành 100 người con, biểu tượng cho sự thống nhất nguồn gốc của dân tộc Việt. Việc chia 50 con theo cha xuống biển, 50 con theo mẹ lên núi thể hiện sự hình thành cộng đồng người Việt trên khắp vùng đồng bằng, trung du và miền núi, đồng thời phản ánh đặc điểm địa lý và lối sống đa dạng của cư dân Việt cổ. Hình tượng Lạc Long Quân không chỉ mang ý nghĩa truyền thuyết mà còn khẳng định ý thức cội nguồn, tinh thần đoàn kết dân tộc và khát vọng dựng nước từ thời sơ khai, trở thành nền tảng tinh thần cho lịch sử Việt Nam sau này",
      },
      {
        name: "Thục Phán An Dương Vương",
        per: "Nhà Nước Văn Lang 2879 TCN - 258 TCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770213329/Hung-Vuong-146034078_yfxoha.jpg",
        bio: "Ông là người lãnh đạo tối cao của Âu Lạc trong cuộc kháng chiến chống quân Tần năm 218 TCN. An Dương Vương đã thống nhất Âu Việt và Lạc Việt, xây dựng nhà nước Âu Lạc, tổ chức phòng thủ chặt chẽ và trực tiếp chỉ đạo kháng chiến. Dưới sự lãnh đạo của ông, quân Tần gặp nhiều khó khăn, không thể nhanh chóng thôn tính Âu Lạc",
      },
      {
        name: "Thánh Gióng",
        per: "Truyền thuyết Thánh Gióng",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215736/Phu_Dong_Thien_Vuong_01_jozy3e.jpg",
        bio: "Thánh Gióng là hình tượng tiêu biểu cho người anh hùng chống ngoại xâm thời Hùng Vương. Nhân vật đại diện cho sức mạnh, tinh thần đoàn kết và ý chí bảo vệ đất nước của dân tộc Việt cổ. Truyền thuyết Thánh Gióng phản ánh khát vọng đánh giặc, giữ nước và niềm tin rằng khi Tổ quốc lâm nguy, nhân dân sẽ xuất hiện những con người phi thường đứng lên cứu nước",
      },
    ],
    events: [
      {
        name: "Thời kỳ Đồ đá",
        year: "≈ 40.000 – 3.000 TCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770200745/image_6_nolo3l.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770200745/image_5_eyfzyu.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770200745/image_4_jidge3.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770200745/image_6_s2t3ed.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770200745/image_4_ch9cbb.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770200745/image_3_mafh5w.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770200744/image_3_na5ukc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770200744/image_7_ve8zmh.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770200744/image_7_oku4aa.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770200744/image_8_bfw9lu.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770200743/image_2_zabg5f.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770200743/image_8_wtjy2m.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Thời Kỳ Đồ Đá đánh dấu bước phát triển quan trọng khi con người biết chế tác công cụ tinh xảo hơn, biết mài nhẵn đá và sử dụng hiệu quả trong lao động. Đời sống dần ổn định, cư dân bắt đầu gắn bó lâu dài với các khu vực ven sông và đồng bằng.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Bối cảnh tự nhiên và con người:</strong> Khí hậu dần ổn định hơn so với thời kỳ trước, tạo điều kiện cho con người mở rộng phạm vi sinh sống. Các nhóm người vẫn chưa hình thành nhà nước, nhưng đã có sự liên kết cộng đồng bền chặt hơn.<br>
        🪓 <strong>Công cụ đá mới:</strong> Con người biết chế tác rìu, cuốc, dao đá có hình dáng rõ ràng. Công cụ sắc bén giúp họ phát rừng, trồng trọt và xây dựng nơi cư trú kiên cố hơn.<br>
        🏠 <strong>Đời sống định cư:</strong> Việc trồng lúa nước sơ khai giúp con người không còn phụ thuộc hoàn toàn vào săn bắt. Làng xóm xuất hiện với các mối quan hệ xã hội ổn định hơn.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Thời kỳ này đặt nền móng cho nông nghiệp, làng xã và các hình thức tổ chức cộng đồng, chuẩn bị cho sự ra đời của xã hội phức tạp hơn.</p>`,
      },
      {
        name: "Thời kỳ Đồ đồng – Đồ sắt",
        year: "≈ 3.000 – 1.000 TCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211098/image_8_bvbjma.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211100/image_5_o7yehq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211098/image_6_h71hiv.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211099/image_9_t4gbx5.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Thời Kỳ Đồ Đồng – Đồ Sắt là giai đoạn con người biết sử dụng kim loại để chế tác công cụ và vũ khí. Nông nghiệp phát triển mạnh, dân cư đông đúc hơn và xã hội bắt đầu phân hóa.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Sự chuyển biến kỹ thuật:</strong> Việc sử dụng đồng và sắt giúp nâng cao năng suất lao động. Công cụ bền hơn, sắc hơn, phục vụ cả sản xuất và chiến đấu.<br>
        🛡️ <strong>Tổ chức xã hội:</strong> Xuất hiện tầng lớp có quyền lực, thủ lĩnh đứng đầu các cộng đồng. Các mối quan hệ xã hội trở nên phức tạp hơn.<br>
        🎨 <strong>Đời sống tinh thần:</strong> Nghi lễ, lễ hội gắn với nông nghiệp và tín ngưỡng tự nhiên phát triển mạnh.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Giai đoạn này là tiền đề cho sự hình thành nhà nước sơ khai và văn minh bản địa.</p>`,
      },
      {
        name: "Thời kỳ Đồ gốm sơ khai",
        year: "≈ 1.500 – 700 TCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770432945/9fd7a39e-b960-4300-a2a6-00cd37f97a1f.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770432972/c5375533-31b2-4fc2-8c90-42c5839ebe6d.png",
        ],
        content: `<p>Kỹ thuật chế tác gốm, định cư và đời sống tinh thần phát triển.</p>`,
      },

      {
        name: "Văn hóa Đông Sơn",
        year: "700 TCN – 100 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211955/image_1_sddubb.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211955/image_9_wud2go.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211957/image_3_lspt5p.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211961/image_4_xvc6qp.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211956/image_2_avrji8.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211956/image_3_zol7ls.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211955/image_8_a3uujd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211955/image_10_vlfvex.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211954/image_7_ymkrdn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770211953/image_5_nolf4o.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Văn hóa Đông Sơn là giai đoạn phát triển rực rỡ của cư dân Việt cổ, gắn liền với kỹ thuật luyện đồng đạt đến trình độ cao. Đây là thời kỳ đánh dấu sự ổn định lâu dài của đời sống nông nghiệp, sự mở rộng cộng đồng cư dân và sự hình thành rõ nét bản sắc văn hóa Việt cổ.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Bối cảnh hình thành:</strong> Cư dân Đông Sơn sinh sống chủ yếu ở lưu vực sông Hồng, sông Mã và sông Cả. Điều kiện tự nhiên thuận lợi cho trồng lúa nước, chăn nuôi và đánh bắt thủy sản.<br>
        🪓 <strong>Trình độ kỹ thuật:</strong> Kỹ thuật đúc đồng đạt đến đỉnh cao với trống đồng, vũ khí, công cụ và đồ trang sức. Trống đồng không chỉ là nhạc cụ mà còn mang ý nghĩa nghi lễ và quyền lực.<br>
        🏠 <strong>Tổ chức cộng đồng:</strong> Các làng xóm phát triển ổn định, có sự phân hóa giàu nghèo bước đầu. Thủ lĩnh bộ lạc giữ vai trò điều hành sản xuất và nghi lễ.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Văn hóa Đông Sơn đặt nền móng cho nhà nước sơ khai, thể hiện rõ sự phát triển toàn diện cả vật chất lẫn tinh thần của người Việt cổ.</p>`,
      },
      {
        name: "Thời Đại Các Vua Hùng",
        year: "2879 – 258 TCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770213612/image_2_vs9vxw.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770213611/image_7_m4j0nd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770213610/image_5_mrz3ck.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770213611/image_4_hqcf3q.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770213611/image_4_i8gaix.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770213614/image_9_vw3si7.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770213612/image_6_brdoaf.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770213612/image_10_ec3vn3.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Thời Đại Các Vua Hùng gắn liền với quá trình hình thành quốc gia sơ khai đầu tiên của người Việt. Đây là giai đoạn cộng đồng cư dân Lạc Việt phát triển mạnh mẽ, hình thành ý thức lãnh thổ và nguồn gốc dân tộc.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Hoàn cảnh lịch sử:</strong><br>
        Các bộ lạc liên kết với nhau thành liên minh rộng lớn dưới sự lãnh đạo của các vua Hùng. Trung tâm cư trú nằm ở vùng trung du và đồng bằng Bắc Bộ.<br>
        🏠 <strong>Tổ chức nhà nước:</strong><br>
        Nhà nước Văn Lang tuy còn sơ khai nhưng đã có bộ máy quản lý đơn giản gồm vua, lạc hầu, lạc tướng.<br>
        🌾 <strong>Đời sống kinh tế:</strong><br>
        Nông nghiệp lúa nước là chủ đạo, kết hợp chăn nuôi và thủ công nghiệp.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong><br>
        Thời đại Hùng Vương hình thành nền tảng quốc gia, tạo nên cội nguồn tinh thần và lịch sử lâu dài của dân tộc Việt.</p>`,
      },
      {
        name: "Nhà Nước Văn Lang",
        year: "2879 – 258 TCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215296/image_2_t2sshf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215297/image_3_t2a0wm.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215296/image_4_kh1nf1.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215297/image_10_x9bgfk.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215297/image_9_pxmtgw.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215296/image_7_kxjvbb.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Nhà nước Văn Lang là nhà nước sơ khai đầu tiên của người Việt, đánh dấu bước chuyển từ xã hội bộ lạc sang xã hội có tổ chức nhà nước.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Bộ máy quản lý:</strong> Đứng đầu là vua Hùng, dưới có lạc hầu, lạc tướng quản lý các bộ lạc.<br>
        🌾 <strong>Kinh tế:</strong> Nông nghiệp lúa nước phát triển, kết hợp thủ công nghiệp và trao đổi sản phẩm.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Văn Lang khẳng định sự trưởng thành của xã hội Việt cổ, tạo tiền đề cho các nhà nước sau này.</p>`,
      },
      {
        name: "Truyền Thuyết Con Rồng Cháu Tiên",
        year: "Không rõ",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770214438/image_2_u9oces.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770214439/image_4_yof8sa.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770214438/image_3_mbg7rq.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770214437/image_5_arnrmc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770214437/image_10_vai3e7.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770214436/image_7_jhghlx.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770214439/image_10_iqvtfd.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Truyền thuyết Con Rồng Cháu Tiên phản ánh nhận thức của người Việt cổ về nguồn gốc dân tộc và sự gắn bó cộng đồng. Đây không chỉ là câu chuyện huyền thoại mà còn mang giá trị tinh thần sâu sắc.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Nội dung truyền thuyết:</strong> Lạc Long Quân và Âu Cơ sinh ra bọc trăm trứng, tượng trưng cho nguồn gốc chung của cộng đồng người Việt.<br>
        🧠 <strong>Ý nghĩa tư tưởng:</strong> Truyền thuyết khẳng định tinh thần đoàn kết, dù sống ở miền núi hay miền biển đều chung một cội nguồn.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Góp phần củng cố ý thức cộng đồng, tạo nền tảng tinh thần cho sự hình thành và duy trì quốc gia sơ khai.</p>`,
      },
      {
        name: "Truyền thuyết Thánh Gióng",
        year: "Không rõ",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215935/image_2_kbldmr.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215934/image_9_aojsyc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215934/image_4_mdf85x.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215934/image_6_u3ytjt.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215935/image_8_kij4em.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215937/image_10_iohibq.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770215935/image_2_mdwwyk.webp",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Truyền thuyết Thánh Gióng phản ánh tinh thần chống ngoại xâm và khát vọng bảo vệ cộng đồng của người Việt cổ. Hình tượng Thánh Gióng tượng trưng cho sức mạnh tập thể, khi cả cộng đồng cùng nuôi dưỡng, chung tay tạo nên người anh hùng bảo vệ đất nước.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Bối cảnh truyền thuyết:</strong> Câu chuyện ra đời trong bối cảnh các cộng đồng người Việt phải thường xuyên đối mặt với thiên tai và ngoại xâm. Hình ảnh giặc Ân phản ánh ký ức về những cuộc xung đột sớm trong lịch sử.<br>
        🛡️ <strong>Hình tượng Thánh Gióng:</strong> Thánh Gióng lớn lên từ sự đùm bọc của dân làng, thể hiện vai trò của cộng đồng trong việc tạo nên sức mạnh chung. Vũ khí tre sắt tượng trưng cho việc tận dụng mọi nguồn lực để chống giặc.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Truyền thuyết khẳng định tinh thần đoàn kết, ý thức bảo vệ lãnh thổ và niềm tin rằng sức mạnh cộng đồng có thể chiến thắng mọi thế lực xâm lược.</p>`,
      },
      {
        name: "Lễ hội Đền Hùng (10/3 âm lịch)",
        year: "2879 – 258 TCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770433928/67c29427-add7-4e08-9c78-e0eccc3c5c4a.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770433930/32090143-4418-49e0-a026-552d6dbada4e.png",
        ],
        content: `<p>Lễ hội Đền Hùng (mùng 10/3 âm lịch) là ngày giỗ Tổ linh thiêng của dân tộc Việt Nam, tưởng nhớ các Vua Hùng có công dựng nước.</p>`,
      },
    ],
  },

  aulac: {
    title: "Nước Âu Lạc & Thời Bắc Thuộc 257 TCN - 938",
    img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770338389/2-Su-ra-doi-cua-nha-nuoc-Van-Lang-300x225_fd7txl.jpg",
    desc: "Nước Âu Lạc là bước phát triển cao hơn của nhà nước Văn Lang, hợp nhất các bộ tộc Việt cổ - gần 1000 năm đấu tranh giành độc lập dưới sự thống trị của các triều đại phương Bắc.",
    figures: [
      {
        name: "An Dương Vương",
        per: "An Dương Vương lập nước Âu Lạc – thành Cổ Loa 257 TCN – Khoảng 179 TCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770216772/AnDuongVuong__crop_kwk9jd.jpg",
        bio: "An Dương Vương là người sáng lập nước Âu Lạc trên cơ sở hợp nhất đất Âu Việt và Lạc Việt. Ông dời đô về Cổ Loa và cho xây dựng Thành Cổ Loa – một công trình quân sự lớn, thể hiện trình độ tổ chức xã hội và kỹ thuật xây dựng vượt bậc của cư dân thời cổ. Dưới thời An Dương Vương, nhà nước Âu Lạc có bộ máy cai quản tương đối hoàn chỉnh, quân đội được tổ chức chặt chẽ, vũ khí tiêu biểu là nỏ liên châu. Tuy nhiên, do chủ quan và mất cảnh giác trước âm mưu xâm lược, ông để mất nước vào tay Triệu Đà, kết thúc thời kì quốc gia độc lập đầu tiên sau thời Hùng Vương. Dưới thời ông, thành Cổ Loa được xây dựng như một trung tâm chính trị, quân sự lớn, thể hiện trình độ tổ chức và phòng thủ cao. Vì vậy, An Dương Vương là danh nhân tiêu biểu nhất của nước Âu Lạc trong giai đoạn này.",
      },
      {
        name: "Tần Thủy Hoàng",
        per: "Cuộc xâm lược của nhà Tần vào đất Âu Lạc 218 TCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770250318/Ly-do-khien-ca-ngan-my-nu-vay-quanh-nhung-Tan-Thuy-Hoang-van-chua-mot-lan-lap-hau-376-1526315719-width352height500_j5tnvo.jpg",
        bio: "Tần Thủy Hoàng là hoàng đế đầu tiên của Trung Quốc, người thực hiện chính sách bành trướng lãnh thổ về phía Nam. Năm 218 TCN, ông sai quân tiến đánh vùng đất Bách Việt, trong đó có Âu Lạc, nhằm mở rộng quyền kiểm soát. Cuộc xâm lược này gặp sự kháng cự quyết liệt của cư dân bản địa và gặp nhiều khó khăn do địa hình hiểm trở, khí hậu khắc nghiệt. Dù quân Tần có ưu thế về số lượng, chiến dịch này không đạt được thắng lợi nhanh chóng như mong muốn",
      },
      {
        name: "Triệu Đà",
        per: "Nước Âu Lạc bị Triệu Đà thôn tính 179 TCN và Nhà Triệu - sự sáp nhập Âu Lạc 179 TCN - 111 TCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770264721/image1_uiasv3.png",
        bio: "Triệu Đà là người đứng đầu nước Nam Việt, sử dụng cả sức mạnh quân sự lẫn mưu kế chính trị để thôn tính Âu Lạc. Ông cho con trai là Trọng Thủy kết hôn với công chúa Mỵ Châu nhằm dò xét bí mật quân sự của Âu Lạc. Sau khi nắm được điểm yếu của nỏ thần, Triệu Đà tiến quân xâm lược và đánh bại An Dương Vương, khiến nước Âu Lạc sụp đổ vào năm 179 TCN. Triệu Đà là nhân vật mở đầu giai đoạn Âu Lạc bị sáp nhập vào Nam Việt. Năm 179 TCN, ông đánh bại An Dương Vương, chấm dứt nhà nước Âu Lạc. Triệu Đà thi hành chính sách cai trị mềm dẻo: vừa tiếp thu mô hình quản lý của nhà Hán, vừa duy trì phong tục bản địa để ổn định vùng đất mới chiếm. Nhân vật này đánh dấu bước chuyển quan trọng khi lãnh thổ người Việt bắt đầu chịu ảnh hưởng sâu sắc từ phương Bắc.",
      },
      {
        name: "Trưng Trắc",
        per: "Nam Việt diệt vong – Nhà Hán thiết lập chính quyền đô hộ 111 TCN – 34 SCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770264649/image_tydc5j.png",
        bio: "Trưng Trắc là người lãnh đạo cuộc khởi nghĩa Hai Bà Trưng năm 40, cuộc đấu tranh lớn đầu tiên của nhân dân ta chống lại ách đô hộ của nhà Hán. Cuộc khởi nghĩa nhanh chóng giành được chính quyền ở nhiều quận huyện và khôi phục nền tự chủ trong thời gian ngắn. Hình ảnh Trưng Trắc thể hiện rõ tinh thần quật khởi, ý chí độc lập và vai trò của người Việt trong giai đoạn đầu chống chính quyền đô hộ phương Bắc",
      },
      {
        name: "Trưng Trắc và Trưng Nhị",
        per: "Khởi nghĩa Hai Bà Trưng 40 SCN – 43 SCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254399/eab955b3-4d93-4419-adab-1551091a17b9_q1lprm.jpg",
        bio: "Trưng Trắc là người lãnh đạo chính, Trưng Nhị là em gái, cùng trực tiếp chỉ huy nghĩa quân. Hai bà cùng phất cờ khởi nghĩa năm 40, đánh đuổi quan lại nhà Hán, giành lại quyền tự chủ trong 3 năm. Hai Bà Trưng là biểu tượng tiêu biểu nhất cho tinh thần quật khởi, lòng yêu nước và vai trò của phụ nữ Việt Nam trong lịch sử chống đô hộ",
      },
      {
        name: "Khu Liên",
        per: "Sự Hình Thành Ban Đầu Của Nước Champa 192 SCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255029/vua-cham-pa_fetxiz.jpg",
        bio: "Khu Liên là thủ lĩnh đã lãnh đạo cuộc nổi dậy của nhân dân Tượng Lâm năm 192 chống lại sự cai trị của nhà Hán. Cuộc khởi nghĩa thắng lợi, Khu Liên giành quyền tự chủ và đặt nền móng cho sự ra đời của nhà nước Lâm Ấp, tiền thân của vương quốc Champa sau này. Vì vậy, Khu Liên được xem là danh nhân tiêu biểu nhất trong giai đoạn hình thành ban đầu của Champa",
      },
      {
        name: "Bà Triệu (Triệu Thị Trinh)",
        per: "Khởi Nghĩa Bà Triệu 248 SCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770264437/ba-trieu-ra-tran_lwtuak.jpg",
        bio: "Bà Triệu là người lãnh đạo cuộc khởi nghĩa chống lại ách đô hộ của nhà Đông Ngô năm 248. Với ý chí kiên cường và tinh thần bất khuất, bà trở thành biểu tượng tiêu biểu của lòng yêu nước và khát vọng độc lập của dân tộc Việt Nam trong thời kỳ Bắc thuộc",
      },
      {
        name: "Lý Bí (Lý Nam Đế)",
        per: "Khởi Nghĩa Lý Bí và Sự Ra Đời Nhà Nước Vạn Xuân 542 – 602",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770264354/ly-bi_siislr.jpg",
        bio: "Lý Bí là người lãnh đạo cuộc khởi nghĩa năm 542 chống ách đô hộ của nhà Lương. Sau thắng lợi, ông xưng đế năm 544, lập ra nhà nước Vạn Xuân, đặt nền móng cho một nhà nước độc lập, tự chủ lâu dài. Vì vậy, Lý Bí (Lý Nam Đế) là danh nhân tiêu biểu nhất của giai đoạn này",
      },
      {
        name: "Mai Thúc Loan",
        per: "Khởi Nghĩa Mai Thúc Loan 722 SCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770265091/Mai_h%E1%BA%AFc_%C4%91%E1%BA%BF_yyzp7u.png",
        bio: "Còn gọi là Mai Hắc Đế, là người lãnh đạo cuộc khởi nghĩa lớn chống lại ách đô hộ của nhà Đường vào năm 722 SCN. Xuất thân từ tầng lớp nông dân ở Hoan Châu, ông đã tập hợp đông đảo nhân dân đứng lên phản kháng sự bóc lột nặng nề của chính quyền đô hộ, đặc biệt là việc bắt dân đi cống nạp và lao dịch. Cuộc khởi nghĩa nhanh chóng lan rộng, ông tự xưng là Hoàng đế, lập căn cứ và tổ chức bộ máy cai trị. Dù cuối cùng bị nhà Đường đàn áp, khởi nghĩa Mai Thúc Loan thể hiện tinh thần quật cường của nhân dân ta và để lại dấu ấn mạnh mẽ trong lịch sử đấu tranh giành độc lập thời Bắc thuộc",
      },
      {
        name: "Phùng Hưng",
        per: "Khởi nghĩa Phùng Hưng 791 SCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770266797/acae5e2e-7879-482e-bc70-75b594cf96b0.png",
        bio: "Phùng Hưng là hào trưởng có uy tín lớn ở vùng Đường Lâm. Trước sự áp bức, bóc lột nặng nề của chính quyền đô hộ nhà Đường, ông đã tập hợp lực lượng nhân dân nổi dậy khởi nghĩa. Nghĩa quân nhanh chóng chiếm được thành Tống Bình, lật đổ ách cai trị của quan lại phương Bắc và làm chủ đất nước trong một thời gian. Dù khởi nghĩa sau đó bị đàn áp, Phùng Hưng vẫn được nhân dân tôn kính, suy tôn là Bố Cái Đại Vương, thể hiện lòng biết ơn sâu sắc đối với người lãnh đạo đã dám đứng lên vì dân tộc",
      },
      {
        name: "Khúc Thừa Dụ",
        per: "Khúc Thừa Dụ và Bước Mở Đầu Cho Nền Tự Chủ 905 SCN - 931 SCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770270663/e5a871a0-030d-4af3-98d7-cb9139cb1411.png",
        bio: "Khúc Thừa Dụ là hào trưởng lớn ở Hồng Châu, có thế lực và uy tín sâu rộng trong nhân dân. Trong bối cảnh nhà Đường suy yếu, ông đã giành quyền tự chủ bằng con đường hòa bình, không đổ máu, được chính quyền phương Bắc công nhận chức Tiết độ sứ. Việc này chấm dứt sự cai trị trực tiếp kéo dài hàng thế kỷ, mở ra giai đoạn tự chủ của dân tộc Việt. Khúc Thừa Dụ được xem là người đặt nền móng đầu tiên cho quá trình giành lại độc lập hoàn toàn",
      },
      {
        name: "Dương Đình Nghệ",
        per: "Dương Đình Nghệ và Sự Nghiệp Giữ Vững Độc Lập 931 SCN – 937 SCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770271339/ff073aa4-e914-4f05-87fb-f9fc70c8601d.png",
        bio: "Dương Đình Nghệ là tướng tài, từng phò tá họ Khúc. Khi nhà Nam Hán đem quân xâm lược, ông đã lãnh đạo quân dân đánh bại quân xâm lược, giữ vững nền tự chủ còn non trẻ. Dưới thời ông, đất nước tương đối ổn định, tạo tiền đề quan trọng cho thắng lợi quyết định của Ngô Quyền sau này. Dương Đình Nghệ là hình mẫu của một vị tướng trung nghĩa, đặt lợi ích dân tộc lên trên hết",
      },
      {
        name: "Ngô Quyền",
        per: "Thời Kỳ Bắc Thuộc 179 TCN - 938 và Ngô Quyền Đại Thắng Bạch Đằng – Chấm Dứt 1000 Năm Bắc Thuộc 938",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770271901/11114-10-4-24_y155l8.jpg",
        bio: "Ngô Quyền là con rể và tướng giỏi của Dương Đình Nghệ. Trước âm mưu xâm lược của nhà Nam Hán, ông đã chủ động chuẩn bị trận địa trên sông Bạch Đằng với chiến thuật cọc gỗ lợi dụng thủy triều. Năm 938, quân Nam Hán bị tiêu diệt hoàn toàn, tướng giặc bị giết. Chiến thắng Bạch Đằng đã chấm dứt hơn 1000 năm Bắc thuộc, mở ra kỷ nguyên độc lập lâu dài cho dân tộc Việt Nam",
      },
    ],
    events: [
      {
        name: "An Dương Vương lập nước Âu Lạc – thành Cổ Loa",
        year: "≈ 257 – 179 TCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770216870/image_6_sr8tf1.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770216875/image_8_ytzrbj.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770216869/image_5_h394y7.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770216871/image_6_ipzfvk.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770216872/image_7_1_lhpk2f.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770216872/image_10_wekndd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770216871/image_7_t0gx6n.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770216870/image_5_1_vgcv2q.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770216871/image_9_eglchw.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770216871/image_9_jixzpb.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        An Dương Vương và Thành Cổ Loa gắn liền với đỉnh cao tổ chức và phòng thủ của nước Âu Lạc. Thành Cổ Loa là trung tâm chính trị, quân sự quan trọng bậc nhất thời kỳ này.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Thành Cổ Loa:</strong> Được xây dựng với cấu trúc nhiều vòng thành xoắn ốc, thể hiện trình độ kỹ thuật và tổ chức lao động cao của cư dân Âu Lạc.<br>
        🛡️ <strong>Quốc phòng:</strong> Nỏ liên châu phản ánh tư duy quân sự tiên tiến, giúp Âu Lạc đủ sức đối phó với các thế lực bên ngoài.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Cổ Loa đánh dấu bước phát triển vượt bậc của nhà nước sơ khai, kết hợp chặt chẽ giữa chính trị và quân sự.</p>`,
      },
      {
        name: "Cuộc xâm lược của nhà Tần vào đất Âu Lạc",
        year: "218 TCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770250479/image_1_ttipf6.jpg",
          // "https://res.cloudinary.com/duqhhplgf/image/upload/v1770250480/image_6_w9o0ga.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770250479/image_3_o1qupt.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770250479/image_2_vl0rnx.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770250479/image_7_k2fnan.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770250478/image_8_pq3nzl.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770250478/image_7_epfam1.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770250478/image_10_z3ejiz.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770250478/image_10_q4ueol.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770250478/image_9_pxp4yg.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770250477/image_9_puufiz.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Cuộc xâm lược của nhà Tần vào đất Âu Lạc cho thấy vị trí chiến lược của vùng đất này và những thách thức lớn từ các thế lực phương Bắc.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Bối cảnh:</strong> Sau khi thống nhất Trung Hoa, nhà Tần mở rộng lãnh thổ xuống phía Nam nhằm kiểm soát vùng đất giàu tài nguyên.<br>
        ⚔️ <strong>Diễn biến:</strong> Quân Tần gặp nhiều khó khăn do địa hình hiểm trở và sự kháng cự của cư dân bản địa.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Cuộc xâm lược làm nổi bật tinh thần chống ngoại xâm và nhu cầu củng cố quốc phòng của người Việt.</p>`,
      },
      {
        name: "Nước Âu Lạc bị Triệu Đà thôn tính",
        year: "179 TCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770251188/image_5_dudawl.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770251189/image_7_bg86xr.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770251188/image_1_nvpnvw.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770251188/image_1_yomumx.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770251188/image_6_xvooxg.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770251186/image_10_bp7asy.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Sự sụp đổ của nước Âu Lạc đánh dấu bước ngoặt lớn trong lịch sử, mở đầu thời kỳ đất nước bị đặt dưới ách thống trị của các triều đại phương Bắc.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Nguyên nhân:</strong> Nội bộ suy yếu, mất cảnh giác trước kẻ thù và sự chia rẽ trong tầng lớp lãnh đạo.<br>
        📉 <strong>Hệ quả:</strong> Âu Lạc mất độc lập, người Việt bước vào thời kỳ Bắc Thuộc kéo dài.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Sự kiện này để lại bài học sâu sắc về đoàn kết và cảnh giác trong việc bảo vệ quốc gia.</p>`,
      },
      {
        name: "Thời Kỳ Bắc Thuộc",
        year: "179 TCN - 938",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770435698/image_6_gayjtd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770435679/image_8_kjlcrl.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770435644/1639983754588_17.2_dvdgut.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770435699/image_4_y9man6.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770435712/image_2_tc7zg2.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Thời Kỳ Bắc Thuộc là giai đoạn người Việt chịu sự thống trị của các triều đại phương Bắc, nhưng cũng là thời kỳ nuôi dưỡng tinh thần phản kháng và ý thức dân tộc.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Chính sách đô hộ:</strong>
        Các triều đại áp đặt bộ máy cai trị, bóc lột kinh tế và đồng hóa văn hóa.<br>
        🔥 <strong>Sự chống đối:</strong>
        Nhiều cuộc khởi nghĩa nổ ra, thể hiện khát vọng giành lại độc lập.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong>
        Bắc Thuộc là phép thử lịch sử, hun đúc tinh thần yêu nước và ý chí tự chủ.</p>`,
      },
      {
        name: "Nhà Triệu - sự sáp nhập Âu Lạc",
        year: "179 - 111 TCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770253438/image_3_kxwhaa.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770253438/image_1_ibrlfe.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770253438/image_6_wjw0wh.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770253437/image_8_mkg6r0.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770253437/image_5_iglsfs.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770253438/image_4_1_ih10ti.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770253438/image_8_iz6b5t.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770253438/image_4_uxpp5v.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Nhà Triệu sáp nhập Âu Lạc vào Nam Việt, mở đầu giai đoạn đất nước bị kiểm soát gián tiếp bởi chính quyền phương Bắc.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Tổ chức cai trị:</strong> Nhà Triệu duy trì bộ máy quản lý nhưng vẫn dựa vào tầng lớp bản địa.<br>
        🌾 <strong>Đời sống xã hội:</strong> Người Việt vừa chịu ảnh hưởng Hán hóa, vừa bảo lưu phong tục riêng.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Giai đoạn này phản ánh sự giằng co giữa đồng hóa và bảo tồn bản sắc dân tộc.</p>`,
      },
      {
        name: "Nam Việt diệt vong – Nhà Hán thiết lập chính quyền đô hộ",
        year: "111 TCN – 34 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254021/image_7_wmv00w.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254026/image_2_niwwkj.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254033/image_6_my2b9x.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254023/image_6_ydsj5a.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254008/image_10_nsogco.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254020/image_8_xnegcn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254025/image_5_caha3d.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Nam Việt diệt vong, nhà Hán thiết lập chính quyền đô hộ trực tiếp, đánh dấu sự kiểm soát chặt chẽ hơn đối với đất Âu Lạc.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Chính sách Hán:</strong> Áp đặt luật pháp, thuế khóa và văn hóa Hán.<br>
        🔥 <strong>Phản ứng:</strong> Tinh thần chống đối âm ỉ trong lòng xã hội Việt.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Đây là tiền đề cho các cuộc khởi nghĩa lớn sau này.</p>`,
      },
      {
        name: "Khởi nghĩa Hai Bà Trưng",
        year: "40 – 43 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254548/image_1_yfr0md.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254547/image_3_iwd6xj.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254547/image_2_il5eer.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254547/image_6_ipcyif.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254547/image_5_pr446l.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254548/image_4_sdlctu.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770254546/image_9_uhiokp.webp",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Khởi nghĩa Hai Bà Trưng là cuộc nổi dậy tiêu biểu, thể hiện vai trò lãnh đạo của phụ nữ và khát vọng độc lập của dân tộc.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Diễn biến:</strong> Hai Bà Trưng phất cờ khởi nghĩa, nhanh chóng giành quyền kiểm soát nhiều quận huyện.<br>
        🏹 <strong>Ý nghĩa tinh thần:</strong> Khẳng định ý chí tự chủ và sức mạnh đoàn kết toàn dân.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Khởi nghĩa trở thành biểu tượng bất khuất của dân tộc Việt.</p>`,
      },
      {
        name: "Sự Hình Thành Ban Đầu Của Nước Champa",
        year: "192 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255197/image_8_v1rfog.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255234/image_6_kmmxd8.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255203/image_2_m2kipa.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255199/image_1_mom1oh.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255196/image_8_o59xla.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255169/image_4_ifpdar.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255172/image_2_gj3qjp.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255170/image_7_bi5ly0.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255197/image_1_cbmla3.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255199/image_9_gu6z6s.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Sự hình thành ban đầu của nước Champa phản ánh sự phát triển song song của các quốc gia cổ trên lãnh thổ Việt Nam ngày nay.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Điều kiện hình thành:</strong> Cư dân Chăm sinh sống ven biển miền Trung, phát triển mạnh thương mại và hàng hải.<br>
        🏛️ <strong>Tổ chức nhà nước:</strong> Champa sớm hình thành thể chế và văn hóa riêng biệt.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Sự tồn tại của Champa cho thấy tính đa dạng văn hóa và lịch sử của khu vực.</p>`,
      },
      {
        name: "Khởi Nghĩa Bà Triệu",
        year: "248 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255775/image_7_bv5ss5.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255773/image_6_v7ti7x.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255780/image_3_lpz6nj.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255783/image_10_mqcdgk.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255774/image_7_dweapp.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770255776/image_9_nbyuf5.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Khởi nghĩa Bà Triệu là một trong những cuộc nổi dậy tiêu biểu của người Việt trong thời kỳ Bắc Thuộc, thể hiện ý chí quật cường và tinh thần bất khuất trước ách thống trị hà khắc của chính quyền phương Bắc. Hình tượng Bà Triệu trở thành biểu tượng cho lòng yêu nước và khát vọng tự do của dân tộc.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Bối cảnh lịch sử:</strong> Vào giữa thế kỷ III, chính quyền đô hộ tăng cường bóc lột, áp đặt luật pháp khắt khe và đàn áp văn hóa bản địa. Đời sống nhân dân vô cùng cực khổ, mâu thuẫn xã hội ngày càng sâu sắc.<br>
        ⚔️ <strong>Diễn biến khởi nghĩa:</strong> Bà Triệu tập hợp lực lượng ở vùng núi Thanh Hóa, kêu gọi nhân dân đứng lên chống lại ách thống trị. Dù lực lượng không cân xứng, cuộc khởi nghĩa vẫn gây tiếng vang lớn và làm rung chuyển bộ máy đô hộ.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Khởi nghĩa Bà Triệu khẳng định tinh thần phản kháng bền bỉ của người Việt và vai trò của cá nhân kiệt xuất trong việc khơi dậy ý chí cộng đồng.</p>`,
      },
      {
        name: "Khởi Nghĩa Lý Bí và Sự Ra Đời Nhà Nước Vạn Xuân",
        year: "542 – 602",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770256247/image_3_grzwmk.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770256246/image_10_u4jndi.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770256246/image_5_e7l4wk.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770256244/image_10_wnvdeh.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770256251/image_1_fgzbiq.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Khởi nghĩa Lý Bí và sự ra đời của nhà nước Vạn Xuân đánh dấu bước ngoặt quan trọng trong lịch sử, khi người Việt lần đầu tiên giành lại quyền tự chủ và xây dựng nhà nước độc lập sau nhiều thế kỷ bị đô hộ.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Bối cảnh lịch sử:</strong> Đầu thế kỷ VI, chính quyền đô hộ suy yếu, mâu thuẫn nội bộ gia tăng. Nhân dân bất mãn sâu sắc với sự áp bức, tạo điều kiện cho phong trào đấu tranh bùng nổ.<br>
        🏛️ <strong>Sự ra đời nhà nước Vạn Xuân:</strong> Lý Bí lãnh đạo khởi nghĩa thắng lợi, xưng đế, lập ra nhà nước Vạn Xuân với bộ máy quản lý và luật pháp riêng, thể hiện tư duy xây dựng quốc gia độc lập.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Vạn Xuân chứng minh khả năng tự quản của người Việt, đặt nền móng cho truyền thống xây dựng nhà nước tự chủ lâu dài.</p>`,
      },
      {
        name: "Khởi Nghĩa Mai Thúc Loan",
        year: "722 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770265817/212-mai-thuc-loan-va-khoi-nghia-hoan-chau-713-722_rvho59.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770266043/image1_szqavg.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770266043/image2_pe0vrp.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770266043/image3_nbv3kv.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770265422/image_8_xduzzt.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Khởi nghĩa Mai Thúc Loan là cuộc nổi dậy quy mô lớn, thể hiện sự liên kết rộng rãi giữa các tầng lớp nhân dân nhằm chống lại ách bóc lột nặng nề của chính quyền đô hộ.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Nguyên nhân:</strong> Chính quyền tăng thuế, bắt lao dịch nặng nề, khiến đời sống người dân kiệt quệ.<br>
        🔥 <strong>Diễn biến:</strong> Mai Thúc Loan tập hợp lực lượng đông đảo, mở rộng ảnh hưởng trên nhiều vùng lãnh thổ, tạo thành phong trào chống đối mạnh mẽ.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Khởi nghĩa cho thấy xu hướng liên kết quy mô lớn và khả năng huy động sức dân trong cuộc đấu tranh giành tự do.</p>`,
      },
      {
        name: "Khởi nghĩa Phùng Hưng",
        year: "791 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770266923/khoi-nghia-phung-hung-nguyen-nhan-ket-qua-va-y-nghia_mcc12i.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770267360/ae22cdee-8cc7-4366-841d-f897cb7fdf8c.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770267053/image_10_wrd4yf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770267053/image_3_csx1et.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770267053/image_6_jrvipt.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770267052/image_7_b8onow.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770267051/image_1_hrerei.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Khởi nghĩa Phùng Hưng là sự tiếp nối tinh thần đấu tranh của người Việt, thể hiện ý chí không khuất phục trước sự thống trị kéo dài của chính quyền đô hộ.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Bối cảnh:</strong> Sự suy yếu của chính quyền đô hộ tạo điều kiện cho phong trào nổi dậy lan rộng.<br>
        ⚔️ <strong>Vai trò lãnh đạo:</strong> Phùng Hưng giành được lòng tin của nhân dân, tổ chức lực lượng và kiểm soát nhiều khu vực.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Khởi nghĩa góp phần củng cố niềm tin rằng người Việt có thể tự đứng lên giành quyền tự chủ.</p>`,
      },
      {
        name: "Khúc Thừa Dụ và Bước Mở Đầu Cho Nền Tự Chủ",
        year: "905 - 931 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770270803/x120240818113843_pvords.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770270877/image_3_n8e5lq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770271041/12f8710b-c8cc-467c-b476-c5dbf4dc6737.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770270874/image_5_yoh5ii.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770270875/image_7_qvj6yn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770270876/image_5_kregvv.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Khúc Thừa Dụ mở đầu cho nền tự chủ của dân tộc bằng con đường cải cách chính trị khôn khéo, không thông qua bạo lực lớn mà bằng việc nắm quyền quản lý thực tế.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Hoàn cảnh:</strong> Chính quyền đô hộ suy yếu, mất khả năng kiểm soát chặt chẽ.<br>
        🏛️ <strong>Cải cách:</strong> Khúc Thừa Dụ tổ chức lại bộ máy quản lý, giảm sưu thuế, ổn định đời sống nhân dân.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Đây là bước chuyển mềm mại nhưng quyết định từ lệ thuộc sang tự chủ.</p>`,
      },
      {
        name: "Dương Đình Nghệ và Sự Nghiệp Giữ Vững Độc Lập ",
        year: "931 – 937 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770271535/image_1_n4ms20.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770271520/image_9_udtwfi.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770271524/image_10_ruyxgg.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770271521/image_9_gnrut9.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770271536/image_7_1_apu4nq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770271534/image_6_mgywag.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770271534/image_5_1_cnbdlz.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770271612/image_8_uws2su.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272116/image_4_dcxli1.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Dương Đình Nghệ tiếp nối sự nghiệp tự chủ, giữ vững nền độc lập non trẻ trước các thế lực bên ngoài và nội bộ phản loạn.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Vai trò lịch sử:</strong> Ông xây dựng lực lượng quân sự vững mạnh, duy trì ổn định chính trị.<br>
        🛡️ <strong>Bảo vệ độc lập:</strong> Dương Đình Nghệ kiên quyết chống lại âm mưu tái xâm lược.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Giai đoạn này củng cố niềm tin vào khả năng tự vệ và quản lý đất nước của người Việt.</p>`,
      },
      {
        name: "Ngô Quyền Đại Thắng Bạch Đằng – Chấm Dứt 1000 Năm Bắc Thuộc",
        year: "938",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272121/image_1_hwxfcp.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272119/image_2_aosafd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272118/image_7_hh5ka6.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272117/image_5_dgbozn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272118/image_8_ybcxvv.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272120/image_3_tasioa.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272121/image_1_bu4azu.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272119/image_2_chi2cy.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272118/image_3_uovar8.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272118/image_10_oozgnt.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272118/image_7_ettug5.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Chiến thắng Bạch Đằng của Ngô Quyền là mốc son chói lọi, chấm dứt hoàn toàn thời kỳ Bắc Thuộc kéo dài hơn một thiên niên kỷ.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Nghệ thuật quân sự:</strong> Ngô Quyền vận dụng địa hình sông nước và chiến thuật cọc ngầm độc đáo.<br>
        ⚔️ <strong>Kết quả:</strong> Quân xâm lược bị tiêu diệt hoàn toàn, đất nước giành lại độc lập.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Chiến thắng khẳng định trí tuệ quân sự và ý chí độc lập của dân tộc.</p>`,
      },
    ],
  },

  phongkientuchu: {
    title: "Thời Phong Kiến Tự Chủ (939 – 1858)",
    img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770436635/download_f1uuuk.jpg",
    desc: "Gần 1.000 năm xây dựng và phát triển quốc gia Đại Việt",
    figures: [
      {
        name: "Ngô Quyền",
        per: "Nhà Ngô (Ngô Quyền) 939 – 965 và Ngô Quyền Lập Nhà Ngô – Khai Mở Thời Đại Độc Lập 939 SCN – 944 SCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770271901/11114-10-4-24_y155l8.jpg",
        bio: "Sau chiến thắng Bạch Đằng, Ngô Quyền lên ngôi vua, đóng đô ở Cổ Loa. Ông xây dựng bộ máy nhà nước độc lập, khẳng định chủ quyền dân tộc. Dù thời gian trị vì không dài, nhưng triều Ngô có ý nghĩa lịch sử đặc biệt vì đặt nền móng cho nhà nước phong kiến tự chủ của Việt Nam.",
      },
      {
        name: "Dương Tam Kha",
        per: "Khủng Hoảng Của Nhà Ngô 944 SCN – 965 SCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770273230/images_nsa0bv.jpg",
        bio: "Sau khi Ngô Quyền mất, Dương Tam Kha cướp ngôi, làm rối loạn triều chính. Chính quyền trung ương suy yếu, các thế lực địa phương nổi lên cát cứ. Đây là nguyên nhân trực tiếp dẫn đến loạn 12 sứ quân, đẩy đất nước vào tình trạng chia cắt kéo dài",
      },
      {
        name: "Đinh Bộ Lĩnh (Đinh Tiên Hoàng)",
        per: "Nhà Đinh (Đinh Bộ Lĩnh – Đại Cồ Việt) 968 – 980, Loạn 12 Sứ Quân 965 SCN – 968 SCN, Đinh Bộ Lĩnh dẹp loạn 12 sứ quân 968 SCN - 974 SCN và Sự Sụp Đổ Của Nhà Đinh 974 SCN – 980 SCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770273882/3159c6c0-5c73-4c83-b68e-ad4d29997659.png",
        bio: "Đinh Bộ Lĩnh là người có tài thao lược, xuất thân từ Hoa Lư. Trong bối cảnh đất nước chia cắt, ông đã khéo léo kết hợp quân sự và ngoại giao, từng bước thu phục các sứ quân. Đinh Bộ Lĩnh trở thành biểu tượng của khát vọng thống nhất đất nước. Sau khi dẹp yên loạn sứ quân, Đinh Bộ Lĩnh lên ngôi hoàng đế, đặt quốc hiệu Đại Cồ Việt, đóng đô ở Hoa Lư. Ông xây dựng chính quyền trung ương tập quyền, khẳng định nền độc lập, tự chủ của dân tộc sau thời kỳ dài chia cắt. Cuối triều Đinh, nội bộ triều đình suy yếu, vua bị sát hại, quyền lực rơi vào tay các thế lực khác. Đây là giai đoạn khủng hoảng nghiêm trọng, khiến đất nước đứng trước nguy cơ xâm lược từ bên ngoài.",
      },
      {
        name: "Lê Hoàn",
        per: "Nhà Tiền Lê (Lê Hoàn) 980 – 1009, Lê Hoàn xưng đế lập nhà Tiền Lê Đại phá quân Tống giữ vững nền độc lập dân tộc 980 SCN - 981 SCN và Đánh Chiêm Thành bắt sống vua Chiêm mở rộng uy thế về phương Nam 982 SCN",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770278542/14ff145c-ce9f-48ed-86d6-2be7c4b0cf5b.png",
        bio: "Lê Hoàn được triều đình và quân đội suy tôn làm vua trong bối cảnh đất nước nguy cấp. Ông trực tiếp chỉ huy cuộc kháng chiến chống quân Tống xâm lược, giành thắng lợi vang dội, bảo vệ vững chắc nền độc lập dân tộc. Lê Hoàn chủ động tiến công Chiêm Thành, đánh bại quân địch, bắt sống vua Chiêm. Chiến thắng này thể hiện sức mạnh quân sự của Đại Cồ Việt và nâng cao vị thế quốc gia trong khu vực.",
      },
      {
        name: "Lê Long Đĩnh",
        per: "Khủng hoảng kế vị triều Tiền Lê 1005 - 1009",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279468/ba6057b7-993d-493f-97a5-8b065010073f.png",
        bio: "Triều Tiền Lê suy yếu do tranh chấp ngôi vua và sự cai trị tàn bạo, làm lòng dân oán thán. Đây là nguyên nhân khiến nhà Tiền Lê sụp đổ và nhường chỗ cho triều Lý.",
      },
      {
        name: "Lý Công Uẩn (Lý Thái Tổ)",
        per: "Nhà Lý (Lý Công Uẩn – Thăng Long) 1009 – 1225, Lý Công Uẩn lên ngôi vua 1009 SCN, Lý Thái Tổ Dời Đô Về Thăng Long 1010 và Chợ Kẻ Chợ – Trung tâm buôn bán của Thăng Long xưa Từ thế kỷ XI đến thế kỷ XVIII",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280174/ly-thai-to-01-0800_zms6bw.jpg",
        bio: "Lý Công Uẩn xuất thân từ tầng lớp quý tộc, được triều đình và tăng lữ ủng hộ nhờ tài năng và đức độ. Khi triều Tiền Lê suy yếu, ông được suy tôn lên ngôi, chấm dứt tình trạng khủng hoảng chính trị kéo dài. Việc Lý Công Uẩn lên ngôi mở ra triều đại nhà Lý, đánh dấu bước chuyển quan trọng sang một thời kỳ ổn định, phát triển lâu dài của đất nước. Nhận thấy Hoa Lư không còn phù hợp cho sự phát triển lâu dài, Lý Thái Tổ quyết định dời đô ra Thăng Long. Đây là vùng đất rộng rãi, bằng phẳng, giao thông thuận lợi, có vị trí chiến lược quan trọng. Quyết định này thể hiện tầm nhìn xa của nhà vua, tạo điều kiện cho Đại Việt phát triển thịnh vượng suốt nhiều thế kỷ. Việc dời đô ra Thăng Long tạo điều kiện hình thành các khu dân cư, buôn bán sầm uất. Chợ Kẻ Chợ dần trở thành trung tâm kinh tế, thương mại lớn, phản ánh sự phát triển của đô thị và nền kinh tế hàng hóa từ thời Lý trở đi.",
      },
      {
        name: "Lý Thánh Tông",
        per: "Đổi tên nước thành Đại Việt Năm 1054 và Thành lập Văn Miếu tại Thăng Long Năm 1070",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770281395/8b55483f-39ac-4c0d-8784-c25f4b8c1ff1.png",
        bio: "Việc đổi quốc hiệu từ Đại Cồ Việt sang Đại Việt thể hiện ý thức dân tộc mạnh mẽ và khát vọng xây dựng một quốc gia độc lập, hùng cường. Dưới triều Lý Thánh Tông, đất nước ổn định, mở rộng lãnh thổ và củng cố vị thế trong khu vực. Văn Miếu được xây dựng để thờ Khổng Tử và các bậc hiền triết, đồng thời là trung tâm giáo dục lớn của quốc gia. Việc thành lập Văn Miếu đánh dấu sự phát triển của Nho học, góp phần đào tạo nhân tài và xây dựng nền văn hóa, giáo dục lâu dài cho Đại Việt.",
      },
      {
        name: "Lý Thường Kiệt",
        per: "Chiến Thắng Của Lý Thường Kiệt 1075 - 1077",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282726/72238d0b-cd0c-4522-bdfa-1dae119988f1.png",
        bio: "Trước nguy cơ xâm lược của nhà Tống, Lý Thường Kiệt chủ trương tiến công trước để tự vệ. Ông chỉ huy quân đội đánh vào Ung Châu, Liêm Châu rồi tổ chức phòng thủ vững chắc trên sông Như Nguyệt. Chiến thắng này bảo vệ nền độc lập dân tộc và thể hiện tư duy quân sự sáng tạo, chủ động của Đại Việt",
      },
      {
        name: "Lý Nhân Tông",
        per: "Khoa thi đầu tiên trong lịch sử Việt Nam Năm 1075",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770283979/d0466aa7-a078-41f2-9e34-a9e0c00075c8.png",
        bio: "Triều đình mở khoa thi chọn người tài ra giúp nước, đặt nền móng cho chế độ khoa cử Việt Nam. Đây là bước tiến lớn trong việc xây dựng bộ máy nhà nước dựa trên trí tuệ và học vấn thay vì dòng dõi.",
      },
      {
        name: "Lý Anh Tông",
        per: "Sự hình thành thương cảng Vân Đồn Năm 1149",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770284895/21fe92d6-d47c-4846-86e5-8dee35d6faca.png",
        bio: "Vân Đồn được thành lập nhằm phát triển giao thương với các nước trong khu vực. Thương cảng này góp phần thúc đẩy kinh tế, khẳng định vị thế Đại Việt trong mạng lưới buôn bán quốc tế.",
      },
      {
        name: "Lý Chiêu Hoàng",
        per: "Lý Chiêu Hoàng nhường ngôi Năm 1225",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770285536/f7eea327-cd38-48c3-9dee-b83e3d3401a0.png",
        bio: "Là nữ hoàng duy nhất trong lịch sử Việt Nam, bà nhường ngôi cho Trần Cảnh, chấm dứt triều Lý. Sự kiện này mở đầu cho triều Trần và phản ánh sự chuyển giao quyền lực trong bối cảnh triều Lý suy yếu",
      },
      {
        name: "Trần Hưng Đạo",
        per: "Nhà Trần 1225 - 1400, Chiến Thắng Bạch Đằng 1288, Kháng chiến chống quân Nguyên – Mông lần thứ hai Năm 1285 và Kháng chiến chống Nguyên Mông lần thứ ba Năm 1287",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770286830/b00034b3-0dd9-46b6-9986-91d35a7c63f7.png",
        bio: "Là danh nhân kiệt xuất của nhà Trần, gắn liền với ba lần kháng chiến chống quân Mông – Nguyên thế kỷ XIII. Ông là người tổ chức, chỉ huy toàn bộ lực lượng quân sự, xây dựng chiến lược “lấy yếu thắng mạnh”, kết hợp chiến tranh nhân dân với nghệ thuật quân sự linh hoạt. Dưới sự lãnh đạo của ông, quân dân Đại Việt giành thắng lợi vang dội trong các trận Đông Bộ Đầu, Hàm Tử, Chương Dương, Bạch Đằng (1288), bảo vệ vững chắc nền độc lập dân tộc. Trần Hưng Đạo được tôn vinh là anh hùng dân tộc và danh tướng quân sự kiệt xuất của lịch sử Việt Nam. Trần Hưng Đạo đã cho bố trí bãi cọc ngầm dưới lòng sông, lợi dụng thủy triều để nhử đoàn thuyền quân Nguyên do Ô Mã Nhi chỉ huy tiến sâu vào trận địa. Khi nước triều rút, thuyền giặc mắc cạn và bị quân Trần từ nhiều phía tấn công dữ dội. Kết quả, quân Nguyên bị tiêu diệt và bắt sống phần lớn, chấm dứt hoàn toàn âm mưu xâm lược Đại Việt. Với tài thao lược xuất chúng, Trần Hưng Đạo chỉ huy quân dân đánh bại quân Nguyên, giữ vững nền độc lập dân tộc. Các cuộc kháng chiến tiếp tục thể hiện chiến lược toàn dân đánh giặc, làm thất bại hoàn toàn âm mưu xâm lược của quân Nguyên",
      },
      {
        name: "Trần Thái Tông",
        per: "Kháng Chiến Chống Quân Nguyên Mông Lần 1 1258",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770287342/15ba1675-d3b1-49fd-b0a2-c42a4a585815.png",
        bio: "Dưới sự lãnh đạo của Trần Thái Tông, quân dân Đại Việt đã đánh bại cuộc xâm lược đầu tiên của quân Nguyên Mông, bảo vệ nền độc lập trước đội quân mạnh nhất thế giới lúc bấy giờ.",
      },
      {
        name: "Trần Nhân Tông",
        per: "Hội nghị Diên Hồng Cuối năm 1284",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770288848/0afbdd29-75ce-4fde-95e5-1c198db2d89e.png",
        bio: "Nhà vua triệu tập các bô lão cả nước để hỏi ý kiến đánh hay hòa. Hội nghị thể hiện tinh thần đoàn kết toàn dân và quyết tâm chống giặc ngoại xâm",
      },
      {
        name: "Trần Dụ Tông",
        per: "Cuối thế kỷ XIV triều đại nhà Trần suy yếu Cuối thế kỷ XIV",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770290487/3f286970-526a-4579-bc08-7d486ff137b2.png",
        bio: "Triều đình sa vào ăn chơi, bỏ bê chính sự, kinh tế suy thoái, xã hội rối ren. Đây là nguyên nhân dẫn tới sự sụp đổ của nhà Trần và sự xuất hiện của nhà Hồ",
      },
      {
        name: "Hồ Quý Ly",
        per: "Nhà Hồ Thay Thế Nhà Trần 1400",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770292834/ho-quy-ly_yxdyob.jpg",
        bio: "Hồ Quý Ly là nhân vật gây nhiều tranh cãi trong lịch sử. Ông là người chấm dứt triều Trần và lập ra nhà Hồ năm 1400. Dù bị xem là người cướp ngôi, Hồ Quý Ly lại là nhà cải cách hiếm hoi của thời phong kiến Việt Nam. Ông tiến hành nhiều cải cách quan trọng như đổi mới giáo dục theo hướng thực học, phát hành tiền giấy, cải tổ bộ máy quan lại và tăng cường quốc phòng. Tuy nhiên, việc cải cách diễn ra quá nhanh, thiếu sự ủng hộ của tầng lớp quý tộc và nhân dân khiến triều Hồ không đủ sức chống lại cuộc xâm lược của nhà Minh. Dù thất bại, Hồ Quý Ly vẫn được đánh giá là người có tư duy tiến bộ vượt thời đại",
      },
      {
        name: "Hồ Quý Ly và Hồ Hán Thương",
        per: "Nhà Minh Xâm Lược Đại Nội 1407",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770293638/download_nrvpgy.jpg",
        bio: "Năm 1407, nhà Minh lấy cớ “phù Trần diệt Hồ” để xâm lược Đại Việt. Do nội bộ suy yếu, quân đội nhà Hồ nhanh chóng thất bại. Đại Việt rơi vào ách đô hộ tàn bạo của nhà Minh, mở ra thời kỳ Minh thuộc đầy đau thương",
      },
      {
        name: "Lê Lợi",
        per: "Nhà Hồ & Minh Thuộc (Hồ Quý Ly – Đại Ngu) 1400 - 1427, Khởi Nghĩa Lam Sơn - Lê Lợi 1418 và Lê Lợi lên ngôi lập ra triều Hậu Lê năm 1428",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770294391/le-loi_ogjnbc.jpg",
        bio: "Lê Lợi là danh nhân tiêu biểu nhất của thời kỳ Nhà Hồ & Minh Thuộc vì ông là người đã chấm dứt hoàn toàn ách đô hộ nhà Minh, đưa đất nước thoát khỏi giai đoạn đen tối nhất đầu thế kỷ XV. Sau khi nhà Hồ thất bại trước cuộc xâm lược của nhà Minh năm 1407, Đại Việt rơi vào gần 20 năm bị đô hộ. Nhà Minh thực hiện chính sách bóc lột tàn bạo, vơ vét tài nguyên, bắt dân lao dịch, hủy hoại sách vở và di sản văn hóa, âm mưu đồng hóa dân tộc Việt. Trong hoàn cảnh đó, tinh thần phản kháng âm thầm lan rộng trong nhân dân. Năm 1418, Lê Lợi dựng cờ khởi nghĩa tại Lam Sơn (Thanh Hóa). Ban đầu lực lượng còn yếu, gặp nhiều khó khăn nhưng nhờ chiến lược đúng đắn, đoàn kết nhân dân và sự giúp sức của các nhân tài như Nguyễn Trãi, nghĩa quân dần lớn mạnh, đặt nền móng cho việc giải phóng đất nước. Sau 10 năm kháng chiến đã đánh bại quân Minh, giành lại độc lập cho Đại Việt, ông lên ngôi hoàng đế, lấy niên hiệu Lê Thái Tổ, mở ra thời kỳ phục hưng đất nước sau ách đô hộ phương Bắc",
      },
      {
        name: "Mạc Đăng Dung",
        per: "Thời Kỳ Lê-Mạc phân tranh 1527",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770298390/b7c7ec83-1f0a-4792-8328-b48ccbbe759d.png",
        bio: "Năm 1527, Mạc Đăng Dung phế truất vua Lê, lập ra nhà Mạc. Cuộc xung đột giữa hai triều đại kéo dài nhiều thập kỷ, gây chia rẽ đất nước và làm suy yếu quốc lực",
      },
      {
        name: "Trịnh Kiểm và Nguyễn Hoàng",
        per: "Trịnh-Nguyễn phân tranh 1600 - 1788",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770298918/images_ceypbh.jpg",
        bio: "Hai tập đoàn phong kiến Trịnh ở Đàng Ngoài và Nguyễn ở Đàng Trong chia cắt đất nước, mỗi bên tự xây dựng chính quyền riêng. Cuộc phân tranh kéo dài gần hai thế kỷ khiến nhân dân khổ cực, xã hội rối ren",
      },
      {
        name: "Lê Thánh Tông",
        per: "Nhà Lê Sơ (Thịnh trị) 1428 – 1527, Nhà Hậu Lê 1428 - 1789, Bộ luật Hồng Đức ra đời Năm 1483, Vua Lê Thánh Tông qua đời Năm 1497 và Nhà Lê Trung Hưng 1627 – 1777",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299780/7b6c03f3-d59b-4f78-b534-4ca500bfe0f7.png",
        bio: "Lê Thánh Tông là danh nhân tiêu biểu nhất của triều Hậu Lê vì ông đã đưa Đại Việt đạt tới đỉnh cao toàn diện về chính trị, kinh tế, quân sự, pháp luật và văn hóa trong lịch sử phong kiến Việt Nam. Sau khi nhà Hậu Lê được thành lập năm 1428, đất nước từng bước ổn định nhưng chỉ thực sự phát triển rực rỡ dưới thời Lê Thánh Tông (1460–1497). Ông xây dựng bộ máy nhà nước trung ương tập quyền chặt chẽ, chia lại đơn vị hành chính, kiểm soát quyền lực quan lại, hạn chế tình trạng cát cứ địa phương. Dưới thời Lê Thánh Tông, Đại Việt đạt đến đỉnh cao về quản lý nhà nước. Bộ luật Hồng Đức thể hiện tư tưởng pháp quyền tiến bộ, bảo vệ chủ quyền quốc gia, đề cao vai trò gia đình, phụ nữ và quyền lợi của người dân. Sự ra đi của ông đánh dấu sự kết thúc thời kỳ thịnh trị nhất của nhà Hậu Lê. Sau đó, triều đình dần suy yếu do vua kém tài và nội bộ rối ren. Ông còn tên thật Lê Duy Đường, là vị vua tiêu biểu của triều Lê Trung Hưng. Ông trị vì trong bối cảnh quyền lực thực tế nằm trong tay các chúa Trịnh, còn vua Lê giữ vai trò chính danh. Dù không trực tiếp nắm quyền điều hành, triều đình dưới thời ông vẫn duy trì được trật tự xã hội, lễ nghi và hệ thống khoa cử Nho học. Lê Thánh Tông được xem là biểu tượng cho sự tồn tại của vương quyền nhà Lê trong thời kỳ “vua Lê – chúa Trịnh” kéo dài suốt thế kỷ XVII–XVIII",
      },
      {
        name: "Mạc Đăng Dung",
        per: "Nhà Mạc – Nam Bắc triều 1527 – 1677, Mạc Đăng Dung lập triều Mạc Năm 1527 và Mạc Đăng Dung quy phục nhà Minh Năm 1540",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770298390/b7c7ec83-1f0a-4792-8328-b48ccbbe759d.png",
        bio: "Mạc Đăng Dung (1483–1541) xuất thân từ tầng lớp bình dân, từng là võ quan triều Lê. Trong bối cảnh nhà Lê sơ suy yếu, ông từng bước nắm giữ quyền lực và đến năm 1527 chính thức lên ngôi, lập ra nhà Mạc. Trong thời gian cầm quyền, Mạc Đăng Dung chú trọng ổn định xã hội, duy trì thi cử và bộ máy hành chính, góp phần giữ trật tự đất nước trong giai đoạn nhiều biến động. Tuy nhiên, việc ông thay nhà Lê đã làm bùng nổ cuộc xung đột Nam – Bắc triều kéo dài, khiến đất nước rơi vào tình trạng phân tranh. Mạc Đăng Dung phế truất vua Lê, lập ra nhà Mạc. Sự kiện này mở đầu thời kỳ Nam – Bắc triều, đất nước bị chia cắt và nội chiến kéo dài. Để tránh chiến tranh với nhà Minh, Mạc Đăng Dung chấp nhận thần phục, giữ được quyền cai trị trong nước nhưng làm suy giảm uy tín chính trị của triều Mạc",
      },
      {
        name: "Trịnh Tùng",
        per: "Mất Thăng Long - Nhà Mạc chạy về Cao Bằng Năm 1592",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770301672/c4d0c415-8e01-4d23-be29-b055b92424c1.png",
        bio: "Quân Lê – Trịnh chiếm lại Thăng Long, nhà Mạc suy yếu nghiêm trọng và phải rút lên Cao Bằng tồn tại cầm chừng",
      },
      {
        name: "Mạc Kính Vũ",
        per: "Nhà Mạc bị tiêu diệt ở Cao Bằng Năm 1677",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302805/L%E1%BB%8ACH_s%E1%BB%AD_vi%E1%BB%87t_nam_y%C3%AAu_s%E1%BB%AD_vi%E1%BB%87t_hoang-ha-tran-mac-kinh-dien-final_eaehsu.jpg",
        bio: "Triều Mạc chấm dứt hoàn toàn sau hơn 150 năm tồn tại, kết thúc một giai đoạn chia cắt lịch sử.",
      },
      {
        name: "Trịnh Tùng",
        per: "Quân Lê – Trịnh chiếm lại Thăng Long nhà Mạc suy yếu Năm 1592",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770341816/download_ml9mme.jpg",
        bio: "Sự kiện khôi phục kinh đô giúp nhà Lê tồn tại trở lại nhưng đất nước bước vào cục diện vua Lê – chúa Trịnh",
      },
      {
        name: "Trịnh Kiểm",
        per: "Trịnh Kiểm nắm quyền sau khi Nguyễn Kim mất Năm 1545",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770342276/19bb0cda-2790-4034-a986-ec6ebd3e528a.png",
        bio: "Trịnh Kiểm trở thành người nắm thực quyền, mở đầu thế lực họ Trịnh, trong khi vua Lê chỉ còn vai trò danh nghĩa.",
      },
      {
        name: "Chúa Nguyễn Phúc Chu",
        per: "Lãnh thổ Đại Việt hình thành hình chữ S Năm 1711",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770342638/download_atitvs.jpg",
        bio: "Mở rộng lãnh thổ về phía Nam, xác lập cương vực Đại Việt gần hoàn chỉnh hình chữ S",
      },
      {
        name: "Nguyễn Nhạc",
        per: "Khởi nghĩa Tây Sơn năm 1771",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770343030/85b38826-4350-49af-acb3-8f121ff2036f.png",
        bio: "Người khởi xướng phong trào Tây Sơn, lãnh đạo nhân dân nổi dậy chống chúa Nguyễn",
      },
      {
        name: "Nguyễn Huệ (Quang Trung)",
        per: "Khởi nghĩa Tây Sơn - Nguyễn Huệ (Quang Trung) 1771 - 1802, Tây Sơn tiêu diệt chúa Nguyễn ở Đàng Trong Năm 1777, Chiến thắng Rạch Gầm – Xoài Mút Năm 1785, Nguyễn Huệ tiến ra Bắc diệt Trịnh – lập vua Lê Năm 1786, Quân Thanh xâm lược Thăng Long Năm 1788 và Vua Quang Trung băng hà Tây Sơn bắt đầu suy yếu Ngày 29 tháng 7 năm 1792",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770343881/download_uklubj.jpg",
        bio: "Hoàng đế kiệt xuất, thiên tài quân sự; đại phá quân Xiêm và quân Thanh, bảo vệ độc lập dân tộc. Ông chỉ huy quân Tây Sơn đánh bại chính quyền họ Nguyễn, làm chủ toàn bộ Đàng Trong; lãnh đạo quân Tây Sơn đánh tan 5 vạn quân Xiêm, bảo vệ vững chắc miền Nam; lật đổ chính quyền họ Trịnh, khôi phục quyền lực cho nhà Lê; lãnh đạo cuộc kháng chiến chống quân Thanh xâm lược. Sự qua đời của ông khiến triều Tây Sơn nhanh chóng suy yếu.",
      },
      {
        name: "Gia Long (Nguyễn Ánh)",
        per: "Nhà Nguyễn (Gia Long - Tự Đức) 1802 - 1945, Gia Long Thống Nhất Đất Nước 1802 và Vua Gia Long đổi quốc hiệu thành Việt Nam Năm 1804",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770346168/download_ud6dky.jpg",
        bio: "Người sáng lập triều Nguyễn, thống nhất đất nước năm 1802, chấm dứt nội chiến, lập ra triều Nguyễn, chính thức đặt quốc hiệu Việt Nam.",
      },
      {
        name: "Tự Đức (Nguyễn Phúc Hồng Nhậm)",
        per: "Nhà Nguyễn (Gia Long - Tự Đức) 1802 - 1945",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770453358/d9c7f855-335f-432a-a176-2598ac9b737e.png",
        bio: "Tự Đức (Nguyễn Phúc Hồng Nhậm) là vua thứ 4 triều Nguyễn, trị vì từ 1847–1883. Ông nổi tiếng uyên bác, giỏi văn chương, nhưng thời kỳ trị vì gắn với khủng hoảng trong nước và sự xâm lược của thực dân Pháp, khiến triều Nguyễn dần suy yếu.",
      },
      {
        name: "Minh Mạng",
        per: "Vua Minh Mạng đổi quốc hiệu thành Đại Nam Năm 1839",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770346254/b36b14ba-ef69-4df7-a23a-12ca5586a929.png",
        bio: "Khẳng định chủ quyền và lãnh thổ quốc gia",
      },
      {
        name: "Nguyễn Trường Tộ",
        per: "Nguyễn Trường Tộ và tư tưởng cải cách Khoảng từ năm 1850 trở đi",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770346256/download_ksdxmy.jpg",
        bio: "Nhà tư tưởng cải cách lớn, đề xuất canh tân đất nước",
      },
      {
        name: "Nguyễn Tri Phương",
        per: "Thực dân Pháp nổ súng xâm lược Đà Nẵng 01-9-1858",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770346285/download_b8bl2u.jpg",
        bio: "Danh tướng triều Nguyễn, chỉ huy kháng chiến chống Pháp.",
      },
    ],
    events: [
      {
        name: "Nhà Ngô (Ngô Quyền)",
        year: "939 – 965",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770437065/6c41451f-a2e8-44c2-856f-b8026b15dbed.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770437094/53842176-db9d-4bcb-8a8c-8bc45d9ae33c.png",
        ],
        content: `<p>Nhà Ngô do Ngô Quyền sáng lập (939), mở đầu thời kỳ độc lập lâu dài sau hơn 1.000 năm Bắc thuộc.</p>`,
      },
      {
        name: "Ngô Quyền Lập Nhà Ngô – Khai Mở Thời Đại Độc Lập",
        year: "939 – 944 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272898/image_5_yjde0k.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272899/image_2_px7zcn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272899/image_3_kokxxd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272899/image_9_tcgctl.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272899/image_4_frihgi.gif",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272898/image_8_hcepqg.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770272898/image_7_zbunyu.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Ngô Quyền lập nhà Ngô, mở đầu thời đại độc lập lâu dài cho dân tộc Việt sau hơn 1000 năm bị đô hộ.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Xây dựng nhà nước:</strong> Bộ máy chính quyền được thiết lập, xác lập chủ quyền quốc gia.<br>
        🏛️ <strong>Quản lý xã hội:</strong> Đặt nền móng cho thể chế quân chủ độc lập.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Nhà Ngô đánh dấu bước trưởng thành của quốc gia tự chủ.</p>`,
      },
      {
        name: "Khủng Hoảng Của Nhà Ngô",
        year: "944 – 965 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770273412/image_8_k4ypkc.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770273412/image_1_u2slwy.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770273419/image_9_uyie8i.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770273411/image_9_ostjpz.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770273411/image_7_vwklzb.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770273411/image_6_p4zh4w.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Khủng hoảng của nhà Ngô phản ánh những khó khăn ban đầu trong việc xây dựng và duy trì nhà nước độc lập.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Nguyên nhân:</strong> Thiếu cơ chế kế vị rõ ràng, mâu thuẫn nội bộ gia tăng.<br>
        📉 <strong>Hệ quả:</strong> Quyền lực trung ương suy yếu, xã hội rơi vào bất ổn.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Bài học sâu sắc về vai trò của thể chế và sự ổn định chính trị.</p>`,
      },
      {
        name: "Nhà Đinh (Đinh Bộ Lĩnh – Đại Cồ Việt)",
        year: "968 – 980",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770437535/1ba5ee81-d746-4a5b-845b-aa743514f53f.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770437537/547a9c36-02dc-42a2-92b5-0b1251ea6205.png",
        ],
        content: `<p>Nhà Đinh do Đinh Bộ Lĩnh sáng lập năm 968, thống nhất đất nước và đặt quốc hiệu Đại Cồ Việt.</p>`,
      },
      {
        name: "Loạn 12 Sứ Quân",
        year: "965 – 968 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770274049/dinhtienhoang-sep-amb-holylandvietnamstudies.com__n4iw1s.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770274081/image_10_aofl8u.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770274099/image_9_1_ybrlln.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770274081/image_3_fbokju.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770274081/image_4_ku0q1x.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Loạn 12 Sứ Quân là giai đoạn đất nước bị chia cắt nghiêm trọng, phản ánh hệ quả của khủng hoảng quyền lực trung ương.<br>
        <strong>* Chi tiết:</strong><br>
        ⏳ <strong>Bối cảnh:</strong> Các thế lực địa phương nổi lên, tranh giành quyền kiểm soát.<br>
        ⚔️ <strong>Tình trạng xã hội:</strong> Chiến tranh liên miên, đời sống nhân dân khổ cực.<br>
        🌟 <strong>Ý nghĩa về mặt tổ chức xã hội:</strong> Thời kỳ này cho thấy sự cần thiết của một chính quyền thống nhất và mạnh mẽ.</p>`,
      },
      {
        name: "Đinh Bộ Lĩnh dẹp loạn 12 sứ quân",
        year: "968 - 974 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770274876/image_2_z09imk.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770274876/image_1_fkurvz.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770274875/image_4_fxeqh5.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770274871/image_9_le174h.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770274870/image_10_ubvvxh.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770274870/image_6_n23oa8.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770274869/image_5_tsb6tv.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770274862/image_2_ouenya.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Sau thời kỳ loạn lạc kéo dài do sự tan rã của nhà Ngô, Đinh Bộ Lĩnh đã đứng lên thống nhất đất nước, chấm dứt tình trạng cát cứ của 12 sứ quân, mở ra thời kỳ ổn định và độc lập lâu dài cho dân tộc.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Bối cảnh loạn 12 sứ quân:</strong> Sau khi Ngô Quyền qua đời, quyền lực trung ương suy yếu nghiêm trọng. Các thế lực địa phương nổi lên chiếm giữ vùng đất riêng, gây ra chiến tranh liên miên, khiến đời sống nhân dân vô cùng khổ cực.<br>
        🗡️ <strong>Sự trỗi dậy của Đinh Bộ Lĩnh:</strong> Xuất thân từ vùng Hoa Lư, Đinh Bộ Lĩnh sớm quy tụ lực lượng, vừa dùng quân sự vừa dùng sách lược thu phục lòng người. Ông lần lượt đánh bại hoặc cảm hóa các sứ quân, từng bước thống nhất giang sơn.<br>
        🏛️ <strong>Kết quả và ý nghĩa:</strong> Năm 968, đất nước được thống nhất. Đây là bước ngoặt lịch sử, chấm dứt hoàn toàn tình trạng phân liệt, đặt nền móng cho nhà nước phong kiến độc lập đầu tiên sau Bắc thuộc.</p>`,
      },
      {
        name: "Sự Sụp Đổ Của Nhà Đinh",
        year: "974 – 980 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770275460/maxresdefault_zf4qky.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770275498/image_7_pj8gff.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770275505/image_1_1_cwxgzk.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770275505/image_3_jlay3a.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770275500/image_4_1_v8eshp.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770275500/image_8_tnprah.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770275499/image_6_wfe3s7.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Nhà Đinh sụp đổ trong bối cảnh khủng hoảng quyền lực nội bộ, cho thấy những hạn chế của bộ máy nhà nước sơ khai khi chưa có cơ chế kế vị ổn định.<br>
        <strong>* Chi tiết:</strong><br>
        ⚠️ <strong>Khủng hoảng chính trị:</strong> Sau khi Đinh Tiên Hoàng qua đời, triều đình rơi vào hỗn loạn. Người kế vị còn nhỏ tuổi, quyền hành rơi vào tay các đại thần, làm gia tăng mâu thuẫn và tranh chấp.<br>
        🌪️ <strong>Nguy cơ từ bên ngoài:</strong> Trong lúc nội bộ rối ren, nhà Tống ở phương Bắc bắt đầu chuẩn bị xâm lược. Nhân dân lo lắng, niềm tin vào triều đình suy giảm.<br>
        🌟 <strong>Bài học lịch sử:</strong> Sự sụp đổ của nhà Đinh phản ánh tầm quan trọng của việc xây dựng bộ máy chính trị vững chắc và ổn định trong giai đoạn đầu của quốc gia.</p>`,
      },
      {
        name: "Nhà Tiền Lê (Lê Hoàn)",
        year: "980 – 1009",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770438002/44c923bf-bd7a-4027-b63f-b7394e5842ea.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770438036/dc69f63f-f8f1-4992-aab6-1e917765cc61.png",
        ],
        content: `<p>Nhà Tiền Lê do Lê Hoàn sáng lập năm 980, tiếp nối sự nghiệp xây dựng và bảo vệ quốc gia Đại Cồ Việt.</p>`,
      },
      {
        name: "Lê Hoàn xưng đế lập nhà Tiền Lê Đại phá quân Tống giữ vững nền độc lập dân tộc ",
        year: "980 - 981 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770278701/le-hoan-len-ngoi-vua-trong-hoan-canh-nao-476859_djtqfj.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770278660/image_4_fk0tb5.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770278661/image_3_tvwodv.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770278668/image_1_u226am.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770278660/image_6_lko3qq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770278658/image_7_q1a8qv.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770278667/image_1_lynzqc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770278665/image_2_nxqxwy.webp",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Lê Hoàn lên ngôi trong hoàn cảnh đặc biệt, lãnh đạo quân dân Đại Cồ Việt đánh bại cuộc xâm lược của nhà Tống, bảo vệ vững chắc nền độc lập dân tộc.<br>
        <strong>* Chi tiết:</strong><br>
        🛡️ <strong>Bối cảnh khẩn cấp:</strong> Trước nguy cơ xâm lược từ phương Bắc, triều đình cần một người đủ uy tín và năng lực quân sự. Lê Hoàn được tôn lên làm vua, lập ra nhà Tiền Lê.<br>
        ⚔️ <strong>Đại phá quân Tống:</strong> Năm 981, quân Tống tiến vào Đại Cồ Việt nhưng bị đánh bại hoàn toàn. Chiến thắng thể hiện tài thao lược quân sự và ý chí độc lập của dân tộc.<br>
        🌟 <strong>Ý nghĩa lịch sử:</strong> Chiến thắng củng cố nền độc lập non trẻ, khẳng định Đại Cồ Việt là một quốc gia có chủ quyền, không còn là đất phụ thuộc.</p>`,
      },
      {
        name: "Đánh Chiêm Thành bắt sống vua Chiêm mở rộng uy thế về phương Nam",
        year: "982 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279118/image_10_mrax54.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279118/image_5_crl0jg.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279118/image_7_1_dayeu5.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279118/image_3_qk52jc.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279118/image_6_1_ryudca.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279119/image_8_qwtjss.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279118/image_1_1_araz96.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Cuộc chinh phạt Chiêm Thành của nhà Tiền Lê nhằm khẳng định sức mạnh quốc gia và mở rộng ảnh hưởng về phía Nam.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Nguyên nhân:</strong> Quan hệ giữa Đại Cồ Việt và Chiêm Thành căng thẳng do các xung đột biên giới và chính trị.<br>
        🛡️ <strong>Diễn biến:</strong> Năm 982, Lê Hoàn thân chinh đánh Chiêm Thành, giành thắng lợi lớn, bắt sống vua Chiêm.<br>
        🌟 <strong>Ý nghĩa:</strong> Chiến thắng nâng cao uy thế Đại Cồ Việt, mở đầu quá trình mở rộng ảnh hưởng xuống phía Nam.</p>`,
      },
      {
        name: "Khủng hoảng kế vị triều Tiền Lê ",
        year: "1005 - 1009",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279802/image_1_xmkngs.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279800/image_4_mbs1iy.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279799/image_9_anss62.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279803/image_6_ff48uz.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279805/image_8_cakbfb.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279799/image_2_sppgo4.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279801/image_3_yladdz.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770279802/image_5_n2aifh.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Cuối thời Tiền Lê, triều đình rơi vào khủng hoảng kế vị, tạo điều kiện cho sự thay đổi triều đại.<br>
        <strong>* Chi tiết:</strong><br>
        ⚠️ <strong>Mâu thuẫn nội bộ:</strong> Sau khi Lê Hoàn qua đời, các hoàng tử tranh giành quyền lực, gây ra xung đột kéo dài.<br>
        🌪️ <strong>Hệ quả:</strong> Đất nước suy yếu, lòng dân dao động, tạo tiền đề cho sự xuất hiện của một triều đại mới.</p>`,
      },
      {
        name: "Nhà Lý (Lý Công Uẩn – Thăng Long)",
        year: "1009 – 1225",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770438458/vua_ly_thai_to_vanhien.vn_qj59oa.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770438461/015205_coverCDD_jerogu.jpg",
        ],
        content: `<p>Nhà Lý do Lý Công Uẩn sáng lập năm 1009, mở ra thời kỳ ổn định và phát triển lâu dài của đất nước.</p>`,
      },
      {
        name: "Lý Công Uẩn lên ngôi vua ",
        year: "1009 SCN",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280361/image_3_q2iptf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280362/image_3_twwkvp.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280363/image_1_jmbub1.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280364/image_1_iicles.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280360/image_6_yb9apm.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280359/image_4_gl2lhj.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280359/image_5_luahql.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280355/image_8_d3fxrz.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280356/image_7_qwin0k.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Lý Công Uẩn lên ngôi vua, mở ra triều đại nhà Lý – một thời kỳ phát triển rực rỡ trong lịch sử Việt Nam.<br>
        <strong>* Chi tiết:</strong><br>
        👑 <strong>Bối cảnh:</strong> Nhà Tiền Lê suy yếu, triều đình và nhân dân mong muốn một sự thay đổi để ổn định đất nước.<br>
        🌟 <strong>Ý nghĩa:</strong> Sự kiện này đánh dấu bước chuyển lớn về chính trị, mở đầu cho một triều đại thịnh trị.</p>`,
      },
      {
        name: "Lý Thái Tổ Dời Đô Về Thăng Long",
        year: "1010",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280358/image_5_mqybgc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280967/image_8_rqhxze.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280972/image_1_1_uuc4a3.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280968/image_10_rv2aa1.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280969/image_5_dmfx6h.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280971/image_5_1_esggiq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280966/image_3_1_uj4may.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770280967/image_9_r3q05o.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1010, Lý Thái Tổ quyết định dời đô từ Hoa Lư ra Đại La và đổi tên thành Thăng Long. Đây là bước ngoặt lớn, mở ra thời kỳ phát triển lâu dài và bền vững cho quốc gia Đại Việt.<br>
        <strong>* Chi tiết:</strong><br>
        🏛️ <strong>Bối cảnh dời đô:</strong> Hoa Lư tuy hiểm trở nhưng chật hẹp, không thuận lợi cho phát triển lâu dài. Đất Đại La có địa thế bằng phẳng, rộng rãi, trung tâm giao thông và kinh tế.<br>
        📜 <strong>Chiếu dời đô:</strong> Lý Thái Tổ ban Chiếu dời đô, thể hiện tầm nhìn chiến lược và tư duy chính trị tiến bộ, đặt lợi ích quốc gia lên hàng đầu.<br>
        🌟 <strong>Ý nghĩa lịch sử:</strong> Việc dời đô tạo nền tảng cho Thăng Long trở thành trung tâm chính trị, kinh tế, văn hóa suốt nhiều thế kỷ.</p>`,
      },
      {
        name: "Đổi tên nước thành Đại Việt",
        year: "1054",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770281887/ee0d9b1e-17f4-4e4b-aca4-79955be2253e.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770281542/808b9ed7-255a-4de4-85fc-267e8e0a71e8.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770281564/image_10_1_dxjonc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770281567/image_4_w3eyec.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770281566/image_8_1_vh9zso.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770281565/image_8_hbhkvy.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1054, triều Lý chính thức đổi tên nước từ Đại Cồ Việt thành Đại Việt, khẳng định vị thế quốc gia độc lập, tự cường.<br>
        <strong>* Chi tiết:</strong><br>
        📛 <strong>Ý nghĩa tên gọi:</strong> Tên Đại Việt thể hiện khát vọng lớn mạnh, trường tồn và ý thức dân tộc ngày càng rõ rệt.<br>
        🏛️ <strong>Bối cảnh chính trị:</strong> Nhà Lý đã xây dựng được nền chính trị ổn định, xã hội phát triển, đủ điều kiện khẳng định vị thế quốc gia.<br>
        🌟 <strong>Tác động lâu dài:</strong> Tên gọi Đại Việt được sử dụng xuyên suốt nhiều triều đại, trở thành biểu tượng của quốc gia độc lập.</p>`,
      },
      {
        name: "Thành lập Văn Miếu tại Thăng Long",
        year: "1070",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282124/image_9_bmalbg.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282202/image_6_jwcik5.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282123/image_10_o4dyjk.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282126/image_9_egeomq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282209/image_3_rryadh.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282170/image_7_cininf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282207/image_3_jvw718.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282205/image_4_nlgfdy.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282212/image_1_k57p9q.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282215/image_2_ky7im3.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282203/image_5_cbqpkq.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Văn Miếu được thành lập năm 1070 tại Thăng Long, đánh dấu sự phát triển của giáo dục và Nho học ở Việt Nam.<br>
        <strong>* Chi tiết:</strong><br>
        📚 <strong>Mục đích xây dựng:</strong> Văn Miếu thờ Khổng Tử và các bậc hiền triết, đồng thời là nơi đào tạo nhân tài cho triều đình.<br>
        🎓 <strong>Giáo dục và khoa cử:</strong> Từ đây, giáo dục chính thống được coi trọng, đặt nền móng cho hệ thống khoa cử lâu dài.<br>
        🌟 <strong>Ý nghĩa xã hội:</strong> Văn Miếu thể hiện tư duy trọng hiền tài, coi giáo dục là trụ cột của quốc gia.</p>`,
      },
      {
        name: "Chiến Thắng Của Lý Thường Kiệt",
        year: "1075 - 1077",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282886/image_10_rununs.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282935/image_8_huct6t.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282887/image_3_x0wyp5.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282888/image_4_b4rgrs.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282887/image_7_l3m5br.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770282893/image_3_apb5ip.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Cuộc kháng chiến chống Tống do Lý Thường Kiệt lãnh đạo là minh chứng cho nghệ thuật quân sự và tinh thần tự chủ của Đại Việt.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Chiến lược chủ động:</strong> Lý Thường Kiệt chủ trương đánh trước để phòng thủ, tấn công vào Ung – Khâm – Liêm của nhà Tống.<br>
        🛡️ <strong>Phòng tuyến sông Như Nguyệt:</strong> Bài thơ “Nam quốc sơn hà” vang lên như bản tuyên ngôn độc lập, cổ vũ tinh thần quân dân.<br>
        🌟 <strong>Ý nghĩa lịch sử:</strong> Chiến thắng bảo vệ vững chắc nền độc lập, khẳng định sức mạnh quốc gia Đại Việt.</p>`,
      },
      {
        name: "Chợ Kẻ Chợ – Trung tâm buôn bán của Thăng Long xưa",
        year: "Từ thế kỷ XI đến thế kỷ XVIII",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770283549/image_8_uyfyhc.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770283548/image_9_jb4n7n.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770283546/image_10_bk1btr.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770283551/image_8_1_jrob7p.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770283553/image_6_opl2x3.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770283560/image_1_dodumg.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770283558/image_2_e1jqfh.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770283555/image_4_1_eocybt.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770283556/image_3_uodqqi.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Chợ Kẻ Chợ là trung tâm buôn bán sầm uất của Thăng Long, phản ánh sự phát triển kinh tế – thương nghiệp lâu dài.<br>
        <strong>* Chi tiết:</strong><br>
        🏪 <strong>Hoạt động buôn bán:</strong> Hàng hóa từ khắp nơi đổ về, tạo nên mạng lưới thương mại rộng lớn.<br>
        🌆 <strong>Đời sống đô thị:</strong> Kẻ Chợ hình thành lối sống đô thị, góp phần tạo nên bản sắc văn hóa Thăng Long.<br>
        🌟 <strong>Vai trò lịch sử:</strong> Đây là trung tâm kinh tế quan trọng suốt nhiều thế kỷ.</p>`,
      },
      {
        name: "Khoa thi đầu tiên trong lịch sử Việt Nam",
        year: "1075",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770284398/a528ab00-5b5c-4bec-a692-e785234355b8.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770284534/55c83141-c987-4741-99ee-8c10aadec3fd.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770284316/download_xzt3gc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770284268/thi-cu-viet-nam_t6yp6h.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770284366/07_1370588700112_zjql67.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1075, khoa thi đầu tiên được tổ chức, mở đầu cho chế độ tuyển chọn quan lại bằng học vấn.<br>
        <strong>* Chi tiết:</strong><br>
        📖 <strong>Nội dung khoa cử:</strong> Thi tuyển dựa trên kiến thức Nho học, đạo đức và năng lực quản lý.<br>
        🎓 <strong>Tác động xã hội:</strong> Tạo cơ hội cho nhân tài xuất thân bình dân tham gia bộ máy nhà nước.<br>
        🌟 <strong>Ý nghĩa:</strong> Đặt nền móng cho nền giáo dục và khoa cử Việt Nam.</p>`,
      },
      {
        name: "Sự hình thành thương cảng Vân Đồn",
        year: "1149",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770284985/image_8_j4umxg.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770285160/03bb2de1-68b8-413b-8b55-5edaa4c40662.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770284988/image_1_ojl4tl.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770284987/image_4_lbw6xd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770284988/image_1_1_youf9g.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Thương cảng Vân Đồn hình thành năm 1149, đánh dấu bước phát triển mạnh mẽ của ngoại thương Đại Việt.<br>
        <strong>* Chi tiết:</strong><br>
        🚢 <strong>Vị trí chiến lược:</strong> Vân Đồn là cửa ngõ giao thương với các nước trong khu vực.<br>
        💰 <strong>Hoạt động kinh tế:</strong> Buôn bán sôi động, đóng góp lớn cho ngân khố quốc gia.<br>
        🌟 <strong>Ý nghĩa lịch sử:</strong> Khẳng định vai trò của Đại Việt trong mạng lưới thương mại khu vực.</p>`,
      },
      {
        name: "Lý Chiêu Hoàng nhường ngôi",
        year: "1225",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770285719/image_1_m9m4fx.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770285716/image_7_yyfmjl.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770285712/image_9_tu7q4v.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770285715/image_6_m654kw.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770285715/image_5_qtavhq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770285714/image_8_hwb5fq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770285717/image_4_1_a1ekms.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1225, Lý Chiêu Hoàng nhường ngôi, kết thúc triều Lý và mở ra triều đại nhà Trần.<br>
        <strong>* Chi tiết:</strong><br>
        ⚖️ <strong>Bối cảnh chính trị:</strong> Nhà Lý suy yếu, quyền lực thực tế nằm trong tay họ Trần.<br>
        🏛️ <strong>Chuyển giao triều đại:</strong> Việc nhường ngôi diễn ra hòa bình, hạn chế xáo trộn xã hội.<br>
        🌟 <strong>Ý nghĩa:</strong> Mở đầu thời kỳ nhà Trần với nhiều thành tựu lớn.</p>`,
      },
      {
        name: "Nhà Trần ",
        year: "1225 - 1400",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770286993/image_1_qzljnn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770286978/image_3_svfvrn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770286977/image_7_ce1mqo.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770286975/image_7_nmclbq.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770286988/image_2_trvgta.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770286978/image_5_t6ueqi.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770286980/image_6_z5u6jw.webp",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Nhà Trần ra đời năm 1225, tiếp nối và phát triển nền tảng chính trị – xã hội của nhà Lý.<br>
        <strong>* Chi tiết:</strong><br>
        🏛️ <strong>Tổ chức triều đình:</strong> Bộ máy nhà nước được củng cố, quân đội mạnh, kỷ cương chặt chẽ.<br>
        🌾 <strong>Kinh tế – xã hội:</strong> Nông nghiệp phát triển, đời sống nhân dân ổn định.<br>
        🌟 <strong>Vai trò lịch sử:</strong> Nhà Trần là triều đại gắn liền với các chiến thắng chống ngoại xâm.</p>`,
      },
      {
        name: "Kháng Chiến Chống Quân Nguyên Mông Lần 1 ",
        year: "1258",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770287570/image_2_1_a9y68o.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770287493/image_5_vub0ji.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770287524/image_3_ehp8rt.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770287492/image_7_xxu3h7.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770287486/image_8_snbjw3.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770287494/image_4_z3fddb.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770287570/image_1_1_e0wyql.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1258, Đại Việt đánh bại cuộc xâm lược đầu tiên của quân Nguyên – Mông.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Thách thức lớn:</strong> Quân Nguyên – Mông nổi tiếng thiện chiến, từng chinh phục nhiều quốc gia.<br>
        🛡️ <strong>Chiến lược linh hoạt:</strong> Nhà Trần chủ động rút lui, bảo toàn lực lượng, phản công đúng thời điểm.<br>
        🌟 <strong>Ý nghĩa:</strong> Khẳng định bản lĩnh quân sự và tinh thần độc lập của dân tộc.</p>`,
      },
      {
        name: "Hội nghị Diên Hồng ",
        year: "Cuối năm 1284",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289018/image_3_1_q01olq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289015/image_4_1_llxlfn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289014/image_7_wgh1dh.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289117/df0eee3f-c723-4975-b39f-de013832bda1.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Hội nghị Diên Hồng năm 1284 thể hiện tinh thần đoàn kết toàn dân trong cuộc kháng chiến chống Nguyên – Mông.<br>
        <strong>* Chi tiết:</strong><br>
        🏛️ <strong>Nội dung hội nghị:</strong> Vua hỏi ý kiến các bô lão về việc hòa hay đánh, toàn thể đều quyết “Đánh”.<br>
        🔥 <strong>Tinh thần dân tộc:</strong> Ý chí toàn dân thống nhất, sẵn sàng hy sinh để bảo vệ đất nước.<br>
        🌟 <strong>Ý nghĩa:</strong> Biểu tượng của sức mạnh đoàn kết và chủ quyền quốc gia.</p>`,
      },
      {
        name: "Kháng chiến chống quân Nguyên – Mông lần thứ hai",
        year: "1285",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289454/a2b55f40-aadd-4b22-a0aa-816851789e03.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289482/image_5_x8hj17.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289481/image_7_1_qg0fo8.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289487/image_3_dtnfng.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289485/image_3_gqs9z7.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289743/3ebed722-96e7-4486-8901-d1dd9a9f0b57.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1285, quân dân Đại Việt giành thắng lợi vang dội trong cuộc kháng chiến chống quân Nguyên – Mông lần thứ hai.<br>
        * <strong>Chi tiết:</strong><br>
        ⚔️ <strong>Âm mưu xâm lược:</strong> Nhà Nguyên huy động lực lượng lớn, tiến công Đại Việt từ nhiều hướng với mục tiêu thôn tính hoàn toàn.<br>
        🛡️ <strong>Chiến lược kháng chiến:</strong> Nhà Trần áp dụng kế sách vườn không nhà trống, chủ động rút lui để bảo toàn lực lượng.<br>
        🔥 <strong>Phản công quyết định:</strong> Các chiến thắng Hàm Tử, Chương Dương đã đánh tan ý chí xâm lược của quân Nguyên.<br>
        🌟 <strong>Ý nghĩa lịch sử:</strong> Khẳng định bản lĩnh quân sự và tinh thần đoàn kết toàn dân tộc.</p>`,
      },
      {
        name: "Kháng chiến chống Nguyên Mông lần thứ ba",
        year: "1287",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289891/82f281e6-82a6-4475-a716-cb63cf219e2b.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289932/image_3_1_yx5d7w.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289928/image_4_st19ia.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289920/image_10_qs40mx.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289921/image_9_x01nzn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289927/image_4_u9913u.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770289925/image_5_vn6ytr.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Cuộc kháng chiến chống Nguyên – Mông lần thứ ba (1287–1288) là đỉnh cao của nghệ thuật quân sự thời Trần.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Lực lượng xâm lược:</strong> Quân Nguyên tổ chức cuộc xâm lược quy mô lớn bằng cả đường bộ và đường thủy.<br>
        🚢 <strong>Chiến lược tiêu hao:</strong> Nhà Trần chủ động cắt đứt hậu cần, khiến quân địch rơi vào thế thiếu lương thực, mệt mỏi.<br>
        🔥 <strong>Trận Bạch Đằng:</strong> Năm 1288, trận Bạch Đằng tiêu diệt hoàn toàn chủ lực quân Nguyên.<br>
        🌟 <strong>Ý nghĩa:</strong> Chấm dứt mộng xâm lược Đại Việt của đế quốc Nguyên – Mông.</p>`,
      },
      {
        name: "Chiến Thắng Bạch Đằng",
        year: "1288",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770288282/image_4_nikakq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770288286/image_2_esghdj.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770288281/image_8_lz79y4.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770288548/image_2_1_yaqgcm.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770288452/d70c0b98-d29a-4e75-9bf1-9c22808785d8.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770288282/image_6_gkbwdq.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770288285/image_3_sejk5q.webp",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Chiến thắng Bạch Đằng năm 1288 là đỉnh cao của nghệ thuật quân sự Việt Nam.<br>
        <strong>* Chi tiết:</strong><br>
        🚢 <strong>Trận địa cọc:</strong> Nhà Trần tận dụng thủy triều và địa hình sông Bạch Đằng để tiêu diệt quân địch.<br>
        ⚔️ <strong>Kết quả:</strong> Quân Nguyên – Mông thất bại nặng nề, hoàn toàn tan rã.<br>
        🌟 <strong>Ý nghĩa lịch sử:</strong> Chấm dứt mộng xâm lược của Nguyên – Mông, bảo vệ nền độc lập Đại Việt.</p>`,
      },
      {
        name: "Cuối thế kỷ XIV triều đại nhà Trần suy yếu",
        year: "Cuối thế kỷ XIV",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770290627/image_9_kkf8go.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770290621/image_3_dzwurp.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770290618/image_3_iqism8.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770290622/image_1_krrx9e.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770290615/image_10_llhxd0.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770290617/image_8_wnfo6d.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Cuối thế kỷ XIV, triều đại nhà Trần dần suy yếu, đất nước rơi vào khủng hoảng.<br>
        <strong>* Chi tiết:</strong><br>
        ⚠️ <strong>Nguyên nhân suy yếu:</strong> Nội bộ triều đình phân hóa, vua quan sa vào hưởng lạc, kỷ cương lỏng lẻo.<br>
        🌾 <strong>Đời sống nhân dân:</strong> Thiên tai, đói kém xảy ra liên tiếp, đời sống nhân dân cực khổ.<br> 
        🌟 <strong>Hệ quả:</strong> Tạo điều kiện cho sự thay đổi triều đại sau này.</p>`,
      },
      {
        name: "Nhà Hồ & Minh Thuộc (Hồ Quý Ly – Đại Ngu)",
        year: "1400 - 1427",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770442843/image_2_toskzt.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770442832/image_7_baasls.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770442835/image_6_xbhkpt.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770442833/image_10_kud2uf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770442837/image_3_zu7jlm.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770442840/image_1_uq90co.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1400, Hồ Quý Ly phế truất nhà Trần, lập ra triều đại nhà Hồ.<br>
        <strong>* Chi tiết:</strong><br>
        🏛️ <strong>Cải cách mạnh mẽ:</strong> Nhà Hồ tiến hành nhiều cải cách về kinh tế, tiền tệ, giáo dục và quân sự.<br>
        📜 <strong>Hạn chế:</strong> Cải cách diễn ra gấp gáp, chưa được lòng dân.<br>
        🌟 <strong>Ý nghĩa:</strong> Dù tồn tại ngắn ngủi, nhà Hồ để lại nhiều dấu ấn cải cách táo bạo.</p>`,
      },
      {
        name: "Nhà Hồ Thay Thế Nhà Trần",
        year: "1400",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770292998/image_5_eckc4x.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770292999/image_6_lae4mz.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770293004/image_1_k9ogex.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770293003/image_3_ysgxfz.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770292983/image_10_1_do7hn7.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770292989/image_9_vpeabd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770292988/image_10_pj5a0c.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770292995/image_7_pi0e3l.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770292994/image_8_hyx3fn.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1400, Hồ Quý Ly phế truất nhà Trần, lập ra triều đại nhà Hồ.<br>
        <strong>* Chi tiết:</strong><br>
        🏛️ <strong>Cải cách mạnh mẽ:</strong> Nhà Hồ tiến hành nhiều cải cách về kinh tế, tiền tệ, giáo dục và quân sự.<br>
        📜 <strong>Hạn chế:</strong> Cải cách diễn ra gấp gáp, chưa được lòng dân.<br>
        🌟 <strong>Ý nghĩa:</strong> Dù tồn tại ngắn ngủi, nhà Hồ để lại nhiều dấu ấn cải cách táo bạo.</p>`,
      },
      {
        name: "Nhà Minh Xâm Lược Đại Nội",
        year: "1407",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770294120/images-motthegioi-vn-8443_bwluzzi-_lwz1kd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770293911/image_3_duuvt8.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770293912/image_3_1_ssyhuc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770293862/image_4_gvohdj.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770293827/image_6_1_h6voqf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770293783/image_6_djkyrb.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770293780/image_8_u1xo5d.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770293777/image_5_1_gedncx.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770293777/image_10_idskwa.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1407, nhà Minh xâm lược Đại Việt, mở đầu thời kỳ Bắc thuộc lần thứ tư.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Cuộc xâm lược:</strong> Nhà Minh lợi dụng tình hình rối ren để đưa quân chiếm đóng Đại Việt.<br>
        📚 <strong>Chính sách cai trị:</strong> Thực hiện đồng hóa văn hóa, bóc lột tài nguyên và đàn áp nhân dân.<br>
        🌟 <strong>Hệ quả:</strong> Đất nước rơi vào ách đô hộ nặng nề trong hơn 20 năm.</p>`,
      },
      {
        name: "Khởi Nghĩa Lam Sơn - Lê Lợi",
        year: "1418",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770294647/image_7_jwppfg.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770294500/image_6_aofwzb.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770294518/image_1_qlrq2c.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770294520/image_1_dhg3gu.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770294517/image_3_co3wzn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770294501/image_5_qhowdr.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770294517/image_4_l6hywd.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1418, Lê Lợi phất cờ khởi nghĩa Lam Sơn, mở đầu cuộc đấu tranh giải phóng dân tộc.<br>
        <strong>* Chi tiết:</strong><br>
        🔥 <strong>Khởi nghĩa:</strong> Bắt đầu từ vùng Lam Sơn (Thanh Hóa), lực lượng còn nhỏ nhưng ý chí lớn.<br>
        ⚔️ <strong>Chiến lược:</strong> Vừa đánh vừa xây dựng lực lượng, dựa vào lòng dân.<br>
        🌟 <strong>Ý nghĩa:</strong> Đặt nền móng cho thắng lợi chống quân Minh.</p>`,
      },
      {
        name: "Nhà Hậu Lê",
        year: "1428 - 1789",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770443991/image_1_btzkd7.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770443989/image_3_zp8v3p.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770443987/image_4_fksotx.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770443872/image_8_jluah5.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770443871/image_9_pxbiqi.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1428, Lê Lợi lên ngôi hoàng đế, lập ra triều Hậu Lê.<br>
        <strong>* Chi tiết:</strong><br>
        🏛️ <strong>Kết thúc chiến tranh:</strong> Đánh bại hoàn toàn quân Minh, giành lại độc lập cho Đại Việt.<br>
        📜 <strong>Xây dựng đất nước:</strong> Khôi phục kinh tế, ổn định xã hội, củng cố chính quyền trung ương.<br>
        🌟 <strong>Ý nghĩa:</strong> Mở ra thời kỳ phát triển thịnh trị của quốc gia.</p>`,
      },
      {
        name: "Nhà Lê Sơ (Thịnh trị)",
        year: "1428 – 1527",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770443865/image_7_nfk4pz.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770443690/4d2975f3-c8a0-4291-8b8d-9c863d20d371.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770443737/5e405d6f-fb15-4867-8234-de9e39730990.png",
        ],
        content: `<p>Nhà Lê sơ được thành lập năm 1428, đưa đất nước bước vào thời kỳ thịnh trị dưới các vua Lê, đặc biệt là Lê Thánh Tông.</p>`,
      },
      {
        name: "Lê Lợi lên ngôi lập ra triều Hậu Lê",
        year: "1428",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299438/image_8_xr6f28.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299439/image_7_zbmivn.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299439/image_4_xwljsl.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299439/image_6_c0nrhy.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299440/image_10_in8wv7.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299444/image_1_dcfsyp.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299439/image_2_wqsmgc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299438/image_9_i0qnet.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1428, Lê Lợi lên ngôi hoàng đế, chính thức lập ra triều đại nhà Hậu Lê.<br>
        <strong>* Chi tiết:</strong><br>
        👑 <strong>Sự kiện lên ngôi:</strong> Sau thắng lợi của khởi nghĩa Lam Sơn, Lê Lợi xưng đế, lấy niên hiệu Thuận Thiên.<br>
        🏛️ <strong>Tổ chức nhà nước:</strong> Xây dựng bộ máy chính quyền vững mạnh, khôi phục kinh tế – xã hội sau chiến tranh.<br>
        🌟 <strong>Ý nghĩa lịch sử:</strong> Đánh dấu sự phục hưng mạnh mẽ của quốc gia Đại Việt.</p>`,
      },
      {
        name: "Bộ luật Hồng Đức ra đời",
        year: "1483",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300247/luat-hong-duc-cai-mau-de-tri-nuoc-cai-khuon-phep-de-buoc-dan-5488688cfbee476b8cbd2c97bb68d337_ikelyf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300271/download_oxybal.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300274/download_pvpu6d.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300299/image_5_pacitc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300298/image_8_efmkra.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300283/image_9_tqhjjq.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1483, Bộ luật Hồng Đức được ban hành dưới thời vua Lê Thánh Tông.<br>
        <strong>* Chi tiết:</strong><br>
        ⚖️ <strong>Nội dung tiến bộ:</strong> Bộ luật bảo vệ quyền lợi người dân, đề cao vai trò phụ nữ và trật tự xã hội.<br>
        📜 <strong>Quản lý quốc gia:</strong> Luật pháp trở thành công cụ quản lý hiệu quả của nhà nước phong kiến.<br>
        🌟 <strong>Giá trị lịch sử:</strong> Là đỉnh cao của tư tưởng pháp quyền thời phong kiến Việt Nam.</p>`,
      },
      {
        name: "Vua Lê Thánh Tông qua đời",
        year: "1497",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300629/image_3_vmscm0.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300630/image_1_j0xb0w.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300630/image_2_ifsv7e.gif",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300621/image_6_nnmr94.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300621/image_10_zcie78.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300620/image_7_fece3b.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300620/image_6_o8buvf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770300621/image_5_1_blxgp4.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1497, vua Lê Thánh Tông qua đời, triều Hậu Lê bắt đầu suy yếu dần.<br>
        <strong>* Chi tiết:</strong><br>
        👑 <strong>Vai trò của Lê Thánh Tông:</strong> Ông là vị vua kiệt xuất, đưa Đại Việt đạt đến thời kỳ thịnh trị.<br>
        ⚠️ <strong>Sau khi qua đời:</strong> Triều đình mất đi người lãnh đạo tài năng, mâu thuẫn nội bộ gia tăng.<br>
        🌟 <strong>Hệ quả:</strong> Đặt nền móng cho những biến động lớn sau này.</p>`,
      },
      {
        name: "Nhà Mạc – Nam Bắc triều",
        year: "1527 – 1677",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770445077/image_2_qeqyef.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770445077/image_1_pbd8hi.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770445073/image_3_srtayk.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770445068/image_5_mhqwnm.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770445071/image_4_yhmhb4.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770445063/image_7_i82jjj.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770445064/image_6_c5gs1k.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770445057/image_8_umsumu.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Nhà Mạc tồn tại từ năm 1527 đến 1677, là triều đại gây nhiều tranh cãi trong lịch sử Việt Nam.<br>
        <strong>* Chi tiết:</strong><br>
        🏛️ <strong>Sự ra đời:</strong>
        Mạc Đăng Dung phế truất vua Lê, lập ra triều Mạc.<br>
        ⚖️ <strong>Chính sách cai trị:</strong>
        Nhà Mạc cố gắng ổn định đất nước nhưng gặp sự chống đối mạnh mẽ.<br>
        🌟 <strong>Ý nghĩa lịch sử:</strong>
        Là giai đoạn khủng hoảng quyền lực phong kiến sâu sắc.</p>`,
      },
      {
        name: "Thời Kỳ Lê-Mạc phân tranh",
        year: "1527",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770298559/Khamphahue-trinh-nguyen-phan-tranh_ncyp5d.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770298616/image_10_aaq1kr.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770298617/image_8_dsleov.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770298617/image_4_z4fqfi.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770298618/image_2_uaibd8.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770298618/image_7_dj0g8i.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770298618/image_1_b0xay8.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770298617/image_9_ax19qx.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Từ năm 1527, đất nước bước vào thời kỳ Lê – Mạc phân tranh, quyền lực trung ương suy yếu, xã hội rối ren kéo dài.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Nguyên nhân phân tranh:</strong> Nhà Lê suy yếu, triều chính rối loạn, tạo điều kiện cho Mạc Đăng Dung cướp ngôi.<br>
        🏛️ <strong>Hai chính quyền song song:</strong> Nhà Mạc kiểm soát triều đình trung ương, trong khi lực lượng trung hưng nhà Lê hoạt động ở Thanh Hóa.<br>
        🌾 <strong>Ảnh hưởng xã hội:</strong> Chiến tranh liên miên khiến đời sống nhân dân cực khổ, kinh tế đình trệ.<br>
        🌟 <strong>Ý nghĩa lịch sử:</strong> Thể hiện khủng hoảng sâu sắc của chế độ phong kiến tập quyền.</p>`,
      },
      {
        name: "Mạc Đăng Dung lập triều Mạc",
        year: "1527",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770301313/image_7_doxjao.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770301313/image_7_me0hlx.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770301321/image_1_yxnqzw.gif",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770301321/image_2_fzploj.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770301314/image_5_a7efp3.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770301313/image_6_kryniw.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770301313/image_9_ufesug.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1527, Mạc Đăng Dung chính thức lập ra triều đại nhà Mạc.<br>
        <strong>* Chi tiết:</strong><br>
        👑 <strong>Con đường lên ngôi:</strong> Từ võ quan dưới triều Lê, Mạc Đăng Dung từng bước nắm toàn bộ quyền lực.<br>
        🏛️ <strong>Cải cách ban đầu:</strong> Nhà Mạc chú trọng ổn định xã hội, duy trì khoa cử và luật pháp.<br>
        🌟 <strong>Ý nghĩa:</strong> Mở đầu thời kỳ phân tranh Lê – Mạc.</p>`,
      },
      {
        name: "Mất Thăng Long - Nhà Mạc chạy về Cao Bằng",
        year: "1592",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302203/c4db8695-7cf6-488c-a48e-22611ed44115.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302104/image_4_xl40h2.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302108/image_2_1_h0giom.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302104/image_5_piyopp.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302103/image_6_1_vz3thv.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1592, quân Lê – Trịnh chiếm lại Thăng Long, nhà Mạc rút lên Cao Bằng.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Mất kinh đô:</strong> Nhà Mạc không còn giữ được trung tâm chính trị quan trọng nhất.<br>
        🏔️ <strong>Rút về Cao Bằng:</strong> Tồn tại nhờ sự hậu thuẫn của nhà Minh và địa thế hiểm trở.<br>
        🌟 <strong>Hệ quả:</strong> Nhà Mạc suy yếu nghiêm trọng và dần mất vai trò lịch sử.</p>`,
      },
      {
        name: "Mạc Đăng Dung quy phục nhà Minh",
        year: "1540",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302458/ky_2_su_hen_nhat_vi_dai_30110_mac_dang_dung_b_resize_ldwprg.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302480/image_9_ga2bf3.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302478/image_9_e0ho2n.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302483/image_7_isumgt.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302486/image_5_nqbfxv.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302489/image_3_zwomvz.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302484/image_5_s1ilpa.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302490/image_1_yulqpz.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1540, Mạc Đăng Dung quy phục nhà Minh nhằm tránh cuộc xâm lược từ phương Bắc.<br>
        <strong>* Chi tiết:</strong><br>
        ⚠️ <strong>Bối cảnh:</strong> Nhà Minh đe dọa tiến quân do không công nhận tính chính danh của nhà Mạc.<br>
        📜 <strong>Hành động quy phục:</strong> Mạc Đăng Dung chấp nhận thần phục để giữ quyền cai trị trong nước.<br>
        🌟 <strong>Đánh giá lịch sử:</strong> Hành động gây nhiều tranh cãi nhưng giúp tránh được chiến tranh lớn.</p>`,
      },
      {
        name: "Trịnh Kiểm nắm quyền sau khi Nguyễn Kim mất",
        year: "1545",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770342413/image_5_ybxnr4.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770342410/image_10_iy5dtq.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770342428/image_2_ifsssz.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770342410/image_9_fesw8c.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1545, sau khi Nguyễn Kim qua đời, Trịnh Kiểm nắm quyền lãnh đạo lực lượng trung hưng nhà Lê.<br>
        <strong>* Chi tiết:</strong><br>
        👑 <strong>Thay đổi quyền lực:</strong> Trịnh Kiểm trở thành người kiểm soát thực tế triều đình.<br>
        ⚠️ <strong>Mầm mống phân tranh:</strong> Tạo tiền đề cho xung đột Trịnh – Nguyễn sau này.<br>
        🌟 <strong>Hệ quả:</strong> Bước ngoặt lớn trong cấu trúc quyền lực phong kiến.</p>`,
      },
      {
        name: "Quân Lê – Trịnh chiếm lại Thăng Long nhà Mạc suy yếu",
        year: "1592",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770341973/image_10_zo3cqk.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770341980/image_7_rorgy5.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770341980/image_2_vcpw1l.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770341980/image_6_lahlza.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770341979/image_2_mx692f.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770341978/image_8_csw2jv.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770341980/image_4_f9ceba.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770341980/image_3_ntpgdo.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770341981/image_3_kkpj9w.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1592, quân Lê – Trịnh chiếm lại Thăng Long, nhà Mạc mất quyền kiểm soát trung tâm chính trị.<br>
        <strong>*Chi tiết:</strong><br>
        ⚔️ <strong>Chiến dịch quyết định:</strong> Quân Lê – Trịnh tấn công mạnh, buộc nhà Mạc rút lui.<br>
        🏛️ <strong>Khôi phục triều Lê:</strong> Thăng Long trở lại dưới danh nghĩa vua Lê.<br>
        🌟 <strong>Ý nghĩa:</strong> Củng cố quyền lực của tập đoàn Lê – Trịnh.</p>`,
      },
      {
        name: "Trịnh-Nguyễn phân tranh",
        year: "1600 - 1788",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299038/trinh-nguyen-phan-tranh_z6k91u.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299058/image_4_qzy1y7.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299056/image_10_pqekek.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299060/image_4_1_mfmyyq.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770299060/image_3_gbhsmi.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Từ đầu thế kỷ XVII đến cuối thế kỷ XVIII, đất nước bị chia cắt bởi cuộc Trịnh – Nguyễn phân tranh kéo dài.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Hai tập đoàn phong kiến:</strong> Chúa Trịnh nắm quyền ở Đàng Ngoài, chúa Nguyễn kiểm soát Đàng Trong.<br>
        🏰 <strong>Ranh giới chia cắt:</strong> Sông Gianh trở thành giới tuyến chia đôi đất nước trong thời gian dài.<br>
        🌾 <strong>Đời sống nhân dân:</strong> Nhân dân hai miền chịu nhiều sưu thuế, chiến tranh làm kiệt quệ kinh tế.<br>
        🌟 <strong>Ý nghĩa:</strong> Bộc lộ sự suy thoái nghiêm trọng của chế độ phong kiến Việt Nam.</p>`,
      },
      {
        name: "Nhà Lê Trung Hưng",
        year: "1627 – 1777",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770447998/image_2_yintjl.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770448002/image_1_oqj3nn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770447997/image_3_oxxeoz.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770447988/image_6_qdrhck.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770447988/image_8_img6az.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770447987/image_9_rkadui.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Nhà Lê Trung Hưng tồn tại từ thế kỷ XVII đến cuối thế kỷ XVIII, nhưng thực quyền nằm trong tay các chúa Trịnh.<br>
        <strong>* Chi tiết:</strong><br>
        🏛️ <strong>Mô hình quyền lực:</strong> Vua Lê chỉ giữ vai trò danh nghĩa, chúa Trịnh nắm toàn bộ quyền điều hành.<br>
        ⚖️ <strong>Chính trị – xã hội:</strong> Triều đình ổn định bề ngoài nhưng tiềm ẩn nhiều mâu thuẫn.<br>
        🌟 <strong>Đánh giá:</strong> Thể hiện sự suy yếu của chế độ quân chủ tập quyền.</p>`,
      },
      {
        name: "Nhà Mạc bị tiêu diệt ở Cao Bằng",
        year: "1677",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302999/download_j5ktug.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770303111/image_2_m0xogc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770303012/image_2_n1vrda.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770302995/download_lu068j.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770303010/image_8_fxkl6y.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1677, nhà Mạc bị tiêu diệt hoàn toàn tại Cao Bằng, chấm dứt vai trò lịch sử sau hơn một thế kỷ tồn tại.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Giai đoạn suy tàn:</strong> Sau khi mất Thăng Long, nhà Mạc chỉ còn tồn tại cầm chừng ở Cao Bằng.<br>
        🏔️ <strong>Sự cô lập:</strong> Phụ thuộc vào sự bảo hộ bên ngoài, không còn thực quyền trong nước.<br>
        🌟 <strong>Ý nghĩa lịch sử:</strong> Đánh dấu sự kết thúc thời kỳ Lê – Mạc phân tranh.</p>`,
      },
      {
        name: "Lãnh thổ Đại Việt hình thành hình chữ S",
        year: "1711",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770342762/image_3_dn4b85.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770342759/image_2_rrdpmo.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770342758/image_4_a0ffvz.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770342772/image_2_1_t4mohv.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Đến năm 1711, lãnh thổ Đại Việt cơ bản hình thành hình chữ S như ngày nay.<br>
        <strong>* Chi tiết:</strong><br>
        🗺️ <strong>Mở rộng lãnh thổ:</strong> Quá trình Nam tiến kéo dài nhiều thế kỷ đạt thành quả rõ nét.<br>
        🌾 <strong>Quản lý vùng đất mới:</strong> Thiết lập hành chính, đưa dân cư khai khẩn đất đai.<br>
        🌟 <strong>Ý nghĩa:</strong> Định hình không gian lãnh thổ quốc gia Việt Nam.</p>`,
      },
      {
        name: "Khởi nghĩa Tây Sơn - Nguyễn Huệ (Quang Trung)",
        year: "1771 - 1802",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770343213/image_6_hvvcvm.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770343324/image_1_pcqu1v.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770343215/image_7_dwp1ev.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770343215/image_5_xsy7m1.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770343214/image_8_piyxof.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770343215/image_2_bth2hv.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1771, khởi nghĩa Tây Sơn bùng nổ, mở đầu phong trào nông dân lớn nhất trong lịch sử phong kiến Việt Nam.<br>
        <strong>* Chi tiết:</strong><br>
        🔥 <strong>Nguyên nhân:</strong> Chính quyền Trịnh – Nguyễn mục nát, nhân dân cực khổ.<br>
        ⚔️ <strong>Lực lượng lãnh đạo:</strong> Ba anh em Tây Sơn đứng lên tập hợp quần chúng.<br>
        🌟 <strong>Ý nghĩa:</strong> Báo hiệu sự sụp đổ của trật tự phong kiến cũ.</p>`,
      },
      {
        name: "Tây Sơn tiêu diệt chúa Nguyễn ở Đàng Trong",
        year: "1777",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344233/image_8_gq7mbg.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344235/image_6_p7su3q.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344234/image_5_upmd98.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344234/image_1_z62hxf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344234/image_4_odx3ew.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344229/image_9_ezdern.webp",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1777, quân Tây Sơn tiêu diệt chính quyền chúa Nguyễn ở Đàng Trong.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Sụp đổ chính quyền cũ:</strong> Gia tộc chúa Nguyễn gần như bị tiêu diệt hoàn toàn.<br>
        🌾 <strong>Tác động xã hội:</strong> Chấm dứt chế độ bóc lột nặng nề ở Đàng Trong.<br>
        🌟 <strong>Ý nghĩa:</strong> Mở đường cho sự thống nhất đất nước.</p>`,
      },
      {
        name: "Triều Đại Tây Sơn",
        year: "1778 - 1802",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770450490/image_1_zgkbn4.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770450487/image_2_yo2lzd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770450478/image_4_zroj4f.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770450482/image_3_xerr9g.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770450484/image_3_dr0y1h.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770450466/image_7_owz3bx.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770450474/image_5_xsxgf8.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770450478/image_6_t54otq.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770450464/image_8_kutekl.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770450464/image_9_ftdlej.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Triều đại Tây Sơn tồn tại từ năm 1778 đến 1802, gắn liền với những chiến công hiển hách.<br>
        <strong>* Chi tiết:</strong><br>
        🏛️ <strong>Thiết lập triều đại:</strong>
        Nguyễn Nhạc xưng vương, sau đó Nguyễn Huệ giữ vai trò nổi bật.<br>
        ⚔️ <strong>Thành tựu quân sự:</strong>
        Liên tiếp đánh bại các thế lực trong và ngoài nước.<br>
        🌟 <strong>Vai trò lịch sử:</strong>
        Là triều đại cải cách và chống ngoại xâm tiêu biểu.</p>`,
      },
      {
        name: "Chiến thắng Rạch Gầm – Xoài Mút",
        year: "1785",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344479/image_3_ittc2u.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344480/image_6_idyc8j.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344479/image_2_te2bhq.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344479/image_1_vigpwn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344479/image_7_j9hb8z.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344479/image_9_e1wqpw.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1785, chiến thắng Rạch Gầm – Xoài Mút đánh bại hoàn toàn quân Xiêm xâm lược.<br>
        <strong>* Chi tiết:</strong><br>
        🚢 <strong>Trận thủy chiến:</strong> Nguyễn Huệ sử dụng chiến thuật mai phục trên sông.<br>
        🔥 <strong>Kết quả:</strong> Quân Xiêm bị tiêu diệt nặng nề, phải rút khỏi Đại Việt.<br>
        🌟 <strong>Ý nghĩa:</strong> Khẳng định tài năng quân sự kiệt xuất của Nguyễn Huệ.</p>`,
      },
      {
        name: "Nguyễn Huệ tiến ra Bắc diệt Trịnh – lập vua Lê",
        year: "1786",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344746/image_2_wtsql9.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344746/image_4_d2bviq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344746/image_1_lrkqsv.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344746/image_3_jsfv1p.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344746/image_6_zotxy5.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344745/image_5_ydig6i.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770344759/image_1_cbovtk.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1786, Nguyễn Huệ tiến ra Bắc, lật đổ chính quyền họ Trịnh và lập lại vua Lê.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Chiến dịch thần tốc:</strong> Quân Tây Sơn tiến nhanh, chiếm Thăng Long.<br>
        🏛️ <strong>Lật đổ Trịnh:</strong> Chấm dứt hơn 200 năm Trịnh chuyên quyền.<br>
        🌟 <strong>Ý nghĩa:</strong> Mở đường cho việc thống nhất đất nước.</p>`,
      },
      {
        name: "Quân Thanh xâm lược Thăng Long",
        year: "1788",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770345174/image_1_hwtnww.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770345186/image_6_d1h0w5.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770345174/image_4_gnjyfs.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770345173/image_10_wxqo7a.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770345173/image_2_eoouht.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770345179/image_8_wwoezs.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1788, quân Thanh kéo vào Thăng Long nhằm can thiệp vào nội bộ Đại Việt.<br>
        <strong>* Chi tiết:</strong><br>
        ⚠️ <strong>Âm mưu xâm lược:</strong> Lợi dụng tình hình rối ren sau khi Tây Sơn ra Bắc.<br>
        🏛️ <strong>Chiếm đóng tạm thời:</strong> Thăng Long rơi vào tay quân Thanh.<br>
        🌟 <strong>Hệ quả:</strong> Dẫn đến chiến thắng Ngọc Hồi – Đống Đa vang dội.</p>`,
      },
      {
        name: "Vua Quang Trung băng hà Tây Sơn bắt đầu suy yếu",
        year: "29/7/1792",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770345564/image_4_czou0r.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770345568/image_6_vp7lll.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770345548/download_vjyl6z.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770345563/image_10_j4p0v0.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770345565/image_3_pspwny.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Ngày 29/7/1792, vua Quang Trung qua đời, triều đại Tây Sơn bắt đầu suy yếu nhanh chóng.<br>
        <strong>* Chi tiết:</strong><br>
        👑 <strong>Vai trò Quang Trung:</strong> Là linh hồn của triều đại, người cải cách và quân sự kiệt xuất.<br>
        ⚠️ <strong>Khủng hoảng kế vị:</strong> Người kế vị non trẻ, triều chính rối loạn.<br>
        🌟 <strong>Hệ quả:</strong> Tạo điều kiện cho nhà Nguyễn trỗi dậy.</p>`,
      },
      {
        name: "Nhà Nguyễn (Gia Long - Tự Đức)",
        year: "1802 - 1945",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770453351/image_2_n7lizs.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770453347/image_4_wfu3sn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770453352/image_1_wx433i.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770453341/image_4_cj4rxo.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770453342/image_5_igaqdb.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770453268/image_6_ekgyhe.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770453274/image_6_c8lotw.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770453276/image_5_iad3vr.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770452936/image_8_ssurvi.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770453264/image_7_dracwi.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Nhà Nguyễn tồn tại từ năm 1802 đến 1945, là triều đại phong kiến cuối cùng của Việt Nam.<br>
        <strong>* Chi tiết:</strong><br>
        🏛️ <strong>Thiết lập triều đại:</strong> Gia Long lên ngôi, thống nhất đất nước.<br>
        ⚖️ <strong>Bộ máy cai trị:</strong> Xây dựng chính quyền tập quyền chặt chẽ.<br>
        🌟 <strong>Vai trò lịch sử:</strong> Khép lại thời kỳ phong kiến Việt Nam.</p>`,
      },
      {
        name: "Gia Long Thống Nhất Đất Nước",
        year: "1802",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770346520/download_qqwckg.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770346542/image_9_l7tqtq.gif",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770346544/image_3_jgewur.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770346545/image_8_p8vea2.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770346546/image_2_xmabom.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770346549/image_1_rsgtlc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770346541/image_10_xhumks.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1802, Gia Long chính thức thống nhất đất nước sau nhiều năm nội chiến.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Kết thúc phân tranh:</strong> Đánh bại hoàn toàn nhà Tây Sơn.<br>
        🗺️ <strong>Thống nhất lãnh thổ:</strong> Đất nước quy về một mối từ Bắc vào Nam.<br>
        🌟 <strong>Ý nghĩa:</strong> Mở đầu triều đại nhà Nguyễn.</p>`,
      },
      {
        name: "Vua Gia Long đổi quốc hiệu thành Việt Nam",
        year: "1804",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349261/image_9_rbporf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349268/image_3_1_gusofc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349272/image_1_1_zkdp0z.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349269/image_2_1_zyaavh.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349263/image_5_ikzuap.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349267/image_4_vcgaxu.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349260/image_10_lhqpon.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349261/image_8_w9tkbt.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349262/image_6_l0aees.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1804, vua Gia Long đổi quốc hiệu thành Việt Nam.<br>
        <strong>* Chi tiết:</strong><br>
        📛 <strong>Ý nghĩa tên gọi:</strong> Khẳng định lãnh thổ rộng lớn và bản sắc dân tộc.<br>
        🏛️ <strong>Đối ngoại:</strong> Quốc hiệu được nhà Thanh công nhận.<br>
        🌟 <strong>Giá trị lịch sử:</strong> Lần đầu tiên quốc hiệu Việt Nam chính thức xuất hiện.</p>`,
      },
      {
        name: "Vua Minh Mạng đổi quốc hiệu thành Đại Nam",
        year: "1839",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349561/image_10_1_jrhvgu.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349569/image_1_npywpx.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349568/image_2_tn2itg.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349566/image_3_fmvpwo.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349541/image_6_bjwduf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349562/image_4_1_yvdv4z.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1839, vua Minh Mạng đổi quốc hiệu từ Việt Nam thành Đại Nam.<br>
        <strong>* Chi tiết:</strong><br>
        🏛️ <strong>Tư tưởng cai trị:</strong> Thể hiện tham vọng xây dựng quốc gia lớn mạnh.<br>
        ⚖️ <strong>Cải cách hành chính:</strong> Chia lại đơn vị hành chính, tăng cường quản lý.<br>
        🌟 <strong>Ý nghĩa:</strong> Đánh dấu giai đoạn tập quyền cao độ của nhà Nguyễn.</p>`,
      },
      {
        name: "Nguyễn Trường Tộ và tư tưởng cải cách",
        year: "≈ 1850 trở đi",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349929/download_v4aetm.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349932/download_vwyf6k.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349991/image_10_gb2qcl.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349976/image_9_avfqmd.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770349989/image_6_mmwdxn.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Từ giữa thế kỷ XIX, Nguyễn Trường Tộ là một trong những trí thức hiếm hoi sớm nhận thức rõ nguy cơ tụt hậu của Việt Nam trước sự phát triển vượt bậc của các nước phương Tây. Ông dành phần lớn cuộc đời để đề xuất con đường cải cách nhằm canh tân đất nước và giữ vững độc lập dân tộc.<br>
        <strong>* Chi tiết:</strong><br>
        🧠 <strong>Con người:</strong> Nguyễn Trường Tộ sinh ra trong bối cảnh xã hội phong kiến đang khủng hoảng sâu sắc. Nhờ được tiếp xúc với văn minh phương Tây, ông có cái nhìn mới mẻ, vượt khỏi tư duy Nho giáo truyền thống vốn chi phối triều đình lúc bấy giờ.<br>
        📜 <strong>Tư tưởng cải cách:</strong> Ông đề xuất cải cách toàn diện trên nhiều lĩnh vực như giáo dục, quân sự, kinh tế, hành chính và ngoại giao. Trọng tâm là học tập khoa học – kỹ thuật phương Tây, xây dựng bộ máy nhà nước hiệu quả, coi trọng thực học thay vì khoa cử hình thức.<br>
        ⚠️ <strong>Thực trạng:</strong> Triều đình nhà Nguyễn bảo thủ, lo sợ cải cách sẽ làm suy yếu nền tảng phong kiến và quyền lực của vua quan, nên hầu hết các bản điều trần đều bị bác bỏ hoặc bỏ quên.<br>
        🌟 <strong>Ý nghĩa lịch sử:</strong> Tư tưởng của Nguyễn Trường Tộ thể hiện tầm nhìn vượt thời đại, góp phần thức tỉnh trí thức đương thời và đặt nền móng tư tưởng cho các phong trào canh tân về sau.</p>`,
      },
      {
        name: "Thực dân Pháp nổ súng xâm lược Đà Nẵng ",
        year: "01/09/1858",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770350237/French_ships_at_Danang_1858_m36nqq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770350319/image_1_fhxjtb.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770350265/image_4_cnc99j.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770350262/image_8_wwweur.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770350267/image_3_vmyzbm.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Ngày 01/09/1858, thực dân Pháp nổ súng tấn công Đà Nẵng, chính thức mở đầu quá trình xâm lược Việt Nam bằng con đường quân sự, đánh dấu bước ngoặt bi thảm trong lịch sử dân tộc.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Âm mưu xâm lược:</strong> Pháp lấy cớ bảo vệ giáo sĩ và quyền lợi thương mại để can thiệp vũ lực, thực chất nhằm biến Việt Nam thành thuộc địa phục vụ cho chủ nghĩa thực dân.<br>
        🛡️ <strong>Kháng cự ban đầu:</strong> Quân dân Đà Nẵng chiến đấu bền bỉ, áp dụng chiến thuật vườn không nhà trống, khiến quân Pháp rơi vào thế bị động và sa lầy trong nhiều tháng.<br>
        ⚠️ <strong>Hạn chế của triều đình:</strong> Triều Nguyễn thiếu vũ khí hiện đại, đường lối phòng thủ bị động, không có chiến lược lâu dài và thống nhất trên phạm vi cả nước.<br>
        🌟 <strong>Ý nghĩa lịch sử:</strong> Cuộc tấn công này mở đầu cho gần một thế kỷ Việt Nam phải đấu tranh gian khổ chống ách thống trị của thực dân Pháp.</p>`,
      },
    ],
  },

  phapdoho: {
    title: "Thời Kỳ Pháp Đô Hộ (1858 – 1945)",
    img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770350546/images_vrat7k.jpg",
    desc: "Từ năm 1884 đến 1945, Việt Nam hoàn toàn trở thành thuộc địa của thực dân Pháp, chịu sự thống trị toàn diện về chính trị, kinh tế, văn hóa và xã hội trong hơn 60 năm.",
    figures: [
      {
        name: "Hàm Nghi",
        per: "Thời Kỳ Pháp Thuộc 1884 - 1945",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770351480/download_jrc1uz.jpg",
        bio: "Ban Chiếu Cần Vương, kêu gọi nhân dân chống Pháp",
      },
      {
        name: "Nguyễn Tri Phương",
        per: "Pháp Đánh Chiếm Nam Kỳ 1859-1862",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770346285/download_b8bl2u.jpg",
        bio: "Nguyễn Tri Phương là đại thần, danh tướng triều Nguyễn, trực tiếp chỉ huy quân dân chống Pháp tại Gia Định khi Pháp mở rộng xâm lược Nam Kỳ. Ông tổ chức xây dựng phòng tuyến, đồn lũy và kiên quyết chống trả dù vũ khí lạc hậu. Trước ưu thế vượt trội của quân Pháp, lực lượng triều đình dần thất bại nhưng tinh thần chiến đấu của Nguyễn Tri Phương thể hiện rõ lòng trung quân ái quốc và quyết tâm bảo vệ chủ quyền đất nước trong giai đoạn đầu Pháp xâm lược",
      },
      {
        name: "Phan Đình Bình",
        per: "Hiệp ước patenotre Năm 1884",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770351446/b6b2acb5-7d2e-4d11-8210-f802461fe280.png",
        bio: "Phan Đình Bình là đại thần triều Nguyễn có liên quan trực tiếp đến việc ký Hiệp ước Patennotre với Pháp. Hiệp ước này đánh dấu việc triều đình Huế chính thức thừa nhận sự bảo hộ của Pháp trên toàn lãnh thổ Việt Nam. Sự kiện này khiến Việt Nam mất hoàn toàn chủ quyền quốc gia, nhà Nguyễn chỉ còn tồn tại trên danh nghĩa. Dù không phải người chủ trương bán nước, vai trò của ông phản ánh sự bất lực và suy yếu nghiêm trọng của triều đình trước sức ép của thực dân Pháp",
      },
      {
        name: "Tôn Thất Thuyết",
        per: "Phong trào Cần Vương Năm 1885",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770351067/33c1d514-2b6a-485b-b588-aa9ffa4c1d1f.png",
        bio: "Tôn Thất Thuyết là đại thần chủ chiến trong triều Nguyễn, người phất cờ kháng Pháp nhân danh vua Hàm Nghi. Sau khi đưa vua rời kinh thành Huế, ông ban Chiếu Cần Vương, kêu gọi toàn dân đứng lên giúp vua đánh giặc. Phong trào lan rộng khắp cả nước, quy tụ nhiều sĩ phu, văn thân và nông dân tham gia. Dù thất bại do thiếu tổ chức và vũ khí, phong trào Cần Vương đã thể hiện tinh thần yêu nước mạnh mẽ của dân tộc trong buổi đầu mất nước",
      },
      {
        name: "Phan Bội Châu",
        per: "Đông Dương Liên Bang 1887 và Phong trào Đông Du (Phan Bội Châu) 1905 – 1909",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770350946/download_qp5lqm.jpg",
        bio: "Sự ra đời của Liên bang Đông Dương đã thúc đẩy các phong trào yêu nước phát triển mạnh hơn. Phan Bội Châu là nhà cách mạng tiêu biểu trong bối cảnh này. Ông nhận thức rõ bản chất áp bức của chế độ thuộc địa và tìm con đường cứu nước mới thông qua các hoạt động cách mạng ở trong và ngoài nước. Các hoạt động của ông góp phần duy trì tinh thần đấu tranh dân tộc trong thời kì Pháp đô hộ sâu sắc",
      },
      {
        name: "Nguyễn Ái Quốc",
        per: "Phong trào Xô Viết Nghệ Tĩnh 1900-1931",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770350844/download_gg5yca.jpg",
        bio: "Nguyễn Ái Quốc là người truyền bá chủ nghĩa Mác Lênin vào Việt Nam, đặt nền tảng tư tưởng cho phong trào cách mạng công nhân và nông dân. Dưới ảnh hưởng của tư tưởng cách mạng vô sản, phong trào Xô Viết Nghệ Tĩnh bùng nổ mạnh mẽ, lần đầu tiên hình thành chính quyền cách mạng của công nông ở một số địa phương. Phong trào tuy bị đàn áp nhưng chứng minh khả năng lãnh đạo của giai cấp công nhân và vai trò tiên phong của Đảng",
      },
      {
        name: "Hồ Chí Minh",
        per: "Cách mạng tháng 8 thành công chấm dứt thời kỳ Pháp thuộc Tháng 8 năm 1945 và Tuyên ngôn Độc lập – Nước Việt Nam Dân chủ Cộng hòa 2/9/1945",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770350780/download_jxudru.jpg",
        bio: "Hồ Chí Minh là lãnh tụ tối cao của cách mạng Việt Nam, người trực tiếp lãnh đạo toàn dân đứng lên giành chính quyền trong Cách mạng Tháng Tám. Ông đã vận dụng linh hoạt thời cơ lịch sử khi phát xít Nhật đầu hàng, phát động tổng khởi nghĩa trên toàn quốc. Thắng lợi của cách mạng đã chấm dứt hơn 80 năm đô hộ của thực dân Pháp và chế độ phong kiến, mở ra kỷ nguyên độc lập dân tộc",
      },
      {
        name: "Phan Châu Trinh",
        per: "Phong trào Duy Tân (Phan Châu Trinh) 1906 – 1908",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770431603/ec589b21-a53f-4b10-b469-b26a41963e14.png",
        bio: "Phan Châu Trinh (1872–1926) là nhà yêu nước, nhà tư tưởng lớn đầu thế kỷ XX, chủ trương cứu nước bằng con đường cải cách. Ông đề cao khai dân trí, chấn dân khí, hậu dân sinh; phản đối bạo động, hướng tới xây dựng xã hội tiến bộ và dân chủ.",
      },
    ],
    events: [
      {
        name: "Pháp Đánh Chiếm Nam Kỳ",
        year: "1859 - 1862",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770351933/image_3_adxan4.gif",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770351933/image_1_c3r8nq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770351932/image_5_xtum8h.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770351932/image_6_thhxie.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770351932/image_2_fwum8i.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770351932/image_4_klcp77.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Trong giai đoạn 1859 – 1862, thực dân Pháp từng bước đánh chiếm Nam Kỳ, biến khu vực này thành thuộc địa đầu tiên tại Việt Nam.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Diễn biến:</strong> Pháp tấn công Gia Định, sau đó mở rộng đánh chiếm các tỉnh miền Đông Nam Kỳ, tận dụng ưu thế về vũ khí và tàu chiến.<br>
        📜 <strong>Hiệp ước bất bình đẳng:</strong> Triều đình Huế buộc phải ký các hiệp ước nhượng đất, mở cửa buôn bán và trao nhiều đặc quyền cho Pháp.<br>
        🔥 <strong>Kháng chiến:</strong> Nhân dân Nam Kỳ liên tục nổi dậy chống Pháp bằng nhiều hình thức, tiêu biểu là các cuộc khởi nghĩa của Trương Định, Nguyễn Trung Trực.<br>
        🌟 <strong>Ý nghĩa:</strong> Nam Kỳ trở thành bàn đạp quan trọng để Pháp mở rộng xâm lược toàn bộ Việt Nam.</p>`,
      },
      {
        name: "Hiệp ước Nhâm Tuất – mất 3 tỉnh Nam Kỳ",
        year: "1862",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770430751/616d331c-f322-47b9-aa1a-9fe5a1b41730.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770430754/b502018d-cc14-4ad3-8a6d-49b2faa5c995.png",
        ],
        content: `<p>Hiệp ước Nhâm Tuất (1862) buộc triều đình nhà Nguyễn nhượng cho thực dân Pháp ba tỉnh miền Đông Nam Kỳ.</p>`,
      },
      {
        name: "Hiệp ước patenotre",
        year: "1884",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770352259/download_u69grr.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770352277/image_7_imt5zr.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770352517/b7df11c5-c4de-4e1d-997b-e4f245cf54eb.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770352276/image_10_sacnjx.gif",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770352281/image_9_qg3sfk.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Hiệp ước Patenôtre năm 1884 đánh dấu việc Việt Nam chính thức mất hoàn toàn chủ quyền quốc gia vào tay thực dân Pháp.<br>
        <strong>* Chi tiết:</strong><br>
        📜 <strong>Nội dung:</strong> Triều đình Huế bị tước quyền đối ngoại, quân sự và phải chấp nhận sự bảo hộ toàn diện của Pháp.<br>
        🏛️ <strong>Hệ quả:</strong> Đất nước bị chia thành Bắc Kỳ, Trung Kỳ, Nam Kỳ với ba chế độ cai trị khác nhau, làm suy yếu sự thống nhất dân tộc.<br>
        ⚠️ <strong>Phản ứng xã hội:</strong> Nhân dân vô cùng phẫn uất, phong trào chống Pháp lan rộng khắp cả nước.<br>
        🌟 <strong>Ý nghĩa:</strong> Hiệp ước này đánh dấu sự sụp đổ hoàn toàn của nhà nước phong kiến độc lập.</p>`,
      },
      {
        name: "Phong trào Cần Vương",
        year: "1885 - 1896",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770352794/phong-trao-can-vuong_spu0gp.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770352814/image_9_npake2.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770352815/image_8_uahp1g.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770352818/image_1_twsa2c.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770352821/image_7_ostdus.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770352817/image_2_t7hvnu.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770352969/image_1_wkxigb.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Phong trào Cần Vương bùng nổ từ năm 1885 nhằm kêu gọi toàn dân đứng lên phò vua Hàm Nghi, chống lại ách xâm lược của thực dân Pháp.<br>
        <strong>* Chi tiết:</strong><br>
        🔥 <strong>Lực lượng:</strong> Phong trào quy tụ đông đảo văn thân, sĩ phu và nông dân yêu nước trên khắp cả nước.<br>
        ⚔️ <strong>Hình thức:</strong> Các cuộc khởi nghĩa vũ trang nổ ra mạnh mẽ, đặc biệt ở Trung Kỳ và Bắc Kỳ.<br>
        ⚠️ <strong>Nguyên nhân thất bại:</strong> Phong trào thiếu sự chỉ đạo thống nhất, vũ khí thô sơ, không đáp ứng được chiến tranh hiện đại.<br>
        🌟 <strong>Ý nghĩa:</strong> Dù thất bại, phong trào thể hiện tinh thần yêu nước bất khuất của dân tộc Việt Nam.</p>`,
      },
      {
        name: "Đông Dương Liên Bang",
        year: "1887",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770355703/image_4_pds3q2.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770355705/image_2_myzsf0.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770355780/image_2_xhba6d.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770355703/image_5_tddytc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770355702/image_5_tbyekl.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770355693/images_fmkltl.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1887, thực dân Pháp thành lập Liên bang Đông Dương nhằm tăng cường bộ máy cai trị và khai thác thuộc địa một cách có hệ thống.<br>
        <strong>* Chi tiết:</strong><br>
        🏛️ <strong>Thành phần:</strong> Liên bang Đông Dương bao gồm Việt Nam, Lào và Campuchia dưới quyền cai trị chung của Pháp.<br>
        💰 <strong>Mục tiêu:</strong> Pháp tập trung quyền lực chính trị và khai thác tối đa nguồn tài nguyên, nhân lực phục vụ chính quốc.<br>
        ⚠️ <strong>Tác động:</strong> Nhân dân Đông Dương chịu sự áp bức, bóc lột ngày càng nặng nề cả về kinh tế lẫn xã hội.<br>
        🌟 <strong>Ý nghĩa:</strong> Sự kiện này củng cố vững chắc nền thống trị của chủ nghĩa thực dân tại khu vực.</p>`,
      },
      {
        name: "Nguyễn Ái Quốc (Hồ Chí Minh) ra đời",
        year: "1890",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770431055/957a2029-6349-4f32-a5e2-97b02a0fa028.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770431058/5cdbd0c1-4e3a-4ad7-b416-32221728d1c9.png",
        ],
        content: `<p>Nguyễn Ái Quốc (Hồ Chí Minh) ra đời năm 1890, là lãnh tụ vĩ đại của cách mạng Việt Nam và anh hùng giải phóng dân tộc.</p>`,
      },
      {
        name: "Phong trào Đông Du (Phan Bội Châu)",
        year: "1905 – 1909",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770431236/dbe2ea2e-9058-4b8a-8e8f-31af354fd559.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770431298/Tintuc_cgs_vn_20136715h27m24s_c4i4fd.jpg",
        ],
        content: `<p>Phong trào Đông Du (1905–1909) do Phan Bội Châu khởi xướng, đưa thanh niên Việt Nam sang Nhật Bản học tập nhằm tìm con đường cứu nước.</p>`,
      },

      {
        name: "Phong trào Duy Tân (Phan Châu Trinh)",
        year: "1906 – 1908",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770431566/59617c4d-7939-4bcc-84e6-47ce2026d301.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770431537/download_eeeoyc.jpg",
        ],
        content: `<p>Phong trào Duy Tân đầu thế kỷ XX do Phan Châu Trinh khởi xướng, chủ trương canh tân đất nước bằng con đường cải cách hòa bình.</p>`,
      },
      {
        name: "Đông Kinh Nghĩa Thục",
        year: "1907",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770431969/3_msts6g.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770431973/7345af65-1277-411b-8b73-fa6c73e33823.png",
        ],
        content: `<p>Đông Kinh Nghĩa Thục (1907) là phong trào giáo dục và cải cách văn hóa ở Bắc Kỳ, do các sĩ phu yêu nước khởi xướng.</p>`,
      },
      {
        name: "Thành lập Đảng Cộng sản Việt Nam",
        year: "3/2/1930",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770432148/1_uz9mi1.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770432150/download_ra0kjd.jpg",
        ],
        content: `<p>Thành lập Đảng Cộng sản Việt Nam (3/2/1930) là bước ngoặt vĩ đại của cách mạng Việt Nam, chấm dứt khủng hoảng về đường lối cứu nước.</p>`,
      },
      {
        name: "Phong trào Xô Viết Nghệ Tĩnh",
        year: "1930 - 1931",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356125/image_4_cktfey.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356124/image_5_xjnipe.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356126/image_1_ugn24b.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356124/image_8_u8wmuk.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356127/image_6_ajtzwc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356124/image_10_jjjnl4.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356125/image_1_a1w4ud.webp",
          // "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356124/image_4_s7atz8.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Phong trào Xô Viết Nghệ Tĩnh (1930–1931) là đỉnh cao đấu tranh cách mạng của công nhân và nông dân Việt Nam trong thời kỳ trước Cách mạng Tháng Tám.<br>
        <strong>* Chi tiết:</strong><br>
        🔥 <strong>Lãnh đạo:</strong> Phong trào do Đảng Cộng sản Đông Dương trực tiếp lãnh đạo và tổ chức.<br>
        🏛️ <strong>Chính quyền:</strong> Ở nhiều địa phương, nhân dân đã lập được chính quyền cách mạng, thực hiện nhiều chính sách tiến bộ.<br>
        ⚠️ <strong>Đàn áp:</strong> Thực dân Pháp dùng bạo lực khốc liệt để đàn áp phong trào, gây nhiều tổn thất nặng nề.<br>
        🌟 <strong>Ý nghĩa:</strong> Khẳng định vai trò lãnh đạo của Đảng và sức mạnh to lớn của quần chúng nhân dân.</p>`,
      },
      {
        name: "Thành lập Việt Minh",
        year: "1941",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770432290/37_20240518154816_mvuaxa.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770432298/Ho_Chi_Minh__third_from_left_standing__and_the_OSS_in_1945_alrh24.jpg",
        ],
        content: `<p>Mặt trận Việt Nam Độc lập Đồng minh (Việt Minh) được thành lập năm 1941, nhằm đoàn kết toàn dân trong cuộc đấu tranh giành độc lập dân tộc.</p>`,
      },

      {
        name: "Cách mạng tháng 8 thành công chấm dứt thời kỳ Pháp thuộc",
        year: "08/1945",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356430/image_2_mzarcj.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356431/image_1_m7idkv.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356431/image_2_tbsfn1.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356430/image_3_wjpk0n.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356429/image_8_lkmoks.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356429/image_5_pfnu9z.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356430/image_6_nysvpr.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Tháng 8 năm 1945, Cách mạng Tháng Tám thành công, nhân dân Việt Nam giành chính quyền trên phạm vi cả nước.<br>
        <strong>* Chi tiết:</strong><br>
        🔥 <strong>Thời cơ:</strong> Nhật Bản đầu hàng Đồng minh, chính quyền tay sai sụp đổ hoàn toàn.<br>
        🏛️ <strong>Kết quả:</strong> Chính quyền về tay nhân dân, Nhà nước Việt Nam Dân chủ Cộng hòa ra đời.<br>
        🌟 <strong>Ý nghĩa:</strong> Mở ra kỷ nguyên mới – kỷ nguyên độc lập dân tộc và tự do cho nhân dân Việt Nam.</p>`,
      },
      {
        name: "Tuyên ngôn Độc lập – Nước Việt Nam Dân chủ Cộng hòa",
        year: "2/9/1945",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770432532/Image_ngx4ew.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770432533/download_kj6tys.jpg",
        ],
        content: `<p>Tuyên ngôn Độc lập (2/9/1945) khai sinh nước Việt Nam Dân chủ Cộng hòa, khẳng định quyền độc lập, tự do của dân tộc Việt Nam.</p>`,
      },
    ],
  },

  khangchienchongphap: {
    title: "Kháng Chiến Chống Pháp (1945 – 1954)",
    img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356725/download_ocejdz.jpg",
    desc: "Kháng chiến chống Pháp (1945–1954) là cuộc chiến tranh giải phóng dân tộc lâu dài, gian khổ nhằm bảo vệ nền độc lập vừa giành được.",
    figures: [
      {
        name: "Hồ Chí Minh",
        per: "Quan hệ giữa Việt Minh và Mỹ trong Thế chiến thứ hai 1945",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770350780/download_jxudru.jpg",
        bio: "Trong giai đoạn cuối Thế chiến thứ hai, Hồ Chí Minh và Việt Minh đã thiết lập quan hệ hợp tác với lực lượng Mỹ nhằm chống phát xít Nhật. Mỹ cung cấp một số hỗ trợ về huấn luyện và tình báo. Quan hệ này cho thấy Việt Minh là lực lượng yêu nước chính nghĩa, đồng thời phản ánh nỗ lực của Hồ Chí Minh trong việc tranh thủ sự ủng hộ quốc tế cho nền độc lập của Việt Nam",
      },
      {
        name: "Võ Nguyên Giáp",
        per: "Chiến dịch Việt Bắc Thu-Đông Tháng 10 đến tháng 12 năm 1947, Chiến dịch biên giới Thu-Đông Tháng 9 đến tháng 10 năm 1950, Chiến dịch Tây Bắc Tháng 10 đến tháng 12 năm 1952 và Chiến dịch Điện Biên Phủ 13-3 – 7-5-1954",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356989/download_gbsxhq.jpg",
        bio: "Võ Nguyên Giáp là Tổng chỉ huy Quân đội Nhân dân Việt Nam, trực tiếp chỉ đạo chiến dịch Việt Bắc. Ông tổ chức thế trận chiến tranh nhân dân, đánh bại âm mưu tiêu diệt cơ quan đầu não kháng chiến của Pháp. Chiến thắng Việt Bắc đã làm phá sản chiến lược đánh nhanh thắng nhanh của thực dân Pháp. Chiến dịch Biên giới do Võ Nguyên Giáp chỉ huy đã mở thông đường liên lạc quốc tế với các nước xã hội chủ nghĩa, đặc biệt là Trung Quốc. Chiến thắng này đánh dấu bước trưởng thành vượt bậc của quân đội ta, chuyển cuộc kháng chiến từ phòng ngự sang phản công. Cùng với chiến dịch Tây Bắc nhằm giải phóng vùng rộng lớn, phá thế chiếm đóng của Pháp và chuẩn bị cho trận quyết chiến chiến lược sau này. Thành công của chiến dịch làm suy yếu hệ thống phòng thủ của Pháp và tạo điều kiện thuận lợi cho chiến dịch Điện Biên Phủ. Võ Nguyên Giáp còn là người trực tiếp chỉ huy chiến dịch Điện Biên Phủ, đưa ra quyết định lịch sử chuyển từ đánh nhanh thắng nhanh sang đánh chắc tiến chắc. Chiến thắng Điện Biên Phủ đã kết thúc thắng lợi cuộc kháng chiến chống Pháp, buộc Pháp phải ký Hiệp định Genève, công nhận độc lập, chủ quyền của Việt Nam.",
      },
    ],
    events: [
      {
        name: "Toàn quốc kháng chiến",
        year: "19/12/1946",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770430238/fd3fa412-dfc4-46f8-94b6-24ecb9124248.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770430259/ff7c553f-3642-41cb-af24-b046ac56f066.png",
        ],
        content: `<p>Toàn quốc kháng chiến (12/1946) đánh dấu quyết tâm sắt đá của dân tộc Việt Nam đứng lên bảo vệ độc lập, chủ quyền trước thực dân Pháp.</p>`,
      },
      {
        name: "Quan hệ giữa Việt Minh và Mỹ trong Thế chiến thứ hai",
        year: "1945",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770357563/images_xuinkq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770357441/image_2_gredgh.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770357438/image_4_wuggka.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770357438/image_9_nsanmu.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770357415/image_8_atartn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770357379/image_10_qtoc42.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770357436/image_7_q9wasr.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770357437/image_9_iktfmp.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1945, Việt Minh có sự hợp tác ngắn hạn với Mỹ trong bối cảnh Chiến tranh thế giới thứ hai.<br>
        <strong>* Chi tiết:</strong><br>
        🤝 <strong>Hình thức:</strong> Mỹ hỗ trợ huấn luyện quân sự, cung cấp một số trang thiết bị cho lực lượng Việt Minh.<br>
        🎯 <strong>Mục tiêu:</strong> Hai bên cùng hướng tới mục tiêu chung là chống phát xít Nhật.<br>
        ⚠️ <strong>Giới hạn:</strong> Sự hợp tác mang tính chiến thuật, không kéo dài lâu dài.<br>
        🌟 <strong>Ý nghĩa:</strong> Đánh dấu bước đầu Việt Nam tiếp xúc với các lực lượng quốc tế.</p>`,
      },
      {
        name: "Chiến dịch Việt Bắc Thu - Đông",
        year: "10/1947 - 12/1947",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358093/download_choebs.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358115/image_10_i25jbk.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358124/image_1_wbim1p.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358118/image_5_qonuda.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358117/image_4_s2fmgw.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358133/image_9_jwkujg.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358117/image_8_cjd3y4.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Chiến dịch Việt Bắc Thu – Đông 1947 là thắng lợi quân sự lớn đầu tiên của quân và dân ta trong kháng chiến chống Pháp.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Âm mưu Pháp:</strong> Pháp mở cuộc tấn công quy mô lớn nhằm tiêu diệt cơ quan đầu não kháng chiến.<br>
        🛡️ <strong>Chiến thuật ta:</strong> Ta chủ động phòng ngự, kết hợp phản công linh hoạt, tiêu hao sinh lực địch.<br>
        🌟 <strong>Ý nghĩa:</strong> Giữ vững căn cứ địa Việt Bắc, bảo vệ Trung ương Đảng và Chính phủ.</p>`,
      },
      {
        name: "Chiến dịch biên giới Thu-Đông",
        year: "09/1950 - 10/1950",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358554/image_6_ztrsam.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358505/download_vnbgb7.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358542/image_9_orrmcc.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358554/image_5_lr7mgk.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358555/image_2_txfusm.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358554/image_3_jwkxim.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358554/image_7_xxkq5c.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358554/image_7_rwhk4m.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358555/image_1_cs3ewa.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Chiến dịch Biên giới Thu – Đông 1950 là bước ngoặt quan trọng, đưa cuộc kháng chiến sang thế chủ động.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Mục tiêu:</strong> Phá thế bao vây của địch, khai thông biên giới với Trung Quốc và các nước xã hội chủ nghĩa.<br>
        🏛️ <strong>Kết quả:</strong> Ta tiêu diệt nhiều cứ điểm quan trọng, mở rộng vùng giải phóng.<br>
        🌟 <strong>Ý nghĩa:</strong> Nâng cao vị thế và sức mạnh quân sự của ta.</p>`,
      },
      {
        name: "Chiến dịch Tây Bắc",
        year: "10/1952 - 12/1952",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358978/e8b48a2e-4e66-4e4f-ab6e-fd9f3b8c15dd.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358998/image_9_ecf7gh.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359001/image_2_ucocvt.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358998/image_7_qoawf9.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359000/image_5_jrlese.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359001/image_3_stbeyb.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359004/image_1_fgrmks.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358996/image_10_ke466t.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770358997/image_8_w67itw.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Chiến dịch Tây Bắc năm 1952 góp phần mở rộng căn cứ địa và làm suy yếu thế phòng ngự của quân Pháp.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Chiến lược:</strong> Ta chủ động tiến công vào vùng rừng núi, tiêu diệt sinh lực địch.<br>
        🏔️ <strong>Địa hình:</strong> Điều kiện chiến đấu vô cùng gian khổ, địa hình hiểm trở.<br>
        🌟 <strong>Ý nghĩa:</strong> Tạo tiền đề quan trọng cho chiến dịch quyết định sau này.</p>`,
      },
      {
        name: "Chiến dịch Điện Biên Phủ",
        year: "13/03/1954 – 07/05/1954",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359491/83eea29a-8822-4d19-997b-e733b3c83cfe.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359374/image_1_wlgdma.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359375/image_4_afivfo.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359369/image_6_u0zh22.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359372/image_5_fr2vjd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359368/image_9_ovse5g.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359367/image_8_q7f4qo.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359367/image_10_mvekxn.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Chiến dịch Điện Biên Phủ (13/3 – 7/5/1954) là trận quyết chiến chiến lược, kết thúc thắng lợi cuộc kháng chiến chống Pháp.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Tập đoàn cứ điểm:</strong> Điện Biên Phủ là pháo đài mạnh nhất của Pháp tại Đông Dương.<br>
        🔥 <strong>Chiến thuật:</strong> Quân ta áp dụng phương châm đánh chắc, tiến chắc, từng bước tiêu diệt địch.<br>
        🌟 <strong>Ý nghĩa lịch sử:</strong> Buộc Pháp ký Hiệp định Genève, chấm dứt chiến tranh xâm lược Việt Nam.</p>`,
      },
      {
        name: "Hiệp định Giơ-ne-vơ",
        year: "1954",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770430396/ea909b74-e9f3-4c8e-9b2a-a2a7920bd656.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770430399/7931dc04-8ed3-4dd1-920a-bcbf23de7b2b.png",
        ],
        content: `<p>Hiệp định Giơ-ne-vơ (1954) chấm dứt chiến tranh ở Đông Dương, công nhận các quyền dân tộc cơ bản của Việt Nam.</p>`,
      },
    ],
  },

  khangchienchongmy: {
    title: "Kháng Chiến Chống Mỹ (1954 – 1975)",
    img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359812/download_lqrvt9.jpg",
    desc: "Kháng chiến chống Mỹ (1954–1975) là cuộc đấu tranh giải phóng dân tộc lâu dài, ác liệt và có quy mô lớn nhất trong lịch sử hiện đại Việt Nam, nhằm giải phóng miền Nam, thống nhất đất nước và bảo vệ nền độc lập dân tộc.",
    figures: [
      {
        name: "Nguyễn Chí Thanh",
        per: "Chiến dịch Bình Giã Từ 2-12-1964 đến 3-1-1965",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770360256/download_xpmimk.jpg",
        bio: "Nguyễn Chí Thanh là Ủy viên Bộ Chính trị, người trực tiếp chỉ đạo chiến trường miền Nam. Chiến thắng Ấp Bắc chứng minh quân giải phóng có thể đánh bại chiến thuật trực thăng vận và thiết xa vận của Mỹ, tạo niềm tin lớn cho phong trào đấu tranh vũ trang. Cùng với Chiến dịch Bình Giã đánh dấu bước chuyển từ chiến tranh du kích sang đánh lớn, tiêu diệt đơn vị chủ lực của quân đội Sài Gòn. Đây là thắng lợi quan trọng, làm phá sản chiến lược chiến tranh đặc biệt của Mỹ.",
      },
      {
        name: "Nguyễn Văn Linh",
        per: "Chiến thắng Ấp Bắc Năm 1963",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770360243/Nguy%E1%BB%85n_V%C4%83n_Linh_x1ffgm.jpg",
        bio: "Nguyễn Văn Linh là một trong những cán bộ lãnh đạo tiêu biểu của cách mạng miền Nam trong những năm đầu kháng chiến chống Mỹ. Trong giai đoạn diễn ra Chiến thắng Ấp Bắc (1963), ông giữ vai trò quan trọng trong việc chỉ đạo chiến lược, động viên lực lượng vũ trang và nhân dân miền Nam đẩy mạnh đấu tranh vũ trang chống chiến lược “Chiến tranh đặc biệt” của Mỹ. Dù không trực tiếp chỉ huy trận đánh, Nguyễn Văn Linh là biểu tượng cho vai trò lãnh đạo chính trị, góp phần tạo điều kiện để quân giải phóng giành thắng lợi vang dội tại Ấp Bắc",
      },
      {
        name: "Văn Tiến Dũng",
        per: "Đánh bại cuộc hành quân Junction City Từ 22-2 đến 15-5-1967 và Các chiến dịch tiêu biểu năm 1975 Năm 1975",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770360212/z33757390933187f585b3ececc8fddf39286cdeb40a2d1-16511500231531947893409-crop-16511500611091131562562_nctogu.webp",
        bio: "Văn Tiến Dũng là Đại tướng, trực tiếp chỉ đạo các lực lượng đánh bại cuộc hành quân lớn nhất của Mỹ ở miền Nam. Chiến thắng này làm suy yếu nghiêm trọng lực lượng Mỹ, chứng minh chiến tranh nhân dân có thể đánh bại chiến tranh hiện đại. Ngoài ra, Văn Tiến Dũng còn là Tổng chỉ huy Chiến dịch Hồ Chí Minh. Ông trực tiếp chỉ đạo ba chiến dịch lớn là Tây Nguyên, Huế – Đà Nẵng và Hồ Chí Minh, kết thúc thắng lợi cuộc kháng chiến chống Mỹ.",
      },
      {
        name: "Võ Nguyên Giáp",
        per: "Chiến dịch Đường 9 – Khe Sanh & Tổng tiến công Mậu Thân Từ ngày 21-1 đến tháng 7-1968 và Chiến dịch Điện Biên Phủ trên không - Hà Nội Từ ngày 18 đến 29-12-1972",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770356989/download_gbsxhq.jpg",
        bio: "Chiến dịch Đường 9 – Khe Sanh buộc Mỹ phải phân tán lực lượng, tạo điều kiện cho cuộc Tổng tiến công và nổi dậy Tết Mậu Thân. Đây là thắng lợi chiến lược, làm lung lay ý chí xâm lược của Mỹ. Cùng với Chiến thắng Điện Biên Phủ trên không đã đánh bại cuộc tập kích chiến lược bằng B52 của Mỹ vào Hà Nội và Hải Phòng. Nó buộc Mỹ phải ký Hiệp định Paris, rút quân về nước, tạo bước ngoặt quyết định cho thắng lợi hoàn toàn năm 1975.",
      },
      {
        name: "Hồ Chí Minh",
        per: "Chiến dịch Hồ Chí Minh - Giải Phóng Miền Nam Thống Nhất Đất Nước 30-4-1975",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770350780/download_jxudru.jpg",
        bio: "Dù đã qua đời, tư tưởng và đường lối của Hồ Chí Minh là nền tảng cho thắng lợi hoàn toàn của cuộc kháng chiến, đưa đất nước bước vào kỷ nguyên thống nhấ",
      },
    ],
    events: [
      {
        name: "Phong trào Đồng Khởi",
        year: "1959 – 1960",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770429991/92249de0-0787-4339-81ba-5f062afe2d72.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770430010/a73f2343-94b7-42bc-ba4f-f626c7cc14aa.png",
        ],
        content: `<p>Phong trào Đồng Khởi (1959–1960) là bước phát triển mạnh mẽ của cách mạng miền Nam, làm tan rã nhiều bộ máy chính quyền tay sai ở nông thôn.</p>`,
      },
      {
        name: "Chiến thắng Ấp Bắc",
        year: "1963",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770360772/download_y5hm4f.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770360773/download_nkspyh.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770360796/image_10_vcwsqt.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770360796/image_6_b93lyd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770360796/image_4_ltviip.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770360796/image_7_eiarik.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Chiến thắng Ấp Bắc năm 1963 là thắng lợi quân sự lớn đầu tiên của quân giải phóng miền Nam trước quân đội Sài Gòn có cố vấn Mỹ.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Diễn biến:</strong> Quân ta đánh bại cuộc càn quét lớn của địch với lực lượng đông, vũ khí hiện đại.<br>
        🛡️ <strong>Chiến thuật:</strong> Vận dụng linh hoạt chiến tranh nhân dân, bám đất, bám dân, đánh gần, đánh hiểm.<br>
        🔥 <strong>Kết quả:</strong> Làm phá sản chiến thuật “trực thăng vận”, “thiết xa vận”.<br>
        🌟 <strong>Ý nghĩa:</strong> Khẳng định quân giải phóng miền Nam có thể đánh bại quân đội được Mỹ hậu thuẫn.</p>`,
      },
      {
        name: "Chiến dịch Bình Giã",
        year: "02/12/1964 - 03/01/1965",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770361167/image_2_uu9nwa.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770361086/download_t2zfbx.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770361165/image_6_hn5kti.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770361166/image_1_j8s2r3.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770361166/image_5_dxo269.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770361164/image_7_ahwrpn.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770361135/image_8_wbvq1m.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Chiến dịch Bình Giã (12/1964 – 1/1965) là chiến thắng lớn, đánh dấu bước trưởng thành vượt bậc của lực lượng vũ trang cách mạng miền Nam.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Mục tiêu:</strong> Tiêu diệt sinh lực chủ lực quân đội Sài Gòn.<br>
        🛡️ <strong>Diễn biến:</strong> Ta chủ động tiến công, tổ chức nhiều trận đánh quy mô trung đoàn.<br>
        🔥 <strong>Kết quả:</strong> Chiến lược “Chiến tranh đặc biệt” của Mỹ bị phá sản.<br>
        🌟 <strong>Ý nghĩa:</strong> Mở ra khả năng giành thắng lợi lớn hơn trên chiến trường.</p>`,
      },
      {
        name: "Đánh bại cuộc hành quân Junction City",
        year: "22/02/1967 - 15/05/1967",
        images: [
          //"https://res.cloudinary.com/duqhhplgf/image/upload/v1770362064/download_jbjzbw.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362085/image_7_vrmddp.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362086/image_9_p7sbs7.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362086/image_4_qylaul.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362085/image_3_q4zeab.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362084/image_10_dwfgle.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Cuộc hành quân Junction City (1967) là cuộc càn quét lớn nhất của quân đội Mỹ ở miền Nam Việt Nam.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Âm mưu:</strong> Tiêu diệt Trung ương Cục miền Nam.<br>
        🛡️ <strong>Đối phó:</strong> Ta phân tán lực lượng, đánh nhỏ, đánh dài ngày.<br>
        🔥 <strong>Kết quả:</strong> Mỹ thất bại, chịu tổn thất nặng nề.<br>
        🌟 <strong>Ý nghĩa:</strong> Chứng minh chiến tranh cục bộ không thể mang lại thắng lợi cho Mỹ.</p>`,
      },
      {
        name: "Chiến dịch Đường 9 – Khe Sanh & Tổng tiến công Mậu Thân",
        year: "21/01/1968 - 07/1968",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362476/image_6_gdph09.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362475/image_8_cbhxnf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362475/image_9_n5qv6u.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362477/image_10_ohtmls.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362477/image_5_ajaweg.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362481/image_1_ujrjhi.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362480/image_4_smkuwy.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362484/image_3_hmjqip.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Chiến dịch Đường 9 – Khe Sanh (1968) là cuộc đối đầu chiến lược lớn giữa ta và Mỹ.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Mục tiêu Mỹ:</strong> Cắt đường chi viện chiến lược của ta.<br>
        🛡️ <strong>Chiến lược ta:</strong> Vây lấn dài ngày, kết hợp nghi binh cho Tết Mậu Thân.<br>
        🔥 <strong>Kết quả:</strong> Mỹ buộc phải rút khỏi Khe Sanh.<br>
        🌟 <strong>Ý nghĩa:</strong> Làm lung lay ý chí xâm lược của Mỹ.</p>`,
      },
      {
        name: "Chiến dịch Điện Biên Phủ trên không - Hà Nội",
        year: "18/12/1972 - 29/12/1972",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770359373/image_2_amkyni.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362937/image_5_sugin8.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362927/image_1_1_rnuffj.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362924/image_3_1_jnufzh.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362922/image_5_v3d4oq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362922/image_6_1_nrsb4n.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362921/image_7_azmk2e.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362920/image_8_fu04xt.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362915/image_10_u9zoq3.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770362920/image_7_txfg8w.png",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Chiến dịch Điện Biên Phủ trên không (12/1972) là thất bại nặng nề nhất của không quân Mỹ.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Âm mưu:</strong> Dùng B-52 buộc ta khuất phục.<br>
        🛡️ <strong>Phòng không:</strong> Quân dân miền Bắc hiệp đồng chặt chẽ.<br>
        🔥 <strong>Kết quả:</strong> Mỹ buộc phải ký Hiệp định Paris.<br>
        🌟 <strong>Ý nghĩa:</strong> Tạo điều kiện kết thúc chiến tranh.</p>`,
      },
      {
        name: "Các chiến dịch tiêu biểu năm 1975",
        year: "1975",
        images: [
          // "https://res.cloudinary.com/duqhhplgf/image/upload/v1770363542/image_4_yokkyl.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770363546/image_4_gu81sv.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770363539/image_10_grle8x.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770363545/image_1_utei13.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770363539/image_6_dmn8bd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770363479/download_lrjvsj.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770363538/image_7_jlufdl.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770363537/image_9_ys06rb.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770363544/image_2_fjrnku.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1975, ta mở ba chiến dịch lớn, kết thúc thắng lợi cuộc kháng chiến chống Mỹ.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Ba chiến dịch:</strong> Tây Nguyên – Huế Đà Nẵng – Hồ Chí Minh.<br>
        🛡️ <strong>Chiến lược:</strong> Thần tốc, táo bạo, bất ngờ.<br>
        🔥 <strong>Kết quả:</strong> Chính quyền Sài Gòn sụp đổ hoàn toàn.<br>
        🌟 <strong>Ý nghĩa:</strong> Hoàn thành giải phóng miền Nam.</p>`,
      },
      {
        name: "Chiến dịch Hồ Chí Minh - Giải Phóng Miền Nam Thống Nhất Đất Nước",
        year: "30/04/1975",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770364771/image_9_vzuyfl.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770364772/image_3_bfyliw.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770364773/image_1_bg74ks.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770364775/image_4_1_f56e5m.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770364774/image_10_1_mg7awk.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770364771/image_6_1_yxgyyb.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Ngày 30/4/1975, cuộc kháng chiến chống Mỹ cứu nước kết thúc thắng lợi hoàn toàn, miền Nam được giải phóng, đất nước Việt Nam thống nhất sau hơn 20 năm bị chia cắt.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Bối cảnh lịch sử:</strong> Sau Hiệp định Paris năm 1973, quân đội Mỹ rút khỏi Việt Nam nhưng chính quyền Sài Gòn vẫn tiếp tục chiến tranh. Lực lượng cách mạng từng bước làm chủ chiến trường.<br>
        🛡️ <strong>Diễn biến:</strong> Chiến dịch Hồ Chí Minh lịch sử được mở màn cuối tháng 4/1975, quân giải phóng tiến công thần tốc vào Sài Gòn từ nhiều hướng.<br>
        🔥 <strong>Kết quả:</strong> Trưa 30/4/1975, Dinh Độc Lập bị chiếm, chính quyền Sài Gòn sụp đổ hoàn toàn.<br>
        🌟 <strong>Ý nghĩa:</strong> Chấm dứt chiến tranh, thống nhất đất nước, mở ra kỷ nguyên độc lập, hòa bình và xây dựng Việt Nam.</p>`,
      },
    ],
  },

  modern: {
    title: "Thông nhất đất nước - Việt Nam Hiện Đại (1975 - nay)",
    img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770363790/download_e2daix.jpg",
    desc: "Ngày 30/4/1975, chiến dịch Hồ Chí Minh toàn thắng, đất nước hoàn toàn thống nhất, đổi mới và số hóa di sản.",
    figures: [
      {
        name: "Tôn Đức Thắng",
        per: "Đường lối Đổi mới toàn diện đất nước Đại hội VI 1986 và Thành lập nước Cộng hòa xã hội chủ nghĩa Việt Nam 2-7-1976",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770364307/Tonducthang_t9gbbb.jpg",
        bio: "Tôn Đức Thắng là Chủ tịch nước đầu tiên của nước Việt Nam thống nhất, đại diện cho tinh thần đoàn kết dân tộc sau chiến tranh. Tôn Đức Thắng còn là danh nhân tiêu biểu gắn liền với sự kiện thành lập nước Cộng hòa xã hội chủ nghĩa Việt Nam sau khi đất nước hoàn toàn thống nhất. Ngày 02/7/1976, Quốc hội khóa VI quyết định đổi tên nước thành CHXHCN Việt Nam và bầu ông làm Chủ tịch nước. Với uy tín lớn và quá trình hoạt động cách mạng lâu dài, Tôn Đức Thắng là biểu tượng của sự đoàn kết dân tộc và thống nhất Bắc – Nam, đánh dấu bước ngoặt quan trọng khi Việt Nam chính thức bước vào thời kỳ xây dựng đất nước trong hòa bình",
      },
      {
        name: "Phạm Văn Đồng",
        per: "Việt Nam chính thức gia nhập Liên Hợp Quốc 20-9-1977",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770364229/download_m2odrh.jpg",
        bio: "Phạm Văn Đồng là Thủ tướng Chính phủ, người góp phần mở rộng quan hệ đối ngoại, đưa Việt Nam hội nhập với cộng đồng quốc tế.",
      },
      {
        name: "Lê Duẩn",
        per: "Chiến tranh biên giới phía Bắc 17-2-1979 – 16-3-1979",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770364226/images_cuihaf.jpg",
        bio: "Lê Duẩn là nhà lãnh đạo tiêu biểu gắn liền với sự nghiệp giải phóng miền Nam, thống nhất đất nước năm 1975 và những năm đầu xây dựng Việt Nam sau chiến tranh. Ông giữ vai trò chỉ đạo chiến lược trong cuộc kháng chiến chống Mỹ, đặc biệt là đường lối đấu tranh giải phóng miền Nam bằng sức mạnh tổng hợp của toàn dân tộc. Sau khi đất nước thống nhất, Lê Duẩn tiếp tục lãnh đạo công cuộc khôi phục kinh tế, hàn gắn vết thương chiến tranh và xây dựng Nhà nước Việt Nam thống nhất, đặt nền móng cho Việt Nam bước vào thời kỳ hiện đại. Lê Duẩn còn là Tổng Bí thư, lãnh đạo đất nước trong giai đoạn bảo vệ chủ quyền lãnh thổ trước các thách thức mới.",
      },
      {
        name: "Võ Văn Kiệt",
        per: "Việt Nam gia nhập ASEAN và bình thường hóa quan hệ với Hoa Kỳ Tháng 7-1995",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770364281/download_f2vfzj.jpg",
        bio: "Võ Văn Kiệt là Thủ tướng, người thúc đẩy mạnh mẽ hội nhập khu vực và quốc tế, mở ra thời kì phát triển mới.",
      },
      {
        name: "Nguyễn Tấn Dũng",
        per: "Việt Nam gia nhập Tổ chức Thương mại Thế giới WTO 7-11-2006 chính thức 11-1-2007",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770364168/images_wtntgi.jpg",
        bio: "Nguyễn Tấn Dũng là Thủ tướng Chính phủ, lãnh đạo quá trình hội nhập kinh tế toàn cầu, mở rộng thị trường và thu hút đầu tư.",
      },
      {
        name: "Nguyễn Phú Trọng",
        per: "Ban hành Hiến pháp nước Cộng hòa xã hội chủ nghĩa Việt Nam 28-11-2013 hiệu lực 1-1-2014",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770364166/download_msoujj.jpg",
        bio: "Nguyễn Phú Trọng là Tổng Bí thư, Chủ tịch Quốc hội thời điểm ban hành Hiến pháp 2013, góp phần hoàn thiện thể chế chính trị và pháp luật của Nhà nước Việt Nam hiện đại",
      },
      {
        name: "Lãnh đạo Đổi mới",
        per: "Việt Nam Thống Nhất & Hiện Đại (1975 – 2025)",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770427204/images_c9e8vu.jpg",
        bio: "Những nhà lãnh đạo có công trong công cuộc Đổi mới đất nước từ 1986.",
      },
      {
        name: "Thế hệ trẻ",
        per: "Việt Nam Thống Nhất & Hiện Đại (1975 – 2025)",
        img: "https://res.cloudinary.com/duqhhplgf/image/upload/v1770427237/download_amtre7.jpg",
        bio: "Thế hệ trẻ Việt Nam trong kỷ nguyên số và hội nhập quốc tế.",
      },
    ],
    events: [
      {
        name: "Thành lập nước Cộng hòa xã hội chủ nghĩa Việt Nam",
        year: "02/07/1976",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365563/download_hszelk.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365598/image_5_g245ak.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365598/image_6_humsj5.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365590/image_9_dwadfd.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365597/image_9_wf98hx.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Ngày 2/7/1976, Quốc hội khóa VI quyết định thành lập nước Cộng hòa xã hội chủ nghĩa Việt Nam.<br>
        <strong>* Chi tiết:</strong><br>
        🏛️ <strong>Bối cảnh:</strong> Sau khi đất nước thống nhất về lãnh thổ, yêu cầu cấp thiết là thống nhất về mặt nhà nước và pháp lý.<br>
        📜 <strong>Quyết định:</strong> Tên nước là Cộng hòa xã hội chủ nghĩa Việt Nam, thủ đô là Hà Nội, thống nhất bộ máy chính quyền trên toàn quốc.<br>
        🌟 <strong>Ý nghĩa:</strong> Hoàn tất thống nhất quốc gia về mặt nhà nước, tạo cơ sở pháp lý cho xây dựng và bảo vệ Tổ quốc.</p>`,
      },
      {
        name: "Việt Nam chính thức gia nhập Liên Hợp Quốc ",
        year: "20/09/1977",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365948/image_2_h0lifa.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365949/image_5_qcwhwy.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365948/image_7_ulmlzl.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365858/image_9_dxfwrl.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365948/image_7_akgnqy.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365948/image_3_rdolsq.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365949/image_6_sadjlg.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365949/image_1_ny1hta.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Ngày 20/9/1977, Việt Nam chính thức trở thành thành viên của Liên Hợp Quốc.<br>
        <strong>* Chi tiết:</strong><br>
        🌍 <strong>Bối cảnh:</strong> Sau chiến tranh, Việt Nam cần phá thế bao vây, cô lập, mở rộng quan hệ đối ngoại và tranh thủ sự ủng hộ quốc tế.<br>
        🤝 <strong>Sự kiện:</strong> Việt Nam tham gia Liên Hợp Quốc với tư cách quốc gia độc lập, có chủ quyền.<br>
        🌟 <strong>Ý nghĩa:</strong> Nâng cao vị thế Việt Nam trên trường quốc tế, tạo điều kiện thuận lợi cho hợp tác và phát triển.</p>`,
      },
      {
        name: "Chiến tranh biên giới phía Bắc",
        year: "17/02/1979 – 16/03/1979",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366268/image_1_bu7hmk.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366268/image_7_xll2hb.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366268/image_1_bwyjwk.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366267/image_10_jrj6vp.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366268/image_8_tpnob4.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366269/image_3_sevcht.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Chiến tranh biên giới phía Bắc năm 1979 là cuộc chiến bảo vệ chủ quyền lãnh thổ của Việt Nam.<br>
        <strong>* Chi tiết:</strong><br>
        ⚔️ <strong>Nguyên nhân:</strong> Ngày 17/2/1979, Trung Quốc tiến hành tấn công các tỉnh biên giới phía Bắc Việt Nam.<br>
        🛡️ <strong>Diễn biến:</strong> Quân và dân Việt Nam kiên cường chống trả trong điều kiện chiến sự ác liệt, bảo vệ từng tấc đất biên cương.<br>
        🔥 <strong>Kết thúc:</strong> Cuộc chiến kết thúc ngày 16/3/1979.<br>
        🌟 <strong>Ý nghĩa:</strong> Khẳng định ý chí bảo vệ độc lập, chủ quyền và toàn vẹn lãnh thổ của dân tộc Việt Nam.</p>`,
      },
      {
        name: "Đường lối Đổi mới toàn diện đất nước Đại hội VI",
        year: "1986",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365316/download_ltqwlx.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365135/image_3_hetsia.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365130/image_5_rcizbm.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365133/image_4_l8zzaf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365127/image_6_ouqzaw.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365130/image_8_fqfoki.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365122/image_9_yhtdps.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770365124/image_7_dicift.webp",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Năm 1986, Đại hội VI của Đảng Cộng sản Việt Nam đề ra đường lối Đổi mới toàn diện, đánh dấu bước ngoặt lịch sử trong phát triển đất nước.<br>
        <strong>* Chi tiết:</strong><br>
        📉 <strong>Bối cảnh:</strong> Sau chiến tranh, nền kinh tế kế hoạch hóa tập trung bộc lộ nhiều hạn chế, lạm phát cao, đời sống nhân dân gặp khó khăn kéo dài.<br>
        📈 <strong>Nội dung Đổi mới:</strong> Chuyển sang nền kinh tế thị trường định hướng xã hội chủ nghĩa, khuyến khích sản xuất, mở cửa hội nhập, đổi mới tư duy quản lý kinh tế.<br>
        🌟 <strong>Ý nghĩa:</strong> Đưa Việt Nam thoát khỏi khủng hoảng kinh tế – xã hội, tạo nền tảng cho phát triển lâu dài và hội nhập quốc tế.</p>`,
      },
      {
        name: "Việt Nam gia nhập ASEAN và bình thường hóa quan hệ với Hoa Kỳ",
        year: "07/1995",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366562/image_1_ztziu8.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366556/image_3_1_rs0a7a.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366555/image_4_rxh3wg.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366556/image_4_qf56vv.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366554/image_6_qgu4rk.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366555/image_5_fpvxhi.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366536/image_7_1_mj3xzm.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366554/image_6_grxcuo.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770366535/image_9_zwq1ol.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Tháng 7/1995, Việt Nam gia nhập ASEAN và bình thường hóa quan hệ ngoại giao với Hoa Kỳ.<br>
        <strong>* Chi tiết:</strong><br>
        🌏 <strong>Hội nhập khu vực:</strong> Việt Nam trở thành thành viên chính thức của ASEAN, tham gia tích cực vào hợp tác khu vực Đông Nam Á.<br>
        🤝 <strong>Ngoại giao:</strong> Việc bình thường hóa quan hệ với Hoa Kỳ chấm dứt hơn 20 năm căng thẳng sau chiến tranh.<br>
        🌟 <strong>Ý nghĩa:</strong> Mở rộng quan hệ đối ngoại, tạo môi trường quốc tế thuận lợi cho phát triển kinh tế.</p>`,
      },
      {
        name: "Việt Nam gia nhập Tổ chức Thương mại Thế giới WTO",
        year: "07/11/2006, chính thức 11/01/2007",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367345/image_6_kbcenr.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367353/image_1_tgwads.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367352/image_2_nckgt8.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367352/image_3_yt36da.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367346/image_8_ogchoi.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367345/image_6_hndeaq.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367344/image_10_kidrgu.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367345/image_7_hhmdgw.webp",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367345/image_4_xnrr77.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367352/image_2_nj5i7x.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Việt Nam gia nhập Tổ chức Thương mại Thế giới (WTO) vào năm 2006–2007.<br>
        <strong>* Chi tiết:</strong><br>
        📦 <strong>Bối cảnh:</strong> Sau 20 năm Đổi mới, nền kinh tế Việt Nam phát triển mạnh, đáp ứng các tiêu chí hội nhập toàn cầu.<br>
        🌐 <strong>Tác động:</strong> Mở rộng thị trường xuất khẩu, thu hút đầu tư nước ngoài, nâng cao năng lực cạnh tranh.<br>
        🌟 <strong>Ý nghĩa:</strong> Đánh dấu bước hội nhập kinh tế quốc tế sâu rộng của Việt Nam.</p>`,
      },
      {
        name: "Kỷ niệm 1000 năm Thăng Long – Hà Nội",
        year: "2010",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770428725/14c98872-d067-4a74-afec-c15c31dcfaa5.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770428732/71db98f8-6650-46d6-b29b-9ee4bfe1de55.png",
        ],
        content: `<p>Kỷ niệm 1000 năm Thăng Long – Hà Nội (2010) là sự kiện văn hóa – lịch sử trọng đại, khẳng định bề dày truyền thống nghìn năm văn hiến của dân tộc.</p>`,
      },
      {
        name: "Ban hành Hiến pháp nước Cộng hòa xã hội chủ nghĩa Việt Nam",
        year: "28/11/2013, có hiệu lực 01/01/2014",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367631/image_10_rsz6rg.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367647/image_2_srudbd.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367645/image_3_jkucd6.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367632/image_9_i2jqbk.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367643/image_8_hq65rf.jpg",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770367631/image_1_j4qjrq.jpg",
        ],
        content: `<p><strong>* Tóm tắt:</strong><br>
        Hiến pháp năm 2013 là bản Hiến pháp của thời kỳ phát triển và hội nhập.<br>
        <strong>* Chi tiết:</strong><br>
        📜 <strong>Nội dung:</strong> Khẳng định quyền con người, quyền công dân, vai trò Nhà nước pháp quyền xã hội chủ nghĩa.<br>
        🏛️ <strong>Hiệu lực:</strong> Thông qua ngày 28/11/2013, có hiệu lực từ 1/1/2014.<br>
        🌟 <strong>Ý nghĩa:</strong> Tạo nền tảng pháp lý vững chắc cho phát triển bền vững đất nước trong thời kỳ mới.</p>`,
      },
      {
        name: "Tổ chức thành công APEC tại Đà Nẵng",
        year: "2017",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770427772/12e48174-71e2-4282-ad0d-09f26c424545.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770427786/fb5f0f63-7505-4c04-b0b6-70166db346ec.png",
        ],
        content: `<p>APEC 2017 tại Đà Nẵng là dấu mốc quan trọng, khẳng định vai trò và uy tín quốc tế ngày càng cao của Việt Nam trong khu vực châu Á – Thái Bình Dương.</p>`,
      },
      {
        name: "Ủy viên HĐBA LHQ (không thường trực)",
        year: "2020 – 2021",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770427973/9acd1d99-58bb-4bab-be6c-cc63ce3da166.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770427975/9478bd71-0764-4b67-b30c-a31738db5440.png",
        ],
        content: `<p>Việt Nam đảm nhiệm vai trò Ủy viên không thường trực Hội đồng Bảo an Liên Hợp Quốc nhiệm kỳ 2020–2021, thể hiện trách nhiệm và uy tín quốc tế ngày càng cao.</p>`,
      },
      {
        name: "Kỷ nguyên chuyển đổi số, AI, công nghiệp 4.0",
        year: "2025",
        images: [
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770428390/349ce179-e93f-4553-84cd-6d022704d224.png",
          "https://res.cloudinary.com/duqhhplgf/image/upload/v1770428275/download_b7e1bp.jpg",
        ],
        content: `<p>Việt Nam bước vào kỷ nguyên chuyển đổi số, trí tuệ nhân tạo và Cách mạng công nghiệp 4.0, mở ra động lực tăng trưởng mới cho nền kinh tế.</p>`,
      },
    ],
  },
};

// Helper functions
export const getEventById = (id) => events.find((event) => event.id === id);
export const getNewsById = (id) => news.find((article) => article.id === id);
export const getSpeakerById = (id) =>
  speakers.find((speaker) => speaker.id === id);
export const getDynastyData = (key) => dynastyData[key] || null;
