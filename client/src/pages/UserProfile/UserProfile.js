import React from "react";
import "./UserProfile.css";
import NavbarAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import AcroFrontImg from "../../images/AcroFrontImg.png";
import UserProfileimg from "../../images/userProfileimg.png";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import EditIcon from "@material-ui/icons/Edit";
import EmailIcon from "@material-ui/icons/Email";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CakeIcon from "@material-ui/icons/Cake";
import WcIcon from "@material-ui/icons/Wc";
import FindConnection from "../../components/FindConnection/FindConnection";
import Footer from "../../components/Footer/Footer";

const UserProfile = () => {
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
                  src={UserProfileimg}
                  alt="userProfile"
                />
              </div>
              <div className="user_name">
                <h1 className="name">Akash Agrawal</h1>
              </div>
              <div className="user_passing_year">
                <h2 className="year">Student, Class of 2023</h2>
              </div>
              <div className="user_branch">
                <h2 className="branch">B.Tech, Computer Science</h2>
              </div>
              <div className="social_media_icons">
                <LinkedInIcon
                  className="linkedinIcon"
                  style={{ color: "royalblue" }}
                  fontSize="large"
                />
                <GitHubIcon fontSize="large" />
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
                  <h2 className="email_text info_text">
                    akashagrawalct19@acropolis.in
                  </h2>
                </div>
                <div className="phone_info info">
                  <PhoneInTalkIcon fontSize="medium" />
                  <h2 className="phone_text info_text">7458589654</h2>
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
                  <p className="expertise_para">HTML</p>
                  <p className="expertise_para">JavaScript</p>
                  <p className="expertise_para">CSS</p>
                  <p className="expertise_para">Reactjs</p>
                  <p className="expertise_para">Angularjs</p>
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
                  <h2 className="location_info info_text">Indore, India</h2>
                </div>
                <div className="dob info">
                  <CakeIcon />
                  <h2 className="dob_info info_text">26 Sept, 2001</h2>
                </div>
                <div className="gender info">
                  <WcIcon />
                  <h2 className="gender_info info_text">Male</h2>
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
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam, non enim dignissimos magni cupiditate nihil. Error,
                  cum assumenda sapiente, veniam vitae ut ipsa nihil, iste
                  eligendi nisi placeat id natus. Libero maiores ex earum cum
                  possimus dolorem voluptatum praesentium vero voluptatem
                  doloremque consequuntur ab ipsam voluptas, quisquam obcaecati
                  est mollitia laborum impedit.
                </p>
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
                  <h2 className="Degree_name">B.Tech, </h2>
                  <h2 className="branch_name">
                    Computer Science and Technology
                  </h2>
                </div>
                <div className="grad_year">
                  <h2 className="grad_year_name">2019 - 2023 </h2>
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
                  <h2 className="company_name">DevIncept</h2>
                </div>
                <div className="your_position">
                  <h2 className="title">Your Position: </h2>
                  <h2 className="your_title">Student Contributor</h2>
                </div>
                <div className="technology_used">
                  <h2 className="title">Tech Stack: </h2>
                  <h2 className="tech_stack">MERN Stack</h2>
                </div>

                <div className="work_experience_description">
                  <h2 className="title">Description: </h2>
                  <p className="work_description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Numquam perferendis velit eligendi, enim non nobis sunt
                    aspernatur blanditiis consequuntur atque similique vitae
                    dicta suscipit impedit animi quasi corrupti, at ut. Eveniet
                    repellendus quibusdam consequatur molestias voluptates
                    dignissimos ipsum, exercitationem molestiae modi, eligendi a
                    reprehenderit dolorum ab dolores sit, obcaecati sed?
                  </p>
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
