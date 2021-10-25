import React from "react";
import "./Header.css";
import logo from "./../../assets/logo.svg";
import Button from "@material-ui/core/Button";

const Header = (props) => {
  return (
    <div className="headerBar">
      <img src={logo} alt="Logo" className="movieLogo" />
      <div className="container">
      <Button variant="contained" color="primary" className="bookShowButton">
          BOOK SHOW
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" color="default" className="loginButton">
          LOGIN
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" color="default" className="logoutButton">
          LOGOUT
        </Button>
      </div>
    </div>
  );
};

export default Header;
