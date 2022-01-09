import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./NavbarrAfterLogin.css";
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
              <NavDropdown title="Career" id = "dropdown">
                <NavDropdown.Item href="#action3">Internship</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Jobs</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#memes" className="header_heading text-white">
                Events
              </Nav.Link>
              <Nav.Link href="#memes" className="header_heading text-white">
                Connect
              </Nav.Link>
            </Nav>
          </div>
          <AccountCircleIcon
            fontSize="large"
            style={{ color: "white" }}
            className="account_icon"
          />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navbarr;
