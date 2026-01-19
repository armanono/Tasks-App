import PropTypes from 'prop-types';

function TaskActions({ onEdit, onDelete }) {
    return (
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <button
                onClick={onEdit}
                className="text-slate-400 hover:text-primary dark:hover:text-primary p-1"
                title="Edit"
            >
                <span className="material-symbols-outlined">edit</span>
            </button>
            <button
                onClick={onDelete}
                className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1"
                title="Delete"
            >
                <span className="material-symbols-outlined">delete</span>
            </button>
        </div>
    );
}

TaskActions.propTypes = {
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TaskActions;
