import './InputField.css'

const InputField = ({ label, name, type = 'text', placeholder, value, onChange, error, required = false }) => {
  return (
    <div className="input-field">
      <label className={`input-label ${required ? 'required' : ''}`}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        className={`input ${error ? 'error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  )
}

export default InputField
