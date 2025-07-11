/**
 * Development Utilities - AKBID Lab System
 * Security: Production-safe development helpers  
 * Status: Day 5 Implementation
 */

import { DEV_CONFIG, getDevInfo } from './config';
import { ENV } from '../constants/env';

// Console logging for development
export const devLog = {
  info: (message: string, data?: unknown) => {
    if (!DEV_CONFIG.enabled || !ENV.LOG_CONSOLE) return;
    console.log(`🔧 [DEV] ${message}`, data || '');
  },
  
  warn: (message: string, data?: unknown) => {
    if (!DEV_CONFIG.enabled) return;
    console.warn(`⚠️ [DEV] ${message}`, data || '');
  },
  
  error: (message: string, data?: unknown) => {
    if (!DEV_CONFIG.enabled) return;
    console.error(`🚨 [DEV] ${message}`, data || '');
  },
  
  debug: (message: string, data?: unknown) => {
    if (!DEV_CONFIG.enabled || ENV.LOG_LEVEL !== 'debug') return;
    console.debug(`🐛 [DEBUG] ${message}`, data || '');
  }
};

// Performance monitoring for development
export const devPerformance = {
  mark: (name: string) => {
    if (!DEV_CONFIG.enablePerformanceMonitoring) return;
    performance.mark(name);
  },
  
  measure: (name: string, startMark: string, endMark: string) => {
    if (!DEV_CONFIG.enablePerformanceMonitoring) return;
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      devLog.debug(`Performance: ${name}`, `${measure.duration.toFixed(2)}ms`);
    } catch (error) {
      devLog.error('Performance measurement failed', error);
    }
  },
  
  getMetrics: () => {
    if (!DEV_CONFIG.enablePerformanceMonitoring) return {};
    
    return {
      navigation: performance.getEntriesByType('navigation'),
      marks: performance.getEntriesByType('mark'),
      measures: performance.getEntriesByType('measure'),
    };
  }
};

// Development API helpers
export const devApi = {
  logRequest: (url: string, options?: RequestInit) => {
    if (!DEV_CONFIG.apiDebug) return;
    devLog.debug('API Request', { url, method: options?.method || 'GET' });
  },
  
  logResponse: (url: string, response: Response) => {
    if (!DEV_CONFIG.apiDebug) return;
    devLog.debug('API Response', { 
      url, 
      status: response.status, 
      statusText: response.statusText 
    });
  },
  
  logError: (url: string, error: Error) => {
    if (!DEV_CONFIG.apiDebug) return;
    devLog.error('API Error', { url, error: error.message });
  }
};

// Global development exposure (window.__DEV__)
export const exposeDevelopmentGlobals = () => {
  if (!DEV_CONFIG.exposeGlobals || typeof window === 'undefined') return;
  
  (window as any).__DEV__ = {
    config: DEV_CONFIG,
    info: getDevInfo(),
    utils: {
      log: devLog,
      performance: devPerformance,
      api: devApi,
    },
    store: {
      // Will be populated by devStore
    },
    help: () => {
      console.log(`
🔧 AKBID Lab System - Development Console

Available commands:
- __DEV__.info                 - Environment & build info
- __DEV__.config              - Development configuration  
- __DEV__.utils.log.info()    - Development logging
- __DEV__.utils.performance   - Performance monitoring
- __DEV__.store              - Development state

Example usage:
__DEV__.utils.log.info('Hello from dev console!');
__DEV__.utils.performance.mark('test-start');
      `);
    }
  };
  
  devLog.info('Development globals exposed to window.__DEV__');
};

// Production safety checker
export const checkProductionSafety = (): boolean => {
  if (!ENV.IS_PROD) return true;
  
  const risks = [];
  
  // Check for development features in production
  if (DEV_CONFIG.enabled) risks.push('DEV_CONFIG.enabled');
  if (DEV_CONFIG.showDevTools) risks.push('showDevTools');
  if (DEV_CONFIG.allowRoleSwitching) risks.push('allowRoleSwitching');
  if (DEV_CONFIG.exposeGlobals) risks.push('exposeGlobals');
  
  // Check for development environment variables
  if (ENV.DEV_MODE) risks.push('VITE_DEV_MODE');
  if (ENV.DEV_TOOLBAR) risks.push('VITE_DEV_TOOLBAR');
  
  if (risks.length > 0) {
    console.error('🚨 PRODUCTION SECURITY RISK:', risks);
    return false;
  }
  
  return true;
};

// Environment validation
export const validateEnvironment = (): boolean => {
  try {
    const errors = [];
    
    // Required environment variables
    if (ENV.IS_PROD) {
      if (!ENV.SUPABASE_URL) errors.push('VITE_SUPABASE_URL required');
      if (!ENV.SUPABASE_ANON_KEY) errors.push('VITE_SUPABASE_ANON_KEY required');
    }
    
    // Development warnings
    if (ENV.IS_DEV) {
      if (!ENV.SUPABASE_URL) devLog.warn('Supabase URL not configured');
      if (!ENV.SUPABASE_ANON_KEY) devLog.warn('Supabase anon key not configured');
    }
    
    if (errors.length > 0) {
      console.error('Environment validation failed:', errors);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Environment validation error:', error);
    return false;
  }
};

// Initialization function
export const initializeDevelopment = () => {
  if (!DEV_CONFIG.enabled) return;
  
  devLog.info('Initializing development environment');
  
  // Run safety checks
  const safetyCheck = checkProductionSafety();
  const envCheck = validateEnvironment();
  
  if (!safetyCheck || !envCheck) {
    devLog.error('Development initialization failed safety checks');
    return false;
  }
  
  // Expose globals
  exposeDevelopmentGlobals();
  
  // Log initialization
  devLog.info('Development environment initialized', getDevInfo());
  
  return true;
};