import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Frontpg } from "./pages/PageSrc";
import { Mainpg } from "./pages/PageSrc";
import { Route } from "react-router";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Frontpg} />
        <Route path="/home" component={Mainpg} />
      </Switch>
    </Router>
  );
};

export default App;
