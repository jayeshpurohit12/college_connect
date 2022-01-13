import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import InputField from "../../components/InputField/InputField";
import RoleField from "../../components/RoleField/RoleField";

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
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const Login = () => {
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
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form >
          <div>
            <h3 >Forgot Password?</h3>
            </div>
            <div>
            <span>Enter your registered email</span>
            </div>
            <InputField 
            type="email"
            placeholder="Email"
           
          />
          <button className="login__form--button" type="submit">
           Send OTP
          </button>
          
          </form>
          </div>

);
  return (
    <div>
      <section className="login__container">
        <div className="form_box">
          <img src="https://media.istockphoto.com/vectors/sign-in-page-flat-design-concept-vector-illustration-icon-account-vector-id1299219464?b=1&k=20&m=1299219464&s=612x612&w=0&h=igaRFpYURyVgHVd_ZkcuF6Z9EP82cwqBvYMzlotzquY=" />
          <form className="login__form">
            <div className="login__heading--container">
              <h1 className="login__heading">Login</h1>
            </div>
            <InputField type="email" placeholder="Email" />
            <InputField type="password" placeholder="Password" />
            <RoleField value="" />
            <p className="login__form--p">
              Not a User, Don't worry you can <Link to="/signup"> SignUp </Link>{" "}
              here
            </p>
            <p className="login__forgot--button">
             
              <button type="button"className="forgot_button" onClick={handleOpen}>
               Forgot Password
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
               {body}
              </Modal>
            </p>
            <button className="login__form--button" type="submit">
              Login
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
