import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Alert } from "react-bootstrap";
import "./NavbarrAfterLogin.css";
import acropolis_icon from "../../images/acropolis_icon.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/Authcontext";
import { db } from "../../firebase";
import { Avatar } from "@material-ui/core";
import { doc, getDoc } from "firebase/firestore";

const Navbarr = () => {
  const { currentUser, logout } = useAuth();
  const [profile, setProfile] = useState({});
  const history = useNavigate();
  const [error, setError] = useState("");

  const fetchdata = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setProfile(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      // console.log(currentUser);
      history("/signup");
    } catch {
      setError("Failed to logout");
    }
  };
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
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
                to="/"
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
              <NavLink
                to="/exp"
                style={{ textDecoration: "none" }}
                className="header_heading text-white"
              >
                Articles / Stories
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
                to="/event"
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

              <NavDropdown
                id="dropdown"
                style={{ textDecoration: "none", marginRight: "0rem" }}
              >
                <NavLink to="/userProfile" style={{ textDecoration: "none" }}>
                  <NavDropdown.Item href="/userProfile">
                    View Profile
                  </NavDropdown.Item>
                </NavLink>
                <NavLink to="/details" style={{ textDecoration: "none" }}>
                  <NavDropdown.Item href="/userProfile">
                    Update Profile
                  </NavDropdown.Item>
                </NavLink>
                <Button style={{ margin: "1rem" }} onClick={handleLogout}>
                  logout
                </Button>
              </NavDropdown>

              <Avatar
                alt="Remy Sharp"
                src={profile.image}
                fontSize="large"
                style={{ color: "white", marginLeft: "0rem" }}
                className="account_icon"
              />
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navbarr;
