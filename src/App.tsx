// src/App.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ENV, validateEnv, getEnvInfo } from './lib/constants/env';
import { DevIndicators, DevToolbar, DevInfo } from './components/dev-tools';
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
          {/* Development Tools - Only shown in development */}
          {ENV.IS_DEV && (
            <>
              <DevIndicators />
              <DevInfo />
              <DevToolbar />
            </>
          )}
          
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

  // Fixed functions
  const handleGoToLogin = () => {
    // For now, show alert since no routing yet
    alert('Login page belum dibuat. Ini akan redirect ke /login setelah routing setup.');
    console.log('🔗 Navigate to: /login');
  };

  const handleShowEnvironmentInfo = () => {
    console.log('🌍 ENVIRONMENT INFO:');
    console.table(envInfo);
    console.log('📊 Full ENV Object:', ENV);
    
    // Also show visual feedback
    alert(`Environment Info logged to console!\n\nEnvironment: ${envInfo.environment}\nVersion: ${envInfo.version}\nDev Mode: ${envInfo.isDev}`);
  };

  const handleShowBrowserInfo = () => {
    const browserInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      hardwareConcurrency: navigator.hardwareConcurrency,
      maxTouchPoints: navigator.maxTouchPoints,
      vendor: navigator.vendor,
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      // Screen info
      screenWidth: screen.width,
      screenHeight: screen.height,
      colorDepth: screen.colorDepth,
      // Window info
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      // Location info
      href: window.location.href,
      protocol: window.location.protocol,
      host: window.location.host,
    };

    console.log('🌐 BROWSER INFO:');
    console.table(browserInfo);
    console.log('📱 Navigator Object:', navigator);
    console.log('🖥️ Screen Object:', screen);
    console.log('🪟 Window Object Details:', {
      location: window.location,
      history: window.history.length,
      localStorage: !!window.localStorage,
      sessionStorage: !!window.sessionStorage,
    });
    
    // Visual feedback
    alert(`Browser Info logged to console!\n\nBrowser: ${navigator.appName}\nPlatform: ${navigator.platform}\nLanguage: ${navigator.language}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
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
          <Badge variant={envValidated ? "success" : "error"}>
            {envValidated ? "ENV ✓" : "ENV ✗"}
          </Badge>
          <Badge variant={envInfo.supabaseConfigured ? "success" : "warning"}>
            {envInfo.supabaseConfigured ? "DB ✓" : "DB ⚠️"}
          </Badge>
          {ENV.IS_DEV && (
            <Badge variant="info">
              DEV MODE
            </Badge>
          )}
        </div>
      </div>

      {/* Development Notice */}
      {ENV.IS_DEV && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2 text-yellow-800 mb-2">
            <span className="text-lg">⚡</span>
            <span className="font-semibold">Development Mode Active</span>
          </div>
          <p className="text-yellow-700 text-sm">
            Development tools are available. Check the bottom-right corner for the dev toolbar 
            and top-left for detailed debugging information.
          </p>
          {ENV.DEV_TOOLBAR && (
            <div className="mt-2 text-xs text-yellow-600">
              🛠️ Dev Toolbar: Enabled | 
              🔄 Role Switch: {ENV.DEV_ROLE_SWITCH ? 'Enabled' : 'Disabled'} | 
              🚀 Quick Login: {ENV.DEV_QUICK_LOGIN ? 'Enabled' : 'Disabled'}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* System Status */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Application</span>
              <Badge variant="success">Running</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Environment</span>
              <Badge variant={envInfo.isDev ? "warning" : "success"}>
                {envInfo.environment}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <Badge variant={envInfo.supabaseConfigured ? "success" : "error"}>
                {envInfo.supabaseConfigured ? "Connected" : "Not Configured"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">PWA</span>
              <Badge variant={envInfo.pwaEnabled ? "success" : "secondary"}>
                {envInfo.pwaEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Version</span>
              <span className="font-mono text-sm">{envInfo.version}</span>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button 
              onClick={handleGoToLogin}
              className="w-full"
            >
              Go to Login
            </Button>
            
            {ENV.IS_DEV && (
              <>
                <Button 
                  variant="outline"
                  onClick={handleShowEnvironmentInfo}
                  className="w-full"
                >
                  Show Environment Info
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handleShowBrowserInfo}
                  className="w-full"
                >
                  Show Browser Info
                </Button>
              </>
            )}
            
            <Button 
              variant="outline"
              onClick={() => {
                console.log('🔄 Reloading application...');
                window.location.reload();
              }}
              className="w-full"
            >
              Reload Application
            </Button>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>
          Built with React + TypeScript + Vite + Supabase
        </p>
        <p className="mt-1">
          © 2024 AKBID Lab System - Version {envInfo.version}
        </p>
        {ENV.IS_DEV && (
          <p className="mt-1 text-yellow-600">
            🔧 Development build - {envInfo.timestamp}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;