import PropTypes from 'prop-types';
import clsx from 'clsx';
import './FilterButtons.css';

function FilterButtons({ currentFilter, setFilter }) {
    const filters = [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' }
    ];

    return (
        <div className="filter-buttons">
            {filters.map(filter => (
                <button
                    key={filter.value}
                    onClick={() => setFilter(filter.value)}
                    className={clsx('filter-btn', { active: currentFilter === filter.value })}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
}

FilterButtons.propTypes = {
    currentFilter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
};

export default FilterButtons;
