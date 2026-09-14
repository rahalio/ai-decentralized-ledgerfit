import { useEffect, useState } from 'react';
import { api, ListEnvelope } from '../lib/api';
import { PageHeader, SiteFreezeBanner } from '../components/product';
import '../components/product.css';

type Freeze = {
  id: string;
  status?: string;
  reason?: string;
  slaDeadline?: string;
  memberId?: string;
};

export function FreezePage() {
  const [items, setItems] = useState<Freeze[]>([]);
  const [members, setMembers] = useState<Array<{ id: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const [f, ledgers] = await Promise.all([
      api<ListEnvelope<Freeze>>('/v1/freeze-orders'),
      api<ListEnvelope<{ id: string }>>('/v1/ledgers'),
    ]);
    setItems(f.data.items);
    if (ledgers.data.items[0]) {
      const m = await api<ListEnvelope<{ id: string }>>(
        `/v1/ledgers/${ledgers.data.items[0].id}/members`
      );
      setMembers(m.data.items);
    }
  }

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, []);

  async function issueFreeze() {
    const memberId = members[0]?.id;
    if (!memberId) {
      setError('Add a pharmacy member before issuing a freeze.');
      return;
    }
    try {
      await api(`/v1/members/${memberId}/freeze`, {
        method: 'POST',
        body: JSON.stringify({
          reason: 'Connector fault — pause anchoring/scoring',
          freezeAnchoring: true,
          freezeScoring: true,
          slaHours: 24,
        }),
      });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Freeze failed');
    }
  }

  const active = items.filter((i) => i.status === 'active');

  return (
    <div>
      <PageHeader
        title="Site freeze"
        subtitle="Kill-switch without erasing history. SLA-bound acknowledgement."
      />
      <SiteFreezeBanner
        active={active.length > 0}
        message={active[0]?.reason}
      />
      {error ? <p role="alert">{error}</p> : null}
      <section className="panel">
        <button type="button" className="btn btn--mint" onClick={issueFreeze}>
          Issue freeze for first member
        </button>
        <table className="table" style={{ marginTop: 16 }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Status</th>
              <th>SLA</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {items.map((f) => (
              <tr key={f.id}>
                <td className="mono">{f.id}</td>
                <td>{f.status}</td>
                <td className="mono">{f.slaDeadline}</td>
                <td>{f.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
