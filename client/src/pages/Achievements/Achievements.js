import React, { useEffect, useState } from "react";
import "./Achievements.css";
import NavbarAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import Achievements_heading_bg from "../../images/Achievements_heading_bg.png";
import AchievementsContainer from "../../components/AchievementsContainer/AchievementsContainer";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const Achievements = () => {
  var F = "Faculty";

  var A = "Alumni";

  var S = "Student";

  return (
    <>
      <NavbarAfterLogin />

      <div className="Achievements_heading_container">
        <img
          className="Achievements_bg_img"
          src={Achievements_heading_bg}
          alt="Achievements"
        />
        <h1 className="achievements_heading">ACROPOLIS ACHIEVEMENTS</h1>
      </div>
      <div className="Achievements_inner_container">
        <Link to={`/AchievementsInnerPage?keyword=${F}`}>
          <AchievementsContainer heading="FACULTY" />
        </Link>
        <Link to={`/AchievementsInnerPage?keyword=${A}`}>
          <AchievementsContainer heading="ALUMNI" />
        </Link>
        <Link to={`/AchievementsInnerPage?keyword=${S}`}>
          <AchievementsContainer heading="STUDENTS" />
        </Link>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default Achievements;
