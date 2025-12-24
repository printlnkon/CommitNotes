import supabase from "@/config/supabase";

export const logout = {
  async logoutUser() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  },
};
