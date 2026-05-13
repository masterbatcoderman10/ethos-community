import Icon from "./Icon.jsx";

export default function PartnershipStrip({ partners = [] }) {
  return (
    <div className="partnership-strip">
      {partners.map((p, i) => (
        <div key={i} className="partnership-card">
          <div className="partnership-icon"><Icon name={p.icon} size={28}/></div>
          <h4 className="partnership-name">{p.name}</h4>
          <p className="partnership-desc">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}
