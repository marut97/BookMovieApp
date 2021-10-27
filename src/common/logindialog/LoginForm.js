import React from "react";
import "./LoginDialog.css";
import {
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";

const LoginForm = (props) => {
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
