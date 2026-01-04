import React, { createContext, useContext } from 'react';
import { useSettings } from '../hooks/useSettings';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const settingsHook = useSettings();

  return (
    <SettingsContext.Provider value={settingsHook}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within SettingsProvider');
  }
  return context;
};

export default SettingsContext;
