import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

// Auth state cleanup utility to prevent limbo states
export const cleanupAuthState = () => {
  console.log('Cleaning up auth state...');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-') || key.startsWith('supabase-auth-')) {
      localStorage.removeItem(key);
      console.log('Removed localStorage key:', key);
    }
  });
  
  // Remove from sessionStorage if in use
  if (typeof sessionStorage !== 'undefined') {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-') || key.startsWith('supabase-auth-')) {
        sessionStorage.removeItem(key);
        console.log('Removed sessionStorage key:', key);
      }
    });
  }
  
  // Remove impersonation data
  localStorage.removeItem('impersonating_user');
  localStorage.removeItem('impersonating_client');
};

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  isImpersonating: boolean;
  originalProfile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  stopImpersonating: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [originalProfile, setOriginalProfile] = useState<Profile | null>(null);

  console.log('Auth state:', { user: !!user, profile: !!profile, session: !!session, loading, isImpersonating });

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      
      // Check for impersonation first
      const impersonatingData = localStorage.getItem('impersonating_user');
      
      if (impersonatingData) {
        const impersonatedUser = JSON.parse(impersonatingData);
        
        // Fetch the current user's actual profile (admin)
        const { data: adminProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();
        
        // Only allow impersonation if the current user is an admin
        if (adminProfile?.role === 'admin') {
          setOriginalProfile(adminProfile);
          setIsImpersonating(true);
          return impersonatedUser;
        } else {
          // Clear impersonation if user is not admin
          localStorage.removeItem('impersonating_user');
          setIsImpersonating(false);
        }
      }

      // Fetch normal profile
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return null;
      }

      console.log('Profile fetched:', data);
      setIsImpersonating(false);
      setOriginalProfile(null);
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        if (!mounted) return;
        
        console.log('Initial session:', !!session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const profileData = await fetchProfile(session.user.id);
          if (mounted) {
            setProfile(profileData);
          }
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        if (mounted) {
          console.log('Setting loading to false');
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, !!session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to prevent potential deadlocks
          setTimeout(async () => {
            if (mounted) {
              const profileData = await fetchProfile(session.user.id);
              if (mounted) {
                setProfile(profileData);
              }
            }
          }, 0);
          
          // Update last login on sign in
          if (event === 'SIGNED_IN') {
            setTimeout(async () => {
              try {
                await supabase
                  .from('profiles')
                  .update({ last_login: new Date().toISOString() })
                  .eq('id', session.user.id);
              } catch (error) {
                console.error('Error updating last login:', error);
              }
            }, 0);
          }
        } else {
          setProfile(null);
          // Clear impersonation on logout
          localStorage.removeItem('impersonating_user');
          setIsImpersonating(false);
          setOriginalProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      console.log('Cleaning up auth provider');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/portal`
      },
    });

    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Starting sign in process...');
      
      // Clean up existing state first
      cleanupAuthState();
      
      // Attempt global sign out to clear any existing sessions
      try {
        await supabase.auth.signOut({ scope: 'global' });
        console.log('Cleared existing sessions');
      } catch (err) {
        console.log('No existing session to clear:', err);
      }
      
      // Wait a moment for cleanup
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        console.log('Sign in successful, redirecting...');
        // Force page reload for clean state
        setTimeout(() => {
          window.location.href = '/portal';
        }, 100);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('Starting sign out process...');
      
      // Clean up auth state first
      cleanupAuthState();
      
      // Clear impersonation states
      setIsImpersonating(false);
      setOriginalProfile(null);
      
      // Attempt global sign out (ignore errors)
      try {
        await supabase.auth.signOut({ scope: 'global' });
        console.log('Global sign out successful');
      } catch (err) {
        console.log('Global sign out failed, continuing with cleanup:', err);
      }
      
      // Force page reload to ensure clean state
      console.log('Redirecting to portal page...');
      window.location.href = '/portal';
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if sign out fails, clean up and redirect
      cleanupAuthState();
      window.location.href = '/portal';
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) throw error;

    // Refresh profile data
    const updatedProfile = await fetchProfile(user.id);
    setProfile(updatedProfile);
  };

  const stopImpersonating = () => {
    localStorage.removeItem('impersonating_user');
    setIsImpersonating(false);
    if (originalProfile) {
      setProfile(originalProfile);
      setOriginalProfile(null);
    }
    // Force a refresh to reload with admin view
    window.location.reload();
  };

  const value = {
    user,
    profile,
    session,
    loading,
    isImpersonating,
    originalProfile,
    signIn,
    signUp,
    signOut,
    updateProfile,
    stopImpersonating,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};