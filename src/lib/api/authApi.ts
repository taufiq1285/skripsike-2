/**
 * Auth API - AKBID Lab System  
 * Security: Secure authentication API calls
 * Status: ESLint compliant (Fixed)
 */

import { auth } from '../__supabase/auth';
import type { LoginCredentials, RegisterData, User } from '../../types/auth';

export const authApi = {
  // Login user
  login: async (credentials: LoginCredentials) => {
    try {
      const result = await auth.signIn(credentials);
      return result;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  // Register user
  register: async (userData: RegisterData) => {
    try {
      const result = await auth.signUp(userData);
      return result;
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout API error:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const user = await auth.getUser();
      return user as User | null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  // Check session
  getSession: async () => {
    try {
      return await auth.getSession();
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    try {
      await auth.resetPassword(email);
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  // Update password
  updatePassword: async (newPassword: string) => {
    try {
      await auth.updatePassword(newPassword);
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  },

  // Update profile
  updateProfile: async (updates: { name?: string; avatar_url?: string }) => {
    try {
      await auth.updateProfile(updates);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Check authentication status
  isAuthenticated: async (): Promise<boolean> => {
    try {
      return await auth.isAuthenticated();
    } catch (error) {
      console.error('Check authentication error:', error);
      return false;
    }
  },

  // Get user role
  getUserRole: async (): Promise<string | null> => {
    try {
      return await auth.getUserRole();
    } catch (error) {
      console.error('Get user role error:', error);
      return null;
    }
  },

  // Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: unknown) => void) => {
    return auth.onAuthStateChange(callback);
  },
};

export default authApi;