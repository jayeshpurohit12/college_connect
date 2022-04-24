import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';
import { collection, getDocs } from "firebase/firestore";

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
const db = getFirestore(app);
const storage = getStorage(app);
export {db,storage};

export async function getSuggestedProfiles(uid,connectedUsers) {
  const response = await getDocs(collection(db, "users"));
  let suggestedUsers =[];
  if(connectedUsers && connectedUsers.length>0)
  suggestedUsers = response.docs.map(user=>({ ...user.data(), id: user.id })).filter(user=>user.id!==uid && !connectedUsers.includes(user.id));
  else 
  suggestedUsers= response.docs.map(user=>({ ...user.data(), id: user.id })).filter(user=>user.id!==uid);
  return suggestedUsers;
 }

 export async function showConnectedProfiles(connectedUsers) {
   console.log("before")
  const response = await getDocs(collection(db, "users"));
  console.log("after");
 if(connectedUsers && connectedUsers.length>0)
 return response.docs.map(user=>({ ...user.data(), id: user.id })).filter(user=>connectedUsers.includes(user.id));
}