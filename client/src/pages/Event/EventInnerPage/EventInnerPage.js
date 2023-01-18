import React, { useState, useEffect } from "react";
import NavbarrAfterLogin from "../../../components/Navbar/NavbarrAfterLogin";
import NavbarrBeforeLogin from "../../../components/Navbar/NavbarrBeforeLogin";
import Footer from "../../../components/Footer/Footer";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "./EventInnerPage.css";
import EventCard from "../../../components/EventCard/EventCard";
import { useParams } from "react-router-dom";
import { connectStorageEmulator } from "firebase/storage";
import { useAuth } from "../../../contexts/Authcontext";

const EventInnerPage = () => {
  const { id } = useParams();
  console.log(id);
  const [event, setEvent] = useState({});
  const { currentUser } = useAuth();

  const fetchEvents = async () => {
    const res = await fetch(`/event`);
    // console.log(res)
    const data = await res.json();
    const eventid = data.map((data) => data).filter((data) => data._id === id);
    setEvent(eventid[0]);
    //  console.log(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      {currentUser ? <NavbarrAfterLogin /> : <NavbarrBeforeLogin />}

      <div className="event_inner_heading_container">
        <div className="event_inner_heading">
          <h1>{event.name}</h1>
          <div className="event_inner_heading_date">
            <CalendarTodayIcon />
            <span> {event.date && event.date.substring(0, 10)}</span>
          </div>
        </div>
      </div>
      <div className="event_innerpg_content">
        <div className="event_inner_content_left">
          <EventCard
            title={event.name}
            startdate={event.date}
            starttime={event.startTime}
            endtime={event.endTime}
            image={event.image}
          />
        </div>
        <div className="event_inner_content_right">
          <h2 id="event-heading">DESCRIPTION</h2>
          <p className="event_inner_paras"></p>
          <p className="event_inner_paras"></p>
          <p className="event_inner_paras">{event.description}</p>
          <p className="event_inner_paras">
            <strong>Date: </strong>
            {event.date}
          </p>
          <p className="event_inner_paras">
            <strong>Time: </strong>
            {event.startTime} - {event.endTime}
          </p>
          {/* <p className="event_inner_paras">
            <strong>Link: </strong>
            <a href="https://www.youtube.com/watch?v=H6XQXM1cJkY">
              https://www.youtube.com/watch?v=H6XQXM1cJkY
            </a>
          </p> */}
          {/* <p className="event_inner_paras">
            All the participants will get e-certificate{" "}
          </p> */}
          {/* <p className="event_inner_paras">
            <strong>Student coordinator </strong>
            <br></br>
            Khushi Soni(8770XXXXX)
          </p> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventInnerPage;
