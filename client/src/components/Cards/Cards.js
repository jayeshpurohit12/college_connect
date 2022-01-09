import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "@material-ui/core";
import "./Cards.css";

const Cards = (props) => {
  return (
    <Card style={{ width: `${props.width}` }}>
      <Card.Img
        style={{ maxHeight: "15rem" }}
        variant="top"
        src={props.image}
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
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
