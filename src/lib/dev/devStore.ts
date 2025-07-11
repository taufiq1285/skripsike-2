/**
 * Development Store - AKBID Lab System  
 * Security: Development-only state management
 * Status: Day 5 Implementation (Fixed)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEV_CONFIG } from './config';

// Types for better type safety
type TestUserEmail = typeof DEV_CONFIG.testUserEmails[number];
type UserRole = 'admin' | 'dosen' | 'laboran' | 'mahasiswa' | 'dev_super';

interface DevState {
  // Current development session
  isDevModeActive: boolean;
  currentTestUser: TestUserEmail | null;
  roleSwitchCount: number;
  sessionStartTime: string | null;
  
  // Feature flags
  mockApiEnabled: boolean;
  performanceMonitoringEnabled: boolean;
  debugMode: boolean;
  
  // UI state
  devToolbarVisible: boolean;
  devPanelExpanded: boolean;
  
  // Actions
  toggleDevMode: () => void;
  setTestUser: (email: string) => void;
  switchRole: (role: UserRole) => void;
  resetSession: () => void;
  toggleMockApi: () => void;
  togglePerformanceMonitoring: () => void;
  toggleDebugMode: () => void;
  toggleDevToolbar: () => void;
  toggleDevPanel: () => void;
  
  // Getters
  canSwitchRole: () => boolean;
  getSessionInfo: () => Record<string, unknown>;
}

export const useDevStore = create<DevState>()(
  persist(
    (set, get) => ({
      // Initial state
      isDevModeActive: DEV_CONFIG.enabled,
      currentTestUser: null,
      roleSwitchCount: 0,
      sessionStartTime: null,
      
      mockApiEnabled: false,
      performanceMonitoringEnabled: DEV_CONFIG.enablePerformanceMonitoring,
      debugMode: false,
      
      devToolbarVisible: DEV_CONFIG.showDevTools,
      devPanelExpanded: false,
      
      // Actions
      toggleDevMode: () => {
        if (!DEV_CONFIG.enabled) return;
        
        set((state) => ({
          isDevModeActive: !state.isDevModeActive,
          sessionStartTime: !state.isDevModeActive ? new Date().toISOString() : null,
        }));
      },
      
      setTestUser: (email: string) => {
        if (!DEV_CONFIG.enabled) return;
        
        // Type-safe check untuk valid test user emails
        const isValidTestUser = DEV_CONFIG.testUserEmails.includes(email as TestUserEmail);
        if (!isValidTestUser) {
          console.warn(`Invalid test user email: ${email}`);
          return;
        }
        
        set({ currentTestUser: email as TestUserEmail });
      },
      
      switchRole: (role: UserRole) => {
        const state = get();
        if (!state.canSwitchRole()) {
          console.warn('Role switching limit reached or not allowed');
          return;
        }
        
        set((state) => ({
          roleSwitchCount: state.roleSwitchCount + 1,
        }));
        
        // Log role switch for debugging
        if (DEV_CONFIG.enabled) {
          console.log(`[DEV] Role switched to: ${role}`);
        }
      },
      
      resetSession: () => {
        if (!DEV_CONFIG.enabled) return;
        
        set({
          currentTestUser: null,
          roleSwitchCount: 0,
          sessionStartTime: new Date().toISOString(),
          debugMode: false,
          devPanelExpanded: false,
        });
        
        console.log('[DEV] Session reset');
      },
      
      toggleMockApi: () => {
        if (!DEV_CONFIG.enabled) return;
        set((state) => ({ 
          mockApiEnabled: !state.mockApiEnabled 
        }));
      },
      
      togglePerformanceMonitoring: () => {
        if (!DEV_CONFIG.enabled) return;
        set((state) => ({ 
          performanceMonitoringEnabled: !state.performanceMonitoringEnabled 
        }));
      },
      
      toggleDebugMode: () => {
        if (!DEV_CONFIG.enabled) return;
        set((state) => ({ 
          debugMode: !state.debugMode 
        }));
      },
      
      toggleDevToolbar: () => {
        if (!DEV_CONFIG.enabled) return;
        set((state) => ({ 
          devToolbarVisible: !state.devToolbarVisible 
        }));
      },
      
      toggleDevPanel: () => {
        if (!DEV_CONFIG.enabled) return;
        set((state) => ({ 
          devPanelExpanded: !state.devPanelExpanded 
        }));
      },
      
      // Getters
      canSwitchRole: () => {
        const state = get();
        return DEV_CONFIG.allowRoleSwitching && 
               state.roleSwitchCount < DEV_CONFIG.maxRoleSwitchesPerSession;
      },
      
      getSessionInfo: () => {
        const state = get();
        const sessionDuration = state.sessionStartTime 
          ? Date.now() - new Date(state.sessionStartTime).getTime()
          : 0;
          
        return {
          isActive: state.isDevModeActive,
          user: state.currentTestUser,
          roleSwitches: state.roleSwitchCount,
          sessionDuration,
          sessionDurationFormatted: formatDuration(sessionDuration),
          features: {
            mockApi: state.mockApiEnabled,
            performance: state.performanceMonitoringEnabled,
            debug: state.debugMode,
          },
          limits: {
            maxRoleSwitches: DEV_CONFIG.maxRoleSwitchesPerSession,
            remainingRoleSwitches: DEV_CONFIG.maxRoleSwitchesPerSession - state.roleSwitchCount,
          }
        };
      },
    }),
    {
      name: 'akbid-dev-store',
      // Only persist in development
      skipHydration: !DEV_CONFIG.enabled,
      // Partial persist - don't persist sensitive data
      partialize: (state) => ({
        devToolbarVisible: state.devToolbarVisible,
        mockApiEnabled: state.mockApiEnabled,
        performanceMonitoringEnabled: state.performanceMonitoringEnabled,
        debugMode: state.debugMode,
      }),
    }
  )
);

// Helper function untuk format duration
const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

// Development-only hooks
export const useDevSession = () => {
  const store = useDevStore();
  
  if (!DEV_CONFIG.enabled) {
    return {
      isActive: false,
      sessionInfo: {},
      actions: {
        toggleDevMode: () => {},
        resetSession: () => {},
        setTestUser: () => {},
        switchRole: () => {},
      },
    };
  }
  
  return {
    isActive: store.isDevModeActive,
    sessionInfo: store.getSessionInfo(),
    actions: {
      toggleDevMode: store.toggleDevMode,
      resetSession: store.resetSession,
      setTestUser: store.setTestUser,
      switchRole: store.switchRole,
    },
  };
};

// Development feature flags hook
export const useDevFeatures = () => {
  const store = useDevStore();
  
  if (!DEV_CONFIG.enabled) {
    return {
      mockApi: false,
      performance: false,
      debug: false,
      toolbar: false,
      panel: false,
      toggles: {
        mockApi: () => {},
        performance: () => {},
        debug: () => {},
        toolbar: () => {},
        panel: () => {},
      }
    };
  }
  
  return {
    mockApi: store.mockApiEnabled,
    performance: store.performanceMonitoringEnabled,
    debug: store.debugMode,
    toolbar: store.devToolbarVisible,
    panel: store.devPanelExpanded,
    toggles: {
      mockApi: store.toggleMockApi,
      performance: store.togglePerformanceMonitoring,
      debug: store.toggleDebugMode,
      toolbar: store.toggleDevToolbar,
      panel: store.toggleDevPanel,
    }
  };
};

// Test user management hook
export const useTestUsers = () => {
  const store = useDevStore();
  
  if (!DEV_CONFIG.enabled) {
    return {
      current: null,
      available: [],
      setUser: () => {},
      canSwitchRole: false,
    };
  }
  
  return {
    current: store.currentTestUser,
    available: DEV_CONFIG.testUserEmails,
    setUser: store.setTestUser,
    canSwitchRole: store.canSwitchRole(),
  };
};

// Export types
export type { DevState, TestUserEmail, UserRole };
export type DevSessionInfo = ReturnType<DevState['getSessionInfo']>;