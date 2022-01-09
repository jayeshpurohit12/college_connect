import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import "./NavbarBeforeLogin.css";
import acropolis_icon from "../../images/acropolis_icon.png";

const Navbarr = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" style={{ background: "#4d8686" }}>
        <div className="header_logo">
          <Navbar.Brand href="#home">
            <img src={acropolis_icon} alt="Acropolis" className="Acro_icon" />
          </Navbar.Brand>
          <div className="header_title">
            <h3 className="heading">
              <span className="heading1">ALUMNI</span>{" "}
              <span className="heading2">ASSOCIATION</span>
            </h3>
          </div>
        </div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="inner_navbar">
            <Nav className="navbar_links">
              <Nav.Link href="#deets" className="header_heading text-white">
                Home
              </Nav.Link>
              <Nav.Link href="#memes" className="header_heading text-white">
                Achievement
              </Nav.Link>
              <Nav.Link href="#memes" className="header_heading text-white">
                Events
              </Nav.Link>
              <Nav.Link href="#memes" className="header_heading text-white">
                Contact Us
              </Nav.Link>
            </Nav>
          </div>
          <Button
            className="header_btn"
            style={{
              background: "#e8a94b",
              margin: "0 0.3rem",
              marginLeft: "1rem",
            }}
          >
            SignUp / Login
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navbarr;
