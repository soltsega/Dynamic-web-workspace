import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AnalyticsView = ({ leads }) => {
    const total = leads.length;
    const newCount = leads.filter(l => l.status === 'New').length;
    const contactedCount = leads.filter(l => l.status === 'Contacted').length;
    const convertedCount = leads.filter(l => l.status === 'Converted').length;

    const conversionRate = total > 0 ? ((convertedCount / total) * 100).toFixed(1) : 0;
    const contactRate = total > 0 ? ((contactedCount / total) * 100).toFixed(1) : 0;

    // Source breakdown
    const sources = {};
    leads.forEach(l => { sources[l.source] = (sources[l.source] || 0) + 1; });
    const sourceEntries = Object.entries(sources).sort((a, b) => b[1] - a[1]);

    // Notes activity
    const totalNotes = leads.reduce((sum, l) => sum + l.notes.length, 0);

    const metricCards = [
        { label: 'Conversion Rate', value: `${conversionRate}%`, sub: `${convertedCount} of ${total} leads`, icon: Target, color: '#10b981', trend: '+12%' },
        { label: 'Contact Rate', value: `${contactRate}%`, sub: `${contactedCount} contacted`, icon: Users, color: '#818cf8', trend: '+5%' },
        { label: 'Total Follow-ups', value: totalNotes, sub: `Across ${total} leads`, icon: TrendingUp, color: '#f59e0b', trend: '+8' },
    ];

    const barMax = sourceEntries.length > 0 ? sourceEntries[0][1] : 1;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {/* Metric Cards */}
            <div className="stats-grid" style={{ marginBottom: '32px' }}>
                {metricCards.map((m, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="card"
                        style={{ padding: '24px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <m.icon size={20} color={m.color} />
                            </div>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#10b981' }}>
                                <ArrowUpRight size={14} /> {m.trend}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{m.value}</h3>
                        <p style={{ fontSize: '0.8125rem', color: '#64748b' }}>{m.sub}</p>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Lead Sources Breakdown */}
                <div className="card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'white', marginBottom: '20px' }}>Lead Sources</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {sourceEntries.map(([source, count], idx) => (
                            <div key={idx}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '0.8125rem', color: '#f8fafc', fontWeight: 500 }}>{source}</span>
                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{count} leads</span>
                                </div>
                                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(count / barMax) * 100}%` }}
                                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                                        style={{ height: '100%', background: '#6366f1', borderRadius: '99px' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pipeline Status */}
                <div className="card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'white', marginBottom: '20px' }}>Pipeline Status</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { label: 'New', count: newCount, color: '#f59e0b', pct: total > 0 ? ((newCount / total) * 100).toFixed(0) : 0 },
                            { label: 'Contacted', count: contactedCount, color: '#818cf8', pct: total > 0 ? ((contactedCount / total) * 100).toFixed(0) : 0 },
                            { label: 'Converted', count: convertedCount, color: '#10b981', pct: total > 0 ? ((convertedCount / total) * 100).toFixed(0) : 0 },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></div>
                                        <span style={{ fontSize: '0.8125rem', color: '#f8fafc', fontWeight: 500 }}>{item.label}</span>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.count} ({item.pct}%)</span>
                                </div>
                                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.pct}%` }}
                                        transition={{ duration: 0.6, delay: idx * 0.15 }}
                                        style={{ height: '100%', background: item.color, borderRadius: '99px' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Funnel Visual */}
                    <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <p style={{ fontSize: '0.6875rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '8px' }}>Conversion Funnel</p>
                        {[
                            { label: 'New', count: newCount, w: '100%', color: '#f59e0b' },
                            { label: 'Contacted', count: contactedCount, w: '66%', color: '#818cf8' },
                            { label: 'Converted', count: convertedCount, w: '33%', color: '#10b981' },
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.4, delay: idx * 0.15 }}
                                style={{
                                    width: step.w, height: '32px', background: `${step.color}20`,
                                    borderRadius: '6px', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', gap: '6px', border: `1px solid ${step.color}30`
                                }}
                            >
                                <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: step.color }}>{step.label}: {step.count}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AnalyticsView;
