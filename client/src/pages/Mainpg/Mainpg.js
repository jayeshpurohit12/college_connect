import React, { useEffect, useState } from "react";
import NavbarrAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import collegeAlumni from "../../images/collegeAlumni.png";
import "./Mainpg.css";
import { Button, Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { BarGraph, PieGraph } from "../PageSrc";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import eventBanner from "../../images/eventBanner.png";
import Banner from "../../components/Banner/Banner";
import Career from "../../components/Career/Career";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../contexts/Authcontext";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Alterpg from "./Alterpg";
import { Card } from "react-bootstrap";
import acropolis_icon from "../../images/acropolis_icon.png";
import { getDocs, collection } from "firebase/firestore";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@mui/material";
import { StateContext } from "../../contexts/StateContext";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Mainpg = () => {
  const [profile, setProfile] = useState({});
  const { currentUser } = useAuth();
  const state = React.useContext(StateContext);
  const [achievements, setAchievements] = state.achievements;
  const [jobs, setJobs] = state.jobs;
  const [internships, setInternships] = state.internships;
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [expert, setExpert] = useState([]);
  const [count, setCount] = useState([]);
  const [company, setCompany] = useState([]);
  const [dataCount, setDataCount] = useState([]);
  const [suggestion, setSuggestion] = useState([]);
  const [countUserInIndia, setCountUserInIndia] = useState(0);
  const [countUserForHigherStudies, setCountUserForHigherStudies] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

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

    const docRef = await getDocs(collection(db, "users"));
    docRef.forEach((doc) => {
      setTotalCount((prev) => prev + 1);
      if (doc.data().country === "India") {
        setCountUserInIndia((prev) => prev + 1);
      }
      if (doc.data().higher === "1") {
        setCountUserForHigherStudies((prev) => prev + 1);
      }
    });
  };

  const fetchdata = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  useEffect(() => {
    fetchGraphData();
  }, []);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await updateDoc(doc(db, "suggestions", currentUser.uid), {
      suggestion: suggestion,
    })
      .then(() => {
        alert("Suggestion Submitted");
      })
      .catch(async (err) => {
        const docRef = await setDoc(doc(db, "suggestions", currentUser.uid), {
          suggestion: suggestion,
          name: profile.name,
        })
          .then(() => {
            alert("Suggestion Submitted");
          })
          .catch((err) => {
            alert("Error Occured");
          });
      });
    handleClose();
  };

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
                padding: "0.4rem 2.4rem",
                backgroundColor: "#3566E5",
              }}
            >
              <span id="connect_btn_heading">Connect</span>
            </Button>
          </Link>
          <Button
            style={{
              margin: "2rem",
              padding: "0.4rem 2.4rem",
              backgroundColor: "#3566E5",
            }}
            onClick={handleOpen}
          >
            <span id="connect_btn_heading">Add any suggestion</span>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
              <Form>
                <Form.Label>
                  <h4>Enter your suggestion</h4>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  id="suggestion"
                  placeholder="suggestion"
                  required
                  onChange={(e) => {
                    setSuggestion(e.target.value);
                  }}
                />
                <Button
                  type="submit"
                  style={{ margin: "1rem" }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Form>
            </div>
          </Modal>
        </div>
        <div className="heading_img_bottom">
          <h1 id="inner_heading">Welcome to Acropolis Alumni Association.</h1>
        </div>
      </div>
      <div className="mainpg_container">
        <div className="mainpg_container_left">
          <div className="event_container">
            {/* <HeaderBar title="Events" button={true} link="/event" />
            <div className="event_banner_img">
              <Banner
                image1="https://mactus.co.in/img/header_img/event.jpg"
                width="100%"
                height="30rem"
                caption={false}
              />
            </div> */}
            <div className="achievement_container">
              <HeaderBar
                title="Achievements"
                button={true}
                link="/Achievements"
              />
              {/* {console.log(achievements)} */}
              {achievements && (
                <div className="inner_achievement_section">
                  <div className="achievement_image">
                    <img
                      src={achievements[0].image}
                      alt=""
                      style={{
                        width: "40%",
                        height: "25rem",
                        borderRadius: "10px",
                      }}
                    />
                    <div className="achievement_caption">
                      <h1>{achievements[0].name}</h1>
                      <p>
                        {achievements[0].awards}
                        <div>{achievements[0].expertise}</div>
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
              {internships && internships.length > 0 ? (
                <Career
                  title="Internship"
                  image={internships[0].image}
                  OpporTitle={internships[0].name}
                  Batch={internships[0].batch}
                />
              ) : (
                <div
                  style={{
                    width: "90%",
                    textAlign: "center",
                    height: "10rem",
                    padding: "2rem",
                  }}
                >
                  No internship recently added
                </div>
              )}
            </div>
            <div className="Job_container">
              <Toolbar className="header_bar" variant="dense">
                <Typography variant="h6" component="div">
                  Jobs
                </Typography>

                <Link to="/Jobs">
                  <Button id="header_button">View All</Button>
                </Link>
              </Toolbar>
              {jobs && jobs.length > 0 ? (
                <Career
                  title="Full Time Jobs"
                  image={jobs[0].image}
                  OpporTitle={jobs[0].name}
                  Batch={jobs[0].batch}
                />
              ) : (
                <div
                  style={{
                    width: "90%",
                    textAlign: "center",
                    height: "10rem",
                    padding: "2rem",
                  }}
                >
                  No Job recently added
                </div>
              )}
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
        </div>
        <div className="mainpg_container_right">
          <Alterpg />
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
      <div className="foter_container">
        <Footer />
      </div>
    </>
  );
};

export default Mainpg;
