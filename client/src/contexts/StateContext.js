import React,{useEffect,createContext,useState} from 'react';
import { useAuth } from './Authcontext';
import {getDoc, getDocs,collection,updateDoc,arrayUnion,setDoc} from "firebase/firestore";
import { db } from '../firebase';
import { doc } from 'firebase/firestore';

export const StateContext = createContext();

export const StateProvider = ({children})=>{
const [profile,setProfile] = useState({});
const [achievements,setAchievements] = useState();
const [jobs,setJobs] = useState();
const [internships,setInternships] = useState();
const {currentUser} = useAuth();
const [countUserInIndia,setCountUserInIndia] = useState(0);
const [countUserForHigherStudies,setCountUserForHigherStudies] = useState(0);
const [totalCount,setTotalCount] = useState(0);
const [updates,setUpdates]=useState([]);

const fetchdata = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
    }
  };

  const fetchData2 = async () => {
    const res = await fetch(`/achievements`);
    const data = await res.json();
    setAchievements(data);
    const res1 = await fetch("/internships");
    const interndata = await res1.json();
    if (interndata) {
      // console.log(interndata);
      setInternships(interndata);
    }
    const res2 = await fetch("/Jobs");
    const jobData = await res2.json();
    if (jobData) {
      // console.log(jobData);
      setJobs(jobData);
    }
const docRef = await getDocs(collection(db, "users"));
    docRef.forEach((doc) => { 
        setTotalCount((prev)=>prev+1);
        if(doc.data().country === "India"){
           setCountUserInIndia((prev)=>prev+1);
        }
       if(doc.data().higher=== '1'){
           setCountUserForHigherStudies((prev)=>prev+1);
       }
    });
        
  };

  useEffect(() => {
    if(currentUser)
    fetchdata();
    fetchData2();
  }, []);

return(
<>
<StateContext.Provider value ={{
  achievements:[achievements,setAchievements],
   jobs:[jobs,setJobs],
    internships:[internships,setInternships],
   profile:profile,
   updates:[updates,setUpdates],
    countUserInIndia:countUserInIndia,
    countUserForHigherStudies:countUserForHigherStudies,
    totalCount:totalCount
}}>
    {children}
</StateContext.Provider>
</>
)
}
