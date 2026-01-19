import { useMemo } from 'react';

export function useAnalytics(tasks, tags) {
    const stats = useMemo(() => {
        // 1. Process Data
        const tagCounts = {};

        // Completion Stats
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.completed).length;
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        // Urgency Stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let overdue = 0;
        let dueToday = 0;
        let upcoming = 0;

        tasks.forEach(task => {
            // Tag Counts
            if (task.tags && task.tags.length > 0) {
                task.tags.forEach(tagName => {
                    const name = typeof tagName === 'object' ? tagName.name : tagName;
                    tagCounts[name] = (tagCounts[name] || 0) + 1;
                });
            }

            // Urgency Counts (only for incomplete tasks)
            if (!task.completed && task.dueDate) {
                const taskDate = new Date(task.dueDate);
                taskDate.setHours(0, 0, 0, 0);

                if (taskDate < today) overdue++;
                else if (taskDate.getTime() === today.getTime()) dueToday++;
                else upcoming++;
            }
        });

        const pieData = Object.keys(tagCounts).map(name => ({
            name,
            value: tagCounts[name]
        }));

        const urgencyData = [
            { name: 'Overdue', value: overdue, color: '#ef4444' }, // Red-500
            { name: 'Today', value: dueToday, color: '#f59e0b' },   // Amber-500
            { name: 'Upcoming', value: upcoming, color: '#22c55e' } // Green-500
        ];

        return {
            totalTasks,
            completedTasks,
            completionRate,
            pieData,
            urgencyData
        };
    }, [tasks]);

    const getColorHex = (tagName) => {
        const tagDef = tags.find(t => (typeof t === 'string' ? t : t.name) === tagName);
        if (!tagDef) return '#94a3b8';

        const colorClass = typeof tagDef === 'string' ? '' : tagDef.color;

        if (colorClass.includes('red')) return '#ef4444';
        if (colorClass.includes('orange')) return '#f97316';
        if (colorClass.includes('amber')) return '#f59e0b';
        if (colorClass.includes('yellow')) return '#eab308';
        if (colorClass.includes('lime')) return '#84cc16';
        if (colorClass.includes('green')) return '#22c55e';
        if (colorClass.includes('emerald')) return '#10b981';
        if (colorClass.includes('teal')) return '#14b8a6';
        if (colorClass.includes('cyan')) return '#06b6d4';
        if (colorClass.includes('sky')) return '#0ea5e9';
        if (colorClass.includes('blue')) return '#3b82f6';
        if (colorClass.includes('indigo')) return '#6366f1';
        if (colorClass.includes('violet')) return '#8b5cf6';
        if (colorClass.includes('purple')) return '#a855f7';
        if (colorClass.includes('fuchsia')) return '#d946ef';
        if (colorClass.includes('pink')) return '#ec4899';
        if (colorClass.includes('rose')) return '#f43f5e';

        return '#64748b';
    };

    return { ...stats, getColorHex };
}
