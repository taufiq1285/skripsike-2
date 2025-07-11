/**
 * Enhanced Quick Login - AKBID Lab System
 * Day 6: Emergency login/logout with enhanced features - TypeScript compliant
 * Features: Quick test user login, emergency logout, session management
 */

import React, { useState } from 'react';
import { 
  LogIn, 
  LogOut, 
  User, 
  Key, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react';
import { ENV } from '../../lib/constants/env';
import { useDevStore, useTestUsers } from '../../lib/dev/devStore';
import { withDevOnly } from '../../lib/dev/guards';

interface QuickLoginProps {
  onLogin?: (email: string, role: string) => Promise<void>;
  onLogout?: () => Promise<void>;
  currentUser?: Record<string, unknown>;
  className?: string;
}

const QuickLoginComponent: React.FC<QuickLoginProps> = ({
  onLogin,
  onLogout,
  currentUser,
  className
}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showEmergencyOptions, setShowEmergencyOptions] = useState(false);
  
  const devStore = useDevStore();
  const { setUser } = useTestUsers();

  const testUsers = [
    {
      email: 'dev@akbid.test',
      role: 'dev_super',
      name: 'Developer Super',
      icon: '🔧',
      color: 'purple',
      password: 'dev123'
    },
    {
      email: 'admin@akbid.test',
      role: 'admin',
      name: 'Admin Test',
      icon: '👑',
      color: 'blue',
      password: 'admin123'
    },
    {
      email: 'dosen@akbid.test',
      role: 'dosen',
      name: 'Dr. Dosen Test',
      icon: '👨‍🏫',
      color: 'green',
      password: 'dosen123'
    },
    {
      email: 'laboran@akbid.test',
      role: 'laboran',
      name: 'Laboran Test',
      icon: '🔬',
      color: 'orange',
      password: 'laboran123'
    },
    {
      email: 'mahasiswa@akbid.test',
      role: 'mahasiswa',
      name: 'Mahasiswa Test',
      icon: '🎓',
      color: 'indigo',
      password: 'mahasiswa123'
    }
  ];

  const handleQuickLogin = async (user: typeof testUsers[0]) => {
    if (!ENV.DEV_QUICK_LOGIN) {
      alert('⚠️ Quick login is disabled');
      return;
    }

    setIsLoggingIn(true);
    
    try {
      console.log(`🚀 [QUICK LOGIN] Logging in as ${user.name} (${user.email})`);
      
      // Set user in dev store
      setUser(user.email);
      devStore.switchRole(user.role as 'admin' | 'dosen' | 'laboran' | 'mahasiswa' | 'dev_super');
      
      // Call external login handler if provided
      if (onLogin) {
        await onLogin(user.email, user.role);
      }
      
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`✅ [QUICK LOGIN] Successfully logged in as ${user.name}`);
      alert(`✅ Logged in as ${user.name}!`);
      
    } catch (error) {
      console.error('❌ Quick login failed:', error);
      alert('❌ Login failed!');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleQuickLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      console.log('🚪 [QUICK LOGOUT] Logging out...');
      
      // Reset dev store
      devStore.resetSession();
      
      // Call external logout handler if provided
      if (onLogout) {
        await onLogout();
      }
      
      // Simulate logout delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('✅ [QUICK LOGOUT] Successfully logged out');
      alert('✅ Logged out successfully!');
      
    } catch (error) {
      console.error('❌ Quick logout failed:', error);
      alert('❌ Logout failed!');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleEmergencyLogout = async () => {
    if (!confirm('🚨 Emergency logout? This will clear ALL auth data and reload the page.')) {
      return;
    }
    
    try {
      console.log('🚨 [EMERGENCY LOGOUT] Clearing all auth data...');
      
      // Clear all possible auth storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear cookies
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      });
      
      // Reset dev store
      devStore.resetSession();
      
      console.log('✅ [EMERGENCY LOGOUT] All auth data cleared');
      
      // Hard reload
      window.location.reload();
      
    } catch (error) {
      console.error('❌ Emergency logout failed:', error);
      alert('❌ Emergency logout failed!');
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-300',
      blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300',
      green: 'bg-green-100 text-green-800 hover:bg-green-200 border-green-300',
      orange: 'bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-300',
      indigo: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-300',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const sessionInfo = devStore.getSessionInfo();

  return (
    <div className={`bg-green-50 border-2 border-green-300 rounded-lg p-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <LogIn size={16} className="text-green-700" />
          <span className="text-sm font-medium text-green-800">
            ⚡ Quick Login
          </span>
          <span className="text-xs bg-green-200 text-green-700 px-1 rounded">
            Day 6
          </span>
        </div>
        
        {ENV.DEV_QUICK_LOGIN ? (
          <CheckCircle size={14} className="text-green-600" />
        ) : (
          <AlertTriangle size={14} className="text-red-600" />
        )}
      </div>

      {/* Current Status */}
      {currentUser && (
        <div className="bg-green-100 rounded p-2 mb-3 text-sm">
          <div className="flex items-center gap-2">
            <User size={14} className="text-green-700" />
            <span className="text-green-700">Logged in as:</span>
            <span className="font-mono text-green-800">{String(currentUser.email)}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Shield size={14} className="text-green-700" />
            <span className="text-green-700">Role:</span>
            <span className="font-mono text-green-800">{String(currentUser.role)}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Clock size={14} className="text-green-700" />
            <span className="text-green-700">Session:</span>
            <span className="font-mono text-green-800">{String(sessionInfo.sessionDurationFormatted)}</span>
          </div>
        </div>
      )}

      {/* Quick Login Buttons */}
      {!currentUser && ENV.DEV_QUICK_LOGIN && (
        <div className="space-y-2 mb-3">
          <div className="text-xs text-green-700 mb-2">
            🚀 Select test user to login:
          </div>
          
          {testUsers.map((user) => (
            <button
              key={user.email}
              onClick={() => handleQuickLogin(user)}
              disabled={isLoggingIn}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded border transition-colors ${
                getColorClasses(user.color)
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="text-lg">{user.icon}</span>
              <div className="flex-1 text-left">
                <div className="font-medium">{user.name}</div>
                <div className="text-xs opacity-75">{user.email}</div>
              </div>
              <div className="text-xs font-mono bg-white bg-opacity-50 px-1 rounded">
                {user.password}
              </div>
              {isLoggingIn && <div className="animate-spin">⏳</div>}
            </button>
          ))}
        </div>
      )}

      {/* Logout Options */}
      {currentUser && (
        <div className="space-y-2 mb-3">
          <button
            onClick={handleQuickLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-orange-100 text-orange-800 rounded hover:bg-orange-200 disabled:opacity-50"
          >
            <LogOut size={14} />
            <span>Quick Logout</span>
            {isLoggingOut && <div className="animate-spin">⏳</div>}
          </button>
        </div>
      )}

      {/* Emergency Options */}
      <div className="border-t border-green-300 pt-3">
        <button
          onClick={() => setShowEmergencyOptions(!showEmergencyOptions)}
          className="w-full flex items-center justify-center gap-2 px-2 py-1 text-xs text-green-700 hover:bg-green-100 rounded"
        >
          <AlertTriangle size={12} />
          <span>Emergency Options</span>
          <span>{showEmergencyOptions ? '−' : '+'}</span>
        </button>

        {showEmergencyOptions && (
          <div className="mt-2 space-y-1">
            <button
              onClick={handleEmergencyLogout}
              className="w-full flex items-center justify-center gap-2 px-2 py-1 bg-red-100 text-red-800 rounded text-xs hover:bg-red-200"
            >
              <AlertTriangle size={12} />
              <span>Emergency Logout</span>
            </button>
            
            <button
              onClick={() => {
                console.log('🔐 Auth State:', {
                  currentUser,
                  sessionInfo,
                  localStorage: Object.keys(localStorage),
                  sessionStorage: Object.keys(sessionStorage)
                });
              }}
              className="w-full flex items-center justify-center gap-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200"
            >
              <Key size={12} />
              <span>Log Auth State</span>
            </button>
          </div>
        )}
      </div>

      {/* Development Note */}
      <div className="mt-3 text-xs text-green-600 italic">
        💡 Development only - bypasses normal auth flow
      </div>
    </div>
  );
};

export const QuickLogin = withDevOnly(QuickLoginComponent);