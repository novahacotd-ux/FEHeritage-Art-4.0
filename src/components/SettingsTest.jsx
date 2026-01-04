import React from 'react';
import { useSettingsContext } from '../context/SettingsContext';

/**
 * Test component to verify settings are working
 * This component displays all current settings and allows quick testing
 */
const SettingsTest = () => {
  const { settings, updateSetting, resetSettings } = useSettingsContext();

  const quickTests = [
    {
      name: 'Dark Mode',
      key: 'darkMode',
      test: () => {
        const isDark = document.documentElement.classList.contains('dark-mode');
        return settings.darkMode === isDark ? '✅ Working' : '❌ Not applied';
      }
    },
    {
      name: 'Font Size',
      key: 'fontSize',
      test: () => {
        const hasClass = document.documentElement.classList.contains(`font-${settings.fontSize}`);
        return hasClass ? '✅ Working' : '❌ Not applied';
      }
    },
    {
      name: 'Theme',
      key: 'theme',
      test: () => {
        const hasClass = document.documentElement.classList.contains(`theme-${settings.theme}`);
        return hasClass ? '✅ Working' : '❌ Not applied';
      }
    },
    {
      name: 'High Contrast',
      key: 'highContrast',
      test: () => {
        const hasClass = document.documentElement.classList.contains('high-contrast');
        return settings.highContrast === hasClass ? '✅ Working' : '❌ Not applied';
      }
    },
    {
      name: 'Large Buttons',
      key: 'largeButtons',
      test: () => {
        const hasClass = document.documentElement.classList.contains('large-buttons');
        return settings.largeButtons === hasClass ? '✅ Working' : '❌ Not applied';
      }
    },
    {
      name: 'Reduce Motion',
      key: 'reduceMotion',
      test: () => {
        const hasClass = document.documentElement.classList.contains('reduce-motion');
        return settings.reduceMotion === hasClass ? '✅ Working' : '❌ Not applied';
      }
    }
  ];

  return (
    <div className="fixed top-4 left-4 z-50 max-w-md">
      <div className="bg-white rounded-lg shadow-2xl border-2 border-blue-500 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-blue-600">⚙️ Settings Test Panel</h2>
          <button
            onClick={resetSettings}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            Reset All
          </button>
        </div>

        <div className="space-y-3">
          {/* Quick Toggle Tests */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-700">Quick Toggles:</h3>

            <button
              onClick={() => updateSetting('darkMode', !settings.darkMode)}
              className={`w-full px-3 py-2 rounded text-sm font-medium ${settings.darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
                }`}
            >
              🌙 Dark Mode: {settings.darkMode ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => updateSetting('highContrast', !settings.highContrast)}
              className={`w-full px-3 py-2 rounded text-sm font-medium ${settings.highContrast ? 'bg-black text-yellow-300 border-2 border-white' : 'bg-gray-200 text-gray-800'
                }`}
            >
              ⚫ High Contrast: {settings.highContrast ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => updateSetting('largeButtons', !settings.largeButtons)}
              className={`w-full px-3 py-2 rounded text-sm font-medium ${settings.largeButtons ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'
                }`}
            >
              🔘 Large Buttons: {settings.largeButtons ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => updateSetting('reduceMotion', !settings.reduceMotion)}
              className={`w-full px-3 py-2 rounded text-sm font-medium ${settings.reduceMotion ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
                }`}
            >
              🔇 Reduce Motion: {settings.reduceMotion ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Font Size:</label>
            <select
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Theme:</label>
            <select
              value={settings.theme}
              onChange={(e) => updateSetting('theme', e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              <option value="default">Default</option>
              <option value="warm">Warm</option>
              <option value="cool">Cool</option>
              <option value="classic">Classic</option>
            </select>
          </div>

          {/* Test Results */}
          <div className="border-t-2 pt-3">
            <h3 className="font-semibold text-sm text-gray-700 mb-2">Status Checks:</h3>
            <div className="space-y-1 text-xs">
              {quickTests.map(test => (
                <div key={test.key} className="flex justify-between items-center">
                  <span className="text-gray-600">{test.name}:</span>
                  <span className="font-mono">{test.test()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Classes */}
          <div className="border-t-2 pt-3">
            <h3 className="font-semibold text-sm text-gray-700 mb-2">DOM Classes:</h3>
            <div className="text-xs bg-gray-100 p-2 rounded max-h-32 overflow-auto">
              <code>{document.documentElement.className || 'No classes'}</code>
            </div>
          </div>

          {/* LocalStorage Data */}
          <div className="border-t-2 pt-3">
            <h3 className="font-semibold text-sm text-gray-700 mb-2">Settings Data:</h3>
            <div className="text-xs bg-gray-100 p-2 rounded max-h-32 overflow-auto">
              <pre>{JSON.stringify(settings, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTest;
