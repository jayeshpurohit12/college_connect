import React from "react";
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
  return (
    <div>
      <Navbar />

      <div className="main_section">
        {/*  main - left - section */}

        <div className="main_left_section">
          <Banner
            image="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
            width="97%"
            height="32rem"
            caption={true}
          />
          <div className="achievement_section">
            <HeaderBar title="Achievement" button="false" />
            <OwlCarousel
              style={{ width: "90%", marginTop: "0.5rem", marginLeft: "4rem" }}
              className="owlCarousel"
              loop
              margin={3}
              nav
            >
              <div className="carousel_item">
                <Cards
                  button={false}
                  width="12rem"
                  image={profile}
                  title="Mrs Nidhi Nigam"
                  content={
                    <div>
                      <p>Computer Science</p>
                      <p>Computational Methods and Database Expert.</p>
                    </div>
                  }
                />
              </div>
              <div className="carousel_item">
                <Cards
                  width="12rem"
                  button={false}
                  image={profile}
                  title="Mrs Nidhi Nigam"
                  content={
                    <div>
                      <p>Computer Science</p>
                      <p>Computational Methods and Database Expert.</p>
                    </div>
                  }
                />
              </div>
              <div className="carousel_item">
                <Cards
                  width="12rem"
                  image={profile}
                  button={false}
                  title="Mrs Nidhi Nigam"
                  content={
                    <div>
                      <p>Computer Science</p>
                      <p>Computational Methods and Database Expert.</p>
                    </div>
                  }
                />
              </div>
            </OwlCarousel>
          </div>
          <div>
            <HeaderBar title="Event" button={true} />
            <OwlCarousel
              className="owl_carousel"
              style={{ width: "90%", marginTop: "0.5rem", marginLeft: "4rem" }}
              loop
              margin={5}
              nav
            >
              <div className="carousel_item">
                <Cards
                  width="15rem"
                  title="Event title"
                  button={true}
                  image={Eventcarouselimg}
                  content={
                    <div>
                      <Badge
                        bg="secondary"
                        style={{ fontSize: "0.8rem", margin: "0.5rem" }}
                      >
                        Past Event
                      </Badge>{" "}
                      <div>
                        <CalendarTodayIcon />
                        <span> Sep25,2021 : 04:00 PM - 05:00 PM</span>
                      </div>
                      <div>
                        <PowerSettingsNewIcon />
                        <span> Online Mode</span>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="carousel_item">
                <Cards
                  width="15rem"
                  title="Event title"
                  button={true}
                  image={Eventcarouselimg}
                  content={
                    <div>
                      <Badge
                        bg="secondary"
                        style={{ fontSize: "0.8rem", margin: "0.5rem 0rem" }}
                      >
                        Past Event
                      </Badge>{" "}
                      <div>
                        <CalendarTodayIcon />
                        <span> Sep25,2021 : 04:00 PM - 05:00 PM</span>
                      </div>
                      <div>
                        <PowerSettingsNewIcon />
                        <span> Online Mode</span>
                      </div>
                    </div>
                  }
                />
              </div>
              <div className="carousel_item">
                <Cards
                  width="15rem"
                  title="Event title"
                  button={true}
                  image={Eventcarouselimg}
                  content={
                    <div>
                      <Badge
                        bg="secondary"
                        style={{ fontSize: "0.8rem", margin: "0.5rem" }}
                      >
                        Past Event
                      </Badge>{" "}
                      <div>
                        <CalendarTodayIcon />
                        <span> Sep25,2021 : 04:00 PM - 05:00 PM</span>
                      </div>
                      <div>
                        <PowerSettingsNewIcon />
                        <span> Online Mode</span>
                      </div>
                    </div>
                  }
                />
              </div>
            </OwlCarousel>
          </div>
        </div>

        {/* main- right -section */}

        <div className="main_right_section">
          <Connection />
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
                <Button id="facebook_button">Go somewhere</Button>
                <label>24 Likes</label>
              </Card.Body>
            </Card>
            <div className="acropolis_facebook_post">
              <Cards
                button={false}
                width="19rem"
                image={video}
                title={
                  <>
                    <img
                      src={acropolis_icon}
                      className="acropolis_facebook_logo"
                      style={{ width: "25%" }}
                      alt=""
                    />
                    <h5
                      className="acropolis_facebook_title"
                      style={{ width: "65%" }}
                    >
                      Acropolis Alumni Association
                    </h5>
                    <label></label>
                  </>
                }
                content="Acropolis is going to organise the event today on 25 September
            . Do join the event and have fun."
              />
            </div>
          </div>
        </div>
      </div>

      {/* footer section */}

      <div className="footer">
        <div className="footer_content">
          <Link className="footer_link">Home</Link> |
          <Link className="footer_link">About</Link> |
          <Link className="footer_link">Contact</Link> |
          <Link className="footer_link">Term</Link> |
          <Link className="footer_link">Privacy</Link>
        </div>
      </div>
    </div>
  );
};

export default Frontpg;
