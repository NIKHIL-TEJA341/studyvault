import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useUser();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login({ email, password });
            navigate('/app');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row text-text-primary overflow-hidden">
            {/* Left Side - Brand/Greeting (Desktop only) */}
            <div className="hidden md:flex w-1/2 bg-surface/30 relative items-center justify-center p-12">
                <div className="absolute inset-0 bg-primary/5 pattern-dots" />
                <div className="relative z-10 max-w-md">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-primary p-2 rounded-xl">
                            <Folder className="text-white w-8 h-8 fill-current" />
                        </div>
                        <span className="font-bold text-3xl tracking-tight">StudyVault</span>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl font-bold mb-6 leading-tight"
                    >
                        Welcome back to your <span className="text-primary">Study Hub</span>.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-text-secondary"
                    >
                        Access your organized notes, videos, and AI summaries in seconds.
                    </motion.p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
                {/* Background glow for mobile */}
                <div className="md:hidden absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10" />

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold">Sign In</h2>
                        <p className="mt-2 text-text-secondary">
                            Don't have an account?{' '}
                            <Link to="/auth/signup" className="text-primary hover:text-primary/80 font-medium">Create an account</Link>
                        </p>
                    </div>

                    <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white p-3 rounded-xl transition-all group">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        <span className="font-medium group-hover:text-white transition-colors">Continue with Google</span>
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-background text-text-secondary">OR EMAIL</span>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all placeholder:text-gray-600"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <a href="#" className="text-xs font-medium text-primary hover:text-primary/80">Forgot Password?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-500" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-surface/50 border border-white/10 rounded-xl py-3 pl-10 pr-10 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all placeholder:text-gray-600"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-surface/50 text-primary focus:ring-primary/50" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">Remember me for 30 days</label>
                        </div>

                        <button
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </motion.div>
            </div>

            <div className="fixed top-4 left-4 md:hidden">
                <Link to="/" className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg">
                        <Folder className="text-white w-5 h-5 fill-current" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Login;
