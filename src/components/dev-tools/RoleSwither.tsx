/**
 * Enhanced Role Switcher - AKBID Lab System
 * Day 6: Fixed ESLint warnings + TypeScript errors
 * Status: TypeScript compliant
 */

import React, { useState } from 'react';
import { User, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { useDevStore, useTestUsers } from '../../lib/dev/devStore';
import { withDevOnly } from '../../lib/dev/guards';

interface RoleSwitcherProps {
  currentRole?: string;
  onRoleChange?: (role: string) => void;
  className?: string;
}

type UserRole = 'admin' | 'dosen' | 'laboran' | 'mahasiswa' | 'dev_super';

interface RoleConfig {
  key: UserRole;
  label: string;
  icon: string;
  color: string;
  email: string;
}

const RoleSwitcherComponent: React.FC<RoleSwitcherProps> = ({ 
  currentRole, 
  onRoleChange,
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [switching, setSwitching] = useState(false);
  const devStore = useDevStore();
  const { current, setUser, canSwitchRole } = useTestUsers();

  const roles: RoleConfig[] = [
    { 
      key: 'dev_super', 
      label: 'Dev Super', 
      icon: '🔧', 
      color: 'purple',
      email: 'dev@akbid.test'
    },
    { 
      key: 'admin', 
      label: 'Admin', 
      icon: '👑', 
      color: 'blue',
      email: 'admin@akbid.test'
    },
    { 
      key: 'dosen', 
      label: 'Dosen', 
      icon: '👨‍🏫', 
      color: 'green',
      email: 'dosen@akbid.test'
    },
    { 
      key: 'laboran', 
      label: 'Laboran', 
      icon: '🔬', 
      color: 'orange',
      email: 'laboran@akbid.test'
    },
    { 
      key: 'mahasiswa', 
      label: 'Mahasiswa', 
      icon: '🎓', 
      color: 'indigo',
      email: 'mahasiswa@akbid.test'
    }
  ];

  const handleRoleSwitch = async (role: RoleConfig) => {
    if (!canSwitchRole) {
      alert('⚠️ Role switch limit reached!');
      return;
    }

    setSwitching(true);
    
    try {
      // Switch user in dev store
      setUser(role.email);
      
      // Switch role
      devStore.switchRole(role.key);
      
      // Call external handler if provided
      if (onRoleChange) {
        onRoleChange(role.key);
      }
      
      // Log the switch
      console.log(`🔄 [ROLE SWITCH] ${role.icon} ${role.label} (${role.email})`);
      
      // Show success feedback
      setTimeout(() => {
        alert(`✅ Switched to ${role.label} role!`);
      }, 500);
      
    } catch (error) {
      console.error('❌ Role switch failed:', error);
      alert('❌ Role switch failed!');
    } finally {
      setSwitching(false);
    }
  };

  const getColorClasses = (color: string, isActive: boolean = false) => {
    const colors = {
      purple: isActive ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      blue: isActive ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      green: isActive ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200',
      orange: isActive ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-800 hover:bg-orange-200',
      indigo: isActive ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getCurrentRole = () => {
    return currentRole || (current ? current.split('@')[0] : 'none');
  };

  const sessionInfo = devStore.getSessionInfo();

  return (
    <div className={`bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <User size={16} className="text-yellow-700" />
          <span className="text-sm font-medium text-yellow-800">
            🔄 Role Switcher
          </span>
          <span className="text-xs bg-yellow-200 text-yellow-700 px-1 rounded">
            Day 6
          </span>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-yellow-600 hover:text-yellow-800"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {/* Current Status */}
      <div className="bg-yellow-100 rounded p-2 mb-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-yellow-700">Current:</span>
          <span className="font-mono text-yellow-800">
            {current || 'No user selected'}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-yellow-700">Switches:</span>
          <span className="font-mono text-yellow-800">
            {String(sessionInfo.roleSwitches)} / {String((sessionInfo.limits as Record<string, unknown>)?.maxRoleSwitches || 'N/A')}
          </span>
        </div>
        {!canSwitchRole && (
          <div className="flex items-center gap-1 mt-1 text-red-600">
            <AlertTriangle size={12} />
            <span className="text-xs">Limit reached!</span>
          </div>
        )}
      </div>

      {/* Quick Switch Buttons */}
      {!isExpanded ? (
        <div className="grid grid-cols-3 gap-1">
          {roles.slice(0, 3).map((role) => {
            const isActive = getCurrentRole() === role.key;
            return (
              <button
                key={role.key}
                onClick={() => handleRoleSwitch(role)}
                disabled={switching || !canSwitchRole}
                className={`px-2 py-1 text-xs rounded transition-colors flex items-center justify-center gap-1 ${
                  getColorClasses(role.color, isActive)
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span>{role.icon}</span>
                <span className="hidden sm:inline">{role.label}</span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Expanded View */
        <div className="space-y-2">
          {roles.map((role) => {
            const isActive = getCurrentRole() === role.key;
            return (
              <div key={role.key} className="flex items-center gap-2">
                <button
                  onClick={() => handleRoleSwitch(role)}
                  disabled={switching || !canSwitchRole}
                  className={`flex-1 px-3 py-2 text-sm rounded transition-colors flex items-center gap-2 ${
                    getColorClasses(role.color, isActive)
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <span>{role.icon}</span>
                  <span className="flex-1 text-left">{role.label}</span>
                  {isActive && <CheckCircle size={14} />}
                  {switching && <RefreshCw size={14} className="animate-spin" />}
                </button>
                
                <div className="text-xs text-yellow-600 font-mono">
                  {role.email.split('@')[0]}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 pt-2 border-t border-yellow-300 flex gap-2">
        <button
          onClick={() => devStore.resetSession()}
          className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs hover:bg-orange-200"
        >
          Reset Session
        </button>
        
        <button
          onClick={() => {
            console.log('🔄 Role Switcher State:', {
              current,
              canSwitch: canSwitchRole,
              sessionInfo
            });
          }}
          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200"
        >
          Log State
        </button>
      </div>

      {/* Development Note */}
      <div className="mt-2 text-xs text-yellow-600 italic">
        💡 Development only - switches test user context
      </div>
    </div>
  );
};

export const RoleSwitcher = withDevOnly(RoleSwitcherComponent);