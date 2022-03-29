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
  Faultpg
} from "./pages/PageSrc";
import "./App.css";

const App = () => {
  const {currentUser}= useAuth();
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Faultpg />} />
        {!currentUser && (
          <>
 <Route exact path="/" element={<Frontpg />} />
 <Route path="/login" element={<Login />} />
 <Route path="/signup" element={<Signup />} />
 </>
        )}
       {currentUser && (
          <>
           <Route path="/" element={<Mainpg />} />
           <Route path="/login" element={<Login />} />
        <Route path="/Internships" element={<Internship />} />
        <Route path="/Jobs" element={<Jobs />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/details" element={<Detail />} />
        <Route path="/Achievements" element={<Achievements />} />
        <Route
          path="/AchievementsInnerPage"
          element={<AchievementsInnerPage />}/>
           </> 
        )
          }
       
      </Routes>
    </Router>
  );
};

export default App;
