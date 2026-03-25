import { BookOpen, FileText, Clock, TrendingUp, MoreVertical, PlayCircle, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMaterials } from '../context/MaterialContext';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
    const { materials, isLoading } = useMaterials();
    const { user } = useUser();

    // Calculate stats
    const totalSubjects = new Set(materials.map(m => m.subject)).size;
    const totalMaterials = materials.length;

    const stats = [
        { label: 'Total Subjects', value: totalSubjects.toString(), icon: BookOpen, color: 'bg-blue-500', change: '+1 this week' },
        { label: 'Materials', value: totalMaterials.toString(), icon: FileText, color: 'bg-emerald-500', change: '+3 new' },
        { label: 'Hours Studied', value: '24.5', icon: Clock, color: 'bg-purple-500', change: '12% increase' },
    ];

    // Get recent activity (last 5 items)
    const recentActivity = materials.slice(0, 5).map(m => ({
        ...m,
        icon: m.type === 'pdf' ? FileText : m.type === 'video' ? PlayCircle : m.type === 'image' ? ImageIcon : LinkIcon,
        color: m.type === 'pdf' ? 'text-red-400' : m.type === 'video' ? 'text-blue-400' : m.type === 'image' ? 'text-purple-400' : 'text-emerald-400'
    }));

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-8">
                <div className="h-20 w-1/2 bg-white/5 rounded-2xl"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="h-32 bg-white/5 rounded-2xl"></div>
                    <div className="h-32 bg-white/5 rounded-2xl"></div>
                    <div className="h-32 bg-white/5 rounded-2xl"></div>
                </div>
                <div className="h-64 bg-white/5 rounded-2xl"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold">Hello, {user?.name}.</h1>
                    <p className="text-text-secondary mt-1">Ready to learn something new today?</p>
                </div>
                <div className="hidden sm:block text-right">
                    <p className="text-sm text-text-secondary">Current Streak</p>
                    <div className="flex items-center gap-2 text-orange-400 font-bold text-xl">
                        <TrendingUp className="w-5 h-5" />
                        <span>5 Days</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-surface border border-gray-200 dark:border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-gray-300 dark:hover:border-blue-500/20 transition-colors shadow-sm dark:shadow-none"
                    >
                        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
                            <stat.icon className="w-24 h-24" />
                        </div>

                        <div className="relative z-10">
                            <div className={`w-12 h-12 ${stat.color} bg-opacity-20 rounded-xl flex items-center justify-center mb-4`}>
                                <stat.icon className={`w-6 h-6 text-white`} />
                            </div>
                            <h3 className="text-text-secondary font-medium">{stat.label}</h3>
                            <div className="flex items-baseline gap-2 mt-1">
                                <span className="text-3xl font-bold">{stat.value}</span>
                                <span className="text-xs text-green-400 font-medium bg-green-400/10 px-2 py-0.5 rounded-full">{stat.change}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Recent Activity</h2>
                    <button className="text-primary text-sm font-medium hover:text-primary/80 transition-colors">View All</button>
                </div>
                {recentActivity.length > 0 ? (
                    <div className="bg-surface border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
                        {recentActivity.map((item) => (
                            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors border-b border-gray-100 dark:border-white/5 last:border-0 group">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${item.color} bg-opacity-10`}>
                                        <item.icon className={`w-5 h-5 ${item.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm md:text-base group-hover:text-primary transition-colors">{item.title}</h3>
                                        <div className="flex items-center gap-2 text-xs text-text-secondary mt-0.5">
                                            <span>{item.subject?.toUpperCase()}</span>
                                            <span>•</span>
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-white/10 dark:hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-white dark:hover:text-blue-400 transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-surface border border-gray-200 dark:border-white/5 rounded-2xl p-12 text-center shadow-sm dark:shadow-none">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">No activity yet</h3>
                        <p className="text-text-secondary max-w-sm mx-auto">
                            Start by adding subjects and uploading your study materials to see your activity here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
