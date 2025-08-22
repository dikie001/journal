import { Toaster } from "react-hot-toast";
import JournalEntry from "./pages/JournalEntry";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import SettingsPage from "./pages/Settings";
import axios from "axios";
import { useEffect } from "react";
import { setNavigator } from "./helpers/navigation";
import { navigate } from "./helpers/navigation";

const App = () => {
  useEffect(() => {
    initialLoad();
  }, []);

  //Navigation helper

  function NavigatorSetter() {
    const nav = useNavigate();
    setNavigator(nav);
    return null;
  }

  //send token to server for validation
  const initialLoad = () => {
    const token = localStorage.getItem("journal-token");
    axios
      .get("http://localhost:4000/api/firstLoad", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.message === "Token verified successfully") {
          navigate(`${res.data.userId}`);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.err?.name === "TokenExpiredError") {
          const confirmProgress = confirm("Session Expired, login to continue");
          if (confirmProgress) {
            navigate("/login");
            localStorage.removeItem("journal-token");
          }
          return;
        }
      });
  };
  return (
    <div>
      <Toaster />
      <Router>
        <NavigatorSetter />
        <Routes>
          <Route path="/:id" element={<HomePage />} />
          <Route path="/entry/:id" element={<JournalEntry />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />{" "}
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
