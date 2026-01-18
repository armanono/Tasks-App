# Execution Plan: Task Manager Application

This document outlines the phased execution plan for building the Task Manager Application based on the [PRD](PRD.md).

## Phase 1: Project Initialization & Foundation
**Goal:** Set up the project structure, basic components, and verify the environment is ready for development.
**Complexity:** Simple

### Tasks
- [x] **Initialize Project**
    - [x] Create React + Vite project (if not already created).
    - [x] Clean up boilerplate code.
    - [x] Install necessary dependencies (e.g., `prop-types` if not using TS, `clsx` for classes).
    - [x] **Acceptance Criteria:** `npm run dev` starts the app without errors. Page title is updated to "Task Manager".
- [x] **Directory Structure & Types**
    - [x] Create component folders (`src/components`, `src/hooks`, `src/utils`).
    - [x] Define Task data structure.
    - [x] **Acceptance Criteria:** Directory structure is clean and organized.
    - **Code Hint:**
      ```javascript
      // Task Structure
      {
        id: "uuid-string",
        text: "Task description",
        completed: boolean
      }
      ```
- [x] **Basic Layout Implementation**
    - [x] Create main `App` layout shell (Header, Main Content Area).
    - [x] Implement responsiveness basics (container, padding).
    - [x] **Acceptance Criteria:** Application has a header "Task Manager" and a central content area.
    - **Commit:** `feat: setup project structure and basic layout`

### Checkpoint
- Project runs locally.
- Basic visual shell is visible.

---

## Phase 2: Core Task Management (CRUD)
**Goal:** Implement the ability to create, read, update (toggle), and delete tasks with data persistence. Key User Stories: 1, 2, 4, 7.
**Complexity:** Medium
**Prerequisites:** Phase 1

### Tasks
- [/] **State Management & LocalStorage**
    - [/] Implement `useState` for tasks in `App.jsx`.
    - [/] Implement `useEffect` for reading/writing to `localStorage` (PRD 4.3.1).
    - [ ] **Acceptance Criteria:** Tasks persist on browser refresh.
    - **Code Hint:**
      ```javascript
      useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
        setTasks(saved);
      }, []);
      ```
    - **Commit:** `feat: implement state management and local storage persistence`
- [x] **Add Task Functionality**
    - [x] Create `TaskInput` component.
    - [x] Implement `addTask` function in `App.jsx`.
    - [x] Validate non-empty input (PRD 4.1.1).
    - [x] **Acceptance Criteria:** User can add a task, input clears, empty input recognized and ignored.
    - **Commit:** `feat: implement add task functionality`
- [x] **Task List & Item Rendering**
    - [x] Create `TaskList` and `TaskItem` components.
    - [x] Render list of tasks from state.
    - [x] **Acceptance Criteria:** Tasks added appear in the list immediately.
    - **Commit:** `feat: implement task list rendering`
- [x] **Toggle Completion**
    - [x] Add checkbox to `TaskItem`.
    - [x] Implement `toggleTask` function.
    - [x] Apply visual styling for completed tasks (strikethrough/opacity) (PRD 4.1.2).
    - [x] **Acceptance Criteria:** Clicking checkbox toggles state and updates UI.
    - **Commit:** `feat: implement toggle task completion`
- [x] **Delete Task**
    - [x] Add delete button to `TaskItem`.
    - [x] Implement `deleteTask` function.
    - [x] **Acceptance Criteria:** (PRD 4.1.4) Clicking delete removes task immediately.
    - **Commit:** `feat: implement delete task functionality`

### Checkpoint
- Can add, view, toggle, and delete tasks.
- Data persists on refresh.

---

## Phase 3: Advanced Task Features
**Goal:** Implement editing, filtering, and task counting. Key User Stories: 3, 5, 6.
**Complexity:** Medium/Complex
**Prerequisites:** Phase 2

### Tasks
- [x] **Edit Task**
    - [x] Add edit mode state to `TaskItem` (PRD 4.1.3).
    - [x] Implement `updateTask` function in `App.jsx`.
    - [x] Handle save (Enter/Blur) and cancel (Escape).
    - [x] **Acceptance Criteria:** Double-click or edit button enables editing; changes save correctly.
    - **Commit:** `feat: implement task editing`
- [x] **Task Filtering**
    - [x] Create `FilterButtons` component.
    - [x] Add filter state ('all', 'active', 'completed') to `App.jsx` (PRD 4.2.1).
    - [x] Implement filtering logic in `App.jsx`.
    - [x] **Acceptance Criteria:** Can switches views; UI shows only relevant tasks.
    - **Commit:** `feat: implement task filtering`
- [x] **Task Counter**
    - [x] Implement active task counting logic.
    - [x] Display count in UI (PRD 4.2.2).
    - [x] **Acceptance Criteria:** Shows correct "X tasks remaining" count.
    - **Commit:** `feat: add task counter`

### Checkpoint
- All core functional requirements met.
- App is feature-complete vs PRD.

---

## Phase 4: UI/UX Polish & Styling
**Goal:** Ensure the application looks good, feels responsive, and matches Design Guidelines.
**Complexity:** Medium
**Prerequisites:** Phase 3

### Tasks
- [ ] **Styling Overhaul**
    - [ ] Apply "Visual Design Guidelines" (PRD 7.2) - colors, spacing, typography.
    - [ ] Improve hover states, focus states (a11y).
    - [ ] Polish responsive layout (mobile friendliness).
    - **Acceptance Criteria:** App looks polished, clean, and modern.
    - **Commit:** `style: polish ui and improve responsiveness`
- [ ] **Empty States & Feedback**
    - [ ] Implement "No tasks yet" empty state (PRD 8.3).
    - [ ] Ensure clear visual feedback for actions.
    - **Acceptance Criteria:** Empty lists have friendly messaging.
    - **Commit:** `feat: add empty states and feedback`

### Checkpoint
- App is polished and ready for delivery.

---

## Phase 5: Bonus & Cleanup (Optional)
**Goal:** Add bonus features, tests, and final cleanup.
**Complexity:** Variable
**Prerequisites:** Phase 4

### Tasks
- [ ] **Unit Testing**
    - [ ] Setup Vitest + React Testing Library.
    - [ ] Add tests for `TaskInput` and `TaskItem` (PRD 9.2).
    - **Acceptance Criteria:** Core components have basic unit tests passing.
    - **Commit:** `test: add unit tests`
- [ ] **Clear Completed**
    - [ ] Add "Clear Completed" button.
    - [ ] Implement bulk delete logic.
    - **Commit:** `feat: add clear completed button`
- [ ] **Final Code Web Review**
    - [ ] Remove console logs.
    - [ ] Enforce consistent formatting.
    - **Commit:** `chore: final code cleanup`
