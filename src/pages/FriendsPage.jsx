import React, { useState } from 'react'
import './FriendsPage.css'

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentUser, setCurrentUser] = useState({
    name: 'Người dùng hiện tại',
    avatar: 'https://i.pravatar.cc/150?img=68',
    friendsCount: 42,
    bio: 'Yêu thích nghệ thuật AI và công nghệ'
  })
  const [isEditingAvatar, setIsEditingAvatar] = useState(false)

  // Handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrentUser(prev => ({ ...prev, avatar: reader.result }))
        setIsEditingAvatar(false)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle avatar upload from URL
  const handleAvatarURL = () => {
    const url = prompt('Nhập URL ảnh đại diện:')
    if (url) {
      setCurrentUser(prev => ({ ...prev, avatar: url }))
      setIsEditingAvatar(false)
    }
  }

  // Mock data
  const friends = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/150?img=1',
      mutualFriends: 12,
      status: 'online',
      bio: 'Yêu thích nghệ thuật AI'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      avatar: 'https://i.pravatar.cc/150?img=5',
      mutualFriends: 8,
      status: 'offline',
      bio: 'Designer & Artist'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      avatar: 'https://i.pravatar.cc/150?img=12',
      mutualFriends: 15,
      status: 'online',
      bio: 'Photographer'
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      avatar: 'https://i.pravatar.cc/150?img=9',
      mutualFriends: 20,
      status: 'online',
      bio: 'Digital Artist'
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      avatar: 'https://i.pravatar.cc/150?img=13',
      mutualFriends: 5,
      status: 'offline',
      bio: 'AI Enthusiast'
    },
    {
      id: 6,
      name: 'Đặng Thị F',
      avatar: 'https://i.pravatar.cc/150?img=24',
      mutualFriends: 18,
      status: 'online',
      bio: 'Creative Director'
    }
  ]

  const friendRequests = [
    {
      id: 1,
      name: 'Bùi Văn G',
      avatar: 'https://i.pravatar.cc/150?img=33',
      mutualFriends: 3,
      bio: 'Artist & Creator'
    },
    {
      id: 2,
      name: 'Vũ Thị H',
      avatar: 'https://i.pravatar.cc/150?img=27',
      mutualFriends: 7,
      bio: 'UI/UX Designer'
    }
  ]

  const suggestions = [
    {
      id: 1,
      name: 'Phan Văn I',
      avatar: 'https://i.pravatar.cc/150?img=56',
      mutualFriends: 10,
      bio: '3D Artist'
    },
    {
      id: 2,
      name: 'Mai Thị K',
      avatar: 'https://i.pravatar.cc/150?img=45',
      mutualFriends: 4,
      bio: 'Illustrator'
    },
    {
      id: 3,
      name: 'Đinh Văn L',
      avatar: 'https://i.pravatar.cc/150?img=68',
      mutualFriends: 6,
      bio: 'Motion Designer'
    }
  ]

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="friends-page">
      <div className="friends-container">
        {/* User Profile Card */}
        <div className="user-profile-card">
          <div className="profile-banner"></div>
          <div className="profile-content">
            <div className="profile-avatar-section">
              <div className="profile-avatar-wrapper">
                <img src={currentUser.avatar} alt={currentUser.name} className="profile-avatar" />
                <button
                  className="avatar-edit-btn"
                  onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                  title="Thay đổi ảnh đại diện"
                >
                  <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                {isEditingAvatar && (
                  <div className="avatar-edit-menu">
                    <label className="avatar-option">
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
                    <button className="avatar-option" onClick={handleAvatarURL}>
                      <svg className="option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span>Nhập URL</span>
                    </button>
                    <button
                      className="avatar-option cancel"
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
            <div className="profile-info">
              <h2 className="profile-name">{currentUser.name}</h2>
              <p className="profile-bio">{currentUser.bio}</p>
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-value">{currentUser.friendsCount}</span>
                  <span className="stat-label">Bạn bè</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{friends.filter(f => f.status === 'online').length}</span>
                  <span className="stat-label">Đang online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="friends-header">
          <div className="header-content">
            <div className="header-icon">
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="header-title">Danh sách bạn bè</h1>
              <p className="header-subtitle">Bạn có {friends.length} người bạn</p>
            </div>
          </div>

          {/* Search */}
          <div className="search-box">
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm bạn bè..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="friends-tabs">
          <button
            onClick={() => setActiveTab('all')}
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          >
            👥 Tất cả bạn bè ({friends.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
          >
            ✉️ Lời mời kết bạn ({friendRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`tab-btn ${activeTab === 'suggestions' ? 'active' : ''}`}
          >
            💡 Gợi ý kết bạn
          </button>
        </div>

        {/* Content */}
        <div className="friends-content">
          {/* All Friends */}
          {activeTab === 'all' && (
            <div className="friends-grid">
              {filteredFriends.map(friend => (
                <div key={friend.id} className="friend-card">
                  <div className="friend-avatar-wrapper">
                    <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
                    <span className={`status-badge ${friend.status}`}></span>
                  </div>
                  <div className="friend-info">
                    <h3 className="friend-name">{friend.name}</h3>
                    <p className="friend-bio">{friend.bio}</p>
                    <p className="mutual-friends">
                      <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {friend.mutualFriends} bạn chung
                    </p>
                  </div>
                  <div className="friend-actions">
                    <button className="action-btn message">
                      <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Nhắn tin
                    </button>
                    <button className="action-btn unfriend">
                      <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Friend Requests */}
          {activeTab === 'requests' && (
            <div className="friends-grid">
              {friendRequests.map(request => (
                <div key={request.id} className="friend-card request-card">
                  <div className="friend-avatar-wrapper">
                    <img src={request.avatar} alt={request.name} className="friend-avatar" />
                  </div>
                  <div className="friend-info">
                    <h3 className="friend-name">{request.name}</h3>
                    <p className="friend-bio">{request.bio}</p>
                    <p className="mutual-friends">
                      <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {request.mutualFriends} bạn chung
                    </p>
                  </div>
                  <div className="friend-actions request-actions">
                    <button className="action-btn accept">
                      ✓ Chấp nhận
                    </button>
                    <button className="action-btn reject">
                      ✕ Từ chối
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {activeTab === 'suggestions' && (
            <div className="friends-grid">
              {suggestions.map(suggestion => (
                <div key={suggestion.id} className="friend-card suggestion-card">
                  <div className="friend-avatar-wrapper">
                    <img src={suggestion.avatar} alt={suggestion.name} className="friend-avatar" />
                  </div>
                  <div className="friend-info">
                    <h3 className="friend-name">{suggestion.name}</h3>
                    <p className="friend-bio">{suggestion.bio}</p>
                    <p className="mutual-friends">
                      <svg className="icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {suggestion.mutualFriends} bạn chung
                    </p>
                  </div>
                  <div className="friend-actions">
                    <button className="action-btn add-friend">
                      ➕ Kết bạn
                    </button>
                    <button className="action-btn remove">
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FriendsPage
