import React, { useState } from 'react'
import './ProfilePage.css'

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    avatar: 'https://i.pravatar.cc/150?img=68',
    bio: 'Yêu thích nghệ thuật AI và sáng tạo nội dung số',
    phone: '0123456789',
    address: 'Hà Nội, Việt Nam',
    joinDate: '15/01/2024',
    verified: true
  })

  const [stats] = useState({
    posts: 42,
    followers: 1234,
    following: 567,
    likes: 8901
  })

  const [recentActivity] = useState([
    { id: 1, type: 'post', content: 'Đã đăng một bài viết mới', time: '2 giờ trước', icon: '📝' },
    { id: 2, type: 'like', content: 'Đã thích bài viết của Trần Thị B', time: '5 giờ trước', icon: '❤️' },
    { id: 3, type: 'comment', content: 'Đã bình luận về tranh AI mới', time: '1 ngày trước', icon: '💬' },
    { id: 4, type: 'follow', content: 'Đã theo dõi Lê Văn C', time: '2 ngày trước', icon: '👥' }
  ])

  const [achievements] = useState([
    { id: 1, title: 'Người mới', description: 'Tạo tài khoản thành công', icon: '🌟', earned: true },
    { id: 2, title: 'Nghệ sĩ AI', description: 'Tạo 10 tranh AI', icon: '🎨', earned: true },
    { id: 3, title: 'Người nổi tiếng', description: 'Có 1000 người theo dõi', icon: '⭐', earned: true },
    { id: 4, title: 'Chuyên gia', description: 'Đăng 50 bài viết', icon: '🏆', earned: false }
  ])

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-banner"></div>
          <div className="profile-info-section">
            <div className="profile-avatar-wrapper">
              <img src={userProfile.avatar} alt={userProfile.name} className="profile-avatar" />
              {userProfile.verified && (
                <div className="verified-badge" title="Tài khoản đã xác thực">
                  <svg className="verified-icon" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div className="profile-details">
              <h1 className="profile-name">{userProfile.name}</h1>
              <p className="profile-email">{userProfile.email}</p>
              <p className="profile-bio">{userProfile.bio}</p>
              <div className="profile-meta">
                <span className="meta-item">
                  <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {userProfile.address}
                </span>
                <span className="meta-item">
                  <svg className="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Tham gia {userProfile.joinDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-value">{stats.posts}</div>
            <div className="stat-label">Bài viết</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.followers}</div>
            <div className="stat-label">Người theo dõi</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.following}</div>
            <div className="stat-label">Đang theo dõi</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.likes}</div>
            <div className="stat-label">Lượt thích</div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="profile-content">
          {/* Recent Activity */}
          <div className="content-card">
            <h2 className="card-title">Hoạt động gần đây</h2>
            <div className="activity-list">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <span className="activity-icon">{activity.icon}</span>
                  <div className="activity-content">
                    <p className="activity-text">{activity.content}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="content-card">
            <h2 className="card-title">Thành tích</h2>
            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`achievement-item ${achievement.earned ? 'earned' : 'locked'}`}
                >
                  <span className="achievement-icon">{achievement.icon}</span>
                  <div className="achievement-info">
                    <h3 className="achievement-title">{achievement.title}</h3>
                    <p className="achievement-description">{achievement.description}</p>
                  </div>
                  {!achievement.earned && <div className="lock-overlay">🔒</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions">
          <button className="action-btn primary">
            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Chỉnh sửa hồ sơ
          </button>
          <button className="action-btn secondary">
            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Chia sẻ hồ sơ
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
