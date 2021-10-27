import React from "react";
import "./LoginDialog.css";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import RegisterForm from "./RegisterForm";

const LoginDialog = (props) => {
  const [show, setDialogShow] = useState(false);

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
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="LOGIN" />
        <Tab label="REGISTER" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <LoginForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RegisterForm />
      </TabPanel>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Subscribe</Button>
    </DialogActions>
  </Dialog>;
};

export default LoginDialog;
