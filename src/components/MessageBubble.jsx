import Avatar from "./Avatar.jsx";

export default function MessageBubble({ sender = "system", name, timestamp, children }) {
  if (sender === "system") {
    return (
      <div className="message-row message-row-system">
        <div className="message-system">{children}</div>
      </div>
    );
  }
  const initials = (name || "").split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className={`message-row message-row-${sender}`}>
      {sender === "ambassador" && <Avatar initials={initials} green />}
      <div className="message-stack">
        <div className="message-meta">
          {name && <span className="message-name">{name}</span>}
          {timestamp && <span className="message-time">{timestamp}</span>}
        </div>
        <div className={`message-bubble message-bubble-${sender}`}>{children}</div>
      </div>
      {sender === "me" && <Avatar initials={initials || "ME"} />}
    </div>
  );
}
