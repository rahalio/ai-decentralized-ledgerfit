import { useEffect, useState } from 'react';
import { api, ListEnvelope } from '../../../lib/api';
import {
  BrandSeal,
  PageHeader,
  SyntheticQuarantineBadge,
  ThresholdPolicyChip,
} from '../../../components/product';
import '../../../components/product.css';

type Artefact = {
  id: string;
  algorithm?: string;
  promotionState?: string;
  dataLabel?: string;
  contentDigest?: string;
};

export function ModelsView() {
  const [items, setItems] = useState<Artefact[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<ListEnvelope<Artefact>>('/v1/model-artefacts')
      .then((r) => setItems(r.data.items))
      .catch((e) => setError(e.message));
  }, []);

  async function promote(id: string) {
    try {
      await api(`/v1/model-artefacts/${id}/promote`, {
        method: 'POST',
        body: JSON.stringify({ approverNote: 'Governor approval from console' }),
      });
      const r = await api<ListEnvelope<Artefact>>('/v1/model-artefacts');
      setItems(r.data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Promote failed');
    }
  }

  return (
    <div>
      <PageHeader
        title="Model artefacts"
        subtitle="Promote only ledger-proven artefacts; quarantine synthetic."
        seal
      />
      {error ? <p role="alert">{error}</p> : null}
      <section className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Artefact</th>
              <th>State</th>
              <th>Label</th>
              <th>Policy</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="muted">
                  No artefacts yet — complete a training job first.
                </td>
              </tr>
            ) : (
              items.map((a) => (
                <tr key={a.id}>
                  <td>
                    <div className="mono">{a.id}</div>
                    <div className="muted">{a.algorithm}</div>
                    {a.dataLabel === 'synthetic' ? (
                      <SyntheticQuarantineBadge />
                    ) : null}
                  </td>
                  <td>{a.promotionState}</td>
                  <td>{a.dataLabel}</td>
                  <td>
                    <ThresholdPolicyChip />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn--mint"
                      onClick={() => promote(a.id)}
                      disabled={a.dataLabel === 'synthetic'}
                    >
                      Promote
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div style={{ marginTop: 16 }}>
          <BrandSeal />
        </div>
      </section>
    </div>
  );
}
