/**
 * Supabase Database - AKBID Lab System
 * Security: Secure database operations, data validation
 * Status: Template ready for implementation
 */
import { supabase } from './client';
import type { Database } from '../../types/supabase';

export const database = {
  // Generic query builder
  from: <T extends keyof Database['public']['Tables']>(table: T) => {
    return supabase.from(table);
  },

  // Users operations
  users: {
    getAll: () => supabase.from('users').select('*'),
    getById: (id: string) => supabase.from('users').select('*').eq('id', id).single(),
    create: (data: Database['public']['Tables']['users']['Insert']) => 
      supabase.from('users').insert(data),
    update: (id: string, data: Database['public']['Tables']['users']['Update']) => 
      supabase.from('users').update(data).eq('id', id),
    delete: (id: string) => supabase.from('users').delete().eq('id', id),
  },

  // Lab rooms operations
  labRooms: {
    getAll: () => supabase.from('lab_rooms').select('*'),
    getById: (id: string) => supabase.from('lab_rooms').select('*').eq('id', id).single(),
    create: (data: Database['public']['Tables']['lab_rooms']['Insert']) => 
      supabase.from('lab_rooms').insert(data),
    update: (id: string, data: Database['public']['Tables']['lab_rooms']['Update']) => 
      supabase.from('lab_rooms').update(data).eq('id', id),
  },

  // Mata kuliah operations
  mataKuliah: {
    getAll: () => supabase.from('mata_kuliah').select('*'),
    getById: (id: string) => supabase.from('mata_kuliah').select('*').eq('id', id).single(),
    create: (data: Database['public']['Tables']['mata_kuliah']['Insert']) => 
      supabase.from('mata_kuliah').insert(data),
    update: (id: string, data: Database['public']['Tables']['mata_kuliah']['Update']) => 
      supabase.from('mata_kuliah').update(data).eq('id', id),
  },

  // TODO: Add more table operations as needed
};

export default database;
