import './product.css';

export function BrandSeal({ label = 'Ledgerfit' }: { label?: string }) {
  return (
    <div className="brand-seal" aria-label={`${label} custody seal`}>
      <span className="brand-seal__ring" aria-hidden />
      <span className="brand-seal__text">{label}</span>
    </div>
  );
}

export function ThresholdPolicyChip({
  support = 0.2,
  confidence = 0.7,
  maxItems = 3,
  version,
}: {
  support?: number;
  confidence?: number;
  maxItems?: number;
  version?: number | string;
}) {
  return (
    <span className="chip chip--policy mono">
      support ≥{(support * 100).toFixed(0)}% · confidence ≥
      {(confidence * 100).toFixed(0)}% · max ≤{maxItems}
      {version != null ? ` · v${version}` : ''}
    </span>
  );
}

export function SyntheticQuarantineBadge() {
  return <span className="badge badge--coral">Synthetic quarantine</span>;
}

export function SiteFreezeBanner({
  active,
  message,
}: {
  active: boolean;
  message?: string;
}) {
  if (!active) return null;
  return (
    <div className="freeze-banner" role="status">
      <strong>Site freeze active</strong>
      <span>{message || 'Anchoring/scoring paused — history retained.'}</span>
    </div>
  );
}

export function MaskedHitRow({
  label,
  support,
  confidence,
  onReveal,
}: {
  label: string;
  support: number;
  confidence: number;
  onReveal?: () => void;
}) {
  return (
    <div className="masked-row anim-reveal">
      <div>
        <div className="masked-row__label">{label}</div>
        <div className="mono muted">
          support {(support * 100).toFixed(1)}% · confidence{' '}
          {(confidence * 100).toFixed(1)}%
        </div>
      </div>
      {onReveal ? (
        <button type="button" className="btn btn--amber" onClick={onReveal}>
          Request reveal
        </button>
      ) : null}
    </div>
  );
}

export function RevealDualControl({
  status,
}: {
  status: 'pending' | 'approved' | 'denied' | string;
}) {
  return (
    <div className={`reveal-panel reveal-panel--${status}`}>
      <div className="reveal-panel__title">Dual-control reveal</div>
      <p className="muted">
        Requester and approver must be distinct operators. Status:{' '}
        <strong>{status}</strong>
      </p>
    </div>
  );
}

export function ProvenanceLineageRail({
  steps,
}: {
  steps: Array<{ label: string; detail?: string }>;
}) {
  return (
    <ol className="lineage">
      {steps.map((s) => (
        <li key={s.label}>
          <span className="lineage__dot" aria-hidden />
          <div>
            <div>{s.label}</div>
            {s.detail ? <div className="mono muted">{s.detail}</div> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function LedgerWindowPicker({
  fromBlock,
  toBlock,
  onChange,
}: {
  fromBlock?: number;
  toBlock?: number;
  onChange?: (next: { fromBlock: number; toBlock: number }) => void;
}) {
  return (
    <div className="window-picker">
      <label>
        From block
        <input
          className="mono"
          type="number"
          min={0}
          value={fromBlock ?? 0}
          onChange={(e) =>
            onChange?.({
              fromBlock: Number(e.target.value),
              toBlock: toBlock ?? 0,
            })
          }
        />
      </label>
      <label>
        To block
        <input
          className="mono"
          type="number"
          min={0}
          value={toBlock ?? 0}
          onChange={(e) =>
            onChange?.({
              fromBlock: fromBlock ?? 0,
              toBlock: Number(e.target.value),
            })
          }
        />
      </label>
    </div>
  );
}

export function TriggerFireTimeline({
  events,
}: {
  events: Array<{ at: string; detail: string }>;
}) {
  return (
    <ul className="trigger-timeline">
      {events.map((e) => (
        <li key={`${e.at}-${e.detail}`} className="anim-trigger">
          <span className="mono muted">{e.at}</span>
          <span>{e.detail}</span>
        </li>
      ))}
    </ul>
  );
}

export function PageHeader({
  title,
  subtitle,
  seal,
}: {
  title: string;
  subtitle?: string;
  seal?: boolean;
}) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p className="muted">{subtitle}</p> : null}
      </div>
      {seal ? <BrandSeal /> : null}
    </header>
  );
}
