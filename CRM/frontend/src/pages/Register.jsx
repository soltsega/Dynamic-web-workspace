import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Lock, Mail, Server, ArrowRight, Eye, EyeOff, User } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showUsername, setShowUsername] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }
        
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/register', { name, email, username, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
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
                className="w-full max-w-[450px] p-8 z-10"
            >
                <div className="text-center mb-10">
                    <motion.div 
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/30"
                    >
                        <Server className="text-white" size={28} />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Create Account</h1>
                    <p className="text-text-secondary text-sm">Join our professional CRM platform</p>
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

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-dim uppercase tracking-wider block">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
                                    <input 
                                        type="text"
                                        className="input pl-10"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-dim uppercase tracking-wider block">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
                                    <input 
                                        type="email"
                                        className="input pl-10"
                                        placeholder="john@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-text-dim uppercase tracking-wider block">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
                                <input 
                                    type={showUsername ? "text" : "password"}
                                    className="input pl-10 pr-10"
                                    placeholder="Choose a username"
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        autoComplete="new-password"
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

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-text-dim uppercase tracking-wider block">Confirm</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        className="input pl-10"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full py-3.5 justify-center mt-4 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-transform"
                        >
                            {loading ? 'Creating Account...' : 'Get Started'}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-text-dim text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-indigo-500 hover:text-indigo-400 font-medium transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-text-dim text-xs mt-10">
                    Join 10,000+ businesses globally.
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
