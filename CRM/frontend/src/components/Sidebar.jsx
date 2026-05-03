import React from 'react';
import { LayoutDashboard, Users, PieChart, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView }) => {
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'leads', icon: Users, label: 'Leads' },
        { id: 'analytics', icon: PieChart, label: 'Analytics' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <aside className="sidebar">
            <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
                    <div style={{ width: '32px', height: '32px', backgroundColor: '#6366f1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LayoutDashboard size={18} color="white" />
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '-0.025em' }}>MiniCRM</span>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#64748b', marginBottom: '16px', letterSpacing: '0.1em' }}>Main Menu</p>
                    {menuItems.map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => setActiveView(item.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                backgroundColor: activeView === item.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                color: activeView === item.id ? '#818cf8' : '#94a3b8',
                                textAlign: 'left',
                                width: '100%'
                            }}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div style={{ marginTop: 'auto', padding: '24px', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
                <button 
                    onClick={logout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        backgroundColor: 'transparent',
                        color: '#94a3b8',
                        width: '100%',
                        textAlign: 'left'
                    }}
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
