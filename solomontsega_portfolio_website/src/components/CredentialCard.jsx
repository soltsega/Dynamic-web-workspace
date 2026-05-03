import React from 'react';

const CredentialCard = ({ credential }) => {
  return (
    <article className="glass credential-card reveal active">
      <div className="credential-img">
        <img src={credential.image_url} alt={credential.title} />
      </div>
      <div className="credential-info">
        <span className="badge">{credential.category}</span>
        <h4>{credential.title}</h4>
        {credential.subtitle && <p className="subtitle" style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{credential.subtitle}</p>}
        {credential.verify_link && (
          <a href={credential.verify_link} target="_blank" rel="noopener noreferrer" className="btn secondary small" style={{ marginTop: '1rem' }}>
            Verify
          </a>
        )}
      </div>
    </article>
  );
};

export default CredentialCard;
