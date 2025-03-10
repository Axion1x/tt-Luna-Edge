import React, { ReactNode } from "react";

interface ButtonProps {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  disabled?: boolean;
  children: ReactNode;
  handleClick?: () => void;
}

const Button = ({ size = "base", disabled = false, children, handleClick }: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-all flex gap-2";
  const sizeStyles = {
    xs: "h-5 px-2 text-xs",
    sm: "h-6 px-3 text-sm",
    base: "h-8 px-4 text-base",
    lg: "h-10 px-5 text-lg",
    xl: "h-12 px-6 text-xl",
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size]}
      ${
        disabled
          ? "bg-blue-100 text-blue-300 border border-blue-100 cursor-not-allowed"
          : `bg-indigo-900 text-white border border-blue-800 
          hover:bg-blue-500 hover:border-blue-500 cursor-pointer
          focus:border-2 focus:border-blue-800 focus:text-white focus:bg-blue-600 
          active:bg-blue-600 active:text-white active:border active:border-blue-700
      `} 
    `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
