import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import './App.css'

const STORAGE_KEY = 'tasks';

function App() {
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

  const addTask = (text) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
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

  const updateTask = (id, newText) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
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

  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.length - activeCount;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>
      <main className="app-main">
        <TaskInput onAdd={addTask} />
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={updateTask}
          emptyMessage={
            tasks.length === 0
              ? "No tasks yet. Add one above!"
              : `No ${filter === 'all' ? '' : filter} tasks found.`
          }
        />

        <div className="app-footer">
          <p className="task-count">
            {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
          </p>
          <FilterButtons currentFilter={filter} setFilter={setFilter} />
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="clear-completed-btn"
            >
              Clear Completed
            </button>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
