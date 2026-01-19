import PropTypes from 'prop-types';
import { formatDate } from '../../utils/dateUtils';

function TaskDate({ dueDate, dateFormat, dateInputRef, handleDateChange }) {
    return (
        <div className="relative group/date w-fit">
            <button
                onClick={() => dateInputRef.current.showPicker()}
                className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer text-sm text-slate-500 dark:text-slate-400"
            >
                {dueDate ? (
                    <>
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        {formatDate(dueDate, dateFormat)}
                    </>
                ) : (
                    <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                        set date
                    </span>
                )}
            </button>
            <input
                ref={dateInputRef}
                type="date"
                className="absolute inset-0 opacity-0 cursor-pointer w-0 h-0"
                onChange={handleDateChange}
                value={dueDate || ''}
            />
        </div>
    );
}

TaskDate.propTypes = {
    dueDate: PropTypes.string,
    dateFormat: PropTypes.string,
    dateInputRef: PropTypes.object.isRequired,
    handleDateChange: PropTypes.func.isRequired,
};

export default TaskDate;
