import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Mainpg } from "./pages/PageSrc";
import {
  Frontpg,
  Login,
  Signup,
  Internship,
  Jobs,
  ResetPassword,
  UserProfile,
  Achievements,
  Detail,
  AchievementsInnerPage,
} from "./pages/PageSrc";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Frontpg />} />
        <Route path="/home" element={<Mainpg />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Internships" element={<Internship />} />
        <Route path="/Jobs" element={<Jobs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/details" element={<Detail />} />
        <Route path="/Achievements" element={<Achievements />} />
        <Route
          path="/AchievementsInnerPage"
          element={<AchievementsInnerPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
