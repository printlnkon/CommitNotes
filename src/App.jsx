import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { useSessionManager } from "@/hooks/useSessionManager";
import PublicRoute from "@/routes/public-route";
import ProtectedRoute from "@/routes/protected-route";
import Home from "@/pages/home";
import Profile from "@/pages/profile/profile";
import PageNotFound from "@/pages/page-not-found";
import ArchivedNotes from "@/pages/archived-note-page";
import ErrorBoundary from "@/components/error-boundary";
import LoginPage from "@/pages/auth/login/login-page";
import SignupPage from "@/pages/auth/signup/signup-page";
import ConfirmEmailPage from "@/pages/auth/confirm-email/confirm-email-page";
import ForgotPasswordPage from "@/pages/auth/forgot-password/forgot-password-page";
import UpdatePasswordPage from "@/pages/auth/update-password/update-password-page";

function SessionManager({ children }) {
  useSessionManager();
  return children;
}

function AppContent() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/confirm-email" element={<ConfirmEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/update-password" element={<UpdatePasswordPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/archived-notes" element={<ArchivedNotes />} />
            <Route path="/profile" element={<Profile />} />
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
