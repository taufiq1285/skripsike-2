/**
 * Role-Based Access Guard - AKBID Lab System
 * Security: Role validation, permission checks, unauthorized access prevention
 * Status: Template ready
 */
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  userRole?: string;
  fallback?: string;
}

export const RoleGuard = ({ 
  children, 
  allowedRoles, 
  userRole, 
  fallback = '/unauthorized' 
}: RoleGuardProps) => {
  // SECURITY: Validate user role against allowed roles
  // SECURITY: Check for role tampering
  // SECURITY: Log unauthorized access attempts
  
  if (!userRole || !allowedRoles.includes(userRole)) {
    console.warn(`Unauthorized access attempt. User role: ${userRole}, Required: ${allowedRoles.join(', ')}`);
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};
