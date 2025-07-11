/**
 * MahasiswaGuard - AKBID Lab System
 * Security: mahasiswa role validation, access control
 * Status: Template ready
 */
import { ReactNode } from 'react';
import { RoleGuard } from './RoleGuard';

interface MahasiswaGuardProps {
  children: ReactNode;
}

export const MahasiswaGuard = ({ children }: MahasiswaGuardProps) => {
  return (
    <RoleGuard allowedRoles={['mahasiswa']}>
      {children}
    </RoleGuard>
  );
};
