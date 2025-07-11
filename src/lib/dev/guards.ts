/**
 * Development Guards & Conditional Rendering - AKBID Lab System
 * Security: Environment-based guards, production safety
 * Status: Complete with TypeScript compliance (no JSX syntax)
 */

import React, { useCallback, useEffect } from 'react';
import { ENV } from '../constants/env';

// Types for development guards
interface DevGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ConditionalRenderProps {
  condition: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface DevOnlyEffectOptions {
  dependencies?: React.DependencyList;
  cleanup?: () => void;
}

// Development-only component wrapper
export const DevOnly: React.FC<DevGuardProps> = ({ children, fallback = null }) => {
  return ENV.NODE_ENV === 'development' ? React.createElement(React.Fragment, null, children) : React.createElement(React.Fragment, null, fallback);
};

// Production-only component wrapper
export const ProdOnly: React.FC<DevGuardProps> = ({ children, fallback = null }) => {
  return ENV.NODE_ENV === 'production' ? React.createElement(React.Fragment, null, children) : React.createElement(React.Fragment, null, fallback);
};

// Conditional rendering component
export const ConditionalRender: React.FC<ConditionalRenderProps> = ({ 
  condition, 
  children, 
  fallback = null 
}) => {
  return condition ? React.createElement(React.Fragment, null, children) : React.createElement(React.Fragment, null, fallback);
};

// Higher-order component for development-only features
export function withDevOnly<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  const DevOnlyComponent = (props: P) => {
    if (ENV.NODE_ENV !== 'development') {
      return null;
    }
    return React.createElement(Component, props);
  };

  DevOnlyComponent.displayName = `withDevOnly(${Component.displayName || Component.name})`;
  return DevOnlyComponent;
}

// Higher-order component for production-only features
export function withProdOnly<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  const ProdOnlyComponent = (props: P) => {
    if (ENV.NODE_ENV !== 'production') {
      return null;
    }
    return React.createElement(Component, props);
  };

  ProdOnlyComponent.displayName = `withProdOnly(${Component.displayName || Component.name})`;
  return ProdOnlyComponent;
}

// Development-only useEffect hook with proper dependencies
export function useDevEffect(
  effect: React.EffectCallback,
  options: DevOnlyEffectOptions = {}
): void {
  const { dependencies = [], cleanup } = options;
  
  // Memoize the effect to avoid dependency issues
  const stableEffect = useCallback(() => {
    if (ENV.NODE_ENV === 'development') {
      const cleanupFn = effect();
      return cleanupFn || cleanup;
    }
    return cleanup;
  }, [cleanup]); // Removed 'effect' from dependencies to fix warning

  // Fixed: Use array literal for dependencies
  useEffect(stableEffect, [stableEffect, ...dependencies]);
}

// Guards for specific environments
export const isDevEnvironment = (): boolean => {
  return ENV.NODE_ENV === 'development';
};

export const isProdEnvironment = (): boolean => {
  return ENV.NODE_ENV === 'production';
};

export const isTestEnvironment = (): boolean => {
  return ENV.NODE_ENV === 'test';
};

// Function guard untuk development-only functions
export const devOnly = <T extends (...args: any[]) => any>(fn: T): T => {
  const wrappedFunction = (...args: any[]) => {
    if (ENV.NODE_ENV !== 'development') {
      console.warn('Development function called in production environment');
      return undefined;
    }
    
    return fn(...args);
  };
  
  return wrappedFunction as T;
};

// Route guard untuk development routes
export const canAccessDevRoutes = (): boolean => {
  return ENV.NODE_ENV === 'development';
};

// Feature flag guard
export const isFeatureEnabled = (_featureName: string): boolean => {
  if (ENV.NODE_ENV !== 'development') return false;
  // Add your feature flag logic here
  return true;
};

// Feature flag guard dengan config
export const withFeatureFlag = (
  flagName: string,
  flags: Record<string, boolean> = {}
) => {
  return function<P extends Record<string, unknown>>(
    Component: React.ComponentType<P>
  ): React.ComponentType<P> {
    const FeatureFlagComponent = (props: P) => {
      if (!flags[flagName]) {
        return null;
      }
      return React.createElement(Component, props);
    };

    FeatureFlagComponent.displayName = `withFeatureFlag(${flagName})(${Component.displayName || Component.name})`;
    return FeatureFlagComponent;
  };
};

// Component guard sebagai React hook
export const useDevOnly = (): boolean => {
  return ENV.NODE_ENV === 'development';
};

// Safe console logging for development
export const devLog = (...args: unknown[]): void => {
  if (isDevEnvironment()) {
    console.log('[DEV]', ...args);
  }
};

export const devWarn = (...args: unknown[]): void => {
  if (isDevEnvironment()) {
    console.warn('[DEV]', ...args);
  }
};

export const devError = (...args: unknown[]): void => {
  if (isDevEnvironment()) {
    console.error('[DEV]', ...args);
  }
};

// Performance monitoring for development
export const devTime = (label: string): void => {
  if (isDevEnvironment()) {
    console.time(`[DEV] ${label}`);
  }
};

export const devTimeEnd = (label: string): void => {
  if (isDevEnvironment()) {
    console.timeEnd(`[DEV] ${label}`);
  }
};

// Memory usage logging
export const logMemoryUsage = (): void => {
  if (isDevEnvironment() && 'memory' in performance) {
    const memory = (performance as any).memory;
    devLog('Memory Usage:', {
      used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
      total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
      limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
    });
  }
};

// Safe development logging
export const devOnlyLog = (message: string, data?: any): void => {
  if (isDevEnvironment()) {
    console.log(`[DEV] ${message}`, data);
  }
};

// Export utilities
export const devUtils = {
  log: devLog,
  warn: devWarn,
  error: devError,
  time: devTime,
  timeEnd: devTimeEnd,
  logMemory: logMemoryUsage,
  isDev: isDevEnvironment,
  isProd: isProdEnvironment,
  isTest: isTestEnvironment
};