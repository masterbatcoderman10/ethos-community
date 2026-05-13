import Icon from "./Icon.jsx";

const CHECKLIST_ICONS = {
  complete: <Icon name="check" size={15}/>,
  in_progress: <Icon name="clock" size={15}/>,
  pending: null
};

export default function Checklist({ items = [] }) {
  return (
    <ul className="checklist">
      {items.map((item, i) => (
        <li key={i} className={`checklist-item checklist-item-${item.status}`}>
          <span className="checklist-icon">{CHECKLIST_ICONS[item.status]}</span>
          <span className="checklist-label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
