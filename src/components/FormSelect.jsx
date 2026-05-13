export default function FormSelect({ options = [], value, onChange, name, id, placeholder = "Select…" }) {
  return (
    <select className="form-select" value={value || ""} onChange={onChange} name={name} id={id}>
      <option value="" disabled>{placeholder}</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
