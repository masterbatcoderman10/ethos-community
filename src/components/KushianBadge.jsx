export default function KushianBadge({ variant = "pilot" }) {
  if (variant === "powered") return <span className="kushian-badge kushian-badge-powered">Powered by Ethos Community™</span>;
  if (variant === "full") return <span className="kushian-badge kushian-badge-full">Kushian™ · Sudan Pilot</span>;
  return <span className="kushian-badge kushian-badge-pilot">Kushian™</span>;
}
