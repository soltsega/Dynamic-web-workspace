import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectApi, credentialApi, messageApi } from '../api';
import { Plus, Trash, Edit, LogOut, MessageSquare, Briefcase, Award } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [activeTab, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res;
      if (activeTab === 'projects') res = await projectApi.getAll();
      else if (activeTab === 'credentials') res = await credentialApi.getAll();
      else if (activeTab === 'messages') res = await messageApi.getAll();
      setData(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      if (activeTab === 'projects') await projectApi.delete(id);
      else if (activeTab === 'credentials') await credentialApi.delete(id);
      fetchData();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="section container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h2 className="section-title" style={{ margin: 0, textAlign: 'left' }}>Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn secondary small">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="project-filters">
        <button className={`filter-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
          <Briefcase size={16} /> Projects
        </button>
        <button className={`filter-btn ${activeTab === 'credentials' ? 'active' : ''}`} onClick={() => setActiveTab('credentials')}>
          <Award size={16} /> Credentials
        </button>
        <button className={`filter-btn ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
          <MessageSquare size={16} /> Messages
        </button>
      </div>

      <div className="glass about-card" style={{ maxWidth: 'none' }}>
        {activeTab !== 'messages' && (
          <button className="btn primary small" style={{ marginBottom: '1.5rem' }}>
            <Plus size={16} /> Add New {activeTab === 'projects' ? 'Project' : 'Credential'}
          </button>
        )}

        {loading ? (
          <div className="loading">Loading data...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem' }}>Title/Name</th>
                <th style={{ padding: '1rem' }}>{activeTab === 'messages' ? 'Email' : 'Category'}</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <td style={{ padding: '1rem' }}>{item.title || item.name}</td>
                  <td style={{ padding: '1rem' }}>{item.category || item.email}</td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                    {activeTab !== 'messages' && (
                      <button className="btn secondary small"><Edit size={14} /></button>
                    )}
                    {(activeTab !== 'messages') && (
                      <button onClick={() => handleDelete(item.id)} className="btn secondary small" style={{ color: '#ef4444' }}><Trash size={14} /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
