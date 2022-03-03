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
} from "./pages/PageSrc";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Mainpg} />
        <Route path="/" exact component={Frontpg} />
        <Route path="/login" exact component={Login} />
        <Route path="/Internships" component={Internship} />
        <Route path="/Jobs" component={Jobs} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/resetpassword" exact component={ResetPassword} />
        <Route path="/userprofile" exact component={UserProfile} />
        <Route path="/Achievements" exact component={Achievements} />
      </Switch>
    </Router>
  );
};

export default App;
