const STATUS_PILL_LABEL = {
  draft: "Draft",
  pending: "Pending review",
  verified: "Verified",
  funded: "Funded",
  completed: "Completed",
  action_needed: "Action needed"
};

export default function StatusPill({ status = "pending" }) {
  const label = STATUS_PILL_LABEL[status] || status;
  return <span className={`status-pill status-pill-${status}`}>{label}</span>;
}
