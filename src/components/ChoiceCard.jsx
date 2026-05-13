import Icon from "./Icon.jsx";

export default function ChoiceCard({ icon, title, desc, selected = false, onSelect, ctaLabel = "Select" }) {
  return (
    <button type="button" className={`choice-card ${selected ? "selected" : ""}`} onClick={onSelect}>
      <div className="choice-card-icon"><Icon name={icon} size={28} /></div>
      <h3 className="choice-card-title">{title}</h3>
      <p className="choice-card-desc">{desc}</p>
      <span className="choice-card-cta">
        {selected ? <><Icon name="check" size={16} /> Selected</> : <>{ctaLabel} <Icon name="arrow" size={16} /></>}
      </span>
    </button>
  );
}
