import { useState } from 'react';
import { ENV, getEnvInfo } from '../../lib/constants/env';
import { Settings, Info, RefreshCw } from 'lucide-react';

export const DevToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const envInfo = getEnvInfo();

  if (!ENV.IS_DEV || !ENV.DEV_TOOLBAR) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-white border rounded-lg shadow-lg p-4 mb-2 min-w-[300px]">
          <div className="text-sm space-y-2">
            <div className="font-semibold text-gray-800">Development Info</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Environment: <span className="font-mono">{envInfo.environment}</span></div>
              <div>Version: <span className="font-mono">{envInfo.version}</span></div>
              <div>Dev Mode: <span className="font-mono">{envInfo.devMode ? 'ON' : 'OFF'}</span></div>
              <div>PWA: <span className="font-mono">{envInfo.pwaEnabled ? 'ON' : 'OFF'}</span></div>
              <div>Supabase: <span className="font-mono">{envInfo.supabaseConfigured ? 'OK' : 'NOT OK'}</span></div>
              <div>Build: <span className="font-mono">{envInfo.timestamp.split('T')[0]}</span></div>
            </div>
            
            <div className="pt-2 border-t flex gap-2">
              <button 
                onClick={() => console.log('🔧 ENV:', ENV)}
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
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <Settings size={20} />
      </button>
    </div>
  );
};