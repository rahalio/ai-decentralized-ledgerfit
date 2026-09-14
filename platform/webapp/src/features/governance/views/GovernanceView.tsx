import { FormEvent, useEffect, useState } from 'react';
import { api, ListEnvelope } from '../../../lib/api';
import {
  PageHeader,
  ThresholdPolicyChip,
} from '../../../components/product';
import '../../../components/product.css';

type Policy = {
  id: string;
  name?: string;
  version?: number;
  status?: string;
  thresholds?: {
    minSupport?: number;
    minConfidence?: number;
    maxItems?: number;
  };
};

export function GovernanceView() {
  const [items, setItems] = useState<Policy[]>([]);
  const [name, setName] = useState('ARM defaults');
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const r = await api<ListEnvelope<Policy>>('/v1/threshold-policies');
    setItems(r.data.items);
  }

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    try {
      await api('/v1/threshold-policies', {
        method: 'POST',
        body: JSON.stringify({
          name,
          thresholds: { minSupport: 0.2, minConfidence: 0.7, maxItems: 3 },
        }),
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed');
    }
  }

  async function approve(id: string) {
    try {
      await api(`/v1/threshold-policies/${id}/approve`, {
        method: 'POST',
        body: JSON.stringify({ approverNote: 'Governor approved defaults' }),
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Approve failed');
    }
  }

  return (
    <div>
      <PageHeader
        title="Threshold policy editor"
        subtitle="Version support / confidence / max-items before production binding."
      />
      {error ? <p role="alert">{error}</p> : null}
      <form className="panel" onSubmit={onCreate} style={{ marginBottom: 24 }}>
        <ThresholdPolicyChip />
        <label className="muted" style={{ display: 'block', marginTop: 16 }}>
          Policy name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: 'block', width: '100%', marginTop: 8 }}
          />
        </label>
        <button type="submit" className="btn btn--mint" style={{ marginTop: 16 }}>
          Propose version
        </button>
      </form>
      <section className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Version</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td className="mono">{p.version ?? 1}</td>
                <td>{p.status}</td>
                <td>
                  <button type="button" className="btn" onClick={() => approve(p.id)}>
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
