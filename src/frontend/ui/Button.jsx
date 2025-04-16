// src/components/ui/button.jsx
import React from "react";
import clsx from "clsx";

export const Button = ({ children, className, variant = "default", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-white hover:bg-gray-800",
    outline: "border border-gray-500 text-white hover:bg-gray-800",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
