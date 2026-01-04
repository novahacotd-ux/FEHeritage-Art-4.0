import api from './api';

// Cloudinary Upload Service
const cloudinaryService = {
  /**
   * Upload ảnh qua backend API
   * @param {File} file - File ảnh cần upload
   * @returns {Promise<{url: string, publicId: string}>}
   */
  uploadImage: async function (file) {
    try {
      console.log('Starting upload via backend:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      // Create form data
      const formData = new FormData();
      formData.append('avatar', file);

      // Upload through backend using axios with HTTP-Only cookies
      // No need to manually add token - it's automatically sent via cookies
      console.log('Uploading to backend: /upload/avatar');

      const response = await api.post('/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Backend response:', response);

      if (!response.success) {
        throw new Error(response.message || 'Upload failed');
      }

      return {
        url: response.data.url,
        publicId: response.data.publicId,
        width: response.data.width,
        height: response.data.height,
        format: response.data.format,
      };
    } catch (error) {
      console.error('Upload error details:', {
        message: error.message,
        error: error
      });
      throw new Error(error.message || 'Không thể upload ảnh. Vui lòng thử lại.');
    }
  },

  /**
   * Validate file trước khi upload
   * @param {File} file 
   * @returns {{isValid: boolean, error: string}}
   */
  validateFile: function (file) {
    // Check file existence
    if (!file) {
      return { isValid: false, error: 'Vui lòng chọn file' };
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Chỉ chấp nhận file ảnh (JPG, PNG, GIF, WEBP)'
      };
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'Kích thước file không được vượt quá 5MB'
      };
    }

    return { isValid: true, error: '' };
  },

  /**
   * Get optimized image URL với transformations
   * @param {string} publicId 
   * @param {object} options - {width, height, crop, quality}
   * @returns {string}
   */
  getOptimizedUrl: function (publicId, options = {}) {
    const { width = 300, height = 300, crop = 'fill', quality = 'auto' } = options;
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/w_${width},h_${height},c_${crop},q_${quality}/${publicId}`;
  },
};

export default cloudinaryService;
