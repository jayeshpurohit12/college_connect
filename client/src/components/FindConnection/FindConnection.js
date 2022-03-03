import React from "react";
import "./FindConnection.css";
import connectionIcon from "../../images/connectionIcon.png";
import SearchIcon from "@material-ui/icons/Search";
import ConnectorsProfile from "./ConnectorsProfile";

const FindConnection = () => {
  return (
    <>
      <div className="connection">
        <div className="conn_container">
          <div className="heading_container heading_and_edit">
            <img className="connect_img" src={connectionIcon} alt="connect" />
            <h2 className="connect_heading">Connections</h2>
          </div>
        </div>
        <div className="search_container">
          <div className="input_cont">
            <input
              className="search_input"
              type="text"
              placeholder="Search..."
            />
          </div>
          <SearchIcon fontSize="large" />
        </div>
        <div className="connectors_profile_container">
          <ConnectorsProfile name="Jayesh Purohit" expertise="Reactjs, C/C++" />
          <ConnectorsProfile
            name="Sneha Balduwa"
            expertise="C/C++, Html, CSS"
          />
          <ConnectorsProfile name="Urmi Chauhan" expertise="Reactjs, C/C++" />
          <ConnectorsProfile name="Akash Agrawal" expertise="UI/UX, C/C++" />
          <ConnectorsProfile
            name="Amol Paliwal"
            expertise="Machine Learning, C/C++"
          />
        </div>
      </div>
    </>
  );
};

export default FindConnection;
