/**
 * Enhanced Dev Toolbar - AKBID Lab System
 * Day 6: Fixed ESLint warnings + TypeScript errors
 * Status: TypeScript compliant
 */

import React, { useState } from 'react';
import { 
  Settings, 
  Bug, 
  RefreshCw, 
  AlertTriangle,
  Zap,
  Trash2,
  Database
} from 'lucide-react';
import { ENV, getEnvInfo } from '../../lib/constants/env';
import { useDevStore } from '../../lib/dev/devStore';
import { withDevOnly } from '../../lib/dev/guards';

interface DevToolbarProps {
  className?: string;
}

// Type for window.__DEV__
interface DevWindow extends Window {
  __DEV__?: {
    config?: Record<string, unknown>;
  };
}

// Type for memory performance
interface MemoryPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

const DevToolbarComponent: React.FC<DevToolbarProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePanel, setActivePanel] = useState<'info' | 'emergency' | 'actions' | null>(null);
  const devStore = useDevStore();
  const envInfo = getEnvInfo();

  const togglePanel = (panel: 'info' | 'emergency' | 'actions') => {
    setActivePanel(activePanel === panel ? null : panel);
    if (!isExpanded) setIsExpanded(true);
  };

  // Emergency functions
  const emergencyFunctions = {
    clearLocalStorage: () => {
      if (confirm('🚨 Clear all local storage?')) {
        localStorage.clear();
        console.log('🧹 Local storage cleared');
        alert('✅ Local storage cleared!');
      }
    },

    emergencyLogout: () => {
      if (confirm('🚨 Emergency logout? This will reload the page.')) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
      }
    },

    resetDevSession: () => {
      if (confirm('Reset development session?')) {
        devStore.resetSession();
        console.log('🔄 Dev session reset');
        alert('✅ Dev session reset!');
      }
    },

    exportDevData: () => {
      const devWindow = window as DevWindow;
      const devData = {
        session: devStore.getSessionInfo(),
        config: devWindow.__DEV__?.config || {},
        timestamp: new Date().toISOString(),
        url: window.location.href
      };
      
      const blob = new Blob([JSON.stringify(devData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `akbid-dev-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      console.log('📁 Dev data exported');
    },

    performanceTest: () => {
      const startTime = performance.now();
      console.time('Performance Test');
      
      for (let i = 0; i < 100000; i++) {
        Math.random();
      }
      
      const endTime = performance.now();
      console.timeEnd('Performance Test');
      console.log(`⏱️ Performance test: ${(endTime - startTime).toFixed(2)}ms`);
    },

    networkTest: () => {
      fetch(window.location.origin)
        .then(response => {
          console.log('🌐 Network test result:', {
            status: response.status,
            statusText: response.statusText
          });
        })
        .catch(error => {
          console.error('🌐 Network test failed:', error);
        });
    }
  };

  const sessionInfo = devStore.getSessionInfo();

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`} data-dev-toolbar>
      {/* Panels */}
      {isExpanded && activePanel && (
        <div className="mb-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg shadow-xl p-4 min-w-[320px] max-w-[400px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-yellow-800">
              {activePanel === 'info' && '🐛 Debug Info'}
              {activePanel === 'emergency' && '🚨 Emergency Tools'}
              {activePanel === 'actions' && '⚡ Quick Actions'}
            </h3>
            <button
              onClick={() => setActivePanel(null)}
              className="text-yellow-600 hover:text-yellow-800 text-lg"
            >
              ×
            </button>
          </div>
          
          {/* Info Panel */}
          {activePanel === 'info' && (
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium text-yellow-800 mb-2">🌍 Environment</h4>
                <div className="space-y-1 text-yellow-700">
                  <div className="flex justify-between">
                    <span>Mode:</span>
                    <span className="font-mono bg-yellow-100 px-1 rounded">
                      {envInfo.environment}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span className="font-mono bg-yellow-100 px-1 rounded">
                      {ENV.APP_VERSION}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network:</span>
                    <span className="font-mono bg-yellow-100 px-1 rounded">
                      {window.location.hostname}:{window.location.port}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-yellow-800 mb-2">📊 Session</h4>
                <div className="space-y-1 text-yellow-700">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-mono bg-yellow-100 px-1 rounded">
                      {String(sessionInfo.sessionDurationFormatted)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Role Switches:</span>
                    <span className="font-mono bg-yellow-100 px-1 rounded">
                      {String(sessionInfo.roleSwitches)} / {String((sessionInfo.limits as Record<string, unknown>)?.maxRoleSwitches || 'N/A')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-yellow-300 flex gap-2">
                <button
                  onClick={() => console.table(envInfo)}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200"
                >
                  Log Info
                </button>
                <button
                  onClick={() => console.table(sessionInfo)}
                  className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs hover:bg-green-200"
                >
                  Log Session
                </button>
              </div>
            </div>
          )}

          {/* Emergency Panel */}
          {activePanel === 'emergency' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded p-2">
                <div className="flex items-center gap-2 text-red-700">
                  <AlertTriangle size={16} />
                  <span className="text-sm font-medium">Emergency Tools</span>
                </div>
                <p className="text-xs text-red-600 mt-1">
                  Use these tools only when normal functions fail
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={emergencyFunctions.clearLocalStorage}
                  className="flex items-center gap-2 p-2 bg-orange-100 text-orange-800 rounded text-sm hover:bg-orange-200"
                >
                  <Trash2 size={14} />
                  <span>Clear Local</span>
                </button>

                <button
                  onClick={emergencyFunctions.emergencyLogout}
                  className="flex items-center gap-2 p-2 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
                >
                  <AlertTriangle size={14} />
                  <span>Emergency Logout</span>
                </button>

                <button
                  onClick={emergencyFunctions.resetDevSession}
                  className="flex items-center gap-2 p-2 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
                >
                  <RefreshCw size={14} />
                  <span>Reset Dev</span>
                </button>

                <button
                  onClick={emergencyFunctions.exportDevData}
                  className="flex items-center gap-2 p-2 bg-purple-100 text-purple-800 rounded text-sm hover:bg-purple-200"
                >
                  <Database size={14} />
                  <span>Export Data</span>
                </button>
              </div>
            </div>
          )}

          {/* Actions Panel */}
          {activePanel === 'actions' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-yellow-800 mb-2">⚡ Quick Tests</h4>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={emergencyFunctions.performanceTest}
                    className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs hover:bg-green-200"
                  >
                    Performance
                  </button>
                  
                  <button
                    onClick={emergencyFunctions.networkTest}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200"
                  >
                    Network
                  </button>
                  
                  <button
                    onClick={() => {
                      console.group('🧪 Console Test');
                      console.log('ℹ️ Info log');
                      console.warn('⚠️ Warning log');
                      console.error('❌ Error log');
                      console.groupEnd();
                    }}
                    className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs hover:bg-purple-200"
                  >
                    Console
                  </button>
                  
                  <button
                    onClick={() => {
                      const memoryPerformance = performance as MemoryPerformance;
                      if (memoryPerformance.memory) {
                        const memory = memoryPerformance.memory;
                        console.log('💾 Memory usage:', {
                          used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
                          total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
                        });
                      } else {
                        console.log('💾 Memory API not available in this browser');
                      }
                    }}
                    className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs hover:bg-orange-200"
                  >
                    Memory
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-yellow-800 mb-2">🔧 Feature Toggles</h4>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={devStore.mockApiEnabled}
                      onChange={devStore.toggleMockApi}
                      className="w-3 h-3"
                    />
                    <span>Mock API</span>
                  </label>
                  
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={devStore.performanceMonitoringEnabled}
                      onChange={devStore.togglePerformanceMonitoring}
                      className="w-3 h-3"
                    />
                    <span>Performance Monitor</span>
                  </label>
                  
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={devStore.debugMode}
                      onChange={devStore.toggleDebugMode}
                      className="w-3 h-3"
                    />
                    <span>Debug Mode</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Toolbar */}
      <div className="bg-yellow-400 border-2 border-yellow-500 rounded-lg shadow-lg">
        {/* Expanded View */}
        {isExpanded && (
          <div className="p-3 border-b border-yellow-500">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-yellow-900">
                AKBID Dev Tools
              </span>
              <span className="text-xs text-yellow-700 bg-yellow-200 px-1 rounded">
                v{ENV.APP_VERSION}
              </span>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 text-xs text-yellow-800">
              <div className="text-center">
                <div className="font-semibold">{devStore.roleSwitchCount}</div>
                <div>Role Switches</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">
                  {devStore.currentTestUser ? '✓' : '○'}
                </div>
                <div>Test User</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">
                  {window.location.hostname.startsWith('192.168.') ? 'NET' : 'LOCAL'}
                </div>
                <div>Mode</div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-2">
          {isExpanded ? (
            <div className="grid grid-cols-4 gap-1">
              <button
                onClick={() => togglePanel('info')}
                className={`p-2 rounded text-yellow-900 hover:bg-yellow-300 transition-colors ${
                  activePanel === 'info' ? 'bg-yellow-300' : ''
                }`}
                title="Debug Info"
              >
                <Bug size={16} />
              </button>
              
              <button
                onClick={() => togglePanel('emergency')}
                className={`p-2 rounded text-yellow-900 hover:bg-yellow-300 transition-colors ${
                  activePanel === 'emergency' ? 'bg-yellow-300' : ''
                }`}
                title="Emergency Tools"
              >
                <AlertTriangle size={16} />
              </button>
              
              <button
                onClick={() => togglePanel('actions')}
                className={`p-2 rounded text-yellow-900 hover:bg-yellow-300 transition-colors ${
                  activePanel === 'actions' ? 'bg-yellow-300' : ''
                }`}
                title="Quick Actions"
              >
                <Zap size={16} />
              </button>
              
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded text-yellow-900 hover:bg-yellow-300 transition-colors"
                title="Collapse"
              >
                <Settings size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsExpanded(true)}
              className="p-3 rounded-full text-yellow-900 hover:bg-yellow-300 transition-colors"
              title="Expand Dev Tools"
            >
              <Settings size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Emergency Quick Access */}
      <div className="mt-2 flex gap-1">
        <button
          onClick={() => window.location.reload()}
          className="p-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600"
          title="Emergency Reload"
        >
          <RefreshCw size={12} />
        </button>
        
        <button
          onClick={emergencyFunctions.clearLocalStorage}
          className="p-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
          title="Emergency Clear"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
};

export const DevToolbar = withDevOnly(DevToolbarComponent);