/**
 * Quick Actions Panel - Development Shortcuts
 */

import React from 'react';
import { 
  Zap, 
  User, 
  _Eye, 
  Settings, 
  Code, 
  Monitor,
  Clock,
  Target
} from 'lucide-react';
import { useDevStore, useTestUsers } from '../../lib/dev/devStore';
import { _DEV_CONFIG } from '../../lib/dev/config';

export const QuickActions: React.FC = () => {
  const devStore = useDevStore();
  const { current, _available, setUser, canSwitchRole } = useTestUsers();

  const quickActions = {
    switchToAdmin: () => {
      if (canSwitchRole) {
        setUser('admin@akbid.test');
        devStore.switchRole('admin');
        console.log('🔄 Switched to admin role');
      }
    },

    switchToDev: () => {
      if (canSwitchRole) {
        setUser('dev@akbid.test');
        devStore.switchRole('dev_super');
        console.log('🔄 Switched to dev_super role');
      }
    },

    performanceTest: () => {
      const startTime = performance.now();
      console.time('Performance Test');
      
      // Simulate some work
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
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
          });
        })
        .catch(error => {
          console.error('🌐 Network test failed:', error);
        });
    },

    consoleTest: () => {
      console.group('🧪 Console Test Group');
      console.log('ℹ️ Info log');
      console.warn('⚠️ Warning log');
      console.error('❌ Error log');
      console.debug('🐛 Debug log');
      console.table({ test: 'data', status: 'working' });
      console.groupEnd();
    },

    memoryTest: () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        console.log('💾 Memory usage:', {
          used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
          total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
          limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
        });
      } else {
        console.log('💾 Memory API not _available');
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* User Switching */}
      <div>
        <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
          <User size={16} />
          Quick User Switch
        </h4>
        
        <div className="space-y-2">
          <div className="text-xs text-yellow-700">
            Current: <span className="font-mono bg-yellow-100 px-1 rounded">
              {current || 'None'}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={quickActions.switchToAdmin}
              disabled={!canSwitchRole}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200 disabled:opacity-50"
            >
              👑 Admin
            </button>
            <button
              onClick={quickActions.switchToDev}
              disabled={!canSwitchRole}
              className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs hover:bg-purple-200 disabled:opacity-50"
            >
              🔧 Dev Super
            </button>
          </div>
          
          {!canSwitchRole && (
            <p className="text-xs text-red-600">
              Role switch limit reached ({devStore.roleSwitchCount}/10)
            </p>
          )}
        </div>
      </div>

      {/* Quick Tests */}
      <div>
        <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
          <Zap size={16} />
          Quick Tests
        </h4>
        
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={quickActions.performanceTest}
            className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs hover:bg-green-200"
          >
            <Clock size={12} className="inline mr-1" />
            Performance
          </button>
          
          <button
            onClick={quickActions.networkTest}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200"
          >
            <Monitor size={12} className="inline mr-1" />
            Network
          </button>
          
          <button
            onClick={quickActions.consoleTest}
            className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs hover:bg-purple-200"
          >
            <Code size={12} className="inline mr-1" />
            Console
          </button>
          
          <button
            onClick={quickActions.memoryTest}
            className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs hover:bg-orange-200"
          >
            <Target size={12} className="inline mr-1" />
            Memory
          </button>
        </div>
      </div>

      {/* Feature Toggles */}
      <div>
        <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
          <Settings size={16} />
          Feature Toggles
        </h4>
        
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
  );
};