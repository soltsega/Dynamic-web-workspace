import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import LeadsView from '../components/LeadsView';
import AnalyticsView from '../components/AnalyticsView';
import SettingsView from '../components/SettingsView';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, MoreHorizontal, LayoutDashboard, Clock, MessageSquare, CheckCircle, X } from 'lucide-react';

const Dashboard = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [activeView, setActiveView] = useState('dashboard');
    const [showAddLead, setShowAddLead] = useState(false);
    const [newLead, setNewLead] = useState({ 
        name: '', 
        email: '', 
        phone: '', 
        company: '', 
        jobTitle: '', 
        source: 'Website Form' 
    });
    const [addingLead, setAddingLead] = useState(false);

    const fetchLeads = useCallback(async () => {
        try {
            const res = await api.get('/leads');
            setLeads(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const handleAddLead = async (e) => {
        e.preventDefault();
        setAddingLead(true);
        try {
            await api.post('/leads', newLead);
            setNewLead({ 
                name: '', 
                email: '', 
                phone: '', 
                company: '', 
                jobTitle: '', 
                source: 'Website Form' 
            });
            setShowAddLead(false);
            fetchLeads();
        } catch (err) {
            console.error(err);
        } finally {
            setAddingLead(false);
        }
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) || 
                             lead.email.toLowerCase().includes(search.toLowerCase()) ||
                             (lead.company && lead.company.toLowerCase().includes(search.toLowerCase()));
        const matchesFilter = filter === 'All' || lead.status === filter;
        return matchesSearch && matchesFilter;
    });

    const stats = [
        { label: 'Total Leads', count: leads.length, icon: LayoutDashboard, color: '#818cf8' },
        { label: 'Pending', count: leads.filter(l => l.status === 'New').length, icon: Clock, color: '#f59e0b' },
        { label: 'Contacted', count: leads.filter(l => l.status === 'Contacted').length, icon: MessageSquare, color: '#818cf8' },
        { label: 'Converted', count: leads.filter(l => l.status === 'Converted').length, icon: CheckCircle, color: '#10b981' },
    ];

    const headerConfig = {
        dashboard: { title: 'Lead Overview', sub: 'Manage and track your customer pipeline.' },
        leads: { title: 'Lead Management', sub: 'Update statuses and add follow-up notes to your leads.' },
        analytics: { title: 'Analytics', sub: 'Track your conversion metrics and lead sources.' },
        settings: { title: 'Settings', sub: 'Manage your profile, security, and notification preferences.' },
    };

    const currentHeader = headerConfig[activeView] || headerConfig.dashboard;

    const renderDashboardView = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="dashboard">
            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: '40px' }}>
                {stats.map((stat, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="card"
                        style={{ padding: '20px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontSize: '0.625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', marginBottom: '4px' }}>{stat.label}</p>
                                <h3 style={{ fontSize: '1.875rem', fontWeight: 700, color: stat.color }}>{stat.count}</h3>
                            </div>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <stat.icon size={20} color={stat.color} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Table Area */}
            <div className="card" style={{ padding: '24px' }}>
                <div className="filter-bar">
                    <div className="search-container">
                        <Search className="search-icon" size={18} />
                        <input 
                            type="text" 
                            className="input" 
                            style={{ paddingLeft: '40px' }}
                            placeholder="Search leads..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        {['All', 'New', 'Contacted', 'Converted'].map(s => (
                            <button 
                                key={s}
                                onClick={() => setFilter(s)}
                                style={{
                                    padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem',
                                    fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                                    background: filter === s ? 'rgba(99,102,241,0.1)' : 'transparent',
                                    color: filter === s ? '#818cf8' : '#64748b'
                                }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="table-container">
                    {filteredLeads.length === 0 ? (
                        <div style={{ padding: '60px 0', textAlign: 'center' }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mx-auto"
                                style={{ width: '80px', height: '80px', background: 'rgba(99,102,241,0.05)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}
                            >
                                <LayoutDashboard size={40} color="#6366f1" />
                            </motion.div>
                            <h4 style={{ color: 'white', fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>No leads found</h4>
                            <p style={{ color: '#64748b', fontSize: '0.875rem', maxWidth: '300px', margin: '0 auto 24px' }}>
                                Your pipeline is currently empty. Start by adding your first lead to see the analytics.
                            </p>
                            <button className="btn btn-primary" onClick={() => setShowAddLead(true)}>
                                <Plus size={18} /> Add Your First Lead
                            </button>
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Client</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                    <th>Lead Score</th>
                                    <th>Added</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map((lead) => (
                                    <tr key={lead._id}>
                                        <td style={{ minWidth: '200px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{
                                                    width: '36px', height: '36px', borderRadius: '50%',
                                                    background: 'rgba(99,102,241,0.1)', display: 'flex',
                                                    alignItems: 'center', justifyContent: 'center',
                                                    color: '#818cf8', fontWeight: 700, fontSize: '0.8125rem'
                                                }}>
                                                    {lead.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: 600, color: 'white', fontSize: '0.875rem' }}>{lead.name}</p>
                                                    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{lead.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ color: '#f8fafc', fontSize: '0.875rem', fontWeight: 500 }}>{lead.company || 'Private'}</span>
                                                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{lead.jobTitle || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge badge-${lead.status.toLowerCase()}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ width: '96px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', background: '#6366f1', width: lead.status === 'Converted' ? '100%' : lead.status === 'Contacted' ? '60%' : '20%' }}></div>
                                            </div>
                                        </td>
                                        <td style={{ color: '#64748b', fontSize: '0.75rem' }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}>
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </motion.div>
    );

    const renderContent = () => {
        switch (activeView) {
            case 'leads':
                return <LeadsView key="leads" leads={leads} onUpdate={fetchLeads} />;
            case 'analytics':
                return <AnalyticsView key="analytics" leads={leads} />;
            case 'settings':
                return <SettingsView key="settings" />;
            default:
                return renderDashboardView();
        }
    };

    return (
        <div className="app-container">
            <Sidebar activeView={activeView} setActiveView={setActiveView} />
            
            <main className="main-content">
                {/* Header */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{currentHeader.title}</h2>
                        <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{currentHeader.sub}</p>
                    </div>
                    {(activeView === 'dashboard' || activeView === 'leads') && (
                        <div className="header-actions">
                            <button className="btn btn-primary" onClick={() => setShowAddLead(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Plus size={18} />
                                Add Lead
                            </button>
                        </div>
                    )}
                </header>

                {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '96px 0' }}>
                        <div style={{ width: '48px', height: '48px', border: '4px solid rgba(99,102,241,0.2)', borderTop: '4px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                )}
            </main>

            {/* Add Lead Modal */}
            <AnimatePresence>
                {showAddLead && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
                            backdropFilter: 'blur(4px)'
                        }}
                        onClick={() => setShowAddLead(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="card"
                            style={{ width: '100%', maxWidth: '500px', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>Add New Lead</h3>
                                <button onClick={() => setShowAddLead(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleAddLead} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Full Name</label>
                                        <input className="input" placeholder="John Doe" required value={newLead.name} onChange={(e) => setNewLead({...newLead, name: e.target.value})} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Email</label>
                                        <input className="input" type="email" placeholder="john@example.com" required value={newLead.email} onChange={(e) => setNewLead({...newLead, email: e.target.value})} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Phone Number</label>
                                        <input className="input" placeholder="+1 (555) 000-0000" value={newLead.phone} onChange={(e) => setNewLead({...newLead, phone: e.target.value})} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Lead Source</label>
                                        <select className="input" value={newLead.source} onChange={(e) => setNewLead({...newLead, source: e.target.value})} style={{ appearance: 'none' }}>
                                            <option value="Website Form">Website Form</option>
                                            <option value="Google Ads">Google Ads</option>
                                            <option value="LinkedIn">LinkedIn</option>
                                            <option value="Referral">Referral</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Company</label>
                                        <input className="input" placeholder="Tech Corp" value={newLead.company} onChange={(e) => setNewLead({...newLead, company: e.target.value})} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Job Title</label>
                                        <input className="input" placeholder="Project Manager" value={newLead.jobTitle} onChange={(e) => setNewLead({...newLead, jobTitle: e.target.value})} />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary" disabled={addingLead} style={{ width: '100%', justifyContent: 'center', marginTop: '8px', padding: '12px' }}>
                                    {addingLead ? 'Adding...' : 'Create Lead'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

export default Dashboard;
