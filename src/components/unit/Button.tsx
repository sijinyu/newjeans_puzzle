import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ onClick, children, ...rest }) => {
  return (
    <button className="btn btn-peach" onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
