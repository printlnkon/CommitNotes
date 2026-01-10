import supabase from "@/config/supabase";

// rate limiting
const RATE_LIMIT = 5; // max signup attempts in a single IP
const WINDOW_MINUTES = 10; // time window in minutes

// signup API
export const signUpAPI = {
  async registerUser({ email, password, ipAddress }) {
    try {

      // validation
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format.");
      }

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
      
      // check recent signup attempts
      const attemptWindowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
      const { count } = await supabase
        .from("signup_attempts")
        .select("*", { count: "exact", head: true })
        .eq("email", email)
        .eq("ip_address", ipAddress)
        .gte("attempted_at", attemptWindowStart)

      if (count >= RATE_LIMIT) {
        throw new Error("Too many signup attempts. Please try again in an hour.")
      }

      // record signup attempts
      await supabase.from("signup_attempts").insert([
        {
          email,
          ip_address: ipAddress,
        }
      ])

      // signup user with supabase auth
      const { data, error } = await supabase.auth.signUp(
        { email, 
          password,
          options: {
            emailRedirectTo: "http://localhost:5173/confirm-email",
          }
        },
      );
      
      if (error) { 
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error("Error signing up:", error);
      return { data: null, error };
    }
  },
};
