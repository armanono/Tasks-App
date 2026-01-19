import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDemoTasks } from '../utils/demoData';

const STORAGE_KEY = 'tasks';

export function useTasks() {
    const [tasks, setTasks] = useState(() => {
        try {
            const savedTasks = localStorage.getItem(STORAGE_KEY);
            if (savedTasks) {
                return JSON.parse(savedTasks);
            }
            // Initialize with demo data if no tasks exist
            return getDemoTasks();
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

    const clearCompleted = () => {
        setTasks(prevTasks => prevTasks.filter(task => !task.completed));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    return {
        tasks,
        setTasks, // Exposed if needed, but perfer specific methods
        filter,
        setFilter,
        addTask,
        toggleTask,
        deleteTask,
        updateTask,
        clearCompleted,
        filteredTasks
    };
}
