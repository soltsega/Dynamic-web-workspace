import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Shield, Save, Eye, EyeOff } from 'lucide-react';

const SettingsView = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState({
        username: 'admin',
        email: 'admin@minicrm.com',
        currentPassword: '',
        newPassword: '',
        notifications: true,
        emailAlerts: false,
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                {/* Profile Settings */}
                <div className="card" style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={18} color="#818cf8" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'white' }}>Profile</h3>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Manage your account details</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Username</label>
                            <input className="input" value={settings.username} onChange={(e) => setSettings({...settings, username: e.target.value})} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Email Address</label>
                            <input className="input" type="email" value={settings.email} onChange={(e) => setSettings({...settings, email: e.target.value})} />
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="card" style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Shield size={18} color="#f59e0b" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'white' }}>Security</h3>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Update your password</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Current Password</label>
                            <div style={{ position: 'relative' }}>
                                <input className="input" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={settings.currentPassword} onChange={(e) => setSettings({...settings, currentPassword: e.target.value})} />
                                <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>New Password</label>
                            <input className="input" type={showPassword ? 'text' : 'password'} placeholder="Enter new password" value={settings.newPassword} onChange={(e) => setSettings({...settings, newPassword: e.target.value})} />
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="card" style={{ padding: '28px', gridColumn: 'span 2' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Bell size={18} color="#10b981" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'white' }}>Notifications</h3>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Choose what alerts you receive</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { key: 'notifications', label: 'Push Notifications', desc: 'Receive browser notifications for new leads' },
                            { key: 'emailAlerts', label: 'Email Alerts', desc: 'Get an email when a lead status changes' },
                        ].map((item) => (
                            <div key={item.key} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '16px', borderRadius: '8px', background: 'rgba(2, 6, 23, 0.4)',
                                border: '1px solid rgba(148, 163, 184, 0.05)'
                            }}>
                                <div>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white' }}>{item.label}</p>
                                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{item.desc}</p>
                                </div>
                                <button
                                    onClick={() => setSettings({...settings, [item.key]: !settings[item.key]})}
                                    style={{
                                        width: '44px', height: '24px', borderRadius: '99px', border: 'none', cursor: 'pointer',
                                        background: settings[item.key] ? '#6366f1' : 'rgba(255,255,255,0.1)',
                                        position: 'relative', transition: 'background 0.2s'
                                    }}
                                >
                                    <div style={{
                                        width: '18px', height: '18px', borderRadius: '50%', background: 'white',
                                        position: 'absolute', top: '3px',
                                        left: settings[item.key] ? '23px' : '3px',
                                        transition: 'left 0.2s'
                                    }}></div>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Save Button */}
                    <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={handleSave}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                background: saved ? '#10b981' : '#6366f1', color: 'white', border: 'none',
                                borderRadius: '8px', padding: '10px 24px', fontSize: '0.875rem',
                                fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            <Save size={16} />
                            {saved ? 'Saved!' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SettingsView;
