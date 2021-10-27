import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "./../../assets/logo.svg";
import Button from "@material-ui/core/Button";
import LoginDialog from "../logindialog/LoginDialog";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [loggedIn, setLoggedInState] = useState(props.loggedIn);
  const [logInDialogVisible, setLogInDialogVisibility] = useState(false);

  const requestLogin = () => {
    setLogInDialogVisibility(true);
  };

  const requestLogout = async () => {
    await fetch("http://localhost:8085/api/v1/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setLogInDialogVisibility(false);
    localStorage.clear();
    setLoggedInState(false);
  };

  const onLoggedIn = () => {
    setLoggedInState(true);
    props.loggedInChanged(true);
    setLogInDialogVisibility(false);
  };

  useEffect(() => {
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
            to={"/bookshow/" + props.id}
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
          <Button
            variant="contained"
            color="default"
            className="logoutButton"
            onClick={requestLogout}
          >
            LOGOUT
          </Button>
        )}
      </div>
      <LoginDialog show={logInDialogVisible} onLoggedIn={onLoggedIn} />
    </div>
  );
};

export default Header;
