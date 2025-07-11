/**
 * Alert Component - AKBID Lab System
 * Security: HTML sanitization required for content
 * Status: Template ready
 */
import { type ReactNode } from 'react';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  children: ReactNode;
  onClose?: () => void;
}

export const Alert = ({ variant = 'info', children, onClose }: AlertProps) => {
  const variants = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };

  return (
    <div className={`border rounded-lg p-4 ${variants[variant]}`}>
      <div className="flex justify-between items-start">
        <div>{children}</div>
        {onClose && (
          <button onClick={onClose} className="ml-4 text-current opacity-75 hover:opacity-100">
            ×
          </button>
        )}
      </div>
    </div>
  );
};
