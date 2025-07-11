import { ENV } from '../../lib/constants/env';

interface PermissionDebuggerProps {
  currentUser: any;
  currentPermissions: string[];
}

export const PermissionDebugger = ({ currentUser, currentPermissions }: PermissionDebuggerProps) => {
  if (!ENV.IS_DEV) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
      <div className="text-sm font-medium text-gray-800 mb-2">
        🔍 Permission Debugger
      </div>
      <div className="text-xs space-y-1">
        <div>
          <span className="font-medium">User:</span> {currentUser?.email || 'Not logged in'}
        </div>
        <div>
          <span className="font-medium">Role:</span> {currentUser?.role || 'None'}
        </div>
        <div>
          <span className="font-medium">Permissions:</span>
          {currentPermissions.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-1">
              {currentPermissions.map((perm) => (
                <span key={perm} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                  {perm}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-500"> None</span>
          )}
        </div>
      </div>
    </div>
  );
};