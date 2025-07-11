/**
 * Production Safety Guards - AKBID Lab System
 * Security: Prevent development features in production
 * Status: Day 5 Implementation (Fixed)
 */

import React from 'react';
import { DEV_CONFIG } from './config';
import { ENV } from '../constants/env';

// HOC untuk melindungi development components
export const withDevOnly = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  const DevOnlyComponent: React.FC<P> = (props: P) => {
    // Return null in production atau jika dev tidak enabled
    if (!DEV_CONFIG.enabled || ENV.IS_PROD) {
      return null;
    }
    
    return React.createElement(Component, props);
  };
  
  DevOnlyComponent.displayName = `withDevOnly(${Component.displayName || Component.name})`;
  
  return DevOnlyComponent;
};

// Function guard untuk development-only functions
export const devOnly = <T extends (...args: any[]) => any>(fn: T): T => {
  const wrappedFunction = (...args: any[]) => {
    if (!DEV_CONFIG.enabled || ENV.IS_PROD) {
      console.warn('Development function called in production environment');
      return undefined;
    }
    
    return fn(...args);
  };
  
  return wrappedFunction as T;
};

// Class guard untuk development-only classes
export const isDevEnvironment = (): boolean => {
  return DEV_CONFIG.enabled && !ENV.IS_PROD;
};

// Route guard untuk development routes
export const canAccessDevRoutes = (): boolean => {
  return DEV_CONFIG.enabled && !ENV.IS_PROD;
};

// Feature flag guard
export const isFeatureEnabled = (feature: keyof typeof DEV_CONFIG): boolean => {
  if (ENV.IS_PROD) return false;
  return DEV_CONFIG[feature] === true;
};

// Component guard sebagai React hook
export const useDevOnly = (): boolean => {
  return DEV_CONFIG.enabled && !ENV.IS_PROD;
};

// Development-only effect hook
export const useDevEffect = (effect: () => void, deps?: React.DependencyList): void => {
  React.useEffect(() => {
    if (!DEV_CONFIG.enabled || ENV.IS_PROD) return;
    
    effect();
  }, deps);
};

// Safe development logging
export const devOnlyLog = (message: string, data?: unknown): void => {
  if (!DEV_CONFIG.enabled || ENV.IS_PROD) return;
  
  console.log(`[DEV] ${message}`, data || '');
};

// Production safety validator
export const validateProductionSafety = (): { isSecure: boolean; risks: string[] } => {
  const risks: string[] = [];
  
  if (ENV.IS_PROD) {
    // Check for development features in production
    if (DEV_CONFIG.enabled) risks.push('DEV_CONFIG.enabled is true');
    if (DEV_CONFIG.showDevTools) risks.push('showDevTools is enabled');
    if (DEV_CONFIG.allowRoleSwitching) risks.push('allowRoleSwitching is enabled');
    if (DEV_CONFIG.exposeGlobals) risks.push('exposeGlobals is enabled');
    
    // Check for development environment variables
    if (ENV.DEV_MODE) risks.push('VITE_DEV_MODE is true');
    if (ENV.DEV_TOOLBAR) risks.push('VITE_DEV_TOOLBAR is true');
    
    // Check for global dev exposure (browser only)
    if (typeof window !== 'undefined' && (window as any).__DEV__) {
      risks.push('window.__DEV__ is exposed');
    }
  }
  
  const isSecure = risks.length === 0;
  
  if (!isSecure) {
    console.error('🚨 PRODUCTION SECURITY RISKS DETECTED:', risks);
  }
  
  return { isSecure, risks };
};

// Type-safe feature flag checker
export const checkFeatureFlag = <K extends keyof typeof DEV_CONFIG>(
  feature: K
): boolean => {
  if (ENV.IS_PROD) return false;
  return Boolean(DEV_CONFIG[feature]);
};