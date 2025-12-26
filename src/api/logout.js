import supabase from "@/config/supabase";

export const logoutAPI = {
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
