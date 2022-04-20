import React from "react";
import "./ConnectorsProfile.css";
import { Avatar } from "@material-ui/core";

const ConnectorsProfile = (props) => {
  return (
    <>
      <div className="connections_profile">
        <Avatar
          alt="User"
          src={props.image}
          fontSize="large"
          style={{ color: "white", margin: "1rem" }}
          className="account_icon"
        />
        <div className="name_and_expertise_container">
          <h2 className="connecter_name">{props.name}</h2>
          <div className="connectors_expertise_container">
            <h2 className="expertise_heading_cont">Expertise: </h2>
            <h2 className="connecter_expertise">{props.expertise}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectorsProfile;
