import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/NavbarrBeforeLogin";
import Banner from "../../components/Banner/Banner";
import "./Frontpg.css";
import Connection from "../../components/Connection/Connection";
import { Link } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Cards from "../../components/Cards/Cards";
import Button from "@material-ui/core/Button";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import Eventcarouselimg from "../../images/Eventcarouselimg.jpeg";
import OwlCarousel from "react-owl-carousel";
import OverlayCard from "../../components/OverlayCard/OverlayCard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import job_background from "../../images/job_background.jpeg";
import acropolis_icon from "../../images/acropolis_icon.png";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import profile from "../../images/profile.jpg";
import { Badge } from "react-bootstrap";
import video from "../../images/video.png";

const Frontpg = () => {
  const [events, setEvents] = useState([]);
  const [length, setLength] = useState(0);
  const [length1, setLength1] = useState(0);
  var d = new Date();
  const [achievements, setAchievements] = useState([]);

  const fetchAchievements = async () => {
    const res = await fetch(`/achievements`);
    const data = await res.json();
    setAchievements(data);
    if(data.length<3){
   setLength1(data.length);
    }
    else{
      setLength1(3);
    }
  };

 

  const fetchEvents = async () => {
    const res = await fetch(`/event`);
    // console.log(res)
    const data = await res.json();
    setEvents(data);
    if (data.length < 3) {
      setLength(data.length);
    } else setLength(3);
  };

  useEffect(() => {
    fetchEvents();
    fetchAchievements();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="main_section">
        {/*  main - left - section */}

        <div className="main_left_section">
          <Banner
            image1="http://aitr.ac.in/wp-content/uploads/2014/10/collegeacro.jpg"
            image2="https://d12aarmt01l54a.cloudfront.net/cms/images/UserMedia-20210127203437/1224-400.png"
            width="97%"
            height="32rem"
            caption={true}
          />
          <div className="achievement_section">
            <HeaderBar title="Achievement" button={false} link="/home" />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <OwlCarousel
                className="owl_carousel"
                style={{ marginTop: "0.5rem", width: "90%" }}
                loop
                margin={3}
                items={length1}
                nav
              >
                
                {achievements?.map((achievement, id) => {
                  return (
                    <div className="carousel_item" key={id}>
                      <Card style={{ width: "15rem" ,height:"20rem"}}>
                        <Card.Img variant="top" src={achievement.image} style={{height:"45%"}}/>
                        <Card.Body>
                          
                          <Card.Text>
                            <div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
                              <h4>{achievement.name}</h4>
                              <strong>{achievement.award}</strong>
                              <span>{achievement.expertise}</span>
                            </div>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
              </OwlCarousel>
            </div>
         
          </div>
          <div>
            <HeaderBar title="Event" button={true} link="/event" />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <OwlCarousel
                className="owl_carousel"
                style={{ marginTop: "0.5rem", width: "70%",justifyContent:"center" }}
                loop
                margin={3}
                items={length}
                nav
              >
                {console.log(events.length)}
                {events?.map((event, id) => {
                  return (
                    <div className="carousel_item" key={id}>
                      <Card style={{ width: "15rem" ,height:"20rem"}}>
                        <Card.Img variant="top" src={event.image} style={{height:"45%"}}/>
                        <Card.Body>
                          
                          <Card.Text>
                            <div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
                              
                              <span style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
                                <h4>{event.name}</h4>
                                <p style={{margin:"1rem"}}><strong><CalendarTodayIcon /> Date:</strong>{" "}
                                {event.date && event.date.substring(8, 10)} -{" "}
                                {event.date.substring(5, 7)} -{" "}
                                {event.date.substring(2, 4)}
                                </p>
                              </span>
                            
                            <div>
                              <PowerSettingsNewIcon />
                              <span> Online Mode</span>
                            </div>
                            </div>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
              </OwlCarousel>
            </div>
          </div>
        </div>

        {/* main- right -section */}

        <div className="main_right_section">
          {/* <Connection /> */}
          <OverlayCard
            title="Job Portal"
            text="Exchange job from your company with fellow alumni"
            image={job_background}
          />
          <OverlayCard
            title="Alumni Guidance"
            text="Give advice to your fellow alumni or take guidance from alumni"
            image={job_background}
          />
          <div>
            <Card style={{ margin: "1.5rem" }}>
              <Card.Header style={{ backgroundColor: "grey", color: "white" }}>
                Acropolis On Facebook
              </Card.Header>
              <Card.Body>
                <img
                  src={acropolis_icon}
                  alt="logo"
                  className="acropolis_facebook_logo"
                />
                <Card.Title className="acropolis_facebook_title">
                  Acropolis Alumni Association
                </Card.Title>
                <Button
                  id="facebook_button"
                  href="https://www.facebook.com/ACRO1INDORE/"
                  target="_blank"
                >
                  Go somewhere
                </Button>
                <label>2.7K Likes</label>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      {/* footer section */}

      <div className="footer">
        <div className="footer_content">
          <Link className="footer_link" to="/">
            Home
          </Link>{" "}
          |
          <Link className="footer_link" to="/Achievements">
            Achievement
          </Link>{" "}
          |
          <Link className="footer_link" to="/event">
           Events
          </Link>{" "}
          |
          <Link className="footer_link" to="/signup">
          SignUp
          </Link>{" "}

        </div>
      </div>
    </div>
  );
};

export default Frontpg;
