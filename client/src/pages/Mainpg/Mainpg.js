import React, { useEffect, useState } from "react";
import NavbarrAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import collegeAlumni from "../../images/collegeAlumni.png";
import "./Mainpg.css";
import { Button } from "react-bootstrap";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import eventBanner from "../../images/eventBanner.png";
import Banner from "../../components/Banner/Banner";
import achievementImg from "../../images/achievementImg.jpg";
import Career from "../../components/Career/Career";
import MicrosoftImg from "../../images/MicrosoftImg.png";
import ZSImage from "../../images/ZSImage.png";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../contexts/Authcontext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@mui/material";
import { StateContext } from "../../contexts/StateContext";

const Mainpg = () => {
  const [profile, setProfile] = useState({});
  const { currentUser } = useAuth();
  const state = React.useContext(StateContext);
const [achievements, setAchievements] = state.achievements;
const [jobs, setJobs] = state.jobs;
const [internships, setInternships] = state.internships;

  const fetchdata = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setProfile(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      <NavbarrAfterLogin />

      <div className="alumnibg_img">
        <img
          src={collegeAlumni}
          alt=""
          className="collegeAlumni_icon"
          style={{ width: "100%" }}
        />
        <div className="connect_btn">
          <Link to="/connect">
          <Button
            style={{
              display: "block",
              padding: "0.4rem 2.4rem",
              backgroundColor: "#3566E5",
            }}
          >
            <span id="connect_btn_heading">Connect</span>
          </Button>
          </Link>
        </div>
        <div className="heading_img_bottom">
          <h1 id="inner_heading">Welcome to Acropolis Alumni Association.</h1>
        </div>
      </div>
      <div className="event_container">
        <HeaderBar title="Events" button={true} link="/event" />
        <div className="event_banner_img">
          <Banner
            image1="https://mactus.co.in/img/header_img/event.jpg"
            width="100%"
            height="30rem"
            caption={false}
          />
         
        </div>
        <div className="achievement_container">
          <HeaderBar title="Achievements" button={true} link="/Achievements" />
          {console.log(achievements)}
          {achievements && <div className="inner_achievement_section">
            <div className="achievement_image">
              
              <img
                src={achievements[0].image}
                alt=""
                style={{ width: "40%", height: "25rem", borderRadius: "10px" }}
              />
              <div className="achievement_caption">
                <h1>{achievements[0].name}</h1>
                <p>
                 {achievements[0].awards}
                 <div>
                  {achievements[0].expertise}
                 </div>
                </p>
              </div>
            </div>
          </div>}
        </div>
        <div className="Internship_container">
        <Toolbar className="header_bar" variant="dense">
        <Typography variant="h6" component="div">
          Internships
        </Typography>
      
          <Link to="/Internships">
            <Button id="header_button">View All</Button>
          </Link>
      </Toolbar>
      {internships && internships.length>0?  <Career
            title="Internship"
            image={internships[0].image}
            OpporTitle={internships[0].name}
            Batch={internships[0].batch}
           
          />:<></>}
        
        </div>
        <div className="Job_container">
        <Toolbar className="header_bar" variant="dense">
        <Typography variant="h6" component="div">
         Jobs
        </Typography>
      
          <Link to="/Internships">
            <Button id="header_button">View All</Button>
          </Link>
      </Toolbar>
         {jobs && jobs.length>0?<Career
            title="Full Time Jobs"
            image={jobs[0].image}
            OpporTitle={jobs[0].name}
            Batch={jobs[0].batch}
            
          />:<></>}
        </div>
        <div className="foter_container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Mainpg;
