"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  profile: { full_name: string; email: string; is_admin: boolean } | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAdmin: false,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AuthContextType["profile"]>(null);
  const [loading, setLoading] = useState(true);

  const buildProfile = (u: User) => {
    // Check user_metadata first (set via Admin API), then fall back to customers table
    const meta = u.user_metadata;
    if (meta?.is_admin !== undefined) {
      setProfile({
        full_name: meta.full_name ?? u.email?.split("@")[0] ?? "",
        email: u.email ?? "",
        is_admin: !!meta.is_admin,
      });
      return;
    }
    // Fall back to customers table if metadata doesn't have admin flag
    supabase
      .from("customers")
      .select("full_name, email, is_admin")
      .eq("id", u.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setProfile(data);
        } else {
          setProfile({
            full_name: u.email?.split("@")[0] ?? "",
            email: u.email ?? "",
            is_admin: false,
          });
        }
      });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) buildProfile(u);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        buildProfile(u);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin: profile?.is_admin ?? false,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
