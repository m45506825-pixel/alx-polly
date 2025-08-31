'use client';

// This file now re-exports the useAuth hook from the AuthContext
// to maintain backward compatibility with existing code
import { useAuth as useSupabaseAuth } from '@/contexts/auth-context';

// Re-export the useAuth hook from the AuthContext
export const useAuth = useSupabaseAuth;