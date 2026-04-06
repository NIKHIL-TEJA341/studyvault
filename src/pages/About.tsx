import { Link } from 'react-router-dom';
import {
    Folder,
    ArrowLeft,
    Upload,
    FolderOpen,
    Search,
    Sparkles,
    FileText,
    Play,
    MessageSquare,
    Shield,
    Zap,
    Users,
    BookOpen,
    ArrowRight,
    GraduationCap,
    Target,
    Lightbulb,
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
};

const About = () => {
    return (
        <div className="min-h-screen bg-background text-text-primary font-sans overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <Folder className="text-white w-5 h-5 fill-current" />
                        </div>
                        <Link to="/" className="font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
                            StudyVault
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <Link to="/#features" className="hover:text-white transition-colors">Features</Link>
                        <Link to="/about" className="text-white transition-colors">About</Link>
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

            {/* Hero / Intro Section */}
            <section className="pt-32 pb-20 px-6 relative">
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Home
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-primary mb-8 uppercase"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        How StudyVault Works
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight"
                    >
                        Your Study Materials,{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">
                            Brilliantly Organized.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-text-secondary mb-6 max-w-3xl mx-auto leading-relaxed"
                    >
                        StudyVault is the all-in-one digital workspace that transforms how you collect, organize, and
                        revisit your learning resources. No more scattered bookmarks, lost PDFs, or forgotten lecture links —
                        everything lives in one beautiful, searchable vault.
                    </motion.p>
                </div>

                {/* Background Glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[140px] -z-10 pointer-events-none" />
            </section>

            {/* The Problem / Why Section */}
            <section className="py-20 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Why{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                                StudyVault?
                            </span>
                        </h2>
                        <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                            Modern learning is scattered across dozens of tabs, apps, and folders. StudyVault brings
                            order to the chaos.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Target,
                                title: 'Stay Focused',
                                desc: 'Stop wasting time hunting for files. With smart subject-based organization, your notes, PDFs, and videos are always one click away.',
                                gradient: 'from-red-500 to-orange-500',
                                glowColor: 'bg-red-500/10',
                            },
                            {
                                icon: Lightbulb,
                                title: 'Learn Smarter',
                                desc: 'Combine multiple resource types — lecture videos, textbook PDFs, and AI-generated summaries — in a unified workspace that mirrors how you actually think.',
                                gradient: 'from-amber-400 to-yellow-500',
                                glowColor: 'bg-amber-500/10',
                            },
                            {
                                icon: GraduationCap,
                                title: 'Ace Your Exams',
                                desc: 'When revision time hits, everything is already structured by subject and resource type. Just open your vault and start reviewing.',
                                gradient: 'from-emerald-400 to-green-500',
                                glowColor: 'bg-emerald-500/10',
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp}
                                transition={{ duration: 0.5, delay: i * 0.12 }}
                                className="bg-surface/60 border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:border-white/10"
                            >
                                <div className={`absolute -top-12 -right-12 w-32 h-32 ${item.glowColor} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works - Step by Step */}
            <section className="py-24 bg-surface/20 relative">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-20">
                        <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-3 block">
                            Step by Step
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                            Get started in under a minute. Here's the simple flow that keeps thousands of students organized.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Connecting line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-cyan-400/50 to-emerald-400/50 -translate-x-1/2" />

                        {[
                            {
                                step: '01',
                                title: 'Create Your Account',
                                desc: 'Sign up in seconds with your email. Your personal vault is created instantly — secure, private, and ready to go.',
                                icon: Users,
                                color: 'text-primary',
                                bgColor: 'bg-primary/10',
                                borderColor: 'border-primary/30',
                            },
                            {
                                step: '02',
                                title: 'Add Your Subjects',
                                desc: 'Create subject folders like "Data Structures", "Organic Chemistry", or "Machine Learning". Give each a custom color and description for instant visual recognition.',
                                icon: FolderOpen,
                                color: 'text-cyan-400',
                                bgColor: 'bg-cyan-400/10',
                                borderColor: 'border-cyan-400/30',
                            },
                            {
                                step: '03',
                                title: 'Upload & Save Resources',
                                desc: 'Add PDF documents, paste YouTube lecture links, or save ChatGPT conversations. Each resource gets categorized automatically and stored within your subject vault.',
                                icon: Upload,
                                color: 'text-emerald-400',
                                bgColor: 'bg-emerald-400/10',
                                borderColor: 'border-emerald-400/30',
                            },
                            {
                                step: '04',
                                title: 'Access Anytime, Anywhere',
                                desc: 'Open any resource directly within StudyVault — read PDFs inline, watch embedded videos, or review AI-generated notes. Everything is searchable and always at your fingertips.',
                                icon: Zap,
                                color: 'text-violet-400',
                                bgColor: 'bg-violet-400/10',
                                borderColor: 'border-violet-400/30',
                            },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className={`flex items-start gap-8 mb-16 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Content */}
                                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div
                                        className={`bg-surface/80 border ${step.borderColor} rounded-2xl p-8 relative overflow-hidden backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}
                                    >
                                        <div className={`absolute top-0 ${i % 2 === 0 ? 'right-0' : 'left-0'} w-24 h-24 ${step.bgColor} rounded-full blur-3xl -translate-y-1/2`} />
                                        <span className={`text-5xl font-black ${step.color} opacity-20 absolute top-4 ${i % 2 === 0 ? 'right-6' : 'left-6'}`}>
                                            {step.step}
                                        </span>
                                        <div className={`inline-flex items-center gap-3 mb-4 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                            <div className={`w-10 h-10 rounded-lg ${step.bgColor} flex items-center justify-center`}>
                                                <step.icon className={`w-5 h-5 ${step.color}`} />
                                            </div>
                                            <h3 className="text-xl font-bold">{step.title}</h3>
                                        </div>
                                        <p className="text-text-secondary leading-relaxed relative z-10">{step.desc}</p>
                                    </div>
                                </div>

                                {/* Center dot */}
                                <div className="hidden md:flex flex-col items-center">
                                    <div className={`w-4 h-4 rounded-full ${step.bgColor} border-2 ${step.borderColor} shadow-lg`} />
                                </div>

                                {/* Spacer */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Background glow */}
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
            </section>

            {/* What You Can Store Section */}
            <section className="py-24 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-16">
                        <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-3 block">
                            Resource Types
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Can Store</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                            Three powerful resource types, one unified experience.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* PDF */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-surface border border-white/5 rounded-3xl p-8 h-full hover:border-red-500/30 transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mb-6 shadow-xl shadow-red-500/20">
                                    <FileText className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">PDF Documents</h3>
                                <p className="text-text-secondary leading-relaxed mb-6">
                                    Upload textbook chapters, research papers, class handouts, and reference materials.
                                    View them directly within the app with our built-in PDF reader — no external app needed.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Inline Viewer', 'Upload & Store', 'Subject Tagging'].map(tag => (
                                        <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* YouTube */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-surface border border-white/5 rounded-3xl p-8 h-full hover:border-blue-500/30 transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
                                    <Play className="w-8 h-8 text-white fill-current" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">YouTube Lectures</h3>
                                <p className="text-text-secondary leading-relaxed mb-6">
                                    Paste any YouTube URL and it's saved to your subject vault instantly.
                                    Watch lectures in an embedded player without leaving StudyVault — no distractions, pure focus.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Embedded Player', 'Paste & Save', 'Thumbnail Preview'].map(tag => (
                                        <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* AI Chat */}
                        <motion.div
                            {...fadeUp}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-surface border border-white/5 rounded-3xl p-8 h-full hover:border-emerald-500/30 transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
                                    <MessageSquare className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">AI Chat Links</h3>
                                <p className="text-text-secondary leading-relaxed mb-6">
                                    Save your ChatGPT conversations, Claude threads, or any AI research links.
                                    Keep track of the prompts and insights that helped you understand tough concepts.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['One-Click Save', 'Quick Access', 'Research Tracking'].map(tag => (
                                        <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Background glow */}
                <div className="absolute top-1/2 right-0 w-[400px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            </section>

            {/* Built With Care Section */}
            <section className="py-20 bg-surface/30 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Built With Care</h2>
                        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                            Every detail is designed to make your study sessions smoother and more productive.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: Shield, title: 'Secure & Private', desc: 'Your data is protected with authentication and secure cloud storage.' },
                            { icon: Search, title: 'Instant Search', desc: 'Find any resource across all your subjects in milliseconds.' },
                            { icon: Zap, title: 'Blazing Fast', desc: 'Built with React and Vite for instant page loads and smooth interactions.' },
                            { icon: BookOpen, title: 'Clean Interface', desc: 'A distraction-free dark UI that keeps you focused on what matters — learning.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                {...fadeUp}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="text-center p-6 rounded-2xl bg-background/50 border border-white/5 hover:border-primary/30 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold mb-2">{item.title}</h4>
                                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 relative">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Ready to{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                                Transform
                            </span>{' '}
                            Your Study Routine?
                        </h2>
                        <p className="text-text-secondary text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                            Join students who are already organizing smarter, studying better, and acing their exams with StudyVault.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/auth/signup"
                                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 text-lg transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
                            >
                                Get Started Free <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                to="/"
                                className="w-full sm:w-auto bg-surface hover:bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all hover:scale-105 active:scale-95"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
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
                        <a href="#" onClick={(e) => { e.preventDefault(); toast('Privacy Policy coming soon! 🚀'); }} className="hover:text-white">Privacy Policy</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); toast('Terms of Service coming soon! 🚀'); }} className="hover:text-white">Terms of Service</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); toast('Contact coming soon! 🚀'); }} className="hover:text-white">Contact</a>
                    </div>

                    <p className="text-xs text-gray-600">© 2026 StudyVault App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default About;
