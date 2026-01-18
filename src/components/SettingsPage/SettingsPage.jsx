import { useState } from 'react';
import PropTypes from 'prop-types';

function SettingsPage({ settings, onUpdateSettings }) {
    const [newTag, setNewTag] = useState('');
    const [selectedColor, setSelectedColor] = useState('blue');
    const [editingTag, setEditingTag] = useState(null);

    const handleColorChange = (tagName, newColorClass) => {
        onUpdateSettings({
            ...settings,
            tags: settings.tags.map(t => {
                const tName = typeof t === 'string' ? t : t.name;
                if (tName === tagName) {
                    return { name: tName, color: newColorClass };
                }
                return t;
            })
        });
    };

    const colors = [
        { name: 'blue', class: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
        { name: 'green', class: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' },
        { name: 'purple', class: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' },
        { name: 'orange', class: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' },
        { name: 'pink', class: 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400' },
        { name: 'teal', class: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400' },
        { name: 'red', class: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' },
        { name: 'gray', class: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
    ];

    const handleDateFormatChange = (e) => {
        onUpdateSettings({ ...settings, dateFormat: e.target.value });
    };

    const handleAddTag = (e) => {
        e.preventDefault();
        const trimmed = newTag.trim();
        if (trimmed) {
            // Check if tag name already exists
            const exists = settings.tags.some(t => (typeof t === 'string' ? t : t.name).toLowerCase() === trimmed.toLowerCase());

            if (!exists) {
                // Assign a random/default color initially
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const newTagObj = { name: trimmed, color: randomColor.class };

                onUpdateSettings({ ...settings, tags: [...settings.tags, newTagObj] });
                setNewTag('');
            }
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        // tagToDelete can be string or object
        const tagName = typeof tagToDelete === 'string' ? tagToDelete : tagToDelete.name;

        onUpdateSettings({
            ...settings,
            tags: settings.tags.filter(t => {
                const tName = typeof t === 'string' ? t : t.name;
                return tName !== tagName;
            })
        });
        if (editingTag === tagName) setEditingTag(null);
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

                <form onSubmit={handleAddTag} className="flex flex-col gap-3 mb-6">
                    <div className="flex gap-2">
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
                    </div>
                </form>

                <div className="flex flex-col gap-2">
                    {settings.tags.map((tag, idx) => {
                        const tagName = typeof tag === 'string' ? tag : tag.name;
                        const tagColorClass = typeof tag === 'string' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' : tag.color;
                        const isEditing = editingTag === tagName;

                        return (
                            <div key={idx} className={`rounded-xl border transition-all duration-200 overflow-hidden ${isEditing ? 'border-primary/50 bg-slate-50 dark:bg-slate-800/50' : 'border-transparent'}`}>
                                <div className={`flex items-center justify-between p-2 rounded-lg ${!isEditing && 'hover:bg-slate-50 dark:hover:bg-slate-800'} ${tagColorClass} bg-opacity-20`}>
                                    <button
                                        onClick={() => setEditingTag(isEditing ? null : tagName)}
                                        className="flex-1 text-left font-medium flex items-center gap-2"
                                    >
                                        <span className={`w-3 h-3 rounded-full ${tagColorClass.split(' ')[0].replace('bg-', 'bg-').replace('/20', '')} shadow-sm`}></span>
                                        {tagName}
                                    </button>

                                    <div className="flex items-center">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setEditingTag(isEditing ? null : tagName); }}
                                            className="p-1.5 text-slate-400 hover:text-primary transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">{isEditing ? 'expand_less' : 'palette'}</span>
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteTag(tag); }}
                                            className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">close</span>
                                        </button>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="p-3 bg-white dark:bg-[#1e2936] border-t border-slate-100 dark:border-slate-700 animate-in slide-in-from-top-2">
                                        <p className="text-xs font-semibold text-slate-500 mb-2">Select Color</p>
                                        <div className="flex flex-wrap gap-2">
                                            {colors.map(color => (
                                                <button
                                                    key={color.name}
                                                    onClick={() => handleColorChange(tagName, color.class)}
                                                    className={`w-8 h-8 rounded-full border-2 transition-transform ${tagColorClass === color.class ? 'scale-110 border-slate-900 dark:border-white' : 'border-transparent hover:scale-105'}`}
                                                    style={{ backgroundColor: color.name === 'white' ? '#f1f5f9' : color.name }}
                                                    title={color.name}
                                                >
                                                    {tagColorClass === color.class && <span className="material-symbols-outlined text-white text-sm drop-shadow-md">check</span>}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
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
        tags: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                name: PropTypes.string,
                color: PropTypes.string
            })
        ])),
    }).isRequired,
    onUpdateSettings: PropTypes.func.isRequired,
};

export default SettingsPage;
