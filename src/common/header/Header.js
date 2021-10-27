import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "./../../assets/logo.svg";
import Button from "@material-ui/core/Button";
import LoginDialog from "../logindialog/LoginDialog";



const Header = (props) => {
  const [loggedIn, setLoggedInState] = useState(props.loggedIn);
  const [logInDialogVisible, setLogInDialogVisibility] = useState(false);

  const requestLogin = () => {
    setLogInDialogVisibility(true);
    };

    const onLoggedIn = () => {
      setLoggedInState(true);
      props.loggedInChanged(true);
      setLogInDialogVisibility(false);
      };

  return (
    <div className="headerBar">
      <img src={logo} alt="Logo" className="movieLogo" />
      <div className="container">
        {props.BookShowVisible ? (
          <Button
            variant="contained"
            color="primary"
            className="bookShowButton"
          >
            BOOK SHOW
          </Button>
        ) : null}
        &nbsp;&nbsp;
        {!loggedIn ? (
          <Button variant="contained" color="default" className="loginButton" onClick={requestLogin}>
            LOGIN
          </Button>
        ) : (
          <Button variant="contained" color="default" className="logoutButton">
            LOGOUT
          </Button>
        )}
      </div>
      <LoginDialog show={logInDialogVisible} onLoggedIn={onLoggedIn}/>
    </div>
  );
};

export default Header;
