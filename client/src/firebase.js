import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, getDoc,getDocs,doc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCsU8xlXQvJaNXHrXlIOM6O6vgQn6_W3uU",
  authDomain: "collegeconnect-89c8b.firebaseapp.com",
  projectId: "collegeconnect-89c8b",
  storageBucket: "collegeconnect-89c8b.appspot.com",
  messagingSenderId: "1082650914355",
  appId: "1:1082650914355:web:640e6dab4e5d4facfabd46",
  measurementId: "G-N9JNJQ7SYC",
});

// Initialize Firebase

export const auth = app.auth();
export default app;
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
export{collection,getDocs,getAuth};

export const getSuggestedProfiles = async (uid, connectedUsers) => {
  const response = await getDocs(collection(db, "users"));
  console.log(connectedUsers);
  let suggestedUsers = [];
  if (connectedUsers && connectedUsers.length > 0) {
    suggestedUsers = response.docs
      .map((user) => ({ ...user.data(), id: user.id }))
      .filter((user) => user.id !== uid && !connectedUsers.includes(user.id));
  } else
    suggestedUsers = response.docs
      .map((user) => ({ ...user.data(), id: user.id }))
      .filter((user) => user.id !== uid);
  return suggestedUsers;
};

export const getPendingProfiles = async(uid)=>{
  const response = await getDocs(collection(db, "users"));
  let pendingusers=[];
  pendingusers = response.docs
      .map((user) => ({ ...user.data(), id: user.id }))
      .filter((user) => user.id === uid);
  return pendingusers;
}

export const showConnectedProfiles = async (connectedUsers) => {
  const response = await getDocs(collection(db, "users"));

  if (connectedUsers && connectedUsers.length > 0)
    return response.docs
      .map((user) => ({ ...user.data(), id: user.id }))
      .filter((user) => connectedUsers.includes(user.id));
};
