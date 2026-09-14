import { useEffect, useState } from 'react';
import { api, ListEnvelope } from '../../../lib/api';
import {
  BrandSeal,
  MaskedHitRow,
  PageHeader,
  RevealDualControl,
} from '../../../components/product';
import '../../../components/product.css';

type Hit = {
  id: string;
  maskedSubjectLabel?: string;
  support?: number;
  confidence?: number;
};

type Reveal = { id: string; status?: string; hitId?: string };

export function InvestigationView() {
  const [hits, setHits] = useState<Hit[]>([]);
  const [reveals, setReveals] = useState<Reveal[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const [h, r] = await Promise.all([
      api<ListEnvelope<Hit>>('/v1/investigation/hits'),
      api<ListEnvelope<Reveal>>('/v1/investigation/reveals'),
    ]);
    setHits(h.data.items);
    setReveals(r.data.items);
  }

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, []);

  async function requestReveal(hitId: string) {
    try {
      await api('/v1/investigation/reveals', {
        method: 'POST',
        body: JSON.stringify({
          hitId,
          reason: 'Casework prioritisation for diversion review',
        }),
      });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Reveal request failed');
    }
  }

  const latest = reveals[0];

  return (
    <div>
      <PageHeader
        title="Investigation workspace"
        subtitle="Masked rule hits until dual-control reveal is approved."
        seal
      />
      {error ? <p role="alert">{error}</p> : null}
      <div className="grid-2">
        <section className="panel">
          <h2 style={{ marginTop: 0 }}>Rule hit queue</h2>
          {hits.length === 0 ? (
            <p className="muted">No rules above policy — queue is clear.</p>
          ) : (
            hits.map((h) => (
              <MaskedHitRow
                key={h.id}
                label={h.maskedSubjectLabel || 'masked-subject'}
                support={h.support ?? 0.25}
                confidence={h.confidence ?? 0.8}
                onReveal={() => requestReveal(h.id)}
              />
            ))
          )}
          <button
            type="button"
            className="btn"
            style={{ marginTop: 12 }}
            onClick={async () => {
              // seed a demo masked hit via local note when empty sandbox
              setHits((prev) =>
                prev.length
                  ? prev
                  : [
                      {
                        id: 'hit_demo',
                        maskedSubjectLabel: '████ / ████',
                        support: 0.28,
                        confidence: 0.81,
                      },
                    ]
              );
            }}
          >
            Load demo masked hit
          </button>
        </section>
        <section className="panel">
          <BrandSeal />
          <RevealDualControl status={latest?.status || 'idle'} />
          <h3>Case notes</h3>
          <p className="muted">
            Notes attach after reveal decisions. PHI remains masked in everyday
            review.
          </p>
        </section>
      </div>
    </div>
  );
}
