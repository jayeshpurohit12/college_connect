import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "@material-ui/core";
import "./CardWithBorder.css";

const Cards = (props) => {
  return (
    <Card style={{ width: `${props.width}`}}>
      <Card.Img
        style={{
          borderBottom: "1px solid #E0E0E0",
          height: "13rem",
          width: "90%",
          margin: "auto",
        }}
        variant="top"
        src={props.image}
      />
      <Card.Body>
        <Card.Title style={{ marginBottom: "1.5rem" }}>
          <center>{props.title}</center>
        </Card.Title>
        <Card.Text>
          <label className="card_content">{props.content}</label>
        </Card.Text>
        {props.button === true ? (
          <Button id="button_carousel">View</Button>
        ) : (
          <div></div>
        )}
      </Card.Body>
    </Card>
  );
};
export default Cards;
