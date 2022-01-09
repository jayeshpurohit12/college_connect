import React from "react";
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

const Mainpg = () => {
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
          <Button
            style={{
              display: "block",
              padding: "0.4rem 2.4rem",
              backgroundColor: "#3566E5",
            }}
          >
            <span id="connect_btn_heading">Connect</span>
          </Button>
        </div>
        <div className="heading_img_bottom">
          <h1 id="inner_heading">Welcome to Acropolis Alumni Association.</h1>
        </div>
      </div>
      <div className="event_container">
        <HeaderBar title="Events" button={true} />
        <div className="event_banner_img">
          <Banner
            image={eventBanner}
            width="100%"
            height="30rem"
            caption={false}
          />
          <div className="bottom_image_section">
            <div className="consert_title">
              <h4>Live Concert</h4>
              <div className="days_left">
                <h4>7 Days Left</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="achievement_container">
          <HeaderBar title="Achievements" button={true} />
          <div className="inner_achievement_section">
            <div className="achievement_image">
              <img
                src={achievementImg}
                alt=""
                style={{ width: "40%", height: "25rem", borderRadius: "10px" }}
              />
              <div className="achievement_caption">
                <h1>Dream Innovate Built</h1>
                <p>
                  Spirit of Acropolians, Developed a robot placed at Indore
                  Airport first of it’s kind at an indian Airport
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="Internship_container">
          <Career
            title="Internship"
            image={MicrosoftImg}
            OpporTitle="Microsoft is hiring Data Science Associate"
            Batch="2021, 2022"
            postedDate="16-11-2021"
          />
        </div>
        <div className="Job_container">
          <Career
            title="Full Time Jobs"
            image={ZSImage}
            OpporTitle="ZS is hiring Data Science Associate"
            Batch="2020, 2021"
            postedDate="16-11-2021"
          />
        </div>
        <div className="foter_container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Mainpg;
