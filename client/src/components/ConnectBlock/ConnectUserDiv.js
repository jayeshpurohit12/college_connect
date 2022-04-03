import React from "react";
import "./ConnectUserDiv.css";
import profile from "../../images/profile.jpg";
import { Button } from "@material-ui/core";

const ConnectUserDiv = () => {
  return (
    <>
      <div className="user_connection_profile">
        <div className="user_profile">
          <img className="userImage" src={profile} alt="" />
        </div>
        <div className="user_connection_details">
          <div className="user_block">
            <h1 className="user_name">Urmi Chauhan</h1>
          </div>
          <div className="user_block">
            <h1 className="user_class">Alumni of Class 2019</h1>
          </div>
          <div className="user_block">
            <h1 className="user_branch">
              Computer Science and Technology(B.Tech)
            </h1>
          </div>
          <div className="user_block user_connection_expertise">
            <h1 className="user_expertise">Expertise: </h1>
            <h1 className="user_skills">C++, java, Machine Learning</h1>
          </div>
          <div className="user_connection_button">
            <Button variant="contained" color="primary">
              Connect
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectUserDiv;
