export default function CaseProgressBar({ raised = 0, target = 0, compact = false }) {
  const pct = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;
  const remaining = Math.max(0, target - raised);
  const fmt = (n) => `$${Number(n).toLocaleString()}`;
  return (
    <div className={`case-progress ${compact ? "compact" : ""}`}>
      {!compact && (
        <div className="case-progress-label">
          <span className="case-progress-raised">{fmt(raised)} raised</span>
          <span className="case-progress-remaining">{fmt(remaining)} to go</span>
        </div>
      )}
      <div
        className="case-progress-track"
        role="progressbar"
        aria-label={`${pct}% funded`}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={pct}
      >
        <div className="case-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      {compact && <span className="case-progress-pct">{pct}%</span>}
    </div>
  );
}
