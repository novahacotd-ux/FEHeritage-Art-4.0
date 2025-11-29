/**
 * Video Player Constants
 * Centralized configuration for video player settings
 */

// Playback speeds available in the player
export const PLAYBACK_SPEEDS = [
  { value: 0.25, label: '0.25x' },
  { value: 0.5, label: '0.5x' },
  { value: 0.75, label: '0.75x' },
  { value: 1, label: 'Bình thường' },
  { value: 1.25, label: '1.25x' },
  { value: 1.5, label: '1.5x' },
  { value: 1.75, label: '1.75x' },
  { value: 2, label: '2x' }
];

// Video quality options
export const QUALITY_OPTIONS = [
  { value: '360p', label: '360p' },
  { value: '720p', label: '720p HD' },
  { value: '1080p', label: '1080p Full HD' }
];

// Default player settings
export const DEFAULT_SETTINGS = {
  playbackSpeed: 1,
  volume: 100,
  quality: '1080p',
  showSubtitles: true,
  isMuted: false
};

// Seek time in seconds
export const SEEK_TIME = 10;

// Volume adjustment step
export const VOLUME_STEP = 10;

// Progress save interval in seconds
export const PROGRESS_SAVE_INTERVAL = 5;

// Zoom settings
export const ZOOM_SETTINGS = {
  min: 50,
  max: 200,
  step: 10,
  default: 100
};

/**
 * Citation Formats
 */
export const CITATION_FORMATS = ['apa', 'mla', 'chicago'];

/**
 * Sort Options for Documents/Lectures
 */
export const SORT_OPTIONS = [
  { id: 'newest', name: 'Mới nhất' },
  { id: 'oldest', name: 'Cũ nhất' },
  { id: 'most-viewed', name: 'Xem nhiều nhất' },
  { id: 'highest-rated', name: 'Đánh giá cao nhất' },
  { id: 'most-downloaded', name: 'Tải về nhiều nhất' }
];

/**
 * Pagination Settings
 */
export const PAGINATION = {
  itemsPerPage: 12,
  maxVisiblePages: 7,
  ellipsisThreshold: 7
};

/**
 * LocalStorage Keys
 */
export const STORAGE_KEYS = {
  // Bookmarks
  BOOKMARKED_DOCUMENTS: 'bookmarked_documents',
  BOOKMARKED_LECTURES: 'bookmarked_lectures',

  // User preferences
  PLAYBACK_SPEED: 'playback_speed',
  VOLUME: 'volume',
  SHOW_SUBTITLES: 'show_subtitles',
  ZOOM_LEVEL: 'zoom_level',

  // Progress tracking
  READING_PROGRESS: (id) => `reading_progress_${id}`,
  LECTURE_PROGRESS: (id) => `lecture_progress_${id}`,

  // Notes
  DOCUMENT_NOTES: (id) => `document_notes_${id}`,
  LECTURE_NOTES: (id) => `lecture_notes_${id}`,

  // Filters
  ACTIVE_FILTERS: 'active_filters'
};

/**
 * Animation Durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
};

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

export default {
  PLAYBACK_SPEEDS,
  QUALITY_OPTIONS,
  DEFAULT_SETTINGS,
  SEEK_TIME,
  VOLUME_STEP,
  PROGRESS_SAVE_INTERVAL,
  ZOOM_SETTINGS,
  CITATION_FORMATS,
  SORT_OPTIONS,
  PAGINATION,
  STORAGE_KEYS,
  ANIMATION_DURATION,
  BREAKPOINTS
};
