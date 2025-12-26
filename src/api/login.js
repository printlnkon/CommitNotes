import supabase from "@/config/supabase";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const validatePassword = (password) => {
  return password && password.length >= 8;
}

// login API
export const loginAPI = {
  async loginUser({ email, password }) {
    try {
      // validation
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      if (!validateEmail(email)) {
        throw new Error("Invalid email format");
      }

      if (!validatePassword(password)) {
        throw new Error("Password must be at least 8 characters")
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error("Error logging in: ", error)
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
      console.error("Error getting user: ", error);
      return { user: null, error };
    }
  },
};
