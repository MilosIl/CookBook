import { SignupFormData } from '@/components/SingupForm/SignupForm';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

type DatabaseUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phoneNumber: string;
};
type SignUpForm = Omit<SignupFormData, 'confirmPassword'>;
type AuthState = {
  session: Session | null;
  user: User | null;
  dbUser: DatabaseUser | null;
  isLoading: boolean;
  error: string | null;
};

type AuthActions = {
  login: (email: string, password: string) => Promise<void>;
  signup: ({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
  }: SignUpForm) => Promise<{ error: string | undefined }>;
  logout: () => Promise<void>;
  fetchDbUser: () => Promise<void>;
  updateDbUser: (
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) => Promise<void>;
  checkSession: () => Promise<void>;
  clearError: () => void;
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  session: null,
  user: null,
  dbUser: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      set({
        session: data.session,
        user: data.user,
        isLoading: false,
      });

      await get().fetchDbUser();
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },

  signup: async ({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
  }: SignUpForm) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        set({ isLoading: false, error: error.message });
        return { error: error.message };
      }
      if (!data.user) {
        const errorMsg = 'User creation failed';
        set({ isLoading: false, error: errorMsg });
        return { error: errorMsg };
      }

      const { error: userError } = await supabase.from('users').insert({
        id: data.user.id,
        email: data.user.email,
        first_name: firstName,
        last_name: lastName,
      });

      if (userError) {
        set({ isLoading: false, error: userError.message });
        return { error: userError.message };
      }

      set({
        session: data.session,
        user: data.user,
        isLoading: false,
      });

      await get().fetchDbUser();
      return { error: undefined };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Signup failed';
      set({
        error: errorMsg,
        isLoading: false,
      });
      return { error: errorMsg };
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
      set({
        session: null,
        user: null,
        dbUser: null,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Logout failed',
      });
    }
  },

  fetchDbUser: async () => {
    const { user } = get();
    if (!user) {
      set({ dbUser: null });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      set({ dbUser: data });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      set({ dbUser: null });
    }
  },

  updateDbUser: async (
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          first_name: firstName,
          last_name: lastName,
          phoneNumber: phoneNumber,
        })
        .eq('id', user.id)
        .select()
        .single();
      if (error) throw error;

      set({ dbUser: data, isLoading: false });
    } catch (error) {
      console.error('Error updating user:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  checkSession: async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        set({
          session,
          user: session.user,
        });
        await get().fetchDbUser();
      } else {
        set({
          session: null,
          user: null,
          dbUser: null,
        });
      }
    } catch (error) {
      console.error('Error checking session:', error);
      set({
        session: null,
        user: null,
        dbUser: null,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;
