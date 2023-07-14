import React from "react";

const Input = ({
  type,
  onChange,
  value,
  onBlur,
  placeholder,
  onkeyDown,
  onKeyUp,
  name,
  className,
  checked,
  min,
  id,
  ref,
  pattern,
  defaultValue,
  style,
  autoComplete,
  onFocus,
}) => {
  return (
    <input
      type={type}
      onChange={onChange}
      value={value}
      onkeyDown={onkeyDown}
      onKeyUp={onKeyUp}
      onBlur={onBlur}
      placeholder={placeholder}
      name={name}
      className={` ${className}`}
      checked={checked}
      min={min}
      id={id}
      defaultValue={defaultValue}
      pattern={pattern}
      ref={ref}
      onFocus={onFocus}
      autoComplete={autoComplete}
      style={style}
    />
  );
};
export default Input;
