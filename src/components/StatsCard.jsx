import React from 'react';
import { Target, CheckCircle, Clock, Award } from 'lucide-react';

export function StatsCard({ stats }) {
  const { total, completedCount, activeCount, percentComplete } = stats;

  return (
    <div className="stats-card glass-card">
      <div className="stats-header">
        <div className="stats-title-group">
          <Target className="stats-icon" size={20} />
          <span className="stats-label">Daily Progress</span>
        </div>
        <div className="stats-percentage-badge">
          {percentComplete === 100 && total > 0 ? (
            <span className="all-done-badge">
              <Award size={14} /> All Done!
            </span>
          ) : (
            <span className="percent-text">{percentComplete}% Completed</span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-track" role="progressbar" aria-valuenow={percentComplete} aria-valuemin="0" aria-valuemax="100">
        <div
          className="progress-fill"
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      {/* Numerical Counters */}
      <div className="stats-metrics-grid">
        <div className="metric-pill">
          <span className="metric-num">{total}</span>
          <span className="metric-label">Total Tasks</span>
        </div>
        <div className="metric-pill active-pill">
          <Clock size={14} className="metric-icon-active" />
          <span className="metric-num">{activeCount}</span>
          <span className="metric-label">Remaining</span>
        </div>
        <div className="metric-pill completed-pill">
          <CheckCircle size={14} className="metric-icon-done" />
          <span className="metric-num">{completedCount}</span>
          <span className="metric-label">Completed</span>
        </div>
      </div>
    </div>
  );
}
