import { useState } from 'react'

export default function CreatePostModal({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Thảo luận',
    tags: [],
    images: [] // Thêm mảng để lưu ảnh
  })
  const [tagInput, setTagInput] = useState('')

  const categories = ['Công nghệ', 'Du lịch', 'Thảo luận', 'Giáo dục', 'Di sản']

  const handleAddTag = () => {
    if (tagInput.trim() && formData.tags.length < 5) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  const handleRemoveTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index)
    })
  }

  // Xử lý upload ảnh
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + formData.images.length > 4) {
      alert('Chỉ được tải lên tối đa 4 ảnh')
      return
    }

    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước ảnh không được vượt quá 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result]
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  // Xóa ảnh
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title.trim() && formData.content.trim()) {
      onCreate(formData)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <i className="fa-solid fa-pen-to-square" />
              Tạo bài viết mới
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:rotate-90"
            >
              <i className="fa-solid fa-times text-xl" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Nhập tiêu đề bài viết..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-200 outline-none transition-all text-gray-800"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Danh mục <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-200 outline-none transition-all text-gray-800 font-medium"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nội dung <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Chia sẻ suy nghĩ của bạn..."
              rows="8"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-200 outline-none transition-all text-gray-800 resize-none"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thêm ảnh (Tối đa 4 ảnh, mỗi ảnh tối đa 5MB)
            </label>
            <div className="space-y-3">
              <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-amber-300 bg-amber-50/50 rounded-xl cursor-pointer hover:bg-amber-100 hover:border-amber-400 transition-all duration-300 group">
                <i className="fa-solid fa-image text-amber-600 text-xl group-hover:scale-110 transition-transform" />
                <span className="text-amber-700 font-medium">Chọn ảnh từ máy tính</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={formData.images.length >= 4}
                />
              </label>

              {/* Preview Images */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                      >
                        <i className="fa-solid fa-times text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Thẻ tag (Tối đa 5)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Nhập tag..."
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-200 outline-none transition-all text-gray-800"
                disabled={formData.tags.length >= 5}
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={formData.tags.length >= 5}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed"
              >
                <i className="fa-solid fa-plus" />
              </button>
            </div>

            {/* Tag List */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="hover:text-red-600 transition-colors"
                    >
                      <i className="fa-solid fa-times text-xs" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <i className="fa-solid fa-paper-plane mr-2" />
              Đăng bài
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
