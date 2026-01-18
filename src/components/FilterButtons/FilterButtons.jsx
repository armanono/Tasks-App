import PropTypes from 'prop-types';
import clsx from 'clsx';

function FilterButtons({ currentFilter, setFilter }) {
    const filters = [
        { value: 'all', label: 'All Tasks' },
        { value: 'active', label: 'Active' }, // Mapped 'Today' to Active for valid context
        { value: 'completed', label: 'Completed' },
        // { value: 'work', label: 'Work' }, // Extra from design, not in our logic yet
        // { value: 'personal', label: 'Personal' }
    ];

    return (
        <div className="w-full px-6 pb-6">
            <div className="flex gap-3 w-full">
                {filters.map(filter => (
                    <button
                        key={filter.value}
                        onClick={() => setFilter(filter.value)}
                        className={clsx(
                            "flex-1 px-2 py-2.5 rounded-full font-medium text-sm transition-all border border-transparent whitespace-nowrap",
                            currentFilter === filter.value
                                ? "bg-primary text-white shadow-lg shadow-primary/25 active:scale-95 ring-2 ring-white dark:ring-[#1e2936] ring-offset-2 ring-offset-transparent"
                                : "bg-white dark:bg-[#1e2936] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        )}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

FilterButtons.propTypes = {
    currentFilter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
};

export default FilterButtons;
