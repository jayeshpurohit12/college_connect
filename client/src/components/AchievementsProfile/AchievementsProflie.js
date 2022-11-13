import React from "react";
import "./AchievementsProfile.css";
import Button from "@material-ui/core/Button";

const AchievementsProflie = ({name, award, image, expertise}) => {
  return (
    <>
      <div className="Profile_container">
        <div className="inner_profile">
          <div className="Profile_image_container">
            <img className="Profile_image" src={image} alt="" />
          </div>
          
          <div className="Achievers_name_container">
            <h2 className="Achievers_name">{name}</h2>
          </div>
          <div className="Achievers_name_container Achievers_Award_container">
            <h2 className="Achievers_name Achievers_award">
              {award}
            </h2>
          </div>
          <div className="Achievers_name_container Achievers_Award_container">
            <h2 className="Achievers_name Achievers_award Achievers_skill">
              {expertise}
            </h2>
          </div>
          <div className="profile_btn">
            {/* <Button
              className="view_profile_btn"
              variant="contained"
              color="primary"
            >
              View Profile
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AchievementsProflie;
