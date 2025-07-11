/**
 * useSupabase Hook - AKBID Lab System
 * Security: Connection validation, error handling
 * Status: Ready for implementation
 */
import { useState, useEffect } from 'react';
import { supabase, checkConnection } from '../lib/supabase/client';
import { ENV } from '../lib/constants/env';

export const useSupabase = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateConnection = async () => {
      try {
        // SECURITY: Validate environment configuration
        if (!ENV.SUPABASE_URL || !ENV.SUPABASE_ANON_KEY) {
          throw new Error('Supabase credentials not configured');
        }

        const connectionStatus = await checkConnection();
        setIsConnected(connectionStatus);
        
        if (!connectionStatus) {
          throw new Error('Unable to connect to Supabase');
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Connection failed');
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateConnection();
  }, []);

  return {
    supabase,
    isConnected,
    isLoading,
    error,
    checkConnection,
  };
};
