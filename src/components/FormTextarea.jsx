export default function FormTextarea({ placeholder = "", rows = 5, value, onChange, name, id, ...rest }) {
  return <textarea className="form-textarea" rows={rows} placeholder={placeholder} value={value} onChange={onChange} name={name} id={id} {...rest} />;
}
