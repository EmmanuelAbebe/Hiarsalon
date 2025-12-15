import React, { CSSProperties } from "react";

interface ButtonProps {
  label: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
}

const Button = ({
  label,
  onClick,
  className = "text-white bg-blue-500 hover:bg-blue-500",
  type = "button",
  style,
}: ButtonProps) => {
  return (
    <button
      className={`font-bold text-md px-4 py-2 rounded-md cursor-pointer text-sm ${className}`}
      onClick={onClick}
      type={type}
      style={style}
    >
      {label}
    </button>
  );
};

export default Button;
