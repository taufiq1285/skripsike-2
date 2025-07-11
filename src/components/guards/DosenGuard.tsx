/**
 * DosenGuard - AKBID Lab System
 * Security: dosen role validation, access control
 * Status: Template ready
 */
import { ReactNode } from 'react';
import { RoleGuard } from './RoleGuard';

interface DosenGuardProps {
  children: ReactNode;
}

export const DosenGuard = ({ children }: DosenGuardProps) => {
  return (
    <RoleGuard allowedRoles={['dosen']}>
      {children}
    </RoleGuard>
  );
};
