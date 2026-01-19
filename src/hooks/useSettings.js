import { useState, useEffect } from 'react';

const SETTINGS_STORAGE_KEY = 'heritage_art_settings';

const defaultSettings = {
  // Appearance
  darkMode: false,
  compactMode: false,
  autoPlayVideos: true,
  animatedEffects: true,
  fontSize: 'medium', // small, medium, large
  theme: 'default', // default, warm, cool, classic
  language: 'vi', // vi, en, fr, ja

  // Accessibility
  highContrast: false,
  largeButtons: false,
  screenReader: false,
  reduceMotion: false,
  keyboardNavigation: true,

  // Privacy
  profileVisibility: 'public',
  showEmail: false,
  showPhone: false,
  showActivity: true,
  allowMessaging: true,

  // Notifications
  emailNotifications: true,
  pushNotifications: true,
  newsUpdates: false,
  eventReminders: true,
  forumReplies: true,
  marketingEmails: false,

  // Data & Storage
  autoDownload: true,
  offlineMode: false,

  // Integrations
  connectFacebook: false,
  connectGoogle: false,
  connectTwitter: false,
  syncCalendar: false,
  connectZalo: false,
};

export const useSettings = () => {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return defaultSettings;
    }
  });

  // Save to localStorage whenever settings change
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      applySettings(settings);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateMultipleSettings = (updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    updateSetting,
    updateMultipleSettings,
    resetSettings,
  };
};

// Apply settings to document
const applySettings = (settings) => {
  const root = document.documentElement;

  // Dark Mode
  if (settings.darkMode) {
    root.classList.add('dark-mode');
  } else {
    root.classList.remove('dark-mode');
  }

  // Font Size
  root.classList.remove('font-small', 'font-medium', 'font-large');
  root.classList.add(`font-${settings.fontSize}`);

  // High Contrast
  if (settings.highContrast) {
    root.classList.add('high-contrast');
  } else {
    root.classList.remove('high-contrast');
  }

  // Large Buttons
  if (settings.largeButtons) {
    root.classList.add('large-buttons');
  } else {
    root.classList.remove('large-buttons');
  }

  // Reduce Motion
  if (settings.reduceMotion) {
    root.classList.add('reduce-motion');
  } else {
    root.classList.remove('reduce-motion');
  }

  // Theme
  root.classList.remove('theme-default', 'theme-warm', 'theme-cool', 'theme-classic');
  root.classList.add(`theme-${settings.theme}`);

  // Language
  root.setAttribute('lang', settings.language);
};

export default useSettings;
