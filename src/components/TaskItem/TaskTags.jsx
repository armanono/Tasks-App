import PropTypes from 'prop-types';

function TaskTags({
    tags,
    selectedTags,
    showTagMenu,
    setShowTagMenu,
    toggleTag,
    getTagColor,
    tagMenuRef
}) {
    return (
        <div className="relative" ref={tagMenuRef}>
            <button
                onClick={() => setShowTagMenu(!showTagMenu)}
                className="flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg px-1 transition-colors -ml-1 group/tagbtn"
            >
                {(selectedTags && selectedTags.length > 0) ? (
                    <div className="flex flex-wrap gap-1.5">
                        {selectedTags.map(tag => (
                            <span key={tag} className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${getTagColor(tag)}`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                ) : (
                    <span className="flex items-center gap-1 text-xs text-slate-400 group-hover/tagbtn:text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="material-symbols-outlined text-[14px]">label</span>
                        Add Tag
                    </span>
                )}
            </button>

            {/* Tag Selection Popup */}
            {showTagMenu && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50 p-2 animate-in fade-in zoom-in-95 duration-150">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 px-1">Select Tags</p>
                    <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
                        {tags.length > 0 ? tags.map(tagRef => {
                            const tagName = typeof tagRef === 'string' ? tagRef : tagRef.name;
                            return (
                                <button
                                    key={tagName}
                                    onClick={() => toggleTag(tagName)}
                                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm text-left transition-colors ${(selectedTags && selectedTags.includes(tagName))
                                        ? 'bg-primary/10 text-primary'
                                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined text-[16px] ${(selectedTags && selectedTags.includes(tagName)) ? 'text-primary' : 'text-slate-300'}`}>
                                        check
                                    </span>
                                    <span className={`${getTagColor(tagName)} px-1.5 rounded text-xs`}>{tagName}</span>
                                </button>
                            );
                        }) : (
                            <div className="px-2 py-1 text-xs text-slate-400 italic">No tags defined in Settings</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

TaskTags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            name: PropTypes.string,
            color: PropTypes.string
        })
    ])),
    selectedTags: PropTypes.arrayOf(PropTypes.string),
    showTagMenu: PropTypes.bool.isRequired,
    setShowTagMenu: PropTypes.func.isRequired,
    toggleTag: PropTypes.func.isRequired,
    getTagColor: PropTypes.func.isRequired,
    tagMenuRef: PropTypes.object.isRequired,
};

export default TaskTags;
