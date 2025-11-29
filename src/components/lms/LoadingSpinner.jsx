import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', fullScreen = false, message = 'Đang tải...' }) => {
  const Component = (
    <div className={`loading-spinner-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className={`loading-spinner ${size}`}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );

  return Component;
};

export default LoadingSpinner;
