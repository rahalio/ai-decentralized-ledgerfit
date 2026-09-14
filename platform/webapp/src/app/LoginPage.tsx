import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, markAuthed, setApiKey } from '../lib/api';
import './login.css';

export function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      setApiKey('ledgerfit_demo_local_dev_key');
      await api('/v0/auth/me');
      markAuthed();
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login">
      <div className="login__plane" aria-hidden />
      <form className="login__panel anim-seal" onSubmit={onSubmit}>
        <div className="login__brand">
          <span className="login__seal" aria-hidden />
          <h1 className="login__wordmark">Ledgerfit</h1>
        </div>
        <p className="login__headline">Train only on sealed ledger events</p>
        <p className="login__support">
          Permissioned-pharmacy surveillance console. Demo key is prefilled for
          local sandbox.
        </p>
        {error ? <p className="login__error" role="alert">{error}</p> : null}
        <button type="submit" className="login__cta" disabled={busy}>
          {busy ? 'Sealing session…' : 'Enter consortium'}
        </button>
      </form>
    </div>
  );
}
