import React from "react";
import "./ConnectorsProfile.css";
import UserProfileimg from "../../images/userProfileimg.png";

const ConnectorsProfile = ({ name, expertise }) => {
  return (
    <>
      <div className="connections_profile">
        <img className="connecter_profile" src={UserProfileimg} alt="profile" />
        <div className="name_and_expertise_container">
          <h2 className="connecter_name">{name}</h2>
          <div className="connectors_expertise_container">
            <h2 className="expertise_heading_cont">Expertise: </h2>
            <h2 className="connecter_expertise">{expertise}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectorsProfile;
