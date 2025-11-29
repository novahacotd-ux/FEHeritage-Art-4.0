// Mock data for Guides page

export const guideCategories = [
  { id: 'all', label: 'Tất cả', icon: '📚' },
  { id: 'getting-started', label: 'Bắt đầu', icon: '🚀' },
  { id: 'features', label: 'Tính năng', icon: '⚡' },
  { id: 'account', label: 'Tài khoản', icon: '👤' },
  { id: 'community', label: 'Cộng đồng', icon: '👥' },
  { id: 'troubleshooting', label: 'Khắc phục', icon: '🔧' },
]

export const guidesList = [
  {
    id: 1,
    category: 'getting-started',
    title: 'Hướng dẫn bắt đầu',
    description: 'Tìm hiểu cách sử dụng website và các tính năng cơ bản',
    icon: '🎯',
    steps: [
      'Đăng ký tài khoản mới hoặc đăng nhập',
      'Khám phá các phần khác nhau của website',
      'Tùy chỉnh hồ sơ cá nhân của bạn',
      'Tham gia cộng đồng và bắt đầu kết nối',
    ]
  },
  {
    id: 2,
    category: 'features',
    title: 'Khám phá tranh nghệ thuật',
    description: 'Cách tìm kiếm và khám phá các tác phẩm nghệ thuật',
    icon: '🖼️',
    steps: [
      'Truy cập phần "Khám phá" trên menu',
      'Sử dụng bộ lọc để tìm tranh theo chủ đề',
      'Nhấp vào tranh để xem chi tiết và thông tin',
      'Lưu tranh yêu thích vào bộ sưu tập',
    ]
  },
  {
    id: 3,
    category: 'features',
    title: 'Tạo tranh AI',
    description: 'Hướng dẫn sử dụng công nghệ AI để tạo tranh',
    icon: '🎨',
    steps: [
      'Vào mục "Tạo tranh" từ menu chính',
      'Nhập mô tả chi tiết về tranh bạn muốn tạo',
      'Chọn phong cách nghệ thuật và tùy chỉnh',
      'Nhấn "Tạo tranh" và chờ AI xử lý',
      'Tải xuống hoặc chia sẻ tác phẩm của bạn',
    ]
  },
  {
    id: 4,
    category: 'account',
    title: 'Quản lý tài khoản',
    description: 'Cập nhật thông tin và bảo mật tài khoản',
    icon: '⚙️',
    steps: [
      'Vào "Cài đặt" từ menu Acc',
      'Cập nhật thông tin cá nhân',
      'Thay đổi mật khẩu định kỳ',
      'Thiết lập xác thực hai yếu tố',
      'Quản lý quyền riêng tư',
    ]
  },
  {
    id: 5,
    category: 'community',
    title: 'Tham gia Forum',
    description: 'Cách tham gia thảo luận và đóng góp vào cộng đồng',
    icon: '💬',
    steps: [
      'Truy cập phần "Forum" từ menu',
      'Đọc quy tắc cộng đồng trước khi đăng bài',
      'Tạo bài viết mới hoặc trả lời bài viết',
      'Tương tác với các thành viên khác',
      'Báo cáo nội dung vi phạm nếu cần',
    ]
  },
  {
    id: 6,
    category: 'community',
    title: 'Đăng ký sự kiện',
    description: 'Tham gia các sự kiện văn hóa và nghệ thuật',
    icon: '🎪',
    steps: [
      'Xem danh sách sự kiện sắp diễn ra',
      'Chọn sự kiện bạn quan tâm',
      'Điền thông tin đăng ký',
      'Xác nhận và nhận vé điện tử',
      'Tham gia sự kiện đúng giờ',
    ]
  },
  {
    id: 7,
    category: 'features',
    title: 'Mua tranh và sản phẩm',
    description: 'Hướng dẫn mua tranh in và các sản phẩm nghệ thuật',
    icon: '🛒',
    steps: [
      'Truy cập "Cửa hàng" từ menu',
      'Chọn tranh hoặc sản phẩm bạn muốn mua',
      'Thêm vào giỏ hàng',
      'Điền thông tin giao hàng',
      'Thanh toán và theo dõi đơn hàng',
    ]
  },
  {
    id: 8,
    category: 'account',
    title: 'Đăng ký thành viên VIP',
    description: 'Nâng cấp tài khoản để nhận nhiều lợi ích hơn',
    icon: '⭐',
    steps: [
      'Xem các gói thành viên VIP',
      'Chọn gói phù hợp với nhu cầu',
      'Thanh toán phí thành viên',
      'Kích hoạt tài khoản VIP',
      'Trải nghiệm các tính năng độc quyền',
    ]
  },
  {
    id: 9,
    category: 'troubleshooting',
    title: 'Không thể đăng nhập',
    description: 'Giải quyết vấn đề đăng nhập tài khoản',
    icon: '🔐',
    steps: [
      'Kiểm tra lại email và mật khẩu',
      'Sử dụng chức năng "Quên mật khẩu"',
      'Kiểm tra email để đặt lại mật khẩu',
      'Xóa cache và cookies trình duyệt',
      'Liên hệ hỗ trợ nếu vẫn gặp vấn đề',
    ]
  },
  {
    id: 10,
    category: 'troubleshooting',
    title: 'Lỗi tạo tranh AI',
    description: 'Xử lý các vấn đề khi tạo tranh bằng AI',
    icon: '⚠️',
    steps: [
      'Kiểm tra kết nối internet',
      'Đảm bảo mô tả tranh rõ ràng và phù hợp',
      'Thử lại với mô tả ngắn gọn hơn',
      'Kiểm tra số lượt tạo tranh còn lại',
      'Báo lỗi cho đội ngũ hỗ trợ',
    ]
  },
  {
    id: 11,
    category: 'troubleshooting',
    title: 'Vấn đề thanh toán',
    description: 'Khắc phục lỗi trong quá trình thanh toán',
    icon: '💳',
    steps: [
      'Kiểm tra thông tin thẻ thanh toán',
      'Đảm bảo số dư tài khoản đủ',
      'Thử phương thức thanh toán khác',
      'Xóa cache trình duyệt và thử lại',
      'Liên hệ ngân hàng hoặc hỗ trợ kỹ thuật',
    ]
  },
  {
    id: 12,
    category: 'features',
    title: 'Chia sẻ tác phẩm',
    description: 'Cách chia sẻ tranh và bài viết lên mạng xã hội',
    icon: '📤',
    steps: [
      'Mở tranh hoặc bài viết bạn muốn chia sẻ',
      'Nhấn vào nút "Chia sẻ"',
      'Chọn nền tảng mạng xã hội',
      'Thêm nội dung mô tả nếu muốn',
      'Đăng và theo dõi phản hồi',
    ]
  },
]
