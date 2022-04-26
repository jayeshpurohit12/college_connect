import React, { useState, useEffect } from "react";
import "./FindConnection.css";
import connectionIcon from "../../images/connectionIcon.png";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import ConnectorsProfile from "./ConnectorsProfile";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/Authcontext";
import { db, showConnectedProfiles } from "../../firebase";

const FindConnection = () => {
  const [profile, setProfile] = useState([]);
  const { currentUser } = useAuth();
  const [connectedUsers, setConnectedUsers] = useState([]);

  const fetchcurrentUser = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
    }
  };
  async function fetchConnectedUser() {
    const response = await showConnectedProfiles(profile.connection);
    setConnectedUsers(response);
  }

  useEffect(async () => {
    await fetchcurrentUser();
  }, []);

  useEffect(async () => {
    await fetchConnectedUser();
  }, [profile]);

  return profile.connection ? (
    <>
      {/* {console.log(connectedUsers)} */}
      <div className="connection">
        <div className="conn_container">
          <div className="heading_container heading_and_edit">
            <img className="connect_img" src={connectionIcon} alt="connect" />
            <h2 className="connection_heading">Connections</h2>
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
        {connectedUsers ? (
          <div className="connectors_profile_container">
            {connectedUsers &&
              connectedUsers.map((userprofile, i) => (
                <Link
                  to={`/connectedUser/${userprofile.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ConnectorsProfile
                    key={i}
                    name={userprofile.name}
                    image={userprofile.image}
                    expertise={userprofile.skills}
                    id={userprofile.id}
                  />
                </Link>
              ))}
          </div>
        ) : null}
      </div>
    </>
  ) : null;
};

export default FindConnection;
