/**
 * DevInfo Component - AKBID Lab System
 * Development debugging information display
 * Status: Complete
 */
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Database, User, Shield, Clock, Wifi, WifiOff } from 'lucide-react';
import { ENV, getEnvInfo } from '../../lib/constants/env';
import { useAuth } from '../../hooks/useAuth';
import { useRole } from '../../hooks/useRole';

export const DevInfo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  const [performanceInfo, setPerformanceInfo] = useState<any>(null);
  
  const { user, isAuthenticated, permissions } = useAuth();
  const { currentRole, rolePermissions } = useRole();
  const envInfo = getEnvInfo();

  useEffect(() => {
    // Network status monitoring
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Performance info
    if ('performance' in window) {
      const perfData = {
        navigation: performance.getEntriesByType('navigation')[0],
        memory: (performance as any).memory,
        timing: performance.timing,
      };
      setPerformanceInfo(perfData);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!ENV.IS_DEV) return null;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="fixed top-4 left-4 z-40">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-gray-800 text-white p-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
        title="Toggle Dev Info"
      >
        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>

      {isVisible && (
        <div className="mt-2 bg-white border rounded-lg shadow-lg p-4 max-w-md text-xs space-y-3 max-h-96 overflow-y-auto">
          {/* Environment Info */}
          <div className="space-y-1">
            <div className="font-semibold text-gray-800 flex items-center gap-1">
              <Database size={14} />
              Environment
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div>Mode: <span className="font-mono">{envInfo.environment}</span></div>
              <div>Dev: <span className="font-mono">{envInfo.isDev ? 'Yes' : 'No'}</span></div>
              <div>Version: <span className="font-mono">{envInfo.version}</span></div>
              <div>Build: <span className="font-mono">{envInfo.timestamp.split('T')[1]?.slice(0, 8)}</span></div>
              <div>Supabase: <span className="font-mono">{envInfo.supabaseConfigured ? '✓' : '✗'}</span></div>
              <div>PWA: <span className="font-mono">{envInfo.pwaEnabled ? '✓' : '✗'}</span></div>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-1 border-t pt-2">
            <div className="font-semibold text-gray-800 flex items-center gap-1">
              <User size={14} />
              User Status
            </div>
            <div className="space-y-1">
              <div>Authenticated: <span className="font-mono">{isAuthenticated ? '✓' : '✗'}</span></div>
              {user && (
                <>
                  <div>Email: <span className="font-mono text-xs">{user.email}</span></div>
                  <div>Role: <span className="font-mono">{currentRole || 'None'}</span></div>
                  <div>ID: <span className="font-mono text-xs">{user.id?.slice(0, 8)}...</span></div>
                </>
              )}
              <div>Permissions: <span className="font-mono">{permissions?.length || 0}</span></div>
              <div>Role Perms: <span className="font-mono">{rolePermissions?.length || 0}</span></div>
            </div>
          </div>

          {/* Network Status */}
          <div className="space-y-1 border-t pt-2">
            <div className="font-semibold text-gray-800 flex items-center gap-1">
              {networkStatus ? <Wifi size={14} /> : <WifiOff size={14} />}
              Network
            </div>
            <div className="space-y-1">
              <div>Status: <span className="font-mono">{networkStatus ? 'Online' : 'Offline'}</span></div>
              <div>Connection: <span className="font-mono">{(navigator as any).connection?.effectiveType || 'Unknown'}</span></div>
            </div>
          </div>

          {/* Performance Info */}
          {performanceInfo && (
            <div className="space-y-1 border-t pt-2">
              <div className="font-semibold text-gray-800 flex items-center gap-1">
                <Clock size={14} />
                Performance
              </div>
              <div className="space-y-1">
                {performanceInfo.memory && (
                  <>
                    <div>Used: <span className="font-mono">{formatBytes(performanceInfo.memory.usedJSHeapSize)}</span></div>
                    <div>Limit: <span className="font-mono">{formatBytes(performanceInfo.memory.jsHeapSizeLimit)}</span></div>
                  </>
                )}
                {performanceInfo.navigation && (
                  <div>Load: <span className="font-mono">{Math.round(performanceInfo.navigation.loadEventEnd - performanceInfo.navigation.fetchStart)}ms</span></div>
                )}
              </div>
            </div>
          )}

          {/* Local Storage Info */}
          <div className="space-y-1 border-t pt-2">
            <div className="font-semibold text-gray-800 flex items-center gap-1">
              <Shield size={14} />
              Storage
            </div>
            <div className="space-y-1">
              <div>localStorage: <span className="font-mono">{localStorage.length} items</span></div>
              <div>sessionStorage: <span className="font-mono">{sessionStorage.length} items</span></div>
              <div>Cookies: <span className="font-mono">{document.cookie.split(';').length} items</span></div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-1 border-t pt-2">
            <div className="font-semibold text-gray-800">Quick Actions</div>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => console.table(envInfo)}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
              >
                Log Env
              </button>
              <button
                onClick={() => console.table(user)}
                className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
              >
                Log User
              </button>
              <button
                onClick={() => console.table(permissions)}
                className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
              >
                Log Perms
              </button>
            </div>
          </div>

          {/* Version Info */}
          <div className="text-xs text-gray-500 border-t pt-2">
            Last updated: {formatTime(Date.now())}
          </div>
        </div>
      )}
    </div>
  );
};