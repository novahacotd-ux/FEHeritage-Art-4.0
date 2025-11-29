/**
 * Utility functions for video handling
 */

/**
 * Extract YouTube video ID from various URL formats
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null if invalid
 */
export const getYouTubeVideoId = (url) => {
  if (!url) return null;

  // Support various YouTube URL formats:
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Get YouTube embed URL from video ID
 * @param {string} videoId - YouTube video ID
 * @param {object} options - Embed options
 * @returns {string} - YouTube embed URL
 */
export const getYouTubeEmbedUrl = (videoId, options = {}) => {
  const {
    autoplay = 0,
    mute = 0,
    controls = 1,
    modestbranding = 1,
    rel = 0,
    showinfo = 0,
    start = 0
  } = options;

  const params = new URLSearchParams({
    autoplay,
    mute,
    controls,
    modestbranding,
    rel,
    showinfo,
    ...(start > 0 && { start })
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

/**
 * Format seconds to MM:SS or HH:MM:SS
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time string
 */
export const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '00:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Check if URL is a YouTube URL
 * @param {string} url - URL to check
 * @returns {boolean} - True if YouTube URL
 */
export const isYouTubeUrl = (url) => {
  if (!url) return false;
  return /(?:youtube\.com|youtu\.be)/.test(url);
};

/**
 * Get video thumbnail from YouTube video ID
 * @param {string} videoId - YouTube video ID
 * @param {string} quality - Thumbnail quality (default, mqdefault, hqdefault, sddefault, maxresdefault)
 * @returns {string} - Thumbnail URL
 */
export const getYouTubeThumbnail = (videoId, quality = 'hqdefault') => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};
