import React from "react";
import NavbarrAfterLogin from "../../../components/Navbar/NavbarrAfterLogin";
import Footer from "../../../components/Footer/Footer";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "./EventInnerPage.css";
import EventCard from "../../../components/EventCard/EventCard";

const EventInnerPage = (props) => {
  return (
    <>
      <NavbarrAfterLogin />
      <div className="event_inner_heading_container">
        <div className="event_inner_heading">
          <h1>Resume Writing Workshop</h1>
          <div className="event_inner_heading_date">
            <CalendarTodayIcon />
            <span> Monday, Oct 05,2021</span>
          </div>
        </div>
      </div>
      <div className="event_innerpg_content">
        <div className="event_inner_content_left">
          <EventCard
            title="Online Event"
            startdate="Tue, Oct 05, 2021"
            enddate="Tue, Oct 05, 2021"
            starttime="3:30 P.M."
            endtime="5:00 P.M."
          />
        </div>
        <div className="event_inner_content_right">
          <h2 id="event-heading">DESCRIPTION</h2>
          <p className="event_inner_paras">
            <strong>
              “The beginning is the most important part of the work.” — Plato💫
            </strong>
          </p>
          <p className="event_inner_paras">
            *Hola Acropolians!!✨ Are you willing to learn new technology and
            Skills?✨✨
          </p>
          <p className="event_inner_paras">
            If yes then you are at the right place CSIT department 🌟 invites
            you to Skllin - a prepare for career workshop Join us to have a
            quick hands-on Processing of a graphical library and integrated
            development environment followed by a session on formulating a
            winning resume and encouraging the students to prepare for the
            placements.
          </p>
          <p className="event_inner_paras">
            <strong>Date: </strong>4th-5th October
          </p>
          <p className="event_inner_paras">
            <strong>Time: </strong>3:30-5:00 P.M.
          </p>
          <p className="event_inner_paras">
            <strong>Link: </strong>
            <a href="https://www.youtube.com/watch?v=H6XQXM1cJkY">
              https://www.youtube.com/watch?v=H6XQXM1cJkY
            </a>
          </p>
          <p className="event_inner_paras">
            All the participants will get e-certificate{" "}
          </p>
          <p className="event_inner_paras">
            <strong>Student coordinator </strong>
            <br></br>
            Khushi Soni(8770XXXXX)
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventInnerPage;
