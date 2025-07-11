/**
 * useAuth Hook - AKBID Lab System
 * Security: JWT validation, session management, secure logout
 * Status: Ready for implementation
 */
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { type User as _User } from '../types/auth';
export const useAuth = () => {
  const {
    user,
    isLoading,
    isAuthenticated,
    permissions,
    error,
    login,
    logout,
    checkAuth,
    clearError,
  } = useAuthStore();

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    // State
    user,
    isLoading,
    isAuthenticated,
    permissions,
    error,
    
    // Actions
    login,
    logout,
    clearError,
    
    // Computed
    isAdmin: user?.role === 'admin',
    isDosen: user?.role === 'dosen',
    isLaboran: user?.role === 'laboran',
    isMahasiswa: user?.role === 'mahasiswa',
  };
};
