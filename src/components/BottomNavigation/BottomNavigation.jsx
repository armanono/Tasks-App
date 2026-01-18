import { useState } from 'react';
import PropTypes from 'prop-types';

function BottomNavigation({ activeTab, setActiveTab }) {

    const navItems = [
        { id: 'tasks', icon: 'check_circle', label: 'Tasks' }, // Added Home/Tasks
        { id: 'analytics', icon: 'bar_chart', label: 'Analytics' },
        { id: 'profile', icon: 'person', label: 'Profile' },
        { id: 'settings', icon: 'settings', label: 'Settings' },
    ];

    return (
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-[#101922]/90 backdrop-blur-md border-t border-slate-200 dark:border-white/5 py-3 px-6 z-20">
            <div className="flex justify-around items-center">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex flex-col items-center gap-1 transition-colors duration-300 ${activeTab === item.id
                                ? 'text-primary'
                                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                            }`}
                    >
                        <span className={`material-symbols-outlined text-2xl ${activeTab === item.id ? 'fill-1' : ''}`}>
                            {item.icon}
                        </span>
                        <span className="text-[10px] font-medium tracking-wide">
                            {item.label}
                        </span>
                        {/* Active Indicator Dot */}
                        {activeTab === item.id && (
                            <div className="absolute -bottom-[2px] w-1 h-1 rounded-full bg-primary" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

BottomNavigation.propTypes = {
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
};

export default BottomNavigation;
