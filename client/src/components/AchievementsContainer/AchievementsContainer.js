import React from "react";
import "./AchievementsContainer.css";
import Acropolis_cllg_img from "../../images/Acropolis_cllg_img.png";

const AchievementsContainer = ({ heading }) => {

  return (
    <>
      
      <div className="Achievements_container">
        <img className="inner_img" src={Acropolis_cllg_img} alt="Acropolis" />

        <h1 className="achievements_sub_head" >{heading}</h1>
      </div>
      
    </>
  );
};

export default AchievementsContainer;
