import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Form, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/Authcontext";
import { doc, setDoc, getDoc} from "firebase/firestore";
import { auth } from "../../firebase";
import { db} from "../../firebase";

const Login =() => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { login } = useAuth();
  const history = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let { currentUser } = useAuth();
  const [teach,setTeach]= useState(false);
 
  async function handleFormSubmit(e) {
    e.preventDefault();
 
   if(currentUser.emailVerified === false){
    return setError("Please verify your email first");
   }
    else{
      try {
      setLoading(true);
      setError("");
      
      if (passwordRef.current.value === "AITR@123") {
        const documentRef = doc(db, "users", currentUser.uid);
        localStorage.setItem("teach",true);
        // console.log(documentRef);
        const docSnap = await getDoc(documentRef);
        if (docSnap.exists()) {
          await login(emailRef.current.value, passwordRef.current.value);
          history("/");
        } else {
          await login(emailRef.current.value, passwordRef.current.value);
          const docRef = await setDoc(doc(db, "users", currentUser.uid), {
            category: "teacher",
            connection: [],
            id: currentUser.uid,
            email: currentUser.email,
          });
         
          history("/resetpassword");
        }
      } else {
        const documentRef = doc(db, "users", currentUser.uid);
        // console.log(documentRef);
        
        const docSnap = await getDoc(documentRef);
        if (docSnap.exists()) {
         
          await login(emailRef.current.value, passwordRef.current.value);
          if(localStorage.getItem("teach") === "true"){
            history("/details");
          }
          else{
            history("/");
          }

        } else {
          await login(emailRef.current.value, passwordRef.current.value);
          const docRef = await setDoc(doc(db, "users", currentUser.uid), {
            category: "student",
            connection: [],
            id: currentUser.uid,
            email: currentUser.email,
          });
          history("/details");
        }
      }
    
    } catch (error) {
      setError("Please enter valid credentials");
    }
  }
    
    // else{
      
    //   getAuth()
    //   .getUserByEmail(emailRef.current.value)
    //   .then((userRecord) => {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    //   })
    //   .catch((error) => {
    //     console.log('Error fetching user data:', error);
    //   });
    // }
 
    setLoading(false);
  }

  return (
    <div>
      {console.log(currentUser)}
      <section className="login__container">
        <div className="form_box">
          <img
            src="https://media.istockphoto.com/vectors/sign-in-page-flat-design-concept-vector-illustration-icon-account-vector-id1299219464?b=1&k=20&m=1299219464&s=612x612&w=0&h=igaRFpYURyVgHVd_ZkcuF6Z9EP82cwqBvYMzlotzquY="
            alt=""
          />
          {console.log(passwordRef.current.value)}
          <Form className="login__form" onSubmit={handleFormSubmit}>
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
