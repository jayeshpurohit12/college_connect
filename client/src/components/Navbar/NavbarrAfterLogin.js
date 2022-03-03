import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./NavbarrAfterLogin.css";
import acropolis_icon from "../../images/acropolis_icon.png";
import { NavLink } from "react-router-dom";

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
              <NavLink
                to="/home"
                style={{ textDecoration: "none" }}
                className="header_heading text-white"
              >
                Home
              </NavLink>

              <NavLink
                to="/Achievements"
                style={{ textDecoration: "none" }}
                className="header_heading text-white"
              >
                Achievement
              </NavLink>

              <NavDropdown
                title="Career"
                id="dropdown"
                style={{ textDecoration: "none" }}
              >
                <NavLink to="/Internships" style={{ textDecoration: "none" }}>
                  <NavDropdown.Item href=" ">Internship</NavDropdown.Item>
                </NavLink>

                <NavLink to="/Jobs" style={{ textDecoration: "none" }}>
                  <NavDropdown.Item href=" ">Jobs</NavDropdown.Item>
                </NavLink>
              </NavDropdown>

              <NavLink
                to="/Events"
                style={{ textDecoration: "none" }}
                className="header_heading text-white"
              >
                Events
              </NavLink>

              <NavLink
                to="/Connect"
                style={{ textDecoration: "none" }}
                className="header_heading text-white"
              >
                Connect
              </NavLink>
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
