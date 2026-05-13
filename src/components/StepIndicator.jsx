import StatusDot from "./StatusDot.jsx";

export default function StepIndicator({ index, label, status = "idle" }) {
  return (
    <div className={`step-indicator step-indicator-${status}`}>
      <StatusDot status={status} size={28}>
        {status !== "done" && <span className="step-indicator-num-inner">{index}</span>}
      </StatusDot>
      <span className="step-indicator-label">
        <span className="step-indicator-num">Step {index}</span>
        <span className="step-indicator-text">{label}</span>
      </span>
    </div>
  );
}
