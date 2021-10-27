import React, { useState } from "react";
import "./LoginDialog.css";
import {
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  FormHelperText,
} from "@material-ui/core";

function Error() {
  return <FormHelperText style={{ color: "red" }}>required</FormHelperText>;
}

const LoginForm = (props) => {

  const [loginForm, setLoginForm] = useState({
    id: 0,
    username: "",
    password: "",
    errors: {
      username: "",
      password: "",
    },
  });

  const [loginFormMessage, setLoginFormMessage] = useState("");

  async function loginHandler(user) {
      
    const authentication = btoa(`${user.username}:${user.password}`);

    const rawResponse = await fetch("http://localhost:8085/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Basic ${authentication}`,
      },
    });

    const data = await rawResponse.json();
    const headers = await rawResponse.headers;

    if (data.status === "ACTIVE") {
      // on successful login save details in local storage
      localStorage.setItem("token", headers.get("access-token"));
      localStorage.setItem("userInfo", data);
      props.onLoggedIn();
    } else {
      setLoginFormMessage(data.message);
    }
  }

  const onLoginFormSubmitted = (e) => {
    e.preventDefault();
    const state = loginForm;
    let errors = state.errors;
    // On submit validation
    if (state.username.length === 0) {
      errors.username = "required";
    }
    if (state.password.length === 0) {
      errors.password = "required";
    }

    // set state if errors found
    if (state.errors.username.length > 0 || state.errors.password.length > 0) {
      setLoginForm({ ...state });
    } else {
      loginHandler(loginForm);
    }
  };

  const inputLoginChangedHandler = (e) => {
    const state = loginForm;
    const { name, value } = e.target;
    let errors = state.errors;

    switch (name) {
      case "username":
        errors.username = checkEmptyValue(value);
        break;
      case "password":
        errors.password = checkEmptyValue(value);
        break;
      default:
        break;
    }

    state[e.target.name] = e.target.value;
    setLoginForm({ ...state });
  };

  // Check if given param is empty or not
  function checkEmptyValue(value) {
    return value.length === 0 ? "required" : "";
  }

  // retrieve login form data
  const { username, loginPassword } = loginForm;

  return (
    <form onSubmit={onLoginFormSubmitted}>
      <Grid container direction="column" alignItems="center" justify="center">
        <FormControl
          style={{
            marginTop: "20px",
          }}
        >
          <InputLabel htmlFor="password">Username *</InputLabel>
          <Input
            id="username"
            className="form-field"
            type="text"
            name="username"
            onChange={inputLoginChangedHandler}
            value={username}
          />
          {loginForm.errors.username.length > 0 && (
            <Error>{loginForm.errors.username}</Error>
          )}
        </FormControl>
        <FormControl
          style={{
            marginTop: "20px",
          }}
        >
          <InputLabel htmlFor="password">Password *</InputLabel>
          <Input
            id="password"
            className="form-field"
            type="password"
            name="password"
            onChange={inputLoginChangedHandler}
            value={loginPassword}
          />
          {loginForm.errors.password.length > 0 && (
            <Error>{loginForm.errors.password}</Error>
          )}
        </FormControl>
        {loginFormMessage.length > 0 && (
          <Typography
            style={{
              marginTop: "30px",
              fontSize: "16px",
            }}
          >
            {loginFormMessage}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{
            marginTop: "40px",
          }}
        >
          LOGIN
        </Button>
      </Grid>
    </form>
  );
};

export default LoginForm;
