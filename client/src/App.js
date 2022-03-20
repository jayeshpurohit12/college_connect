import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Mainpg } from "./pages/PageSrc";
import { Route } from "react-router";
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
      <Switch>
      
        <Route path="/home" component={Mainpg} />
        <Route path="/" exact component={Frontpg} />
        <Route path="/login" component={Login} />
        <Route path="/Internships" component={Internship} />
        <Route path="/Jobs" component={Jobs} />
        <Route path="/signup" component={Signup} />
        <Route path="/resetpassword" component={ResetPassword} />
        <Route path="/userprofile" component={UserProfile} />
        <Route path="/details" component={Detail} />
        <Route path="/Achievements" component={Achievements} />
        <Route
          path="/AchievementsInnerPage"
          component={AchievementsInnerPage}
        />
      </Switch>
    </Router>
  );
};

export default App;
