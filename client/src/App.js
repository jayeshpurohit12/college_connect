import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Mainpg } from "./pages/PageSrc";
import { useAuth } from "./contexts/Authcontext";
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
  Faultpg,
  Connect,
  Event,
  EventInnerPage,
  ConnectedUserProfile,
  BatchWiseConnect,
  Experience,
  ExperienceInnerpg,
  VerifyUser,
} from "./pages/PageSrc";
import "./App.css";

const App = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Faultpg />} />
        {!currentUser && (
          <>
            <Route exact path="/" element={<Frontpg />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/event" element={<Event />} />
            <Route path="/Achievements" element={<Achievements />} />
            <Route
              path="/AchievementsInnerPage"
              element={<AchievementsInnerPage />}
            />
             <Route path="/Internships" element={<Internship />} />
            <Route path="/Jobs" element={<Jobs />} />
            <Route path="/EventInnerPage/:id" element={<EventInnerPage />} />
            <Route path="/connect" element={<BatchWiseConnect />} />
            <Route path="/verify" element={<VerifyUser />} />
           
          </>
        )}
        {currentUser && (
          <>
            <Route path="/" element={<Mainpg />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Internships" element={<Internship />} />
            <Route path="/Jobs" element={<Jobs />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/details" element={<Detail />} />
            <Route path="/Achievements" element={<Achievements />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/verify" element={<VerifyUser />} />
            <Route
              path="/AchievementsInnerPage"
              element={<AchievementsInnerPage />}
            />
              <Route path="/signup" element={<Signup />} />
            <Route path="/connect" element={<BatchWiseConnect />} />
            <Route path="/connect/:id" element={<Connect />} />
            <Route path="/event" element={<Event />} />
            <Route
              path="/connectedUser/:id"
              element={<ConnectedUserProfile />}
            />
            <Route path="/EventInnerPage/:id" element={<EventInnerPage />} />
            <Route path="/exp" element={<Experience />} />
            <Route path="/exp/:id" element={<ExperienceInnerpg />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
