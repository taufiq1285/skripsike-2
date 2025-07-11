/**
 * Supabase Types - AKBID Lab System
 * Security: Type safety for Supabase operations
 * Status: Complete
 */

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'dosen' | 'laboran' | 'mahasiswa';
          nim_nip?: string;
          phone?: string;
          avatar_url?: string;
          bio?: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          email: string;
          name: string;
          role: 'admin' | 'dosen' | 'laboran' | 'mahasiswa';
          nim_nip?: string;
          phone?: string;
          avatar_url?: string;
          bio?: string;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          nim_nip?: string;
          phone?: string;
          avatar_url?: string;
          bio?: string;
          is_active?: boolean;
        };
      };
      lab_rooms: {
        Row: {
          id: string;
          name: string;
          code: string;
          description: string;
          capacity: number;
          location: string;
          status: 'active' | 'maintenance' | 'inactive';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          code: string;
          description: string;
          capacity: number;
          location: string;
          status?: 'active' | 'maintenance' | 'inactive';
        };
        Update: {
          name?: string;
          code?: string;
          description?: string;
          capacity?: number;
          location?: string;
          status?: 'active' | 'maintenance' | 'inactive';
        };
      };
      mata_kuliah: {
        Row: {
          id: string;
          kode: string;
          nama: string;
          sks: number;
          semester: number;
          deskripsi?: string;
          status: 'active' | 'inactive';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          kode: string;
          nama: string;
          sks: number;
          semester: number;
          deskripsi?: string;
          status?: 'active' | 'inactive';
        };
        Update: {
          kode?: string;
          nama?: string;
          sks?: number;
          semester?: number;
          deskripsi?: string;
          status?: 'active' | 'inactive';
        };
      };
      // Add more table definitions as needed...
    };
    Views: {
      // View definitions will be added here when needed
      [key: string]: never;
    };
    Functions: {
      // Function definitions will be added here when needed
      [key: string]: never;
    };
    Enums: {
      user_role: 'admin' | 'dosen' | 'laboran' | 'mahasiswa';
      status: 'active' | 'inactive' | 'maintenance' | 'archived';
      condition: 'baik' | 'rusak' | 'maintenance' | 'hilang';
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Inserts<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updates<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

export interface SupabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

export interface SupabaseResponse<T> {
  data: T | null;
  error: SupabaseError | null;
  count?: number;
  status: number;
  statusText: string;
}

export interface RealtimePayload<T = Record<string, unknown>> {
  schema: string;
  table: string;
  commit_timestamp: string;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: T;
  old: T;
  errors?: string[];
}

export interface StorageFileApi {
  upload: (path: string, file: File) => Promise<{ data: { path: string } | null; error: SupabaseError | null }>;
  download: (path: string) => Promise<{ data: Blob | null; error: SupabaseError | null }>;
  remove: (paths: string[]) => Promise<{ data: Record<string, unknown> | null; error: SupabaseError | null }>;
  list: (path?: string) => Promise<{ data: Record<string, unknown>[] | null; error: SupabaseError | null }>;
}