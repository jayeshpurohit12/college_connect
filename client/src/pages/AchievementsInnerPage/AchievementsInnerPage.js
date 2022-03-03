import React from "react";
import "./AchievementsInnerPage.css";
import NavbarAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import AchievementsProfile from "../../components/AchievementsProfile/AchievementsProflie";

const AchievementsInnerPage = () => {
  return (
    <>
      <NavbarAfterLogin />
      <div className="Achievers_container">
        <div className="Achievers_heading_container">
          <h1 className="Achievers_heading1">Distigushed Faculty</h1>
          <h1 className="Achievers_heading1 ">
            <hr className="center_line" />
            Awards
            <hr className="center_line" />
          </h1>
        </div>
      </div>
      <hr className="bottom_line" />
      <div className="Achievements_Profile">
        <AchievementsProfile />
        <AchievementsProfile />
        <AchievementsProfile />
        <AchievementsProfile />
      </div>
    </>
  );
};

export default AchievementsInnerPage;
