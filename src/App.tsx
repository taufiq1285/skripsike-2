// src/App.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ENV, validateEnv, getEnvInfo } from './lib/constants/env';
import { DevIndicators, DevToolbar } from './components/dev-tools';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingState } from './components/common/LoadingState';
import { Button } from './components/ui/Button';
import { Badge } from './components/ui/Badge';
import { Card } from './components/ui/Card';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [envValidated, setEnvValidated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Environment validation and initialization
    const initializeApp = async () => {
      try {
        console.log('🚀 AKBID Lab System Starting...');
        console.log('📊 Environment Info:', getEnvInfo());
        
        // Validate environment variables
        validateEnv();
        setEnvValidated(true);
        
        // Simulate some initialization time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('✅ App initialized successfully');
      } catch (err) {
        console.error('❌ App initialization failed:', err);
        setError(err instanceof Error ? err.message : 'Initialization failed');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <LoadingState message="Initializing AKBID Lab System..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 text-center">
          <div className="text-red-600 text-2xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-red-800 mb-2">Initialization Error</h1>
          <p className="text-red-700 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700"
          >
            Reload Application
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          {/* Development Tools */}
          <DevIndicators />
          <DevToolbar />
          
          {/* Main Application */}
          <div className="container mx-auto px-4 py-8">
            <WelcomeScreen envValidated={envValidated} />
          </div>
          
          {/* Toast Notifications */}
          <Toaster
            position={ENV.NOTIFICATION_POSITION as any}
            toastOptions={{
              duration: ENV.NOTIFICATION_TIMEOUT,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

// Welcome Screen Component
interface WelcomeScreenProps {
  envValidated: boolean;
}

const WelcomeScreen = ({ envValidated }: WelcomeScreenProps) => {
  const envInfo = getEnvInfo();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-12 h-12 bg-akbid-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
            A
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{ENV.APP_NAME}</h1>
            <p className="text-gray-600">{ENV.APP_DESCRIPTION}</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-2 mb-6">
          <Badge variant={envInfo.isDev ? "warning" : "success"}>
            {envInfo.environment.toUpperCase()}
          </Badge>
          <Badge variant="secondary">v{envInfo.version}</Badge>
          {envValidated && <Badge variant="success">Ready</Badge>}
        </div>
      </div>

      {/* Environment Status */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            🔧 System Status
          </h2>
          <div className="space-y-3">
            <StatusItem 
              label="Environment" 
              value={envInfo.environment} 
              status={envValidated ? "success" : "error"} 
            />
            <StatusItem 
              label="Database Connection" 
              value={envInfo.supabaseConfigured ? "Connected" : "Not Configured"} 
              status={envInfo.supabaseConfigured ? "success" : "warning"} 
            />
            <StatusItem 
              label="PWA Support" 
              value={envInfo.pwaEnabled ? "Enabled" : "Disabled"} 
              status={envInfo.pwaEnabled ? "success" : "info"} 
            />
            <StatusItem 
              label="Development Mode" 
              value={envInfo.devMode ? "ON" : "OFF"} 
              status={envInfo.devMode ? "warning" : "info"} 
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            🏥 Lab Configuration
          </h2>
          <div className="space-y-3">
            <StatusItem 
              label="Laboratory Rooms" 
              value={`${ENV.LAB_COUNT} Labs`} 
              status="success" 
            />
            <StatusItem 
              label="Storage Rooms" 
              value={`${ENV.DEPO_COUNT} Depo`} 
              status="success" 
            />
            <StatusItem 
              label="User Roles" 
              value="4 Roles (Admin, Dosen, Laboran, Mahasiswa)" 
              status="success" 
            />
            <StatusItem 
              label="File Upload" 
              value={`Max ${Math.round(ENV.MAX_FILE_SIZE / 1024 / 1024)}MB`} 
              status="info" 
            />
          </div>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          🚀 Next Steps
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">🔐</div>
            <h3 className="font-medium mb-1">Authentication</h3>
            <p className="text-sm text-gray-600">Setup Supabase authentication</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">🗄️</div>
            <h3 className="font-medium mb-1">Database</h3>
            <p className="text-sm text-gray-600">Create database schema</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-medium mb-1">User Roles</h3>
            <p className="text-sm text-gray-600">Implement RBAC system</p>
          </div>
        </div>
      </Card>

      {/* Development Info */}
      {ENV.IS_DEV && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            🔧 Development build - {envInfo.timestamp}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Use the development toolbar (bottom-right) for debugging tools
          </p>
        </div>
      )}
    </div>
  );
};

// Status Item Component
interface StatusItemProps {
  label: string;
  value: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

const StatusItem = ({ label, value, status }: StatusItemProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '•';
    }
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-700">{label}</span>
      <span className={`text-sm font-medium flex items-center gap-1 ${getStatusColor()}`}>
        <span className="text-xs">{getStatusIcon()}</span>
        {value}
      </span>
    </div>
  );
};

export default App;