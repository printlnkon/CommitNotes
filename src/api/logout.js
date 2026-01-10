import supabase from "@/config/supabase";

const STORAGE_KEYS = {
  SHOULD_LOGOUT_ON_CLOSE: "should_logout_on_close",
  PENDING_LOGOUT: "pending_logout",
  REMEMBERED_EMAIL: "remembered_email",
  REMEMBER_ME_CHECKED: "remember_me_checked",
};

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
        return { sessionError: new Error("No active session")};
      }

      // save email if "Remember me" was checked
      const wasRemembered = !sessionStorage.getItem(STORAGE_KEYS.SHOULD_LOGOUT_ON_CLOSE);
      if (wasRemembered && session.user?.email) {
        localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, session.user.email);
        localStorage.setItem(STORAGE_KEYS.REMEMBER_ME_CHECKED, "true");
      } else {
        localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
        localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME_CHECKED);
      }
      
      // clear session flags
      sessionStorage.removeItem(STORAGE_KEYS.SHOULD_LOGOUT_ON_CLOSE);
      localStorage.removeItem(STORAGE_KEYS.PENDING_LOGOUT);

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

  // helper to get remembered email and rememberMe credentials
  getRememberedCredentials() {
    return {
      email: localStorage.getItem(STORAGE_KEYS.REMEMBERED_EMAIL) || "",
      rememberMe: localStorage.getItem(STORAGE_KEYS.REMEMBER_ME_CHECKED) === "true",
    };
  },

  // clear "Remember me" check if user unchecks
  clearRememberMe() {
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME_CHECKED);
  },
};
