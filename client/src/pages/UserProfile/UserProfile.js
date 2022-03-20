import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Badge } from "react-bootstrap";
import NavbarAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import AcroFrontImg from "../../images/AcroFrontImg.png";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import EditIcon from "@material-ui/icons/Edit";
import EmailIcon from "@material-ui/icons/Email";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CakeIcon from "@material-ui/icons/Cake";
import WcIcon from "@material-ui/icons/Wc";
import FindConnection from "../../components/FindConnection/FindConnection";
import { useAuth } from "../../contexts/Authcontext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({});
  const [skillSet, setSkillSet] = useState([]);

  const fetchdata = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setProfile(docSnap.data());
      if (profile.skills) {
        setSkillSet(profile.skills.split(","));
      }
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
      <NavbarAfterLogin />
      <div className="Profile_header_img_container">
        <img className="Acro_Image_header" src={AcroFrontImg} alt="Acropolis" />
        <div className="details_container">
          {/* Left Container  */}

          <div className="left_container">
            <div className="profile_info_container">
              <div className="img_container">
                <img
                  className="userprofile"
                  src={profile.image}
                  alt="userProfile"
                />
              </div>
              <div className="user_name">
                <h1 className="name">{profile.name}</h1>
              </div>
              <div className="user_passing_year">
                <h2 className="year">
                  Student, Class of{" "}
                  {profile.yop ? profile.yop.substring(0, 4) : ""}
                </h2>
              </div>
              <div className="user_branch">
                <h2 className="branch">
                  {profile.degree} , {profile.specialisation}
                </h2>
              </div>
              <div className="social_media_icons">
                <a target="_blank" href={profile.linkedin}>
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
            </div>

            <div className="contact_information_container">
              <div className="heading_and_edit">
                <div className="heading">
                  <h2 className="info_heading">Contact Information</h2>
                </div>
                <div className="edit_icon">
                  <EditIcon fontSize="large" style={{ color: "tomato" }} />
                </div>
              </div>
              <div className="contact_inner_info">
                <div className="email_info info">
                  <EmailIcon />
                  <h2 className="email_text info_text">{currentUser.email}</h2>
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
                <div className="edit_icon">
                  <EditIcon fontSize="large" style={{ color: "tomato" }} />
                </div>
              </div>
              <div className="Expertise_inner_info">
                <div className="expertise_heading">
                  <h2 className="expertise_text">Skills : </h2>
                </div>

                <div className="skills">
                  {skillSet.forEach((item) => {
                    console.log(item);
                    return (
                      <p className="skill_badges">
                        <h5>
                          <Badge bg="info">{item}</Badge>{" "}
                        </h5>
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="Basic_indo_container">
              <div className="heading_and_edit">
                <div className="heading">
                  <h2 className="info_heading">Basic Information</h2>
                </div>
                <div className="edit_icon">
                  <EditIcon fontSize="large" style={{ color: "tomato" }} />
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
                <div className="edit_icon">
                  <EditIcon fontSize="large" style={{ color: "tomato" }} />
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
                <div className="edit_icon">
                  <EditIcon fontSize="large" style={{ color: "tomato" }} />
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
                <div className="edit_icon">
                  <EditIcon fontSize="large" style={{ color: "tomato" }} />
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
            <div className="connection_container">
              <FindConnection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
