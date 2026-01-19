import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import SectionHeading from '../../components/common/SectionHeading'
import ToggleSwitch from '../../components/common/ToggleSwitch'
import { useSettingsContext } from '../../context/SettingsContext'
import {
  settingsTabs,
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
  const [activeTab, setActiveTab] = useState('appearance')
  const { settings, updateSetting, updateMultipleSettings, resetSettings } = useSettingsContext()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    updateSetting(name, newValue)
    // Auto-save feedback
    toast.success('Đã lưu tự động!', { duration: 1500 })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Settings auto-save, just show confirmation
    toast.success('Tất cả cài đặt đã được lưu!', { icon: '✅' })
  }

  const handleClearCache = () => {
    if (window.confirm('Bạn có chắc muốn xóa bộ nhớ cache?')) {
      // Clear cache logic
      localStorage.removeItem('heritage_art_cache')
      toast.success('Đã xóa bộ nhớ cache thành công!')
    }
  }

  const handleClearHistory = () => {
    if (window.confirm('Bạn có chắc muốn xóa lịch sử duyệt web?')) {
      // Clear history logic
      sessionStorage.clear()
      toast.success('Đã xóa lịch sử thành công!')
    }
  }

  const handleReset = () => {
    if (window.confirm('Bạn có chắc muốn khôi phục cài đặt mặc định?')) {
      resetSettings()
      toast.success('Đã khôi phục cài đặt mặc định!')
    }
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
                            checked={settings[setting.id]}
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
                            checked={settings[setting.id]}
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
                        value={settings.fontSize}
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
                        value={settings.theme}
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
                        value={settings.language}
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

                    {/* Live Preview */}
                    <div className="rounded-lg border-2 border-brand-brown-300 p-6 mt-6 bg-white">
                      <h3 className="font-semibold text-brand-brown-900 mb-3">👁️ Xem trước</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Chế độ tối:</span>
                          <strong className={settings.darkMode ? 'text-green-600' : 'text-gray-400'}>
                            {settings.darkMode ? '🌙 Bật' : '☀️ Tắt'}
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Kích thước chữ:</span>
                          <strong className="text-brand-brown-900">
                            {settings.fontSize === 'small' ? 'Nhỏ (14px)' : settings.fontSize === 'large' ? 'Lớn (18px)' : 'Trung bình (16px)'}
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Chủ đề:</span>
                          <strong className="text-brand-brown-900">
                            {settings.theme === 'default' ? '🏺 Mặc định' : settings.theme === 'warm' ? '🌅 Ấm áp' : settings.theme === 'cool' ? '🌊 Mát mẻ' : '🎨 Cổ điển'}
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Hiệu ứng động:</span>
                          <strong className={settings.animatedEffects ? 'text-green-600' : 'text-gray-400'}>
                            {settings.animatedEffects ? '✨ Bật' : '🚫 Tắt'}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-[#f6eadf] p-4 mt-4">
                      <p className="text-sm text-brand-brown-700">
                        <strong>💡 Mẹo:</strong> Thay đổi giao diện sẽ được áp dụng ngay lập tức và lưu tự động.
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
                          value={settings.profileVisibility}
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
                            checked={settings[setting.id]}
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
                                onClick={setting.id === 'clearCache' ? handleClearCache : handleClearHistory}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                              >
                                Xóa ngay
                              </button>
                            </div>
                          ) : (
                            <ToggleSwitch
                              id={setting.id}
                              name={setting.id}
                              checked={settings[setting.id]}
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
                            checked={settings[setting.id]}
                            onChange={handleInputChange}
                            label={setting.title}
                            description={setting.description}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Live Preview */}
                    <div className="rounded-lg border-2 border-brand-brown-300 p-6 mt-6 bg-white">
                      <h3 className="font-semibold text-brand-brown-900 mb-3">👁️ Trạng thái hiện tại</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Độ tương phản cao:</span>
                          <strong className={settings.highContrast ? 'text-green-600' : 'text-gray-400'}>
                            {settings.highContrast ? '✅ Bật' : '⭕ Tắt'}
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Nút bấm lớn:</span>
                          <strong className={settings.largeButtons ? 'text-green-600' : 'text-gray-400'}>
                            {settings.largeButtons ? '✅ Bật (48px)' : '⭕ Tắt (mặc định)'}
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Giảm chuyển động:</span>
                          <strong className={settings.reduceMotion ? 'text-green-600' : 'text-gray-400'}>
                            {settings.reduceMotion ? '✅ Bật' : '⭕ Tắt'}
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Điều hướng bàn phím:</span>
                          <strong className={settings.keyboardNavigation ? 'text-green-600' : 'text-gray-400'}>
                            {settings.keyboardNavigation ? '✅ Bật' : '⭕ Tắt'}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-[#f6eadf] p-4 mt-4">
                      <p className="text-sm text-brand-brown-700">
                        <strong>♿ Lưu ý:</strong> Các tính năng trợ năng được áp dụng ngay lập tức để cải thiện trải nghiệm.
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
                            checked={settings[setting.id]}
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

                {/* Action Buttons */}
                <div className="mt-8">
                  {/* Auto-save indicator */}
                  <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 text-xl">✓</span>
                      <div>
                        <p className="text-sm font-semibold text-green-800">Lưu tự động được bật</p>
                        <p className="text-xs text-green-600">Tất cả thay đổi được lưu ngay lập tức vào trình duyệt của bạn</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="rounded-full border-2 border-red-500 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50 flex items-center gap-2"
                    >
                      <span>🔄</span>
                      Khôi phục mặc định
                    </button>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => window.location.href = '/'}
                        className="rounded-full border-2 border-brand-brown-300 px-6 py-3 font-semibold text-brand-brown-700 transition hover:bg-brand-brown-50"
                      >
                        Về trang chủ
                      </button>
                      <button
                        type="submit"
                        className="rounded-full bg-gradient-to-r from-[#3b2412] to-[#4a2d18] px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl flex items-center gap-2"
                      >
                        <span>✓</span>
                        Xác nhận cài đặt
                      </button>
                    </div>
                  </div>
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
