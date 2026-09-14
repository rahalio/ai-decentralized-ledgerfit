import { FormEvent, useEffect, useState } from 'react';
import { api, ListEnvelope } from '../../../lib/api';
import {
  LedgerWindowPicker,
  PageHeader,
  ThresholdPolicyChip,
} from '../../../components/product';
import '../../../components/product.css';

type Job = {
  id: string;
  ledgerId?: string;
  executionMode?: string;
  status?: string;
  lifecycleStep?: string;
};

export function TrainingView() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [ledgers, setLedgers] = useState<Array<{ id: string; name?: string }>>(
    []
  );
  const [ledgerId, setLedgerId] = useState('');
  const [mode, setMode] = useState('serverBatch');
  const [window, setWindow] = useState({ fromBlock: 0, toBlock: 100 });
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const [j, l] = await Promise.all([
      api<ListEnvelope<Job>>('/v1/training-jobs'),
      api<ListEnvelope<{ id: string; name?: string }>>('/v1/ledgers'),
    ]);
    setJobs(j.data.items);
    setLedgers(l.data.items);
    if (!ledgerId && l.data.items[0]) setLedgerId(l.data.items[0].id);
  }

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    try {
      await api('/v1/training-jobs', {
        method: 'POST',
        body: JSON.stringify({
          ledgerId,
          executionMode: mode,
          lifecycleStep: 'modelTraining',
          algorithm: 'associationRuleMining',
          armThresholds: { minSupport: 0.2, minConfidence: 0.7, maxItems: 3 },
          ledgerWindow: { ledgerId, ...window },
        }),
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed');
    }
  }

  return (
    <div>
      <PageHeader
        title="Training jobs"
        subtitle="Batch Server-Layer and Streaming-Layer jobs over mandatory ledger windows."
      />
      {error ? <p role="alert">{error}</p> : null}
      <form className="panel" onSubmit={onCreate} style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <ThresholdPolicyChip />
        </div>
        <div className="grid-2">
          <label className="muted">
            Ledger
            <select
              value={ledgerId}
              onChange={(e) => setLedgerId(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 8 }}
              required
            >
              {ledgers.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name || l.id}
                </option>
              ))}
            </select>
          </label>
          <label className="muted">
            Execution mode
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 8 }}
            >
              <option value="serverBatch">serverBatch</option>
              <option value="streaming">streaming</option>
            </select>
          </label>
        </div>
        <div style={{ marginTop: 16 }}>
          <LedgerWindowPicker
            fromBlock={window.fromBlock}
            toBlock={window.toBlock}
            onChange={setWindow}
          />
        </div>
        <button type="submit" className="btn btn--mint" style={{ marginTop: 16 }}>
          Create job
        </button>
      </form>
      <section className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Mode</th>
              <th>Step</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id}>
                <td className="mono">{j.id}</td>
                <td>{j.executionMode}</td>
                <td>{j.lifecycleStep}</td>
                <td>{j.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
