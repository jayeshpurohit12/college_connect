import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/Authcontext";
import { useHistory, useNavigate } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Form, Button, Alert } from "react-bootstrap";

const ResetPassword = () => {
  const emailRef = useRef();
  const history = useNavigate();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      setLoading(true);
      setError("");
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      setError("failed to reset");
    }
    setLoading(false);
  };

  return (
    <div>
      <IconButton
        onClick={() => {
          history("/login");
        }}
      >
        <ArrowBackIcon fontSize="small" />
      </IconButton>
      <section className="login__container">
        <Form className="login__form" onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <div className="login__heading--container">
            <h1 className="login__heading">Reset Password</h1>
          </div>
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
          ></Form.Control>

          <Button
            disabled={loading}
            className="login__form--button"
            type="submit"
          >
            Reset
          </Button>
        </Form>
      </section>
    </div>
  );
};

export default ResetPassword;
