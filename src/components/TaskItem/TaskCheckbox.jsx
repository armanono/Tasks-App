import PropTypes from 'prop-types';
import confetti from 'canvas-confetti';

function TaskCheckbox({ completed, onToggle, id }) {
    return (
        <div className="pt-1">
            <input
                type="checkbox"
                checked={completed}
                onChange={() => {
                    if (!completed) {
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                            zIndex: 9999, // Ensure it's on top
                            colors: ['#2b8cee', '#22c55e', '#f59e0b']
                        });
                    }
                    onToggle(id);
                }}
                className="h-6 w-6 rounded-full border-2 border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/20 focus:ring-offset-0 bg-transparent transition-all cursor-pointer accent-primary"
            />
        </div>
    );
}

TaskCheckbox.propTypes = {
    completed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onToggle: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};

export default TaskCheckbox;
