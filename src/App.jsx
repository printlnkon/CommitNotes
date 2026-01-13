import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { useSessionManager } from "@/hooks/useSessionManager";
import HomePage from "@/pages/home/home-page";
import PublicRoute from "@/routes/public-route";
import PageNotFound from "@/pages/page-not-found";
import ProtectedRoute from "@/routes/protected-route";
import LoginPage from "@/pages/auth/login/login-page";
import ProfilePage from "@/pages/profile/profile-page";
import SignupPage from "@/pages/auth/signup/signup-page";
import ErrorBoundary from "@/components/common/error-boundary";
import LandingPage from "@/pages/landing-page/landing-page";
import ArchivedNotePage from "@/pages/archived-note/archived-note-page";
import ConfirmEmailPage from "@/pages/auth/confirm-email/confirm-email-page";
import ForgotPasswordPage from "@/pages/auth/forgot-password/forgot-password-page";
import ChangePasswordPage from "@/pages/auth/change-password/change-password-page";

function SessionManager({ children }) {
  useSessionManager();
  return children;
}

function AppContent() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/confirm-email" element={<ConfirmEmailPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/archived-note" element={<ArchivedNotePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <AuthProvider>
        <Router>
          <SessionManager>
            <AppContent />
          </SessionManager>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
