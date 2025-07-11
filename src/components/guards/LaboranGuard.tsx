/**
 * LaboranGuard - AKBID Lab System
 * Security: laboran role validation, access control
 * Status: Template ready
 */
import { ReactNode } from 'react';
import { RoleGuard } from './RoleGuard';

interface LaboranGuardProps {
  children: ReactNode;
}

export const LaboranGuard = ({ children }: LaboranGuardProps) => {
  return (
    <RoleGuard allowedRoles={['laboran']}>
      {children}
    </RoleGuard>
  );
};
