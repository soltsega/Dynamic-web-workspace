import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function isActiveLink(item, pathname, hash) {
  if (item.type === 'route') {
    return pathname === item.to;
  }

  return pathname === '/' && hash === item.hash;
}

const navItems = [
  { label: 'Home', type: 'anchor', to: '/#home', hash: '#home' },
  { label: 'Work', type: 'anchor', to: '/#projects', hash: '#projects' },
  { label: 'Credentials', type: 'route', to: '/credentials' },
  { label: 'About', type: 'anchor', to: '/#about', hash: '#about' },
];

function NavLinkItem({ item, onNavigate, pathname, hash }) {
  const className = isActiveLink(item, pathname, hash) ? 'active' : '';

  if (item.type === 'route') {
    return (
      <Link to={item.to} className={className} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={item.to} className={className} onClick={onNavigate}>
      {item.label}
    </a>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav className="glass navbar" role="navigation" aria-label="Main navigation">
      <div className="container nav-content">
        <Link to="/" className="logo">
          SOLOMON <span className="gradient-text">TSEGA</span>
        </Link>

        <button
          type="button"
          className="mobile-menu-btn"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`} role="menubar">
          {navItems.map((item) => (
            <li key={item.label} role="none">
              <NavLinkItem
                item={item}
                pathname={location.pathname}
                hash={location.hash}
                onNavigate={() => setIsOpen(false)}
              />
            </li>
          ))}
          <li role="none">
            <a href="/#contact" className="btn" onClick={() => setIsOpen(false)}>
              Say Hello
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
