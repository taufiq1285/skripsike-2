/**
 * Dashboard Layout - AKBID Lab System
 * Security: Role-based rendering, XSS prevention
 * Status: Template ready for implementation
 */
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: string;
}

export const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole={userRole} />
      <div className="flex">
        <Sidebar userRole={userRole} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
