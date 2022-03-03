import React from "react";
import "./AchievementsProfile.css";
import ProfileImg from "../../images/profileImg.png";
import Button from "@material-ui/core/Button";

const AchievementsProflie = () => {
  return (
    <>
      <div className="Profile_container">
        <div className="inner_profile">
          <div className="Profile_image_container">
            <img className="Profile_image" src={ProfileImg} alt="" />
          </div>
          <div className="Profile_info_container"></div>
          <div className="Achievers_name_container">
            <h2 className="Achievers_name">Mrs. Nisha Rathi</h2>
          </div>
          <div className="Achievers_name_container Achievers_Award_container">
            <h2 className="Achievers_name Achievers_award">
              Award from Professional Excellence
            </h2>
          </div>
          <div className="Achievers_name_container Achievers_Award_container">
            <h2 className="Achievers_name Achievers_award Achievers_skill">
              Computational Method and Machine learning expert
            </h2>
          </div>
          <div className="profile_btn">
            <Button
              className="view_profile_btn"
              variant="contained"
              color="primary"
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AchievementsProflie;
