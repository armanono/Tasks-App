import { useState } from 'react';

export function useSettingsForm(settings, onUpdateSettings) {
    const [newTag, setNewTag] = useState('');
    const [editingTag, setEditingTag] = useState(null);

    const colors = [
        { name: 'blue', class: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
        { name: 'green', class: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' },
        { name: 'purple', class: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' },
        { name: 'orange', class: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' },
        { name: 'pink', class: 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400' },
        { name: 'teal', class: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400' },
        { name: 'red', class: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' },
        { name: 'gray', class: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
    ];

    const handleColorChange = (tagName, newColorClass) => {
        onUpdateSettings({
            ...settings,
            tags: settings.tags.map(t => {
                const tName = typeof t === 'string' ? t : t.name;
                if (tName === tagName) {
                    return { name: tName, color: newColorClass };
                }
                return t;
            })
        });
    };

    const handleDateFormatChange = (e) => {
        onUpdateSettings({ ...settings, dateFormat: e.target.value });
    };

    const handleAddTag = (e) => {
        e.preventDefault();
        const trimmed = newTag.trim();
        if (trimmed) {
            // Check if tag name already exists
            const exists = settings.tags.some(t => (typeof t === 'string' ? t : t.name).toLowerCase() === trimmed.toLowerCase());

            if (!exists) {
                // Assign a random/default color initially
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const newTagObj = { name: trimmed, color: randomColor.class };

                onUpdateSettings({ ...settings, tags: [...settings.tags, newTagObj] });
                setNewTag('');
            }
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        // tagToDelete can be string or object
        const tagName = typeof tagToDelete === 'string' ? tagToDelete : tagToDelete.name;

        onUpdateSettings({
            ...settings,
            tags: settings.tags.filter(t => {
                const tName = typeof t === 'string' ? t : t.name;
                return tName !== tagName;
            })
        });
        if (editingTag === tagName) setEditingTag(null);
    };

    return {
        newTag,
        setNewTag,
        editingTag,
        setEditingTag,
        colors,
        handleColorChange,
        handleDateFormatChange,
        handleAddTag,
        handleDeleteTag
    };
}
