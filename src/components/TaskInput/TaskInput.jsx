import { useState } from 'react';
import PropTypes from 'prop-types';

function TaskInput({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedText = text.trim();
        if (trimmedText) {
            onAdd(trimmedText);
            setText('');
        }
    };

    return (
        <div className="px-6 mb-8">
            <div className="relative group">
                <div className="absolute inset-0 bg-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <form
                    className="relative bg-white dark:bg-[#1e2936] rounded-2xl shadow-sm dark:shadow-none p-4 flex items-center gap-3 transition-transform active:scale-[0.99]"
                    onSubmit={handleSubmit}
                >
                    <span className="material-symbols-outlined text-primary text-2xl flex items-center justify-center leading-none">add</span>
                    <input
                        className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 text-lg font-medium p-0 outline-none"
                        placeholder="What needs to be done?"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                    />
                    {text.trim() && (
                        <button
                            type="submit"
                            className="bg-slate-100 dark:bg-slate-700/50 p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors flex items-center justify-center"
                        >
                            <span className="material-symbols-outlined text-[20px] leading-none">arrow_upward</span>
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

TaskInput.propTypes = {
    onAdd: PropTypes.func.isRequired,
};

export default TaskInput;
