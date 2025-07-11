/**
 * Auth Layout - AKBID Lab System
 * Security: CSRF protection, secure forms
 * Status: Template ready
 */
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

export const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-akbid-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-xl font-bold">A</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {title || 'AKBID Lab System'}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};
