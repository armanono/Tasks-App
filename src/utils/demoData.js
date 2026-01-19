import { v4 as uuidv4 } from 'uuid';

export const getDemoTasks = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return [
        {
            id: uuidv4(),
            text: "Welcome to your new To-Do App! 👋",
            completed: false,
            tags: ["General"],
            dueDate: today.toISOString().split('T')[0]
        },
        {
            id: uuidv4(),
            text: "Try adding a new task above ⬆️",
            completed: false,
            tags: ["General"],
            dueDate: today.toISOString().split('T')[0]
        },
        {
            id: uuidv4(),
            text: "Double-click a task to edit it ✏️",
            completed: false,
            tags: ["General"],
            dueDate: null
        },
        {
            id: uuidv4(),
            text: "Check out the Analytics tab 📊",
            completed: false,
            tags: ["Work"],
            dueDate: tomorrow.toISOString().split('T')[0]
        },
        {
            id: uuidv4(),
            text: "Customize themes in Settings 🎨",
            completed: true,
            tags: ["Priority"],
            dueDate: null
        }
    ];
};
