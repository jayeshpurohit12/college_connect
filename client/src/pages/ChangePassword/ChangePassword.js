import React from "react";
import InputField from "../../components/InputField/InputField";

const ChangePassword = () => {
 
  return (
    <div>
      <section className="login__container">
        <form className="login__form" >
          <div className="login__heading--container">
            <h1 className="login__heading">Change Password</h1>
          </div>
          <InputField
            type="password"
            placeholder="Old Password"
          />
          <InputField
            type="password"
            placeholder="New Password"
          />
          <InputField
            type="password"
            placeholder="Confirm Password"
          />
          
          <button className="login__form--button" type="submit">
            Change
          </button>
        </form>
      </section>
    </div>
  );
};

export default ChangePassword;
