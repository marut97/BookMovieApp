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
      localStorage.setItem("token", headers.get("access-token"));
      localStorage.setItem("userInfo", data);
      props.onLoggedIn();
    } else {
      setLoginFormMessage(data.message);
    }
  }

  // on login form submitted
  const login = (e) => {
    e.preventDefault();
    const state = loginForm;
    let errors = state.errors;

    //validation on login form submmission
    if (state.username.length === 0) {
      errors.username = "required";
    }
    if (state.password.length === 0) {
      errors.password = "required";
    }

    if (state.errors.username.length > 0 || state.errors.password.length > 0) {
      setLoginForm({ ...state });
    } else {
      loginHandler(loginForm);
    }
  };

  const onLoginFormChanged = (e) => {
    const state = loginForm;
    const { name, value } = e.target;
    let errors = state.errors;

    errors[name] = checkEmptyValue(value);

    state[e.target.name] = e.target.value;
    setLoginForm({ ...state });
  };

  function checkEmptyValue(value) {
    return value.length === 0 ? "required" : "";
  }

  const { username, loginPassword } = loginForm;

  return (
    <form onSubmit={login}>
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
            onChange={onLoginFormChanged}
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
            onChange={onLoginFormChanged}
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
