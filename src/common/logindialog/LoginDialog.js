import React, { useState, useEffect } from "react";
import "./LoginDialog.css";
import LoginForm from "./LoginForm";
import {
  Button,
  Tabs,
  Tab,
  Typography,
  Grid,
  InputLabel,
  Input,
  FormHelperText,
  Dialog,
  DialogContent,
} from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div {...other}>
      {value === index && <Typography component={"div"}>{children}</Typography>}
    </div>
  );
}

const LoginDialog = (props) => {
  const [show, setDialogShow] = useState(false);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setDialogShow(props.show);
  }, [props.show]);

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
        <Tabs centered>
          <Tab label="LOGIN" />
          <Tab label="REGISTER" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <LoginForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <RegisterForm /> */}
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
