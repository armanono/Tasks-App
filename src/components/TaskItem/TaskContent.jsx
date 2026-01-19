import PropTypes from 'prop-types';

function TaskContent({
    isEditing,
    text,
    editText,
    setEditText,
    handleBlur,
    handleKeyDown,
    handleDoubleClick,
    inputRef,
    completed
}) {
    if (isEditing) {
        return (
            <input
                ref={inputRef}
                type="text"
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded p-1 text-slate-900 dark:text-white font-medium text-lg leading-tight outline-none focus:ring-2 focus:ring-primary mb-1"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
        );
    }

    return (
        <h3
            className={`font-semibold text-lg leading-tight truncate transition-colors cursor-text mr-2 ${completed
                ? "text-slate-500 dark:text-slate-500 line-through decoration-slate-400"
                : "text-slate-900 dark:text-white group-hover:text-primary"
                }`}
            onDoubleClick={handleDoubleClick}
        >
            {text}
        </h3>
    );
}

TaskContent.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    editText: PropTypes.string.isRequired,
    setEditText: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    handleDoubleClick: PropTypes.func.isRequired,
    inputRef: PropTypes.object.isRequired,
    completed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default TaskContent;
