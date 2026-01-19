import { useState, useRef, useEffect } from 'react';

export function useTaskItem(task, onDelete, onUpdate, tags) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);
    const [showTagMenu, setShowTagMenu] = useState(false);
    const inputRef = useRef(null);
    const dateInputRef = useRef(null);
    const tagMenuRef = useRef(null);

    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => {
            onDelete(task.id);
        }, 300); // Wait for animation to finish
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    // Close tag menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tagMenuRef.current && !tagMenuRef.current.contains(event.target)) {
                setShowTagMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDoubleClick = () => {
        setIsEditing(true);
        setEditText(task.text);
    };

    const handleSave = () => {
        const trimmedText = editText.trim();
        if (trimmedText) {
            onUpdate(task.id, { text: trimmedText });
            setIsEditing(false);
        } else {
            setEditText(task.text);
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setEditText(task.text);
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        handleSave();
    };

    const handleDateChange = (e) => {
        onUpdate(task.id, { dueDate: e.target.value });
    };

    const toggleTag = (tag) => {
        const currentTags = task.tags || [];
        let newTags;
        if (currentTags.includes(tag)) {
            newTags = currentTags.filter(t => t !== tag);
        } else {
            newTags = [...currentTags, tag];
        }
        onUpdate(task.id, { tags: newTags });
    };

    const getTagColor = (tag) => {
        // Try to find the tag definition in props
        const tagDef = tags.find(t => {
            const tName = typeof t === 'string' ? t : t.name;
            return tName === tag;
        });

        if (tagDef && typeof tagDef === 'object' && tagDef.color) {
            return tagDef.color;
        }

        // Fallback to hash if not found or is string
        const colors = [
            'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
            'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
            'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
            'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
            'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
            'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
        ];
        let hash = 0;
        for (let i = 0; i < tag.length; i++) {
            hash = tag.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };

    return {
        isDeleting,
        isEditing,
        setIsEditing,
        editText,
        setEditText,
        showTagMenu,
        setShowTagMenu,
        inputRef,
        dateInputRef,
        tagMenuRef,
        handleDelete,
        handleDoubleClick,
        handleSave,
        handleKeyDown,
        handleBlur,
        handleDateChange,
        toggleTag,
        getTagColor
    };
}
