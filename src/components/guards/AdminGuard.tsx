/**
 * AdminGuard - AKBID Lab System
 * Security: admin role validation, access control
 * Status: Template ready
 */
import { ReactNode } from 'react';
import { RoleGuard } from './RoleGuard';

interface AdminGuardProps {
  children: ReactNode;
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
  return (
    <RoleGuard allowedRoles={['admin']}>
      {children}
    </RoleGuard>
  );
};
