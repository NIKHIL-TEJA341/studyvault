import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Settings, LogOut, Plus, Folder } from 'lucide-react';
import { useState, useEffect } from 'react';
import AddMaterialModal from '../components/AddMaterialModal';
import { useUser } from '../context/UserContext';

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, isLoading, logout } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/auth/login');
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/app' },
        { icon: BookOpen, label: 'Subjects', path: '/app/subjects' },
        { icon: Settings, label: 'Settings', path: '/app/settings' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    return (
        <div className="min-h-screen bg-background text-text-primary flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-[280px] bg-surface border-r border-gray-200 dark:border-white/5 h-screen sticky top-0 p-6 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="bg-primary p-2 rounded-xl">
                        <Folder className="text-white w-6 h-6 fill-current" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">StudyVault</span>
                </div>

                <div className="mb-8">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 group"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        <span>New Material</span>
                    </button>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                    flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group
                                    ${isActive
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-text-secondary hover:text-gray-900 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-blue-500/10'
                                    }
                                `}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'transition-colors'}`} />
                                <span className={isActive ? 'text-primary' : ''}>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-h-screen p-4 lg:p-8 overflow-y-auto pb-24 lg:pb-8">
                {/* Mobile Header (minimal) */}
                <div className="lg:hidden flex items-center justify-between mb-6 pt-2">
                    <Link to="/app" className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <Folder className="text-white w-5 h-5 fill-current" />
                        </div>
                        <span className="font-bold text-lg">StudyVault</span>
                    </Link>
                    <div className="w-8 h-8 bg-surface rounded-full flex items-center justify-center border border-gray-200 dark:border-white/10">
                        {/* User Avatar Placeholder */}
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary to-purple-500" />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 px-6 py-4 flex justify-between items-center z-50">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}
                        >
                            <div className={`p-1.5 rounded-full ${isActive ? 'bg-primary/10' : ''}`}>
                                <item.icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                            </div>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-900 dark:hover:text-blue-400 transition-colors"
                >
                    <div className="p-1.5">
                        <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-blue-500/20 transition-colors">
                            <Plus className="w-4 h-4" />
                        </div>
                    </div>
                    <span className="text-[10px] font-medium">Add</span>
                </button>
            </div>

            <AddMaterialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default MainLayout;
