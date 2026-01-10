import supabase from "@/config/supabase";

export const updatePasswordAPI = {
  async updatePassword(email, password) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        email,
        password,
      });

      if (error) {
        return { data: null, error };
      }

      return { data, error: null};
    } catch (error) {
      console.error("Failed to reset password,", error);
      return { data: null, error };
    }
  },
};
