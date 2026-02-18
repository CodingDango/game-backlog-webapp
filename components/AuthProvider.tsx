"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { createClient } from "@/lib/supabase/client"; // Your Supabase client instance
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import PageSpinner from "./PageSpinner";

interface Props {
  children: ReactNode;
}

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType | never => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be wrapped inside an AuthProvider');
  }

  return context;
};

export const AuthProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setIsLoading(false);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setIsLoading(false);

        if (_event === "SIGNED_OUT") {
          router.refresh();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, router]);

  const value: AuthContextType = {
    session,
    isLoading,
    logOut: async () => {
      await supabase.auth.signOut();
      router.push("/login");
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <PageSpinner /> : children}
    </AuthContext.Provider>
  );
};

