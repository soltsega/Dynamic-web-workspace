import { footerLinks } from '../data/siteContent';

function SocialIcon({ icon }) {
  switch (icon) {
    case 'github':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.755-1.333-1.755-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.833 2.807 1.304 3.492.997.108-.775.418-1.305.761-1.604-2.665-.303-5.466-1.333-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.123-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.006-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.221 0 4.61-2.804 5.624-5.476 5.921.43.37.814 1.102.814 2.222 0 1.606-.014 2.896-.014 3.286 0 .321.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297Z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5ZM8 19H5V8h3v11ZM6.5 6.732A1.764 1.764 0 1 1 6.5 3.2a1.764 1.764 0 0 1 0 3.532ZM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765C14.396 7.179 20 6.988 20 12.241V19Z" />
        </svg>
      );
    case 'substack':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22.539 8.242H1.46V5.406h21.079v2.836Zm0 4.381H1.46v2.836h21.079v-2.836Zm0 4.381H1.46V24L12 17.888 22.539 24v-6.996ZM1.46 0v2.836h21.079V0H1.46Z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
        </svg>
      );
    case 'telegram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.24.24-.44.24l.197-2.97 5.4-4.88c.23-.204-.055-.317-.356-.117l-6.67 4.198-2.88-.9c-.628-.198-.643-.628.13-.924l11.26-4.34c.52-.198.98.117.813.901Z" />
        </svg>
      );
    case 'leetcode':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15.725 2.182a1 1 0 0 0-1.414 0L5.329 11.16a4.444 4.444 0 0 0 0 6.286l4.654 4.654a4.444 4.444 0 0 0 6.286 0l1.77-1.77a1 1 0 1 0-1.415-1.414l-1.77 1.77a2.444 2.444 0 0 1-3.456 0l-4.654-4.654a2.444 2.444 0 0 1 0-3.458l8.98-8.978a1 1 0 0 0 0-1.414Z" />
          <path d="M9.25 12a1 1 0 0 1 1-1h10.5a1 1 0 1 1 0 2H10.25a1 1 0 0 1-1-1Z" />
          <path d="M14.311 2.182a1 1 0 1 1 1.414 1.414l5.994 5.994a1 1 0 0 1-1.414 1.414L14.31 5.01a1 1 0 0 1 0-1.414Z" />
        </svg>
      );
    case 'email':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <p>&copy; 2026 Solomon Tsega. All rights reserved.</p>
        <div className="footer-socials">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              aria-label={link.name}
              className={link.variant}
            >
              <SocialIcon icon={link.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
