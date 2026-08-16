import { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const TODOS_STORAGE_KEY = 'todo_items_v1';

const INITIAL_DEMO_TODOS = [
  {
    id: 'demo-1',
    title: 'Explore Spec-Driven Development workflow 📋',
    completed: true,
    priority: 'high',
    createdAt: Date.now() - 3600000 * 2,
    updatedAt: Date.now() - 3600000 * 2,
  },
  {
    id: 'demo-2',
    title: 'Test Light & Dark theme toggle in the header 🌓',
    completed: false,
    priority: 'medium',
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now() - 3600000,
  },
  {
    id: 'demo-3',
    title: 'Add a new priority task and try inline editing ✏️',
    completed: false,
    priority: 'low',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

/**
 * Custom hook to manage Todo items, filtering, search, and localStorage persistence.
 */
export function useTodos() {
  const [todos, setTodos] = useLocalStorage(TODOS_STORAGE_KEY, INITIAL_DEMO_TODOS);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt'); // 'createdAt' | 'priority' | 'title'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'

  // Add a new todo item
  const addTodo = useCallback((title, priority = 'medium') => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return false;

    const newTodo = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: trimmedTitle,
      completed: false,
      priority: priority,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    return true;
  }, [setTodos]);

  // Toggle completed state
  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: Date.now() }
          : todo
      )
    );
  }, [setTodos]);

  // Delete a single todo
  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, [setTodos]);

  // Edit an existing todo's title or priority
  const editTodo = useCallback((id, newTitle, newPriority) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return false;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title: trimmed,
              priority: newPriority || todo.priority,
              updatedAt: Date.now(),
            }
          : todo
      )
    );
    return true;
  }, [setTodos]);

  // Clear all completed todos
  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, [setTodos]);

  // Computed summary metrics
  const stats = useMemo(() => {
    const total = todos.length;
    const completedCount = todos.filter((t) => t.completed).length;
    const activeCount = total - completedCount;
    const percentComplete = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    return {
      total,
      completedCount,
      activeCount,
      percentComplete,
    };
  }, [todos]);

  // Filtered and sorted items
  const filteredTodos = useMemo(() => {
    let result = todos.filter((todo) => {
      // Status filter
      if (filter === 'active' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        return todo.title.toLowerCase().includes(query);
      }
      return true;
    });

    // Priority rank map
    const priorityWeight = { high: 3, medium: 2, low: 1 };

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'priority') {
        const diff = priorityWeight[b.priority] - priorityWeight[a.priority];
        return sortOrder === 'asc' ? -diff : diff;
      }
      if (sortBy === 'title') {
        const comp = a.title.localeCompare(b.title);
        return sortOrder === 'asc' ? comp : -comp;
      }
      // Default: createdAt
      const diff = b.createdAt - a.createdAt;
      return sortOrder === 'asc' ? -diff : diff;
    });

    return result;
  }, [todos, filter, searchQuery, sortBy, sortOrder]);

  return {
    todos: filteredTodos,
    allTodosCount: todos.length,
    stats,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
  };
}
