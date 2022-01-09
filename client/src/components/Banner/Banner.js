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
              src={props.image}
              alt="First slide"
              style={{ width: "100%", height: `${props.height}` }}
            />
            <Carousel.Caption>
              {props.caption === true ? (
                <div>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </div>
              ) : (
                <div></div>
              )}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-55"
              src={props.image}
              alt="Second slide"
              style={{ width: "100%", height: `${props.height}` }}
            />

            <Carousel.Caption>
              {props.caption === true ? (
                <div>
                  <h3>Second slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </div>
              ) : (
                <div></div>
              )}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-55"
              src={props.image}
              alt="Third slide"
              style={{ width: "100%", height: `${props.height}` }}
            />

            <Carousel.Caption>
              {props.caption === true ? (
                <div>
                  <h3>Third slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </div>
              ) : (
                <div></div>
              )}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default Banner;
