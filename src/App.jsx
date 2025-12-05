import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "@/pages/page-not-found";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import ErrorBoundary from "@/components/error-boundary";

function AppContent() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

export default App;
