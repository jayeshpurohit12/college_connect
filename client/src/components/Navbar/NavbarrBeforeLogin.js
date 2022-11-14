import React from "react";
import { Navbar, Nav, NavDropdown, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
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
              <Nav.Link href="/" className="header_heading text-white">
                Home
              </Nav.Link>
              <Nav.Link
                href="/Achievements"
                className="header_heading text-white"
              >
                Achievement
              </Nav.Link>
              <Nav.Link
                href="/connect"
                style={{ textDecoration: "none" }}
                className="header_heading text-white"
              >
                Connect
              </Nav.Link>
              <Nav.Link href="/event" className="header_heading text-white">
                Events
              </Nav.Link>
              <NavDropdown
                title="Career"
                id="dropdown"
                style={{ textDecoration: "none" }}
              >
                <Nav.Link
                  href="/Internships"
                  style={{ textDecoration: "none" }}
                >
                  <NavDropdown.Item href="/Internships">
                    Internship
                  </NavDropdown.Item>
                </Nav.Link>

                <Nav.Link href="/Jobs" style={{ textDecoration: "none" }}>
                  <NavDropdown.Item href="/Jobs">Jobs</NavDropdown.Item>
                </Nav.Link>
              </NavDropdown>
            </Nav>
          </div>
          <Link
            to="/signup"
            className="header_btn"
            style={{
              background: "#e8a94b",
              margin: "0 0.3rem",
              padding: "0.5rem 0.5rem",
              color: "black",
              borderRadius: "5px",
              textDecoration: "none",
              marginLeft: "1rem",
            }}
          >
            SignUp / Login
          </Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navbarr;
