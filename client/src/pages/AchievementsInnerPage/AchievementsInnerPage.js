import React, { useState, useEffect } from "react";
import "./AchievementsInnerPage.css";
import NavbarAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import AchievementsProfile from "../../components/AchievementsProfile/AchievementsProflie";
import { useSearchParams } from "react-router-dom";

const AchievementsInnerPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [achievements, setAchievements] = useState([]);

  const fetchAchievements = async () => {
    const res = await fetch(`/achievement`);
    const data = await res.json();
    setAchievements(data);
    console.log(data);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  var answer = searchParams.get("keyword");

  return (
    <>
      <NavbarAfterLogin />
      <div className="Achievers_container">
        <div className="Achievers_heading_container">
          <h1 className="Achievers_heading1">Distigushed {answer}</h1>
          <h1 className="Achievers_heading1 ">
            <hr className="center_line" />
            Awards
            <hr className="center_line" />
          </h1>
        </div>
      </div>
      <hr className="bottom_line" />
      <div className="Achievements_Profile">
        {achievements.map((achievement) => {
          if (achievement.category === answer) {
            return (
              <AchievementsProfile
                name={achievement.name}
                award={achievement.award}
                image={achievement.image}
                expertise={achievement.expertise}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default AchievementsInnerPage;
