import React from 'react';
import './ViewToggle.css';

const ViewToggle = ({ view, onViewChange }) => {
  return (
    <div className="view-toggle">
      <button
        className={`view-toggle-btn ${view === 'grid' ? 'active' : ''}`}
        onClick={() => onViewChange('grid')}
        aria-label="Grid view"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <rect x="2" y="2" width="6" height="6" rx="1"/>
          <rect x="12" y="2" width="6" height="6" rx="1"/>
          <rect x="2" y="12" width="6" height="6" rx="1"/>
          <rect x="12" y="12" width="6" height="6" rx="1"/>
        </svg>
        <span>Grid</span>
      </button>
      <button
        className={`view-toggle-btn ${view === 'list' ? 'active' : ''}`}
        onClick={() => onViewChange('list')}
        aria-label="List view"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <rect x="2" y="3" width="16" height="2" rx="1"/>
          <rect x="2" y="9" width="16" height="2" rx="1"/>
          <rect x="2" y="15" width="16" height="2" rx="1"/>
        </svg>
        <span>List</span>
      </button>
    </div>
  );
};

export default ViewToggle;
