import { useState } from 'react';
import { ENV } from '../../lib/constants/env';

interface QuickLoginProps {
  onLogin: (email: string, password: string) => void;
}

export const QuickLogin = ({ onLogin }: QuickLoginProps) => {
  const [selectedUser, setSelectedUser] = useState('');

  if (!ENV.IS_DEV || !ENV.DEV_QUICK_LOGIN) return null;

  const testUsers = [
    { role: 'admin', email: 'admin@akbid.ac.id', password: 'admin123', name: 'Admin System' },
    { role: 'dosen', email: 'dosen@akbid.ac.id', password: 'dosen123', name: 'Dr. Siti Nurhaliza' },
    { role: 'laboran', email: 'laboran@akbid.ac.id', password: 'laboran123', name: 'Ahmad Kurniawan' },
    { role: 'mahasiswa', email: 'mahasiswa@akbid.ac.id', password: 'mahasiswa123', name: 'Aisyah Putri' },
  ];

  const handleQuickLogin = (user: typeof testUsers[0]) => {
    setSelectedUser(user.email);
    onLogin(user.email, user.password);
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <div className="text-sm font-medium text-yellow-800 mb-2">
        🚀 Quick Login (Development Only)
      </div>
      <div className="grid grid-cols-2 gap-2">
        {testUsers.map((user) => (
          <button
            key={user.email}
            onClick={() => handleQuickLogin(user)}
            disabled={selectedUser === user.email}
            className={`p-2 text-xs rounded border transition-colors ${
              selectedUser === user.email
                ? 'bg-yellow-200 border-yellow-300 text-yellow-800'
                : 'bg-white border-yellow-300 text-yellow-700 hover:bg-yellow-100'
            }`}
          >
            <div className="font-medium">{user.role.toUpperCase()}</div>
            <div className="text-xs opacity-75">{user.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
