import React from "react";
import "./VerifyUser.css";
import { Button } from "react-bootstrap";

const VerifyUser = () => {
  return (
    <>
      <div>
        <section className="verifyUser__container">
          <div className="form_box">
            <div className="content_cont">
              <h4 className="verifyUser_heading">
                Please verify your email using the link sent
              </h4>
              <p>Login Here</p>
              <Button variant="primary" href="./login">
                Login
              </Button>
            </div>
            <img
              src="https://theupay.com/bank/Assets/login.jpg"
              alt=""
              style={{ width: "60%" }}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default VerifyUser;
