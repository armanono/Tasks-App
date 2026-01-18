import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
    if (tasks.length === 0) {
        return null; // or empty state handled in parent
    }

    return (
        <ul className="task-list">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </ul>
    );
}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.boolean,
        })
    ).isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default TaskList;
