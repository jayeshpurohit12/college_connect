import React from "react";
import InputField from "../../components/InputField/InputField";

const ResetPassword = () => {
 
  return (
    <div>
      <section className="login__container">
        <form className="login__form" >
          <div className="login__heading--container">
            <h1 className="login__heading">Reset new Password</h1>
          </div>
          <InputField
            type="password"
            placeholder="New Password"
          />
          <InputField
            type="password"
            placeholder="Confirm Password"
          />
          
          <button className="login__form--button" type="submit">
            Reset
          </button>
        </form>
      </section>
    </div>
  );
};

export default ResetPassword;
