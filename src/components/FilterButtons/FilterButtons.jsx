import PropTypes from 'prop-types';
import clsx from 'clsx';

function FilterButtons({ currentFilter, setFilter, counts }) {
    const filters = [
        { value: 'all', label: 'All Tasks', count: counts.all },
        { value: 'active', label: 'Active', count: counts.active },
        { value: 'completed', label: 'Completed', count: counts.completed },
    ];

    return (
        <div className="w-full px-6 pb-6">
            <div className="flex gap-3 w-full">
                {filters.map(filter => (
                    <button
                        key={filter.value}
                        onClick={() => setFilter(filter.value)}
                        className={clsx(
                            "flex-1 px-2 py-2.5 rounded-full font-medium text-sm transition-all border border-transparent whitespace-nowrap flex items-center justify-center gap-2",
                            currentFilter === filter.value
                                ? "bg-primary text-white shadow-lg shadow-primary/25 active:scale-95 ring-2 ring-white dark:ring-[#1e2936] ring-offset-2 ring-offset-transparent"
                                : "bg-white dark:bg-[#1e2936] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        )}
                    >
                        {filter.label}
                        {filter.count !== undefined && (
                            <span className={clsx(
                                "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                                currentFilter === filter.value
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                            )}>
                                {filter.count}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

FilterButtons.propTypes = {
    currentFilter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
    counts: PropTypes.shape({
        all: PropTypes.number,
        active: PropTypes.number,
        completed: PropTypes.number
    }).isRequired
};

export default FilterButtons;
