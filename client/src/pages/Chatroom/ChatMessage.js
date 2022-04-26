import React from "react";
import "./ChatMessage.css";

const ChatMessage = (props) => {
  const messages = [];
  props.sentTexts && props.sentTexts.map((message) => messages.push(message));
  props.receivedTexts &&
    props.receivedTexts.map((message) => messages.push(message));
  messages.sort((a, b) => a.timestamp - b.timestamp);
  // console.log(messages);

  return (
    <div className="message_container">
      {messages.map((message, i) => {
        return (
          <div
            key={i}
            className={message.sentTo === props.myid ? "received" : "sent"}
          >
            {message.message}

            <span className="message_time">
              {
                new Date(message.timestamp.seconds * 1000)
                  .toTimeString()
                  .split(" ")[0]
              }
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessage;
