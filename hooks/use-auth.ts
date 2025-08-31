'use client';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { User } from '@/types';

export function useAuth() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    if (session?.user) {
      setUser({
        id: session.user.id || '',
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image,
        createdAt: new Date().toISOString(),
      });
    } else {
      setUser(null);
    }

    setLoading(false);
  }, [session, status]);

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      return { success: !result?.error, error: result?.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // This would be replaced with an actual API call to register the user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Automatically log in after successful registration
        return login(email, password);
      }

      return { success: false, error: data.error || 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
}