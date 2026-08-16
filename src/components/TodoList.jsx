import React from 'react';
import { TodoItem } from './TodoItem';
import { Sparkles, ClipboardList, CheckCircle2, SearchX } from 'lucide-react';

export function TodoList({ todos, filter, searchQuery, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state-card glass-card animate-fade-in">
        {searchQuery ? (
          <>
            <div className="empty-state-icon-wrapper search-empty">
              <SearchX size={36} />
            </div>
            <h3 className="empty-state-title">No matching tasks found</h3>
            <p className="empty-state-desc">
              We couldn't find any tasks matching "<strong>{searchQuery}</strong>". Try clearing your search query.
            </p>
          </>
        ) : filter === 'completed' ? (
          <>
            <div className="empty-state-icon-wrapper">
              <ClipboardList size={36} />
            </div>
            <h3 className="empty-state-title">No completed tasks yet</h3>
            <p className="empty-state-desc">
              Complete some tasks from your active list to see your accomplishments here!
            </p>
          </>
        ) : filter === 'active' ? (
          <>
            <div className="empty-state-icon-wrapper success-empty">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="empty-state-title">All caught up! 🎉</h3>
            <p className="empty-state-desc">
              You have no pending active tasks. Enjoy your day or add a new goal above.
            </p>
          </>
        ) : (
          <>
            <div className="empty-state-icon-wrapper">
              <Sparkles size={36} />
            </div>
            <h3 className="empty-state-title">Your workspace is clean</h3>
            <p className="empty-state-desc">
              Create your first task using the input box above to get started with Spec-Driven task management.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="todo-list-stack" role="list" aria-label="Tasks list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
