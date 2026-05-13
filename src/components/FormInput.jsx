export default function FormInput({ type = "text", placeholder = "", value, onChange, name, id, ...rest }) {
  return <input type={type} className="form-input" placeholder={placeholder} value={value} onChange={onChange} name={name} id={id} {...rest} />;
}
