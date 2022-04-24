import React, { useEffect, useState } from "react";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  arrayUnion,
  getDocs,
  collection
} from "firebase/firestore";
import { db } from "../../firebase";
import { Input } from "@material-ui/core";
import { Form } from "react-bootstrap";
import "./Chatroom.css";
import { useAuth } from "../../contexts/Authcontext";
import { Button } from "react-bootstrap";
import ChatMessage from "./ChatMessage";

const Chatroom = (props) => {
const { currentUser } = useAuth();
const [input, setInput] = useState("");
const [message,setMessage]=useState([]);
const [myMessage,setMyMessage]=useState([]);
const [otherMessage,setOtherMessage]=useState([]);
const [sentMessage,setSentMessage]=useState([]);
const [receivedMessage,setReceivedMessage]=useState([]);

const fetchdata=async()=>{
  const docRef = await getDocs(collection(db, "messages"));
  console.log(docRef)
  if(!docRef.empty){
    docRef.docs.map((doc)=>{
      setMessage({...doc.data()});
    })
    console.log(message);
  }
}

  const fetchmymessage=async()=>{
    const docRef = await getDoc(doc(db, "messages", currentUser.uid));

   if(docRef.exists()){
     setMyMessage(docRef.data());
     console.log(myMessage)
     if(myMessage && myMessage.textmessage && myMessage.textmessage.length>0){
     setSentMessage(myMessage.textmessage.map((message)=>({...message,sentTo:message.sentTo,timestamp:message.timestamp})).filter(message=>message.sentTo===props.id));
      console.log(sentMessage);}
   }
   
  }
  const fetchreceivedmessage=async()=>{
    const docRef = await getDoc(doc(db, "messages", props.id));
   if(docRef.exists()){
     setOtherMessage(docRef.data());
     console.log(otherMessage);
     if(otherMessage && otherMessage.textmessage && otherMessage.textmessage.length>0){
      setReceivedMessage(otherMessage.textmessage.map((message)=>({...message,sentTo:message.sentTo,timestamp:message.timestamp})).filter(message=>message.sentTo===currentUser.uid));
      console.log(receivedMessage);
     }
   }
  }
useEffect(()=>{
  fetchdata();
  // fetchmymessage();
  // fetchreceivedmessage();
},[]);

  useEffect(()=>{
    fetchmymessage();
  },[]);

  useEffect(()=>{
    fetchreceivedmessage();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    if (input.length > 0) {
      const docRef = doc(db, "messages",currentUser.uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      if (docSnap.exists()) {
        await updateDoc(doc(db, "messages", currentUser.uid), {
          textmessage:arrayUnion({"message": input,
           "timestamp": new Date(),
         "sentTo": props.id,
        })});
        
      } else {
        await setDoc(doc(db, "messages", currentUser.uid),{
          textmessage:arrayUnion({"message": input,
           "timestamp": new Date(),
         "sentTo": props.id,
        })});
        
      }
    }
  };
  return (
    <div className="container">
      <div className="container_header">
        <div className="container_header_left">
          <img
            className="container_inner_profile"
            src={props.image}
            alt="user"
          />
        </div>
        <span className="container_heading">{props.name}</span>
      </div>
      <div className="message_container">
       <div><ChatMessage sentTexts={sentMessage} receivedTexts={receivedMessage} myid={currentUser.uid} otheruserid={props.id}/></div>
      </div>
      <div>
        <Form onSubmit={handleSubmit} className="send_input_form">
          <Input
            type="text"
            placeholder="Type a message"
            className="message_input"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button variant="primary" className="message_button" type="submit">
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Chatroom;
