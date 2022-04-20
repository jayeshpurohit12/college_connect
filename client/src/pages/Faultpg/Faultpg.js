import React from "react";
import pgNotFound from "../../images/pgNotFound.jpg"; 
import "./Faultpg.css";

const Faultpg = () => {
  return (
    <div className="main_container">
      <div style={{margin:"1rem"}}>
        <p>
        <h1>
         OOPS! Page not found. Go back
         </h1>
        </p>
      </div>
      <img src={pgNotFound} className="form_box" style={{ width: "50%",height:"85vh"}} />
    </div>
  );
};

export default Faultpg;
