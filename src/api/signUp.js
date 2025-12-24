import supabase from "@/config/supabase";

export const signUp = {
  async registerUser({ email, password }) {
    try {

      // validate inputs
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      // validate email format
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format.");
      }

      // validate password requirements
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }

      if (!/[a-z]/.test(password)) {
        throw new Error("Password must contain at least one lowercase letter.");
      }

      if (!/[A-Z]/.test(password)) {
        throw new Error("Password must contain at least one uppercase letter.");
      }

      if (!/[0-9]/.test(password)) {
        throw new Error("Password must contain at least one digit.");
      }

      if (!/[!@#$%^&*(),.?"":{}|<>]/.test(password)) {
        throw new Error("Password must contain at least one special character.");
      }
      
      // signup user with supabase auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (signUpError) throw signUpError;

      return { data, error: null };
    } catch (error) {
      console.error("Error signing up:", error);
      return { data: null, error };
    }
  },
};
