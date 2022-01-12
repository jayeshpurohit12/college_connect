import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Mainpg } from "./pages/PageSrc";
import { Route } from "react-router";
import { Frontpg,Login,Signup,ChangePassword,ResetPassword,Internship, Jobs} from "./pages/PageSrc";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Mainpg}/>
        <Route path="/" exact component={Frontpg}/>
       <Route path ="/changepassword" exact component={ChangePassword}/>
       <Route path ="/resetpassword" exact component={ResetPassword}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/Internships" component={Internship} />
        <Route path="/Jobs" component={Jobs} />
        <Route path="/signup" exact component={Signup}/>
       
      </Switch>
    </Router>
  );
};

export default App;

