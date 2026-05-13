const PURPOSE_BADGE_MAP = {
  health:     { label: "Health",     cls: "purpose-health" },
  education:  { label: "Education",  cls: "purpose-education" },
  family:     { label: "Family",     cls: "purpose-family" },
  legal:      { label: "Legal",      cls: "purpose-legal" },
  emergency:  { label: "Emergency",  cls: "purpose-emergency" },
  training:   { label: "Training",   cls: "purpose-training" },
  sme:        { label: "SME",        cls: "purpose-sme" },
  women:      { label: "Women",      cls: "purpose-women" }
};

export default function PurposeBadge({ category }) {
  const cfg = PURPOSE_BADGE_MAP[category] || { label: category, cls: "" };
  return <span className={`purpose-badge ${cfg.cls}`}>{cfg.label}</span>;
}
