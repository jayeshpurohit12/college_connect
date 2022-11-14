import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/NavbarrBeforeLogin";
import { StateContext } from "../../contexts/StateContext";
import "./Frontpg.css";
import { Link } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "@material-ui/core/Button";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import OwlCarousel from "react-owl-carousel";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import acropolis_icon from "../../images/acropolis_icon.png";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { BarGraph, PieGraph } from "../PageSrc";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Alterpg from "../Mainpg/Alterpg";

const Frontpg = () => {
  const [events, setEvents] = useState([]);
  const [length, setLength] = useState(0);
  const [length1, setLength1] = useState(0);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  var d = new Date();
  const state = React.useContext(StateContext);
  const [achievements, setAchievements] = useState([]);
  const [data, setData] = useState([]);
  const [expert, setExpert] = useState([]);
  const [count, setCount] = useState([]);
  const [company, setCompany] = useState([]);
  const [dataCount, setDataCount] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const countUserInIndia = state.countUserInIndia;
  const countUserForHigherStudies = state.countUserForHigherStudies;
  const totalCount = state.totalCount;

  const fetchGraphData = async () => {
    setLoading(false);
    setLabels([]);
    setData([]);
    setExpert([]);
    setCount([]);
    setCompany([]);
    setDataCount([]);
    const querySnapshot = await getDocs(collection(db, "batch"));
    querySnapshot.forEach((doc) => {
      setLabels((oldArray) => [...oldArray, doc.id]);
      setData((oldArray) => [...oldArray, doc.data().uid.length]);
    });

    const querySnapshot1 = await getDocs(collection(db, "expertise"));
    querySnapshot1.forEach((doc) => {
      setExpert((oldArray) => [...oldArray, doc.id]);
      setCount((oldArray) => [...oldArray, doc.data().uid.length]);
    });
    const querySnapshot2 = await getDocs(collection(db, "company"));
    querySnapshot2.forEach((doc) => {
      setCompany((oldArray) => [...oldArray, doc.id]);
      setDataCount((oldArray) => [...oldArray, doc.data().uid.length]);
    });
  };

  const fetchAchievements = async () => {
    const res = await fetch(`/achievements`);
    const data = await res.json();
    setAchievements(data);
    if (data.length < 3) {
      setLength1(data.length);
    } else {
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

  useEffect(() => {
    fetchGraphData();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="main_section">
        
        {/*  main - left - section */}
        <div className="main_left_section">
          <div className="achievement_section">
            <HeaderBar title="Achievement" button={true} link="/Achievements" />
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
                      <Card style={{ width: "15rem", height: "20rem" }}>
                        <Card.Img
                          variant="top"
                          src={achievement.image}
                          style={{ height: "45%" }}
                        />
                        <Card.Body>
                          <Card.Text>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
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
                style={{
                  marginTop: "0.5rem",
                  width:(length < 3)? "70%" : "90%",
                  justifyContent: "center",
                }}
                loop
                margin={3}
                items={length}
                nav
              >
                {console.log(events.length)}
                {events?.map((event, id) => {
                  return (
                    <div className="carousel_item" key={id}>
                      <Card style={{ width: "15rem", height: "20rem" }}>
                        <Card.Img
                          variant="top"
                          src={event.image}
                          style={{ height: "45%" }}
                        />
                        <Card.Body>
                          <Card.Text>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <h4>{event.name}</h4>
                                <p style={{ margin: "1rem" }}>
                                  <strong>
                                    <CalendarTodayIcon /> Date:
                                  </strong>{" "}
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
          <HeaderBar title="Analysis" button={false} link="" />
          <div className="graph_container_a">
           
            <div className="pie_graph_cont">
              {/* <h3>Analytics</h3> */}
              <div className="pie_container_a">
                <PieGraph
                  labels={["India", "Abroad"]}
                  data={[countUserInIndia, totalCount - countUserInIndia]}
                  heading="No of People moved out of India"
                />
              </div>
              <div className="pie_container_a">
                <PieGraph
                  labels={["Higher Studies", "Job"]}
                  data={[
                    countUserForHigherStudies,
                    totalCount - countUserForHigherStudies,
                  ]}
                  heading="No of People pursuing higher studies"
                />
              </div>
            </div>
            <div className="bar_graph_cont">
              <div className="bar_container_a">
                <BarGraph
                  labels={labels}
                  data={data}
                  heading="No of Users in particular batch"
                />
              </div>
              <div className="bar_container_a">
                <BarGraph
                  labels={expert}
                  data={count}
                  heading="No of People in particular technology"
                />
              </div>
              <div className="bar_container_a">
                <BarGraph
                  labels={company}
                  data={dataCount}
                  heading="No of People in particular company"
                />
              </div>
            </div>
          </div>
        </div>

        {/* main- right -section */}

        <div className="main_right_section">
          <Alterpg />
          {/* <Connection /> */}
          {/* <OverlayCard
            title="Job Portal"
            text="Exchange job from your company with fellow alumni"
            image={job_background}
          />
          <OverlayCard
            title="Alumni Guidance"
            text="Give advice to your fellow alumni or take guidance from alumni"
            image={job_background}
          /> */}
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
