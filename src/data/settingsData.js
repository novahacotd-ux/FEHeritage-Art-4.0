// Mock data for Settings page

export const settingsTabs = [
  { id: 'notifications', label: 'Thông báo', icon: '🔔' },
  { id: 'appearance', label: 'Giao diện', icon: '🎨' },
  { id: 'privacy', label: 'Quyền riêng tư', icon: '🛡️' },
  { id: 'data', label: 'Dữ liệu & Bộ nhớ', icon: '💾' },
  { id: 'accessibility', label: 'Trợ năng', icon: '♿' },
  { id: 'integrations', label: 'Tích hợp', icon: '🔗' },
  { id: 'support', label: 'Hỗ trợ', icon: '❓' },
]

export const defaultFormData = {

  // Notification Settings
  emailNotifications: true,
  pushNotifications: true,
  newsUpdates: false,
  eventReminders: true,
  forumReplies: true,
  marketingEmails: false,

  // Appearance Settings
  darkMode: false,
  compactMode: false,
  autoPlayVideos: true,
  animatedEffects: true,
  fontSize: 'medium',
  theme: 'default',

  // Privacy Settings
  profileVisibility: 'public',
  showEmail: false,
  showPhone: false,
  showActivity: true,
  allowMessaging: true,

  // Language Settings
  language: 'vi',

  // Data & Storage Settings
  clearCache: false,
  clearHistory: false,
  autoDownload: true,
  offlineMode: false,

  // Accessibility Settings
  highContrast: false,
  largeButtons: false,
  screenReader: false,
  reduceMotion: false,
  keyboardNavigation: true,

  // Integration Settings
  connectFacebook: false,
  connectGoogle: false,
  connectTwitter: false,
  syncCalendar: false,
  connectZalo: false,
}

export const privacyOptions = [
  { value: 'public', label: 'Công khai' },
  { value: 'friends', label: 'Chỉ bạn bè' },
  { value: 'private', label: 'Riêng tư' },
]

export const accountSecuritySettings = [
  {
    id: 'twoFactorAuth',
    title: 'Xác thực hai yếu tố',
    description: 'Tăng cường bảo mật với xác thực 2 lớp'
  },
  {
    id: 'loginAlerts',
    title: 'Cảnh báo đăng nhập',
    description: 'Nhận thông báo khi có đăng nhập mới'
  },
]

export const notificationSettings = [
  {
    id: 'emailNotifications',
    title: 'Thông báo Email',
    description: 'Nhận thông báo qua email'
  },
  {
    id: 'pushNotifications',
    title: 'Thông báo Push',
    description: 'Nhận thông báo trên trình duyệt'
  },
  {
    id: 'newsUpdates',
    title: 'Tin tức mới',
    description: 'Nhận thông báo khi có tin tức mới'
  },
  {
    id: 'eventReminders',
    title: 'Nhắc nhở sự kiện',
    description: 'Nhận nhắc nhở về các sự kiện đã đăng ký'
  },
  {
    id: 'forumReplies',
    title: 'Phản hồi Forum',
    description: 'Thông báo khi có người trả lời bài viết của bạn'
  },
  {
    id: 'marketingEmails',
    title: 'Email tiếp thị',
    description: 'Nhận thông tin khuyến mãi và ưu đãi'
  },
]

export const appearanceSettings = [
  {
    id: 'darkMode',
    title: 'Chế độ tối',
    description: 'Sử dụng giao diện màu tối'
  },
  {
    id: 'compactMode',
    title: 'Chế độ thu gọn',
    description: 'Hiển thị nội dung dạng thu gọn'
  },
  {
    id: 'autoPlayVideos',
    title: 'Tự động phát video',
    description: 'Video tự động phát khi cuộn tới'
  },
  {
    id: 'animatedEffects',
    title: 'Hiệu ứng động',
    description: 'Bật các hiệu ứng chuyển động'
  },
]

export const privacySettings = [
  {
    id: 'showEmail',
    title: 'Hiển thị Email',
    description: 'Cho phép người khác xem email của bạn'
  },
  {
    id: 'showPhone',
    title: 'Hiển thị Số điện thoại',
    description: 'Cho phép người khác xem số điện thoại của bạn'
  },
  {
    id: 'showActivity',
    title: 'Hiển thị hoạt động',
    description: 'Người khác có thể xem hoạt động của bạn'
  },
  {
    id: 'allowMessaging',
    title: 'Cho phép nhắn tin',
    description: 'Người khác có thể gửi tin nhắn cho bạn'
  },
]

export const fontSizeOptions = [
  { value: 'small', label: 'Nhỏ' },
  { value: 'medium', label: 'Trung bình' },
  { value: 'large', label: 'Lớn' },
]

export const themeOptions = [
  { value: 'default', label: 'Mặc định' },
  { value: 'warm', label: 'Ấm áp' },
  { value: 'cool', label: 'Mát mẻ' },
  { value: 'classic', label: 'Cổ điển' },
]

export const languageOptions = [
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'ja', label: '日本語' },
]

export const dataStorageSettings = [
  {
    id: 'clearCache',
    title: 'Xóa bộ nhớ cache',
    description: 'Xóa dữ liệu tạm để tăng tốc độ tải trang',
    isAction: true,
  },
  {
    id: 'clearHistory',
    title: 'Xóa lịch sử duyệt web',
    description: 'Xóa toàn bộ lịch sử truy cập',
    isAction: true,
  },
  {
    id: 'autoDownload',
    title: 'Tự động tải xuống',
    description: 'Tự động tải tài liệu và hình ảnh',
  },
  {
    id: 'offlineMode',
    title: 'Chế độ ngoại tuyến',
    description: 'Lưu nội dung để xem khi không có mạng',
  },
]

export const accessibilitySettings = [
  {
    id: 'highContrast',
    title: 'Tăng độ tương phản',
    description: 'Tăng độ tương phản để dễ đọc hơn',
  },
  {
    id: 'largeButtons',
    title: 'Nút bấm lớn',
    description: 'Tăng kích thước nút để dễ nhấn hơn',
  },
  {
    id: 'screenReader',
    title: 'Hỗ trợ đọc màn hình',
    description: 'Tối ưu cho phần mềm đọc màn hình',
  },
  {
    id: 'reduceMotion',
    title: 'Giảm chuyển động',
    description: 'Giảm hiệu ứng chuyển động cho người nhạy cảm',
  },
  {
    id: 'keyboardNavigation',
    title: 'Điều hướng bằng bàn phím',
    description: 'Cho phép điều hướng toàn bộ bằng bàn phím',
  },
]

export const integrationSettings = [
  {
    id: 'connectFacebook',
    title: 'Kết nối Facebook',
    description: 'Chia sẻ nội dung lên Facebook',
  },
  {
    id: 'connectGoogle',
    title: 'Kết nối Google',
    description: 'Đồng bộ với Google Calendar',
  },
  {
    id: 'connectTwitter',
    title: 'Kết nối Twitter',
    description: 'Chia sẻ tin tức lên Twitter',
  },
  {
    id: 'syncCalendar',
    title: 'Đồng bộ lịch',
    description: 'Tự động thêm sự kiện vào lịch của bạn',
  },
  {
    id: 'connectZalo',
    title: 'Kết nối Zalo',
    description: 'Nhận thông báo qua Zalo',
  },
]

export const supportResources = [
  {
    title: 'Trung tâm trợ giúp',
    description: 'Tìm câu trả lời cho các câu hỏi thường gặp',
    icon: '📚',
    link: '/guides',
  },
  {
    title: 'Báo cáo lỗi',
    description: 'Gửi báo cáo về lỗi kỹ thuật',
    icon: '🐛',
    link: '/contact',
  },
  {
    title: 'Gửi phản hồi',
    description: 'Chia sẻ ý kiến để cải thiện dịch vụ',
    icon: '💬',
    link: '/contact',
  },
  {
    title: 'Liên hệ hỗ trợ',
    description: 'Liên hệ đội ngũ hỗ trợ khách hàng',
    icon: '📧',
    link: '/contact',
  },
]
