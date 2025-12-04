'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client'; // Your Supabase client instance
import { SignInWithPasswordlessCredentials, Session, AuthOtpResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface AuthContextValue {
  session: Session;
  loading: boolean;
  signIn: (credentials: SignInWithPasswordlessCredentials) => Promise<AuthOtpResponse>;
  signOut: () => void;
}

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();
  
  useEffect(() => {
    debugger

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextValue = {
    session,
    loading,
    signOut: () => {
      supabase.auth.signOut();
      router.push('/login');
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};