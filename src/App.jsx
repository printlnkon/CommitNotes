import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import PageNotFound from "@/pages/page-not-found";
import ArchivedNotes from "@/pages/archived-note-page";
import ErrorBoundary from "@/components/error-boundary";
import LoginPage from "@/pages/login/login-page.jsx";
import SignupPage from "@/pages/signup/sign-up-page.jsx";

function AppContent() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/archived-notes" element={<ArchivedNotes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

export default App;
