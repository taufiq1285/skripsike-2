/**
 * Dev Store - AKBID Lab System
 * Development state management
 * Status: Complete
 */
import { create } from 'zustand';
import { ENV } from '../lib/constants/env';
import type { Role } from '../lib/rbac/roles';

interface DevState {
  // Dev mode controls
  devModeEnabled: boolean;
  debugMode: boolean;
  
  // Role switching
  roleOverride: Role | null;
  previousRole: Role | null;
  
  // Performance monitoring
  performanceMetrics: {
    renderCount: number;
    lastRenderTime: number;
    avgRenderTime: number;
  };
  
  // API monitoring
  apiCalls: {
    total: number;
    successful: number;
    failed: number;
    avgResponseTime: number;
  };
  
  // Feature flags
  featureFlags: Record<string, boolean>;
  
  // Mock data
  useMockData: boolean;
  mockDelay: number;
  
  // Actions
  toggleDevMode: () => void;
  toggleDebugMode: () => void;
  setRoleOverride: (role: Role | null) => void;
  restorePreviousRole: () => void;
  updatePerformanceMetrics: (renderTime: number) => void;
  logApiCall: (success: boolean, responseTime: number) => void;
  setFeatureFlag: (flag: string, enabled: boolean) => void;
  toggleMockData: () => void;
  setMockDelay: (delay: number) => void;
  reset: () => void;
}

export const useDevStore = create<DevState>((set, get) => ({
  // Initial state
  devModeEnabled: ENV.IS_DEV,
  debugMode: false,
  roleOverride: localStorage.getItem('dev-role-override') as Role || null,
  previousRole: null,
  performanceMetrics: {
    renderCount: 0,
    lastRenderTime: 0,
    avgRenderTime: 0,
  },
  apiCalls: {
    total: 0,
    successful: 0,
    failed: 0,
    avgResponseTime: 0,
  },
  featureFlags: {
    // Development feature flags
    'new-dashboard': false,
    'enhanced-permissions': false,
    'advanced-reporting': false,
    'real-time-notifications': false,
  },
  useMockData: false,
  mockDelay: 1000,

  // Actions
  toggleDevMode: () => {
    if (!ENV.IS_DEV) return; // Can't enable in production
    
    set((state) => ({ devModeEnabled: !state.devModeEnabled }));
  },

  toggleDebugMode: () => {
    set((state) => {
      const newDebugMode = !state.debugMode;
      
      // Set global debug flag
      (window as any).__AKBID_DEBUG__ = newDebugMode;
      
      if (newDebugMode) {
        console.log('🐛 Debug mode enabled');
      } else {
        console.log('🐛 Debug mode disabled');
      }
      
      return { debugMode: newDebugMode };
    });
  },

  setRoleOverride: (role: Role | null) => {
    const { roleOverride } = get();
    
    set({
      previousRole: roleOverride,
      roleOverride: role,
    });
    
    // Persist to localStorage
    if (role) {
      localStorage.setItem('dev-role-override', role);
    } else {
      localStorage.removeItem('dev-role-override');
    }
    
    console.log(`🔄 Role override set to: ${role || 'none'}`);
  },

  restorePreviousRole: () => {
    const { previousRole } = get();
    get().setRoleOverride(previousRole);
  },

  updatePerformanceMetrics: (renderTime: number) => {
    set((state) => {
      const { renderCount, avgRenderTime } = state.performanceMetrics;
      const newRenderCount = renderCount + 1;
      const newAvgRenderTime = ((avgRenderTime * renderCount) + renderTime) / newRenderCount;
      
      return {
        performanceMetrics: {
          renderCount: newRenderCount,
          lastRenderTime: renderTime,
          avgRenderTime: newAvgRenderTime,
        },
      };
    });
  },

  logApiCall: (success: boolean, responseTime: number) => {
    set((state) => {
      const { total, successful, failed, avgResponseTime } = state.apiCalls;
      const newTotal = total + 1;
      const newSuccessful = success ? successful + 1 : successful;
      const newFailed = success ? failed : failed + 1;
      const newAvgResponseTime = ((avgResponseTime * total) + responseTime) / newTotal;
      
      return {
        apiCalls: {
          total: newTotal,
          successful: newSuccessful,
          failed: newFailed,
          avgResponseTime: newAvgResponseTime,
        },
      };
    });
  },

  setFeatureFlag: (flag: string, enabled: boolean) => {
    set((state) => ({
      featureFlags: {
        ...state.featureFlags,
        [flag]: enabled,
      },
    }));
    
    console.log(`🚩 Feature flag '${flag}' ${enabled ? 'enabled' : 'disabled'}`);
  },

  toggleMockData: () => {
    set((state) => {
      const newUseMockData = !state.useMockData;
      console.log(`🎭 Mock data ${newUseMockData ? 'enabled' : 'disabled'}`);
      return { useMockData: newUseMockData };
    });
  },

  setMockDelay: (delay: number) => {
    set({ mockDelay: Math.max(0, delay) });
  },

  reset: () => {
    set({
      debugMode: false,
      roleOverride: null,
      previousRole: null,
      performanceMetrics: {
        renderCount: 0,
        lastRenderTime: 0,
        avgRenderTime: 0,
      },
      apiCalls: {
        total: 0,
        successful: 0,
        failed: 0,
        avgResponseTime: 0,
      },
      useMockData: false,
      mockDelay: 1000,
    });
    
    localStorage.removeItem('dev-role-override');
    console.log('🔄 Dev store reset');
  },
}));