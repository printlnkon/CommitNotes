import supabase from "@/config/supabase";

export const loginAPI = {
  async loginUser({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getUser() {
    try {
      const { data: { user }, error, } = await supabase.auth.getUser();

      if (error) {
        return { user: null, error };
      }

      return { user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  },
};
