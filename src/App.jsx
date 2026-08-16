import React from 'react';
import { useTheme } from './hooks/useTheme';
import { useTodos } from './hooks/useTodos';
import { Header } from './components/Header';
import { StatsCard } from './components/StatsCard';
import { TodoInput } from './components/TodoInput';
import { FilterBar } from './components/FilterBar';
import { TodoList } from './components/TodoList';
import { BookOpen, CheckSquare, Sparkles } from 'lucide-react';

export function App() {
  const { themeMode, resolvedTheme, toggleTheme, setTheme } = useTheme();
  const {
    todos,
    allTodosCount,
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
  } = useTodos();

  return (
    <div className="app-viewport">
      <main className="app-wrapper">
        {/* Header with Branding and Theme Switcher */}
        <Header
          themeMode={themeMode}
          resolvedTheme={resolvedTheme}
          toggleTheme={toggleTheme}
          setTheme={setTheme}
          stats={stats}
        />

        {/* Real-Time Stats & Progress Meter */}
        <StatsCard stats={stats} />

        {/* Task Creation Input Bar */}
        <TodoInput onAddTodo={addTodo} />

        {/* Filter, Search & Sorting Controls (Shown when todos exist or search active) */}
        {(allTodosCount > 0 || searchQuery) && (
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            stats={stats}
            onClearCompleted={clearCompleted}
          />
        )}

        {/* Animated Task List / Empty States */}
        <TodoList
          todos={todos}
          filter={filter}
          searchQuery={searchQuery}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {/* Spec-Driven Development Footer */}
        <footer className="app-footer text-center" style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={14} style={{ color: 'var(--accent-solid)' }} />
            Built with <strong>Spec-Driven Development (SDD)</strong> • LocalStorage Synced
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
