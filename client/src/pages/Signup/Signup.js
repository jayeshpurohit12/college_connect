import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import RoleField from "../../components/RoleField/RoleField";
const Signup = () => {
  
  return (
    <div>
      <section className="signup__container">

        <form className="signup__form" >
          <p className="signup__form--p">
            Already a user you can <Link to="/login"> Login </Link> here
          </p>
          <div className="signup__heading--container">
            <h1 className="signup__heading">Create an Account</h1>
          </div>
         
          <InputField
           
            type="email"
            placeholder="Email"
           
          />
          <InputField
           
           type=""
            placeholder="Mobile No."
            
          />
          <InputField
            
            type="password"
            placeholder="Password"
           
          />
          <InputField
            
            type="password"
            placeholder="Confirm Password"
           
          />
           
          <RoleField value="" />
          <button className="signup__form--button" type="submit">
            Sign Up
          </button>
        </form>
        <div className="signup__img">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-here-2161443-1815085.png" />
        </div>
      </section>
    
    </div>
  );
};

export default Signup;
