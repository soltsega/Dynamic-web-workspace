import React, { useState } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Globe, Calendar, MessageSquare, Send, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

const LeadsView = ({ leads, onUpdate }) => {
    const [expandedId, setExpandedId] = useState(null);
    const [noteText, setNoteText] = useState('');
    const [sending, setSending] = useState(false);

    const updateStatus = async (id, newStatus) => {
        try {
            await api.patch(`/leads/${id}/status`, { status: newStatus });
            onUpdate();
        } catch (err) {
            console.error(err);
        }
    };

    const addNote = async (id) => {
        if (!noteText.trim()) return;
        setSending(true);
        try {
            await api.post(`/leads/${id}/notes`, { text: noteText });
            setNoteText('');
            onUpdate();
        } catch (err) {
            console.error(err);
        } finally {
            setSending(false);
        }
    };

    const statusColors = {
        New: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: 'rgba(245, 158, 11, 0.2)' },
        Contacted: { bg: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', border: 'rgba(99, 102, 241, 0.2)' },
        Converted: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: 'rgba(16, 185, 129, 0.2)' },
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {leads.map((lead) => {
                    const isExpanded = expandedId === lead._id;
                    const sc = statusColors[lead.status];
                    return (
                        <motion.div
                            key={lead._id}
                            layout
                            className="card"
                            style={{ overflow: 'hidden' }}
                        >
                            {/* Lead Header Row */}
                            <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                                    <div style={{
                                        width: '42px', height: '42px', borderRadius: '50%',
                                        background: 'rgba(99, 102, 241, 0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#818cf8', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0
                                    }}>
                                        {lead.name.charAt(0)}
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <p style={{ fontWeight: 600, color: 'white', fontSize: '0.9375rem' }}>{lead.name}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.75rem' }}>
                                                <Mail size={12} /> {lead.email}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.75rem' }}>
                                                <Globe size={12} /> {lead.source}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.75rem' }}>
                                                <Calendar size={12} /> {new Date(lead.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                                    {/* Status Selector */}
                                    <select
                                        value={lead.status}
                                        onChange={(e) => updateStatus(lead._id, e.target.value)}
                                        style={{
                                            background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                                            borderRadius: '6px', padding: '6px 12px', fontSize: '0.75rem',
                                            fontWeight: 600, cursor: 'pointer', outline: 'none', appearance: 'none',
                                            WebkitAppearance: 'none', minWidth: '110px', textAlign: 'center'
                                        }}
                                    >
                                        <option value="New">New</option>
                                        <option value="Contacted">Contacted</option>
                                        <option value="Converted">Converted</option>
                                    </select>

                                    {/* Notes toggle */}
                                    <button
                                        onClick={() => setExpandedId(isExpanded ? null : lead._id)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '6px',
                                            background: isExpanded ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.05)',
                                            color: isExpanded ? '#818cf8' : '#94a3b8',
                                            border: 'none', borderRadius: '6px', padding: '6px 12px',
                                            fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer'
                                        }}
                                    >
                                        <MessageSquare size={14} />
                                        {lead.notes.length} Notes
                                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </button>
                                </div>
                            </div>

                            {/* Expanded Notes Section */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ padding: '0 24px 20px', borderTop: '1px solid rgba(148,163,184,0.1)' }}>
                                            <div style={{ paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
                                                {lead.notes.length === 0 && (
                                                    <p style={{ color: '#64748b', fontSize: '0.8125rem', textAlign: 'center', padding: '16px 0' }}>No notes recorded yet. Add your first follow-up below.</p>
                                                )}
                                                {lead.notes.map((n, i) => (
                                                    <div key={i} style={{
                                                        background: 'rgba(2, 6, 23, 0.4)', borderRadius: '8px', padding: '12px 14px',
                                                        border: '1px solid rgba(148,163,184,0.05)'
                                                    }}>
                                                        <p style={{ fontSize: '0.8125rem', color: '#f8fafc', lineHeight: 1.6 }}>{n.text}</p>
                                                        <p style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: '6px' }}>{new Date(n.date).toLocaleString()}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Add Note Input */}
                                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Write a follow-up note..."
                                                    value={expandedId === lead._id ? noteText : ''}
                                                    onChange={(e) => setNoteText(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && addNote(lead._id)}
                                                    className="input"
                                                    style={{ flex: 1, fontSize: '0.8125rem' }}
                                                />
                                                <button
                                                    onClick={() => addNote(lead._id)}
                                                    disabled={sending}
                                                    style={{
                                                        background: '#6366f1', color: 'white', border: 'none',
                                                        borderRadius: '8px', padding: '0 16px', cursor: 'pointer',
                                                        display: 'flex', alignItems: 'center', gap: '6px',
                                                        fontSize: '0.8125rem', fontWeight: 600, opacity: sending ? 0.5 : 1
                                                    }}
                                                >
                                                    <Send size={14} />
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default LeadsView;
