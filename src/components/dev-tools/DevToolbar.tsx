/**
 * Enhanced DevToolbar - AKBID Lab System  
 * Development toolbar with emergency features + enhanced functionality
 * Status: Complete with enhanced features (Direct Replacement)
 */
import { useState, useEffect } from 'react';
import { 
  Settings, 
  Info, 
  RefreshCw, 
  AlertTriangle, 
  Database, 
  Trash2, 
  LogOut, 
  Zap,
  Bug,
  Download,
  Copy,
  EyeOff,
  Terminal,
  Activity
} from 'lucide-react';
import { ENV, getEnvInfo } from '../../lib/constants/env';
import { useAuth } from '../../hooks/useAuth';
import { useRole } from '../../hooks/useRole';

export const DevToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const [performanceData, setPerformanceData] = useState<any>({});
  const [consoleVisible, setConsoleVisible] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  
  const { logout, user } = useAuth();
  const { currentRole } = useRole();
  const envInfo = getEnvInfo();

  // Performance monitoring
  useEffect(() => {
    if (!ENV.IS_DEV) return;

    const updatePerformance = () => {
      const memory = (performance as any).memory;
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      
      setPerformanceData({
        memory: memory ? {
          used: (memory.usedJSHeapSize / 1048576).toFixed(2),
          total: (memory.totalJSHeapSize / 1048576).toFixed(2),
          limit: (memory.jsHeapSizeLimit / 1048576).toFixed(2)
        } : null,
        timing: navigation ? {
          loadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
          domReady: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart)
        } : null,
        connection: (navigator as any).connection ? {
          type: (navigator as any).connection.effectiveType,
          downlink: (navigator as any).connection.downlink
        } : null
      });
    };

    updatePerformance();
    const interval = setInterval(updatePerformance, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!ENV.IS_DEV || !ENV.DEV_TOOLBAR) return null;

  const addLog = (message: string, type: string = 'info') => {
    const log = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    };
    setLogs(prev => [...prev.slice(-49), log]); // Keep last 50 logs
  };

  // Emergency Functions
  const emergencyFunctions = {
    // Quick database reset (clears local data)
    resetDatabase: () => {
      if (confirmAction !== 'resetDatabase') {
        setConfirmAction('resetDatabase');
        return;
      }
      
      try {
        // Clear all local storage
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear IndexedDB if available
        if ('indexedDB' in window) {
          indexedDB.deleteDatabase('supabase-cache');
        }
        
        addLog('🔄 Database reset completed', 'success');
        console.log('🔄 Database reset completed');
        alert('Database reset completed! Page will reload.');
        window.location.reload();
      } catch (error) {
        console.error('❌ Database reset failed:', error);
        addLog('❌ Database reset failed: ' + (error as Error).message, 'error');
        alert('Database reset failed!');
      }
      setConfirmAction(null);
    },

    // Clear all local storage
    clearStorage: () => {
      if (confirmAction !== 'clearStorage') {
        setConfirmAction('clearStorage');
        return;
      }
      
      try {
        const beforeCount = localStorage.length + sessionStorage.length;
        localStorage.clear();
        sessionStorage.clear();
        
        addLog(`🧹 Cleared ${beforeCount} storage items`, 'success');
        console.log(`🧹 Cleared ${beforeCount} storage items`);
        alert(`Cleared ${beforeCount} storage items!`);
      } catch (error) {
        console.error('❌ Storage clear failed:', error);
        addLog('❌ Storage clear failed: ' + (error as Error).message, 'error');
        alert('Storage clear failed!');
      }
      setConfirmAction(null);
    },

    // Emergency logout
    emergencyLogout: () => {
      if (confirmAction !== 'emergencyLogout') {
        setConfirmAction('emergencyLogout');
        return;
      }
      
      try {
        logout();
        localStorage.removeItem('auth-token');
        sessionStorage.removeItem('auth-token');
        
        addLog('🚪 Emergency logout completed', 'success');
        console.log('🚪 Emergency logout completed');
        alert('Emergency logout completed!');
        window.location.href = '/login';
      } catch (error) {
        console.error('❌ Emergency logout failed:', error);
        addLog('❌ Emergency logout failed: ' + (error as Error).message, 'error');
        alert('Emergency logout failed!');
      }
      setConfirmAction(null);
    },

    // Direct role switching
    switchRole: (role: string) => {
      if (confirmAction !== `switchRole-${role}`) {
        setConfirmAction(`switchRole-${role}`);
        return;
      }
      
      try {
        // Store in localStorage for dev role switching
        localStorage.setItem('dev-role-override', role);
        
        addLog(`🔄 Role switched to: ${role}`, 'success');
        console.log(`🔄 Role switched to: ${role}`);
        alert(`Role switched to: ${role}! Page will reload.`);
        window.location.reload();
      } catch (error) {
        console.error('❌ Role switch failed:', error);
        addLog('❌ Role switch failed: ' + (error as Error).message, 'error');
        alert('Role switch failed!');
      }
      setConfirmAction(null);
    },

    // Export debug data
    exportDevData: () => {
      try {
        const devData = {
          timestamp: new Date().toISOString(),
          url: window.location.href,
          user: user,
          role: currentRole,
          envInfo: envInfo,
          localStorage: Object.fromEntries(
            Object.entries(localStorage).map(([k, v]) => [k, v.length > 100 ? v.substring(0, 100) + '...' : v])
          ),
          sessionStorage: Object.fromEntries(
            Object.entries(sessionStorage).map(([k, v]) => [k, v.length > 100 ? v.substring(0, 100) + '...' : v])
          ),
          performance: performanceData,
          logs: logs.slice(-50), // Last 50 logs
          navigator: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine
          }
        };
        
        const blob = new Blob([JSON.stringify(devData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `akbid-dev-data-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        addLog('📁 Dev data exported', 'success');
        console.log('📁 Dev data exported');
      } catch (error) {
        addLog('❌ Export failed: ' + (error as Error).message, 'error');
        console.error('❌ Export failed:', error);
      }
    },

    // Copy to clipboard
    copyToClipboard: async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        addLog('📋 Copied to clipboard', 'success');
      } catch (error) {
        addLog('❌ Copy failed: ' + (error as Error).message, 'error');
      }
    },

    // Run health check
    runHealthCheck: async () => {
      addLog('🩺 Running health check...', 'info');
      
      const checks = [
        { name: 'Local Storage', check: () => { localStorage.setItem('test', 'test'); localStorage.removeItem('test'); return true; } },
        { name: 'Session Storage', check: () => { sessionStorage.setItem('test', 'test'); sessionStorage.removeItem('test'); return true; } },
        { name: 'IndexedDB', check: () => 'indexedDB' in window },
        { name: 'Service Worker', check: () => 'serviceWorker' in navigator },
        { name: 'Fetch API', check: () => 'fetch' in window },
        { name: 'WebSocket', check: () => 'WebSocket' in window }
      ];
      
      checks.forEach(({ name, check }) => {
        try {
          const result = check();
          addLog(`${result ? '✅' : '❌'} ${name}: ${result ? 'OK' : 'FAIL'}`, result ? 'success' : 'error');
        } catch (error) {
          addLog(`❌ ${name}: ERROR - ${(error as Error).message}`, 'error');
        }
      });
    },

    // Cancel confirmation
    cancelAction: () => {
      setConfirmAction(null);
    },
  };

  const roles = ['admin', 'dosen', 'laboran', 'mahasiswa', 'dev_super'];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Console Panel */}
      {consoleVisible && (
        <div className="mb-2 bg-gray-900 text-green-400 rounded-lg shadow-lg w-96 h-64 flex flex-col">
          <div className="flex items-center justify-between p-2 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Terminal size={14} />
              <span className="text-sm font-medium">Dev Console</span>
            </div>
            <button
              onClick={() => setConsoleVisible(false)}
              className="text-gray-400 hover:text-white"
            >
              <EyeOff size={14} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 font-mono text-xs">
            {logs.map(log => (
              <div
                key={log.id}
                className={`mb-1 ${
                  log.type === 'error' ? 'text-red-400' :
                  log.type === 'success' ? 'text-green-400' :
                  log.type === 'warning' ? 'text-yellow-400' :
                  'text-gray-300'
                }`}
              >
                <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-gray-700">
            <button
              onClick={() => setLogs([])}
              className="text-xs text-gray-400 hover:text-white"
            >
              Clear logs
            </button>
          </div>
        </div>
      )}

      {/* Main Toolbar Panel */}
      <div className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg shadow-lg p-4 mb-2 min-w-[350px] max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-gray-800 flex items-center gap-2">
              <Bug size={16} />
              Enhanced Development Toolbar
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setConsoleVisible(!consoleVisible)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  consoleVisible 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Console
              </button>
              <button
                onClick={() => setEmergencyMode(!emergencyMode)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  emergencyMode 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {emergencyMode ? 'Exit Emergency' : 'Emergency Mode'}
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="text-sm space-y-2 mb-4">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Environment: <span className="font-mono font-semibold text-yellow-700">{envInfo.environment}</span></div>
              <div>Version: <span className="font-mono">{envInfo.version}</span></div>
              <div>User: <span className="font-mono">{user?.email?.split('@')[0] || 'None'}</span></div>
              <div>Role: <span className="font-mono font-semibold text-blue-600">{currentRole || 'None'}</span></div>
              <div>Supabase: <span className="font-mono">{envInfo.supabaseConfigured ? '✅' : '❌'}</span></div>
              <div>PWA: <span className="font-mono">{envInfo.pwaEnabled ? '✅' : '❌'}</span></div>
            </div>

            {/* Performance Metrics */}
            {performanceData.memory && (
              <div className="mt-2 pt-2 border-t border-gray-300">
                <div className="text-xs text-gray-600 mb-1">Performance:</div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>Memory: <span className="font-mono">{performanceData.memory.used}MB</span></div>
                  <div>Load: <span className="font-mono">{performanceData.timing?.loadTime}ms</span></div>
                </div>
              </div>
            )}
          </div>

          {/* Regular Dev Actions */}
          {!emergencyMode && (
            <div className="space-y-3">
              <div className="border-t pt-3">
                <div className="text-sm font-medium mb-2">Development Actions</div>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => console.table(envInfo)}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                  >
                    <Info size={12} />
                    Log ENV
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
                  >
                    <RefreshCw size={12} />
                    Reload
                  </button>
                  <button 
                    onClick={() => emergencyFunctions.runHealthCheck()}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
                  >
                    <Activity size={12} />
                    Health Check
                  </button>
                  <button 
                    onClick={() => emergencyFunctions.exportDevData()}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded hover:bg-orange-200"
                  >
                    <Download size={12} />
                    Export Data
                  </button>
                </div>
              </div>

              {/* Role Switching */}
              {ENV.DEV_ROLE_SWITCH && (
                <div className="border-t pt-3">
                  <div className="text-sm font-medium mb-2">Quick Role Switch</div>
                  <div className="grid grid-cols-3 gap-1">
                    {roles.map(role => (
                      <button
                        key={role}
                        onClick={() => emergencyFunctions.switchRole(role)}
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                          currentRole === role
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Copy Actions */}
              <div className="border-t pt-3">
                <div className="text-sm font-medium mb-2">Quick Copy</div>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => emergencyFunctions.copyToClipboard(window.location.href)}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                  >
                    <Copy size={12} />
                    URL
                  </button>
                  <button
                    onClick={() => emergencyFunctions.copyToClipboard(JSON.stringify(user, null, 2))}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                  >
                    <Copy size={12} />
                    User Data
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Emergency Actions */}
          {emergencyMode && (
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
                  <AlertTriangle size={16} />
                  Emergency Actions
                </div>
                
                {confirmAction && (
                  <div className="mb-3 p-2 bg-yellow-100 border border-yellow-300 rounded">
                    <div className="text-xs text-yellow-800 mb-2">
                      ⚠️ Confirm action: <strong>{confirmAction}</strong>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (confirmAction.startsWith('switchRole-')) {
                            const role = confirmAction.split('-')[1];
                            emergencyFunctions.switchRole(role);
                          } else {
                            (emergencyFunctions as any)[confirmAction]();
                          }
                        }}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={emergencyFunctions.cancelAction}
                        className="px-2 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={emergencyFunctions.resetDatabase}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    <Database size={14} />
                    Reset Database
                  </button>
                  
                  <button
                    onClick={emergencyFunctions.clearStorage}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                  >
                    <Trash2 size={14} />
                    Clear All Storage
                  </button>
                  
                  <button
                    onClick={emergencyFunctions.emergencyLogout}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                  >
                    <LogOut size={14} />
                    Emergency Logout
                  </button>
                  
                  <button
                    onClick={() => emergencyFunctions.exportDevData()}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    <Download size={14} />
                    Export Debug Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-white p-3 rounded-full shadow-lg transition-all duration-300 ${
          emergencyMode 
            ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
            : isOpen
            ? 'bg-yellow-600 hover:bg-yellow-700'
            : 'bg-yellow-500 hover:bg-yellow-600'
        }`}
        title="Enhanced Development Toolbar"
      >
        {emergencyMode ? <Zap size={20} /> : <Settings size={20} />}
      </button>
    </div>
  );
};