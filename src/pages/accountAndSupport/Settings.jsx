import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../../components/common/SectionHeading'
import ToggleSwitch from '../../components/common/ToggleSwitch'
import {
  settingsTabs,
  defaultFormData,
  notificationSettings,
  appearanceSettings,
  privacySettings,
  privacyOptions,
  fontSizeOptions,
  themeOptions,
  languageOptions,
  dataStorageSettings,
  accessibilitySettings,
  integrationSettings,
  supportResources
} from '../../data/settingsData'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications')
  const [formData, setFormData] = useState(defaultFormData)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Handle form submission
    console.log('Settings updated:', formData)
    alert('Cập nhật cài đặt thành công!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fef8f3] to-[#f6eadf]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <SectionHeading
          label="Quản lý tài khoản"
          title="Cài đặt"
          description="Quản lý thông tin cá nhân, bảo mật và tùy chỉnh trải nghiệm của bạn"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-4">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <nav className="space-y-2">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full rounded-lg px-4 py-3 text-left transition-all ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#3b2412] to-[#4a2d18] text-white shadow-md'
                      : 'text-brand-brown-600 hover:bg-[#f6eadf]'
                      }`}
                  >
                    <span className="mr-3 text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <form onSubmit={handleSubmit}>

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold text-brand-brown-900">
                      Cài đặt thông báo
                    </h2>

                    <div className="space-y-4">
                      {notificationSettings.map((setting, index) => (
                        <div
                          key={setting.id}
                          className={`${index < notificationSettings.length - 1 ? 'border-b border-brand-brown-100' : ''}`}
                        >
                          <ToggleSwitch
                            id={setting.id}
                            name={setting.id}
                            checked={formData[setting.id]}
                            onChange={handleInputChange}
                            label={setting.title}
                            description={setting.description}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Appearance Settings */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold text-brand-brown-900">
                      Giao diện
                    </h2>

                    {/* Appearance Toggles */}
                    <div className="space-y-4">
                      {appearanceSettings.map((setting, index) => (
                        <div
                          key={setting.id}
                          className={`${index < appearanceSettings.length - 1 ? 'border-b border-brand-brown-100' : ''}`}
                        >
                          <ToggleSwitch
                            id={setting.id}
                            name={setting.id}
                            checked={formData[setting.id]}
                            onChange={handleInputChange}
                            label={setting.title}
                            description={setting.description}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Font Size */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                        Kích thước chữ
                      </label>
                      <select
                        name="fontSize"
                        value={formData.fontSize}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                      >
                        {fontSizeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Theme */}
                    <div>
                      <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                        Chủ đề màu sắc
                      </label>
                      <select
                        name="theme"
                        value={formData.theme}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                      >
                        {themeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Language */}
                    <div>
                      <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                        Ngôn ngữ hiển thị
                      </label>
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                      >
                        {languageOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <p className="mt-2 text-sm text-brand-brown-600">
                        Chọn ngôn ngữ hiển thị trên toàn bộ website
                      </p>
                    </div>

                    <div className="rounded-lg bg-[#f6eadf] p-4 mt-6">
                      <p className="text-sm text-brand-brown-700">
                        <strong>💡 Mẹo:</strong> Thay đổi giao diện để có trải nghiệm phù hợp với sở thích của bạn.
                      </p>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold text-brand-brown-900">
                      Quyền riêng tư
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-brand-brown-700 mb-2">
                          Ai có thể xem hồ sơ của bạn?
                        </label>
                        <select
                          name="profileVisibility"
                          value={formData.profileVisibility}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-brand-brown-200 px-4 py-3 focus:border-brand-brown-600 focus:outline-none focus:ring-2 focus:ring-brand-brown-600/20"
                        >
                          {privacyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {privacySettings.map((setting, index) => (
                        <div
                          key={setting.id}
                          className={`${index < privacySettings.length - 1 ? 'border-b border-brand-brown-100' : ''}`}
                        >
                          <ToggleSwitch
                            id={setting.id}
                            name={setting.id}
                            checked={formData[setting.id]}
                            onChange={handleInputChange}
                            label={setting.title}
                            description={setting.description}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Data & Storage Settings */}
                {activeTab === 'data' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold text-brand-brown-900">
                      Dữ liệu & Bộ nhớ
                    </h2>

                    <div className="space-y-4">
                      {dataStorageSettings.map((setting, index) => (
                        <div
                          key={setting.id}
                          className={`${index < dataStorageSettings.length - 1 ? 'border-b border-brand-brown-100' : ''}`}
                        >
                          {setting.isAction ? (
                            <div className="flex items-center justify-between py-4">
                              <div>
                                <h3 className="font-semibold text-brand-brown-900">
                                  {setting.title}
                                </h3>
                                <p className="text-sm text-brand-brown-600 mt-1">
                                  {setting.description}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Bạn có chắc muốn ${setting.title.toLowerCase()}?`)) {
                                    alert(`Đã ${setting.title.toLowerCase()} thành công!`)
                                  }
                                }}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                              >
                                Xóa ngay
                              </button>
                            </div>
                          ) : (
                            <ToggleSwitch
                              id={setting.id}
                              name={setting.id}
                              checked={formData[setting.id]}
                              onChange={handleInputChange}
                              label={setting.title}
                              description={setting.description}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg bg-[#f6eadf] p-4 mt-6">
                      <p className="text-sm text-brand-brown-700">
                        <strong>⚠️ Cảnh báo:</strong> Xóa dữ liệu sẽ không thể khôi phục. Hãy cân nhắc trước khi thực hiện.
                      </p>
                    </div>
                  </div>
                )}

                {/* Accessibility Settings */}
                {activeTab === 'accessibility' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold text-brand-brown-900">
                      Trợ năng
                    </h2>

                    <p className="text-brand-brown-600">
                      Tùy chỉnh để website dễ sử dụng hơn với mọi người
                    </p>

                    <div className="space-y-4">
                      {accessibilitySettings.map((setting, index) => (
                        <div
                          key={setting.id}
                          className={`${index < accessibilitySettings.length - 1 ? 'border-b border-brand-brown-100' : ''}`}
                        >
                          <ToggleSwitch
                            id={setting.id}
                            name={setting.id}
                            checked={formData[setting.id]}
                            onChange={handleInputChange}
                            label={setting.title}
                            description={setting.description}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg bg-[#f6eadf] p-4 mt-6">
                      <p className="text-sm text-brand-brown-700">
                        <strong>♿ Lưu ý:</strong> Các tính năng trợ năng giúp website thân thiện hơn với người khuyết tật.
                      </p>
                    </div>
                  </div>
                )}

                {/* Integrations Settings */}
                {activeTab === 'integrations' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold text-brand-brown-900">
                      Tích hợp
                    </h2>

                    <p className="text-brand-brown-600">
                      Kết nối với các dịch vụ khác để chia sẻ nội dung dễ dàng hơn
                    </p>

                    <div className="space-y-4">
                      {integrationSettings.map((setting, index) => (
                        <div
                          key={setting.id}
                          className={`${index < integrationSettings.length - 1 ? 'border-b border-brand-brown-100' : ''}`}
                        >
                          <ToggleSwitch
                            id={setting.id}
                            name={setting.id}
                            checked={formData[setting.id]}
                            onChange={handleInputChange}
                            label={setting.title}
                            description={setting.description}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg bg-[#f6eadf] p-4 mt-6">
                      <p className="text-sm text-brand-brown-700">
                        <strong>🔗 Lưu ý:</strong> Bạn có thể hủy kết nối bất cứ lúc nào trong cài đặt tài khoản.
                      </p>
                    </div>
                  </div>
                )}

                {/* Support Settings */}
                {activeTab === 'support' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-semibold text-brand-brown-900">
                      Hỗ trợ
                    </h2>

                    <p className="text-brand-brown-600">
                      Tìm kiếm trợ giúp hoặc liên hệ với chúng tôi
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      {supportResources.map((resource, index) => (
                        <Link
                          key={index}
                          to={resource.link}
                          className="group rounded-xl border-2 border-brand-brown-200 p-6 transition hover:border-brand-brown-600 hover:shadow-lg"
                        >
                          <div className="mb-3 text-4xl">{resource.icon}</div>
                          <h3 className="mb-2 font-serif text-xl font-semibold text-brand-brown-900 group-hover:text-brand-brown-600">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-brand-brown-600">
                            {resource.description}
                          </p>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-8 rounded-xl border-2 border-brand-brown-200 p-6">
                      <h3 className="mb-4 font-serif text-xl font-semibold text-brand-brown-900">
                        Thông tin phiên bản
                      </h3>
                      <div className="space-y-2 text-sm text-brand-brown-600">
                        <p><strong>Phiên bản:</strong> 1.0.0</p>
                        <p><strong>Cập nhật lần cuối:</strong> 16/10/2025</p>
                        <p><strong>Môi trường:</strong> Production</p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-[#f6eadf] p-4 mt-6">
                      <p className="text-sm text-brand-brown-700">
                        <strong>💡 Gợi ý:</strong> Hãy xem trang Hướng dẫn để tìm câu trả lời nhanh cho câu hỏi của bạn.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    className="rounded-full border-2 border-brand-brown-300 px-6 py-3 font-semibold text-brand-brown-700 transition hover:bg-brand-brown-50"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-gradient-to-r from-[#3b2412] to-[#4a2d18] px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
