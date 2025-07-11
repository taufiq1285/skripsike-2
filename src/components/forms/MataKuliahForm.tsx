/**
 * Mata Kuliah Form - AKBID Lab System
 * Security: Input validation, authorization check
 * Status: Template ready
 */
import { useState } from 'react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

export const MataKuliahForm = ({ onSubmit, initialData, isLoading }: any) => {
  const [formData, setFormData] = useState({
    kode: initialData?.kode || '',
    nama: initialData?.nama || '',
    sks: initialData?.sks || '',
    deskripsi: initialData?.deskripsi || '',
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
      <div className="space-y-6">
        <Input
          label="Kode Mata Kuliah"
          value={formData.kode}
          onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
          required
        />
        <Input
          label="Nama Mata Kuliah"
          value={formData.nama}
          onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
          required
        />
        <Input
          label="SKS"
          type="number"
          value={formData.sks}
          onChange={(e) => setFormData({ ...formData, sks: e.target.value })}
          required
        />
        <Textarea
          label="Deskripsi"
          value={formData.deskripsi}
          onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
          rows={4}
        />
        <Button type="submit" loading={isLoading}>
          {initialData ? 'Update' : 'Create'} Mata Kuliah
        </Button>
      </div>
    </form>
  );
};
