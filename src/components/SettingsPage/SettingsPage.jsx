import PropTypes from 'prop-types';
import { useSettingsForm } from '../../hooks/useSettingsForm';
import DateFormatSettings from './DateFormatSettings';
import TagSettings from './TagSettings';

function SettingsPage({ settings, onUpdateSettings }) {
    const {
        newTag,
        setNewTag,
        editingTag,
        setEditingTag,
        colors,
        handleColorChange,
        handleDateFormatChange,
        handleAddTag,
        handleDeleteTag
    } = useSettingsForm(settings, onUpdateSettings);

    return (
        <div className="px-6 py-8 pb-32 space-y-8 animate-in fade-in zoom-in duration-300">
            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Customize your experience</p>
            </header>

            {/* Date Format Section */}
            <DateFormatSettings
                dateFormat={settings.dateFormat}
                onFormatChange={handleDateFormatChange}
            />

            {/* Tags Management Section */}
            <TagSettings
                tags={settings.tags}
                newTag={newTag}
                setNewTag={setNewTag}
                editingTag={editingTag}
                setEditingTag={setEditingTag}
                colors={colors}
                onColorChange={handleColorChange}
                onAddTag={handleAddTag}
                onDeleteTag={handleDeleteTag}
            />
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
