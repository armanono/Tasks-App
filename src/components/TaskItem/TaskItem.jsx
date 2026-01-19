import PropTypes from 'prop-types';
import { useTaskItem } from '../../hooks/useTaskItem';
import TaskCheckbox from './TaskCheckbox';
import TaskContent from './TaskContent';
import TaskActions from './TaskActions';
import TaskTags from './TaskTags';
import TaskDate from './TaskDate';

function TaskItem({ task, onToggle, onDelete, onUpdate, dateFormat = 'PPP', tags = [] }) {
    const {
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
        handleKeyDown,
        handleBlur,
        handleDateChange,
        toggleTag,
        getTagColor
    } = useTaskItem(task, onDelete, onUpdate, tags);

    return (
        <div className={`group relative bg-white dark:bg-[#1e2936] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent dark:border-slate-800/50 ${task.completed ? 'opacity-60' : ''} ${isDeleting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100 animate-in slide-in-from-left-4 fade-in duration-300'} ${showTagMenu ? 'z-20' : ''}`}>
            {/* Optional Priority Indicator (Visual only for now) */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${task.completed ? 'bg-slate-300 dark:bg-slate-700' : 'bg-primary'}`}></div>

            <div className="flex items-start gap-4 pl-2">
                <TaskCheckbox
                    completed={task.completed}
                    onToggle={onToggle}
                    id={task.id}
                />

                <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                        <TaskContent
                            isEditing={isEditing}
                            text={task.text}
                            editText={editText}
                            setEditText={setEditText}
                            handleBlur={handleBlur}
                            handleKeyDown={handleKeyDown}
                            handleDoubleClick={handleDoubleClick}
                            inputRef={inputRef}
                            completed={task.completed}
                        />

                        <TaskActions
                            onEdit={() => {
                                setIsEditing(true);
                                setEditText(task.text);
                            }}
                            onDelete={handleDelete}
                        />
                    </div>

                    {/* Metadata Row */}
                    <div className="flex flex-col gap-1">
                        <TaskTags
                            tags={tags}
                            selectedTags={task.tags}
                            showTagMenu={showTagMenu}
                            setShowTagMenu={setShowTagMenu}
                            toggleTag={toggleTag}
                            getTagColor={getTagColor}
                            tagMenuRef={tagMenuRef}
                        />

                        <TaskDate
                            dueDate={task.dueDate}
                            dateFormat={dateFormat}
                            dateInputRef={dateInputRef}
                            handleDateChange={handleDateChange}
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
    tags: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            name: PropTypes.string,
            color: PropTypes.string
        })
    ])),
};

export default TaskItem;
