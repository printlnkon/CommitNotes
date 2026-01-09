import { useEffect } from "react";
import supabase from "@/config/supabase";

const STORAGE_KEYS = {
    SHOULD_LOGOUT_ON_CLOSE: "should_logout_on_close",
    PENDING_LOGOUT: "pending_logout",
};

export function useSessionManager() {
  useEffect(() => {
    // check if the user close the browser without "Remember me" checked
    const handlePendingLogout = async () => {
        const hasPendingLogout = localStorage.getItem(STORAGE_KEYS.PENDING_LOGOUT);
        if (hasPendingLogout) {
          localStorage.removeItem(STORAGE_KEYS.PENDING_LOGOUT);
          await supabase.auth.signOut();
          window.location.href = "/login";
        }
    };

    handlePendingLogout();

    // before browser closes, mark for logout if "Remember me" was unchecked
    const handleBrowserClose = () => {
        const shouldLogoutOnClose = sessionStorage.getItem(STORAGE_KEYS.SHOULD_LOGOUT_ON_CLOSE);

      if (shouldLogoutOnClose) {
        localStorage.setItem(STORAGE_KEYS.PENDING_LOGOUT, "true");
      }
    };

    window.addEventListener("beforeunload", handleBrowserClose);

    return () => {
      window.removeEventListener("beforeunload", handleBrowserClose);
    };
  }, []);
}
