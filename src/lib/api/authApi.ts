/**
 * Auth API - AKBID Lab System
 * Security: Secure authentication API calls
 * Status: Template ready
 */
import { supabase } from '../supabase/client';
import { auth } from '../supabase/auth';
import type { LoginCredentials, RegisterData, User } from '../../types/auth';

export const authApi = {
  // Login user
  login: async (credentials: LoginCredentials) => {
    try {
      const { data, error } = await auth.signIn(credentials);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  // Register user
  register: async (userData: RegisterData) => {
    try {
      const { data, error } = await auth.signUp(userData);
      if (error) throw error;
      return data;
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
};

export default authApi;
