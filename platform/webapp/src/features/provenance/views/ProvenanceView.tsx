import { useEffect, useState } from 'react';
import { api, ListEnvelope } from '../../../lib/api';
import {
  PageHeader,
  ProvenanceLineageRail,
} from '../../../components/product';
import '../../../components/product.css';

type RecordRow = {
  id: string;
  artefactId?: string;
  ledgerId?: string;
  jobId?: string;
  eventWindowDigest?: string;
};

export function ProvenanceView() {
  const [items, setItems] = useState<RecordRow[]>([]);
  const [exportRef, setExportRef] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<ListEnvelope<RecordRow>>('/v1/provenance')
      .then((r) => setItems(r.data.items))
      .catch((e) => setError(e.message));
  }, []);

  async function exportPack() {
    try {
      const artefactIds = items.map((i) => i.artefactId).filter(Boolean);
      const res = await api<{ data: { downloadRef?: string; contentDigest?: string } }>(
        '/v1/provenance/export',
        {
          method: 'POST',
          body: JSON.stringify({
            artefactIds: artefactIds.length ? artefactIds : ['art_demo'],
            includePhi: false,
          }),
        }
      );
      setExportRef(
        `${res.data.downloadRef || 'pack'} · ${res.data.contentDigest || ''}`
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Export failed');
    }
  }

  return (
    <div>
      <PageHeader
        title="Provenance and audit"
        subtitle="Demonstrate event hashes, triggers, and artefact digests without unnecessary PHI."
      />
      {error ? <p role="alert">{error}</p> : null}
      <div className="grid-2">
        <section className="panel">
          <h2 style={{ marginTop: 0 }}>Lineage</h2>
          <ProvenanceLineageRail
            steps={
              items.length
                ? items.slice(0, 4).map((r) => ({
                    label: r.id,
                    detail: `${r.ledgerId || 'ledger'} → ${r.jobId || 'job'} → ${r.artefactId || 'artefact'}`,
                  }))
                : [
                    {
                      label: 'No provenance rows yet',
                      detail: 'Promote a model to append lineage',
                    },
                  ]
            }
          />
        </section>
        <section className="panel">
          <h2 style={{ marginTop: 0 }}>Regulator pack</h2>
          <p className="muted">PHI-light export of hashes, windows, and triggers.</p>
          <button type="button" className="btn btn--mint" onClick={exportPack}>
            Export audit pack
          </button>
          {exportRef ? (
            <p className="mono" style={{ marginTop: 12 }}>
              {exportRef}
            </p>
          ) : null}
        </section>
      </div>
    </div>
  );
}
