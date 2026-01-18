import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './TaskInput.css';

function TaskInput({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedText = text.trim();
        if (trimmedText) {
            onAdd(trimmedText);
            setText('');
        }
    };

    return (
        <form className="task-input-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="task-input-field"
                placeholder="Add a new task..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                autoFocus
            />
            <button
                type="submit"
                disabled={!text.trim()}
                className={clsx('task-input-button', { disabled: !text.trim() })}
            >
                Add
            </button>
        </form>
    );
}

TaskInput.propTypes = {
    onAdd: PropTypes.func.isRequired,
};

export default TaskInput;
