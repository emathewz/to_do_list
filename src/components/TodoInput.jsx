import React, { useState, useRef } from 'react';
import { Plus, Flame, ShieldAlert, Flag } from 'lucide-react';

export function TodoInput({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setHasError(true);
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    const success = onAddTodo(trimmed, priority);
    if (success) {
      setTitle('');
      setHasError(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form className="todo-input-form glass-card" onSubmit={handleSubmit}>
      <div className={`input-field-wrapper ${hasError ? 'input-error' : ''}`}>
        <input
          ref={inputRef}
          type="text"
          className="todo-main-input"
          placeholder="What needs to be accomplished today?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (hasError) setHasError(false);
          }}
          onKeyDown={handleKeyDown}
          aria-label="New task title"
        />

        <button
          type="submit"
          className="btn-add-task"
          aria-label="Add new task"
          title="Add task (Enter)"
        >
          <Plus size={20} />
          <span>Add</span>
        </button>
      </div>

      {hasError && (
        <p className="input-error-message animate-fade-in" role="alert">
          Please enter a task title before submitting.
        </p>
      )}

      {/* Priority Selection Strip */}
      <div className="priority-select-row">
        <span className="priority-select-label">Priority:</span>
        <div className="priority-buttons-group">
          <button
            type="button"
            className={`priority-btn priority-high ${priority === 'high' ? 'active' : ''}`}
            onClick={() => setPriority('high')}
            aria-pressed={priority === 'high'}
          >
            <Flame size={13} />
            <span>High</span>
          </button>

          <button
            type="button"
            className={`priority-btn priority-medium ${priority === 'medium' ? 'active' : ''}`}
            onClick={() => setPriority('medium')}
            aria-pressed={priority === 'medium'}
          >
            <Flag size={13} />
            <span>Medium</span>
          </button>

          <button
            type="button"
            className={`priority-btn priority-low ${priority === 'low' ? 'active' : ''}`}
            onClick={() => setPriority('low')}
            aria-pressed={priority === 'low'}
          >
            <ShieldAlert size={13} />
            <span>Low</span>
          </button>
        </div>
      </div>
    </form>
  );
}
