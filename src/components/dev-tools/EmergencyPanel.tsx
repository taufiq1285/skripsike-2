/**
 * Emergency Panel - Backup & Recovery Tools
 * Day 6: Fixed ESLint warnings + TypeScript errors
 * Status: TypeScript compliant
 */

import React from 'react';
import { 
  AlertTriangle, 
  Trash2, 
  RefreshCw, 
  LogOut, 
  Database,
  Download
} from 'lucide-react';
import { useDevStore } from '../../lib/dev/devStore';

// Type for window.__DEV__
interface DevWindow extends Window {
  __DEV__?: {
    config?: Record<string, unknown>;
  };
}

export const EmergencyPanel: React.FC = () => {
  const devStore = useDevStore();

  const emergencyActions = {
    clearLocalStorage: () => {
      if (confirm('🚨 Clear all local storage? This will remove all saved data.')) {
        localStorage.clear();
        console.log('🧹 Local storage cleared');
        alert('✅ Local storage cleared!');
      }
    },

    clearSessionStorage: () => {
      if (confirm('🚨 Clear session storage? This will reset current session data.')) {
        sessionStorage.clear();
        console.log('🧹 Session storage cleared');
        alert('✅ Session storage cleared!');
      }
    },

    emergencyLogout: () => {
      if (confirm('🚨 Emergency logout? This will clear all auth data and reload.')) {
        localStorage.removeItem('supabase.auth.token');
        sessionStorage.clear();
        // Clear any other auth-related storage
        document.cookie.split(";").forEach(function(c) { 
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        });
        window.location.reload();
      }
    },

    resetDevSession: () => {
      if (confirm('Reset development session? This will clear dev tool state.')) {
        devStore.resetSession();
        console.log('🔄 Dev session reset');
        alert('✅ Dev session reset!');
      }
    },

    databaseReset: () => {
      if (confirm('🚨 DANGER: Reset database? This will clear all data!')) {
        const secondConfirm = prompt('Type "RESET DATABASE" to confirm:');
        if (secondConfirm === 'RESET DATABASE') {
          console.log('🗄️ Database reset requested - implement actual reset logic');
          alert('⚠️ Database reset feature not implemented yet');
        }
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

    hardRefresh: () => {
      if (confirm('🚨 Hard refresh? This will reload without cache.')) {
        window.location.reload();
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Warning */}
      <div className="bg-red-50 border border-red-200 rounded p-2">
        <div className="flex items-center gap-2 text-red-700">
          <AlertTriangle size={16} />
          <span className="text-sm font-medium">Emergency Tools</span>
        </div>
        <p className="text-xs text-red-600 mt-1">
          Use these tools only when normal functions fail
        </p>
      </div>

      {/* Emergency Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={emergencyActions.clearLocalStorage}
          className="flex items-center gap-2 p-2 bg-orange-100 text-orange-800 rounded text-sm hover:bg-orange-200"
        >
          <Trash2 size={14} />
          <span>Clear Local</span>
        </button>

        <button
          onClick={emergencyActions.clearSessionStorage}
          className="flex items-center gap-2 p-2 bg-orange-100 text-orange-800 rounded text-sm hover:bg-orange-200"
        >
          <Trash2 size={14} />
          <span>Clear Session</span>
        </button>

        <button
          onClick={emergencyActions.emergencyLogout}
          className="flex items-center gap-2 p-2 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
        >
          <LogOut size={14} />
          <span>Emergency Logout</span>
        </button>

        <button
          onClick={emergencyActions.resetDevSession}
          className="flex items-center gap-2 p-2 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
        >
          <RefreshCw size={14} />
          <span>Reset Dev</span>
        </button>

        <button
          onClick={emergencyActions.hardRefresh}
          className="flex items-center gap-2 p-2 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200"
        >
          <RefreshCw size={14} />
          <span>Hard Refresh</span>
        </button>

        <button
          onClick={emergencyActions.exportDevData}
          className="flex items-center gap-2 p-2 bg-purple-100 text-purple-800 rounded text-sm hover:bg-purple-200"
        >
          <Download size={14} />
          <span>Export Data</span>
        </button>
      </div>

      {/* Danger Zone */}
      <div className="border-t border-red-300 pt-3">
        <p className="text-xs text-red-600 mb-2 font-medium">⚠️ DANGER ZONE</p>
        <button
          onClick={emergencyActions.databaseReset}
          className="w-full flex items-center justify-center gap-2 p-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        >
          <Database size={14} />
          <span>Reset Database</span>
        </button>
      </div>
    </div>
  );
};