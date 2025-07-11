
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase/client';
import { type Permission } from '../lib/rbac/permissions';
import { type Role, getRolePermissions } from '../lib/rbac/roles';

// User type
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  nim_nip?: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Auth state interface
interface AuthState {
  // State
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  permissions: Permission[];
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  clearError: () => void;
  
  // Internal actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isLoading: false,
      isAuthenticated: false,
      permissions: [],
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Supabase authentication
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            // Get user profile from database
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.user.id)
              .single();

            if (profileError) throw profileError;

            const user: User = {
              id: profile.id,
              email: profile.email,
              name: profile.name,
              role: profile.role,
              nim_nip: profile.nim_nip,
              phone: profile.phone,
              avatar_url: profile.avatar_url,
              bio: profile.bio,
              is_active: profile.is_active,
              created_at: profile.created_at,
              updated_at: profile.updated_at,
            };

            const permissions = getRolePermissions(user.role);

            set({
              user,
              isAuthenticated: true,
              permissions,
              isLoading: false,
              error: null,
            });
          }
        } catch (error: any) {
          console.error('Login error:', error);
          set({
            user: null,
            isAuthenticated: false,
            permissions: [],
            isLoading: false,
            error: error.message || 'Login failed',
          });
        }
      },

      logout: async () => {
        try {
          await supabase.auth.signOut();
          
          set({
            user: null,
            isAuthenticated: false,
            permissions: [],
            error: null,
          });
        } catch (error: any) {
          console.error('Logout error:', error);
          set({ error: error.message });
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        
        try {
          const { data: { session }, error } = await supabase.auth.getSession();

          if (error) throw error;

          if (session?.user) {
            // Get user profile
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profileError) {
              // If profile doesn't exist, create one
              if (profileError.code === 'PGRST116') {
                const newProfile = {
                  id: session.user.id,
                  email: session.user.email!,
                  name: session.user.user_metadata?.name || session.user.email!.split('@')[0],
                  role: 'mahasiswa' as Role, // Default role
                  is_active: true,
                };

                const { data: createdProfile, error: createError } = await supabase
                  .from('users')
                  .insert(newProfile)
                  .select()
                  .single();

                if (createError) throw createError;

                const user: User = {
                  ...createdProfile,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                };

                const permissions = getRolePermissions(user.role);

                set({
                  user,
                  isAuthenticated: true,
                  permissions,
                  isLoading: false,
                });
                return;
              }
              throw profileError;
            }

            const user: User = {
              id: profile.id,
              email: profile.email,
              name: profile.name,
              role: profile.role,
              nim_nip: profile.nim_nip,
              phone: profile.phone,
              avatar_url: profile.avatar_url,
              bio: profile.bio,
              is_active: profile.is_active,
              created_at: profile.created_at,
              updated_at: profile.updated_at,
            };

            const permissions = getRolePermissions(user.role);

            set({
              user,
              isAuthenticated: true,
              permissions,
              isLoading: false,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              permissions: [],
              isLoading: false,
            });
          }
        } catch (error: any) {
          console.error('Auth check error:', error);
          set({
            user: null,
            isAuthenticated: false,
            permissions: [],
            isLoading: false,
            error: error.message,
          });
        }
      },

      updateUser: async (updates: Partial<User>) => {
        const { user } = get();
        if (!user) return;

        set({ isLoading: true });

        try {
          const { data, error } = await supabase
            .from('users')
            .update({
              ...updates,
              updated_at: new Date().toISOString(),
            })
            .eq('id', user.id)
            .select()
            .single();

          if (error) throw error;

          const updatedUser: User = {
            ...user,
            ...data,
          };

          set({
            user: updatedUser,
            isLoading: false,
          });
        } catch (error: any) {
          console.error('Update user error:', error);
          set({
            isLoading: false,
            error: error.message,
          });
        }
      },

      clearError: () => set({ error: null }),

      // Internal actions
      setUser: (user: User | null) => {
        const permissions = user ? getRolePermissions(user.role) : [];
        set({
          user,
          isAuthenticated: !!user,
          permissions,
        });
      },

      setLoading: (isLoading: boolean) => set({ isLoading }),

      setError: (error: string | null) => set({ error }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        permissions: state.permissions,
      }),
    }
  )
);