import React from "react";

const Button = ({ onClick, disabled, className, children, type }) => {
  return (
    <button
      className={`${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
