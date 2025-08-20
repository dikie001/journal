import { Toaster } from "react-hot-toast";
import JournalEntry from "./pages/JournalEntry";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import SettingsPage from "./pages/Settings";

const App = () => {
  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/entry" element={<JournalEntry />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />{" "}
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
