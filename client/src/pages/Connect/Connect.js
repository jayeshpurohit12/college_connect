import React from "react";
import "./Connect.css";
import NavbarrAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import SearchIcon from "@material-ui/icons/Search";
import Filter from "../../components/ConnectFilter/Filter";
import ConnectUserDiv from "../../components/ConnectBlock/ConnectUserDiv";
import Footer from "../../components/Footer/Footer";

const Connect = () => {
  return (
    <>
      <NavbarrAfterLogin />
      <div className="user_connect_container">
        <div className="left_filter_container">
          <h1 className="Filter_heading">Filters</h1>
          <div className="input_filter_container">
            <input
              className="Filter_input"
              type="text"
              placeholder="Search..."
            />
            <div className="filter_search_icon">
              <SearchIcon fontSize="large" />
            </div>
          </div>
          <div className="choose_filter_container">
            <Filter heading="Search by Role" />
            <Filter heading="Current Location" />
            <Filter heading="Year of Graduation" />
            <Filter heading="Work Industry" />
            <Filter heading="Skills" />
          </div>
        </div>
        <div className="right_connect_container">
          <div className="connection_profile_container">
            <ConnectUserDiv />
            <ConnectUserDiv />
            <ConnectUserDiv />
            <ConnectUserDiv />
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default Connect;
