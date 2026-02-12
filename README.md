# HA4 - Nền Tảng Văn Hóa & Giáo Dục Việt Nam

Dự án **HA4_FE** là một nền tảng web tương tác, kết hợp công nghệ hiện đại để tôn vinh và giáo dục về văn hóa, lịch sử Việt Nam. Nền tảng cung cấp trải nghiệm đa chiều từ bản đồ di tích lịch sử, công cụ AI sáng tạo nghệ thuật, đến hệ thống quản lý học tập (LMS) và thương mại điện tử.

## 🌟 Tính Năng Nổi Bật

### 1. Trải Nghiệm Văn Hóa Số (`/trainghiem`)

- **Bản Đồ Di Tích**: Khám phá các địa danh lịch sử (Dinh Độc Lập, Địa đạo Củ Chi, các chùa chiền...) trên bản đồ tương tác.
- **Thông Tin Chi Tiết**: Cung cấp hình ảnh, mô tả lịch sử, và vị trí địa lý của từng di tích.
- **Bộ Lọc Thông Minh**: Tìm kiếm địa danh theo thời kỳ (Nguyễn, Pháp thuộc, Hiện đại...) hoặc khu vực.

### 2. AI Sáng Tạo Nghệ Thuật (`/taotranh`)

- **Biến Ảnh Thành Tranh**: Sử dụng công nghệ AI để chuyển đổi ảnh chụp thành các tác phẩm nghệ thuật với nhiều phong cách khác nhau.
- **Tích Hợp Đa Nền Tảng**: Giới thiệu và liên kết tới các công cụ AI hàng đầu như Midjourney, Stable Diffusion, Bing Image Creator.
- **Giao Diện Tương Tác**: Thiết kế đẹp mắt với hiệu ứng chuyển động (animations) mượt mà.

### 3. Giáo Dục & LMS

- Hệ thống quản lý học tập hỗ trợ giáo dục trực tuyến.
- Tài liệu và bài học về văn hóa, lịch sử.

### 4. Cửa Hàng & Dịch Vụ

- Tính năng thương mại điện tử để mua sắm các sản phẩm văn hóa, nghệ thuật.

## 🛠️ Công Nghệ Sử Dụng

Dự án được xây dựng trên nền tảng **React** và **Vite**, sử dụng các thư viện hiện đại:

- **Core**: React 19, Vite 7
- **Styling**: Tailwind CSS 4, CSS Modules
- **Animations**: Framer Motion, GSAP, AOS (Animate On Scroll)
- **Routing**: React Router DOM 7
- **State Management**: React Context API
- **AI Integration**: OpenAI API, Google GenAI
- **UI Components**: Lucide React, React Icons, CoreUI
- **File Handling**: Mammoth (Word), XLSX (Excel)

## 🚀 Cài Đặt & Chạy Dự Án

### Yêu Cầu

- [Node.js](https://nodejs.org/) (Khuyên dùng phiên bản LTS mới nhất)

### Các Bước Cài Đặt

1.  **Clone dự án**

    ```bash
    git clone <repository-url>
    cd HA4_FE
    ```

2.  **Cài đặt dependencies**

    ```bash
    npm install
    # hoặc
    yarn
    ```

3.  **Chạy môi trường phát triển (Development)**

    ```bash
    npm run dev
    ```

    Truy cập vào địa chỉ được cung cấp (thường là `http://localhost:5173`).

4.  **Build cho môi trường sản xuất (Production)**
    ```bash
    npm run build
    ```

## 📂 Cấu Trúc Dự Án

```
src/
├── assets/         # Tài nguyên hình ảnh, fonts, icons
├── components/     # Các component tái sử dụng (Header, Footer, Cards...)
├── context/        # React Context (Auth, Cart, Settings...)
├── data/           # Dữ liệu tĩnh (địa danh, danh sách tool AI...)
├── pages/          # Các trang chính (Home, TraiNghiem, TaoTranh...)
├── routes/         # Cấu hình routing
├── services/       # Xử lý gọi API
├── styles/         # Global styles
└── utils/          # Các hàm tiện ích
```

## 🤝 Đóng Góp

Mọi đóng góp đều được hoan nghênh. Vui lòng tạo Pull Request hoặc mở Issue nếu bạn tìm thấy lỗi hoặc muốn đề xuất tính năng mới.

---

_Dự án được phát triển với niềm đam mê văn hóa và công nghệ._
