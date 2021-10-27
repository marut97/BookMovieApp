import React, { Fragment, useEffect, useState } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  FormHelperText,
} from "@material-ui/core";
import "./LoginDialog.css";

// Component for Error Text
function Error() {
  return <FormHelperText style={{ color: "red" }}>required</FormHelperText>;
}

const RegisterForm = (props) => {
  // Declare state variables
  const [addUserForm, setAddUserForm] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
    mobile_number: "",
    errors: {
      first_name: "",
      last_name: "",
      email_address: "",
      password: "",
      mobile_number: "",
    },
  });

  const [addUserFormMessage, setAddUserFormMessage] = useState("");

  // This function is responsible for adding new user
  async function addUserHandler(newUser) {
    const rawResponse = await fetch("http://localhost:8085/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await rawResponse.json();

    if (data.status === "ACTIVE") {
      setAddUserFormMessage("Registration Successful. Please Login!");
    } else {
      setAddUserFormMessage(data.message);
    }
  }

  // Check if given param is empty or not
  function checkEmptyValue(value) {
    return value.length === 0 ? "required" : "";
  }

  // Input fielf Change Handler
  const inputChangedHandler = (e) => {
    const state = addUserForm;
    const { name, value } = e.target;
    let errors = state.errors;

    switch (name) {
      case "first_name":
        errors.first_name = checkEmptyValue(value);
        break;
      case "last_name":
        errors.last_name = checkEmptyValue(value);
        break;
      case "mobile_number":
        errors.mobile_number = checkEmptyValue(value);
        break;
      case "email_address":
        errors.email_address = checkEmptyValue(value);
        break;
      case "password":
        errors.password = checkEmptyValue(value);
        break;
      default:
        break;
    }

    state[e.target.name] = e.target.value;
    setAddUserForm({ ...state });
  };

  // Register Form Handler
  const onRegisterFormSubmitted = (e) => {
    e.preventDefault();
    const state = addUserForm;
    let errors = state.errors;
    // On submit validation
    if (state.first_name.length === 0) {
      errors.first_name = "required";
    }
    if (state.last_name.length === 0) {
      errors.last_name = "required";
    }
    if (state.email_address.length === 0) {
      errors.email_address = "required";
    }
    if (state.password.length === 0) {
      errors.password = "required";
    }
    if (state.mobile_number.length === 0) {
      errors.mobile_number = "required";
    }

    // set state if errors found
    if (
      state.errors.first_name.length > 0 ||
      state.errors.last_name.length > 0 ||
      state.errors.email_address.length > 0 ||
      state.errors.password.length > 0 ||
      state.errors.mobile_number.length > 0
    ) {
      setAddUserForm({ ...state });
    } else {
      addUserHandler(addUserForm);
    }
  };

  // retrieve register form data
  const { first_name, last_name, email_address, password, mobile_number } =
    addUserForm;

  return (
    <form onSubmit={onRegisterFormSubmitted}>
      <Grid container direction="column" alignItems="center" justify="center">
        <FormControl
          style={{
            marginTop: "20px",
          }}
        >
          <InputLabel htmlFor="first_name" required>
            First Name
          </InputLabel>
          <Input
            id="first_name"
            className="form-field"
            type="text"
            name="first_name"
            onChange={inputChangedHandler}
            value={first_name}
          />
          {addUserForm.errors.first_name.length > 0 && (
            <Error>{addUserForm.errors.first_name}</Error>
          )}
        </FormControl>
        <FormControl
          style={{
            marginTop: "20px",
          }}
        >
          <InputLabel htmlFor="last_name">Last Name *</InputLabel>
          <Input
            id="last_name"
            className="form-field"
            type="text"
            name="last_name"
            onChange={inputChangedHandler}
            value={last_name}
          />
          {addUserForm.errors.last_name.length > 0 && (
            <Error>{addUserForm.errors.last_name}</Error>
          )}
        </FormControl>
        <FormControl
          style={{
            marginTop: "20px",
          }}
        >
          <InputLabel htmlFor="email_address">Email *</InputLabel>
          <Input
            id="email_address"
            className="form-field"
            type="email"
            name="email_address"
            onChange={inputChangedHandler}
            value={email_address}
          />
          {addUserForm.errors.email_address.length > 0 && (
            <Error>{addUserForm.errors.email_address}</Error>
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
            onChange={inputChangedHandler}
            value={password}
          />
          {addUserForm.errors.password.length > 0 && (
            <Error>{addUserForm.errors.password}</Error>
          )}
        </FormControl>
        <FormControl
          style={{
            marginTop: "20px",
          }}
        >
          <InputLabel htmlFor="mobile_number">Contact No *</InputLabel>
          <Input
            id="mobile_number"
            className="form-field"
            type="text"
            name="mobile_number"
            onChange={inputChangedHandler}
            value={mobile_number}
          />
          {addUserForm.errors.mobile_number.length > 0 && (
            <Error>{addUserForm.errors.mobile_number}</Error>
          )}
        </FormControl>

        {addUserFormMessage.length > 0 && (
          <Typography
            style={{
              marginTop: "30px",
              fontSize: "16px",
            }}
          >
            {addUserFormMessage}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          style={{
            marginTop: "30px",
          }}
        >
          REGISTER
        </Button>
      </Grid>
    </form>
  );
};

export default RegisterForm;
