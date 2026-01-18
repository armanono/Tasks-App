import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './TaskItem.css';

function TaskItem({ task, onToggle, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleDoubleClick = () => {
        setIsEditing(true);
        setEditText(task.text);
    };

    const handleSave = () => {
        const trimmedText = editText.trim();
        if (trimmedText) {
            onUpdate(task.id, trimmedText);
            setIsEditing(false);
        } else {
            // If empty, revert or delete? PRD says prevent empty. 
            // We'll revert to original if empty or maybe just keep editing?
            // "Prevent saving empty text" - let's keep editing mode but maybe toast? 
            // For now, let's just revert if empty or do nothing.
            // Actually, standard behavior is usually effectively "cancel" if empty or delete.
            // PRD 4.1.3: "Prevent saving empty text".
            setEditText(task.text); // Revert
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

    return (
        <li className={clsx('task-item', { completed: task.completed, editing: isEditing })}>
            <div className="task-item-content">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    className="task-toggle"
                />

                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        className="task-edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <span
                        className="task-text"
                        onDoubleClick={handleDoubleClick}
                        title="Double-click to edit"
                    >
                        {task.text}
                    </span>
                )}
            </div>

            {!isEditing && (
                <button
                    onClick={() => onDelete(task.id)}
                    className="task-delete-btn"
                    aria-label="Delete task"
                >
                    ×
                </button>
            )}
        </li>
    );
}

TaskItem.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.boolean,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default TaskItem;
