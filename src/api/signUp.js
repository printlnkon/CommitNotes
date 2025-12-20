import supabase from "@/config/supabase";

export const signUp = {
  async registerUser({ username, email, password }) {
    try {
      // signup user with supabase auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            metadata: username,
          },
        },
      });

      // insert username into profiles table after successful signup and auth
      const { data: { user }, } = await supabase.auth.getUser();
      if (user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([{ user_id: user.id, username }]);

        if (profileError) throw profileError;
      }

      if (signUpError) throw signUpError;

      return { data, error: null };
    } catch (error) {
      console.error("Error signing up:", error);
      return { data: null, error };
    }
  },
};
