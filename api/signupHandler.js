import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_PROJECT_URL,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

const frontEndURL = (process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, "") : "http://localhost:3000");

const RATE_LIMIT = 5;
const WINDOW_MINUTES = 10;

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return passwordRegex.test(password);
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.headers["x-real-ip"] ||
      req.socket?.remoteAddress ||
      "unknown";

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

    // Rate limit check
    const attemptWindowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("signup_attempts")
      .select("*", { count: "exact", head: true })
      .eq("email", email)
      .eq("ip_address", ipAddress)
      .gte("attempted_at", attemptWindowStart);

    if (count >= RATE_LIMIT) {
      return res.status(429).json({
        error: "Too many signup attempts. Please try again in 10 minutes.",
      });
    }

    // record signup attempt
    await supabase.from("signup_attempts").insert([
      {
        email,
        ip_address: ipAddress,
      },
    ]);

    // sign up user
    const attemptedAt = new Date().toISOString();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      attempted_at: attemptedAt,
      options: {
        emailRedirectTo: `${frontEndURL || "http://localhost:3000"}/confirm-email`,
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ data, success: true });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
