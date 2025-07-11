/**
 * Role Switcher - AKBID Lab System (Development Only)
 * Security: DEV_MODE check required, production safety
 * Status: Development tool ready
 */
import { ENV } from '../../lib/constants/env';

interface RoleSwitcherProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
}

export const RoleSwitter = ({ currentRole, onRoleChange }: RoleSwitcherProps) => {
  // SECURITY: Only show in development mode
  if (!ENV.DEV_MODE) return null;

  const roles = ['admin', 'dosen', 'laboran', 'mahasiswa'];

  return (
    <div className="fixed top-4 left-4 z-50 bg-yellow-100 border border-yellow-300 rounded-lg p-3">
      <div className="text-sm font-medium text-yellow-800 mb-2">
        í´„ Dev Role Switcher
      </div>
      <div className="flex gap-2">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => onRoleChange(role)}
            className={`px-2 py-1 text-xs rounded ${
              currentRole === role
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-yellow-800 hover:bg-yellow-200'
            }`}
          >
            {role.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};
