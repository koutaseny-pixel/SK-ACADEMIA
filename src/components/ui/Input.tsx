import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, leftIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full border rounded-md p-3 outline-none transition-colors 
              ${leftIcon ? 'pl-10' : 'pl-3'}
              ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-[#1b508f] focus:border-transparent'}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
