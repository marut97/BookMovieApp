import React, { useState, useEffect } from "react";
import "./LoginDialog.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {
  Tabs,
  Tab,
  Dialog,
  DialogContent,
} from "@material-ui/core";

const LoginDialog = (props) => {
  const [show, setDialogShow] = useState(false);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setDialogShow(props.show);
  }, [props.show]);

  const handleChange = (event, value) => {
    setValue( value );
  };

  return (
    <Dialog
      open={show}
      onClose={props.handleClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          width: "340px",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <DialogContent>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="LOGIN" />
          <Tab label="REGISTER" />
        </Tabs>
        <div>
          {value === 0 ? <LoginForm onLoggedIn={props.onLoggedIn}/> : <RegisterForm />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
