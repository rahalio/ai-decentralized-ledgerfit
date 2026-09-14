import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, ListEnvelope } from '../lib/api';
import {
  PageHeader,
  ProvenanceLineageRail,
  SiteFreezeBanner,
  SyntheticQuarantineBadge,
  ThresholdPolicyChip,
} from '../components/product';
import '../components/product.css';

type Ledger = { id?: string; name?: string; status?: string };
type Artefact = {
  id?: string;
  promotionState?: string;
  dataLabel?: string;
};
type Freeze = { id?: string; status?: string; reason?: string };
type Job = { id?: string; status?: string; triggerId?: string | null };

export function HomePage() {
  const [ledgers, setLedgers] = useState<Ledger[]>([]);
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [freezes, setFreezes] = useState<Freeze[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      api<ListEnvelope<Ledger>>('/v1/ledgers'),
      api<ListEnvelope<Artefact>>('/v1/model-artefacts'),
      api<ListEnvelope<Freeze>>('/v1/freeze-orders'),
      api<ListEnvelope<Job>>('/v1/training-jobs'),
    ])
      .then(([l, a, f, j]) => {
        setLedgers(l.data.items);
        setArtefacts(a.data.items);
        setFreezes(f.data.items);
        setJobs(j.data.items);
      })
      .catch((e) => setError(e.message));
  }, []);

  const production = artefacts.filter((a) => a.promotionState === 'production');
  const synthetic = artefacts.filter((a) => a.dataLabel === 'synthetic');
  const activeFreeze = freezes.find((f) => f.status === 'active');
  const lastTriggered = jobs.find((j) => j.triggerId);

  return (
    <div>
      <PageHeader
        title="Consortium home"
        subtitle="Are today’s surveillance models still ledger-proven and trigger-driven?"
        seal
      />
      <SiteFreezeBanner
        active={Boolean(activeFreeze)}
        message={activeFreeze?.reason}
      />
      {error ? <p role="alert">{error}</p> : null}

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <section className="panel">
          <div className="muted">Models with production promotion</div>
          <div className="stat">
            {artefacts.length
              ? `${Math.round((production.length / artefacts.length) * 100)}%`
              : '—'}
          </div>
          <ThresholdPolicyChip />
        </section>
        <section className="panel">
          <div className="muted">Permissioned ledgers</div>
          <div className="stat">{ledgers.length}</div>
          <Link to="/ledgers">Register or inspect networks →</Link>
        </section>
      </div>

      <div className="grid-2">
        <section className="panel">
          <h2 style={{ marginTop: 0 }}>Lineage health</h2>
          <ProvenanceLineageRail
            steps={[
              {
                label: 'Ledger networks',
                detail: ledgers[0]?.name || 'Register first permissioned ledger',
              },
              {
                label: 'Last trigger-fired job',
                detail: lastTriggered?.id || 'No trigger-linked jobs yet',
              },
              {
                label: 'Production artefacts',
                detail: `${production.length} promoted`,
              },
            ]}
          />
        </section>
        <section className="panel">
          <h2 style={{ marginTop: 0 }}>Alerts</h2>
          {synthetic.length ? (
            <p>
              <SyntheticQuarantineBadge /> {synthetic.length} synthetic
              artefact(s) blocked from production claims.
            </p>
          ) : (
            <p className="muted">No synthetic quarantine alerts.</p>
          )}
          <p>
            <Link to="/models">Review promotions</Link> ·{' '}
            <Link to="/provenance">Export audit pack</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
