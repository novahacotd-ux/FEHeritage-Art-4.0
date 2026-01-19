import React from 'react';
import './StatCard.css';

const StatCard = ({ icon, title, value, subtitle, trend, color = 'primary' }) => {
  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-card-icon">
        {icon}
      </div>
      <div className="stat-card-content">
        <h3 className="stat-card-title">{title}</h3>
        <div className="stat-card-value">{value}</div>
        {subtitle && <p className="stat-card-subtitle">{subtitle}</p>}
        {trend && (
          <div className={`stat-card-trend ${trend.direction}`}>
            <span className="trend-icon">
              {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'}
            </span>
            <span className="trend-value">{trend.value}</span>
            <span className="trend-label">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
