/**
 * Textarea Component - AKBID Lab System
 * Security: Input sanitization required, length limits
 * Status: Template ready
 */
import { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helper, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <textarea
          ref={ref}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-akbid-500 focus:ring-akbid-500 ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {helper && !error && <p className="text-sm text-gray-500">{helper}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
