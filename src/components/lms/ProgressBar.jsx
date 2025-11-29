import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ value, max = 100, color = 'primary', showLabel = true, size = 'medium' }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={`progress-bar-container ${size}`}>
      {showLabel && (
        <div className="progress-label">
          <span className="progress-value">{value}/{max}</span>
          <span className="progress-percentage">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="progress-track">
        <div 
          className={`progress-fill progress-${color}`}
          style={{ width: `${percentage}%` }}
        >
          <div className="progress-shine"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
