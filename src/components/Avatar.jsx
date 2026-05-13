export default function Avatar({ initials, size = "", className = "", green = false }) {
  const cls = `avatar ${initials ? "initials" : ""} ${size} ${className} ${green ? "green" : ""}`;
  return <div className={cls}>{initials || ""}</div>;
}
