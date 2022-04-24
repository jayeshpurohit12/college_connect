import React, { useState, useEffect } from "react";
import "./Connect.css";
import NavbarrAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import SearchIcon from "@material-ui/icons/Search";
import Filter from "../../components/ConnectFilter/Filter";
import ConnectUserDiv from "../../components/ConnectBlock/ConnectUserDiv";
import Footer from "../../components/Footer/Footer";
import { db, getSuggestedProfiles } from "../../firebase";
import { doc } from "firebase/firestore";
import { getDoc,arrayUnion,updateDoc,arrayRemove } from "firebase/firestore";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/Authcontext";

const Connect = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState([]);

  const fetchuserdata = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists())
    setProfile(docSnap.data());
  };
  async function SuggestedProfiles() {
    const response = await getSuggestedProfiles(
      currentUser.uid,
      profile.connection
    );
    setUsers(response);
   
  }
const handleConnect = async (id) => {
  const docRef = await updateDoc(doc(db, "users", currentUser.uid), {
    connection: arrayUnion(id)
  });
  const docRef1 = await updateDoc(doc(db, "users", currentUser.uid), {
   pending:arrayRemove(id)
  });
}
  useEffect(async () => {
    setLoading(true);
    await fetchuserdata();
  }, []);

  useEffect(async () => {
    await SuggestedProfiles();
  }, [users]);
  useEffect(() => {
    setLoading(false);
  }, [users]);
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
            {!loading &&
              users &&
              users.map((user) => (
                <>
                  <ConnectUserDiv
                    image={user.image}
                    name={user.name}
                    end={user.end}
                    specialisation={user.specialisation}
                    skills={user.skills}
                    connection={user.connection}
                    id={user.id}
                  />
                </>
              ))}

          </div>
          <div>{profile.pending && profile.pending.map((id)=>{
            return(
              <div>
                <p>{id}</p>
                <Button onClick={handleConnect(id)}>Connect</Button>
              </div>
            )
          })}</div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default Connect;
