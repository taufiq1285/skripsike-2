import { ENV } from '../../lib/constants/env';

interface RoleSwitherProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
}

export const RoleSwitcher = ({ currentRole, onRoleChange }: RoleSwitherProps) => {
  if (!ENV.IS_DEV || !ENV.DEV_ROLE_SWITCH) return null;

  const roles = ['admin', 'dosen', 'laboran', 'mahasiswa'];

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mb-4">
      <div className="text-sm font-medium text-indigo-800 mb-2">
        🔄 Role Switcher (Development Only)
      </div>
      <div className="flex gap-2">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => onRoleChange(role)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              currentRole === role
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-indigo-300 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            {role.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};
