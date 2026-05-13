export default function FormRadioGroup({ name, options = [], value, onChange }) {
  return (
    <div className="form-radio-group" role="radiogroup">
      {options.map(o => (
        <label key={o.value} className={`form-radio ${value === o.value ? "checked" : ""}`}>
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={onChange} />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  );
}
