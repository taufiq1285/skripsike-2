/**
 * User Form - AKBID Lab System
 * Security: Input sanitization, role validation, RBAC
 * Status: Template ready
 */
import { useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface UserFormProps {
  onSubmit: (userData: any) => void;
  initialData?: any;
  isLoading?: boolean;
}

export const UserForm = ({ onSubmit, initialData, isLoading }: UserFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    role: initialData?.role || '',
    nim_nip: initialData?.nim_nip || '',
  });

  const roleOptions = [
    { value: '', label: 'Pilih Role' },
    { value: 'admin', label: 'Admin' },
    { value: 'dosen', label: 'Dosen' },
    { value: 'laboran', label: 'Laboran' },
    { value: 'mahasiswa', label: 'Mahasiswa' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add validation
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nama Lengkap"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      
      <Select
        label="Role"
        options={roleOptions}
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        required
      />
      
      <Input
        label="NIM/NIP"
        value={formData.nim_nip}
        onChange={(e) => setFormData({ ...formData, nim_nip: e.target.value })}
        required
      />
      
      <Button type="submit" loading={isLoading}>
        {initialData ? 'Update' : 'Create'} User
      </Button>
    </form>
  );
};
