/**
 * Supabase Realtime - AKBID Lab System
 * Security: Secure real-time subscriptions, access validation
 * Status: Template ready for implementation
 */
import { supabase } from './client';
import type { RealtimePayload } from '../../types/supabase';

export const realtime = {
  // Subscribe to table changes
  subscribe: <T = any>(
    table: string,
    callback: (payload: RealtimePayload<T>) => void,
    filter?: string
  ) => {
    const channel = supabase
      .channel(`public:${table}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
          filter: filter,
        },
        callback
      )
      .subscribe();

    return channel;
  },

  // Subscribe to specific events
  subscribeToInserts: <T = any>(
    table: string,
    callback: (payload: RealtimePayload<T>) => void
  ) => {
    return supabase
      .channel(`public:${table}:insert`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: table,
        },
        callback
      )
      .subscribe();
  },

  subscribeToUpdates: <T = any>(
    table: string,
    callback: (payload: RealtimePayload<T>) => void
  ) => {
    return supabase
      .channel(`public:${table}:update`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: table,
        },
        callback
      )
      .subscribe();
  },

  subscribeToDeletes: <T = any>(
    table: string,
    callback: (payload: RealtimePayload<T>) => void
  ) => {
    return supabase
      .channel(`public:${table}:delete`)
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: table,
        },
        callback
      )
      .subscribe();
  },

  // Unsubscribe from channel
  unsubscribe: (channel: any) => {
    return supabase.removeChannel(channel);
  },
};

export default realtime;
