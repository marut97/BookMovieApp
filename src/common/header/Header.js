import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "./../../assets/logo.svg";
import Button from "@material-ui/core/Button";
import LoginDialog from "../logindialog/LoginDialog";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [loggedIn, setLoggedInState] = useState(props.loggedIn);
  const [logInDialogVisible, setLogInDialogVisibility] = useState(false);
  const [id, setId] = useState(props.id);

  const requestLogin = () => {
    // console.log(url[1], url[2]);
    setLogInDialogVisibility(true);
  };

  const onLoggedIn = () => {
    setLoggedInState(true);
    props.loggedInChanged(true);
    setLogInDialogVisibility(false);
  };

  useEffect(() => {
    // Set Token
    setLoggedInState(props.loggedIn);
  }, [props]);

  return (
    <div className="headerBar">
      <img src={logo} alt="Logo" className="movieLogo" />
      <div className="container">
        {props.BookShowVisible && loggedIn ? (
          <Button
            variant="contained"
            color="primary"
            className="bookShowButton"
            component={Link}
            to={"/bookshow/" + id}
          >
            BOOK SHOW
          </Button>
        ) : !props.BookShowVisible ? null : (
          <Button
            variant="contained"
            color="primary"
            className="bookShowButton"
            onClick={requestLogin}
          >
            BOOK SHOW
          </Button>
        )}
        &nbsp;&nbsp;
        {!loggedIn ? (
          <Button
            variant="contained"
            color="default"
            className="loginButton"
            onClick={requestLogin}
          >
            LOGIN
          </Button>
        ) : (
          <Button variant="contained" color="default" className="logoutButton">
            LOGOUT
          </Button>
        )}
      </div>
      <LoginDialog show={logInDialogVisible} onLoggedIn={onLoggedIn} />
    </div>
  );
};

export default Header;
