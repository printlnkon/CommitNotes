import supabase from "@/config/supabase";

export const forgotPasswordAPI = {
  async forgotPassword(email) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/forgot-password",
      });

      if (error) {
        return { data: null, error };
      }

      return { data, error: null};
    } catch (error) {
      console.error("Error forgetting password", error);
      return { data: null, error}
    }
  },
};
