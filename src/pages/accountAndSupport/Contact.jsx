import React, { useState } from 'react'
import SectionHeading from '../../components/common/SectionHeading'
import { contactInfo, faqItems, socialLinks, workingHours, contactSubjects, defaultContactForm } from '../../data/contactData'

const Contact = () => {
  const [formData, setFormData] = useState(defaultContactForm)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // TODO: Implement API call to send contact form
    setTimeout(() => {
      console.log('Contact form submitted:', formData)
      alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.')
      setFormData(defaultContactForm)
      setIsSubmitting(false)
    }, 1500)
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fef8f3] to-[#f6eadf]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <SectionHeading
          label="Hỗ trợ"
          title="Liên hệ với chúng tôi"
          description="Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ qua bất kỳ kênh nào bạn thấy thuận tiện"
        />

        {/* Contact Info Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-6 text-center shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#f6eadf] to-[#e8d3c0]">
                <span className="text-3xl">{info.icon}</span>
              </div>
              <h3 className="text-lg font-serif font-semibold text-brand-brown-900 mb-2">
                {info.title}
              </h3>
              {info.link ? (
                <a
                  href={info.link}
                  className="text-brand-brown-700 font-medium hover:text-brand-brown-900 transition"
                >
                  {info.content}
                </a>
              ) : (
                <p className="text-brand-brown-700 font-medium">{info.content}</p>
              )}
              <p className="mt-2 text-sm text-brand-brown-600">{info.description}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-serif font-semibold text-brand-brown-900 mb-6">
              Gửi tin nhắn cho chúng tôi
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Nhập họ và tên của bạn"
                  className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0123456789"
                  className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                  Chủ đề <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                >
                  {contactSubjects.map((subject) => (
                    <option key={subject.value} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                  Nội dung <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Vui lòng mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                  className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-gradient-to-r from-[#3b2412] to-[#4a2d18] px-6 py-4 font-semibold text-white shadow-lg transition hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-serif font-semibold text-brand-brown-900 mb-6">
                Câu hỏi thường gặp
              </h2>

              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <details
                    key={index}
                    className="group rounded-lg border border-brand-brown-100 p-4 hover:bg-[#fef8f3] transition"
                  >
                    <summary className="cursor-pointer font-semibold text-brand-brown-900 flex items-center justify-between">
                      <span>{faq.question}</span>
                      <span className="text-brand-brown-400 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-brand-brown-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-brand-brown-100">
                <p className="text-sm text-brand-brown-600 text-center">
                  Không tìm thấy câu trả lời?{' '}
                  <a href="/guides" className="font-semibold text-brand-brown-700 hover:text-brand-brown-900">
                    Xem thêm hướng dẫn
                  </a>
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-serif font-semibold text-brand-brown-900 mb-6">
                Kết nối với chúng tôi
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r ${social.color} p-4 text-white font-semibold shadow-md transition hover:shadow-lg hover:scale-105`}
                  >
                    <IconComponent className="text-2xl" />
                    <span>{social.name}</span>
                  </a>
                )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Map or Additional Info */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#3b2412] to-[#4a2d18] p-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-serif font-semibold mb-4">
            Giờ làm việc
          </h3>
          <div className="grid gap-4 md:grid-cols-3 mt-6">
            {workingHours.map((schedule, index) => (
              <div key={index}>
                <p className="text-white/80 text-sm mb-1">{schedule.day}</p>
                <p className="text-xl font-semibold">{schedule.hours}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-white/90">
            Chúng tôi cam kết phản hồi trong vòng 24 giờ làm việc
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
