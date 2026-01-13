import supabase from "@/config/supabase";

// remember me
const STORAGE_KEYS = {
  SHOULD_LOGOUT_ON_CLOSE: "should_logout_on_close",
  PENDING_LOGOUT: "pending_logout",
}

// login API
export const loginAPI = {
  async loginUser({ email, password, rememberMe = false }) {
    try {
      // call the backend API route for rate-limited login
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      // set the session in the Supabase client
      if (result.data?.session) {
        await supabase.auth.setSession({
          access_token: result.data.session.access_token,
          refresh_token: result.data.session.refresh_token,
        });
      }

      // handle remember me function
      if (!rememberMe) {
        sessionStorage.setItem(STORAGE_KEYS.SHOULD_LOGOUT_ON_CLOSE, "true");
      } else {
        sessionStorage.removeItem(STORAGE_KEYS.SHOULD_LOGOUT_ON_CLOSE);
      }

      return { data: result.data, error: null };
    } catch (error) {
      console.error("Error logging in: ", error);
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
