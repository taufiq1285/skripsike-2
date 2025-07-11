/**
 * Supabase Client - AKBID Lab System
 * Security: Secure connection, environment validation
 * Status: Ready for implementation
 */
import { createClient } from '@supabase/supabase-js';
import { ENV } from '../constants/env';

// Initialize with fallback values for development
const supabaseUrl = ENV.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = ENV.SUPABASE_ANON_KEY || 'placeholder-key';

// SECURITY: Validate environment variables in production
if (ENV.IS_PROD && (!ENV.SUPABASE_URL || !ENV.SUPABASE_ANON_KEY)) {
  throw new Error('Supabase credentials are required in production');
}

// Create Supabase client with security options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: ENV.DATABASE_SCHEMA,
  },
  global: {
    headers: {
      'X-Client-Info': 'akbid-lab-system',
    },
  },
});

// SECURITY: Connection health check
export const checkConnection = async (): Promise<boolean> => {
  try {
    // Skip connection check if using placeholder values
    if (supabaseUrl === 'https://placeholder.supabase.co') {
      console.warn('Using placeholder Supabase URL - configure .env.local');
      return false;
    }

    const { error } = await supabase
      .from('health_check')
      .select('*')
      .limit(1);
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = table not found, which is OK
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Supabase connection check failed:', error);
    return false;
  }
};

// Export client instance
export default supabase;