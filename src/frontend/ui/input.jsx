// src/components/ui/input.jsx
import React from "react";
import clsx from "clsx";

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={clsx(
        "flex h-10 w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
