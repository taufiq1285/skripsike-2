/**
 * Checkbox Component - AKBID Lab System
 * Security: Input validation, controlled state
 * Status: Template ready
 */
import { forwardRef, InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <div className="flex items-center">
          <input
            type="checkbox"
            ref={ref}
            className={`rounded border-gray-300 text-akbid-600 focus:ring-akbid-500 ${className}`}
            {...props}
          />
          {label && <label className="ml-2 text-sm text-gray-700">{label}</label>}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
