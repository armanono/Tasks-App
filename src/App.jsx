import { useState } from 'react';
import BottomNavigation from './components/BottomNavigation/BottomNavigation';
import SettingsPage from './components/SettingsPage/SettingsPage';
import Analytics from './components/Analytics/Analytics';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { useTasks } from './hooks/useTasks';
import { useAppSettings } from './hooks/useAppSettings';

function App() {
  // controls which page is displayed
  const [activeTab, setActiveTab] = useState('tasks');
  // settings and theme
  const { settings, setSettings, toggleTheme } = useAppSettings();
  const taskState = useTasks();

  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return (
          <HomePage
            {...taskState}
            settings={settings}
            toggleTheme={toggleTheme}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            settings={settings}
            onUpdateSettings={setSettings}
          />
        );
      case 'analytics':
        return (
          <Analytics
            tasks={taskState.tasks}
            tags={settings.tags}
          />
        );
      case 'profile':
        return <ProfilePage />;
      default:
        return null; // Handle unknown tab if necessary
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-900 p-0 sm:p-4 font-display">
      <div className="w-full max-w-[400px] bg-background-light dark:bg-background-dark h-dvh sm:h-[800px] sm:max-h-dvh sm:rounded-3xl shadow-2xl overflow-hidden relative flex flex-col selection:bg-primary/30 text-slate-900 dark:text-white ring-1 ring-white/10">

        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative">
          {renderContent()}
        </div>
        <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}

export default App;

