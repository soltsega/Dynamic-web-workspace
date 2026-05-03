import React, { useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Mail, Globe, Calendar, MoreVertical, MessageSquare, ExternalLink, ChevronDown } from 'lucide-react';

const LeadCard = ({ lead, onUpdate, index }) => {
    const [expanded, setExpanded] = useState(false);
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);

    const updateStatus = async (newStatus) => {
        try {
            await api.patch(`/leads/${lead._id}/status`, { status: newStatus });
            onUpdate();
        } catch (err) {
            console.error(err);
        }
    };

    const addNote = async (e) => {
        e.preventDefault();
        if (!note.trim()) return;
        setLoading(true);
        try {
            await api.post(`/leads/${lead._id}/notes`, { text: note });
            setNote('');
            onUpdate();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const statusColors = {
        New: 'bg-warning/10 text-warning border-warning/20',
        Contacted: 'bg-accent/10 text-accent border-accent/20',
        Converted: 'bg-success/10 text-success border-success/20',
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="glass overflow-hidden flex flex-col h-full hover:shadow-xl hover:shadow-indigo-500/10 transition-all border-white/5"
        >
            <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[lead.status]}`}>
                        {lead.status}
                    </span>
                    <button className="text-text-muted hover:text-white p-1">
                        <MoreVertical size={18} />
                    </button>
                </div>

                <h3 className="text-lg font-bold mb-1">{lead.name}</h3>
                <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
                    <Mail size={14} />
                    <span className="truncate">{lead.email}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-text-muted">
                            <Globe size={14} />
                            <span>Source</span>
                        </div>
                        <span className="font-medium">{lead.source}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-text-muted">
                            <Calendar size={14} />
                            <span>Received</span>
                        </div>
                        <span className="font-medium">{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div className="relative group">
                        <select 
                            className="w-full bg-white/10 border border-white/10 rounded-lg py-2 px-3 text-xs font-medium appearance-none cursor-pointer hover:bg-white/20 transition-colors"
                            value={lead.status}
                            onChange={(e) => updateStatus(e.target.value)}
                        >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Converted">Converted</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={14} />
                    </div>
                    <button 
                        onClick={() => setExpanded(!expanded)}
                        className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium transition-all ${expanded ? 'bg-primary text-white shadow-lg' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        <MessageSquare size={14} />
                        {expanded ? 'Hide Notes' : 'View Notes'}
                    </button>
                </div>

                {expanded && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="pt-3 space-y-4"
                    >
                        <div className="max-h-40 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                            {lead.notes.length === 0 ? (
                                <p className="text-xs text-text-muted text-center py-4">No notes yet</p>
                            ) : (
                                lead.notes.map((n, i) => (
                                    <div key={i} className="bg-dark/40 p-3 rounded-lg border border-white/5">
                                        <p className="text-xs">{n.text}</p>
                                        <p className="text-[10px] text-text-muted mt-2">{new Date(n.date).toLocaleString()}</p>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        <form onSubmit={addNote} className="relative">
                            <input 
                                type="text" 
                                placeholder="Add a note..." 
                                className="w-full bg-dark/60 border border-white/10 rounded-lg py-2 px-3 text-xs focus:border-primary outline-none pr-10"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white disabled:opacity-50"
                            >
                                <ExternalLink size={14} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default LeadCard;
