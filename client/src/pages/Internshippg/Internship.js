import React from "react";
import { FaFilter } from "react-icons/fa";
import { Button } from "@material-ui/core";
import Dropdown from 'react-bootstrap/Dropdown';
import "./Internship.css";
import internship from "../../images/internship.png";
import CardWithBorder from "../../components/Cards/CardWithBorder";
import NavbarrAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import Footer from "../../components/Footer/Footer";

export default function Opportunitypg() {
  return (
    <div>
      <NavbarrAfterLogin />
      <div className="opp_header">
        <h1 className="opp_header_heading">Internships</h1>
        <Button id="opp_header_button">Post new internship</Button>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="light" style={{ backgroundColor:"#F4F4F4", border:"none",outline:"none", color:"black"}}id="dropdown-basic">
              <FaFilter /> Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Company</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Duration</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Role</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className ="internship_posts">
        <div className="internship_post_container">
        <CardWithBorder width="20rem" image={internship} title="FLY HIGH With an Internship at Microsoft !" content ={<div><p>Batch -2022</p><p>Posted on- 10/5/2021</p></div>} className="internship_posts"/>
        <CardWithBorder width="20rem" image={internship} title="FLY HIGH With an Internship at Microsoft !" content ={<div><p>Batch -2022</p><p>Posted on- 10/5/2021</p></div>} className="internship_posts"/>
        <CardWithBorder width="20rem" image={internship} title="FLY HIGH With an Internship at Microsoft !" content ={<div><p>Batch -2022</p><p>Posted on- 10/5/2021</p></div>} className="internship_posts"/>
        </div>
        <div className="internship_post_container">
        <CardWithBorder width="20rem" image={internship} title="FLY HIGH With an Internship at Microsoft !" content ={<div><p>Batch -2022</p><p>Posted on- 10/5/2021</p></div>} className="internship_posts"/>
        <CardWithBorder width="20rem" image={internship} title="FLY HIGH With an Internship at Microsoft !" content ={<div><p>Batch -2022</p><p>Posted on- 10/5/2021</p></div>} className="internship_posts"/>
        <CardWithBorder width="20rem" image={internship} title="FLY HIGH With an Internship at Microsoft !" content ={<div><p>Batch -2022</p><p>Posted on- 10/5/2021</p></div>} className="internship_posts"/>
        </div>
        
      </div>
      <div className="foter_container">
          <Footer />
        </div>
    </div>
  );
}
