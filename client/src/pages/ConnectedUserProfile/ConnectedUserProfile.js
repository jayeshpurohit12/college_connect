import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userProfileimg from "../../images/userProfileimg.png";
import "./ConnectedUserProfile.css";
import { Button } from "react-bootstrap";
import NavbarAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import AcroFrontImg from "../../images/AcroFrontImg.png";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CakeIcon from "@material-ui/icons/Cake";
import WcIcon from "@material-ui/icons/Wc";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Chatroom from "../Chatroom/Chatroom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "90%",
    height: "90vh",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ConnectedUserProfile = () => {
  const { id } = useParams();
  const skillSet = [];
  const [profile, setProfile] = useState([]);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchcurrentUser = async () => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
    }
  };

  useEffect(() => {
    fetchcurrentUser();
  }, []);

  return (
    <>
      <NavbarAfterLogin />
      <div className="Profile_header_img_container">
        <img className="Acro_Image_header" src={AcroFrontImg} alt="Acropolis" />
        <div className="details_container">
          {/* Left Container  */}

          <div className="left_container">
            <div className="profile_info_container">
              <div className="img_container">
                <div className="img_container">
                  {profile.image ? (
                    <img
                      className="userprofile"
                      src={profile.image}
                      alt="user"
                    />
                  ) : (
                    <img
                      className="userprofile"
                      src={userProfileimg}
                      alt="user"
                    />
                  )}
                </div>
              </div>
              <div className="user_name">
                <h1 className="name">{profile.name}</h1>
              </div>
              <div className="user_passing_year">
                <h2 className="year">
                  Student, Class of{" "}
                  {profile.end ? profile.end.substring(0, 4) : ""}
                </h2>
              </div>
              <div className="user_branch">
                <h2 className="branch">
                  {profile.degree} , {profile.specialisation}
                </h2>
              </div>
              <div className="social_media_icons">
                <a href={profile.linkedin} target="_blank">
                  <LinkedInIcon
                    className="linkedinIcon"
                    style={{ color: "royalblue" }}
                    fontSize="large"
                  />
                </a>
                <a target="_blank" href={profile.git}>
                  <GitHubIcon fontSize="large" />
                </a>
              </div>
              <div className="message_button_container">
                <center>
                  <Button
                    style={{ padding: "0.5rem 2rem" }}
                    onClick={handleOpen}
                  >
                    Message
                  </Button>
                </center>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div style={modalStyle} className={classes.paper}>
                    <Chatroom
                      id={id}
                      name={profile.name}
                      image={profile.image}
                    />
                  </div>
                </Modal>
              </div>
            </div>

            <div className="contact_information_container">
              <div className="heading_and_edit">
                <div className="heading">
                  <h2 className="info_heading">Contact Information</h2>
                </div>
              </div>
              <div className="contact_inner_info">
                <div className="email_info info">
                  <EmailIcon />
                  <div className="contact_text">
                    <h2 className="email_text info_text">{profile.email}</h2>
                  </div>
                </div>
                <div className="phone_info info">
                  <PhoneInTalkIcon fontSize="medium" />

                  <h2 className="phone_text info_text">{profile.phone}</h2>
                </div>
              </div>
            </div>

            <div className="Expertise_container">
              <div className="heading_and_edit">
                <div className="heading">
                  <h2 className="info_heading">Expertise</h2>
                </div>
              </div>
              <div className="Expertise_inner_info">
                <div className="expertise_heading">
                  <h2 className="expertise_text">Skills : </h2>
                </div>

                <div className="skills_set">
                  {profile.skills
                    ? profile.skills.forEach((item, i) =>
                        skillSet.push(
                          <span
                            key={i}
                            className="badge bg-primary skill_badges"
                          >
                            {item}
                          </span>
                        )
                      )
                    : ""}
                  {skillSet}
                </div>
              </div>
            </div>

            <div className="Basic_indo_container">
              <div className="heading_and_edit">
                <div className="heading">
                  <h2 className="info_heading">Basic Information</h2>
                </div>
              </div>
              <div className="Basic_inner_info">
                <div className="location info">
                  <LocationOnIcon />
                  <h2 className="location_info info_text">
                    {profile.location}
                  </h2>
                </div>
                <div className="dob info">
                  <CakeIcon />
                  <h2 className="dob_info info_text">{profile.dob}</h2>
                </div>
                <div className="gender info">
                  <WcIcon />
                  <h2 className="gender_info info_text">
                    {profile.gender == 1 ? "male" : "female"}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Right Container */}

          <div className="right_container">
            <div className="summary">
              <div className="right_heading_and_edit">
                <div className="heading">
                  <h2 className="info_heading">Summary</h2>
                </div>
              </div>
              <div className="right_summary_para">
                <p>{profile.summary}</p>
              </div>
            </div>
            <div className="Education_container">
              <div className="right_heading_and_edit">
                <div className="heading">
                  <h2 className="info_heading">Education</h2>
                </div>
              </div>
              <div className="Education_details">
                <div className="clla_name">
                  <h2 className="right_heading">
                    Acropolis Institute of Technology and Research
                  </h2>
                </div>
                <div className="Dept_and_Branch">
                  <h2 className="Degree_name">{profile.degree} , </h2>
                  <h2 className="branch_name">{profile.specialisation}</h2>
                </div>
                <div className="grad_year">
                  <h2 className="grad_year_name">
                    {profile.std ? profile.std.substring(0, 4) : ""} -{" "}
                    {profile.end ? profile.end.substring(0, 4) : ""}
                  </h2>
                </div>
              </div>
            </div>
            <div className="Work_Experience_Container">
              <div className="right_heading_and_edit">
                <div className="heading">
                  <h2 className="info_heading">Work Experience</h2>
                </div>
              </div>
              <div className="work_experience_inner_container">
                <div className="company_name_container">
                  <h2 className="title">Company Name: </h2>
                  <h2 className="company_name">{profile.company}</h2>
                </div>
                <div className="your_position">
                  <h2 className="title">Your Position: </h2>
                  <h2 className="your_title">{profile.position}</h2>
                </div>
                <div className="technology_used">
                  <h2 className="title">Tech Stack: </h2>
                  <h2 className="tech_stack">{profile.tech}</h2>
                </div>

                <div className="work_experience_description">
                  <h2 className="title">Description: </h2>
                  <p className="work_description">{profile.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectedUserProfile;

