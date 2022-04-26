import React, { useEffect, useState } from "react";
import { doc, setDoc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
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
  const [sentMessage, setSentMessage] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState([]);

  const fetchreceivedmessage = async () => {
    const docRef = await getDoc(doc(db, "messages", props.id));
    if (docRef.exists()) {
      console.log(docRef.data());
      if (
        docRef.data() &&
        docRef.data().textmessage &&
        docRef.data().textmessage.length > 0
      ) {
        setReceivedMessage(
          docRef
            .data()
            .textmessage.map((message) => ({
              ...message,
              sentTo: message.sentTo,
              timestamp: message.timestamp,
            }))
            .filter((message) => message.sentTo === currentUser.uid)
        );
      }
    }
  };
  const fetchmymessage = async () => {
    const docRef = await getDoc(doc(db, "messages", currentUser.uid));

    if (docRef.exists()) {
      if (
        docRef.data() &&
        docRef.data().textmessage &&
        docRef.data().textmessage.length > 0
      ) {
        setSentMessage(
          docRef
            .data()
            .textmessage.map((message) => ({
              ...message,
              sentTo: message.sentTo,
              timestamp: message.timestamp,
            }))
            .filter((message) => message.sentTo === props.id)
        );
      }
    }
  };

  useEffect(() => {
    fetchreceivedmessage();
    
    // sentMessage
    console.log(sentMessage)
    // console.log(receivedMessage)
  }, []);
  useEffect(()=>{
    fetchmymessage();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    if (input.length > 0) {
      const docRef = doc(db, "messages", currentUser.uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      if (docSnap.exists()) {
        await updateDoc(doc(db, "messages", currentUser.uid), {
          textmessage: arrayUnion({
            message: input,
            timestamp: new Date(),
            sentTo: props.id,
          }),
        });
      } else {
        await setDoc(doc(db, "messages", currentUser.uid), {
          textmessage: arrayUnion({
            message: input,
            timestamp: new Date(),
            sentTo: props.id,
          }),
        });
      }
      fetchmymessage();
      fetchreceivedmessage();
      setInput("");
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
        <ChatMessage
          sentTexts={sentMessage}
          receivedTexts={receivedMessage}
          myid={currentUser.uid}
          otheruserid={props.id}
        />
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
