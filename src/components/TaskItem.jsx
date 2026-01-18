import PropTypes from 'prop-types';
import clsx from 'clsx';
import './TaskItem.css';

function TaskItem({ task, onToggle, onDelete }) {
    return (
        <li className={clsx('task-item', { completed: task.completed })}>
            <div className="task-item-content">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                    className="task-toggle"
                />
                <span className="task-text" onDoubleClick={() => { /* Edit logic later */ }}>
                    {task.text}
                </span>
            </div>
            <button
                onClick={() => onDelete(task.id)}
                className="task-delete-btn"
                aria-label="Delete task"
            >
                ×
            </button>
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
};

export default TaskItem;
