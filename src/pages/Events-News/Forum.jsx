import React, { useState } from 'react'
import PostCard from '../../components/forum/PostCard'
import CreatePostModal from '../../components/forum/CreatePostModal'
import EditPostModal from '../../components/forum/EditPostModal'
import UserProfileModal from '../../components/forum/UserProfileModal'
import PostDetailModal from '../../components/forum/PostDetailModal'

// Mock data
const initialPosts = [
  {
    id: 1,
    author: {
      name: 'Nguyễn Văn A',
      role: 'Nghiên cứu viên',
      avatar: 'NVA',
      bio: 'Chuyên gia về bảo tồn di sản văn hóa Việt Nam',
      posts: 12,
      joined: 'Tháng 1, 2024'
    },
    title: 'Vai trò của công nghệ trong bảo tồn di sản',
    content: 'Công nghệ số đang mở ra nhiều cơ hội mới cho việc bảo tồn và phát huy giá trị di sản văn hóa. Các công nghệ như VR, AR, và AI đang được ứng dụng rộng rãi trong việc tái hiện và bảo quản các di sản.',
    category: 'Công nghệ',
    likes: 24,
    dislikes: 2,
    comments: [],
    timestamp: '2 giờ trước',
    tags: ['Công nghệ', 'Di sản', 'VR/AR'],
    images: [] // Thêm field images
  },
  {
    id: 2,
    author: {
      name: 'Trần Thị B',
      role: 'Sinh viên',
      avatar: 'TTB',
      bio: 'Đam mê lịch sử và văn hóa Việt Nam',
      posts: 8,
      joined: 'Tháng 3, 2024'
    },
    title: 'Kinh nghiệm tham quan Cố đô Huế',
    content: 'Mình vừa có chuyến tham quan Cố đô Huế và thực sự ấn tượng với vẻ đẹp kiến trúc cổ kính. Các bạn có ai đã từng đến đây chưa? Chia sẻ trải nghiệm nhé!',
    category: 'Du lịch',
    likes: 15,
    dislikes: 0,
    comments: [],
    timestamp: '5 giờ trước',
    tags: ['Du lịch', 'Huế', 'Di sản'],
    images: [] // Thêm field images
  },
  {
    id: 3,
    author: {
      name: 'Lê Văn C',
      role: 'Giảng viên',
      avatar: 'LVC',
      bio: 'Giảng viên khoa Lịch sử - ĐHKHXH&NV',
      posts: 45,
      joined: 'Tháng 6, 2023'
    },
    title: 'Thảo luận: Làm thế nào để giới trẻ quan tâm hơn đến lịch sử?',
    content: 'Trong thời đại số hóa, việc thu hút giới trẻ quan tâm đến lịch sử là một thách thức. Các bạn nghĩ gì về việc sử dụng game, mạng xã hội để truyền tải kiến thức lịch sử?',
    category: 'Thảo luận',
    likes: 42,
    dislikes: 3,
    comments: [],
    timestamp: '1 ngày trước',
    tags: ['Giáo dục', 'Lịch sử', 'Gen Z'],
    images: [] // Thêm field images
  }
]

export default function Forum() {
  const [posts, setPosts] = useState(initialPosts)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [viewingProfile, setViewingProfile] = useState(null)
  const [viewingDetail, setViewingDetail] = useState(null)
  const [filterCategory, setFilterCategory] = useState('Tất cả')
  const [sortBy, setSortBy] = useState('newest')

  const categories = ['Tất cả', 'Công nghệ', 'Du lịch', 'Thảo luận', 'Giáo dục', 'Di sản']

  // Create new post
  const handleCreatePost = (newPost) => {
    const post = {
      id: Date.now(),
      ...newPost,
      author: {
        name: 'Người dùng hiện tại',
        role: 'Thành viên',
        avatar: 'ND',
        bio: 'Thành viên mới của cộng đồng',
        posts: 1,
        joined: 'Tháng 10, 2025'
      },
      likes: 0,
      dislikes: 0,
      comments: [],
      timestamp: 'Vừa xong',
      images: newPost.images || [] // Đảm bảo có field images
    }
    setPosts([post, ...posts])
    setShowCreateModal(false)
  }

  // Edit post
  const handleEditPost = (updatedPost) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? { ...p, ...updatedPost } : p))
    setEditingPost(null)
  }

  // Delete post
  const handleDeletePost = (postId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      setPosts(posts.filter(p => p.id !== postId))
    }
  }

  // Like/Dislike
  const handleLike = (postId) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    ))
  }

  const handleDislike = (postId) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, dislikes: p.dislikes + 1 } : p
    ))
  }

  // Add comment
  const handleAddComment = (postId, comment) => {
    setPosts(posts.map(p => 
      p.id === postId ? { 
        ...p, 
        comments: [...p.comments, {
          id: Date.now(),
          author: 'Người dùng hiện tại',
          content: comment,
          timestamp: 'Vừa xong'
        }]
      } : p
    ))
  }

  // Filter and sort
  const filteredPosts = posts
    .filter(p => filterCategory === 'Tất cả' || p.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'popular') return b.likes - a.likes
      return 0 // newest is default order
    })

  return (
    <div className="min-h-screen bg-[#f6eadf] text-gray-800 relative">

      {/* Header */}
      <header className="relative z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-20 px-5 border-b-4 border-amber-500">
        <div className="max-w-6xl mx-auto">

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 px-4 py-2 rounded-full mb-6">
              <i className="fa-solid fa-comments text-amber-400" />
              <span className="text-amber-300 text-sm font-semibold tracking-wide">COMMUNITY FORUM</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Diễn đàn Cộng đồng
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Nơi chia sẻ, thảo luận và kết nối về văn hóa, lịch sử và di sản Việt Nam
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Actions Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-2xl p-4 shadow-lg border border-amber-200">
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-amber-300/50 flex items-center justify-center gap-2 group"
          >
            <i className="fa-solid fa-plus group-hover:rotate-90 transition-transform duration-300" />
            Tạo bài viết mới
          </button>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center">
            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm font-medium bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-sm font-medium bg-white"
            >
              <option value="newest">Mới nhất</option>
              <option value="popular">Phổ biến</option>
            </select>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="mb-8 bg-gradient-to-br from-amber-50 to-white rounded-2xl p-6 shadow-lg border border-amber-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-fire text-amber-600" />
            Chủ đề nổi bật
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Công nghệ VR/AR', 'Bảo tồn di sản', 'Lịch sử Việt Nam', 'Du lịch văn hóa', 'Kiến trúc cổ'].map((topic, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white hover:bg-amber-100 text-gray-700 hover:text-amber-700 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-amber-200 hover:border-amber-400"
              >
                #{topic}
              </span>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-amber-200">
              <i className="fa-solid fa-inbox text-6xl text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Chưa có bài viết nào</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onDislike={handleDislike}
                onEdit={() => setEditingPost(post)}
                onDelete={handleDeletePost}
                onViewProfile={() => setViewingProfile(post.author)}
                onViewDetail={() => setViewingDetail(post)}
              />
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreatePostModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreatePost}
        />
      )}

      {editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSave={handleEditPost}
        />
      )}

      {viewingProfile && (
        <UserProfileModal
          user={viewingProfile}
          onClose={() => setViewingProfile(null)}
        />
      )}

      {viewingDetail && (
        <PostDetailModal
          post={viewingDetail}
          onClose={() => setViewingDetail(null)}
          onLike={handleLike}
          onDislike={handleDislike}
          onAddComment={handleAddComment}
          onViewProfile={() => setViewingProfile(viewingDetail.author)}
        />
      )}

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    </div>
  )
}
