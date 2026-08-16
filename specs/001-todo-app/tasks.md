# Tasks: React To-Do Application with LocalStorage & Themes

**Input**: Feature specifications from `specs/001-todo-app/spec.md` and `plan.md`

**Status**: Complete

---

## Phase 1: Setup & Project Initialization

- [x] T001 Initialize React project with Vite in the workspace directory.
- [x] T002 Configure project structure (`src/components`, `src/hooks`, `src/styles`).
- [x] T003 Setup CSS Design System with theme CSS variables (`styles/variables.css`, `styles/main.css`).

---

## Phase 2: Foundational Hooks & Storage Engine

- [x] T004 Implement `useLocalStorage` hook with error handling and fallback mechanism.
- [x] T005 Implement `useTheme` hook with system preference detection (`prefers-color-scheme`) and localStorage sync.
- [x] T006 Implement `useTodos` hook with full CRUD logic, filtering, and search dispatchers.

---

## Phase 3: User Story 1 (P1) - Core Task Management & US2 (P1) - LocalStorage Persistence 🎯 MVP

- [x] T007 [P] [US1] Create `TodoInput` component with validation and submit handler.
- [x] T008 [P] [US1] Create `TodoItem` component supporting completion toggle and delete actions.
- [x] T009 [US1] Create `TodoList` component with animated list rendering and empty state visuals.
- [x] T010 [US2] Connect `useLocalStorage` to `useTodos` to guarantee real-time persistence.

---

## Phase 4: User Story 3 (P2) - Dark & Light Theme Customization

- [x] T011 [P] [US3] Build `ThemeToggle` component with animated sun/moon/system icon transitions.
- [x] T012 [US3] Integrate theme attributes (`data-theme="light|dark"`) on root document container.
- [x] T013 [US3] Verify zero flash on reload and complete palette transitions across all elements.

---

## Phase 5: User Story 4 (P2) - Filtering, Search & Stats

- [x] T014 [P] [US4] Create `FilterBar` component with All / Active / Completed status tabs and search input.
- [x] T015 [P] [US4] Create `StatsCard` component with completion progress meter and active counter.
- [x] T016 [US4] Implement "Clear Completed" bulk action.

---

## Phase 6: User Story 5 (P3) - Priority Badges & Inline Editing

- [x] T017 [US5] Add priority selection (`High`, `Medium`, `Low`) to `TodoInput` and priority badges in `TodoItem`.
- [x] T018 [US5] Implement inline double-click editing mode with keyboard shortcuts (`Enter` to save, `Esc` to cancel).

---

## Phase 7: Polish, Aesthetics & Verification

- [x] T019 Implement smooth micro-interactions (checkbox ripple, hover elevations, delete fade-out).
- [x] T020 Responsive design check across mobile and desktop viewports.
- [x] T021 Comprehensive manual and automated verification against all acceptance criteria in `spec.md`.
