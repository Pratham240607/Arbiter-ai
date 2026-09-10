"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => {},
  });

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    /* =========================
       GET CURRENT SESSION
    ========================= */

    const loadSession = async () => {
      const {
        data,
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error(
          "Session error:",
          error
        );
      }

      if (mounted) {
        setUser(
          data.session?.user ?? null
        );

        setLoading(false);
      }
    };

    loadSession();


    /* =========================
       LISTEN FOR AUTH CHANGES
    ========================= */

    const {
      data: {
        subscription,
      },
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (mounted) {
            setUser(
              session?.user ?? null
            );

            setLoading(false);
          }
        }
      );


    return () => {
      mounted = false;
      subscription.unsubscribe();
    };

  }, []);


  /* =========================
     SIGN OUT
  ========================= */

  const signOut = async () => {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        "Logout error:",
        error
      );

      return;
    }

    setUser(null);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth =
  () => useContext(AuthContext);