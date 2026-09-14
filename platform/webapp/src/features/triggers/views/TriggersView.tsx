import { FormEvent, useEffect, useState } from 'react';
import { api, ListEnvelope } from '../../../lib/api';
import {
  PageHeader,
  TriggerFireTimeline,
} from '../../../components/product';
import '../../../components/product.css';

type Trigger = {
  id: string;
  name?: string;
  condition?: string;
  enabled?: boolean;
  lastFiredAt?: string | null;
};

export function TriggersView() {
  const [items, setItems] = useState<Trigger[]>([]);
  const [ledgers, setLedgers] = useState<Array<{ id: string; name?: string }>>(
    []
  );
  const [ledgerId, setLedgerId] = useState('');
  const [name, setName] = useState('New blocks rescore');
  const [fires, setFires] = useState<Array<{ at: string; detail: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const [t, l] = await Promise.all([
      api<ListEnvelope<Trigger>>('/v1/smart-contract-triggers'),
      api<ListEnvelope<{ id: string; name?: string }>>('/v1/ledgers'),
    ]);
    setItems(t.data.items);
    setLedgers(l.data.items);
    if (!ledgerId && l.data.items[0]) setLedgerId(l.data.items[0].id);
  }

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    try {
      await api('/v1/smart-contract-triggers', {
        method: 'POST',
        body: JSON.stringify({
          ledgerId,
          name,
          condition: 'newBlocksThreshold',
          lifecycleStep: 'modelScoring',
          executionMode: 'streaming',
          algorithm: 'associationRuleMining',
          newBlocksThreshold: 10,
          enabled: true,
        }),
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed');
    }
  }

  async function fire(id: string) {
    try {
      const res = await api<{ data: { jobId?: string; firedAt?: string } }>(
        `/v1/smart-contract-triggers/${id}/fire`,
        { method: 'POST' }
      );
      setFires((prev) => [
        {
          at: res.data.firedAt || new Date().toISOString(),
          detail: `Fired ${id} → job ${res.data.jobId || 'n/a'}`,
        },
        ...prev,
      ]);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fire failed');
    }
  }

  return (
    <div>
      <PageHeader
        title="Smart-contract triggers"
        subtitle="Lifecycle automation for train / score cycles — not calendar folklore."
      />
      {error ? <p role="alert">{error}</p> : null}
      <form className="panel" onSubmit={onCreate} style={{ marginBottom: 24 }}>
        <div className="grid-2">
          <label className="muted">
            Ledger
            <select
              value={ledgerId}
              onChange={(e) => setLedgerId(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 8 }}
            >
              {ledgers.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name || l.id}
                </option>
              ))}
            </select>
          </label>
          <label className="muted">
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 8 }}
            />
          </label>
        </div>
        <button type="submit" className="btn btn--mint" style={{ marginTop: 16 }}>
          Create trigger
        </button>
      </form>
      <div className="grid-2">
        <section className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Condition</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td className="mono">{t.condition}</td>
                  <td>
                    <button type="button" className="btn" onClick={() => fire(t.id)}>
                      Fire
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="panel">
          <h2 style={{ marginTop: 0 }}>Fire history</h2>
          <TriggerFireTimeline events={fires} />
        </section>
      </div>
    </div>
  );
}
