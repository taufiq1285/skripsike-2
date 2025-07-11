/**
 * Common Types - AKBID Lab System
 * Security: Type safety for common operations
 * Status: Complete
 */

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface Timestamps {
  created_at: string;
  updated_at: string;
}

export interface SoftDelete {
  deleted_at?: string;
  is_deleted: boolean;
}

export interface UserAudit {
  created_by: string;
  updated_by?: string;
  deleted_by?: string;
}

export interface StatusEntity {
  status: 'active' | 'inactive' | 'archived';
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file' | 'date';
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  validation?: any;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    handler: () => void;
  };
}

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  url?: string;
}

export interface Address {
  street?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  country?: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  emergency_contact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}
