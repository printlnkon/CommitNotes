import supabase from "@/config/supabase";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // at least 8 chars, 1 uppercase, 1 lowercase, and 1 number
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
};

// rate limiting
const RATE_LIMIT = 5; // max attempts
const WINDOW_MINUTES = 15; // time window in minutes

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
        throw new Error("Password must be at least 8 characters");
      }

      // check recent login attempts
      const attemptWindowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
      const { count } = await supabase
        .from("login_attempts")
        .select("*", { count: "exact", head: true })
        .eq("email", email)
        .gte("attempted_at", attemptWindowStart)
        .eq("is_successful", false)

      console.log("Login attempts in window:", count);

      if (count >= RATE_LIMIT) {
        throw new Error("Too many login attempts. Please try again in 15 minutes.");
      }

      // login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // record login attempt (success or failure)
      const attemptedDate = new Date().toISOString();
      const userId = data && data.user ? data.user.id : null;
      const isSuccessful = !error;
      await supabase.from("login_attempts").insert([
        {
          email,
          attempted_at: attemptedDate,
          user_id: userId,
          is_successful: isSuccessful,
        },
      ]);

      if (error) {
        if (error.status === 429 || error.message.toLowerCase().includes("rate limit")) {
          throw new Error("Too many login attempts. Please try again later. ");
        }
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error("Error logging in: ", error);
      return { data: null, error };
    }
  },

  async getUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

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
