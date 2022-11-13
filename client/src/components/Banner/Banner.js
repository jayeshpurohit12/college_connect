import React from "react";
import { Carousel } from "react-bootstrap";
import "./Banner.css";

const Banner = (props) => {
  return (
    <>
      <div className="banner" style={{ width: `${props.width}` }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-55"
              src={props.image1}
              alt="First slide"
              style={{ width: "100%", height: `${props.height}` }}
            />
           
          </Carousel.Item>
          {props.image2 && (  <Carousel.Item>
            <img
              className="d-block w-55"
              src={props.image2}
              alt="Second slide"
              style={{ width: "100%", height: `${props.height}` }}
            />
          </Carousel.Item>)}
        
        
        </Carousel>
      </div>
    </>
  );
};

export default Banner;
