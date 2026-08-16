# Data Model: React To-Do Application

**Feature**: `001-todo-app` | **Date**: 2026-08-16 | **Status**: Complete

---

## 1. Entities & TypeScript Interfaces

### TodoItem

Represents an individual task item managed by the user.

```typescript
export type PriorityLevel = 'low' | 'medium' | 'high';

export interface TodoItem {
  id: string;             // Unique identifier (crypto.randomUUID or timestamp)
  title: string;          // Task description / title
  completed: boolean;     // True if marked complete
  priority: PriorityLevel;// Task priority flag ('low' | 'medium' | 'high')
  createdAt: number;      // Epoch timestamp in milliseconds
  updatedAt: number;      // Epoch timestamp of last edit
}
```

### ThemeMode

Represents the user's active theme or preference setting.

```typescript
export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';
```

### Filter & Sort State

Represents the active filter and search state applied to the task view.

```typescript
export type FilterStatus = 'all' | 'active' | 'completed';

export interface ViewFilterState {
  status: FilterStatus;
  searchQuery: string;
  sortBy: 'createdAt' | 'priority' | 'title';
  sortDirection: 'asc' | 'desc';
}
```

---

## 2. Storage Schema & LocalStorage Contracts

### Keys Used in `window.localStorage`

| Key | Type | Description | Default Fallback |
| :--- | :--- | :--- | :--- |
| `todo_items_v1` | `TodoItem[]` (JSON stringified) | Array of user todo items | `[]` (or sample starter tasks on first launch) |
| `todo_theme_v1` | `ThemeMode` (`'light' \| 'dark' \| 'system'`) | Stored theme preference | `'system'` |
| `todo_filter_v1` | `FilterStatus` | Remembered last active tab | `'all'` |

### Serialization & Validation Logic

- **On Load:** Parse JSON string inside a `try/catch` block. If parsing fails or data is not an array, return empty array fallback and log a warning.
- **On Save:** Wrap `localStorage.setItem` in a `try/catch` block to handle quota exceeded errors smoothly without breaking the UI state.
