import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "../src/contexts/Authcontext";
import { StateProvider } from "./contexts/StateContext";

ReactDOM.render(
  <AuthProvider>
    <StateProvider>
    <App />
   </StateProvider>
  </AuthProvider>,

  document.getElementById("root")
);
