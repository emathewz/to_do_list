import React from 'react';
import { Search, X, Trash2, ArrowUpDown } from 'lucide-react';

export function FilterBar({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  stats,
  onClearCompleted,
}) {
  const { total, activeCount, completedCount } = stats;

  return (
    <div className="filter-bar-container glass-card">
      {/* Search Input */}
      <div className="search-box-wrapper">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          className="search-input"
          placeholder="Search your tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search tasks"
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => setSearchQuery('')}
            title="Clear search"
            aria-label="Clear search query"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="filter-actions-row">
        {/* Status Tabs */}
        <div className="status-tabs-group" role="tablist" aria-label="Filter tasks by status">
          <button
            type="button"
            role="tab"
            aria-selected={filter === 'all'}
            className={`status-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <span>All</span>
            <span className="tab-count">{total}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={filter === 'active'}
            className={`status-tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            <span>Active</span>
            <span className="tab-count">{activeCount}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={filter === 'completed'}
            className={`status-tab ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            <span>Completed</span>
            <span className="tab-count">{completedCount}</span>
          </button>
        </div>

        {/* Sort and Bulk Action Controls */}
        <div className="filter-controls-right">
          <div className="sort-select-wrapper">
            <ArrowUpDown size={14} className="sort-icon" />
            <select
              className="sort-dropdown"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              aria-label="Sort tasks by"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="priority-desc">Highest Priority</option>
              <option value="priority-asc">Lowest Priority</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>

          {completedCount > 0 && (
            <button
              type="button"
              className="btn-clear-completed"
              onClick={onClearCompleted}
              title="Delete all completed tasks"
              aria-label="Clear completed tasks"
            >
              <Trash2 size={13} />
              <span>Clear Done ({completedCount})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
