import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";
import "./HeaderBar.css";
import { Link } from "react-router-dom";

const HeaderBar = (props) => {
  return (
    <div>
      <Toolbar className="header_bar" variant="dense">
        <Typography variant="h6" component="div">
          {props.title}
        </Typography>
        {props.button === true ? (
          <Link to={props.link}>
            <Button id="header_button">View All</Button>
          </Link>
        ) : (
          <div></div>
        )}
      </Toolbar>
    </div>
  );
};
export default HeaderBar;
