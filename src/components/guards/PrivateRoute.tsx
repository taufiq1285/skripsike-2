/**
 * Private Route Guard - AKBID Lab System
 * Security: Combined auth and role protection
 * Status: Template ready
 */
import { ReactNode } from 'react';
import { AuthGuard } from './AuthGuard';
import { RoleGuard } from './RoleGuard';

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  requireAuth?: boolean;
}

export const PrivateRoute = ({ 
  children, 
  allowedRoles = [], 
  requireAuth = true 
}: PrivateRouteProps) => {
  const userRole = 'admin'; // TODO: Get from auth context

  if (requireAuth) {
    return (
      <AuthGuard>
        {allowedRoles.length > 0 ? (
          <RoleGuard allowedRoles={allowedRoles} userRole={userRole}>
            {children}
          </RoleGuard>
        ) : (
          children
        )}
      </AuthGuard>
    );
  }

  return <>{children}</>;
};
