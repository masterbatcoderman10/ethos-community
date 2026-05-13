export default function FormField({ label, htmlFor, hint, required = false, children }) {
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={htmlFor} className="form-field-label">
          {label}{required && <span className="form-field-required" aria-hidden="true"> *</span>}
        </label>
      )}
      {children}
      {hint && <span className="form-field-hint">{hint}</span>}
    </div>
  );
}
