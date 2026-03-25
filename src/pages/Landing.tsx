import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Folder, Search, Monitor, Play, FileText, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';

const Landing = () => {
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && user) {
            navigate('/app/subjects');
        }
    }, [user, isLoading, navigate]);

    if (isLoading) return null; // Or a loading spinner

    return (
        <div className="min-h-screen bg-background text-text-primary font-sans overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <Folder className="text-white w-5 h-5 fill-current" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">StudyVault</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Home</a>
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#" className="hover:text-white transition-colors">About</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/auth/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            Login
                        </Link>
                        <Link to="/auth/signup" className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-primary/25">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        THE ULTIMATE STUDY HUB
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
                    >
                        Master Your Knowledge.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                            All in One Vault.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Organize PDFs, YouTube lectures, and ChatGPT research in a single, beautiful workspace designed for high-performance students.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/auth/signup" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 text-lg transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95">
                            Enter App <ArrowRight className="w-5 h-5" />
                        </Link>
                        <button className="w-full sm:w-auto bg-surface hover:bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all hover:scale-105 active:scale-95">
                            View Demo
                        </button>
                    </motion.div>
                </div>

                {/* Hero Cards Visual */}
                <div className="mt-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 px-4">
                    {/* PDF Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-500 rounded-l-2xl" />
                        <div className="flex justify-between items-start mb-4">
                            <FileText className="text-red-500 w-8 h-8" />
                            <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">PDF</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">Advanced Thermodynamics.pdf</h3>
                        <p className="text-xs text-secondary mb-4">Added 2 days ago • 4.2 MB</p>
                        <div className="h-32 bg-background/50 rounded-lg w-full relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                                <div className="w-16 h-20 bg-gray-700/50 rounded flex flex-col items-center justify-center gap-2">
                                    <div className="w-10 h-1 bg-gray-600 rounded-full" />
                                    <div className="w-10 h-1 bg-gray-600 rounded-full" />
                                    <div className="w-8 h-1 bg-gray-600 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Video Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 scale-105 shadow-2xl shadow-primary/10 z-10"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl" />
                        <div className="flex justify-between items-start mb-4">
                            <Play className="text-blue-500 w-8 h-8 fill-current" />
                            <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded">YOUTUBE</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">Quantum Physics Lecture 04</h3>
                        <p className="text-xs text-secondary mb-4">MIT Courseware • 45:12</p>
                        <div className="h-32 bg-amber-200/20 rounded-lg w-full relative overflow-hidden flex items-center justify-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <Play className="w-5 h-5 text-white fill-current ml-1" />
                            </div>
                        </div>
                    </motion.div>

                    {/* AI Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-500 rounded-l-2xl" />
                        <div className="flex justify-between items-start mb-4">
                            <MessageSquare className="text-green-500 w-8 h-8" />
                            <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">AI CHAT</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">Organic Chemistry Summary</h3>
                        <p className="text-xs text-secondary mb-4">Extracted via GPT-4 • 12 prompts</p>
                        <div className="h-32 bg-background/50 rounded-lg w-full p-3 space-y-2 overflow-hidden">
                            <div className="h-2 w-3/4 bg-gray-700/50 rounded"></div>
                            <div className="h-2 w-full bg-gray-700/50 rounded"></div>
                            <div className="h-2 w-5/6 bg-gray-700/50 rounded"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-surface/30 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Designed for the Modern Learner</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto">Everything you need to keep your study materials organized and accessible.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Folder, title: "Smart Grouping", desc: "Group related PDFs, videos, and AI chats into 'Vaults' for specific courses or exam prep." },
                            { icon: Search, title: "Global Search", desc: "Find any file or link instantly across all your collections with our lightning-fast search indexing." },
                            { icon: Monitor, title: "Cross-Platform Sync", desc: "Access your study vault from any desktop device. Your materials are always where you are." }
                        ].map((feature, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className="bg-background/50 p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors"
                            >
                                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-primary">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-background border-t border-white/5 py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <Folder className="text-white w-4 h-4 fill-current" />
                        </div>
                        <span className="font-bold text-lg">StudyVault</span>
                    </div>

                    <div className="flex gap-8 text-sm text-text-secondary">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                        <a href="#" className="hover:text-white">Contact</a>
                    </div>

                    <p className="text-xs text-gray-600">© 2026 StudyVault App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
