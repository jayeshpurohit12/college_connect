import React, { useState, useEffect } from "react";
import "./Connect.css";
import NavbarrAfterLogin from "../../components/Navbar/NavbarrAfterLogin";
import SearchIcon from "@material-ui/icons/Search";
import Filter from "../../components/ConnectFilter/Filter";
import ConnectUserDiv from "../../components/ConnectBlock/ConnectUserDiv";
import Footer from "../../components/Footer/Footer";
import { db, getSuggestedProfiles } from "../../firebase";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/Authcontext";

const Connect = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState([]);

  const fetchuserdata = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    setProfile(docSnap.data());
  };
  async function SuggestedProfiles() {
    const response = await getSuggestedProfiles(
      currentUser.uid,
      profile.connection
    );
    setUsers(response);
   
  }

  useEffect(async () => {
    setLoading(true);
    let currentuser = await fetchuserdata();
    console.log(profile.connection);
  }, []);

  useEffect(async () => {
    let suggestedUser = await SuggestedProfiles();
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
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default Connect;
