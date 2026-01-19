import PropTypes from 'prop-types';

function TagSettings({
    tags,
    newTag,
    setNewTag,
    editingTag,
    setEditingTag,
    colors,
    onColorChange,
    onAddTag,
    onDeleteTag
}) {
    return (
        <section className="bg-white dark:bg-[#1e2936] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">label</span>
                Manage Tags
            </h2>

            <form onSubmit={onAddTag} className="flex flex-col gap-3 mb-6">
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
                {tags.map((tag, idx) => {
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
                                        onClick={(e) => { e.stopPropagation(); onDeleteTag(tag); }}
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
                                                onClick={() => onColorChange(tagName, color.class)}
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
                {tags.length === 0 && (
                    <p className="text-sm text-slate-500 italic">No tags custom defined.</p>
                )}
            </div>
        </section>
    );
}

TagSettings.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            name: PropTypes.string,
            color: PropTypes.string
        })
    ])),
    newTag: PropTypes.string.isRequired,
    setNewTag: PropTypes.func.isRequired,
    editingTag: PropTypes.string,
    setEditingTag: PropTypes.func.isRequired,
    colors: PropTypes.array.isRequired,
    onColorChange: PropTypes.func.isRequired,
    onAddTag: PropTypes.func.isRequired,
    onDeleteTag: PropTypes.func.isRequired
};

export default TagSettings;
