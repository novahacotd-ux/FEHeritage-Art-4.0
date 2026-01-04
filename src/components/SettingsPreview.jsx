import React from 'react';
import { useSettingsContext } from '../context/SettingsContext';

const SettingsPreview = () => {
  const { settings } = useSettingsContext();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="rounded-lg bg-white/90 backdrop-blur-sm p-4 shadow-2xl border-2 border-brand-brown-200 max-w-xs">
        <h3 className="font-bold text-sm text-brand-brown-900 mb-2">
          ⚙️ Settings Preview
        </h3>
        <div className="space-y-1 text-xs text-brand-brown-600">
          <div className="flex justify-between">
            <span>Font:</span>
            <strong className="text-brand-brown-900">{settings.fontSize}</strong>
          </div>
          <div className="flex justify-between">
            <span>Theme:</span>
            <strong className="text-brand-brown-900">{settings.theme}</strong>
          </div>
          <div className="flex justify-between">
            <span>Dark Mode:</span>
            <strong className={settings.darkMode ? 'text-green-600' : 'text-gray-400'}>
              {settings.darkMode ? 'ON' : 'OFF'}
            </strong>
          </div>
          <div className="flex justify-between">
            <span>High Contrast:</span>
            <strong className={settings.highContrast ? 'text-green-600' : 'text-gray-400'}>
              {settings.highContrast ? 'ON' : 'OFF'}
            </strong>
          </div>
          <div className="flex justify-between">
            <span>Large Buttons:</span>
            <strong className={settings.largeButtons ? 'text-green-600' : 'text-gray-400'}>
              {settings.largeButtons ? 'ON' : 'OFF'}
            </strong>
          </div>
          <div className="flex justify-between">
            <span>Reduce Motion:</span>
            <strong className={settings.reduceMotion ? 'text-green-600' : 'text-gray-400'}>
              {settings.reduceMotion ? 'ON' : 'OFF'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPreview;
