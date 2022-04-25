import React, { useState, useEffect } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Button, Card } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import eventcard from "../../images/eventcard.png";
import "./Eventsections.css";

const Eventsections = (props) => {
  var d = new Date();

  const [events, setEvent] = useState([]);

  const fetchData = async () => {
    const res = await fetch(`/event`);
    const data = await res.json();
    setEvent(data);
    // console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="event_section_container">
      <div className="event_section_inner_heading">
        <h2>{props.title}</h2>
        <DropdownButton
          variant="secondary"
          id="dropdown-basic-button"
          title="Category"
        >
          <Dropdown.Item href="#/action-1">Sport</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Tech</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Webinar</Dropdown.Item>
        </DropdownButton>
      </div>

      <div className="event_card_container">
        {events.map((event) => {
          if (
            parseInt(event.date.substring(8, 10)) === d.getDate() &&
            parseInt(event.date.substring(5, 7)) === d.getMonth() + 1 &&
            parseInt(event.date.substring(0, 4)) === d.getFullYear()
          ) {
            if (
              parseInt(event.startTime.substring(0, 2)) > d.getHours() ||
              (parseInt(event.startTime.substring(0, 2)) === d.getHours() &&
                parseInt(event.startTime.substring(3, 5)) > d.getMinutes())
            ) {
              console.log(event);
              console.log("Upcomming Event Date");
              <Card
                style={{
                  maxWidth: "20rem",
                  borderRadius: "15px",
                  margin: "1rem",
                }}
              >
                <Card.Img variant="top" src={eventcard} />
                <Card.Body>
                  <div className="event_card_content">
                    <div>
                      <Card.Title>Sep 18</Card.Title>
                    </div>
                    <div className="left_card_content">
                      <Card.Title>
                        <center>{event.name}</center>
                      </Card.Title>
                      <Card.Text>
                        {event.description.substring(0, 100)}
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>;
            } else if (
              parseInt(event.endTime.substring(0, 2)) < d.getHours() ||
              (parseInt(event.endTime.substring(0, 2)) === d.getHours() &&
                parseInt(event.endTime.substring(3, 5)) < d.getMinutes())
            ) {
              console.log(event);
              console.log("Previous Event Date");

              <Card
                style={{
                  maxWidth: "20rem",
                  borderRadius: "15px",
                  margin: "1rem",
                }}
              >
                <Card.Img variant="top" src={event.image} />
                <Card.Body>
                  <div className="event_card_content">
                    <div>
                      <Card.Title>Sep 18</Card.Title>
                    </div>
                    <div className="left_card_content">
                      <Card.Title>
                        <center>{event.name}</center>
                      </Card.Title>
                      <Card.Text>
                        {event.description.substring(0, 100)}
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>;
            } else {
              console.log(event);
              console.log("Live Event Date");

              <Card
                style={{
                  maxWidth: "20rem",
                  borderRadius: "15px",
                  margin: "1rem",
                }}
              >
                <Card.Img variant="top" src={event.image} />
                <Card.Body>
                  <div className="event_card_content">
                    <div>
                      <Card.Title>Sep 18</Card.Title>
                    </div>
                    <div className="left_card_content">
                      <Card.Title>
                        <center>{event.name}</center>
                      </Card.Title>
                      <Card.Text>
                        {event.description.substring(0, 100)}
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>;
            }
          } else if (
            parseInt(event.date.substring(5, 7)) <= d.getMonth() + 1 &&
            parseInt(event.date.substring(0, 4)) <= d.getFullYear()
          ) {
            if (
              parseInt(event.date.substring(5, 7)) < d.getMonth() + 1 ||
              parseInt(event.date.substring(8, 10)) < d.getDate()
            ) {
              console.log(event);
              console.log("Previous check Event Date");

              <Card
                style={{
                  maxWidth: "20rem",
                  borderRadius: "15px",
                  margin: "1rem",
                }}
              >
                <Card.Img variant="top" src={event.image} />
                <Card.Body>
                  <div className="event_card_content">
                    <div>
                      <Card.Title>Sep 18</Card.Title>
                    </div>
                    <div className="left_card_content">
                      <Card.Title>
                        <center>{event.name}</center>
                      </Card.Title>
                      <Card.Text>
                        {event.description.substring(0, 100)}
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>;
            }
          } else {
            console.log(event);
            console.log("Upcomming check Event Date");

            <Card
              style={{
                maxWidth: "20rem",
                borderRadius: "15px",
                margin: "1rem",
              }}
            >
              <Card.Img variant="top" src={event.image} />
              <Card.Body>
                <div className="event_card_content">
                  <div>
                    <Card.Title>Sep 18</Card.Title>
                  </div>
                  <div className="left_card_content">
                    <Card.Title>
                      <center>{event.name}</center>
                    </Card.Title>
                    <Card.Text>{event.description.substring(0, 100)}</Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>;
          }
        })}
        {/* <Card
          style={{ maxWidth: "20rem", borderRadius: "15px", margin: "1rem" }}
        >
          <Card.Img variant="top" src={eventcard} />
          <Card.Body>
            <div className="event_card_content">
              <div>
                <Card.Title>Sep 18</Card.Title>
              </div>
              <div className="left_card_content">
                <Card.Title>
                  <center>Indonesia Conference</center>
                </Card.Title>
                <Card.Text>
                  Acropolis Institute of Technology and Research Indore, Madhya
                  Pradesh.
                </Card.Text>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ maxWidth: "20rem", borderRadius: "15px" }}>
          <Card.Img variant="top" src={eventcard} />
          <Card.Body>
            <div className="event_card_content">
              <div>
                <Card.Title>Sep 18</Card.Title>
              </div>
              <div className="left_card_content">
                <Card.Title>
                  <center>Indonesia Conference</center>
                </Card.Title>
                <Card.Text>
                  Acropolis Institute of Technology and Research Indore, Madhya
                  Pradesh.
                </Card.Text>
              </div>
            </div>
          </Card.Body>
        </Card> */}
      </div>
      <Button variant="secondary" className="card_button">
        View All
      </Button>
    </div>
  );
};

export default Eventsections;
