import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useUser } from '../context/UserContext'
import { authService } from '../services'
import { validatePassword, getErrorMessage } from '../utils/apiHelpers'
import './InfoPage.css'

const InfoPage = () => {
  const navigate = useNavigate()
  const { user, isLoggedIn, refreshProfile, logout } = useUser()
  const [activeTab, setActiveTab] = useState('account')
  const [userAvatar, setUserAvatar] = useState('https://i.pravatar.cc/150?img=68')
  const [isEditingAvatar, setIsEditingAvatar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    birthday: '',
    gender: 'Male',
    address: '',
    bio: '',
    identityNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newsletter: true
  })
  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showPhone: false,
    allowMessages: true
  })

  // Load user data from context
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Vui lòng đăng nhập để xem trang này')
      navigate('/login')
      return
    }

    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        identityNumber: user.identity_number || '',
        birthday: user.date_of_birth || '',
        gender: user.gender || 'Male',
        bio: user.intro || ''
      }))
    }
  }, [user, isLoggedIn, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePrivacyChange = (key) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserAvatar(reader.result)
        setIsEditingAvatar(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarURL = () => {
    const url = prompt('Nhập URL ảnh đại diện:')
    if (url) {
      setUserAvatar(url)
      setIsEditingAvatar(false)
    }
  }

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '#ccc' }

    let strength = 0
    if (password.length >= 6) strength++
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++

    if (strength <= 2) return { strength: 1, label: 'Yếu', color: '#ff4444' }
    if (strength <= 4) return { strength: 2, label: 'Trung bình', color: '#ff9800' }
    return { strength: 3, label: 'Mạnh', color: '#4caf50' }
  }

  const handleSaveProfile = async () => {
    try {
      // Validate birthday
      if (formData.birthday) {
        const selectedDate = new Date(formData.birthday)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (selectedDate > today) {
          toast.error('Ngày sinh không được lớn hơn ngày hiện tại')
          return
        }
      }

      setLoading(true)

      const profileData = {
        name: formData.fullName,
        identity_number: formData.identityNumber || null,
        date_of_birth: formData.birthday || null,
        gender: formData.gender,
        intro: formData.bio || null
      }

      const response = await authService.updateProfile(profileData)

      if (response.success) {
        toast.success('Cập nhật thông tin thành công!')
        // Refresh user profile in context
        await refreshProfile()
      } else {
        toast.error(response.message || 'Cập nhật thông tin thất bại')
      }
    } catch (error) {
      console.error('Update profile error:', error)
      toast.error(getErrorMessage(error) || 'Có lỗi xảy ra khi cập nhật thông tin')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    try {
      // Validate input
      if (!formData.currentPassword) {
        toast.error('Vui lòng nhập mật khẩu hiện tại')
        return
      }

      if (!formData.newPassword) {
        toast.error('Vui lòng nhập mật khẩu mới')
        return
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error('Mật khẩu xác nhận không khớp')
        return
      }

      // Validate password strength
      const passwordValidation = validatePassword(formData.newPassword)
      if (!passwordValidation.valid) {
        toast.error(passwordValidation.errors[0] || 'Mật khẩu không hợp lệ')
        return
      }

      setLoading(true)

      const response = await authService.changePassword({
        current_password: formData.currentPassword,
        new_password: formData.newPassword
      })

      if (response.success) {
        toast.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.')

        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }))

        // Logout and redirect to login
        setTimeout(async () => {
          await logout()
          navigate('/login')
        }, 1500)
      } else {
        toast.error(response.message || 'Đổi mật khẩu thất bại')
      }
    } catch (error) {
      console.error('Change password error:', error)
      toast.error(getErrorMessage(error) || 'Có lỗi xảy ra khi đổi mật khẩu')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'account', label: 'Tài khoản', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'security', label: 'Bảo mật', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { id: 'notifications', label: 'Thông báo', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { id: 'privacy', label: 'Quyền riêng tư', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
  ]

  return (
    <div className="info-page">
      <div className="info-container">
        {/* Header */}
        <div className="info-header">
          <div className="header-content">
            <div className="header-avatar-section">
              <div className="header-avatar-wrapper">
                <img src={userAvatar} alt="User Avatar" className="header-avatar" />
                <button
                  className="header-avatar-edit-btn"
                  onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                  title="Thay đổi ảnh đại diện"
                >
                  <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                {isEditingAvatar && (
                  <div className="header-avatar-edit-menu">
                    <label className="header-avatar-option">
                      <svg className="option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span>Tải ảnh lên</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <button className="header-avatar-option" onClick={handleAvatarURL}>
                      <svg className="option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span>Nhập URL</span>
                    </button>
                    <button
                      className="header-avatar-option cancel"
                      onClick={() => setIsEditingAvatar(false)}
                    >
                      <svg className="option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Hủy</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="header-text">
              <h1 className="header-title">Cài đặt tài khoản</h1>
              <p className="header-subtitle">Quản lý thông tin và tùy chọn của bạn</p>
            </div>
          </div>
        </div>

        <div className="info-content">
          {/* Tabs */}
          <div className="info-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                <svg className="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="content-section">
                <h2 className="section-title">Thông tin cá nhân</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Họ và tên</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                      disabled={loading}
                      className="form-textarea"
                      style={{ minHeight: '45px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="form-textarea"
                      style={{ minHeight: '45px', backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                      title="Email không thể thay đổi"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Số CCCD/CMND</label>
                    <input
                      type="text"
                      name="identityNumber"
                      value={formData.identityNumber}
                      onChange={handleChange}
                      placeholder="Nhập số CCCD/CMND"
                      disabled={loading}
                      className="form-textarea"
                      style={{ minHeight: '45px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Ngày sinh</label>
                    <input
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                      disabled={loading}
                      className="form-textarea"
                      style={{ minHeight: '45px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Giới tính</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={loading}
                      className="form-select"
                    >
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Other">Khác</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Giới thiệu bản thân</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={loading}
                      className="form-textarea"
                      rows="4"
                      placeholder="Viết vài dòng về bạn..."
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="form-textarea"
                    style={{
                      minHeight: '48px',
                      background: loading ? '#ccc' : '#b8906f',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading ? 'Đang lưu...' : '💾 Lưu thay đổi'}
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="content-section">
                <h2 className="section-title">Đổi mật khẩu</h2>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Mật khẩu hiện tại</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu hiện tại"
                      disabled={loading}
                      className="form-textarea"
                      style={{ minHeight: '45px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mật khẩu mới</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Nhập mật khẩu mới"
                      disabled={loading}
                      className="form-textarea"
                      style={{ minHeight: '45px' }}
                    />
                    {formData.newPassword && (
                      <div style={{ marginTop: '8px' }}>
                        <div style={{
                          display: 'flex',
                          gap: '4px',
                          marginBottom: '4px'
                        }}>
                          {[1, 2, 3].map((level) => (
                            <div
                              key={level}
                              style={{
                                flex: 1,
                                height: '4px',
                                borderRadius: '2px',
                                backgroundColor: level <= getPasswordStrength(formData.newPassword).strength
                                  ? getPasswordStrength(formData.newPassword).color
                                  : '#e0e0e0',
                                transition: 'background-color 0.3s ease'
                              }}
                            />
                          ))}
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: getPasswordStrength(formData.newPassword).color,
                          fontWeight: '500'
                        }}>
                          Độ mạnh: {getPasswordStrength(formData.newPassword).label}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Xác nhận mật khẩu mới</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Nhập lại mật khẩu mới"
                      disabled={loading}
                      className="form-textarea"
                      style={{ minHeight: '45px' }}
                    />
                  </div>
                </div>
                <div className="info-box">
                  <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <strong>Mật khẩu mạnh nên:</strong>
                    <ul>
                      <li>Có ít nhất 8 ký tự</li>
                      <li>Bao gồm chữ hoa, chữ thường và số</li>
                      <li>Có ký tự đặc biệt (@, #, $, ...)</li>
                    </ul>
                  </div>
                </div>
                <div className="form-actions">
                  <button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className="form-textarea"
                    style={{
                      minHeight: '48px',
                      background: loading ? '#ccc' : '#b8906f',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading ? 'Đang xử lý...' : '🔐 Đổi mật khẩu'}
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="content-section">
                <h2 className="section-title">Cài đặt thông báo</h2>
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-label">📧 Email thông báo</div>
                      <div className="setting-description">Nhận thông báo qua email</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-label">🔔 Thông báo đẩy</div>
                      <div className="setting-description">Nhận thông báo trên thiết bị</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={() => handleNotificationChange('push')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-label">📱 SMS thông báo</div>
                      <div className="setting-description">Nhận thông báo qua tin nhắn</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={() => handleNotificationChange('sms')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-label">📰 Bản tin</div>
                      <div className="setting-description">Nhận bản tin và ưu đãi</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notifications.newsletter}
                        onChange={() => handleNotificationChange('newsletter')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="content-section">
                <h2 className="section-title">Quyền riêng tư</h2>
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-label">👁️ Hồ sơ công khai</div>
                      <div className="setting-description">Cho phép mọi người xem hồ sơ</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={privacy.profilePublic}
                        onChange={() => handlePrivacyChange('profilePublic')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-label">📧 Hiển thị email</div>
                      <div className="setting-description">Cho phép hiển thị email công khai</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={privacy.showEmail}
                        onChange={() => handlePrivacyChange('showEmail')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-label">📱 Hiển thị số điện thoại</div>
                      <div className="setting-description">Cho phép hiển thị SĐT công khai</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={privacy.showPhone}
                        onChange={() => handlePrivacyChange('showPhone')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <div className="setting-label">💬 Cho phép nhắn tin</div>
                      <div className="setting-description">Người khác có thể gửi tin nhắn</div>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={privacy.allowMessages}
                        onChange={() => handlePrivacyChange('allowMessages')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoPage
