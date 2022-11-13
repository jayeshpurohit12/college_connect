import React, { useState, useEffect } from "react";
import "./Connect.css";
import NavbarrAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import SearchIcon from "@material-ui/icons/Search";
import Filter from "../../components/ConnectFilter/Filter";
import ConnectUserDiv from "../../components/ConnectBlock/ConnectUserDiv";
import Footer from "../../components/Footer/Footer";
import { db, getSuggestedProfiles } from "../../firebase";
import { Avatar } from "@material-ui/core";
import { doc } from "firebase/firestore";
import { getDoc, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/Authcontext";

const Connect = () => {
  const {id} = useParams();
  const [users, setUsers] = useState([]);
  const [pendingConnection, setPendingConnection] = useState(true);
  const [pendingUser, setPendingUser] = useState([]);
  const [pendingProfile, setPendingProfile] = useState([]);
  const [search, setSearch] = useState("");
  const { currentUser } = useAuth();

  const fetchpendinguser = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    setPendingUser(docSnap.data());
  };

  const fetchdata = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
      // console.log("Document data:", docSnap.data());
      setPendingProfile(docSnap.data().pending);
      if (pendingProfile) {
        setPendingConnection(false);
      }
      // console.log(pendingProfile);
      const response = await getSuggestedProfiles(
        currentUser.uid,
        docSnap.data().connection,
        id
      );
      if (response) {
        setUsers(response.filter((user)=> user&& user.end.substring(0,4) === id));
        console.log(users);
      }
     
  };

  const handleConnect = async (id) => {
    setPendingConnection(false);
    await updateDoc(doc(db, "users", currentUser.uid), {
      connection: arrayUnion(id),
    });
    await updateDoc(doc(db, "users", id), {
      connection: arrayUnion(currentUser.uid),
    });
    await updateDoc(doc(db, "users", currentUser.uid), {
      pending: arrayRemove(id),
    });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <NavbarrAfterLogin />
      <div className="user_connect_container">
        <div className="left_filter_container">
          <h1 className="Filter_heading">Filters</h1>
          <div className="input_filter_container">
            <input
              type="text"
              placeholder="search.."
              className="input_search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />

            <div className="search_icon">
             <SearchIcon fontSize="large" />
            </div>
          </div>
          {/* <div className="choose_filter_container">
            <Filter heading="Search by Role" />
            <Filter heading="Work Industry" />
            <Filter heading="Skills" />
          </div> */}
        </div>

        <div className="right_connect_container">
        {users.length > 0 ? (
            <>
              <center>
                <h2>Users You Can Connect With</h2>
              </center>
              <div className="connection_profile_container">
              {search ===""?(
                  <>
                     { 
                 users && users.map((user, i) => {
                    return (
                      <>
                        { pendingProfile &&
                        pendingProfile.includes(user.id) ? null : (
                          <ConnectUserDiv
                            image={user.image}
                            name={user.name}
                            position={user.position}
                            company={user.company}
                            end={user.end}
                            specialisation={user.specialisation}
                            skills={user.skills}
                            connection={user.connection}
                            id={user.id}
                            key={i}
                          />
                        )}
                      </>
                    );
                  })}
                  </>
              ):(<>
                 { 
                 users && users.filter((user) => {
                  return (
                    user.name
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    user.end
                      .substring(0, 4)
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    user.position
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    user.company
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    user.skills
                      .map((skill) =>
                        skill.toLowerCase().includes(search.toLowerCase())
                      )
                      .includes(true)
                  );
                }).map((user, i) => {
                    return (
                      <>
                        { pendingProfile &&
                        pendingProfile.includes(user.id) ? null : (
                          <ConnectUserDiv
                            image={user.image}
                            name={user.name}
                            position={user.position}
                            company={user.company}
                            end={user.end}
                            specialisation={user.specialisation}
                            skills={user.skills}
                            connection={user.connection}
                            id={user.id}
                            key={i}
                          />
                        )}
                      </>
                    );
                  })}
              </>)}
              </div> 
              </>
):(
  <>
  <h1 className="no_connection">No users left for connection</h1>
</>
)}
          <div>
            {pendingProfile && pendingProfile.length > 0 ? (
              <>
                <center>
                  <h4 style={{ margin: "1rem" }}>Pending requests</h4>
                </center>
                <div className="pending_req">
                  {pendingProfile.map((id, i) => {
                    fetchpendinguser(id);
                    return !pendingConnection ? (
                      <div key={i} className="pendinguser_profile">
                        <div className="pendinguser_profile_container">
                          <Avatar
                            alt="User"
                            src={pendingUser.image}
                            fontSize="large"
                            style={{ color: "white", margin: "1rem" }}
                          />
                          <div className="pendinguser_info">
                            <h4>{pendingUser.name}</h4>
                            <div>
                              <span>
                                <strong>Expertise: </strong>
                              </span>
                              <span>{pendingUser.skills}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          style={{ margin: "0.5rem" }}
                          onClick={() => handleConnect(id)}
                        >
                          Connect
                        </Button>
                      </div>
                    ) : null;
                  })}
                </div>
              </>
            ) : (
              <></>
            )}
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
