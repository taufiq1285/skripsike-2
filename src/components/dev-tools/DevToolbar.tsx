/**
 * Enhanced DevToolbar - AKBID Lab System  
 * Development toolbar with emergency features
 * Status: Complete with emergency functions
 */
import { useState } from 'react';
import { 
  Settings, 
  Info, 
  RefreshCw, 
  AlertTriangle, 
  Database, 
  Trash2, 
  LogOut, 
  Users, 
  RotateCcw,
  Zap,
  Bug
} from 'lucide-react';
import { ENV, getEnvInfo } from '../../lib/constants/env';
import { useAuth } from '../../hooks/useAuth';
import { useRole } from '../../hooks/useRole';

export const DevToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  
  const { logout, user } = useAuth();
  const { currentRole } = useRole();
  const envInfo = getEnvInfo();

  if (!ENV.IS_DEV || !ENV.DEV_TOOLBAR) return null;

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
        
        console.log('🔄 Database reset completed');
        alert('Database reset completed! Page will reload.');
        window.location.reload();
      } catch (error) {
        console.error('❌ Database reset failed:', error);
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
        
        console.log(`🧹 Cleared ${beforeCount} storage items`);
        alert(`Cleared ${beforeCount} storage items!`);
      } catch (error) {
        console.error('❌ Storage clear failed:', error);
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
        
        console.log('🚪 Emergency logout completed');
        alert('Emergency logout completed!');
        window.location.href = '/login';
      } catch (error) {
        console.error('❌ Emergency logout failed:', error);
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
        
        console.log(`🔄 Role switched to: ${role}`);
        alert(`Role switched to: ${role}! Page will reload.`);
        window.location.reload();
      } catch (error) {
        console.error('❌ Role switch failed:', error);
        alert('Role switch failed!');
      }
      setConfirmAction(null);
    },

    // Full system reset
    fullReset: () => {
      if (confirmAction !== 'fullReset') {
        setConfirmAction('fullReset');
        return;
      }
      
      try {
        // Clear everything
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear cookies
        document.cookie.split(";").forEach(cookie => {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        });
        
        // Clear cache if service worker is available
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => caches.delete(name));
          });
        }
        
        console.log('💥 Full system reset completed');
        alert('Full system reset completed! Page will reload.');
        window.location.href = '/';
      } catch (error) {
        console.error('❌ Full reset failed:', error);
        alert('Full reset failed!');
      }
      setConfirmAction(null);
    },

    // Cancel confirmation
    cancelAction: () => {
      setConfirmAction(null);
    },
  };

  const roles = ['admin', 'dosen', 'laboran', 'mahasiswa'];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Main Toolbar Panel */}
      <div className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg shadow-lg p-4 mb-2 min-w-[350px] max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold text-gray-800 flex items-center gap-2">
              <Bug size={16} />
              Development Toolbar
            </div>
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
                    onClick={() => console.table(user)}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
                  >
                    <Users size={12} />
                    Log User
                  </button>
                  <button 
                    onClick={() => window.open('/dev-panel', '_blank')}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                  >
                    <Settings size={12} />
                    Dev Panel
                  </button>
                </div>
              </div>

              {/* Role Switching */}
              {ENV.DEV_ROLE_SWITCH && (
                <div className="border-t pt-3">
                  <div className="text-sm font-medium mb-2">Quick Role Switch</div>
                  <div className="grid grid-cols-2 gap-1">
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
                    onClick={emergencyFunctions.fullReset}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
                  >
                    <RotateCcw size={14} />
                    Full System Reset
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
        title="Development Toolbar"
      >
        {emergencyMode ? <Zap size={20} /> : <Settings size={20} />}
      </button>
    </div>
  );
};