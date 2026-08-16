import React, { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Edit3, X, CheckCheck, Flame, Flag, ShieldAlert } from 'lucide-react';

export function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed) {
      onEdit(todo.id, trimmed, editPriority);
      setIsEditing(false);
    } else {
      // Revert if empty
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Helper for priority badge presentation
  const getPriorityBadge = (p) => {
    switch (p) {
      case 'high':
        return (
          <span className="priority-badge badge-high" title="High Priority">
            <Flame size={11} /> High
          </span>
        );
      case 'low':
        return (
          <span className="priority-badge badge-low" title="Low Priority">
            <ShieldAlert size={11} /> Low
          </span>
        );
      default:
        return (
          <span className="priority-badge badge-medium" title="Medium Priority">
            <Flag size={11} /> Med
          </span>
        );
    }
  };

  // Format relative timestamp
  const formatTime = (timestamp) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div
      className={`todo-item-row glass-card ${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
    >
      {/* Checkbox */}
      <button
        type="button"
        className={`custom-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
        title={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && <Check size={14} className="checkbox-icon" />}
      </button>

      {/* Content or Edit Field */}
      {isEditing ? (
        <div className="todo-edit-container">
          <input
            ref={editInputRef}
            type="text"
            className="todo-edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Edit task title"
          />

          <div className="edit-actions-row">
            <div className="edit-priority-selector">
              {['high', 'medium', 'low'].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`edit-priority-pill ${editPriority === p ? 'active' : ''} priority-${p}`}
                  onClick={() => setEditPriority(p)}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="edit-buttons-group">
              <button
                type="button"
                className="btn-edit-save"
                onClick={handleSave}
                title="Save (Enter)"
                aria-label="Save changes"
              >
                <CheckCheck size={14} />
              </button>
              <button
                type="button"
                className="btn-edit-cancel"
                onClick={handleCancel}
                title="Cancel (Esc)"
                aria-label="Cancel editing"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="todo-content-area"
          onDoubleClick={() => setIsEditing(true)}
          title="Double click to edit"
        >
          <div className="todo-title-row">
            <span className="todo-text">{todo.title}</span>
            {getPriorityBadge(todo.priority)}
          </div>
          <span className="todo-meta-time">{formatTime(todo.createdAt)}</span>
        </div>
      )}

      {/* Row Actions */}
      {!isEditing && (
        <div className="todo-actions-cluster">
          <button
            type="button"
            className="todo-action-btn btn-edit"
            onClick={() => setIsEditing(true)}
            title="Edit task"
            aria-label={`Edit ${todo.title}`}
          >
            <Edit3 size={15} />
          </button>
          <button
            type="button"
            className="todo-action-btn btn-delete"
            onClick={() => onDelete(todo.id)}
            title="Delete task"
            aria-label={`Delete ${todo.title}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
