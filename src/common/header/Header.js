import React from "react";
import "./Header.css";
import logo from "./../../assets/logo.svg";

const Header = (props) => {
  return (
    <div className="headerBar">
      <img src={logo} alt="Logo" className="movieLogo" />
    </div>
  );
};

export default Header;
