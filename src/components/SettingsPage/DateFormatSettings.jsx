import PropTypes from 'prop-types';

function DateFormatSettings({ dateFormat, onFormatChange }) {
    return (
        <section className="bg-white dark:bg-[#1e2936] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                Date Format
            </h2>
            <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                    <input
                        type="radio"
                        name="dateFormat"
                        value="PPP" // e.g. "Jan 19, 2026"
                        checked={dateFormat === 'PPP'}
                        onChange={onFormatChange}
                        className="text-primary focus:ring-primary"
                    />
                    <div className="flex flex-col">
                        <span className="text-slate-900 dark:text-white font-medium">Default</span>
                        <span className="text-xs text-slate-500">Jan 19, 2026</span>
                    </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                    <input
                        type="radio"
                        name="dateFormat"
                        value="dd/MM/yyyy"
                        checked={dateFormat === 'dd/MM/yyyy'}
                        onChange={onFormatChange}
                        className="text-primary focus:ring-primary"
                    />
                    <div className="flex flex-col">
                        <span className="text-slate-900 dark:text-white font-medium">European</span>
                        <span className="text-xs text-slate-500">19/01/2026</span>
                    </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                    <input
                        type="radio"
                        name="dateFormat"
                        value="MM/dd/yyyy"
                        checked={dateFormat === 'MM/dd/yyyy'}
                        onChange={onFormatChange}
                        className="text-primary focus:ring-primary"
                    />
                    <div className="flex flex-col">
                        <span className="text-slate-900 dark:text-white font-medium">American</span>
                        <span className="text-xs text-slate-500">01/19/2026</span>
                    </div>
                </label>
            </div>
        </section>
    );
}

DateFormatSettings.propTypes = {
    dateFormat: PropTypes.string,
    onFormatChange: PropTypes.func.isRequired,
};

export default DateFormatSettings;
