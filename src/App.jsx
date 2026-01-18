import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
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

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>
      <main className="app-main">
        <TaskInput onAdd={addTask} />
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
        <p>Current Tasks: {tasks.length}</p>
      </main>
    </div>
  )
}

export default App
