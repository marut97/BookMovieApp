import React from "react";
import "./LoginDialog.css";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";

const LoginDialog = (props) => {
  <Dialog open={props.open} onClose={props.handleClose}>
    <DialogContent>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="LOGIN" {...a11yProps(0)} />
            <Tab label="REGISTER" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <FormControl required className="formControl">
            <InputLabel htmlFor="loginUsername">
              Username
            </InputLabel>
            <Input
              id="loginUsername"
              validate={[required()]}
              onChange={loginUsernameChangeHandler}
            />
            <FormHelperText>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <FormControl required className="formControl">
            <InputLabel htmlFor="loginPassword">
              Username
            </InputLabel>
            <Input
              id="loginPassword"
              validate={[required()]}
              onChange={loginPasswordChangeHandler}
            />
            <FormHelperText>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormControl required className="formControl">
            <InputLabel htmlFor="location">Choose Location:</InputLabel>
            <Select value={location} onChange={locationChangeHandler}>
              {locations.map((loc) => (
                <MenuItem key={"loc" + loc.id} value={loc.location}>
                  {loc.location}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText className={reqLocation}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
        </TabPanel>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Subscribe</Button>
    </DialogActions>
  </Dialog>;
};

export default LoginDialog;
