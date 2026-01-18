import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function TaskItem({ task, onToggle, onDelete, onUpdate, dateFormat = 'PPP', tags = [] }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);
    const [showTagMenu, setShowTagMenu] = useState(false);
    const inputRef = useRef(null);
    const dateInputRef = useRef(null);
    const tagMenuRef = useRef(null);

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

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Reset hours for comparison
        today.setHours(0, 0, 0, 0);
        tomorrow.setHours(0, 0, 0, 0);
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);

        if (d.getTime() === today.getTime()) return 'Today';
        if (d.getTime() === tomorrow.getTime()) return 'Tomorrow';

        // Use user preference or default
        if (dateFormat === 'dd/MM/yyyy') {
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        }
        if (dateFormat === 'MM/dd/yyyy') {
            return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
        }
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
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

    return (
        <div className={`group relative bg-white dark:bg-[#1e2936] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent dark:border-slate-800/50 ${task.completed ? 'opacity-60' : ''}`}>
            {/* Optional Priority Indicator (Visual only for now) */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${task.completed ? 'bg-slate-300 dark:bg-slate-700' : 'bg-primary'}`}></div>

            <div className="flex items-start gap-4 pl-2">
                <div className="pt-1">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                        className="h-6 w-6 rounded-full border-2 border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/20 focus:ring-offset-0 bg-transparent transition-all cursor-pointer accent-primary"
                    />
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                        {isEditing ? (
                            <input
                                ref={inputRef}
                                type="text"
                                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded p-1 text-slate-900 dark:text-white font-medium text-lg leading-tight outline-none focus:ring-2 focus:ring-primary mb-1"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                            />
                        ) : (
                            <h3
                                className={`font-semibold text-lg leading-tight truncate transition-colors cursor-text mr-2 ${task.completed
                                    ? "text-slate-500 dark:text-slate-500 line-through decoration-slate-400"
                                    : "text-slate-900 dark:text-white group-hover:text-primary"
                                    }`}
                                onDoubleClick={handleDoubleClick}
                            >
                                {task.text}
                            </h3>
                        )}

                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <button
                                onClick={() => {
                                    setIsEditing(true);
                                    setEditText(task.text);
                                }}
                                className="text-slate-400 hover:text-primary dark:hover:text-primary p-1"
                                title="Edit"
                            >
                                <span className="material-symbols-outlined">edit</span>
                            </button>
                            <button
                                onClick={() => onDelete(task.id)}
                                className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1"
                                title="Delete"
                            >
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </div>

                    {/* Tags Row */}
                    <div className="relative" ref={tagMenuRef}>
                        <button
                            onClick={() => setShowTagMenu(!showTagMenu)}
                            className="flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded px-1 transition-colors -ml-1"
                        >
                            {(task.tags && task.tags.length > 0) ? (
                                <div className="flex flex-wrap gap-1.5">
                                    {task.tags.map(tag => (
                                        <span key={tag} className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${getTagColor(tag)}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <span className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary">
                                    <span className="material-symbols-outlined text-[14px]">label</span>
                                    Add Tag
                                </span>
                            )}
                        </button>

                        {/* Tag Selection Popup */}
                        {showTagMenu && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 px-1">Select Tags</p>
                                <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                                    {tags.length > 0 ? tags.map(tagRef => {
                                        const tagName = typeof tagRef === 'string' ? tagRef : tagRef.name;
                                        return (
                                            <button
                                                key={tagName}
                                                onClick={() => toggleTag(tagName)}
                                                className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm text-left transition-colors ${(task.tags && task.tags.includes(tagName))
                                                    ? 'bg-primary/10 text-primary'
                                                    : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                                                    }`}
                                            >
                                                <span className={`material-symbols-outlined text-[16px] ${(task.tags && task.tags.includes(tagName)) ? 'text-primary' : 'text-slate-300'}`}>
                                                    check
                                                </span>
                                                <span className={`${getTagColor(tagName)} px-1.5 rounded text-xs`}>{tagName}</span>
                                            </button>
                                        );
                                    }) : (
                                        <div className="px-2 py-1 text-xs text-slate-400 italic">No tags defined in Settings</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Date Row */}
                    <div className="relative group/date w-fit">
                        <button
                            onClick={() => dateInputRef.current.showPicker()}
                            className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer text-sm text-slate-500 dark:text-slate-400"
                        >
                            {task.dueDate ? (
                                <>
                                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                                    {formatDate(task.dueDate)}
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                                    set date
                                </>
                            )}
                        </button>
                        <input
                            ref={dateInputRef}
                            type="date"
                            className="absolute inset-0 opacity-0 cursor-pointer w-0 h-0"
                            onChange={handleDateChange}
                            value={task.dueDate || ''}
                        />
                    </div>
                </div>


            </div>
        </div>
    );
}

TaskItem.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        dueDate: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    dateFormat: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
};

export default TaskItem;
