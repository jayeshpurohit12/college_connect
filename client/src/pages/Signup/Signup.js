import React, { useRef, useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/Authcontext";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const Signup = () => {
  const emailRef = useRef(" ");
  const passwordRef = useRef(" ");
  const passwordConfirmRef = useRef(" ");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const [otp, setOtp] = useState();
  //  const { currentUser } = useAuth();
  const [otpgen, setOtpgen] = useState("");
  const [message, setMessage] = useState("");
  const { Auth } = require("two-step-auth");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailRef.current.value.indexOf("@") >= 1) {
      var r = emailRef.current.value.indexOf("@");
      if (
        emailRef.current.value.substr(r, emailRef.current.value.length) !==
        "@acropolis.in"
      ) {
        return setError("Use your college email-id");
      }
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match");
    } else {
      try {
        setLoading(true);
        setError("");
        setMessage("");
        await signup(emailRef.current.value, passwordRef.current.value).then(
          (usercred) => {
            usercred.user.sendEmailVerification();
            history("/verify");
          }
        );
      } catch (error) {
        setError("failed to create an account");
      }
      setLoading(false);

      // console.log(otpgen);
    }
  };
  // const handleModalsubmit = (e) => {
  //   if (otp == otpgen) {
  //     try {
  //       setLoading(true);
  //       setError("");
  //       signup(emailRef.current.value, passwordRef.current.value);
  //     } catch (error) {
  //       setError("failed to create an account");
  //     }
  //     setLoading(false);
  //   } else {
  //     setError("Wrong Otp!!");
  //   }

  //   history("/login");
  //   handleClose();
  // };
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <section className="signup__container">
        <div className="form_box">
          <img
            src="https://theupay.com/bank/Assets/login.jpg"
            alt=""
            style={{ width: "60%" }}
          />
          <Form onSubmit={handleSubmit} className="signup__form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <p className="signup__form--p">
                If you are a teacher or already signed up please login directly
                <Link to="/login"> Login </Link> here
              </p>
              <div className="signup__heading--container">
                <h1 className="signup__heading">Create an Account</h1>
              </div>
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
              <Form.Control
                ref={passwordConfirmRef}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="signup__form--button"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
          {/* <Modal
            open={open}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Form
              onSubmit={handleModalsubmit}
              className={`login_form ${classes.paper}`}
              style={modalStyle}
            >
              <div className="login__heading--container"> */}
          {/* <h1 className="login__heading">Verify Otp</h1>
              </div>
              <Form.Control
                value={otp}
                placeholder="Enter otp"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />

              <Button
                className="login__form--button"
                disabled={loading}
                type="submit"
              >
                Verify Otp
              </Button>
              <Button */}
          {/* className="login__form--button"
                style={{ marginLeft: "1rem" }}
                onClick={handleClose}
              >
                Close
              </Button>
            </Form>
          </Modal> */}
        </div>
      </section>
    </div>
  );
};

export default Signup;
