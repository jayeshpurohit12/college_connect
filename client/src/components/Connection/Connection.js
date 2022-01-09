import React from "react";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./Connection.css";
import SendIcon from '@mui/icons-material/Send';

export default function Connection() {
  return (
    <div className="login_info">
      <div className="login_heading">
        <h3>Join/Login Alumni Network</h3>
      </div>
      <Button id="google_connect_btn">Connect with Google</Button>
      <h4>or</h4>
      <Input
        className="connection_input_box"
        type="email"
        placeholder="Enter your email"
      ><SendIcon></SendIcon></Input>
    </div>
  );
}
