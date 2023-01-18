import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./ExperienceInnerpg.css";

const ExperienceInnerpg = () => {
  const [experience, setExperience] = useState({});
  const { id } = useParams();

  const fetchdata = async () => {
    const docRef = doc(db, "experience", "exp");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setExperience(docSnap.data().content[id]);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      <div className="story_container">
        <h2 className="story_title">{experience.title}</h2>
        <img src={experience.image} alt="experience" className="story_image" />
        <div className="story_cont_content">
          <p>{experience.desc}</p>
        </div>
      </div>
    </>
  );
};

export default ExperienceInnerpg;
