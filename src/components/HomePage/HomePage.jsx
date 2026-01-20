import PropTypes from 'prop-types';
import TaskInput from '../TaskInput/TaskInput';
import TaskList from '../TaskList/TaskList';
import FilterButtons from '../FilterButtons/FilterButtons';

function HomePage({
    tasks,
    filteredTasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearCompleted,
    settings,
    toggleTheme
}) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Header Area */}
            <header className="flex items-end justify-between px-6 pt-8 pb-4">
                <div className="flex flex-col">
                    <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1 tracking-wide uppercase">Today's Schedule</h2>
                    <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">
                        Good night! <span className="inline-block animate-pulse">☀️</span>
                    </h1>
                </div>

                <button
                    onClick={toggleTheme}
                    className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl ring-1 ring-slate-900/10 dark:ring-white/20 transition-all group"
                    aria-label="Toggle Theme"
                >
                    <div className={`transition-transform duration-500 rotate-0 dark:-rotate-90`}>
                        <span className="material-symbols-outlined text-2xl text-orange-500 dark:hidden">light_mode</span>
                        <span className="material-symbols-outlined text-2xl text-blue-400 hidden dark:inline-block">dark_mode</span>
                    </div>
                </button>
            </header>

            {/* Tactile Input Area */}
            <TaskInput onAdd={addTask} />

            {/* Filter Pills */}
            <FilterButtons
                currentFilter={filter}
                setFilter={setFilter}
                counts={{
                    all: tasks.length,
                    active: tasks.filter(t => !t.completed).length,
                    completed: tasks.filter(t => t.completed).length
                }}
            />

            {/* Spacious Task List */}
            <div className="px-6 pb-32 flex flex-col gap-4">
                <TaskList
                    tasks={filteredTasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onUpdate={updateTask}
                    emptyMessage={
                        <div className="text-center py-10 text-slate-500 dark:text-slate-400 opacity-60">
                            <p>No tasks found.</p>
                        </div>
                    }
                    dateFormat={settings.dateFormat}
                    tags={settings.tags}
                />

                {(filter !== 'active' && tasks.some(t => t.completed)) && (
                    <div className="flex justify-center mt-4 mb-8">
                        <button
                            onClick={clearCompleted}
                            className="text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors uppercase tracking-wider"
                        >
                            Clear Completed ({tasks.filter(t => t.completed).length})
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

HomePage.propTypes = {
    tasks: PropTypes.array.isRequired,
    filteredTasks: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
    toggleTheme: PropTypes.func.isRequired
};

export default HomePage;
