import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyADZG6z2Ag3JDt2s5hXYYVe2b9n8dz-JbE",
  authDomain: "collegeconnect-f0079.firebaseapp.com",
  projectId: "collegeconnect-f0079",
  storageBucket: "collegeconnect-f0079.appspot.com",
  messagingSenderId: "465930673500",
  appId: "1:465930673500:web:b8cccc3e495878cdacb599",
});

// Initialize Firebase

export const auth = app.auth();
export default app;
