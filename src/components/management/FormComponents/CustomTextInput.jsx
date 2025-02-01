import "./CustomTextInput.css";

const CustomTextInput = ({
  name,
  register,
  label,
  placeholder,
  onChangeText,
  onBlur,
  error,
  type,
  minLimit,
  maxLimit,
  decimal,
  fullWidth,
  labelTransparent,
  backgroundColor,
  noMargin,
  disabled,
  maxLength,
}) => {
  const {
    onBlur: hookFormOnBlur,
    onChange: hookFormOnChange,
    ...rest
  } = register(name);

  return (
    <div
      className="container-input"
      style={{
        margin: noMargin ? 0 : labelTransparent ? "0 0 24px 0" : undefined,
      }}
    >
      {labelTransparent && (
        <div className="labelContainer-input-background-transparent">
          <p className="labelText-input">{labelTransparent}</p>
        </div>
      )}
      {label && (
        <div className="labelContainer-input">
          <p className="labelText-input">{label}</p>
        </div>
      )}
      <input
        style={
          backgroundColor
            ? { backgroundColor: backgroundColor }
            : {} && fullWidth
              ? { width: "100%" }
              : {}
        }
        type={type !== undefined ? type : "text"}
        min={type === "number" && minLimit !== undefined ? minLimit : undefined}
        max={type === "number" && maxLimit !== undefined ? maxLimit : undefined}
        maxLength={maxLength}
        step={decimal}
        placeholder={placeholder}
        className={`textInput-input ${error ? "error-input" : ""}`}
        onChange={(e) => {
          onChangeText && onChangeText(e);
          hookFormOnChange(e);
        }}
        onBlur={(e) => {
          onBlur && onBlur(e);
          hookFormOnBlur(e);
        }}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

export default CustomTextInput;
