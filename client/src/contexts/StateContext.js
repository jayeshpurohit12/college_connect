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

const [updates,setUpdates]=useState([]);

const fetchdata = async () => {
   if(currentUser !== null){
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data());
    }
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
        
  };

  useEffect(() => {
    if(currentUser !== null)
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
}}>
    {children}
</StateContext.Provider>
</>
)
}
