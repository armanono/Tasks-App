import PropTypes from 'prop-types';
import TaskItem from '../TaskItem/TaskItem';

function TaskList({ tasks, onToggle, onDelete, onUpdate, emptyMessage, dateFormat, tags }) {
    if (tasks.length === 0) {
        return <div className="task-list-empty">{emptyMessage}</div>;
    }

    return (
        <ul className="flex flex-col gap-4">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    dateFormat={dateFormat}
                    tags={tags}
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
            completed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        })
    ).isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    emptyMessage: PropTypes.node,
    dateFormat: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
};

export default TaskList;
