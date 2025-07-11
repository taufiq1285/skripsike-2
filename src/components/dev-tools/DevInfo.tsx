/**
 * Dev Info Panel - Debug Information Display
 */

import React from 'react';
import { getDevInfo } from '../../lib/dev/config';
import { useDevStore } from '../../lib/dev/devStore';

export const DevInfo: React.FC = () => {
  const devInfo = getDevInfo();
  const devStore = useDevStore();
  const sessionInfo = devStore.getSessionInfo();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log('📋 Copied to clipboard:', text);
  };

  return (
    <div className="space-y-3 text-sm">
      {/* Environment Info */}
      <div>
        <h4 className="font-medium text-yellow-800 mb-2">🌍 Environment</h4>
        <div className="space-y-1 text-yellow-700">
          <div className="flex justify-between">
            <span>Mode:</span>
            <span className="font-mono bg-yellow-100 px-1 rounded">
              {devInfo.environment}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Version:</span>
            <span className="font-mono bg-yellow-100 px-1 rounded">
              {devInfo.buildInfo.version}
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

      {/* Session Info */}
      <div>
        <h4 className="font-medium text-yellow-800 mb-2">📊 Session</h4>
        <div className="space-y-1 text-yellow-700">
          <div className="flex justify-between">
            <span>Duration:</span>
            <span className="font-mono bg-yellow-100 px-1 rounded">
              {sessionInfo.sessionDurationFormatted}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Role Switches:</span>
            <span className="font-mono bg-yellow-100 px-1 rounded">
              {sessionInfo.roleSwitches} / {sessionInfo.limits.maxRoleSwitches}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Current User:</span>
            <span className="font-mono bg-yellow-100 px-1 rounded text-xs">
              {sessionInfo.user || 'None'}
            </span>
          </div>
        </div>
      </div>

      {/* Browser Info */}
      <div>
        <h4 className="font-medium text-yellow-800 mb-2">🌐 Browser</h4>
        <div className="space-y-1 text-yellow-700">
          <div className="flex justify-between">
            <span>URL:</span>
            <button
              onClick={() => copyToClipboard(window.location.href)}
              className="font-mono bg-yellow-100 px-1 rounded text-xs hover:bg-yellow-200"
              title="Click to copy"
            >
              {window.location.pathname}
            </button>
          </div>
          <div className="flex justify-between">
            <span>User Agent:</span>
            <button
              onClick={() => copyToClipboard(navigator.userAgent)}
              className="font-mono bg-yellow-100 px-1 rounded text-xs hover:bg-yellow-200 truncate max-w-[120px]"
              title="Click to copy full user agent"
            >
              {navigator.userAgent.split(' ')[0]}...
            </button>
          </div>
        </div>
      </div>

      {/* Quick Debug Actions */}
      <div className="pt-2 border-t border-yellow-300">
        <div className="flex gap-2">
          <button
            onClick={() => console.table(devInfo)}
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
          <button
            onClick={() => {
              const debugData = { devInfo, sessionInfo, config: devStore };
              console.log('🐛 Complete Debug Data:', debugData);
            }}
            className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs hover:bg-purple-200"
          >
            Full Debug
          </button>
        </div>
      </div>
    </div>
  );
};