import "./InputStyles.css";

const CustomTextInput = ({ name, register, label, placeholder, error }) => {
  const {
    onBlur: hookFormOnBlur,
    onChange: hookFormOnChange,
    ...rest
  } = register(name);

  return (
    <div className="container-input">
      {label && (
        <div className="labelContainer-input">
          <p className="labelText-input">{label}</p>
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={`text-input ${error ? "error-input" : ""}`}
        onChange={hookFormOnChange}
        onBlur={hookFormOnBlur}
        {...rest}
      />
      {error && <p className="error-message">{error.message}</p>}
    </div>
  );
};

export default CustomTextInput;
