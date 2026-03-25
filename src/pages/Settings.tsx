import { User, Bell, Moon, Sun, Monitor, LogOut, Save } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Settings = () => {
    const { user, updateUser, toggleNotification, logout } = useUser();
    const navigate = useNavigate();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            await updateUser({ name, email });
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-text-secondary mt-1">Manage your account and preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Settings Navigation (Desktop) / List (Mobile) */}
                <div className="md:col-span-1 space-y-2">
                    {['Profile', 'Notifications', 'Appearance', 'Security'].map((item) => (
                        <button
                            key={item}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-medium ${item === 'Profile' ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-gray-100 dark:hover:bg-blue-500/10 hover:text-gray-900 dark:hover:text-blue-400'}`}
                        >
                            {item}
                        </button>
                    ))}
                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/5">
                        <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl transition-colors font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Main Settings Content */}
                <div className="md:col-span-2 space-y-6">
                    {/* Profile Section */}
                    <section className="bg-surface border border-gray-200 dark:border-white/5 rounded-2xl p-6 relative overflow-hidden shadow-sm dark:shadow-none">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            Profile Information
                        </h2>

                        {message && (
                            <div className={`absolute top-6 right-6 text-sm px-3 py-1 rounded-full ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-purple-500/20">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{user.name}</h3>
                                <p className="text-text-secondary">Student • Computer Science</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-text-secondary">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-background border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-text-secondary">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-background border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-2">
                                <button
                                    onClick={handleSaveProfile}
                                    disabled={isSaving || (name === user.name && email === user.email)}
                                    className={`
                                        flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all
                                        ${isSaving || (name === user.name && email === user.email)
                                            ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                            : 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20'
                                        }
                                    `}
                                >
                                    <Save className="w-4 h-4" />
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Appearance Section */}
                    <section className="bg-surface border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm dark:shadow-none">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Monitor className="w-5 h-5 text-primary" />
                            Appearance
                        </h2>

                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: 'light', icon: Sun, label: 'Light' },
                                { id: 'dark', icon: Moon, label: 'Dark' },
                                { id: 'system', icon: Monitor, label: 'System' },
                            ].map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => updateUser({ theme: option.id as any })}
                                    className={`
                                        flex flex-col items-center gap-3 p-4 rounded-xl border transition-all
                                        ${user.theme === option.id
                                            ? 'bg-primary/10 border-primary text-primary'
                                            : 'bg-background border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 text-text-secondary'
                                        }
                                    `}
                                >
                                    <option.icon className="w-6 h-6" />
                                    <span className="font-medium">{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Notifications Section */}
                    <section className="bg-surface border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm dark:shadow-none">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-primary" />
                            Notifications
                        </h2>

                        <div className="space-y-4">
                            {[
                                { key: 'email', label: 'Email Notifications', desc: 'Receive daily study summaries' },
                                { key: 'push', label: 'Push Notifications', desc: 'Get reminded about study schedules' },
                                { key: 'updates', label: 'Product Updates', desc: 'New features and improvements' }
                            ].map((item) => (
                                <div key={item.key} className="flex justify-between items-center py-2">
                                    <div>
                                        <h3 className="font-medium">{item.label}</h3>
                                        <p className="text-sm text-text-secondary">{item.desc}</p>
                                    </div>
                                    <button
                                        onClick={() => toggleNotification(item.key as any)}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${user.notifications[item.key as keyof typeof user.notifications] ? 'bg-primary' : 'bg-gray-200 dark:bg-white/10'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${user.notifications[item.key as keyof typeof user.notifications] ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Settings;
