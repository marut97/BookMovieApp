import React from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";
import "./LoginDialog.css";

const RegisterForm = (props) => {
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
