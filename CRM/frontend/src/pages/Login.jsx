import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Lock, Mail, Server, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showUsername, setShowUsername] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Unauthorized access');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden">
            {/* Animated Background Accents */}
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.05, 0.1, 0.05] 
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500 blur-[120px]"
            ></motion.div>
            <motion.div 
                animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.05, 0.08, 0.05] 
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500 blur-[120px]"
            ></motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[400px] p-8 z-10"
            >
                <div className="text-center mb-10">
                    <motion.div 
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/30"
                    >
                        <Server className="text-white" size={28} />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-text-secondary text-sm">Access your CRM admin control panel</p>
                </div>

                <div className="card p-8 border-white/5 bg-[#0f172a]/50 backdrop-blur-xl shadow-2xl">
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-danger/10 border border-danger/20 text-danger px-4 py-2 rounded-md mb-6 text-xs font-medium text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-text-dim uppercase tracking-wider block">Username</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
                                <input 
                                    type={showUsername ? "text" : "password"}
                                    className="input pl-10 pr-10"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    autoComplete="username"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowUsername(!showUsername)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text-secondary transition-colors"
                                >
                                    {showUsername ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-text-dim uppercase tracking-wider block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    className="input pl-10 pr-10"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text-secondary transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full py-3.5 justify-center mt-4 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-transform"
                        >
                            {loading ? 'Verifying...' : 'Continue to Dashboard'}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-text-dim text-sm">
                            New here?{' '}
                            <Link to="/register" className="text-indigo-500 hover:text-indigo-400 font-medium transition-colors">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-text-dim text-xs mt-10">
                    Trusted by 10,000+ businesses globally.
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
