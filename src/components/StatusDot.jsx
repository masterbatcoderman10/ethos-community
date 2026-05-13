import Icon from "./Icon.jsx";

export default function StatusDot({ status = "idle", size = 12, children }) {
  const cls = `status-dot status-dot-${status}`;
  return (
    <span className={cls} style={{ width: size, height: size }} aria-hidden="true">
      {(status === "done" || status === "complete") ? <Icon name="check" size={Math.round(size * 0.7)} /> : children}
    </span>
  );
}
