import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in a .env file locally
// or in your Vercel/Netlify dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fallback to null if keys aren't present (prevents crash during development)
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Helper to check if backend is connected
 */
export const isBackendConnected = () => !!supabase;
