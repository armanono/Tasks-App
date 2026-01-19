import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useAnalytics } from '../../hooks/useAnalytics';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
                <p className="font-semibold text-slate-800 dark:text-slate-200">{label || payload[0].name}</p>
                <p className="text-primary font-bold">{payload[0].value} tasks</p>
            </div>
        );
    }
    return null;
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
    label: PropTypes.string
};

function Analytics({ tasks, tags }) {
    const {
        totalTasks,
        completionRate,
        pieData,
        urgencyData,
        getColorHex
    } = useAnalytics(tasks, tags);

    return (
        <div className="w-full h-full flex flex-col pt-6 px-6 animate-in fade-in zoom-in duration-300">
            <header className="mb-4 flex-none">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Productivity Hub</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Your performance at a glance</p>
            </header>

            <div className="flex flex-col gap-6 pb-24 overflow-visible">

                {/* 1. Completion Rate Card */}
                <div className="bg-white dark:bg-[#1e2936] p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/50 flex items-center justify-between relative overflow-hidden flex-none">
                    <div className="z-10">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1 uppercase tracking-wide">Completion Rate</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-slate-900 dark:text-white">{completionRate}%</span>
                            <span className="text-sm text-slate-400">of {totalTasks} tasks</span>
                        </div>
                    </div>

                    {/* Visual Circle (CSS only for simplicity and perf) */}
                    <div className="relative w-20 h-20">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                                className="text-slate-100 dark:text-slate-700"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="text-primary transition-all duration-1000 ease-out"
                                strokeDasharray={`${completionRate}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* 2. Urgency Bar Chart */}
                <div className="bg-white dark:bg-[#1e2936] p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/50 min-h-[300px] flex flex-col flex-none">
                    <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-500">warning</span>
                        Urgency Breakdown
                    </h3>
                    <div className="flex-1 w-full -ml-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={urgencyData} barSize={40}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    hide
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="value" radius={[8, 8, 8, 8]}>
                                    {urgencyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Tag Distribution Pie Chart */}
                <div className="bg-white dark:bg-[#1e2936] p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/50 min-h-[350px] flex flex-col flex-none">
                    <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-purple-500">donut_large</span>
                        Tag Distribution
                    </h3>
                    <div className="flex-1 w-full relative">
                        {pieData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getColorHex(entry.name)} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                        wrapperStyle={{ fontSize: '12px', opacity: 0.8 }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 opacity-60">
                                <span className="material-symbols-outlined text-4xl mb-2">data_usage</span>
                                <p>No tagged tasks yet</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

Analytics.propTypes = {
    tasks: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired
};

export default Analytics;
