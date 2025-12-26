import supabase from "@/config/supabase";

export const logoutAPI = {
  async logoutUser() {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      // can't verify session
      if (sessionError) {
        return { sessionError };
      }

      // no active session
      if (!session) {
        return ( sessionError );
      }

      // logout function
      const { error } = await supabase.auth.signOut();

      // logout failed
      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  },
};
