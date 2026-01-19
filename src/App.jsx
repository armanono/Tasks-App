import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskInput from './components/TaskInput/TaskInput';
import TaskList from './components/TaskList/TaskList';
import FilterButtons from './components/FilterButtons/FilterButtons';
import BottomNavigation from './components/BottomNavigation/BottomNavigation';
import SettingsPage from './components/SettingsPage/SettingsPage';

const STORAGE_KEY = 'tasks';
const SETTINGS_KEY = 'settings';

function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('tasks');

  // Settings State
  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      if (!savedSettings) {
        return {
          dateFormat: 'PPP',
          theme: 'light',
          tags: [
            { name: 'General', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
            { name: 'Priority', color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' },
            { name: 'Work', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' }
          ]
        };
      }

      const parsed = JSON.parse(savedSettings);

      // MIGRATION: Convert string tags to objects if needed
      if (parsed.tags && parsed.tags.length > 0 && typeof parsed.tags[0] === 'string') {
        const colors = [
          'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
          'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
          'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
          'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
          'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
          'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
          'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
        ];

        parsed.tags = parsed.tags.map((tag, index) => ({
          name: tag,
          color: colors[index % colors.length]
        }));
      }

      return parsed;

    } catch {
      return {
        dateFormat: 'PPP',
        theme: 'light',
        tags: [
          { name: 'General', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
          { name: 'Priority', color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' },
          { name: 'Work', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' }
        ]
      };
    }
  });

  // Load initial state from localStorage
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Failed to load tasks from localStorage', error);
      return [];
    }
  });
  const [filter, setFilter] = useState('all');

  // Save to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage', error);
    }
  }, [tasks]);

  // Save settings and Apply Theme
  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

    // Apply Theme
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const addTask = (text) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
      tags: [], // Prepare for tags
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const toggleTask = (id) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const updateTask = (id, updates) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const clearCompleted = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  return (
    // Mobile Viewport Constraint
    <div className="flex justify-center items-center min-h-screen bg-neutral-900 p-0 sm:p-4 font-display">
      <div className="w-full max-w-[400px] bg-background-light dark:bg-background-dark h-dvh sm:h-[800px] sm:max-h-dvh sm:rounded-3xl shadow-2xl overflow-hidden relative flex flex-col selection:bg-primary/30 text-slate-900 dark:text-white ring-1 ring-white/10">

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative">

          {/* VIEW: TASKS */}
          {activeTab === 'tasks' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Header Area */}
              <header className="flex items-end justify-between px-6 pt-8 pb-4">
                <div className="flex flex-col">
                  <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1 tracking-wide uppercase">Today's Schedule</h2>
                  <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">
                    Good morning! <span className="inline-block animate-pulse">☀️</span>
                  </h1>
                </div>

                <button
                  onClick={() => setSettings(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))}
                  className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl ring-1 ring-slate-900/10 dark:ring-white/20 transition-all group"
                  aria-label="Toggle Theme"
                >
                  <div className={`transition-transform duration-500 rotate-0 dark:-rotate-90`}>
                    <span className="material-symbols-outlined text-2xl text-orange-500 dark:hidden">light_mode</span>
                    <span className="material-symbols-outlined text-2xl text-blue-400 hidden dark:inline-block">dark_mode</span>
                  </div>
                </button>
              </header>

              {/* Tactile Input Area */}
              <TaskInput onAdd={addTask} />

              {/* Filter Pills */}
              <FilterButtons currentFilter={filter} setFilter={setFilter} />

              {/* Spacious Task List */}
              <div className="px-6 pb-32 flex flex-col gap-4">
                <TaskList
                  tasks={filteredTasks}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onUpdate={updateTask}
                  emptyMessage={
                    <div className="text-center py-10 text-slate-500 dark:text-slate-400 opacity-60">
                      <p>No tasks found.</p>
                    </div>
                  }
                  dateFormat={settings.dateFormat}
                  tags={settings.tags} // Pass available tags
                />

                {(filter !== 'active' && tasks.some(t => t.completed)) && (
                  <div className="flex justify-center mt-4 mb-8">
                    <button
                      onClick={clearCompleted}
                      className="text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors uppercase tracking-wider"
                    >
                      Clear Completed ({tasks.filter(t => t.completed).length})
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW: SETTINGS */}
          {activeTab === 'settings' && (
            <SettingsPage settings={settings} onUpdateSettings={setSettings} />
          )}

          {/* VIEW: ANALYTICS (Placeholder) */}
          {activeTab === 'analytics' && (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 p-6 text-center animate-in fade-in zoom-in">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-50">bar_chart</span>
              <h2 className="text-xl font-bold mb-2">Analytics</h2>
              <p>Coming soon...</p>
            </div>
          )}

          {/* VIEW: PROFILE (Placeholder) */}
          {activeTab === 'profile' && (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 p-6 text-center animate-in fade-in zoom-in">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-50">person</span>
              <h2 className="text-xl font-bold mb-2">My Profile</h2>
              <p>Coming soon...</p>
            </div>
          )}

        </div>

        {/* Bottom Navigation */}
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  )
}

export default App
