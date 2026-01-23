# Task Manager Application 📝

A modern, feature-rich task management application built with React 19 and Vite. This app provides a beautiful, intuitive interface for managing daily tasks with persistent local storage, dark mode, analytics, and advanced features like tags and due dates.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?logo=tailwind-css)

## ✨ Features

### Core Functionality
- ✅ **Task Management**: Add, edit, delete, and toggle task completion
- 🔍 **Smart Filtering**: View all tasks, active only, or completed only
- 💾 **Persistent Storage**: All data saved locally using localStorage
- 📊 **Task Counter**: Real-time count of active tasks

### Advanced Features
- 🌙 **Dark Mode**: Beautiful dark theme with smooth transitions
- 🎊 **Confetti Animation**: Celebratory effect when completing tasks
- 🏷️ **Custom Tags**: Organize tasks with colorful, customizable tags
- 📅 **Due Dates**: Set and track task deadlines with multiple date format options
- 📈 **Analytics Dashboard**: Visual insights with charts for task distribution, completion rates, and urgency breakdown
- 🎨 **Modern UI**: Glassmorphism effects, smooth animations, and responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/react-todo-app.git
   cd react-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
npm run preview
```

## 📦 Component Architecture

### Core Components

| Component | Responsibility |
|-----------|---------------|
| **App** | Root component managing global state, routing between pages, and theme |
| **HomePage** | Main task view displaying input, filters, and task list |
| **TaskInput** | Input field for creating new tasks with validation |
| **TaskList** | Container rendering all filtered tasks |
| **TaskItem** | Individual task display with checkbox, text, tags, date, and actions |
| **FilterButtons** | Three-button filter (All/Active/Completed) with task counts |

### Sub-Components (TaskItem)

| Component | Responsibility |
|-----------|---------------|
| **TaskCheckbox** | Checkbox for toggling task completion status |
| **TaskContent** | Displays and handles inline editing of task text |
| **TaskActions** | Edit and delete buttons for task management |
| **TaskTags** | Tag selector and display with color-coded badges |
| **TaskDate** | Date picker and display with multiple format options |

### Page Components

| Component | Responsibility |
|-----------|---------------|
| **Analytics** | Dashboard showing task statistics with charts (pie, bar, completion rate) |
| **SettingsPage** | User preferences for date format, theme, and tag management |
| **DateFormatSettings** | Date format selection (Default/European/American) |
| **TagSettings** | Custom tag creation and management with color selection |
| **ProfilePage** | User profile and information display |
| **BottomNavigation** | Bottom tab navigation for switching between pages |

### Custom Hooks

| Hook | Responsibility |
|------|---------------|
| **useTasks** | Manages all task state, CRUD operations, filtering, and localStorage persistence |
| **useAppSettings** | Manages app settings (theme, date format, tags) with localStorage sync |
| **useTaskItem** | Handles individual task interactions (editing, deleting, tag/date management) |
| **useAnalytics** | Processes task data for analytics visualizations |
| **useSettingsForm** | Manages settings form state and validation |

## 🗂️ Project Structure

```
react-todo-app/
├── src/
│   ├── components/
│   │   ├── Analytics/
│   │   ├── BottomNavigation/
│   │   ├── FilterButtons/
│   │   ├── HomePage/
│   │   ├── ProfilePage/
│   │   ├── SettingsPage/
│   │   ├── TaskInput/
│   │   ├── TaskItem/
│   │   └── TaskList/
│   ├── hooks/
│   │   ├── useAnalytics.js
│   │   ├── useAppSettings.js
│   │   ├── useSettingsForm.js
│   │   ├── useTaskItem.js
│   │   └── useTasks.js
│   ├── utils/
│   │   ├── dateHelpers.js
│   │   └── demoData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Technologies Used

- **React 19.2.0** - UI library with latest features
- **Vite 7.2.4** - Fast build tool and dev server
- **TailwindCSS 3.4.17** - Utility-first CSS framework
- **Recharts 3.6.0** - Charting library for analytics
- **UUID 13.0.0** - Unique ID generation for tasks
- **Canvas Confetti 1.9.4** - Celebration animations
- **PropTypes** - Runtime type checking
- **LocalStorage API** - Client-side data persistence


## 🧪 Testing

This project includes comprehensive tests for components using Vitest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Coverage

- **TaskInput** (10 tests): Input validation, submission, clearing, keyboard interactions
- **TaskItem** (12 tests): Toggling, deleting, editing, styling, tags, dates
- **FilterButtons** (10 tests): Filter switching, highlighting, task counts

**Total: 32 tests - All passing ✅**








