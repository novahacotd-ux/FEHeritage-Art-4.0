import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getEventById } from '../../data/mockData'

const EventRegistration = () => {
const { eventId } = useParams()
const navigate = useNavigate()
const event = getEventById(eventId)

const [formData, setFormData] = useState({
fullName: '',
email: '',
workTitle: '',
workCategory: 'tranh',
description: '',
file: null,
})

const [errors, setErrors] = useState({})
const [isSubmitting, setIsSubmitting] = useState(false)
const [submitSuccess, setSubmitSuccess] = useState(false)
const [agreed, setAgreed] = useState(false)
const [preview, setPreview] = useState('')

const handleChange = (event) => {
const { name, value } = event.target
setFormData((prev) => ({ ...prev, [name]: value }))
if (errors[name]) {
    setErrors((prev) => ({ ...prev, [name]: '' }))
}
}

const handleFileChange = (event) => {
const file = event.target.files[0]
if (!file) {
    setPreview('Chưa có preview')
    setFormData((prev) => ({ ...prev, file: null }))
    return
}

const allowed = ['image/png', 'image/jpeg', 'video/mp4', 'application/pdf']
if (!allowed.includes(file.type)) {
    setPreview('Định dạng không được hỗ trợ')
    setFormData((prev) => ({ ...prev, file: null }))
    return
}

if (file.size > 100 * 1024 * 1024) {
    setPreview('File quá lớn (max 100MB)')
    setFormData((prev) => ({ ...prev, file: null }))
    return
}

setFormData((prev) => ({ ...prev, file }))

if (file.type.startsWith('image/')) {
    const url = URL.createObjectURL(file)
    setPreview(`<img src="${url}" alt="Preview" style="max-width:100%; height:auto;" />`)
} else if (file.type === 'video/mp4') {
    const url = URL.createObjectURL(file)
    setPreview(`<video controls style="max-width:100%"><source src="${url}" />Video preview không hỗ trợ</video>`)
} else if (file.type === 'application/pdf') {
    setPreview(`PDF đã chọn (không hiển thị preview). Tên: ${file.name}`)
} else {
    setPreview('Không thể preview')
}
}

const validateForm = () => {
const newErrors = {}
if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên'
if (!formData.email.trim()) {
    newErrors.email = 'Vui lòng nhập email'
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Email không hợp lệ'
}
if (!formData.workTitle.trim()) newErrors.workTitle = 'Vui lòng nhập tên tác phẩm'
if (!formData.file) newErrors.file = 'Vui lòng chọn file gửi'
if (!agreed) newErrors.agreed = 'Bạn cần đồng ý với thể lệ trước khi gửi'

setErrors(newErrors)
return Object.keys(newErrors).length === 0
}

const handleSubmit = async (event) => {
event.preventDefault()
if (!validateForm()) return

setIsSubmitting(true)
await new Promise((resolve) => setTimeout(resolve, 2000))

console.log('Registration data:', { eventId, ...formData })
setIsSubmitting(false)
setSubmitSuccess(true)

setTimeout(() => {
    navigate(`/events/${eventId}`)
}, 3000)
}

if (!event) {
return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 md:px-6">
    <div className="rounded-[40px] bg-[#f6eadf] p-10 text-center shadow-[0_32px_60px_rgba(83,48,33,0.12)] sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-brown-400">Lỗi 404</p>
        <h1 className="mt-4 text-3xl font-serif font-semibold text-brand-brown-900 sm:text-4xl">
        Không tìm thấy sự kiện
        </h1>
        <Link
        to="/events"
        className="mt-8 inline-block rounded-full bg-gradient-to-br from-[#3b2412] to-[#2e1e10] px-8 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(83,48,33,0.3)] transition hover:scale-105"
        >
        Trở về danh sách sự kiện
        </Link>
    </div>
    </div>
)
}

if (submitSuccess) {
return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 md:px-6">
    <div className="rounded-[40px] bg-[#f6eadf] p-10 text-center shadow-[0_32px_60px_rgba(83,48,33,0.12)] sm:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600">
        <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
        </div>
        <h1 className="text-3xl font-serif font-semibold text-brand-brown-900 sm:text-4xl">Gửi tác phẩm thành công!</h1>
        <p className="mt-4 text-sm text-brand-brown-600 sm:text-base">
        Cảm ơn bạn đã gửi tác phẩm <strong>{formData.workTitle}</strong> cho sự kiện <strong>{event.title}</strong>. Chúng tôi đã gửi email xác nhận đến{' '}
        <strong>{formData.email}</strong>.
        </p>
        <p className="mt-2 text-xs text-brand-brown-500">Mã tác phẩm của bạn: <strong>MT4-{Date.now().toString(36).toUpperCase().slice(-6)}</strong></p>
        <p className="mt-2 text-xs text-brand-brown-500">Đang chuyển hướng về chi tiết sự kiện...</p>
    </div>
    </div>
)
}

return (
<div className="min-h-screen bg-gradient-to-b from-[#fef8f3] to-[#f6eadf]">
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
    {/* Hero Banner Section */}
    <div className="relative mb-8 h-[500px] overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(59,36,18,0.08)]">
        <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
        <h1 className="mb-4 max-w-3xl text-5xl font-serif font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            {event.title}
        </h1>
        <p className="mb-6 max-w-2xl text-lg text-white/90 md:text-xl">
            Chiêm ngưỡng và tìm hiểu về nghệ thuật tranh dân gian truyền thống Đông Hồ với các nghệ nhân.
        </p>
        
        </div>
    </div>

    {/* Form & Sidebar Section */}
    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
    {/* Main form column */}
    <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_50px_rgba(59,36,18,0.08)]">
    <form onSubmit={handleSubmit} className="p-8 sm:p-12">
        <div className="mb-8 rounded-2xl border-l-4 border-amber-500 bg-amber-50/50 p-5">
        <p className="text-sm leading-relaxed text-brand-brown-900">
            💡 <strong>Hướng dẫn:</strong> Điền đầy đủ thông tin bên dưới và tải lên tác phẩm của bạn. 
            Hệ thống sẽ hiển thị preview ngay lập tức. Mỗi người có thể nộp tối đa <strong>3 tác phẩm</strong>.
        </p>
        </div>

        <div className="space-y-6">
        <div>
            <label htmlFor="fullName" className="block text-sm font-bold text-brand-brown-900">
            Họ & Tên <span className="text-red-500">*</span>
            </label>
            <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className={`mt-2 w-full rounded-xl border-2 bg-white px-5 py-3.5 text-sm shadow-sm transition focus:outline-none focus:ring-2 ${
                errors.fullName
                ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
                : 'border-gray-200 focus:border-amber-400 focus:ring-amber-200'
            }`}
            placeholder="Nguyễn Văn A"
            />
            {errors.fullName && <p className="mt-2 text-xs font-medium text-red-600">{errors.fullName}</p>}
        </div>

        <div>
            <label htmlFor="email" className="block text-sm font-bold text-brand-brown-900">
            Email <span className="text-red-500">*</span>
            </label>
            <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-2 w-full rounded-xl border-2 bg-white px-5 py-3.5 text-sm shadow-sm transition focus:outline-none focus:ring-2 ${
                errors.email
                ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
                : 'border-gray-200 focus:border-amber-400 focus:ring-amber-200'
            }`}
            placeholder="email@domain.com"
            />
            {errors.email && <p className="mt-2 text-xs font-medium text-red-600">{errors.email}</p>}
        </div>

        <div>
            <label htmlFor="workTitle" className="block text-sm font-bold text-brand-brown-900">
            Tên tác phẩm <span className="text-red-500">*</span>
            </label>
            <input
            id="workTitle"
            name="workTitle"
            type="text"
            value={formData.workTitle}
            onChange={handleChange}
            className={`mt-2 w-full rounded-xl border-2 bg-white px-5 py-3.5 text-sm shadow-sm transition focus:outline-none focus:ring-2 ${
                errors.workTitle
                ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
                : 'border-gray-200 focus:border-amber-400 focus:ring-amber-200'
            }`}
            placeholder="Ví dụ: Huế trong ký ức"
            />
            {errors.workTitle && <p className="mt-2 text-xs font-medium text-red-600">{errors.workTitle}</p>}
        </div>

        <div>
            <label htmlFor="workCategory" className="block text-sm font-bold text-brand-brown-900">
            Loại tác phẩm
            </label>
            <select
            id="workCategory"
            name="workCategory"
            value={formData.workCategory}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border-2 border-gray-200 bg-white px-5 py-3.5 text-sm shadow-sm transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
            <option value="tranh">🎨 Tranh / Ảnh (PNG, JPEG)</option>
            <option value="video">🎬 Video / Animation</option>
            <option value="thuyetminh">📄 Báo cáo / Dự án (PDF)</option>
            </select>
        </div>

        <div>
            <label htmlFor="description" className="block text-sm font-bold text-brand-brown-900">
            Mô tả ngắn <span className="text-gray-500 font-normal">(≤200 chữ)</span>
            </label>
            <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            maxLength="1200"
            className="mt-2 w-full rounded-xl border-2 border-gray-200 bg-white px-5 py-3.5 text-sm shadow-sm transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            placeholder="Mô tả nguồn cảm hứng và công nghệ đã dùng..."
            />
        </div>

        <div>
            <label htmlFor="file" className="block text-sm font-bold text-brand-brown-900">
            Chọn file gửi <span className="text-red-500">*</span>
            </label>
            <input
            id="file"
            name="file"
            type="file"
            accept=".png,.jpg,.jpeg,.mp4,.pdf"
            onChange={handleFileChange}
            className={`mt-2 w-full rounded-xl border-2 bg-white px-5 py-3.5 text-sm shadow-sm transition file:mr-4 file:rounded-lg file:border-0 file:bg-amber-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-amber-700 hover:file:bg-amber-100 focus:outline-none focus:ring-2 ${
                errors.file
                ? 'border-red-300 focus:border-red-400 focus:ring-red-200'
                : 'border-gray-200 focus:border-amber-400 focus:ring-amber-200'
            }`}
            />
            {errors.file && <p className="mt-2 text-xs font-medium text-red-600">{errors.file}</p>}
        </div>

        <div className="overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            {preview ? (
            <div className="mx-auto max-w-md" dangerouslySetInnerHTML={{ __html: preview }} />
            ) : (
            <div className="text-gray-500">
                <svg className="mx-auto mb-3 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Chưa có preview</p>
                <p className="mt-1 text-xs">Tải file lên để xem trước</p>
            </div>
            )}
        </div>

        <div className="flex items-start gap-3 rounded-xl border-2 border-gray-200 bg-gray-50 p-4">
            <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-2 focus:ring-amber-200"
            />
            <label htmlFor="agree" className="text-sm text-brand-brown-900">
            Tôi đồng ý với{' '}
            <Link to={`/events/${eventId}`} className="font-bold text-amber-600 underline decoration-amber-300 underline-offset-2 hover:text-amber-700">
                thể lệ & điều khoản
            </Link>
            {' '}của cuộc thi.
            </label>
        </div>
        {errors.agreed && <p className="text-sm font-medium text-red-600">{errors.agreed}</p>}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button
            type="submit"
            disabled={isSubmitting}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition hover:shadow-xl hover:shadow-amber-500/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
                <>
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang gửi...
                </>
            ) : (
                <>
                ✨ Gửi tác phẩm
                </>
            )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 transition group-hover:opacity-100"></div>
        </button>
        <button
            type="button"
            onClick={() => {
            setFormData({ fullName: '', email: '', workTitle: '', workCategory: 'tranh', description: '', file: null })
            setPreview('')
            setAgreed(false)
            setErrors({})
            }}
            className="rounded-xl border-2 border-gray-300 bg-white px-8 py-4 text-sm font-bold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
        >
            🗑️ Xóa form
        </button>
        </div>

        <p className="mt-8 rounded-xl bg-blue-50 p-4 text-xs leading-relaxed text-blue-900">
        ℹ️ <strong>Lưu ý:</strong> Mọi file gửi sẽ được kiểm tra trước khi đăng. Bằng việc gửi bài, bạn đồng ý cho MT4 sử dụng tác phẩm trong triển lãm & truyền thông (có ghi nguồn tác giả).
        </p>
    </form>
    </div>

    {/* Sidebar column */}
    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
        {/* Thể lệ chi tiết */}
        {event.rules && event.rules.length > 0 && (
        <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-green-50 to-green-100/50 shadow-lg shadow-green-500/10">
            <div className="border-b-2 border-green-200 bg-white/50 p-5 backdrop-blur">
            <h3 className="flex items-center gap-2 text-lg font-bold text-green-900">
                <span className="text-2xl">📋</span> Thể lệ chi tiết
            </h3>
            </div>
            <div className="p-6 space-y-3">
            {event.rules.map((rule, index) => (
                <div key={index} className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-green-700">{rule.title}</p>
                <p className="mt-1 text-sm text-gray-800">{rule.content}</p>
                </div>
            ))}
            </div>
        </div>
        )}
        {/* Liên hệ & Hỗ trợ */}
        <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-lg shadow-blue-500/10">
        <div className="border-b-2 border-blue-200 bg-white/50 p-5 backdrop-blur">
            <h3 className="flex items-center gap-2 text-lg font-bold text-blue-900">
            <span className="text-2xl">�</span> Liên hệ & Hỗ trợ
            </h3>
        </div>
        <div className="p-6 space-y-4">
            <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Email</p>
            <a href="mailto:hello@mt4.vn" className="mt-1 block text-base font-bold text-blue-600 hover:text-blue-700 hover:underline">
                hello@mt4.vn
            </a>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Hotline</p>
            <a href="tel:+84912345678" className="mt-1 block text-base font-bold text-blue-600 hover:text-blue-700 hover:underline">
                +84 912 345 678
            </a>
            </div>
            <p className="rounded-lg bg-blue-50 p-3 text-xs leading-relaxed text-blue-800">
            💬 Gửi thắc mắc kèm <strong>Mã tác phẩm</strong> (nếu có) để BTC hỗ trợ nhanh chóng.
            </p>
        </div>
        </div>

        {/* Dự án tiêu biểu MT4 */}
        <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-amber-50 to-amber-100/50 shadow-lg shadow-amber-500/10">
        <div className="border-b-2 border-amber-200 bg-white/50 p-5 backdrop-blur">
            <h3 className="flex items-center gap-2 text-lg font-bold text-amber-900">
            <span className="text-2xl">⭐</span> Dự án tiêu biểu MT4
            </h3>
        </div>
        <ul className="p-6 space-y-3">
            <li className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md">
            <span className="text-xl">🎨</span>
            <span className="text-sm font-medium text-gray-800">Tranh AI Huế — Tái hiện tranh cổ</span>
            </li>
            <li className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md">
            <span className="text-xl">🔊</span>
            <span className="text-sm font-medium text-gray-800">Giọng nói nhân tạo tại di tích</span>
            </li>
            <li className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md">
            <span className="text-xl">🥽</span>
            <span className="text-sm font-medium text-gray-800">Triển lãm thực tế ảo (VR)</span>
            </li>
        </ul>
        </div>

        {/* Lưu ý kỹ thuật */}
        <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-purple-50 to-purple-100/50 shadow-lg shadow-purple-500/10">
        <div className="border-b-2 border-purple-200 bg-white/50 p-5 backdrop-blur">
            <h3 className="flex items-center gap-2 text-lg font-bold text-purple-900">
            <span className="text-2xl">📌</span> Lưu ý kỹ thuật
            </h3>
        </div>
        <div className="p-6">
            <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs leading-relaxed text-gray-700">
                Ưu tiên <strong className="text-purple-700">PNG/JPEG chất lượng cao</strong>. Đặt tên file theo format:
            </p>
            <code className="mt-2 block rounded-lg bg-purple-50 px-3 py-2 text-xs font-mono text-purple-800">
                &lt;HọTên_TenTacPham_Nam&gt;
            </code>
            <p className="mt-2 text-xs text-gray-500">
                Ví dụ: <span className="font-medium">NguyenVanA_HueTrongKyUc_2025.png</span>
            </p>
            </div>
        </div>
        </div>
    </aside>
    </div>
    </div>
</div>
)
}

export default EventRegistration
