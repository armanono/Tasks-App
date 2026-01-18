import { useState } from 'react';
import PropTypes from 'prop-types';

function SettingsPage({ settings, onUpdateSettings }) {
    const [newTag, setNewTag] = useState('');

    const handleDateFormatChange = (e) => {
        onUpdateSettings({ ...settings, dateFormat: e.target.value });
    };

    const handleAddTag = (e) => {
        e.preventDefault();
        const trimmed = newTag.trim();
        if (trimmed && !settings.tags.includes(trimmed)) {
            onUpdateSettings({ ...settings, tags: [...settings.tags, trimmed] });
            setNewTag('');
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        onUpdateSettings({
            ...settings,
            tags: settings.tags.filter(t => t !== tagToDelete)
        });
    };

    return (
        <div className="px-6 py-8 pb-32 space-y-8 animate-in fade-in zoom-in duration-300">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Customize your experience</p>
            </header>

            {/* Date Format Section */}
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
                            checked={settings.dateFormat === 'PPP'}
                            onChange={handleDateFormatChange}
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
                            checked={settings.dateFormat === 'dd/MM/yyyy'}
                            onChange={handleDateFormatChange}
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
                            checked={settings.dateFormat === 'MM/dd/yyyy'}
                            onChange={handleDateFormatChange}
                            className="text-primary focus:ring-primary"
                        />
                        <div className="flex flex-col">
                            <span className="text-slate-900 dark:text-white font-medium">American</span>
                            <span className="text-xs text-slate-500">01/19/2026</span>
                        </div>
                    </label>
                </div>
            </section>

            {/* Tags Management Section */}
            <section className="bg-white dark:bg-[#1e2936] rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">label</span>
                    Manage Tags
                </h2>

                <form onSubmit={handleAddTag} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Add new tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="flex-1 bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                    <button
                        type="submit"
                        disabled={!newTag.trim()}
                        className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl transition-colors"
                    >
                        Add
                    </button>
                </form>

                <div className="flex flex-wrap gap-2">
                    {settings.tags.map(tag => (
                        <div key={tag} className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 group">
                            <span className="text-sm font-medium">{tag}</span>
                            <button
                                onClick={() => handleDeleteTag(tag)}
                                className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                aria-label={`Delete ${tag} tag`}
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </div>
                    ))}
                    {settings.tags.length === 0 && (
                        <p className="text-sm text-slate-500 italic">No tags custom defined.</p>
                    )}
                </div>
            </section>
        </div>
    );
}

SettingsPage.propTypes = {
    settings: PropTypes.shape({
        dateFormat: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onUpdateSettings: PropTypes.func.isRequired,
};

export default SettingsPage;
