import supabase from "@/config/supabase";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // at least 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special char
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return passwordRegex.test(password);
};

// rate limiting
const RATE_LIMIT = 5; // max signup attempts in a single IP
const WINDOW_MINUTES = 10; // time window in minutes

// get the IP address of the user registering
const getIPAddress = async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const ipData = await res.json();
    return ipData.ip;
  } catch (error) {
    console.error("Failed to get the IP Address: ", error.message)
    return "unknown";
  }
};

// signup API
export const signUpAPI = {
  async registerUser({ email, password }) {
    try {
      // get the IP address of user
      const ipAddressOfUser = await getIPAddress();

      // validation
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      if (!validateEmail(email)) {
        throw new Error("Invalid email format");
      }

      if (!validatePassword(password)) {
        throw new Error("Password must be at least 8 characters and include uppercase, lowercase, number, and a special character.");
      }
      
      // check recent signup attempts
      const attemptWindowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
      const { count } = await supabase
        .from("signup_attempts")
        .select("*", { count: "exact", head: true })
        .eq("email", email)
        .eq("ip_address", ipAddressOfUser)
        .gte("attempted_at", attemptWindowStart)

      if (count >= RATE_LIMIT) {
        throw new Error("Too many signup attempts. Please try again in 10 minutes.")
      }

      // record signup attempts
      await supabase.from("signup_attempts").insert([
        {
          email,
          ip_address: ipAddressOfUser,
        }
      ])

      // signup user with supabase auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm-email`,
        },
      });
      
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
