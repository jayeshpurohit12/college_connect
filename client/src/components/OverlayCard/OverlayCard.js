import React from "react";
import Card from "react-bootstrap/Card";
import "./OverlayCard.css";
import Button from "@material-ui/core/Button";

export default function OverlayCard(props) {
  return (
    <div className="portal">
      <Card className="text-white">
        <Card.Img src={props.image} alt="Card image" />
        <Card.ImgOverlay>
          <div style={{borderBottom:"3px solid red", width:"60%", margin:"0.5rem"}}>
          <Card.Title className = "card_title" >{props.title}</Card.Title>
          </div>
          <Card.Text>{props.text}</Card.Text>
          <Button id ="overlay_button">View All</Button>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
}
