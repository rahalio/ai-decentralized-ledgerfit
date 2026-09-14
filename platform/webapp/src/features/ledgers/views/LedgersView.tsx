import { FormEvent, useEffect, useState } from 'react';
import { api, DataEnvelope, ListEnvelope } from '../../../lib/api';
import {
  PageHeader,
  SiteFreezeBanner,
} from '../../../components/product';
import '../../../components/product.css';

type Ledger = {
  id: string;
  name: string;
  fabricType?: string;
  status?: string;
  permissioned?: boolean;
};

export function LedgersView() {
  const [items, setItems] = useState<Ledger[]>([]);
  const [name, setName] = useState('');
  const [fabricType, setFabricType] = useState('hyperledger');
  const [error, setError] = useState<string | null>(null);
  const [freezes, setFreezes] = useState<Array<{ status?: string }>>([]);

  async function load() {
    const [ledgers, freezeOrders] = await Promise.all([
      api<ListEnvelope<Ledger>>('/v1/ledgers'),
      api<ListEnvelope<{ status?: string }>>('/v1/freeze-orders'),
    ]);
    setItems(ledgers.data.items);
    setFreezes(freezeOrders.data.items);
  }

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, []);

  async function onRegister(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await api<DataEnvelope<Ledger>>('/v1/ledgers', {
        method: 'POST',
        body: JSON.stringify({ name, fabricType }),
      });
      setName('');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Register failed');
    }
  }

  return (
    <div>
      <PageHeader
        title="Ledgers and members"
        subtitle="Register permissioned networks only — refuse public-chain token sources."
      />
      <SiteFreezeBanner active={freezes.some((f) => f.status === 'active')} />
      {error ? <p role="alert">{error}</p> : null}

      <form className="panel" onSubmit={onRegister} style={{ marginBottom: 24 }}>
        <h2 style={{ marginTop: 0 }}>Register ledger</h2>
        <div className="grid-2">
          <label className="muted">
            Network name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 8 }}
            />
          </label>
          <label className="muted">
            Fabric
            <select
              value={fabricType}
              onChange={(e) => setFabricType(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 8 }}
            >
              <option value="hyperledger">hyperledger</option>
              <option value="kaleido">kaleido</option>
              <option value="quorum">quorum</option>
            </select>
          </label>
        </div>
        <button type="submit" className="btn btn--mint" style={{ marginTop: 16 }}>
          Register permissioned ledger
        </button>
      </form>

      <section className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Fabric</th>
              <th>Status</th>
              <th>Id</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="muted">
                  Empty — register the first permissioned ledger.
                </td>
              </tr>
            ) : (
              items.map((l) => (
                <tr key={l.id}>
                  <td>{l.name}</td>
                  <td className="mono">{l.fabricType}</td>
                  <td>{l.status}</td>
                  <td className="mono">{l.id}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
