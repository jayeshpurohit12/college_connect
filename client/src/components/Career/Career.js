import React from "react";
import HeaderBar from "../HeaderBar/HeaderBar";
import "./Career.css";

const Career = (props) => {
  return (
    <>
      <div className="career_container">
      
        <div className="career_inner_container">
          <div className="internship_company_icon">
            <img
              src={props.image}
              alt=""
              style={{ width: "100%", height: "15rem" }}
            />
          </div>
          <div className="opport_details">
            <h3>{props.OpporTitle}</h3>
            <h3>Batch : {props.Batch}</h3>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Career;
