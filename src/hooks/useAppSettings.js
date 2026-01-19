import { useState, useEffect } from 'react';

const SETTINGS_KEY = 'settings';

export function useAppSettings() {
    const [settings, setSettings] = useState(() => {
        try {
            const savedSettings = localStorage.getItem(SETTINGS_KEY);
            if (!savedSettings) {
                return {
                    dateFormat: 'PPP',
                    theme: 'light',
                    tags: [
                        { name: 'General', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
                        { name: 'Priority', color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' },
                        { name: 'Work', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' }
                    ]
                };
            }

            const parsed = JSON.parse(savedSettings);

            // MIGRATION: Convert string tags to objects if needed
            if (parsed.tags && parsed.tags.length > 0 && typeof parsed.tags[0] === 'string') {
                const colors = [
                    'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
                    'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
                    'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
                    'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
                    'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
                    'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
                    'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
                ];

                parsed.tags = parsed.tags.map((tag, index) => ({
                    name: tag,
                    color: colors[index % colors.length]
                }));
            }

            return parsed;

        } catch {
            return {
                dateFormat: 'PPP',
                theme: 'light',
                tags: [
                    { name: 'General', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
                    { name: 'Priority', color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' },
                    { name: 'Work', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' }
                ]
            };
        }
    });

    // Save settings and Apply Theme
    useEffect(() => {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

            // Apply Theme
            if (settings.theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } catch (error) {
            console.error('Failed to save settings', error);
        }
    }, [settings]);

    const toggleTheme = () => {
        setSettings(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }));
    };

    return { settings, setSettings, toggleTheme };
}
