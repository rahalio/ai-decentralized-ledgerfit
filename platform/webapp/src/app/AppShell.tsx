import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearSession } from '../lib/api';
import './shell.css';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/ledgers', label: 'Ledgers' },
  { to: '/training', label: 'Training jobs' },
  { to: '/models', label: 'Model artefacts' },
  { to: '/triggers', label: 'Triggers' },
  { to: '/investigation', label: 'Investigation' },
  { to: '/provenance', label: 'Provenance' },
  { to: '/freeze', label: 'Site freeze' },
  { to: '/governance', label: 'Thresholds' },
];

export function AppShell() {
  const navigate = useNavigate();
  return (
    <div className="shell">
      <header className="shell__header">
        <Link to="/" className="shell__brand" aria-label="Ledgerfit home">
          <span className="shell__seal" aria-hidden />
          <span className="shell__wordmark">Ledgerfit</span>
        </Link>
        <nav className="shell__nav" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'shell__link shell__link--active' : 'shell__link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="shell__logout"
          onClick={() => {
            clearSession();
            navigate('/login');
          }}
        >
          Sign out
        </button>
      </header>
      <main className="shell__main anim-seal">
        <Outlet />
      </main>
    </div>
  );
}
