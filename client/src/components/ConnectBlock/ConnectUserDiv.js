import React, { useState, useEffect } from "react";
import "./ConnectUserDiv.css";
import { Button } from "@material-ui/core";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/Authcontext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { arrayUnion } from "firebase/firestore";

const ConnectUserDiv = (props) => {
  const d = new Date();
  const { currentUser } = useAuth();
  const [connected, setConnected] = useState(false);
  const [profile, setProfile] = useState({});
 
  
  async function Connectionreq() {
    const docRef = await updateDoc(doc(db, "users", props.id), {
      pending: arrayUnion(currentUser.uid),
    })
      .then(function (res) {
        <Alert variant="success">Request Sent</Alert>;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handleConnectedUser() {
    setConnected(true);
    await Connectionreq();
  }
  const ConnectUser = async () => {
    const docRef = await updateDoc(doc(db, "users", currentUser.uid), {
      connection: arrayUnion(props.id),
    })
      .then(function (res) {
        <Alert variant="success">Connected Successfully</Alert>;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const FetchConnectedUser = async () => {
    const docRef = await getDoc(doc(db, "users", props.id));
    if (docRef.exists()) {
      setProfile(docRef.data());
      if (profile.connection && profile.connection.includes(currentUser.uid)) {
        await ConnectUser();
      }
    }
  };
  useEffect(() => {
  
    FetchConnectedUser();
  }, []);

  return !connected ? (

      <div className="user_connection_profile">
        {console.log(props)}
        <div className="user_profile">
          <img className="userImage" src={props.image} alt="" />
        </div>
        <div className="user_connection_details">
          <div className="user_block">
            <h1 className="user_name">{props.name}</h1>
          </div>
          <div className="user_block">
            {props.end ? (
              <>
                {props.end.substring(0, 4) < d.getFullYear() ? (
                  <h1 className="user_class">
                    Alumni of Class {props.end.substring(0, 4)}
                  </h1>
                ) : (
                  <h1 className="user_class">
                    Student of Batch {props.end.substring(0, 4)}
                  </h1>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="user_block">
            <h1 className="user_branch">
              {props.degree} in {props.specialisation}
            </h1>
          </div>
          <div className="user_block">
            <h1 className="user_position">
              Working in {props.company} as {props.position}
            </h1>
          </div>
          <div className="user_block user_connection_expertise">
            <h1 className="user_expertise">Expertise: </h1>
            <h1 className="user_skills">
              {props.skills &&
                props.skills.map((skills) => <span>, {skills}</span>)}
            </h1>
          </div>
          <div className="user_connection_button">
            <Button
              variant="contained"
              color="primary"
              onClick={handleConnectedUser}
            >
              Connect
            </Button>
          </div>
        </div>
      </div>
  
  ) : (<></>);
};
export default ConnectUserDiv;
