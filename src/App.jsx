import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import Profile from "@/pages/profile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
