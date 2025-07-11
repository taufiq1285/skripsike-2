/**
 * Development Configuration - AKBID Lab System
 * Security: Production-safe development tools
 * Status: Day 5 Implementation
 */

import { ENV } from '../constants/env';

// CRITICAL: Development config that's safe for production
export const DEV_CONFIG = {
  // Main development toggle - false in production builds
  enabled: ENV.IS_DEV && ENV.DEV_MODE,
  
  // Individual feature flags
  showDevTools: ENV.IS_DEV && ENV.DEV_TOOLBAR,
  allowRoleSwitching: ENV.IS_DEV && ENV.DEV_ROLE_SWITCH,
  allowQuickLogin: ENV.IS_DEV && ENV.DEV_QUICK_LOGIN,
  
  // Development user configuration
  superUserEmail: 'dev@akbid.test',
  testUserEmails: [
    'admin@akbid.test',
    'dosen@akbid.test', 
    'laboran@akbid.test',
    'mahasiswa@akbid.test',
    'dev@akbid.test'
  ],
  
  // Console access
  exposeGlobals: ENV.IS_DEV,
  
  // API configuration for development
  apiDebug: ENV.IS_DEV && ENV.LOG_LEVEL === 'debug',
  mockData: false, // Set to true untuk mock API responses
  
  // Performance monitoring
  enablePerformanceMonitoring: ENV.IS_DEV,
  logLevel: ENV.LOG_LEVEL,
  
  // Safety checks
  productionSafetyEnabled: true,
  maxRoleSwitchesPerSession: 10,
  
  // UI customization
  showEnvironmentBadge: ENV.IS_DEV,
  showVersionInfo: ENV.IS_DEV,
  showPerformanceStats: ENV.IS_DEV,
} as const;

// Production safety validation
export const validateDevConfig = (): boolean => {
  if (ENV.IS_PROD) {
    // Ensure all dev features are disabled in production
    const devFeatures = [
      DEV_CONFIG.enabled,
      DEV_CONFIG.showDevTools,
      DEV_CONFIG.allowRoleSwitching,
      DEV_CONFIG.allowQuickLogin,
      DEV_CONFIG.exposeGlobals
    ];
    
    const enabledInProd = devFeatures.some(feature => feature === true);
    
    if (enabledInProd) {
      console.error('🚨 SECURITY ALERT: Dev features enabled in production!');
      return false;
    }
  }
  
  return true;
};

// Environment info for debugging
export const getDevInfo = () => ({
  environment: ENV.VITE_ENV,
  isDev: ENV.IS_DEV,
  isProd: ENV.IS_PROD,
  config: DEV_CONFIG,
  timestamp: new Date().toISOString(),
  buildInfo: {
    version: ENV.APP_VERSION,
    name: ENV.APP_NAME,
    nodeEnv: ENV.NODE_ENV,
  }
});

// Type exports
export type DevConfig = typeof DEV_CONFIG;
export type DevInfo = ReturnType<typeof getDevInfo>;