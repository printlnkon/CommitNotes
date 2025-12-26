import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import PublicRoute from "@/routes/public-route";
import ProtectedRoute from "@/routes/protected-route";
import Home from "@/pages/home";
import Profile from "@/pages/profile/profile";
import PageNotFound from "@/pages/page-not-found";
import ArchivedNotes from "@/pages/archived-note-page";
import ErrorBoundary from "@/components/error-boundary";
import LoginPage from "@/pages/login/login-page.jsx";
import SignupPage from "@/pages/signup/signup-page.jsx";

function AppContent() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
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
          <AppContent />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
