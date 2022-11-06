import React, { useContext, useState, useEffect } from "react";
import "firebase/auth";
import "firebase/firestore";
import { auth } from "../firebase";

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  var d = new Date();
  const [achievements, setAchievements] = useState([]);

  const fetchAchievements = async () => {
    const res = await fetch(`/achievements`);
    const data = await res.json();
    setAchievements(data);
  
  };

 

  const fetchEvents = async () => {
    const res = await fetch(`/event`);
    // console.log(res)
    const data = await res.json();
    setEvents(data);
    
  };


  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  const login = (email, password) => {
    console.log("inside")
    return auth.signInWithEmailAndPassword(email, password);
   
  };
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updatePassword = (user, newPassword) => {
    return auth.updatePassword(user, newPassword);
  };
  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    signup,
    login,
    logout,
    updatePassword,
    resetPassword,
    events:events,
    achievements:achievements,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
