import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_PROJECT_URL,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

const RATE_LIMIT = 5;
const WINDOW_MINUTES = 10;

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return passwordRegex.test(password);
};

export default async function handler(req, res) {
  // set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    // get real client IP from Vercel headers
    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.headers["x-real-ip"] ||
      req.socket?.remoteAddress ||
      "unknown";

    // validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and a special character.",
      });
    }

    // check recent login attempts (rate limiting)
    const attemptWindowStart = new Date(
      Date.now() - WINDOW_MINUTES * 60 * 1000
    ).toISOString();
    const { count } = await supabase
      .from("login_attempts")
      .select("*", { count: "exact", head: true })
      .eq("email", email)
      .eq("ip_address", ipAddress)
      .gte("attempted_at", attemptWindowStart)
      .eq("is_successful", false);

    console.log("Login attempts in window:", count, "IP:", ipAddress);

    if (count >= RATE_LIMIT) {
      return res.status(429).json({
        error: "Too many login attempts. Please try again in 10 minutes.",
      });
    }

    // attempt login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // record login attempt
    const attemptedDate = new Date().toISOString();
    const userId = data?.user?.id || null;
    const isSuccessful = !error;

    await supabase.from("login_attempts").insert([
      {
        email,
        attempted_at: attemptedDate,
        ip_address: ipAddress,
        user_id: userId,
        is_successful: isSuccessful,
      },
    ]);

    if (error) {
      if (
        error.status === 429 ||
        error.message.toLowerCase().includes("rate limit")
      ) {
        return res.status(429).json({
          error: "Too many login attempts. Please try again later.",
        });
      }
      return res.status(400).json({ error: error.message });
    }

    // return session data for frontend to set
    return res.status(200).json({
      data: {
        user: data.user,
        session: data.session,
      },
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
