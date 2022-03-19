import React, { useState, useRef } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { Alert, Form, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/Authcontext";
import { doc, setDoc } from "firebase/firestore";
import {db} from '../../firebase';

const Login = () => {
  const emailRef = useRef(" ");
  const passwordRef = useRef(" ");
  const { login, signup } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {currentUser}=useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      console.log("login");
      if (passwordRef.current.value == "AITR@123") {
        await signup(emailRef.current.value, passwordRef.current.value);
        await login(emailRef.current.value, passwordRef.current.value);
        const docRef = await setDoc(doc(db, "users", currentUser.uid),{
          category:"teacher"
        });

        history.push("/resetpassword");
      } else {
        await login(emailRef.current.value, passwordRef.current.value);
        const docRef = await setDoc(doc(db, "users", currentUser.uid),{
          category:"student"
        });
        
      }
      history.push("/details");
    } catch (error) {
      setError("Please enter valid credentials");
    }
    setLoading(false);
  }

  return (
    <div>
      <section className="login__container">
        <div className="form_box">
          <img
            src="https://media.istockphoto.com/vectors/sign-in-page-flat-design-concept-vector-illustration-icon-account-vector-id1299219464?b=1&k=20&m=1299219464&s=612x612&w=0&h=igaRFpYURyVgHVd_ZkcuF6Z9EP82cwqBvYMzlotzquY="
            alt=""
          />
          <Form onSubmit={handleSubmit} className="login__form">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="login__heading--container">
                <h1 className="login__heading">Login</h1>
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
            <p className="login__form--p">
              Not a User, Don't worry you can <Link to="/signup"> SignUp </Link>{" "}
              here
            </p>
            <p className="login__forgot--button">
              <Link to="/resetpassword">Forgot Password</Link>
            </p>
            <Button
              disabled={loading}
              className="signup__form--button"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default Login;
