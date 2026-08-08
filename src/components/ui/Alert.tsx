import React from "react";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Alert({ type = "info", title, children, className = "" }: AlertProps) {
  const styles = {
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  };

  const icons = {
    success: <CheckCircle className="text-green-500 shrink-0" size={20} />,
    error: <XCircle className="text-red-500 shrink-0" size={20} />,
    warning: <AlertCircle className="text-yellow-500 shrink-0" size={20} />,
    info: <Info className="text-blue-500 shrink-0" size={20} />,
  };

  return (
    <div className={`p-4 rounded-lg border flex gap-3 ${styles[type]} ${className}`}>
      {icons[type]}
      <div>
        {title && <h4 className="font-bold mb-1">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
